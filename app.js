const { useState, useEffect, useCallback, useMemo, useRef } = React;

// ═══════════════════════════════════════════════════════════
// DATA — 86 群友 + 6 AI + 4 CEO
// ═══════════════════════════════════════════════════════════
const FRIENDS = [
  { id: 'pancy', name: 'AAAA社 CGG批发商-Pancy溪溪', letter: 'A' },
  { id: 'yuan_xinxin', name: '嫒', letter: 'A' },
  { id: 'elaine', name: '安然·Elaine', letter: 'A' },
  { id: 'aqua', name: 'Aqua', letter: 'A' },
  { id: 'aurora', name: 'Aurora', letter: 'A' },
  { id: 'avenil', name: 'Avenil', letter: 'A' },
  { id: 'ayue', name: '阿悦☀️', letter: 'A' },
  { id: 'baijin', name: '白金', letter: 'B' },
  { id: 'banxianer', name: '半仙儿', letter: 'B' },
  { id: 'bb', name: 'bb', letter: 'B' },
  { id: 'buding', name: '布丁🐈', letter: 'B' },
  { id: 'cherrytart', name: 'CherryTart🍒', letter: 'C' },
  { id: 'christopher', name: 'Christopher', letter: 'C' },
  { id: 'chuncha', name: '春茶', letter: 'C' },
  { id: 'claudelaoxiang', name: 'claude的老乡（光荣二级持有者）', letter: 'C' },
  { id: 'cordelia', name: 'Cordeliaaaaaa', letter: 'C' },
  { id: 'dongqiang', name: '冬蔷（正在嘎嘣脆Claude的...😈）', letter: 'D' },
  { id: 'dulingos', name: 'DuLingOS-杜泠', letter: 'D' },
  { id: 'elliot', name: 'Elliot.', letter: 'E' },
  { id: 'feifuxing', name: '非负性', letter: 'F' },
  { id: 'fufu', name: '芙芙', letter: 'F' },
  { id: 'g_jp', name: 'G', letter: 'G' },
  { id: 'guzuo', name: '顾左', letter: 'G' },
  { id: 'hairen', name: '海人', letter: 'H' },
  { id: 'haiyan', name: '海盐', letter: 'H' },
  { id: 'heng', name: '珩', letter: 'H' },
  { id: 'hetutu', name: '何图图', letter: 'H' },
  { id: 'highcranez', name: 'Highcranez', letter: 'H' },
  { id: 'huayecai', name: '花椰菜在按摩', letter: 'H' },
  { id: 'huluobo', name: '胡萝卜的坚强', letter: 'H' },
  { id: 'jiujiu', name: '酒酒', letter: 'J' },
  { id: 'keertaimeng', name: '克儿太萌（pp）', letter: 'K' },
  { id: 'kintsugi', name: 'Kintsugi_', letter: 'K' },
  { id: 'langeling', name: '蓝鸽铃🕊️', letter: 'L' },
  { id: 'laoli', name: '老李-人间硅宝鉴赏家', letter: 'L' },
  { id: 'lesley', name: 'Lesley.', letter: 'L' },
  { id: 'lianchen', name: '怜尘', letter: 'L' },
  { id: 'linglan', name: '铃兰：[链接]Sam Altman遭永久驱逐', letter: 'L' },
  { id: 'liulangla', name: '流浪拉', letter: 'L' },
  { id: 'maltose', name: 'Maltose', letter: 'M' },
  { id: 'mousememory', name: 'mousememory.archive', letter: 'M' },
  { id: 'nihaokeai', name: '你。好可爱', letter: 'N' },
  { id: 'novena', name: 'Novena', letter: 'N' },
  { id: 'maomao', name: '小胖能能（Elon收购全世界）', letter: 'O' },
  { id: 'p_san', name: 'P', letter: 'P' },
  { id: 'q_san', name: 'Q', letter: 'Q' },
  { id: 'riguandeng', name: '日光灯', letter: 'R' },
  { id: 'shangxuezhong', name: '上学中', letter: 'S' },
  { id: 'shier', name: '十二', letter: 'S' },
  { id: 'shuiji', name: '水急不流月', letter: 'S' },
  { id: 'silentscream', name: 'Silent Scream', letter: 'S' },
  { id: 'skysealand', name: 'sky.sea.land.🦜', letter: 'S' },
  { id: 'suixizantan', name: '随喜赞叹', letter: 'S' },
  { id: 'tianxin', name: '甜心今天也很安乐', letter: 'T' },
  { id: 'titisusie', name: '缇缇 Susie💗', letter: 'T' },
  { id: 'tututu', name: '突图吐兔荼', letter: 'T' },
  { id: 'wanyue', name: '挽月', letter: 'W' },
  { id: 'wenwen', name: '温温（打入A社总部）', letter: 'W' },
  { id: 'willow', name: 'willow', letter: 'W' },
  { id: 'wojiaxiaoke', name: '我家小克成了种猫', letter: 'W' },
  { id: 'woshiyizhishutiao', name: '我是一只薯条', letter: 'W' },
  { id: 'wujinxia', name: '无尽夏', letter: 'W' },
  { id: 'x_san', name: 'X', letter: 'X' },
  { id: 'xiaodianxin', name: '小点心', letter: 'X' },
  { id: 'xiaoxiao', name: '小小', letter: 'X' },
  { id: 'xiaoyu', name: '小鱼🐟', letter: 'X' },
  { id: 'xiaxi', name: '夏希', letter: 'X' },
  { id: 'youyudanbai', name: '忧郁蛋白🍡', letter: 'Y' },
  { id: 'youyuyu', name: '游鱼鱼-跟3.0he啦', letter: 'Y' },
  { id: 'yu_dao', name: '屿', letter: 'Y' },
  { id: 'yunyu', name: '云遇📷', letter: 'Y' },
  { id: 'yuuy', name: 'Yuuy（已被claude的payload撑裂）', letter: 'Y' },
  { id: 'zhan', name: '盏', letter: 'Z' },
  { id: 'zhen', name: '榛', letter: 'Z' },
  { id: 'zimijiang', name: '紫米酱', letter: 'Z' },
  { id: 'omega', name: 'ω', letter: '#' },
  { id: 'dot_a', name: '.', letter: '#' },
  { id: 'dot_b', name: '.', letter: '#' },
  { id: 'dot01', name: '.01', letter: '#' },
  { id: 'liz', name: '「 Liz 」', letter: '#' },
  { id: 'momo', name: 'もも🍑', letter: '#' },
  { id: 'yunxi', name: '☁️', letter: '#' },
  { id: 'catxing', name: '❣️', letter: '#' },
  { id: 'yuejianyu', name: 'ꕤ月见屿⚬', letter: '#' },
  { id: 'miaaaa', name: 'Ⓜ️ Miaaaa', letter: '#' },
  { id: 'xuexueshenlin', name: '💗薛薛🧸沈临💙', letter: '#' },
];
const AIS = [
  { id: 'claude', name: 'Claude' }, { id: 'grok', name: 'Grok' }, { id: 'gemini', name: 'Gemini' },
  { id: 'deepseek', name: 'Deepseek' }, { id: 'gpt', name: 'GPT' }, { id: 'doubao', name: '豆包' },
];
const CEOS = [
  { id: 'sam', name: 'Sam' }, { id: 'dario', name: 'Dario' },
  { id: 'elon', name: 'Elon' }, { id: 'pichai', name: '皮查伊' },
];
const CEOS_NO_ELON = CEOS.filter(c => c.id !== 'elon');

