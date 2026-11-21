// Schematic symbols and logic gates as SVG (stroke = currentColor)
(function () {
const S = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" class="sym" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const arrowOut = (x, y) => `<path d="M${x},${y} l10,-10 M${x + 10},${y - 10} l-5,0 M${x + 10},${y - 10} l0,5"/>`;
const arrowIn = (x, y) => `<path d="M${x + 10},${y - 10} l-10,10 M${x},${y} l5,0 M${x},${y} l0,-5"/>`;
const diodeBase = `<path d="M0,30 H35 M62,30 H100"/><path d="M35,15 L35,45 L62,30 Z" fill="currentColor" fill-opacity=".15"/>`;

const SYM = {
  resistor: { name: 'Resistor (IEC)', svg: S(100, 60, `<path d="M0,30 H25 M75,30 H100"/><rect x="25" y="20" width="50" height="20"/>`) },
  resistor_us: { name: 'Resistor (US)', svg: S(100, 60, `<path d="M0,30 H22 L27,18 L35,42 L43,18 L51,42 L59,18 L67,42 L75,18 L78,30 H100"/>`) },
  pot: { name: 'Potentiometer', svg: S(100, 60, `<path d="M0,35 H25 M75,35 H100"/><rect x="25" y="25" width="50" height="20"/><path d="M50,5 V22 M44,15 L50,23 L56,15"/>`) },
  capacitor: { name: 'Capacitor', svg: S(100, 60, `<path d="M0,30 H45 M55,30 H100 M45,12 V48 M55,12 V48"/>`) },
  polcap: { name: 'Polarised capacitor', svg: S(100, 60, `<path d="M0,30 H45 M57,30 H100 M45,12 V48"/><path d="M62,12 Q52,30 62,48"/><path d="M30,12 h8 M34,8 v8" stroke-width="2"/>`) },
  inductor: { name: 'Inductor', svg: S(100, 60, `<path d="M0,32 H20 A7.5,7.5 0 0 1 35,32 A7.5,7.5 0 0 1 50,32 A7.5,7.5 0 0 1 65,32 A7.5,7.5 0 0 1 80,32 H100"/>`) },
  diode: { name: 'Diode', svg: S(100, 60, diodeBase + `<path d="M62,15 V45"/>`) },
  led: { name: 'LED', svg: S(100, 60, diodeBase + `<path d="M62,15 V45"/>` + arrowOut(55, 12) + arrowOut(67, 18)) },
  photodiode: { name: 'Photodiode', svg: S(100, 60, diodeBase + `<path d="M62,15 V45"/>` + arrowIn(55, 12) + arrowIn(67, 18)) },
  zener: { name: 'Zener diode', svg: S(100, 60, diodeBase + `<path d="M55,12 L62,15 V45 L69,48"/>`) },
  schottky: { name: 'Schottky diode', svg: S(100, 60, diodeBase + `<path d="M56,20 V15 H62 V45 H68 V40"/>`) },
  npn: { name: 'NPN transistor', svg: S(100, 64, `<circle cx="52" cy="32" r="24"/><path d="M0,32 H40 M40,18 V46 M40,24 L62,10 V0 M40,40 L62,54 V64"/><path d="M62,54 L52,53 M62,54 L57,46" stroke-width="3"/>`) },
  pnp: { name: 'PNP transistor', svg: S(100, 64, `<circle cx="52" cy="32" r="24"/><path d="M0,32 H40 M40,18 V46 M40,24 L62,10 V0 M40,40 L62,54 V64"/><path d="M40,40 L50,41 M40,40 L45,48" stroke-width="3"/>`) },
  nmos: { name: 'N-channel MOSFET', svg: S(100, 64, `<path d="M0,44 H30 M30,18 V44"/><path d="M38,14 V24 M38,28 V36 M38,40 V50" stroke-width="4"/><path d="M38,19 H60 V0 M38,45 H60 V64 M38,32 H60 V45"/><path d="M40,32 L48,27 M40,32 L48,37"/>`) },
  pmos: { name: 'P-channel MOSFET', svg: S(100, 64, `<path d="M0,44 H30 M30,18 V44"/><path d="M38,14 V24 M38,28 V36 M38,40 V50" stroke-width="4"/><path d="M38,19 H60 V0 M38,45 H60 V64 M38,32 H60 V45"/><path d="M58,32 L50,27 M58,32 L50,37"/>`) },
  ground: { name: 'Ground', svg: S(100, 60, `<path d="M50,0 V30 M30,30 H70 M37,39 H63 M44,48 H56"/>`) },
  battery: { name: 'Battery / cell', svg: S(100, 60, `<path d="M0,30 H44 M56,30 H100 M44,10 V50"/><path d="M56,20 V40" stroke-width="6"/><path d="M30,12 h8 M34,8 v8" stroke-width="2"/>`) },
  fuse: { name: 'Fuse', svg: S(100, 60, `<path d="M0,30 H100"/><rect x="25" y="20" width="50" height="20"/>`) },
  switch: { name: 'Switch', svg: S(100, 60, `<path d="M0,35 H25 M75,35 H100 M31,33 L68,15"/><circle cx="28" cy="35" r="3"/><circle cx="72" cy="35" r="3"/>`) },
  opamp: { name: 'Op-amp', svg: S(100, 64, `<path d="M25,4 V60 L80,32 Z"/><path d="M0,18 H25 M0,46 H25 M80,32 H100"/><path d="M31,18 h8 M31,46 h8 M35,42 v8" stroke-width="2"/>`) },
  crystal: { name: 'Crystal', svg: S(100, 60, `<path d="M0,30 H32 M68,30 H100 M32,14 V46 M68,14 V46"/><rect x="40" y="16" width="20" height="28"/>`) },
  transformer: { name: 'Transformer', svg: S(100, 64, `<path d="M20,4 A7,7 0 0 1 20,18 A7,7 0 0 1 20,32 A7,7 0 0 1 20,46 A7,7 0 0 1 20,60"/><path d="M80,4 A7,7 0 0 0 80,18 A7,7 0 0 0 80,32 A7,7 0 0 0 80,46 A7,7 0 0 0 80,60"/><path d="M45,4 V60 M55,4 V60"/>`) },
  lamp: { name: 'Lamp', svg: S(100, 60, `<path d="M0,30 H32 M68,30 H100"/><circle cx="50" cy="30" r="18"/><path d="M37,17 L63,43 M63,17 L37,43"/>`) },
  speaker: { name: 'Loudspeaker', svg: S(100, 60, `<rect x="30" y="20" width="14" height="20"/><path d="M44,20 L64,6 V54 L44,40"/><path d="M0,26 H30 M0,34 H30" stroke-width="2"/>`) },
  // logic gates (ANSI)
  AND: { name: 'AND gate', svg: S(120, 60, `<path d="M30,10 H55 A20,20 0 0 1 55,50 H30 Z"/><path d="M0,20 H30 M0,40 H30 M75,30 H120"/>`) },
  NAND: { name: 'NAND gate', svg: S(120, 60, `<path d="M30,10 H55 A20,20 0 0 1 55,50 H30 Z"/><circle cx="80" cy="30" r="5"/><path d="M0,20 H30 M0,40 H30 M85,30 H120"/>`) },
  OR: { name: 'OR gate', svg: S(120, 60, `<path d="M26,10 Q52,10 80,30 Q52,50 26,50 Q38,30 26,10 Z"/><path d="M0,20 H32 M0,40 H32 M80,30 H120"/>`) },
  NOR: { name: 'NOR gate', svg: S(120, 60, `<path d="M26,10 Q52,10 80,30 Q52,50 26,50 Q38,30 26,10 Z"/><circle cx="85" cy="30" r="5"/><path d="M0,20 H32 M0,40 H32 M90,30 H120"/>`) },
  XOR: { name: 'XOR gate', svg: S(120, 60, `<path d="M30,10 Q56,10 84,30 Q56,50 30,50 Q42,30 30,10 Z"/><path d="M20,10 Q32,30 20,50"/><path d="M0,20 H26 M0,40 H26 M84,30 H120"/>`) },
  XNOR: { name: 'XNOR gate', svg: S(120, 60, `<path d="M30,10 Q56,10 84,30 Q56,50 30,50 Q42,30 30,10 Z"/><path d="M20,10 Q32,30 20,50"/><circle cx="89" cy="30" r="5"/><path d="M0,20 H26 M0,40 H26 M94,30 H120"/>`) },
  NOT: { name: 'NOT gate (inverter)', svg: S(120, 60, `<path d="M35,12 L35,48 L75,30 Z"/><circle cx="80" cy="30" r="5"/><path d="M0,30 H35 M85,30 H120"/>`) },
  BUF: { name: 'Buffer', svg: S(120, 60, `<path d="M35,12 L35,48 L75,30 Z"/><path d="M0,30 H35 M75,30 H120"/>`) },
};
window.SYM = SYM;
window.symHTML = function (key, caption) {
  const s = SYM[key];
  if (!s) return '';
  return `<figure class="symfig">${s.svg}${caption === false ? '' : `<figcaption>${s.name}</figcaption>`}</figure>`;
};
})();
