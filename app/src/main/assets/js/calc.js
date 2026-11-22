// Spark calculator: pop-up sheet with SI prefixes and a parallel (∥) operator
(function () {
'use strict';
const A = window.App;
// Screens that show the floating calculator button
const SHOW_ON = new Set(['learn', 'module', 'lesson', 'mc', 'quiz', 'games', 'bandBuilder', 'cardSession', 'tools', 'tool']);
const PFX = { p: 1e-12, n: 1e-9, 'µ': 1e-6, m: 1e-3, k: 1e3, M: 1e6, G: 1e9 };
const SIP = [[1e-12, 'p'], [1e-9, 'n'], [1e-6, 'µ'], [1e-3, 'm'], [1, ''], [1e3, 'k'], [1e6, 'M'], [1e9, 'G']];

let expr = '', ans = 0, history = [], isOpen = false, justEvaluated = false;

/* ---------- parser ---------- */
function tokenize(s) {
  const t = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const n = s.slice(i, j); if ((n.match(/\./g) || []).length > 1) throw 'Too many decimal points'; t.push({ t: 'num', v: parseFloat(n === '.' ? 'x' : n) }); if (n === '.') throw 'Bad number'; i = j; continue; }
    if (c === 'A') { t.push({ t: 'num', v: ans }); i++; continue; }
    if (c === 'π') { t.push({ t: 'num', v: Math.PI }); i++; continue; }
    if (PFX[c] !== undefined) { t.push({ t: 'pfx', v: PFX[c] }); i++; continue; }
    if ('+−×÷^()√²∥'.includes(c)) { t.push({ t: c }); i++; continue; }
    throw 'Unknown symbol ' + c;
  }
  // implicit multiplication: 2π, 2(…), )(, 3√4, π2 etc.
  const out = [];
  t.forEach((tok, k) => {
    const prev = out[out.length - 1];
    const prevEnds = prev && (prev.t === 'num' || prev.t === ')' || prev.t === 'pfx' || prev.t === '²');
    const startsVal = tok.t === 'num' || tok.t === '(' || tok.t === '√';
    if (prevEnds && startsVal) out.push({ t: '×' });
    out.push(tok);
  });
  return out;
}
function evaluate(s) {
  const T = tokenize(s); let p = 0;
  const peek = () => T[p] && T[p].t, eat = x => { if (peek() !== x) throw 'Expected ' + x; p++; };
  function sum() { let v = par(); while (peek() === '+' || peek() === '−') { const o = T[p++].t; const r = par(); v = o === '+' ? v + r : v - r; } return v; }
  function par() { let v = prod(); while (peek() === '∥') { p++; const r = prod(); v = (v * r) / (v + r); } return v; }
  function prod() { let v = unary(); while (peek() === '×' || peek() === '÷') { const o = T[p++].t; const r = unary(); if (o === '÷' && r === 0) throw 'Can’t divide by 0'; v = o === '×' ? v * r : v / r; } return v; }
  function unary() { if (peek() === '−') { p++; return -unary(); } if (peek() === '+') { p++; return unary(); } return pow(); }
  function pow() { const b = postfix(); if (peek() === '^') { p++; return Math.pow(b, unary()); } return b; }
  function postfix() { let v = primary(); while (peek() === 'pfx' || peek() === '²') { const tk = T[p++]; v = tk.t === 'pfx' ? v * tk.v : v * v; } return v; }
  function primary() {
    const k = peek();
    if (k === 'num') return T[p++].v;
    if (k === '(') { p++; const v = sum(); if (peek() === ')') p++; return v; } // allow missing closing bracket
    if (k === '√') { p++; const v = postfix(); if (v < 0) throw 'No square root of a negative'; return Math.sqrt(v); }
    throw k ? 'Unexpected ' + k : 'Incomplete';
  }
  if (!T.length) throw 'Empty';
  const v = sum();
  if (p < T.length) throw 'Unexpected ' + T[p].t;
  if (!isFinite(v)) throw 'Too big';
  return v;
}
const plain = v => { const a = Math.abs(v); if (a !== 0 && (a >= 1e12 || a < 1e-6)) return v.toExponential(4).replace(/\.?0+e/, 'e'); return parseFloat(v.toPrecision(10)).toLocaleString('en-GB', { maximumFractionDigits: 10 }); };
function withPrefix(v) {
  if (v === 0) return '0'; const a = Math.abs(v); let b = SIP[4];
  for (const s of SIP) if (a >= s[0] * 0.99999) b = s;
  return parseFloat((v / b[0]).toPrecision(5)) + (b[1] ? ' ' + b[1] : '');
}