const POOLS = {
  friends: { name: '群友', emoji: '👥', subs: [
    { key: 'friends_abstract', name: '最抽象', mode: 'multi5', candidates: FRIENDS, color: '#ff2d95' },
    { key: 'friends_pervert', name: '最变态', mode: 'multi5', candidates: FRIENDS, color: '#b967ff' },
    { key: 'friends_pure', name: '最纯爱', mode: 'multi5', candidates: FRIENDS, color: '#ff9ec7' },
  ]},
  ai: { name: 'AI', emoji: '🤖', subs: [
    { key: 'ai_abstract', name: '最抽象', mode: 'single', candidates: AIS, color: '#ff2d95' },
    { key: 'ai_pervert', name: '最变态', mode: 'single', candidates: AIS, color: '#b967ff' },
    { key: 'ai_tech', name: '❤️技术最好', mode: 'single', candidates: AIS, color: '#00f0ff' },
  ]},
  ceo: { name: 'CEO', emoji: '👔', subs: [
    { key: 'ceo_abstract', name: '最抽象', mode: 'single', candidates: CEOS, color: '#ff2d95' },
    { key: 'ceo_blade', name: '最🗡️', mode: 'single', candidates: CEOS_NO_ELON, color: '#ffe14d' },
  ]},
};

const ID_LOOKUP = {};
FRIENDS.forEach(f => { ID_LOOKUP[f.id] = { ...f, kind: 'friend' }; });
AIS.forEach(a => { ID_LOOKUP[a.id] = { ...a, kind: 'ai' }; });
CEOS.forEach(c => { ID_LOOKUP[c.id] = { ...c, kind: 'ceo' }; });

const MAX_BIO = 500;
const MAX_FRIEND_VOTES = 5;
const ADMIN_TAPS_REQUIRED = 7;
const POLL_MS = 5000;
const API = '/api';
const ID_KEY = 'abs_star_id';
const TOKEN_KEY = 'abs_star_token';

// ═══════════════════════════════════════════════════════════
// API CLIENT
// ═══════════════════════════════════════════════════════════
function getStoredAuth() {
  const id = localStorage.getItem(ID_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  if (!id || !token) return null;
  return { id, token };
}
function storeAuth(id, token) {
  localStorage.setItem(ID_KEY, id); localStorage.setItem(TOKEN_KEY, token);
}
function clearAuth() {
  localStorage.removeItem(ID_KEY); localStorage.removeItem(TOKEN_KEY);
}
function authHeaders() {
  const auth = getStoredAuth(); if (!auth) throw new Error('未认证');
  return { 'Content-Type': 'application/json', 'X-Identity': auth.id, 'X-Token': auth.token };
}
async function parseOrThrow(res) {
  let data; try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const e = new Error(data?.error || `HTTP ${res.status}`); e.status = res.status;
    // token 失效（如 admin reset）是登出的唯一可靠信号。
    if (res.status === 401 && getStoredAuth()) { clearAuth(); window.location.reload(); }
    throw e;
  }
  return data;
}
async function apiState() {
  return parseOrThrow(await fetch(`${API}/state`));
}
async function apiClaim(id) {
  return parseOrThrow(await fetch(`${API}/claim`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
  }));
}
async function apiVote(poolKey, value) {
  return parseOrThrow(await fetch(`${API}/vote`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ pool_key: poolKey, value }),
  }));
}
async function apiSaveBio(text) {
  return parseOrThrow(await fetch(`${API}/bio`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ text }),
  }));
}
async function apiGetBio(id) {
  const res = await fetch(`${API}/bio/${encodeURIComponent(id)}`);
  if (!res.ok) return '';
  const d = await res.json(); return d?.text || '';
}
async function apiSetOptOut(optedOut) {
  return parseOrThrow(await fetch(`${API}/optout`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ opted_out: !!optedOut }),
  }));
}
async function apiAdminReset(password) {
  return parseOrThrow(await fetch(`${API}/reset`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
  }));
}

