// Spark mini games
(function () {
'use strict';
const A = window.App, { esc, shuffle, pick, $, on } = A;
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const num = x => { const v = parseFloat((+x).toPrecision(4)); return String(v); };
const PREF = [[1e-12, 'p'], [1e-9, 'n'], [1e-6, 'µ'], [1e-3, 'm'], [1, ''], [1e3, 'k'], [1e6, 'M'], [1e9, 'G']];
function si(v, unit) {
  if (v === 0) return '0 ' + unit;
  const a = Math.abs(v);
  let best = PREF[4];
  for (const p of PREF) if (a >= p[0] * 0.9999) best = p;
  return num(v / best[0]) + ' ' + best[1] + unit;
}
const ohm = v => si(v, 'Ω');
const capF = pF => si(pF * 1e-12, 'F');
// make MC item with unique options
function mc(prompt, correct, distractors, explain, visual) {
  const set = [correct];
  for (const d of distractors) { if (set.length >= 4) break; if (d != null && !set.includes(d)) set.push(d); }
  const opts = shuffle(set);
  return { prompt, options: opts, correct: opts.indexOf(correct), explain, visual };
}
const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
const E24 = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];
const COL = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const HEX = { black: '#111', brown: '#7a4a1f', red: '#d42a2a', orange: '#ff8a00', yellow: '#ffd800', green: '#1f9e3a', blue: '#2266ee', violet: '#9b3fd6', grey: '#8a8a8a', white: '#f4f4f4', gold: '#c9a227', silver: '#c0c0c0' };
const cap = s => s[0].toUpperCase() + s.slice(1);

/* ---------- resistor drawing ---------- */
function resistorSVG(bands, five) {
  const xs = five ? [58, 80, 102, 124, 168] : [64, 88, 112, 168];
  return `<svg viewBox="0 0 240 80" width="260"><line x1="0" y1="40" x2="240" y2="40" stroke="#b9c1c8" stroke-width="5"/>
    <rect x="40" y="16" width="160" height="48" rx="22" fill="${five ? '#7fb0d8' : '#dcc697'}" stroke="#00000055"/>
    ${bands.map((c, i) => `<rect x="${xs[i]}" y="${i === 0 || i === bands.length - 1 ? 19 : 17}" width="13" height="${i === 0 || i === bands.length - 1 ? 42 : 46}" fill="${HEX[c]}" stroke="#00000033"/>`).join('')}
    <rect x="40" y="16" width="160" height="14" rx="7" fill="#ffffff22"/></svg>`;
}
function resValueParts(five) {
  let base, m;
  if (five) { base = pick([100, 102, 105, 110, 120, 150, 162, 200, 221, 249, 270, 330, 348, 390, 470, 499, 560, 680, 750, 820, 910]); m = rnd(-1, 4); }
  else { base = pick(E24); m = rnd(-1, 5); }
  const digits = String(base).split('').map(Number);
  const val = base * Math.pow(10, m);
  const mulCol = m === -1 ? 'gold' : m === -2 ? 'silver' : COL[m];
  const tol = five ? pick(['brown', 'brown', 'red', 'green']) : pick(['gold', 'gold', 'gold', 'silver', 'brown']);
  return { val, bands: [...digits.map(d => COL[d]), mulCol, tol], base, m, digits };
}
const TOLV = { gold: '±5%', silver: '±10%', brown: '±1%', red: '±2%', green: '±0.5%' };

function genResRead() {
  const five = Math.random() < 0.3;
  const r = resValueParts(five);
  const swapped = r.digits.length === 2 && r.digits[0] !== r.digits[1] && r.digits[1] !== 0 ? (r.digits[1] * 10 + r.digits[0]) * Math.pow(10, r.m) : null;
  const d = [ohm(r.val * 10), ohm(r.val / 10), swapped ? ohm(swapped) : null, ohm(r.val * 100), ohm(r.val / 100)];
  return mc(`What value is this ${five ? '5' : '4'}-band resistor?`, ohm(r.val), d,
    `${r.bands.slice(0, -1).map(cap).join('-')} → ${r.digits.join(', ')} × ${r.m >= 0 ? '1' + '0'.repeat(r.m) : r.m === -1 ? '0.1' : '0.01'} = ${ohm(r.val)} ${TOLV[r.bands[r.bands.length - 1]] || ''}`,
    resistorSVG(r.bands, five));
}

/* ---------- SMD codes ---------- */
const EIA96 = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
const EIAM = { Y: 0.01, X: 0.1, A: 1, B: 10, C: 100, D: 1000, E: 10000, F: 100000 };
function chipSVG(code, kind) {
  const body = kind === 'cap' ? '#b89968' : '#1c1c1c', txt = kind === 'cap' ? '#3a2a14' : '#fff';
  return `<svg viewBox="0 0 200 100" width="220"><rect x="10" y="20" width="180" height="60" rx="4" fill="#d7dde2"/><rect x="34" y="20" width="132" height="60" fill="${body}"/>
    <text x="100" y="62" font-family="monospace" font-size="30" font-weight="700" fill="${txt}" text-anchor="middle">${code}</text></svg>`;
}
function genSMD() {
  const t = Math.random();
  let code, val, how;
  if (t < 0.4) {
    const b = pick(E24), e = rnd(0, 5); val = b * Math.pow(10, e); code = '' + b + e; how = `${b} followed by ${e} zero${e === 1 ? '' : 's'}`;
  } else if (t < 0.6) {
    const b = pick([100, 102, 110, 120, 150, 200, 221, 249, 330, 470, 499, 560, 680, 750, 820, 976]), e = rnd(0, 3); val = b * Math.pow(10, e); code = '' + b + e; how = `4-digit: ${b} followed by ${e} zero${e === 1 ? '' : 's'}`;
  } else if (t < 0.78) {
    const o = pick([['4R7', 4.7], ['R22', 0.22], ['1R0', 1], ['R010', 0.01], ['2R2', 2.2], ['R100', 0.1], ['R47', 0.47], ['6R8', 6.8], ['R005', 0.005], ['3R3', 3.3]]); code = o[0]; val = o[1]; how = 'R marks the decimal point';
  } else {
    const i = rnd(1, 96), L = pick(Object.keys(EIAM)); code = String(i).padStart(2, '0') + L; val = EIA96[i - 1] * EIAM[L]; how = `EIA-96: ${String(i).padStart(2, '0')} = ${EIA96[i - 1]}, ${L} = ×${EIAM[L]}`;
  }
  if (code === '000' || code === '0') { val = 0; }
  if (Math.random() < 0.25 && !code.includes('R') && code.length === 3 && /^\d+$/.test(code)) {
    // reverse question
    const b = code.slice(0, 2), e = +code[2];
    const ds = [b + (e + 1), b + Math.max(0, e - 1), b.split('').reverse().join('') + e, '' + b + '0' + e, b + (e + 2)];
    return mc(`Which 3-digit SMD code means ${ohm(val)}?`, code, ds, how);
  }
  const d = [ohm(val * 10), ohm(val / 10), ohm(val * 100), ohm(val / 100), ohm(val * 1000)];
  return mc('What resistance is this chip resistor?', ohm(val), d, `${code}: ${how} → ${ohm(val)}`, chipSVG(code));
}

/* ---------- capacitor codes ---------- */
function genCap() {
  const t = Math.random();
  if (t < 0.12) {
    const o = pick([['J', '±5%'], ['K', '±10%'], ['M', '±20%'], ['Z', '−20% / +80%']]);
    return mc(`A capacitor is marked "104${o[0]}". What does the ${o[0]} mean?`, o[1], ['±5%', '±10%', '±20%', '−20% / +80%', '±1%'], `J ±5%, K ±10%, M ±20%, Z −20/+80%.`);
  }
  const b = pick(E12), e = rnd(0, 6), pF = b * Math.pow(10, e), code = '' + b + e;
  if (t < 0.4) {
    const ds = [b + '' + (e + 1), b + '' + Math.max(0, e - 1), '' + b + (e + 2), (b * 10) + '' + e, '' + b + Math.max(0, e - 2)];
    return mc(`Which code is a ${capF(pF)} capacitor?`, code, ds, `${capF(pF)} = ${num(pF)} pF = ${b} + ${e} zeros → ${code}`);
  }
  const d = [capF(pF * 10), capF(pF / 10), capF(pF * 1000), capF(pF / 1000), capF(pF * 100)];
  return mc('What value is this capacitor code?', capF(pF), d, `${code} = ${b} + ${e} zeros = ${num(pF)} pF = ${capF(pF)}`, chipSVG(code, 'cap'));
}

/* ---------- Ohm's law ---------- */
const VS = [1.5, 3.3, 5, 9, 12, 15, 24, 48];
const Rlist = () => pick(E12) * Math.pow(10, rnd(0, 4));
function genOhm() {
  const t = rnd(0, 6);
  if (t === 0) { // I = V/R
    const V = pick(VS), R = Rlist(), I = V / R;
    return mc(`${V} V across ${ohm(R)}. What current flows?`, si(I, 'A'), [si(I * 10, 'A'), si(I / 10, 'A'), si(I * 1000, 'A'), si(V * R, 'A')], `I = V ÷ R = ${V} ÷ ${R} = ${si(I, 'A')}`);
  }
  if (t === 1) { // V = IR
    const R = pick(E12) * Math.pow(10, rnd(1, 3)), ImA = pick([1, 2, 5, 10, 15, 20, 50, 100]), V = ImA / 1000 * R;
    return mc(`${ImA} mA flows through ${ohm(R)}. What is the voltage across it?`, si(V, 'V'), [si(V * 10, 'V'), si(V / 10, 'V'), si(V * 1000, 'V'), si(R / ImA, 'V')], `V = I × R = ${ImA / 1000} × ${R} = ${si(V, 'V')}`);
  }
  if (t === 2) { // R = V/I
    const ImA = pick([1, 2, 4, 5, 10, 20, 25, 50]), Rv = pick(E12) * Math.pow(10, rnd(1, 3)), V = +(ImA / 1000 * Rv).toPrecision(3);
    if (V > 60 || V < 0.5) return genOhm();
    const R = V / (ImA / 1000);
    return mc(`What resistance draws ${ImA} mA from ${V} V?`, ohm(R), [ohm(R * 10), ohm(R / 10), ohm(V * ImA), ohm(R * 1000)], `R = V ÷ I = ${V} ÷ ${ImA / 1000} = ${ohm(R)}`);
  }
  if (t === 3) { // P = V²/R
    const V = pick([3.3, 5, 9, 12, 24]), R = pick([10, 22, 47, 100, 220, 470, 1000]), P = V * V / R;
    return mc(`${V} V across ${ohm(R)}. How much power does it dissipate?`, si(P, 'W'), [si(P * 10, 'W'), si(P / 10, 'W'), si(V / R, 'W'), si(P * 2, 'W')], `P = V² ÷ R = ${V}² ÷ ${R} = ${si(P, 'W')}`);
  }
  if (t === 4) { // P = I²R
    const ImA = pick([10, 20, 50, 100, 200, 500]), R = pick([1, 2.2, 4.7, 10, 22, 47, 100]), P = Math.pow(ImA / 1000, 2) * R;
    return mc(`${ImA} mA through ${ohm(R)}. What power is dissipated?`, si(P, 'W'), [si(P * 10, 'W'), si(P / 10, 'W'), si(ImA / 1000 * R, 'W'), si(P * 1000, 'W')], `P = I² × R = ${ImA / 1000}² × ${R} = ${si(P, 'W')}`);
  }
  if (t === 5) { // LED
    const led = pick([['red', 2], ['green', 2.2], ['yellow', 2.1], ['blue', 3], ['white', 3.2]]), Vs = pick([5, 9, 12, 24].filter(v => v > led[1] + 1)), ImA = pick([5, 10, 15, 20]);
    const R = (Vs - led[1]) / (ImA / 1000);
    return mc(`LED resistor: ${Vs} V supply, ${led[0]} LED (Vf ≈ ${led[1]} V), ${ImA} mA. What resistor?`, ohm(R), [ohm(Vs / (ImA / 1000)), ohm(R / 10), ohm(R * 10), ohm((Vs + led[1]) / (ImA / 1000))], `R = (${Vs} − ${led[1]}) ÷ ${ImA / 1000} = ${ohm(R)} → pick the next standard value up`);
  }
  // divider
  const Vin = pick([5, 9, 12, 24]), R1 = pick([1, 2.2, 4.7, 10, 22, 47]) * 1000, R2 = pick([1, 2.2, 4.7, 10, 22, 47]) * 1000, Vo = Vin * R2 / (R1 + R2);
  return mc(`Voltage divider: ${Vin} V in, R1 (top) = ${ohm(R1)}, R2 (bottom) = ${ohm(R2)}. What is Vout?`, si(Vo, 'V'), [si(Vin * R1 / (R1 + R2), 'V'), si(Vin / 2, 'V') === si(Vo, 'V') ? si(Vin / 3, 'V') : si(Vin / 2, 'V'), si(Vin * R2 / R1, 'V'), si(Vo * 2, 'V')], `Vout = Vin × R2 ÷ (R1 + R2) = ${Vin} × ${R2} ÷ ${R1 + R2} = ${si(Vo, 'V')}`);
}

/* ---------- units ---------- */
const FAM = [['F', [-12, -9, -6, -3]], ['Ω', [0, 3, 6]], ['A', [-6, -3, 0]], ['V', [-3, 0, 3]], ['Hz', [0, 3, 6, 9]], ['s', [-9, -6, -3, 0]], ['H', [-9, -6, -3, 0]], ['W', [-3, 0, 3]]];
const PX = { '-12': 'p', '-9': 'n', '-6': 'µ', '-3': 'm', '0': '', '3': 'k', '6': 'M', '9': 'G' };
function genUnits() {
  const [u, exps] = pick(FAM);
  let a = pick(exps), b = pick(exps.filter(x => x !== a && Math.abs(x - a) <= 6));
  const mant = pick([1, 2.2, 4.7, 10, 15, 22, 33, 47, 68, 100, 220, 470, 0.1, 0.47, 0.22, 1.5, 3.3]);
  const val = mant * Math.pow(10, a);
  const ans = val / Math.pow(10, b);
  const fmt = x => parseFloat(x.toPrecision(6)).toLocaleString('en-GB', { maximumSignificantDigits: 6 });
  const q = `${fmt(mant)} ${PX[a]}${u} = ? ${PX[b]}${u}`;
  const c = `${fmt(ans)} ${PX[b]}${u}`;
  const d = [ans * 10, ans / 10, ans * 1000, ans / 1000, ans * 100].map(x => `${fmt(x)} ${PX[b]}${u}`);
  return mc(q, c, d, `Each prefix step is ×1000. ${PX[a] || '(none)'} → ${PX[b] || '(none)'} is ${Math.abs(a - b) / 3} step${Math.abs(a - b) === 3 ? '' : 's'} ${a > b ? 'down, so multiply' : 'up, so divide'} by ${Math.pow(10, Math.abs(a - b)).toLocaleString('en-GB')}.`);
}

/* ---------- series / parallel ---------- */
function resBox(x, y, label, vertical) {
  return vertical ? `<rect x="${x - 10}" y="${y}" width="20" height="44" fill="#0f1419" stroke="currentColor" stroke-width="3"/><text x="${x + 18}" y="${y + 27}" font-size="13" fill="#ffc94d" stroke="none">${label}</text>`
    : `<rect x="${x}" y="${y - 10}" width="50" height="20" fill="#0f1419" stroke="currentColor" stroke-width="3"/><text x="${x + 25}" y="${y - 16}" font-size="13" fill="#ffc94d" stroke="none" text-anchor="middle">${label}</text>`;
}
const term = (x, y, t) => `<circle cx="${x}" cy="${y}" r="5" fill="#3ddc97"/><text x="${x}" y="${y + 22}" font-size="13" fill="#8ea0b2" stroke="none" text-anchor="middle">${t}</text>`;
function genSP() {
  const k = pick([1, 10, 100, 1000, 1000, 10000]);
  const t = rnd(0, 4);
  let svg, ans, ex, d;
  const svgWrap = b => `<svg viewBox="0 0 300 130" width="300" fill="none" stroke="currentColor" stroke-width="3">${b}</svg>`;
  if (t === 0) { // series 2
    const a = pick(E12) * k, b = pick(E12) * k; ans = a + b;
    svg = svgWrap(`<path d="M20,65 H60 M110,65 H180 M230,65 H280"/>${resBox(60, 65, ohm(a))}${resBox(180, 65, ohm(b))}${term(20, 65, 'A')}${term(280, 65, 'B')}`);
    ex = `Series: add them. ${ohm(a)} + ${ohm(b)} = ${ohm(ans)}`; d = [ohm(a * b / (a + b)), ohm(Math.abs(a - b) || a * 2), ohm(ans * 10), ohm(ans / 2)];
  } else if (t === 1) { // series 3
    const a = pick(E12) * k, b = pick(E12) * k, c = pick(E12) * k; ans = a + b + c;
    svg = svgWrap(`<path d="M10,65 H30 M80,65 H125 M175,65 H220 M270,65 H290"/>${resBox(30, 65, ohm(a))}${resBox(125, 65, ohm(b))}${resBox(220, 65, ohm(c))}${term(10, 65, 'A')}${term(290, 65, 'B')}`);
    ex = `Series: ${ohm(a)} + ${ohm(b)} + ${ohm(c)} = ${ohm(ans)}`; d = [ohm(ans / 3), ohm(ans * 10), ohm(a + b), ohm(1 / (1 / a + 1 / b + 1 / c))];
  } else if (t === 2 || t === 3) { // parallel 2
    const p = pick([[1, 1], [6, 3], [12, 6], [30, 60], [10, 40], [20, 30], [10, 15], [12, 4], [47, 47], [22, 22], [100, 100], [60, 30], [18, 9]]);
    const a = p[0] * k, b = p[1] * k; ans = a * b / (a + b);
    svg = svgWrap(`<path d="M20,65 H70 M70,30 V100 M70,30 H125 M175,30 H230 M70,100 H125 M175,100 H230 M230,30 V100 M230,65 H280"/>${resBox(125, 30, ohm(a))}${resBox(125, 100, ohm(b))}${term(20, 65, 'A')}${term(280, 65, 'B')}`);
    ex = `Parallel: product over sum. (${ohm(a)} × ${ohm(b)}) ÷ (${ohm(a)} + ${ohm(b)}) = ${ohm(ans)}`; d = [ohm(a + b), ohm((a + b) / 2), ohm(ans * 2), ohm(Math.min(a, b) * 1.5)];
  } else { // R1 + (R2 || R3)
    const p = pick([[1, 1], [6, 3], [12, 6], [20, 30], [47, 47], [10, 10], [4, 12]]);
    const r1 = pick(E12) * k, a = p[0] * k, b = p[1] * k; const par = a * b / (a + b); ans = r1 + par;
    svg = svgWrap(`<path d="M10,65 H30 M80,65 H120 M120,30 V100 M120,30 H150 M200,30 H230 M120,100 H150 M200,100 H230 M230,30 V100 M230,65 H290"/>${resBox(30, 65, ohm(r1))}${resBox(150, 30, ohm(a))}${resBox(150, 100, ohm(b))}${term(10, 65, 'A')}${term(290, 65, 'B')}`);
    ex = `Parallel pair first: ${ohm(a)} ∥ ${ohm(b)} = ${ohm(par)}, then add the series resistor: ${ohm(par)} + ${ohm(r1)} = ${ohm(ans)}`; d = [ohm(r1 + a + b), ohm(par), ohm(1 / (1 / r1 + 1 / a + 1 / b)), ohm(r1 + a)];
  }
  return mc('What is the total resistance between A and B?', ohm(ans), d, ex, svg);
}

/* ---------- logic gates ---------- */
const GATES = { AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), XOR: (a, b) => a ^ b, XNOR: (a, b) => 1 - (a ^ b), NOT: a => 1 - a };
function genGate() {
  const t = Math.random();
  const g = pick(Object.keys(GATES));
  const svg = `<div style="color:var(--text)">${window.SYM[g].svg.replace('class="sym"', 'width="220"')}</div>`;
  if (t < 0.45) {
    const a = rnd(0, 1), b = rnd(0, 1), out = g === 'NOT' ? GATES.NOT(a) : GATES[g](a, b);
    const vis = `<div class="center">${svg}<div class="gate-io">${g === 'NOT' ? `A = <b>${a}</b>` : `A = <b>${a}</b> &nbsp; B = <b>${b}</b>`}</div></div>`;
    const o = ['0', '1'];
    return { prompt: `What is the output of this gate?`, options: o, correct: out, visual: vis, explain: `${window.SYM[g].name}: ${gateRule(g)}` };
  }
  if (t < 0.75 && g !== 'NOT') {
    const rows = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const tt = `<table class="tbl tt"><tr><th>A</th><th>B</th><th>Out</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><b style="color:var(--gold)">${GATES[g](r[0], r[1])}</b></td></tr>`).join('')}</table>`;
    return mc('Which gate has this truth table?', g, shuffle(['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'].filter(x => x !== g)), `${g}: ${gateRule(g)}`, tt);
  }
  return mc('Which gate is this?', window.SYM[g].name, shuffle(Object.keys(GATES).filter(x => x !== g).map(x => window.SYM[x].name)), gateRule(g), svg);
}
function gateRule(g) { return { AND: '1 only when all inputs are 1.', OR: '1 when any input is 1.', NAND: '0 only when all inputs are 1.', NOR: '1 only when all inputs are 0.', XOR: '1 when the inputs differ.', XNOR: '1 when the inputs are the same.', NOT: 'output is the opposite of the input.' }[g]; }

/* ---------- binary & hex ---------- */
function genBin() {
  const t = rnd(0, 4);
  const bits = rnd(4, 8), n = rnd(1, Math.pow(2, bits) - 1);
  const b = n.toString(2), hx = n.toString(16).toUpperCase();
  const near = [n + 1, n - 1, n + 2, n * 2, n ^ 1, n + 8, n - 4].filter(x => x >= 0 && x !== n);
  if (t === 0) return mc(`Binary <b>${b}</b> in decimal is…`, '' + n, shuffle(near).map(String), `Add the place values of each 1 bit: ${b.split('').map((c, i) => c === '1' ? Math.pow(2, b.length - 1 - i) : null).filter(x => x !== null).join(' + ')} = ${n}`);
  if (t === 1) return mc(`Decimal <b>${n}</b> in binary is…`, b, shuffle(near).map(x => x.toString(2)), `${n} = ${b.split('').map((c, i) => c === '1' ? Math.pow(2, b.length - 1 - i) : null).filter(x => x !== null).join(' + ')}`);
  if (t === 2) return mc(`Hex <b>0x${hx}</b> in decimal is…`, '' + n, shuffle(near.concat([parseInt(hx, 10) || n + 10])).map(String), `0x${hx}: ${hx.length > 1 ? `${hx[0]} × 16 + ${hx[1]}` : hx} = ${n}`);
  if (t === 3) return mc(`Decimal <b>${n}</b> in hex is…`, '0x' + hx, shuffle(near).map(x => '0x' + x.toString(16).toUpperCase()), `${n} ÷ 16 = ${Math.floor(n / 16)} remainder ${n % 16} → 0x${hx}`);
  const b8 = n.toString(2).padStart(8, '0');
  return mc(`Binary <b>${b8.slice(0, 4)} ${b8.slice(4)}</b> in hex is…`, '0x' + n.toString(16).toUpperCase().padStart(2, '0'), shuffle(near).map(x => '0x' + x.toString(16).toUpperCase().padStart(2, '0')), `Each group of 4 bits is one hex digit: ${b8.slice(0, 4)} = ${parseInt(b8.slice(0, 4), 2).toString(16).toUpperCase()}, ${b8.slice(4)} = ${parseInt(b8.slice(4), 2).toString(16).toUpperCase()}`);
}

/* ---------- symbols & designators ---------- */
function genSym() {
  const keys = Object.keys(window.SYM).filter(k => k !== 'BUF');
  const k = pick(keys), s = window.SYM[k];
  const others = shuffle(keys.filter(x => x !== k && window.SYM[x].name !== s.name)).map(x => window.SYM[x].name);
  return mc('What is this symbol?', s.name, others, '', `<div style="color:var(--text)">${s.svg.replace('class="sym"', 'width="200"')}</div>`);
}
const DES = [['R', 'Resistor'], ['C', 'Capacitor'], ['L', 'Inductor'], ['D', 'Diode'], ['Q', 'Transistor'], ['U', 'Integrated circuit'], ['F', 'Fuse'], ['K', 'Relay'], ['J', 'Connector (jack)'], ['Y', 'Crystal'], ['T', 'Transformer'], ['SW', 'Switch'], ['FB', 'Ferrite bead'], ['TP', 'Test point'], ['RN', 'Resistor network'], ['BT', 'Battery'], ['LS', 'Loudspeaker'], ['BZ', 'Buzzer'], ['VR', 'Variable resistor'], ['LED', 'Light emitting diode'], ['MH', 'Mounting hole'], ['FID', 'Fiducial']];
function genDes() {
  const p = pick(DES), others = shuffle(DES.filter(x => x !== p));
  if (Math.random() < 0.6) return mc(`On a PCB, what is <b>${p[0]}${rnd(1, 40)}</b>?`, p[1], others.map(x => x[1]), `${p[0]} = ${p[1]}`);
  return mc(`What designator letter(s) is used for a <b>${p[1].toLowerCase()}</b>?`, p[0], others.map(x => x[0]), `${p[1]} → ${p[0]}`);
}

/* ---------- defects (with pictures) ---------- */
const BOARD = `<rect x="0" y="92" width="240" height="18" fill="#1f6b46"/>`;
const PAD = (x, w = 44) => `<rect x="${x}" y="88" width="${w}" height="4" fill="#d08a3c"/>`;
const CHIP = (x, y, w = 110, h = 20, rot = 0, cx = 0, cy = 0) => `<g ${rot ? `transform="rotate(${rot} ${cx} ${cy})"` : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#222"/><rect x="${x}" y="${y}" width="16" height="${h}" fill="#c9d1d8"/><rect x="${x + w - 16}" y="${y}" width="16" height="${h}" fill="#c9d1d8"/></g>`;
const FIL = (x1, x2, top) => `<path d="M${x1},${top} L${x2},88 L${x1},88 Z" fill="#aab4bc"/>`;
const sideWrap = b => `<svg viewBox="0 0 240 115" width="280">${BOARD}${b}</svg>`;
const DEFECT_PICS = {
  good: sideWrap(`${PAD(40)}${PAD(156)}${CHIP(65, 68)}${FIL(65, 42, 70)}${FIL(175, 198, 70)}`),
  tomb: sideWrap(`${PAD(40)}${PAD(156)}<path d="M178,88 L198,88 L178,30 Z" fill="#aab4bc"/>${CHIP(158, -24, 20, 110)}<rect x="40" y="84" width="40" height="4" fill="#aab4bc"/>`),
  insuff: sideWrap(`${PAD(40)}${PAD(156)}${CHIP(65, 68)}${FIL(65, 58, 84)}${FIL(175, 182, 84)}`),
  balls: sideWrap(`${PAD(40)}${PAD(156)}${CHIP(65, 68)}${FIL(65, 42, 70)}${FIL(175, 198, 70)}<g fill="#cfd6dc"><circle cx="22" cy="86" r="3"/><circle cx="110" cy="86" r="3"/><circle cx="214" cy="85" r="3.5"/><circle cx="96" cy="86" r="2.5"/></g>`),
  missing: sideWrap(`${PAD(40)}${PAD(156)}<rect x="44" y="82" width="36" height="6" rx="2" fill="#9aa3aa"/><rect x="160" y="82" width="36" height="6" rx="2" fill="#9aa3aa"/>`),
  lifted: `<svg viewBox="0 0 240 115" width="280">${BOARD}${PAD(150, 60)}<rect x="30" y="40" width="80" height="40" fill="#222"/><path d="M110,52 H135 L150,74 H200" stroke="#c9d1d8" stroke-width="6" fill="none"/></svg>`,
  bridge: `<svg viewBox="0 0 240 120" width="280"><rect width="240" height="120" fill="#1f6b46"/><rect x="40" y="40" width="160" height="40" fill="#222"/>${[0, 1, 2, 3].map(i => `<rect x="${55 + i * 38}" y="80" width="14" height="30" fill="#d08a3c"/><rect x="${57 + i * 38}" y="80" width="10" height="22" fill="#c9d1d8"/><rect x="${55 + i * 38}" y="10" width="14" height="30" fill="#d08a3c"/><rect x="${57 + i * 38}" y="18" width="10" height="22" fill="#c9d1d8"/>`).join('')}<ellipse cx="100" cy="98" rx="30" ry="9" fill="#cfd6dc"/></svg>`,
  skew: `<svg viewBox="0 0 240 120" width="280"><rect width="240" height="120" fill="#1f6b46"/><rect x="30" y="35" width="50" height="50" fill="#d08a3c"/><rect x="160" y="35" width="50" height="50" fill="#d08a3c"/><g transform="rotate(22 120 60)"><rect x="55" y="45" width="130" height="30" fill="#222"/><rect x="55" y="45" width="20" height="30" fill="#c9d1d8"/><rect x="165" y="45" width="20" height="30" fill="#c9d1d8"/></g></svg>`,
  flipped: `<svg viewBox="0 0 240 120" width="280"><rect width="240" height="120" fill="#1f6b46"/><rect x="30" y="35" width="50" height="50" fill="#d08a3c"/><rect x="160" y="35" width="50" height="50" fill="#d08a3c"/><rect x="55" y="45" width="130" height="30" fill="#f2f2ee"/><rect x="55" y="45" width="20" height="30" fill="#c9d1d8"/><rect x="165" y="45" width="20" height="30" fill="#c9d1d8"/></svg>`,
  hip: `<svg viewBox="0 0 240 120" width="280"><rect x="20" y="10" width="200" height="22" fill="#222"/><rect x="0" y="100" width="240" height="20" fill="#1f6b46"/><rect x="95" y="96" width="50" height="4" fill="#d08a3c"/><ellipse cx="120" cy="88" rx="30" ry="9" fill="#9aa3aa"/><circle cx="120" cy="54" r="24" fill="#cfd6dc"/><path d="M92,80 Q120,74 148,80" stroke="#0f1419" stroke-width="3" fill="none"/></svg>`,
  void: `<svg viewBox="0 0 240 120" width="280"><rect width="240" height="120" fill="#cfcfcf"/>${[0, 1, 2, 3].map(i => [0, 1].map(j => `<circle cx="${45 + i * 50}" cy="${35 + j * 50}" r="20" fill="#3a3a3a"/>`).join('')).join('')}<circle cx="102" cy="78" r="9" fill="#9a9a9a"/><circle cx="90" cy="88" r="4" fill="#9a9a9a"/><circle cx="150" cy="30" r="5" fill="#9a9a9a"/></svg>`,
};
const DEFECT_Q = [
  ['pic', 'tomb', 'Tombstoning', 'One end wetted first and surface tension pulled the chip upright.'],
  ['pic', 'good', 'Acceptable joint', 'Both ends have smooth concave fillets wetting the pad and termination.'],
  ['pic', 'insuff', 'Insufficient solder', 'The fillets are tiny — not enough paste/solder.'],
  ['pic', 'balls', 'Solder balls', 'Stray spheres of solder — moisture in paste, fast ramp or off-pad paste.'],
  ['pic', 'missing', 'Missing component', 'Paste on pads but no part — mispick or knocked off.'],
  ['pic', 'lifted', 'Lifted lead', 'The gull-wing lead is above the pad — coplanarity or handling damage.'],
  ['pic', 'bridge', 'Solder bridge', 'Solder joins two neighbouring leads — a short.'],
  ['pic', 'skew', 'Skewed / misaligned part', 'The part is rotated off its pads.'],
  ['pic', 'flipped', 'Upside-down chip', 'The white ceramic underside is showing — no marking visible.'],
  ['pic', 'hip', 'Head-in-pillow', 'The BGA ball rests on the paste but they never merged.'],
  ['pic', 'void', 'Voids (X-ray)', 'Lighter bubbles inside the dark balls on X-ray are gas voids.'],
  ['txt', 'AOI flags a dull, grainy, lumpy joint with poor wetting on a THT lead.', 'Cold joint', 'Not enough heat — weak and unreliable.'],
  ['txt', 'A chip is soldered standing on its long edge instead of lying flat.', 'Billboarding', 'Usually a placement/feeder issue.'],
  ['txt', 'Solder wetted the pad then pulled back, leaving a thin film and irregular mounds.', 'Dewetting', 'Often contamination of the surface.'],
  ['txt', 'Solder has not stuck to the pad at all — bare metal shows.', 'Non-wetting', 'Oxidised or contaminated surface.'],
  ['txt', 'White spots appear inside the laminate after rework.', 'Measling', 'Glass fibres separating from resin due to heat/stress.'],
  ['txt', 'Sharp spikes of solder hang from THT joints after wave soldering.', 'Icicles', 'Solder drag on exit from the wave.'],
  ['txt', 'A thin crystalline filament grows from a pure tin finish months later.', 'Tin whisker', 'Can grow long enough to short adjacent conductors.'],
  ['txt', 'Board flexed at depanelling; a capacitor near the edge now shorts the rail.', 'Cracked MLCC', 'Ceramic caps crack under board flex.'],
  ['txt', 'Every board has D3 fitted backwards in the same way.', 'Polarity / rotation program error', 'A systematic error — check the placement program or tape loading.'],
];
const DEFECT_NAMES = [...new Set(DEFECT_Q.map(d => d[2]))];
function genDefect() {
  const d = pick(DEFECT_Q);
  const others = shuffle(DEFECT_NAMES.filter(n => n !== d[2]));
  if (d[0] === 'pic') return mc('What do you see?', d[2], others, d[3], DEFECT_PICS[d[1]]);
  return mc(esc(d[1]), d[2], others, d[3]);
}

/* ---------- polarity ---------- */
function genPolarity() {
  const left = Math.random() < 0.5; // marking on left?
  const L = 'Left end', R = 'Right end';
  const kind = rnd(0, 6);
  const W = b => `<svg viewBox="0 0 260 110" width="280">${b}<text x="20" y="105" fill="#8ea0b2" font-size="12">LEFT</text><text x="240" y="105" fill="#8ea0b2" font-size="12" text-anchor="end">RIGHT</text></svg>`;
  if (kind === 0) { // axial diode
    const bx = left ? 82 : 166;
    return mc('Which end of this diode is the <b>cathode</b>?', left ? L : R, [left ? R : L], 'The band marks the cathode.',
      W(`<line x1="0" y1="50" x2="260" y2="50" stroke="#b9c1c8" stroke-width="4"/><rect x="70" y="34" width="120" height="32" rx="6" fill="#222"/><rect x="${bx}" y="34" width="12" height="32" fill="#ddd"/>`));
  }
  if (kind === 1) { // SMD diode SOD-123
    const bx = left ? 74 : 172;
    return mc('Which end of this SMD diode is the <b>cathode</b>?', left ? L : R, [left ? R : L], 'The band/line marks the cathode — match it to the silkscreen bar.',
      W(`<rect x="40" y="35" width="30" height="30" fill="#c9d1d8"/><rect x="190" y="35" width="30" height="30" fill="#c9d1d8"/><rect x="66" y="28" width="128" height="44" rx="4" fill="#2a2a2a"/><rect x="${bx}" y="28" width="12" height="44" fill="#ddd"/>`));
  }
  if (kind === 2) { // tantalum
    const bx = left ? 68 : 180;
    const askPos = Math.random() < 0.5;
    const markSide = left ? L : R, other = left ? R : L;
    return mc(`Which end of this tantalum capacitor is <b>${askPos ? 'positive (+)' : 'negative (−)'}</b>?`, askPos ? markSide : other, [askPos ? other : markSide], 'On tantalum caps the bar marks POSITIVE (opposite of electrolytics).',
      W(`<rect x="40" y="38" width="26" height="24" fill="#c9d1d8"/><rect x="194" y="38" width="26" height="24" fill="#c9d1d8"/><rect x="60" y="26" width="140" height="48" rx="3" fill="#e0b100"/><rect x="${bx}" y="26" width="12" height="48" fill="#7a5a00"/><text x="130" y="56" text-anchor="middle" font-family="monospace" font-size="16" fill="#3a2a00" font-weight="700">107A</text>`));
  }
  if (kind === 3) { // electrolytic radial, stripe side
    const sx = left ? 82 : 150;
    const shortLeft = left;
    return mc('Which lead of this electrolytic capacitor is <b>negative</b>?', left ? 'Left lead' : 'Right lead', [left ? 'Right lead' : 'Left lead'], 'The stripe (with − signs) marks negative, and the negative lead is shorter.',
      `<svg viewBox="0 0 260 150" width="260"><rect x="80" y="10" width="100" height="90" rx="10" fill="#1d3c78"/><rect x="${sx}" y="10" width="28" height="90" fill="#c5cbd6"/>${[25, 45, 65, 85].map(y => `<text x="${sx + 14}" y="${y + 5}" text-anchor="middle" fill="#1d3c78" font-size="16" font-weight="700">−</text>`).join('')}
        <line x1="110" y1="100" x2="110" y2="${shortLeft ? 128 : 145}" stroke="#b9c1c8" stroke-width="4"/><line x1="150" y1="100" x2="150" y2="${shortLeft ? 145 : 128}" stroke="#b9c1c8" stroke-width="4"/>
        <text x="60" y="140" fill="#8ea0b2" font-size="12">LEFT</text><text x="200" y="140" fill="#8ea0b2" font-size="12" text-anchor="end">RIGHT</text></svg>`);
  }
  if (kind === 4) { // LED legs
    const longLeft = left;
    const askAnode = Math.random() < 0.5;
    const anode = longLeft ? 'Left leg' : 'Right leg', cath = longLeft ? 'Right leg' : 'Left leg';
    return mc(`Which leg of this LED is the <b>${askAnode ? 'anode (+)' : 'cathode (−)'}</b>?`, askAnode ? anode : cath, [askAnode ? cath : anode], 'The longer leg is the anode (+). The flat edge on the rim marks the cathode.',
      `<svg viewBox="0 0 260 160" width="240"><path d="M100,70 V35 A30,30 0 0 1 160,35 V70 Z" fill="#ff5a5a" opacity=".9"/><rect x="${longLeft ? 92 : 94}" y="70" width="${76 - 2}" height="10" fill="#ff5a5a"/>${longLeft ? '<rect x="166" y="70" width="4" height="10" fill="#0f1419"/>' : '<rect x="90" y="70" width="4" height="10" fill="#0f1419"/>'}
       <line x1="115" y1="80" x2="115" y2="${longLeft ? 155 : 130}" stroke="#b9c1c8" stroke-width="4"/><line x1="145" y1="80" x2="145" y2="${longLeft ? 130 : 155}" stroke="#b9c1c8" stroke-width="4"/>
       <text x="70" y="150" fill="#8ea0b2" font-size="12">LEFT</text><text x="190" y="150" fill="#8ea0b2" font-size="12" text-anchor="end">RIGHT</text></svg>`);
  }
  if (kind === 5) { // diode symbol
    const flip = left;
    return mc('In this schematic symbol, which end is the <b>cathode</b>?', flip ? L : R, [flip ? R : L], 'The bar is the cathode; the triangle points in the direction of conventional current.',
      `<div style="color:var(--text)">${window.SYM.diode.svg.replace('class="sym"', `width="220" style="${flip ? 'transform:scaleX(-1)' : ''}"`)}</div>`);
  }
  // IC pin 1 corner
  const corner = pick(['Top-left', 'Top-right', 'Bottom-left', 'Bottom-right']);
  const cx = corner.includes('left') ? 62 : 198, cy = corner.startsWith('Top') ? 32 : 88;
  return mc('Where is pin 1 on this IC?', corner, ['Top-left', 'Top-right', 'Bottom-left', 'Bottom-right'].filter(c => c !== corner), 'The dot marks pin 1. Pins then count anticlockwise from the top view.',
    `<svg viewBox="0 0 260 120" width="270">${[0, 1, 2, 3].map(i => `<rect x="${70 + i * 36}" y="0" width="12" height="14" fill="#c9d1d8"/><rect x="${70 + i * 36}" y="106" width="12" height="14" fill="#c9d1d8"/>`).join('')}<rect x="50" y="14" width="160" height="92" rx="4" fill="#222"/><circle cx="${cx}" cy="${cy}" r="6" fill="#666"/><text x="130" y="66" fill="#999" font-size="14" font-family="monospace" text-anchor="middle">LM358</text></svg>`);
}

/* ---------- packages ---------- */
const PK = {
  '0603 chip': `<rect x="80" y="40" width="20" height="40" fill="#c9d1d8"/><rect x="160" y="40" width="20" height="40" fill="#c9d1d8"/><rect x="100" y="40" width="60" height="40" fill="#222"/><text x="130" y="66" fill="#fff" font-size="14" text-anchor="middle" font-family="monospace">103</text>`,
  'SOT-23': `<rect x="95" y="35" width="70" height="50" fill="#222"/><rect x="100" y="85" width="12" height="20" fill="#c9d1d8"/><rect x="148" y="85" width="12" height="20" fill="#c9d1d8"/><rect x="124" y="15" width="12" height="20" fill="#c9d1d8"/>`,
  'SOT-223': `<rect x="70" y="30" width="120" height="56" fill="#222"/><rect x="95" y="6" width="70" height="24" fill="#c9d1d8"/>${[0, 1, 2].map(i => `<rect x="${84 + i * 40}" y="86" width="12" height="26" fill="#c9d1d8"/>`).join('')}`,
  'SOIC-8': `<rect x="80" y="25" width="100" height="70" fill="#222"/><circle cx="92" cy="85" r="4" fill="#555"/>${[0, 1, 2, 3].map(i => `<rect x="${88 + i * 24}" y="95" width="10" height="18" fill="#c9d1d8"/><rect x="${88 + i * 24}" y="7" width="10" height="18" fill="#c9d1d8"/>`).join('')}`,
  'TSSOP-20': `<rect x="40" y="35" width="180" height="50" fill="#222"/>${[...Array(10)].map((_, i) => `<rect x="${46 + i * 17.5}" y="85" width="6" height="16" fill="#c9d1d8"/><rect x="${46 + i * 17.5}" y="19" width="6" height="16" fill="#c9d1d8"/>`).join('')}`,
  'QFP': `<rect x="80" y="20" width="100" height="80" fill="#222"/><circle cx="92" cy="32" r="4" fill="#555"/>${[...Array(8)].map((_, i) => `<rect x="${86 + i * 12}" y="4" width="5" height="16" fill="#c9d1d8"/><rect x="${86 + i * 12}" y="100" width="5" height="16" fill="#c9d1d8"/>`).join('')}${[...Array(6)].map((_, i) => `<rect x="64" y="${27 + i * 12}" width="16" height="5" fill="#c9d1d8"/><rect x="180" y="${27 + i * 12}" width="16" height="5" fill="#c9d1d8"/>`).join('')}`,
  'QFN (bottom view)': `<rect x="80" y="15" width="100" height="90" fill="#333"/><rect x="105" y="35" width="50" height="50" fill="#c9d1d8"/>${[...Array(6)].map((_, i) => `<rect x="${90 + i * 14}" y="15" width="7" height="12" fill="#c9d1d8"/><rect x="${90 + i * 14}" y="93" width="7" height="12" fill="#c9d1d8"/><rect x="80" y="${25 + i * 13}" width="12" height="7" fill="#c9d1d8"/><rect x="168" y="${25 + i * 13}" width="12" height="7" fill="#c9d1d8"/>`).join('')}`,
  'BGA (bottom view)': `<rect x="75" y="10" width="110" height="100" fill="#1f5a3c"/>${[...Array(6)].map((_, i) => [...Array(6)].map((_, j) => `<circle cx="${90 + i * 16}" cy="${23 + j * 15}" r="5.5" fill="#cfd6dc"/>`).join('')).join('')}`,
  'TO-220': `<rect x="95" y="0" width="70" height="34" fill="#c9d1d8"/><circle cx="130" cy="16" r="8" fill="#0f1419"/><rect x="95" y="34" width="70" height="46" fill="#222"/>${[0, 1, 2].map(i => `<rect x="${106 + i * 21}" y="80" width="7" height="38" fill="#c9d1d8"/>`).join('')}`,
  'TO-92': `<path d="M100,60 V20 A30,30 0 0 1 160,20 V60 Z" fill="#222"/>${[0, 1, 2].map(i => `<rect x="${108 + i * 20}" y="60" width="4" height="55" fill="#c9d1d8"/>`).join('')}`,
  'DIP-8': `<rect x="70" y="30" width="120" height="60" fill="#222"/><path d="M70,52 A8,8 0 0 1 70,68" fill="#0f1419"/>${[0, 1, 2, 3].map(i => `<rect x="${84 + i * 28}" y="90" width="8" height="22" fill="#c9d1d8"/><rect x="${84 + i * 28}" y="8" width="8" height="22" fill="#c9d1d8"/>`).join('')}`,
  'DPAK (TO-252)': `<rect x="85" y="10" width="90" height="40" fill="#c9d1d8"/><rect x="80" y="40" width="100" height="45" fill="#222"/><rect x="95" y="85" width="10" height="28" fill="#c9d1d8"/><rect x="155" y="85" width="10" height="28" fill="#c9d1d8"/>`,
  'SMD electrolytic (V-chip)': `<rect x="80" y="15" width="100" height="100" fill="#ddd"/><circle cx="130" cy="65" r="45" fill="#b9c3cf"/><path d="M85,65 A45,45 0 0 1 175,65 Z" fill="#1b2a50" transform="rotate(180 130 65)"/>`,
};
function genPackage() {
  const keys = Object.keys(PK), k = pick(keys);
  return mc('What package is this?', k, shuffle(keys.filter(x => x !== k)), '', `<svg viewBox="0 0 260 120" width="270">${PK[k]}</svg>`);
}

/* ---------- speed round ---------- */
function genSpeed() { return A.bankToMC(A.weightedPick(A.studiedPool(), 1)[0]); }

/* ---------- Band Builder (custom screen) ---------- */
A.SCREENS.bandBuilder = el => {
  A.setTitle('Band Builder');
  let round = 0, score = 0;
  const ROUNDS = 8;
  function next() {
    if (round >= ROUNDS) return finish();
    const base = pick(E12), m = rnd(0, 5), val = base * Math.pow(10, m);
    let bands = ['brown', 'black', 'black'], slot = 0;
    const draw = () => {
      el.innerHTML = `<div class="qhead"><span>Round ${round + 1} of ${ROUNDS}</span><span>✓ ${score}</span></div><div class="bar"><i style="width:${round / ROUNDS * 100}%"></i></div>
        <div class="qprompt center">Make a <span style="color:var(--gold)">${ohm(val)}</span> ±5% resistor</div>
        <div class="qvisual">${resistorSVG([...bands, 'gold'])}</div>
        <div class="band-slots">${['1st digit', '2nd digit', 'Multiplier'].map((t, i) => `<button class="${i === slot ? 'on' : ''}" data-s="${i}">${t}<br><b>${cap(bands[i])}</b></button>`).join('')}</div>
        <div class="band-picker">${COL.map((c, i) => `<button data-c="${c}" style="background:${HEX[c]};${c === 'white' || c === 'yellow' ? 'color:#000;text-shadow:none' : ''}" class="${bands[slot] === c ? 'sel' : ''}">${cap(c)}<br>${i}</button>`).join('')}</div>
        <button class="btn" id="chk">Check</button><div id="fb"></div>`;
      on(el, '[data-s]', 'click', b => { slot = +b.dataset.s; draw(); });
      on(el, '[data-c]', 'click', b => { bands[slot] = b.dataset.c; if (slot < 2) slot++; draw(); });
      $('#chk', el).onclick = () => {
        const got = (COL.indexOf(bands[0]) * 10 + COL.indexOf(bands[1])) * Math.pow(10, COL.indexOf(bands[2]));
        const ok = got === val;
        const want = [String(base)[0], String(base)[1], m].map(d => cap(COL[+d]));
        A.recordAnswer(null, ok); if (ok) score++; else A.vibrate(120);
        $('#fb', el).innerHTML = `<div class="explain ${ok ? 'good' : 'bad'}">${ok ? '✅ Correct!' : `❌ You made ${ohm(got)}. ${ohm(val)} is ${want.join(' - ')} (- Gold)`}</div><button class="btn" id="nx">${round + 1 < ROUNDS ? 'Next' : 'Finish'}</button>`;
        $('#chk', el).style.display = 'none';
        $('#nx', el).onclick = () => { round++; next(); };
      };
    };
    draw();
  }
  function finish() {
    const g = A.S.games.bandbuild || (A.S.games.bandbuild = { best: 0, plays: 0 }); g.plays++; g.best = Math.max(g.best, Math.round(score / ROUNDS * 100));
    A.addXP(score * 6, 'Band Builder');
    el.innerHTML = `<div class="card center"><div class="result-big">${score}/${ROUNDS}</div><p class="muted">Best: ${g.best}%</p></div><div class="btn-row"><button class="btn ghost" id="ag">Play again</button><button class="btn" id="dn">Done</button></div>`;
    $('#ag', el).onclick = () => { round = 0; score = 0; next(); };
    $('#dn', el).onclick = () => A.back();
  }
  next();
};

/* ---------- Match pairs (custom screen) ---------- */
A.SCREENS.match = el => {
  A.setTitle('Match Pairs');
  const studied = new Set(A.studiedPool().map(q => q.m));
  let pool = A.CARDS.filter(c => c.b.length <= 70 && c.f.length <= 40);
  const sp = pool.filter(c => studied.has(c.m));
  if (sp.length >= 12) pool = sp;
  const pairs = shuffle(pool).slice(0, 6);
  const tiles = shuffle(pairs.flatMap((c, i) => [{ i, t: c.f, side: 'f' }, { i, t: c.b, side: 'b' }]));
  let sel = null, matched = 0, moves = 0, lock = false;
  const t0 = Date.now();
  el.innerHTML = `<p class="small muted center">Tap a term, then tap its matching answer.</p><div class="match-grid">${tiles.map((t, k) => `<button data-k="${k}" style="${t.side === 'f' ? 'font-weight:700' : 'font-size:12.5px'}">${esc(t.t)}</button>`).join('')}</div><p class="center small muted" id="mv">Moves: 0</p>`;
  on(el, '[data-k]', 'click', b => {
    if (lock || b.classList.contains('done')) return;
    const k = +b.dataset.k;
    if (sel === null) { sel = k; b.classList.add('sel'); return; }
    if (sel === k) { b.classList.remove('sel'); sel = null; return; }
    moves++; $('#mv', el).textContent = 'Moves: ' + moves;
    const a = tiles[sel], c = tiles[k], bA = el.querySelector(`[data-k="${sel}"]`);
    if (a.i === c.i && a.side !== c.side) {
      bA.classList.remove('sel'); bA.classList.add('done'); b.classList.add('done'); matched++; sel = null;
      if (matched === pairs.length) setTimeout(done, 400);
    } else {
      lock = true; b.classList.add('nope'); bA.classList.add('nope'); A.vibrate(60);
      setTimeout(() => { b.classList.remove('nope'); bA.classList.remove('nope', 'sel'); sel = null; lock = false; }, 600);
    }
  });
  function done() {
    const secs = Math.round((Date.now() - t0) / 1000), stars = moves <= 8 ? 3 : moves <= 12 ? 2 : 1;
    const g = A.S.games.match || (A.S.games.match = { best: 0, plays: 0 }); g.plays++; g.best = Math.max(g.best, stars);
    A.addXP(10 + stars * 5, 'Match');
    el.innerHTML = `<div class="card center"><div class="result-big">${'⭐'.repeat(stars)}</div><p>${moves} moves · ${secs}s</p></div>
      <div class="card">${pairs.map(c => `<div class="review-item"><b>${esc(c.f)}</b><div class="small muted">${esc(c.b)}</div></div>`).join('')}</div>
      <div class="btn-row"><button class="btn ghost" id="ag">Play again</button><button class="btn" id="dn">Done</button></div>`;
    $('#ag', el).onclick = () => A.render();
    $('#dn', el).onclick = () => A.back();
  }
};

/* ---------- registry ---------- */
const GAMES = [
  { id: 'resread', ic: '🌈', name: 'Resistor Reader', desc: 'Read 4- and 5-band colour codes', gen: genResRead },
  { id: 'bandbuild', ic: '🎨', name: 'Band Builder', desc: 'Paint the bands for a given value', screen: 'bandBuilder' },
  { id: 'smd', ic: '⬛', name: 'SMD Code Breaker', desc: '103, 4702, 4R7 and EIA-96 codes', gen: genSMD },
  { id: 'capcode', ic: '🟫', name: 'Capacitor Codes', desc: '104 = 100 nF and friends', gen: genCap },
  { id: 'ohm', ic: '⚡', name: "Ohm's Law Challenge", desc: 'V, I, R, power, LED resistors, dividers', gen: genOhm },
  { id: 'units', ic: '📏', name: 'Unit Converter', desc: 'µF ↔ nF ↔ pF, kΩ, mA, MHz…', gen: genUnits },
  { id: 'sp', ic: '🔗', name: 'Series & Parallel', desc: 'Work out total resistance', gen: genSP },
  { id: 'gates', ic: '🧮', name: 'Logic Gate Lab', desc: 'Outputs, truth tables and symbols', gen: genGate },
  { id: 'binary', ic: '💾', name: 'Binary & Hex', desc: 'Convert between number bases', gen: genBin },
  { id: 'symbols', ic: '📐', name: 'Symbol Spotter', desc: 'Name the schematic symbol', gen: genSym },
  { id: 'designators', ic: '🏷️', name: 'Designator Dash', desc: 'R, C, Q, U, K, Y…', gen: genDes },
  { id: 'defects', ic: '🔍', name: 'Defect Detective', desc: 'Spot solder & assembly defects', gen: genDefect },
  { id: 'polarity', ic: '➕', name: 'Polarity Patrol', desc: 'Find cathodes, negatives and pin 1', gen: genPolarity },
  { id: 'packages', ic: '📦', name: 'Package ID', desc: 'SOT-23, QFN, BGA, TO-220…', gen: genPackage },
  { id: 'match', ic: '🧩', name: 'Match Pairs', desc: 'Memory game with flashcards', screen: 'match' },
  { id: 'speed', ic: '⏱️', name: 'Speed Round', desc: '60 seconds, as many as you can', gen: genSpeed, timer: 60 },
];
window.GAMES = GAMES;
window.startGame = function (id) {
  const g = GAMES.find(x => x.id === id);
  if (g.screen) { A.go(g.screen, {}); return; }
  A.runMC({ title: g.name, gen: g.gen, count: g.timer ? 500 : 10, timer: g.timer, xpPer: g.timer ? 3 : 4, gameId: g.id });
};
A.SCREENS.games = el => {
  A.setTitle('Games');
  el.innerHTML = `<p class="muted small">Each game makes fresh questions every time, so you can play them endlessly.</p>` + GAMES.map(g => {
    const s = A.S.games[g.id];
    return `<button class="list-item" data-g="${g.id}"><span class="ic">${g.ic}</span><span class="body"><b>${esc(g.name)}</b><small>${esc(g.desc)}</small></span>
      <span class="end">${s ? (g.id === 'match' ? '⭐'.repeat(s.best) : g.timer ? 'Best ' + s.best : s.best + '%') : ''}</span></button>`;
  }).join('');
  on(el, '[data-g]', 'click', b => window.startGame(b.dataset.g));
};
// expose generators for testing
window.__gen = { genResRead, genSMD, genCap, genOhm, genUnits, genSP, genGate, genBin, genSym, genDes, genDefect, genPolarity, genPackage, si };
})();