/* ---------- UI ---------- */
const css = document.createElement('style');
css.textContent = `
#calcFab{position:fixed;right:16px;bottom:84px;z-index:6;width:56px;height:56px;border-radius:18px;background:var(--gold);color:#2b1d00;font-size:26px;box-shadow:0 6px 18px rgba(0,0,0,.45);display:none}
#calcFab:active{transform:scale(.94)}
#calcSheet{position:fixed;left:0;right:0;bottom:0;z-index:30;background:#121a22;border-top:1px solid var(--line);border-radius:22px 22px 0 0;padding:10px 12px calc(12px + env(safe-area-inset-bottom));transform:translateY(105%);transition:transform .22s ease;max-width:720px;margin:0 auto;box-shadow:0 -10px 30px rgba(0,0,0,.5)}
#calcSheet.open{transform:none}
#calcDim{position:fixed;inset:0;z-index:29;background:rgba(0,0,0,.45);display:none}
#calcDim.open{display:block}
.calc-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.calc-top b{flex:1}
.calc-top button{font-size:14px;color:var(--muted);padding:4px 8px;border-radius:8px}
.calc-disp{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-bottom:8px;text-align:right;min-height:86px}
.calc-hist{font-size:12.5px;color:var(--muted);min-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.calc-expr{font-family:ui-monospace,Menlo,monospace;font-size:22px;word-break:break-all;min-height:30px}
.calc-res{font-size:16px;color:var(--gold);font-weight:700;min-height:22px}
.calc-res .err{color:var(--muted);font-weight:400}
.calc-keys{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.calc-keys button{height:46px;border-radius:12px;background:var(--card);border:1px solid var(--line);font-size:18px;font-weight:600}
.calc-keys button:active{background:var(--card2);transform:scale(.96)}
.calc-keys .op{background:#1f2c3a;color:#9fd4ff}
.calc-keys .px{background:#1d2a22;color:#8ff0c4;font-size:16px}
.calc-keys .fn{font-size:15px;color:#ffd98a}
.calc-keys .eq{grid-column:span 2;background:var(--accent);color:#062b1c;font-size:22px}
.calc-keys .clr{color:var(--bad)}
.calc-help{font-size:12px;color:var(--muted);margin-top:8px;line-height:1.45}
.calc-help b{color:var(--text)}`;
document.head.appendChild(css);

const fab = document.createElement('button');
fab.id = 'calcFab'; fab.setAttribute('aria-label', 'Calculator'); fab.textContent = '🧮';
const dim = document.createElement('div'); dim.id = 'calcDim';
const sheet = document.createElement('div'); sheet.id = 'calcSheet';
const KEYS = [
  ['p', 'px'], ['n', 'px'], ['µ', 'px'], ['m', 'px'], ['k', 'px'],
  ['M', 'px'], ['(', 'op'], [')', 'op'], ['∥', 'op'], ['⌫', 'clr'],
  ['7'], ['8'], ['9'], ['÷', 'op'], ['AC', 'clr'],
  ['4'], ['5'], ['6'], ['×', 'op'], ['x²', 'fn'],
  ['1'], ['2'], ['3'], ['−', 'op'], ['√', 'fn'],
  ['0'], ['.'], ['π', 'fn'], ['+', 'op'], ['^', 'fn'],
  ['Ans', 'fn'], ['1/x', 'fn'], ['?', 'fn'], ['=', 'eq'],
];
sheet.innerHTML = `
  <div class="calc-top"><b>🧮 Calculator</b><button id="calcHistBtn">History</button><button id="calcClose">Close ✕</button></div>
  <div class="calc-disp"><div class="calc-hist" id="calcHist"></div><div class="calc-expr" id="calcExpr"></div><div class="calc-res" id="calcRes"></div></div>
  <div class="calc-keys">${KEYS.map(([k, c]) => `<button class="${c || ''}" data-k="${k}">${k}</button>`).join('')}</div>
  <div class="calc-help" id="calcHelp" style="display:none">
    <b>Prefixes</b> go after a number: <b>4.7k</b> = 4700, <b>100n</b> = 0.0000001, <b>20m</b> = 0.02. (Small <b>m</b> = milli, big <b>M</b> = mega.)<br>
    <b>∥</b> = in parallel (product over sum): <b>1k ∥ 1k</b> = 500.<br>
    <b>Examples:</b> Ohm’s law <b>12 ÷ 4.7k</b> → current in A · LED <b>(5 − 2) ÷ 15m</b> → 200 Ω · Power <b>5² ÷ 100</b> → 0.25 W · Divider <b>12 × 10k ÷ (10k + 4.7k)</b> · Cut-off <b>1 ÷ (2π × 10k × 100n)</b>
  </div>`;
