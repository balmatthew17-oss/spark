// Spark tools: calculators and a cheat sheet
(function () {
'use strict';
const A = window.App, { esc, $, on } = A;
const si = window.__gen.si;
const COL = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const MUL = { black: 1, brown: 10, red: 100, orange: 1e3, yellow: 1e4, green: 1e5, blue: 1e6, violet: 1e7, gold: 0.1, silver: 0.01 };
const TOL = { brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%', violet: '±0.1%', grey: '±0.05%', gold: '±5%', silver: '±10%' };
const cap = s => s[0].toUpperCase() + s.slice(1);
const sel = (id, opts, v) => `<select id="${id}">${opts.map(o => `<option value="${o}" ${o === v ? 'selected' : ''}>${cap(o)}</option>`).join('')}</select>`;
const field = (label, inner) => `<div class="field"><label>${label}</label>${inner}</div>`;
const inp = (id, ph, v = '') => `<input id="${id}" inputmode="decimal" placeholder="${ph}" value="${v}">`;
// parse "4k7", "10k", "2.2M", "100n", "4R7", "0.1u"
function parseVal(s) {
  if (s == null) return NaN;
  s = String(s).trim().replace(/\s/g, '').replace(/[ΩFVAHz]/g, '').replace('µ', 'u');
  if (!s) return NaN;
  const m = s.match(/^(\d*)\.?(\d*)?([pnumkKMRG]?)(\d*)$/);
  const mult = { p: 1e-12, n: 1e-9, u: 1e-6, m: 1e-3, k: 1e3, K: 1e3, M: 1e6, G: 1e9, R: 1, '': 1 };
  if (m && m[3] && m[4]) return parseFloat((m[1] || '0') + '.' + m[4]) * mult[m[3]]; // 4k7 style
  const m2 = s.match(/^([\d.]+)([pnumkKMRG]?)$/);
  if (m2) return parseFloat(m2[1]) * mult[m2[2]];
  return NaN;
}

const TOOLS = [
  { id: 'calc', ic: '🧮', name: 'Calculator', desc: 'Understands k, m, µ, n, p and ∥ (parallel)' },
  { id: 'colour', ic: '🌈', name: 'Resistor colour code', desc: 'Bands → value' },
  { id: 'smd', ic: '⬛', name: 'SMD resistor code', desc: '103, 4702, 4R7, 01C → value' },
  { id: 'capc', ic: '🟫', name: 'Capacitor code', desc: '104 → 100 nF' },
  { id: 'ohm', ic: '⚡', name: "Ohm's law & power", desc: 'Enter any two values' },
  { id: 'led', ic: '💡', name: 'LED resistor', desc: 'Series resistor for an LED' },
  { id: 'div', ic: '➗', name: 'Voltage divider', desc: 'Vout from R1 and R2' },
  { id: 'sp', ic: '🔗', name: 'Series / parallel', desc: 'Combine resistors or caps' },
  { id: 'rc', ic: '⏳', name: 'RC time constant', desc: 'τ and cut-off frequency' },
  { id: 'cheat', ic: '📋', name: 'Cheat sheet', desc: 'Pinouts, polarity, key numbers' },
];
A.SCREENS.tools = el => {
  A.setTitle('Tools');
  el.innerHTML = TOOLS.map(t => `<button class="list-item" data-t="${t.id}"><span class="ic">${t.ic}</span><span class="body"><b>${t.name}</b><small>${t.desc}</small></span><span class="end">›</span></button>`).join('') +
    `<p class="small muted">Tip: type values like <b>4k7</b>, <b>2.2M</b>, <b>100n</b> or <b>4R7</b>.</p>`;
  on(el, '[data-t]', 'click', b => b.dataset.t === 'calc' ? window.Calc.open() : A.go('tool', { id: b.dataset.t }));
};
A.SCREENS.tool = (el, { id }) => {
  const t = TOOLS.find(x => x.id === id); A.setTitle(t.name);
  const R = TOOLBODY[id]; el.innerHTML = `<div class="card">${R.html()}</div>`;
  const run = () => { try { $('#out', el).innerHTML = R.calc(el); } catch (e) { $('#out', el).innerHTML = '—'; } };
  el.querySelectorAll('input,select').forEach(x => { x.addEventListener('input', () => { R.redraw && R.redraw(el); run(); }); x.addEventListener('change', () => { R.redraw && R.redraw(el); run(); }); });
  run();
};
const v = (el, id) => parseVal($('#' + id, el).value);
const TOOLBODY = {
  colour: {
    html: () => `<div id="pic" class="qvisual"></div>
      ${field('Number of bands', sel('nb', ['4', '5'], '4'))}
      ${field('Band 1', sel('b1', COL, 'brown'))}${field('Band 2', sel('b2', COL, 'black'))}
      <div id="b3w">${field('Band 3', sel('b3', COL, 'black'))}</div>
      ${field('Multiplier', sel('bm', Object.keys(MUL), 'red'))}${field('Tolerance', sel('bt', Object.keys(TOL), 'gold'))}<div class="out" id="out"></div>`,
    redraw: el => { $('#b3w', el).style.display = $('#nb', el).value === '5' ? '' : 'none'; },
    calc: el => {
      const five = $('#nb', el).value === '5';
      $('#b3w', el).style.display = five ? '' : 'none';
      const d = [$('#b1', el).value, $('#b2', el).value].concat(five ? [$('#b3', el).value] : []);
      const base = +d.map(c => COL.indexOf(c)).join('');
      const val = base * MUL[$('#bm', el).value];
      const bands = d.concat([$('#bm', el).value, $('#bt', el).value]);
      const HEX = { black: '#111', brown: '#7a4a1f', red: '#d42a2a', orange: '#ff8a00', yellow: '#ffd800', green: '#1f9e3a', blue: '#2266ee', violet: '#9b3fd6', grey: '#8a8a8a', white: '#f4f4f4', gold: '#c9a227', silver: '#c0c0c0' };
      const xs = five ? [58, 80, 102, 124, 168] : [64, 88, 112, 168];
      $('#pic', el).innerHTML = `<svg viewBox="0 0 240 80" width="260"><line x1="0" y1="40" x2="240" y2="40" stroke="#b9c1c8" stroke-width="5"/><rect x="40" y="16" width="160" height="48" rx="22" fill="${five ? '#7fb0d8' : '#dcc697'}"/>${bands.map((c, i) => `<rect x="${xs[i]}" y="17" width="13" height="46" fill="${HEX[c]}"/>`).join('')}</svg>`;
      return `${si(val, 'Ω')} <span class="small muted">${TOL[$('#bt', el).value]}</span>`;
    },
  },
  smd: {
    html: () => `${field('Code printed on the chip', `<input id="code" placeholder="e.g. 103, 4702, 4R7, 01C" value="103" style="text-transform:uppercase">`)}<div class="out" id="out"></div><p class="small muted" id="how"></p>`,
    calc: el => {
      const c = $('#code', el).value.trim().toUpperCase();
      const EIA = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
      const EM = { Z: 0.001, Y: 0.01, R: 0.01, X: 0.1, S: 0.1, A: 1, B: 10, H: 10, C: 100, D: 1000, E: 1e4, F: 1e5 };
      let val, how;
      if (/^0+$/.test(c)) { val = 0; how = '0 Ω link (jumper)'; }
      else if (/^\d*R\d+$/.test(c) || /^\d+R$/.test(c)) { val = parseFloat(c.replace('R', '.')); how = 'R marks the decimal point'; }
      else if (/^\d{3}$/.test(c)) { val = +c.slice(0, 2) * Math.pow(10, +c[2]); how = `3-digit (±5%): ${c.slice(0, 2)} × 10^${c[2]}`; }
      else if (/^\d{4}$/.test(c)) { val = +c.slice(0, 3) * Math.pow(10, +c[3]); how = `4-digit (±1%): ${c.slice(0, 3)} × 10^${c[3]}`; }
      else if (/^\d{2}[A-Z]$/.test(c) && +c.slice(0, 2) >= 1 && +c.slice(0, 2) <= 96 && EM[c[2]] !== undefined) { val = EIA[+c.slice(0, 2) - 1] * EM[c[2]]; how = `EIA-96 (±1%): ${c.slice(0, 2)} = ${EIA[+c.slice(0, 2) - 1]}, ${c[2]} = ×${EM[c[2]]}`; }
      else { $('#how', el).textContent = 'Not a recognised code'; return '—'; }
      $('#how', el).textContent = how; return si(val, 'Ω');
    },
  },
  capc: {
    html: () => `${field('Capacitor code', `<input id="code" inputmode="numeric" placeholder="e.g. 104" value="104">`)}${field('Tolerance letter (optional)', sel('tl', ['-', 'B', 'C', 'D', 'F', 'G', 'J', 'K', 'M', 'Z'], '-'))}<div class="out" id="out"></div>`,
    calc: el => {
      const c = $('#code', el).value.trim(); if (!/^\d{3}$/.test(c)) return '—';
      const pF = +c.slice(0, 2) * Math.pow(10, +c[2] === 8 ? -2 : +c[2] === 9 ? -1 : +c[2]);
      const t = { B: '±0.1 pF', C: '±0.25 pF', D: '±0.5 pF', F: '±1%', G: '±2%', J: '±5%', K: '±10%', M: '±20%', Z: '−20/+80%' }[$('#tl', el).value] || '';
      return `${si(pF * 1e-12, 'F')}<div class="small muted">${parseFloat(pF.toPrecision(6)).toLocaleString('en-GB')} pF ${t}</div>`;
    },
  },
  ohm: {
    html: () => `<p class="small muted">Fill in any two — the rest is calculated.</p>${field('Voltage (V)', inp('V', 'e.g. 12'))}${field('Current (A) — e.g. 20m for 20 mA', inp('I', 'e.g. 20m'))}${field('Resistance (Ω)', inp('R', 'e.g. 4k7'))}${field('Power (W)', inp('P', 'e.g. 0.25'))}<div class="out" id="out"></div>`,
    calc: el => {
      let V = v(el, 'V'), I = v(el, 'I'), R = v(el, 'R'), P = v(el, 'P');
      const has = [V, I, R, P].filter(x => !isNaN(x)).length; if (has < 2) return '<span class="small muted">Enter two values</span>';
      if (!isNaN(V) && !isNaN(I)) { R = V / I; P = V * I; }
      else if (!isNaN(V) && !isNaN(R)) { I = V / R; P = V * V / R; }
      else if (!isNaN(I) && !isNaN(R)) { V = I * R; P = I * I * R; }
      else if (!isNaN(P) && !isNaN(V)) { I = P / V; R = V * V / P; }
      else if (!isNaN(P) && !isNaN(I)) { V = P / I; R = P / (I * I); }
      else if (!isNaN(P) && !isNaN(R)) { V = Math.sqrt(P * R); I = Math.sqrt(P / R); }
      return `<div style="font-size:18px">V = ${si(V, 'V')}<br>I = ${si(I, 'A')}<br>R = ${si(R, 'Ω')}<br>P = ${si(P, 'W')}</div>`;
    },
  },
  led: {
    html: () => `${field('Supply voltage (V)', inp('vs', '5', '5'))}${field('LED forward voltage (V)', inp('vf', '2', '2'))}${field('LED current (mA)', inp('i', '15', '15'))}<div class="out" id="out"></div>
      <p class="small muted">Typical Vf: red ~2 V, yellow ~2.1 V, green 2–3.2 V, blue/white ~3–3.4 V.</p>`,
    calc: el => {
      const vs = v(el, 'vs'), vf = v(el, 'vf'), i = v(el, 'i') / 1000; if (vs <= vf) return '<span class="small">Supply must be above Vf</span>';
      const r = (vs - vf) / i, E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
      let std = null; for (let d = 0; d < 7 && !std; d++) for (const e of E12) { const x = e * Math.pow(10, d); if (x >= r - 1e-9) { std = x; break; } }
      return `${si(r, 'Ω')}<div class="small muted">Use ${si(std, 'Ω')} (next E12 up) · resistor power ${si((vs - vf) * i, 'W')} · actual current ${si((vs - vf) / std, 'A')}</div>`;
    },
  },
  div: {
    html: () => `${field('Vin (V)', inp('vin', '12', '12'))}${field('R1 — top (Ω)', inp('r1', '10k', '10k'))}${field('R2 — bottom (Ω)', inp('r2', '10k', '10k'))}<div class="out" id="out"></div>`,
    calc: el => { const vin = v(el, 'vin'), r1 = v(el, 'r1'), r2 = v(el, 'r2'); return `${si(vin * r2 / (r1 + r2), 'V')}<div class="small muted">Current ${si(vin / (r1 + r2), 'A')}</div>`; },
  },
  sp: {
    html: () => `${field('Component', sel('kind', ['resistors', 'capacitors'], 'resistors'))}${field('Values, separated by commas', `<input id="vals" placeholder="e.g. 1k, 2k2, 4k7" value="1k, 1k">`)}<div class="out" id="out"></div>`,
    calc: el => {
      const vals = $('#vals', el).value.split(',').map(parseVal).filter(x => !isNaN(x) && x > 0); if (!vals.length) return '—';
      const sum = vals.reduce((a, b) => a + b, 0), inv = 1 / vals.reduce((a, b) => a + 1 / b, 0);
      const r = $('#kind', el).value === 'resistors', u = r ? 'Ω' : 'F';
      const toF = x => r ? x : x; // capacitors entered as e.g. 100n
      return `<div style="font-size:18px">Series: ${si(toF(r ? sum : inv), u)}<br>Parallel: ${si(toF(r ? inv : sum), u)}</div>`;
    },
  },
  rc: {
    html: () => `${field('Resistance (Ω)', inp('r', '10k', '10k'))}${field('Capacitance (F) — e.g. 100u, 10n', inp('c', '100u', '100u'))}<div class="out" id="out"></div>`,
    calc: el => { const r = v(el, 'r'), c = v(el, 'c'), t = r * c; return `τ = ${si(t, 's')}<div class="small muted">Fully charged (5τ): ${si(5 * t, 's')} · Low-pass cut-off f = 1/(2πRC) = ${si(1 / (2 * Math.PI * t), 'Hz')}</div>`; },
  },
  cheat: {
    html: () => `<div class="lesson small">
      <h3>Polarity</h3><ul><li>Diode: <b>band = cathode</b></li><li>Electrolytic: <b>stripe = negative</b>, short lead −</li><li>Tantalum: <b>bar = positive</b></li><li>LED: <b>long leg = anode</b>, flat = cathode</li><li>IC: dot/notch = <b>pin 1</b>, count anticlockwise from top</li></ul>
      <h3>Common pinouts (check datasheet!)</h3><ul><li>7805 (TO-220): In, GND, Out</li><li>MOSFET TO-220: G, D, S (tab = D)</li><li>SOT-23 MOSFET: 1 G, 2 S, 3 D</li><li>SOT-23 BJT: 1 B, 2 E, 3 C</li><li>Dual op-amp: 4 = V−, 8 = V+</li><li>555: 1 GND, 3 Out, 4 Reset, 8 VCC</li></ul>
      <h3>Key numbers</h3><ul><li>Si diode Vf ≈ 0.7 V; Schottky ≈ 0.3 V</li><li>SAC305 melts ~217 °C; Sn63Pb37 183 °C</li><li>Reflow peak ~235–250 °C, TAL 45–90 s</li><li>Iron: leaded ~330 °C, lead-free ~350–380 °C</li><li>MSL3 floor life = 168 h</li><li>Wrist strap resistor = 1 MΩ</li><li>1 oz copper ≈ 35 µm; PCB 1.6 mm</li><li>UK mains 230 V 50 Hz (325 V peak)</li></ul>
      <h3>Chip sizes (imperial)</h3><ul><li>0402 = 1.0 × 0.5 mm</li><li>0603 = 1.6 × 0.8 mm</li><li>0805 = 2.0 × 1.25 mm</li><li>1206 = 3.2 × 1.6 mm</li></ul>
      <h3>Codes</h3><ul><li>Resistor 103 = 10 kΩ, 472 = 4.7 kΩ, 1002 = 10 kΩ, 4R7 = 4.7 Ω</li><li>Cap 104 = 100 nF, 103 = 10 nF, 105 = 1 µF, 220 = 22 pF</li><li>Cap tolerance J 5%, K 10%, M 20%</li></ul>
      <h3>Formulas</h3><ul><li>V = IR · P = VI = I²R = V²/R</li><li>Series R add · Parallel: product ÷ sum</li><li>Divider: Vin × R2/(R1+R2)</li><li>LED: R = (Vs − Vf)/I</li><li>τ = RC · f = 1/(2πRC)</li></ul></div><div id="out" style="display:none"></div>`,
    calc: () => '',
  },
};
})();
