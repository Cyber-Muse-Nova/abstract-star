const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Identity, X-Token",
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function randomToken() {
  const a = crypto.randomUUID().replace(/-/g, "");
  const b = crypto.randomUUID().replace(/-/g, "");
  return a + b;
}

async function verifyAuth(request, env) {
  const id = request.headers.get("X-Identity");
  const token = request.headers.get("X-Token");
  if (!id || !token) return null;
  const claimStr = await env.KV.get("claim:" + id);
  if (!claimStr) return null;
  try {
    const claim = JSON.parse(claimStr);
    if (claim.token !== token) return null;
    return { id, claim };
  } catch (e) {
    return null;
  }
}

async function handleGetState(env) {
  const results = await Promise.all([
    env.KV.list({ prefix: "claim:" }),
    env.KV.list({ prefix: "votes:" }),
    env.KV.list({ prefix: "optout:" }),
    env.KV.list({ prefix: "bio:" }),
  ]);
  const claimList = results[0];
  const voteList = results[1];
  const optoutList = results[2];
  const bioList = results[3];

  const claims = claimList.keys.map(function (k) { return k.name.substring(6); });
  const optouts = optoutList.keys.map(function (k) { return k.name.substring(7); });
  const bio_ids = bioList.keys.map(function (k) { return k.name.substring(4); });

  const votes = {};
  await Promise.all(
    voteList.keys.map(async function (k) {
      const voterId = k.name.substring(6);
      const val = await env.KV.get(k.name);
      if (val) {
        try { votes[voterId] = JSON.parse(val); } catch (e) {}
      }
    })
  );
  return json({ claims: claims, votes: votes, optouts: optouts, bio_ids: bio_ids });
}

async function handleClaim(request, env) {
  let body;
  try { body = await request.json(); }
  catch (e) { return json({ error: "invalid body" }, 400); }
  const id = body.id;
  if (!id || typeof id !== "string") return json({ error: "id required" }, 400);

  const existing = await env.KV.get("claim:" + id);
  if (existing) return json({ error: "already claimed" }, 409);

  const token = randomToken();
  await env.KV.put("claim:" + id, JSON.stringify({ token: token, at: Date.now() }));
  return json({ id: id, token: token });
}

async function handleVote(request, env) {
  const auth = await verifyAuth(request, env);
  if (!auth) return json({ error: "unauthorized" }, 401);

  let body;
  try { body = await request.json(); }
  catch (e) { return json({ error: "invalid body" }, 400); }
  const pool_key = body.pool_key;
  const value = body.value;
  if (!pool_key || typeof pool_key !== "string") return json({ error: "pool_key required" }, 400);

  const currentStr = await env.KV.get("votes:" + auth.id);
  let votes = {};
  if (currentStr) {
    try { votes = JSON.parse(currentStr); } catch (e) {}
  }

  const isEmpty = value === null || value === undefined ||
    (Array.isArray(value) && value.length === 0);
  if (isEmpty) {
    delete votes[pool_key];
  } else {
    if (Array.isArray(value)) {
      if (value.length > 5) return json({ error: "too many votes" }, 400);
      votes[pool_key] = value.filter(function (v) { return typeof v === "string"; });
    } else if (typeof value === "string") {
      votes[pool_key] = value;
    } else {
      return json({ error: "invalid value" }, 400);
    }
  }

  await env.KV.put("votes:" + auth.id, JSON.stringify(votes));
  return json({ ok: true, votes: votes });
}

async function handleSaveBio(request, env) {
  const auth = await verifyAuth(request, env);
  if (!auth) return json({ error: "unauthorized" }, 401);

  let body;
  try { body = await request.json(); }
  catch (e) { return json({ error: "invalid body" }, 400); }
  const text = body.text;
  const t = ((text || "") + "").trim();
  if (t.length > 500) return json({ error: "bio too long (max 500)" }, 400);

  if (t) {
    await env.KV.put("bio:" + auth.id, JSON.stringify({ text: t, at: Date.now() }));
  } else {
    await env.KV.delete("bio:" + auth.id);
  }
  return json({ ok: true });
}

async function handleGetBio(id, env) {
  const val = await env.KV.get("bio:" + id);
  if (!val) return json({ text: "" });
  try {
    const data = JSON.parse(val);
    return json({ text: data.text || "" });
  } catch (e) {
    return json({ text: "" });
  }
}

async function handleOptOut(request, env) {
  const auth = await verifyAuth(request, env);
  if (!auth) return json({ error: "unauthorized" }, 401);

  let body;
  try { body = await request.json(); }
  catch (e) { return json({ error: "invalid body" }, 400); }
  const opted_out = body.opted_out;

  if (opted_out) {
    await env.KV.put("optout:" + auth.id, JSON.stringify({ at: Date.now() }));
  } else {
    await env.KV.delete("optout:" + auth.id);
  }
  return json({ ok: true });
}

async function handleReset(request, env) {
  let body;
  try { body = await request.json(); }
  catch (e) { return json({ error: "invalid body" }, 400); }
  const password = body.password;

  const expected = env.ADMIN_PASSWORD || "nova-crystal-404";
  if (password !== expected) return json({ error: "wrong password" }, 401);

  const prefixes = ["claim:", "votes:", "optout:", "bio:"];
  for (const prefix of prefixes) {
    let cursor;
    do {
      const list = await env.KV.list({ prefix: prefix, cursor: cursor });
      await Promise.all(list.keys.map(function (k) { return env.KV.delete(k.name); }));
      cursor = list.list_complete ? null : list.cursor;
    } while (cursor);
  }
  return json({ ok: true });
}

export async function onRequest(context) {
  const request = context.request;
  const env = context.env;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (!env.KV) {
    return json({ error: "KV binding missing. Check CF dashboard." }, 500);
  }

  const url = new URL(request.url);
  let path = url.pathname;
  if (path.indexOf("/api/") === 0) path = path.substring(5);
  else if (path === "/api") path = "";
  path = path.replace(/\/$/, "");

  const method = request.method;

  try {
    if (method === "GET" && path === "state") return handleGetState(env);
    if (method === "POST" && path === "claim") return handleClaim(request, env);
    if (method === "POST" && path === "vote") return handleVote(request, env);
    if (method === "POST" && path === "bio") return handleSaveBio(request, env);
    if (method === "GET" && path.indexOf("bio/") === 0) {
      const id = decodeURIComponent(path.substring(4));
      return handleGetBio(id, env);
    }
    if (method === "POST" && path === "optout") return handleOptOut(request, env);
    if (method === "POST" && path === "reset") return handleReset(request, env);
    return json({ error: "no route for " + method + " /" + path }, 404);
  } catch (e) {
    console.error("handler error", e);
    return json({ error: "internal error" }, 500);
  }
}