document.body.append(fab, dim, sheet);
const $ = s => sheet.querySelector(s);

function show() {
  $('#calcExpr').textContent = expr.replace(/A/g, 'Ans') || '0';
  const h = history[0];
  $('#calcHist').textContent = h ? `${h.e} = ${h.r}` : '';
  if (!expr) { $('#calcRes').innerHTML = ''; return; }
  try {
    const v = evaluate(expr);
    const pr = withPrefix(v), pl = plain(v);
    $('#calcRes').innerHTML = `= ${pl}${pr !== pl && /[a-zA-Zµ]/.test(pr) ? ` <span class="small" style="color:var(--muted)">(${pr})</span>` : ''}`;
  } catch (e) { $('#calcRes').innerHTML = `<span class="err">…</span>`; }
}
const endsWithValue = () => /[0-9.πA)²pnµmkMG]$/.test(expr);
function press(k) {
  if (k === '?') { const hp = $('#calcHelp'); hp.style.display = hp.style.display === 'none' ? '' : 'none'; return; }
  if (k === 'AC') { expr = ''; justEvaluated = false; return show(); }
  if (k === '⌫') { expr = expr.slice(0, -1); justEvaluated = false; return show(); }
  if (k === '=') {
    if (!expr) return;
    try {
      const v = evaluate(expr);
      history.unshift({ e: expr.replace(/A/g, 'Ans'), r: plain(v) + (/[a-zA-Zµ]/.test(withPrefix(v)) ? ` (${withPrefix(v)})` : '') });
      history = history.slice(0, 20);
      ans = v; expr = 'A'; justEvaluated = true;
    } catch (e) { $('#calcRes').innerHTML = `<span class="err" style="color:var(--bad)">${typeof e === 'string' ? e : 'Error'}</span>`; sheet.querySelector('.calc-disp').classList.add('shake'); setTimeout(() => sheet.querySelector('.calc-disp').classList.remove('shake'), 300); A.vibrate(60); return; }
    return show();
  }
  const isOp = '+−×÷^∥'.includes(k) || k === 'x²' || PFX[k] !== undefined;
  if (justEvaluated && !isOp) expr = ''; // start fresh after =, unless continuing with an operator
  justEvaluated = false;
  if (k === 'x²') { if (endsWithValue()) expr += '²'; return show(); }
  if (k === '1/x') { expr = expr ? '1÷(' + expr + ')' : '1÷'; return show(); }
  if (k === 'Ans') { expr += 'A'; return show(); }
  if (k === '√') { expr += '√'; return show(); }
  if (PFX[k] !== undefined && !/[0-9.)πA²]$/.test(expr)) return; // prefix must follow a number
  if ('+×÷^∥'.includes(k)) {
    if (!expr) { if (ans) expr = 'A'; else return; }
    if (/[+−×÷^∥]$/.test(expr)) expr = expr.slice(0, -1); // replace previous operator
  }
  expr += k; show();
}
sheet.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => press(b.dataset.k)));
$('#calcClose').onclick = close; dim.onclick = close;
$('#calcHistBtn').onclick = () => {
  if (!history.length) { A.toast('No history yet'); return; }
  const box = $('#calcHist');
  if (box.dataset.full) { delete box.dataset.full; box.style.whiteSpace = ''; box.style.maxHeight = ''; box.style.overflow = ''; show(); return; }
  box.dataset.full = 1; box.style.whiteSpace = 'normal'; box.style.maxHeight = '120px'; box.style.overflow = 'auto';
  box.innerHTML = history.map((h, i) => `<div data-h="${i}" style="padding:3px 0;border-bottom:1px solid var(--line)">${A.esc(h.e)} = <b style="color:var(--gold)">${A.esc(h.r)}</b></div>`).join('');
};
function open() { isOpen = true; sheet.classList.add('open'); dim.classList.add('open'); show(); }
function close() { isOpen = false; sheet.classList.remove('open'); dim.classList.remove('open'); }
fab.onclick = open;

// keyboard support (handy when testing on a computer)
document.addEventListener('keydown', e => {
  if (!isOpen) return;
  const map = { '*': '×', '/': '÷', '-': '−', Enter: '=', Backspace: '⌫', Escape: 'AC', u: 'µ' };
  const k = map[e.key] || e.key;
  if (KEYS.some(([x]) => x === k) || '()'.includes(k)) { e.preventDefault(); press(k); }
});

window.onScreen = name => { fab.style.display = SHOW_ON.has(name) ? 'block' : 'none'; if (!SHOW_ON.has(name)) close(); };
const origBack = window.handleBack;
window.handleBack = () => { if (isOpen) { close(); return 'ok'; } return origBack(); };
window.Calc = { open, close, evaluate };
})();