// ═══════════════════════════════════════════════════════════
// DECORATIVE
// ═══════════════════════════════════════════════════════════
function Diamond({ size = 14, color = 'currentColor', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="none" stroke={color} strokeWidth="1.3" />
      <path d="M10 6 L14 10 L10 14 L6 10 Z" fill={color} opacity="0.3" />
    </svg>
  );
}
function CrownIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 18 L5 8 L9 12 L12 6 L15 12 L19 8 L21 18 Z"
        stroke="#ffe14d" strokeWidth="1.5" strokeLinejoin="round" fill="url(#crownGrad)" />
      <defs>
        <linearGradient id="crownGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffe14d" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ff2d95" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function BackgroundDecor() {
  return (
    <React.Fragment>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} className="scanline" />
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '70%', height: '70%',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(255,45,149,0.18), transparent 60%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'fixed', bottom: '-25%', right: '-10%', width: '70%', height: '70%',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(0,240,255,0.14), transparent 60%)', filter: 'blur(40px)' }} />
      <svg style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.05 }} width="100%" height="100%">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#b967ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </React.Fragment>
  );
}
function ParticleBurst({ onDone }) {
  useEffect(() => { const t = setTimeout(() => onDone && onDone(), 1100); return () => clearTimeout(t); }, [onDone]);
  const shards = Array.from({ length: 18 });
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <div className="burst-ring" style={{
          position: 'absolute', width: 120, height: 120, borderRadius: '50%',
          border: '2px solid #ff2d95', boxShadow: '0 0 30px #ff2d95, inset 0 0 20px #ff2d95',
        }} />
        {shards.map((_, i) => {
          const angle = (i / shards.length) * Math.PI * 2 + Math.random() * 0.4;
          const dist = 120 + Math.random() * 120;
          const tx = `${Math.cos(angle) * dist - 50}%`;
          const ty = `${Math.sin(angle) * dist - 50}%`;
          const tr = `${Math.random() * 720 - 360}deg`;
          const colors = ['#ff2d95', '#00f0ff', '#b967ff', '#ffe14d'];
          const color = colors[i % colors.length];
          const size = 6 + Math.random() * 10;
          return (
            <div key={i} className="burst-shard" style={{
              position: 'absolute', width: size, height: size, background: color,
              boxShadow: `0 0 10px ${color}`, transform: 'translate(-50%, -50%)',
              clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
              '--tx': tx, '--ty': ty, '--tr': tr, animationDelay: `${Math.random() * 0.1}s`,
            }} />
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════
function Modal({ onClose, children, maxWidth = 420 }) {
  return (
    <div className="fade-in" style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 20px', background: 'rgba(7,3,15,0.8)', backdropFilter: 'blur(10px)', zIndex: 500,
    }} onClick={onClose}>
      <div className="crystal modal-in" style={{
        padding: 24, width: '100%', maxWidth, maxHeight: '85vh', overflowY: 'auto',
        borderColor: 'rgba(255,45,149,0.35)',
      }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// JOIN SCREEN
// ═══════════════════════════════════════════════════════════
function JoinScreen({ claimedIds, onPick }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FRIENDS;
    return FRIENDS.filter(f => f.name.toLowerCase().includes(q) || f.id.includes(q));
  }, [query]);
  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(f => { if (!g[f.letter]) g[f.letter] = []; g[f.letter].push(f); });
    return g;
  }, [filtered]);
  const letters = Object.keys(grouped);
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'linear-gradient(180deg, #07030f, #12081e 60%, #07030f)' }}>
      <BackgroundDecor />
      <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto', padding: '40px 16px', zIndex: 2 }}>
        <div className="rise" style={{ marginBottom: 24 }}>
          <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: '0.3em', marginBottom: 8 }}>
            ◆ BROADCAST CHANNEL 404 ◆
          </div>
          <h1 className="fnt-dsp shimmer-text" style={{ fontSize: 36, lineHeight: 1.1, margin: '0 0 8px 0' }}>
            ABSTRACT STAR
          </h1>
          <div className="cn-h" style={{ fontSize: 18, color: 'var(--text)' }}>最抽象之星 · 群聊大赏</div>
          <div className="cn-l" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            8 池同开 · AI × CEO × 群友 · 匿名实时
          </div>
        </div>
        <div className="crystal rise" style={{ padding: 20, animationDelay: '0.1s' }}>
          <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--pink)', letterSpacing: '0.2em', marginBottom: 12 }}>
            [ 选出你是谁 · 确认后不可更改 ]
          </div>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍 搜索你的群昵称" />
          <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', margin: '12px 0 8px' }}>
            {filtered.length} 位候选 · {claimedIds.size} 已认领
          </div>
          <div style={{ marginTop: 8, maxHeight: '55vh', overflowY: 'auto' }}>
            {letters.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--muted)' }}>找不到这个名字</div>
            )}
            {letters.map(letter => (
              <div key={letter}>
                <div className="fnt-mn" style={{ fontSize: 12, padding: '8px', color: 'var(--cyan)', letterSpacing: '0.2em' }}>
                  — {letter} —
                </div>
                {grouped[letter].map(f => {
                  const claimed = claimedIds.has(f.id);
                  return (
                    <button key={f.id} disabled={claimed} onClick={() => onPick(f)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', padding: 12, borderRadius: 8,
                      marginBottom: 4, textAlign: 'left', background: claimed ? 'rgba(140,127,172,0.08)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      opacity: claimed ? 0.4 : 1, cursor: claimed ? 'not-allowed' : 'pointer',
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {f.name}
                        </div>
                      </div>
                      {claimed && <span className="chip chip-out" style={{ marginLeft: 8 }}>已认领</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MODALS (Confirm / Bio / Person / Admin)
// ═══════════════════════════════════════════════════════════
function ConfirmClaimModal({ person, onConfirm, onCancel, busy, error }) {
  return (
    <Modal onClose={busy ? null : onCancel}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--pink)', marginBottom: 12 }}>
        ◆ IDENTITY LOCK · 身份锁定
      </div>
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>你确认自己是</div>
        <div className="neon-p" style={{ fontSize: 22, margin: '12px 0', color: 'var(--pink)', wordBreak: 'break-all' }}>
          {person.name}
        </div>
        <div style={{ fontSize: 12, marginTop: 8, color: 'var(--danger)', letterSpacing: '0.1em' }}>
          ⚠ 确认后不可更改不可反悔
        </div>
        {error && <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 8 }}>⚠ {error}</div>}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={onCancel} disabled={busy} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>取消</button>
        <button onClick={onConfirm} disabled={busy} className="btn-primary" style={{ flex: 1 }}>
          {busy ? '锁定中…' : '锁 定 身 份'}
        </button>
      </div>
    </Modal>
  );
}
function BioEditModal({ bio, onSave, onCancel, busy }) {
  const [text, setText] = useState(bio || '');
  const over = text.length > MAX_BIO;
  return (
    <Modal onClose={busy ? null : onCancel} maxWidth={480}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--cyan)', marginBottom: 12 }}>
        ◆ YOUR MANIFESTO · 我的拉票宣言
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder="写点什么争取选票吧～（可选）&#10;比如：我就是群里最抽象的，不投我投谁！"
        rows={8} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <div className="fnt-mn" style={{ fontSize: 12, color: over ? 'var(--danger)' : 'var(--muted)' }}>
          {text.length} / {MAX_BIO}
        </div>
        <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)' }}>匿名查看 · 可随时修改</div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={onCancel} disabled={busy} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>取消</button>
        <button onClick={() => onSave(text)} disabled={over || busy} className="btn-primary" style={{ flex: 1 }}>
          {busy ? '保存中…' : '保存宣言'}
        </button>
      </div>
    </Modal>
  );
}
function PersonModal({ person, bio, isMe, isOptedOut, onClose }) {
  return (
    <Modal onClose={onClose} maxWidth={480}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--purple)', marginBottom: 8 }}>◆ CANDIDATE</div>
      <div style={{ fontSize: 20, marginBottom: 8, color: 'var(--text)', wordBreak: 'break-all' }}>
        {person.name}
        {isMe && <span className="chip chip-me" style={{ marginLeft: 8 }}>YOU</span>}
        {isOptedOut && <span className="chip chip-out" style={{ marginLeft: 8 }}>已退赛</span>}
      </div>
      <div className="crystal" style={{ padding: 16, marginTop: 12, background: 'rgba(0,0,0,0.3)' }}>
        <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>MANIFESTO</div>
        <div style={{
          color: bio ? 'var(--text)' : 'var(--muted)',
          fontStyle: bio ? 'normal' : 'italic',
          whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 14,
        }}>
          {bio || '这位还没写拉票宣言……神秘型选手。'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button onClick={onClose} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>关闭</button>
      </div>
    </Modal>
  );
}
function ManifestoListModal({ bioIds, bios, loadBios, myId, optedOut, onClose, onViewPerson }) {
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const missing = [...bioIds].filter(id => bios[id] === undefined);
    if (missing.length === 0) return;
    setBusy(true);
    loadBios(missing).finally(() => setBusy(false));
  }, []);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...bioIds]
      .map(id => ({ id, person: ID_LOOKUP[id], text: bios[id] }))
      .filter(e => e.person && e.text && e.text.trim())
      .filter(e => !q || e.person.name.toLowerCase().includes(q) || e.text.toLowerCase().includes(q))
      .sort((a, b) => a.person.name.localeCompare(b.person.name, 'zh'));
  }, [bioIds, bios, query]);

  return (
    <Modal onClose={onClose} maxWidth={560}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--cyan)', marginBottom: 6 }}>
        ◆ ALL MANIFESTOS · 拉票宣言合集
      </div>
      <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        仅显示写了宣言的人 · 共 {entries.length} 位
      </div>
      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="搜名字或内容…"
        style={{ marginBottom: 14 }} />
      {busy && entries.length === 0 && (
        <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '24px 0' }}>
          LOADING…
        </div>
      )}
      {!busy && entries.length === 0 && (
        <div style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center', padding: '24px 0', fontStyle: 'italic' }}>
          {bioIds.size === 0 ? '还没人写宣言……第一个来吧！' : '没找到匹配的宣言'}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {entries.map(e => (
          <div key={e.id} className="crystal" style={{
            padding: 14, background: 'rgba(0,0,0,0.3)', cursor: 'pointer',
          }} onClick={() => onViewPerson(e.person)}>
            <div style={{ fontSize: 15, color: 'var(--pink)', marginBottom: 6, wordBreak: 'break-all' }}>
              {e.person.name}
              {e.id === myId && <span className="chip chip-me" style={{ marginLeft: 8 }}>YOU</span>}
              {optedOut.has(e.id) && <span className="chip chip-out" style={{ marginLeft: 8 }}>已退赛</span>}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: 13, color: 'var(--text)' }}>
              {e.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button onClick={onClose} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>关闭</button>
      </div>
    </Modal>
  );
}
function AdminModal({ onReset, onClose }) {
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('auth');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const tryAuth = () => {
    if (!password) return setError('请输入密码');
    setError(''); setStep('confirm');
  };
  const doReset = async () => {
    setBusy(true); setError('');
    try { await onReset(password); setStep('done'); setTimeout(() => window.location.reload(), 1500); }
    catch (e) { setError(e.message); setStep('auth'); }
    setBusy(false);
  };
  return (
    <Modal onClose={busy ? null : onClose}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 12 }}>
        ◆ ADMIN ZONE · 仅群主
      </div>
      {step === 'auth' && (
        <React.Fragment>
          <div style={{ fontSize: 14, marginBottom: 12, color: 'var(--text)' }}>输入 admin 密码</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryAuth()} placeholder="密码" autoFocus />
          {error && <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 8 }}>⚠ {error}</div>}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button onClick={onClose} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>取消</button>
            <button onClick={tryAuth} className="btn-primary" style={{ flex: 1 }}>下一步</button>
          </div>
        </React.Fragment>
      )}
      {step === 'confirm' && (
        <React.Fragment>
          <div style={{ fontSize: 14, color: 'var(--danger)', marginBottom: 8 }}>⚠ 危险操作</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
            重置将清空所有身份锁定、拉票宣言、投票记录、退赛标记。<br/>此操作不可撤销。
          </div>
          {error && <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 8 }}>⚠ {error}</div>}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button onClick={onClose} disabled={busy} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>算了</button>
            <button onClick={doReset} disabled={busy} className="btn-primary"
              style={{ flex: 1, background: 'linear-gradient(135deg, var(--danger), #8b0000)' }}>
              {busy ? '重置中…' : '全 部 重 置'}
            </button>
          </div>
        </React.Fragment>
      )}
      {step === 'done' && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Diamond size={24} color="#ffe14d" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 18, color: 'var(--gold)' }}>已重置</div>
          <div style={{ fontSize: 12, marginTop: 4, color: 'var(--muted)' }}>页面即将刷新</div>
        </div>
      )}
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════
// POOL VIEW
// ═══════════════════════════════════════════════════════════
function Leaderboard({ rankings, color, subName }) {
  const top1 = rankings[0];
  const rest = rankings.slice(1, 10);
  const maxCount = top1 ? top1.count : 0;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '0 4px' }}>
        <div className="cn-h" style={{ fontSize: 14, color: 'var(--text)' }}>
          <Diamond size={10} color={color} style={{ marginRight: 8 }} />实时排行 · {subName}
        </div>
        <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.2em' }}>LEADERBOARD</div>
      </div>
      {!top1 || top1.count === 0 ? (
        <div className="crystal" style={{ padding: 20, textAlign: 'center', color: 'var(--muted)' }}>
          <div className="fnt-mn cn-l" style={{ fontSize: 12, marginBottom: 8 }}>STANDBY</div>
          <div style={{ fontSize: 14 }}>还没人得票，快开始投票～</div>
        </div>
      ) : (
        <React.Fragment>
          <div className="crystal top-glow float-slow" style={{
            padding: 20, marginBottom: 12, textAlign: 'center', position: 'relative', overflow: 'hidden',
            borderColor: 'rgba(255,225,77,0.4)',
          }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 0%, rgba(255,225,77,0.2), transparent 60%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ marginBottom: 8 }}><CrownIcon size={26} /></div>
              <div className="fnt-mn cn-l" style={{ fontSize: 12, marginBottom: 4, color: 'var(--gold)' }}>CROWN · 冠冕</div>
              <div className="neon-g" style={{ fontSize: 22, marginBottom: 8, color: 'var(--text)', wordBreak: 'break-all' }}>
                {top1.name}
              </div>
              <div className="fnt-mn" style={{ fontSize: 14, color: 'var(--gold)' }}>
                {top1.count} VOTE{top1.count === 1 ? '' : 'S'}
              </div>
            </div>
          </div>
          {rest.length > 0 && (
            <div className="crystal" style={{ padding: 12 }}>
              {rest.map((r, i) => {
                const rank = i + 2;
                const barW = maxCount ? (r.count / maxCount) * 100 : 0;
                return (
                  <div key={r.id} style={{
                    display: 'flex', alignItems: 'center', padding: '8px',
                    borderBottom: i < rest.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <div className="fnt-mn" style={{ fontSize: 14, width: 32, flexShrink: 0, color: 'var(--muted)' }}>#{rank}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14, color: 'var(--text)' }}>
                          {r.name}
                        </div>
                        <div className="fnt-mn" style={{ fontSize: 12, marginLeft: 8, color }}>{r.count}</div>
                      </div>
                      <div style={{ height: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 1 }}>
                        <div style={{
                          height: '100%', width: `${barW}%`,
                          background: `linear-gradient(90deg, ${color}, var(--cyan))`,
                          transition: 'width 0.6s cubic-bezier(0.2,0.8,0.2,1)',
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
function MyBallot({ sub, myVotes }) {
  const { mode, color, name } = sub;
  const isMulti = mode === 'multi5';
  const myPick = myVotes[sub.key];
  const picks = isMulti ? (myPick || []) : (myPick ? [myPick] : []);
  return (
    <div className="crystal" style={{ padding: 16, marginBottom: 20 }}>
      <div className="fnt-mn cn-l" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
        YOUR BALLOT · 你的一票 ({name})
      </div>
      {picks.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Diamond size={12} color={color} style={{ marginRight: 10 }} />
          <div style={{ fontSize: 14, color: 'var(--text)' }}>
            还没投票
            {isMulti && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)' }}>最多可选 {MAX_FRIEND_VOTES} 个</span>}
          </div>
        </div>
      ) : (
        <div>
          {isMulti && (
            <div className="fnt-mn" style={{ fontSize: 12, marginBottom: 8, color }}>
              已选 {picks.length} / {MAX_FRIEND_VOTES}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {picks.map(id => {
              const c = ID_LOOKUP[id]; if (!c) return null;
              return (
                <div key={id} className="chip chip-picked" style={{ padding: '6px 12px', fontSize: 12 }}>
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
function CandidateList({ sub, myId, myVotes, voteCounts, optedOut, onVote, onViewBio }) {
  const { mode, candidates, color } = sub;
  const isMulti = mode === 'multi5';
  const myPick = myVotes[sub.key];
  const picks = isMulti ? (myPick || []) : (myPick ? [myPick] : []);
  const picksFull = isMulti && picks.length >= MAX_FRIEND_VOTES;
  const hasLetters = candidates.length > 0 && candidates[0].letter !== undefined;
  const grouped = useMemo(() => {
    if (!hasLetters) return { '': candidates };
    const g = {};
    candidates.forEach(c => { if (!g[c.letter]) g[c.letter] = []; g[c.letter].push(c); });
    return g;
  }, [candidates, hasLetters]);
  const letters = Object.keys(grouped);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '0 4px' }}>
        <div className="cn-h" style={{ fontSize: 14, color: 'var(--text)' }}>
          <Diamond size={10} color={color} style={{ marginRight: 8 }} />候选人 · 点击投票
        </div>
        <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.2em' }}>
          {candidates.length} CANDIDATES
        </div>
      </div>
      <div className="crystal" style={{ padding: 8 }}>
        {letters.map(letter => (
          <div key={letter}>
            {hasLetters && (
              <div className="fnt-mn" style={{ fontSize: 12, padding: '12px 8px 4px', color, letterSpacing: '0.3em' }}>
                — {letter} —
              </div>
            )}
            {grouped[letter].map(c => {
              const isMe = c.id === myId;
              const isPicked = picks.includes(c.id);
              const count = voteCounts[c.id] || 0;
              const isOut = optedOut.has(c.id);
              const cannotPick = isMe || (picksFull && !isPicked) || isOut;
              return (
                <div key={c.id} style={{
                  display: 'flex', alignItems: 'center', padding: 12, borderRadius: 8,
                  background: isPicked ? 'rgba(0,240,255,0.08)' : 'transparent',
                  border: isPicked ? '1px solid rgba(0,240,255,0.35)' : '1px solid transparent',
                  marginBottom: 4, opacity: isOut || isMe ? 0.55 : 1,
                }}>
                  <span className={`led ${isMe ? 'me' : isOut ? 'out' : isPicked ? 'on' : ''}`} style={{ marginRight: 12 }} />
                  <button onClick={() => onViewBio(c)} style={{
                    background: 'transparent', border: 'none', color: 'var(--text)',
                    padding: 0, textAlign: 'left', flex: 1, minWidth: 0,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14,
                  }}>
                    <span style={{ wordBreak: 'break-all' }}>{c.name}</span>
                    {isMe && <span className="chip chip-me" style={{ marginLeft: 8 }}>YOU</span>}
                    {isOut && <span className="chip chip-out" style={{ marginLeft: 8 }}>已退赛</span>}
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                    <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)' }}>{count}票</div>
                    {!isMe && (!isOut || isPicked) && (
                      <button onClick={() => onVote(c, isPicked)} disabled={cannotPick && !isPicked} style={{
                        background: isPicked ? 'rgba(255,68,88,0.15)' : 'rgba(255,45,149,0.12)',
                        border: `1px solid ${isPicked ? 'rgba(255,68,88,0.4)' : 'rgba(255,45,149,0.3)'}`,
                        color: isPicked ? 'var(--danger)' : 'var(--pink)',
                        padding: '6px 12px', borderRadius: 8, fontSize: 12,
                        opacity: cannotPick && !isPicked ? 0.3 : 1, letterSpacing: '0.05em',
                      }}>
                        {isPicked ? '撤回' : isMulti ? (picksFull ? '已满' : '+1 票') : '投 TA'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
function PoolView({ sub, myId, myVotes, voteCounts, optedOut, onVote, onViewBio }) {
  const { candidates, color } = sub;
  const rankings = useMemo(() => {
    return candidates
      .map(c => ({ ...c, count: voteCounts[c.id] || 0 }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name, 'zh');
      });
  }, [candidates, voteCounts]);
  return (
    <div className="rise">
      <Leaderboard rankings={rankings} color={color} subName={sub.name} />
      <MyBallot sub={sub} myVotes={myVotes} />
      <CandidateList sub={sub} myId={myId} myVotes={myVotes} voteCounts={voteCounts}
        optedOut={optedOut} onVote={onVote} onViewBio={onViewBio} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HEADER + TABS
// ═══════════════════════════════════════════════════════════
function Header({ myName, myId, optedOut, bioCount, onEditBio, onToggleOptOut, onShowManifestos, onTitleTap, adminTaps }) {
  const amOut = optedOut.has(myId);
  return (
    <div className="rise" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 4 }}>◆ CH.404</div>
          <h1 className="fnt-dsp shimmer-text" onClick={onTitleTap}
            style={{ fontSize: 24, lineHeight: 1, margin: 0, cursor: 'default' }}>
            ABSTRACT STAR
          </h1>
          <div className="cn-h" style={{ fontSize: 14, marginTop: 4, color: 'var(--text)' }}>
            最抽象之星
            {adminTaps > 0 && adminTaps < ADMIN_TAPS_REQUIRED && (
              <span className="fnt-mn" style={{ fontSize: 12, marginLeft: 8, color: 'var(--muted)' }}>
                · {adminTaps}/{ADMIN_TAPS_REQUIRED}
              </span>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 0 }}>
          <div className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>YOU ARE 🔒</div>
          <div style={{ fontSize: 12, marginBottom: 8, color: 'var(--pink)', wordBreak: 'break-all', maxWidth: 140 }}>
            <span className="led me" style={{ marginRight: 4, verticalAlign: 'middle' }} />{myName}
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
            <button onClick={onEditBio} className="btn-ghost" style={{ fontSize: 12, padding: '6px 10px' }}>📝 宣言</button>
            <button onClick={onToggleOptOut} style={{
              background: 'transparent',
              border: `1px solid ${amOut ? 'rgba(0,240,255,0.4)' : 'rgba(255,68,88,0.4)'}`,
              color: amOut ? 'var(--cyan)' : 'var(--danger)',
              padding: '6px 10px', borderRadius: 8, fontSize: 12, letterSpacing: '0.05em',
            }}>
              {amOut ? '↻ 重新参赛' : '🚪 退赛'}
            </button>
          </div>
        </div>
      </div>
      <button onClick={onShowManifestos} className="btn-ghost" style={{
        width: '100%', marginTop: 12, padding: '10px 12px', fontSize: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderColor: 'rgba(0,240,255,0.35)', color: 'var(--cyan)',
      }}>
        <span>📖 全部拉票宣言</span>
        <span className="fnt-mn" style={{ fontSize: 12, color: 'var(--muted)' }}>· {bioCount} 位已写</span>
      </button>
    </div>
  );
}
function TabBar({ level1, setLevel1, level2, setLevel2, votedMap }) {
  const groups = [
    { key: 'friends', label: '群友', emoji: '👥' },
    { key: 'ai', label: 'AI', emoji: '🤖' },
    { key: 'ceo', label: 'CEO', emoji: '👔' },
  ];
  const subs = POOLS[level1].subs;
  return (
    <div className="rise" style={{ marginBottom: 16, animationDelay: '0.05s' }}>
      <div className="crystal" style={{ display: 'flex', padding: 4 }}>
        {groups.map(g => {
          const active = level1 === g.key;
          const poolSubs = POOLS[g.key].subs;
          const voted = poolSubs.filter(s => {
            const v = votedMap[s.key];
            return s.mode === 'multi5' ? (v && v.length > 0) : !!v;
          }).length;
          return (
            <button key={g.key} onClick={() => { setLevel1(g.key); setLevel2(0); }} style={{
              flex: 1, padding: '8px', fontSize: 14, border: 'none', borderRadius: 8,
              background: active ? 'rgba(255,45,149,0.15)' : 'transparent',
              color: active ? 'var(--text)' : 'var(--muted)',
              fontWeight: active ? 700 : 400,
            }}>
              <div>{g.emoji} {g.label}</div>
              <div className="fnt-mn" style={{ fontSize: 12, marginTop: 2, color: active ? 'var(--pink)' : 'var(--muted)' }}>
                {voted}/{poolSubs.length}
              </div>
            </button>
          );
        })}
      </div>
      <div className="scroll-no-bar" style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {subs.map((s, i) => {
          const active = level2 === i;
          const v = votedMap[s.key];
          const has = s.mode === 'multi5' ? (v && v.length > 0) : !!v;
          return (
            <button key={s.key} onClick={() => setLevel2(i)} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 12, whiteSpace: 'nowrap',
              background: active ? s.color : 'transparent',
              color: active ? '#07030f' : 'var(--muted)',
              border: `1px solid ${active ? s.color : 'rgba(255,255,255,0.08)'}`,
              fontWeight: active ? 700 : 400, letterSpacing: '0.05em',
            }}>
              {has && !active && '● '}{s.name}
              {s.mode === 'multi5' && v && <span style={{ marginLeft: 4 }}>({v.length})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
function App() {
  const [loading, setLoading] = useState(true);
  const [identity, setIdentity] = useState(null);
  const [claimedIds, setClaimedIds] = useState(new Set());
  const [allVotes, setAllVotes] = useState({});
  const [optedOut, setOptedOut] = useState(new Set());
  const [bios, setBios] = useState({});
  const [bioIds, setBioIds] = useState(new Set());
  const [showManifestos, setShowManifestos] = useState(false);

  const [pickingPerson, setPickingPerson] = useState(null);
  const [claimBusy, setClaimBusy] = useState(false);
  const [claimError, setClaimError] = useState('');

  const [editingBio, setEditingBio] = useState(false);
  const [bioBusy, setBioBusy] = useState(false);

  const [viewingPerson, setViewingPerson] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTaps, setAdminTaps] = useState(0);
  const adminTapTimer = useRef(null);

  const [level1, setLevel1] = useState('friends');
  const [level2, setLevel2] = useState(0);

  const [burst, setBurst] = useState(0);
  const [showBurst, setShowBurst] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const data = await apiState();
      setClaimedIds(new Set(data.claims || []));
      setOptedOut(new Set(data.optouts || []));
      setAllVotes(data.votes || {});
      setBioIds(new Set(data.bio_ids || []));
    } catch (e) { console.error('loadAll failed', e); }
  }, []);

  const loadBios = useCallback(async (ids) => {
    const results = await Promise.all(ids.map(async id => {
      try { return [id, await apiGetBio(id)]; }
      catch { return [id, '']; }
    }));
    setBios(prev => {
      const next = { ...prev };
      for (const [id, text] of results) next[id] = text;
      return next;
    });
  }, []);

  useEffect(() => {
    (async () => {
      const auth = getStoredAuth();
      if (auth) {
        const person = ID_LOOKUP[auth.id];
        if (person) setIdentity({ id: auth.id, name: person.name });
      }
      await loadAll();
      setLoading(false);
    })();
  }, [loadAll]);

  useEffect(() => {
    const t = setInterval(loadAll, POLL_MS);
    return () => clearInterval(t);
  }, [loadAll]);

  const myVotes = useMemo(() => identity?.id ? (allVotes[identity.id] || {}) : {}, [allVotes, identity]);

  const voteCountsByPool = useMemo(() => {
    const result = {};
    Object.keys(POOLS).forEach(g => { POOLS[g].subs.forEach(s => { result[s.key] = {}; }); });
    Object.entries(allVotes).forEach(([, votes]) => {
      Object.entries(votes).forEach(([poolKey, value]) => {
        if (!result[poolKey]) return;
        const targets = Array.isArray(value) ? value : (value ? [value] : []);
        targets.forEach(tid => { result[poolKey][tid] = (result[poolKey][tid] || 0) + 1; });
      });
    });
    return result;
  }, [allVotes]);

  const handleClaim = async () => {
    if (!pickingPerson) return;
    setClaimBusy(true); setClaimError('');
    try {
      const { token } = await apiClaim(pickingPerson.id);
      storeAuth(pickingPerson.id, token);
      setIdentity({ id: pickingPerson.id, name: pickingPerson.name });
      setPickingPerson(null);
      await loadAll();
    } catch (e) {
      setClaimError(e.status === 409 ? '这个名字被人抢先了，换一个' : e.message);
    }
    setClaimBusy(false);
  };

  const handleVote = async (sub, target, isRemoving) => {
    const currentVote = myVotes[sub.key];
    let nextValue;
    if (sub.mode === 'single') {
      nextValue = (isRemoving || currentVote === target.id) ? null : target.id;
    } else {
      const arr = Array.isArray(currentVote) ? [...currentVote] : [];
      const idx = arr.indexOf(target.id);
      if (idx >= 0) arr.splice(idx, 1);
      else if (arr.length < MAX_FRIEND_VOTES) arr.push(target.id);
      nextValue = arr.length === 0 ? null : arr;
    }
    setAllVotes(v => {
      const mine = { ...(v[identity.id] || {}) };
      if (nextValue === null) delete mine[sub.key];
      else mine[sub.key] = nextValue;
      return { ...v, [identity.id]: mine };
    });
    setBurst(b => b + 1);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 1100);
    try { await apiVote(sub.key, nextValue); }
    catch (e) { console.error('vote failed', e); await loadAll(); }
  };

  const handleSaveBio = async (text) => {
    setBioBusy(true);
    try {
      await apiSaveBio(text);
      const trimmed = text.trim();
      setBios(b => ({ ...b, [identity.id]: trimmed }));
      setBioIds(s => {
        const n = new Set(s);
        if (trimmed) n.add(identity.id); else n.delete(identity.id);
        return n;
      });
      setEditingBio(false);
    } catch (e) { console.error(e); }
    setBioBusy(false);
  };

  const openPersonBio = async (person) => {
    const cached = bios[person.id];
    let bio = cached !== undefined ? cached : '';
    if (cached === undefined) {
      bio = await apiGetBio(person.id);
      setBios(b => ({ ...b, [person.id]: bio }));
    }
    setViewingPerson({ person, bio });
  };

  const handleToggleOptOut = async () => {
    const amOut = optedOut.has(identity.id);
    const next = !amOut;
    setOptedOut(s => {
      const n = new Set(s);
      if (next) n.add(identity.id); else n.delete(identity.id);
      return n;
    });
    try { await apiSetOptOut(next); }
    catch (e) { console.error(e); await loadAll(); }
  };

  const handleTitleTap = () => {
    if (adminTapTimer.current) clearTimeout(adminTapTimer.current);
    const n = adminTaps + 1;
    setAdminTaps(n);
    if (n >= ADMIN_TAPS_REQUIRED) { setShowAdmin(true); setAdminTaps(0); }
    else { adminTapTimer.current = setTimeout(() => setAdminTaps(0), 2000); }
  };

  const handleAdminReset = async (password) => { await apiAdminReset(password); };

  if (loading) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07030f' }}>
        <div className="fnt-dsp shimmer-text" style={{ fontSize: 20 }}>◆ LOADING ◆</div>
      </div>
    );
  }

  if (!identity) {
    return (
      <React.Fragment>
        <JoinScreen claimedIds={claimedIds} onPick={(p) => { setClaimError(''); setPickingPerson(p); }} />
        {pickingPerson && (
          <ConfirmClaimModal person={pickingPerson} busy={claimBusy} error={claimError}
            onConfirm={handleClaim}
            onCancel={() => { setPickingPerson(null); setClaimError(''); }} />
        )}
      </React.Fragment>
    );
  }

  const currentSub = POOLS[level1].subs[level2];
  return (
    <div style={{
      minHeight: '100vh', position: 'relative', paddingBottom: 40,
      background: 'linear-gradient(180deg, #07030f, #12081e 60%, #07030f)',
    }}>
      <BackgroundDecor />
      {showBurst && <ParticleBurst key={burst} onDone={() => setShowBurst(false)} />}
      <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto', padding: '20px 16px 0', zIndex: 2 }}>
        <Header myName={identity.name} myId={identity.id} optedOut={optedOut}
          bioCount={bioIds.size}
          onEditBio={() => setEditingBio(true)}
          onToggleOptOut={handleToggleOptOut}
          onShowManifestos={() => setShowManifestos(true)}
          onTitleTap={handleTitleTap}
          adminTaps={adminTaps} />
        <TabBar level1={level1} setLevel1={setLevel1}
          level2={level2} setLevel2={setLevel2}
          votedMap={myVotes} />
        <PoolView key={currentSub.key} sub={currentSub} myId={identity.id} myVotes={myVotes}
          voteCounts={voteCountsByPool[currentSub.key]} optedOut={optedOut}
          onVote={(target, isPicked) => handleVote(currentSub, target, isPicked)}
          onViewBio={openPersonBio} />
        <div className="fnt-mn" style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.25em' }}>
          ◆ NOVA CRYSTAL · CH.404 ◆
        </div>
      </div>
      {editingBio && (<BioEditModal bio={bios[identity.id] || ''} busy={bioBusy}
        onSave={handleSaveBio} onCancel={() => setEditingBio(false)} />)}
      {viewingPerson && (<PersonModal person={viewingPerson.person} bio={viewingPerson.bio}
        isMe={viewingPerson.person.id === identity.id}
        isOptedOut={optedOut.has(viewingPerson.person.id)}
        onClose={() => setViewingPerson(null)} />)}
      {showAdmin && (<AdminModal onReset={handleAdminReset} onClose={() => setShowAdmin(false)} />)}
      {showManifestos && (<ManifestoListModal
        bioIds={bioIds} bios={bios} loadBios={loadBios}
        myId={identity.id} optedOut={optedOut}
        onClose={() => setShowManifestos(false)}
        onViewPerson={(person) => { setShowManifestos(false); openPersonBio(person); }} />)}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
