// Spark content part 1: Basics, Resistors, Capacitors, Inductors & other passives
// Lesson body markup: <h3>, <p>, <ul>, <div class="tip"> (tip), <div class="ex"> (worked example),
// <div class="job"> (on the line), {{sym:name}} inserts a schematic symbol.
window.MODULES = window.MODULES || [];
window.QUESTIONS = window.QUESTIONS || [];
window.CARDS = window.CARDS || [];
(function () {
const M = window.MODULES, QS = window.QUESTIONS, CS = window.CARDS;
const Q = (l, q, a, e) => QS.push({ l, q, a, e });
const C = (m, f, b) => CS.push({ m, f, b });

/* ============================ MODULE 1: BASICS ============================ */
M.push({ id: 'basics', title: 'Electricity Basics', icon: '⚡', color: '#ffc94d',
 blurb: 'Voltage, current, resistance, power and the rules every circuit follows.',
 lessons: [
 { id: 'b1', title: 'Charge, current and voltage', body: `
<p>Everything electrical comes down to <b>electrons</b> moving. Atoms of metals like copper have loosely held outer electrons that can drift from atom to atom. When lots of them drift the same way, that flow is an <b>electric current</b>.</p>
<h3>Current (I) — the flow</h3>
<p>Current is how much charge passes a point each second. It's measured in <b>amps (A)</b>. 1 A is about 6.24 × 10<sup>18</sup> electrons per second. Small circuits use <b>milliamps (mA)</b> — an LED typically runs at 5–20 mA.</p>
<h3>Voltage (V) — the push</h3>
<p>Voltage is the "pressure" that pushes charge around a circuit. It's the difference in electrical potential energy between two points, measured in <b>volts (V)</b>. A voltage is always measured <i>between two points</i> — usually a point and ground (0 V).</p>
<div class="tip"><b>Water analogy:</b> voltage is water pressure, current is the flow rate through the pipe, and resistance is how narrow the pipe is.</div>
<h3>Conventional current vs electron flow</h3>
<p>Electrons actually flow from <b>negative to positive</b>. But long before electrons were discovered, current was defined as flowing from <b>+ to −</b>. That's called <b>conventional current</b>, and it's what every schematic symbol (diode arrows, transistor arrows) uses.</p>
<h3>A complete circuit</h3>
<p>Current only flows if there's a complete loop: source → load → back to source. Break the loop anywhere (a switch, a dry joint, a cracked track) and current stops everywhere in that loop.</p>
<div class="job"><b>On the line:</b> a "dry" or cracked solder joint is just a break in the loop — that's why a board can look perfect and still be dead.</div>` },

 { id: 'b2', title: "Resistance and Ohm's law", body: `
<p><b>Resistance (R)</b> is opposition to current, measured in <b>ohms (Ω)</b>. Copper wire has very low resistance; a resistor is made to have a specific amount.</p>
<h3>Ohm's law</h3>
<p>The single most useful equation in electronics:</p>
<div class="formula">V = I × R</div>
<p>Rearranged: <b>I = V ÷ R</b> and <b>R = V ÷ I</b>. Use the triangle: cover the one you want — V on top, I and R on the bottom.</p>
<div class="ex"><b>Example:</b> 12 V across a 1 kΩ resistor. I = 12 ÷ 1000 = 0.012 A = <b>12 mA</b>.</div>
<div class="ex"><b>Example:</b> 20 mA flows through a 220 Ω resistor. V = 0.02 × 220 = <b>4.4 V</b> across it.</div>
<h3>What affects resistance?</h3>
<ul><li><b>Material</b> — copper and silver are good conductors; carbon and nichrome resist more.</li>
<li><b>Length</b> — longer = more resistance.</li>
<li><b>Cross-section</b> — thicker = less resistance (that's why power tracks on a PCB are wider).</li>
<li><b>Temperature</b> — most metals increase resistance when hot.</li></ul>
<div class="tip">Units trap: always convert kΩ and mA before using Ohm's law. Handy shortcut — volts ÷ kΩ gives mA directly. 5 V ÷ 1 kΩ = 5 mA.</div>` },

 { id: 'b3', title: 'Power and energy', body: `
<p><b>Power (P)</b> is the rate energy is used or turned into heat, in <b>watts (W)</b>.</p>
<div class="formula">P = V × I</div>
<p>Combine with Ohm's law and you get two more versions:</p>
<div class="formula">P = I² × R &nbsp;&nbsp; P = V² ÷ R</div>
<div class="ex"><b>Example:</b> a 100 Ω resistor with 5 V across it. P = 5² ÷ 100 = 25 ÷ 100 = <b>0.25 W</b>. A standard 0.25 W resistor would be right at its limit — use a 0.5 W part for margin.</div>
<h3>Why it matters</h3>
<p>Every component has a <b>power rating</b>. Exceed it and the part overheats — discolouring, cracking, or burning the board. Resistors, transistors and regulators all turn wasted power into heat.</p>
<ul><li>0402 chip resistor: ~1/16 W</li><li>0603: ~1/10 W</li><li>0805: ~1/8 W</li><li>1206: ~1/4 W</li><li>Standard THT axial: 1/4 W or 1/2 W</li></ul>
<h3>Energy</h3>
<p>Energy = power × time. Batteries are rated in <b>mAh</b> (charge) or <b>Wh</b> (energy). A 2000 mAh battery could supply 200 mA for about 10 hours.</p>
<div class="job"><b>On the line:</b> a resistor that looks brown/burnt in the middle has been overloaded — something else on the board is often the real fault.</div>` },

 { id: 'b4', title: 'Series and parallel', body: `
<h3>Series — one path</h3>
<p>Components in a row, end to end. The <b>same current</b> flows through all of them, and the voltages add up.</p>
<div class="formula">R<sub>total</sub> = R1 + R2 + R3 …</div>
<p>Series resistance is always <b>bigger</b> than the biggest resistor.</p>
<h3>Parallel — multiple paths</h3>
<p>Components side by side across the same two points. They all get the <b>same voltage</b>, and the currents add up.</p>
<div class="formula">1/R<sub>total</sub> = 1/R1 + 1/R2 …</div>
<p>For just two: <b>R = (R1 × R2) ÷ (R1 + R2)</b> — "product over sum". Parallel resistance is always <b>smaller</b> than the smallest resistor. Two equal resistors in parallel = half the value.</p>
<div class="ex"><b>Example:</b> 1 kΩ ∥ 1 kΩ = 500 Ω. 1 kΩ + 1 kΩ in series = 2 kΩ.</div>
<h3>Voltage divider</h3>
<p>Two resistors in series split a voltage: <b>V<sub>out</sub> = V<sub>in</sub> × R2 ÷ (R1 + R2)</b>. Used everywhere — setting regulator outputs, reading sensors, scaling signals for a microcontroller.</p>
<div class="ex">12 V into 10 kΩ (top) and 10 kΩ (bottom) → 6 V at the middle.</div>
<h3>Capacitors are the opposite</h3>
<p>Capacitors <b>add in parallel</b> and use the "product over sum" rule in series — the reverse of resistors.</p>` },

 { id: 'b5', title: 'AC and DC', body: `
<p><b>DC (direct current)</b> flows one way at a steady voltage — batteries, USB (5 V), most circuit boards inside.</p>
<p><b>AC (alternating current)</b> reverses direction many times a second. UK mains is <b>230 V AC at 50 Hz</b> (50 cycles per second). The US uses 120 V at 60 Hz.</p>
<h3>Key AC terms</h3>
<ul><li><b>Frequency (Hz)</b> — cycles per second. Period = 1 ÷ frequency (50 Hz → 20 ms).</li>
<li><b>Peak voltage</b> — the top of the sine wave. For UK mains about 325 V.</li>
<li><b>RMS</b> — the "equivalent DC" heating value. 230 V is the RMS figure. V<sub>peak</sub> = V<sub>rms</sub> × 1.414.</li>
<li><b>Peak-to-peak</b> — from the bottom to the top, about 650 V for mains.</li></ul>
<h3>Turning AC into DC</h3>
<p>A power supply usually: <b>transformer</b> (steps voltage down) → <b>rectifier</b> (diodes make it one direction) → <b>smoothing capacitor</b> (fills in the gaps) → <b>regulator</b> (holds it steady). Modern supplies use switch-mode designs that do this at high frequency for smaller, lighter parts.</p>
<div class="job"><b>Safety:</b> anything on the mains side of a power supply can kill. Big electrolytic caps can stay charged after unplugging.</div>` },

 { id: 'b6', title: 'Units and prefixes', body: `
<p>Electronics values span huge ranges, so we use SI prefixes. You need to swap between these instantly.</p>
<table class="tbl"><tr><th>Prefix</th><th>Symbol</th><th>Multiplier</th></tr>
<tr><td>mega</td><td>M</td><td>× 1,000,000</td></tr>
<tr><td>kilo</td><td>k</td><td>× 1,000</td></tr>
<tr><td>milli</td><td>m</td><td>÷ 1,000</td></tr>
<tr><td>micro</td><td>µ (or u)</td><td>÷ 1,000,000</td></tr>
<tr><td>nano</td><td>n</td><td>÷ 1,000,000,000</td></tr>
<tr><td>pico</td><td>p</td><td>÷ 10<sup>12</sup></td></tr></table>
<p>Each step is <b>× 1000</b>. So 1 µF = 1000 nF, 1 nF = 1000 pF, 1 kΩ = 1000 Ω, 1 MΩ = 1000 kΩ.</p>
<div class="ex">100 nF = 0.1 µF = 100,000 pF — all the same capacitor. 4700 pF = 4.7 nF.</div>
<h3>The "R/K/M as decimal point" notation</h3>
<p>To avoid tiny decimal points getting lost on drawings, the letter replaces the point: <b>4R7</b> = 4.7 Ω, <b>4K7</b> = 4.7 kΩ, <b>1M5</b> = 1.5 MΩ, <b>2n2</b> = 2.2 nF, <b>R10</b> = 0.1 Ω.</p>
<div class="tip">Watch out: a capital M means mega, a small m means milli. 1 MΩ and 1 mΩ differ by a billion times!</div>` },

 { id: 'b7', title: 'Ground, shorts and opens', body: `
<h3>Ground (GND)</h3>
<p>Ground is the reference point all voltages are measured from — called 0 V. On a PCB it's usually a big copper area or a whole internal layer (a "ground plane"). There's also <b>earth</b> (protective earth, connected to the actual ground via the mains plug) and <b>chassis</b> (the metal case).</p>
<h3>Short circuit</h3>
<p>An unintended low-resistance path — current takes the easy route instead of going through the load. A short across a supply draws huge current: blown fuses, hot tracks, damaged regulators. On boards, <b>solder bridges</b> are the classic cause.</p>
<h3>Open circuit</h3>
<p>A break in the path — no current flows. Causes: dry/cold joints, missing parts, cracked tracks, lifted leads, blown fuses.</p>
<h3>Kirchhoff's laws (the two rules)</h3>
<ul><li><b>Current law (KCL):</b> current flowing into a junction = current flowing out.</li>
<li><b>Voltage law (KVL):</b> around any closed loop, the voltages add up to zero — the supply voltage is shared across the components.</li></ul>
<div class="job"><b>Fault-finding:</b> a short reads near 0 Ω on a meter (continuity beep); an open reads "OL" (over limit). Measure with the board <b>unpowered</b>.</div>` },
 ]});

Q('b1','What is electric current?',['The flow of charge past a point per second','The push that moves electrons','Opposition to flow','Energy stored in a field'],'Current is the rate of flow of charge, measured in amps.');
Q('b1','Voltage is measured…',['Between two points','At a single point only','Through a component in series','Only in AC circuits'],'Voltage is a potential difference — always between two points, often a point and ground.');
Q('b1','Conventional current flows from…',['Positive to negative','Negative to positive','Ground to earth','It alternates'],'Conventional current is + to −; electrons actually move − to +.');
Q('b1','Which unit is used for current?',['Amp (A)','Volt (V)','Ohm (Ω)','Watt (W)'],'Current is measured in amperes (amps).');
Q('b1','A cracked solder joint stops a circuit working because…',['It breaks the complete loop','It increases the voltage','It shorts to ground','It reverses the current'],'Current needs a complete loop; any break stops the flow.');
Q('b1','A typical indicator LED runs at about…',['5–20 mA','5–20 A','5–20 µA','500 mA'],'Indicator LEDs usually run at a few to 20 milliamps.');
Q('b2',"Ohm's law is…",['V = I × R','P = V × I','I = V × R','R = V × I'],"Voltage = current × resistance.");
Q('b2','12 V across 1 kΩ gives what current?',['12 mA','1.2 mA','120 mA','12 A'],'12 ÷ 1000 = 0.012 A = 12 mA.');
Q('b2','20 mA through 220 Ω — what voltage is across it?',['4.4 V','44 V','0.44 V','11 V'],'0.02 × 220 = 4.4 V.');
Q('b2','Why are power tracks on a PCB made wider?',['Lower resistance, less heating','To look neater','To increase voltage','To reduce capacitance only'],'A bigger cross-section has lower resistance, so less voltage drop and heat.');
Q('b2','5 V across 10 kΩ gives…',['0.5 mA','5 mA','50 mA','2 mA'],'V ÷ kΩ = mA: 5 ÷ 10 = 0.5 mA.');
Q('b2','What resistance draws 2 mA from 10 V?',['5 kΩ','20 kΩ','500 Ω','50 kΩ'],'R = V ÷ I = 10 ÷ 0.002 = 5000 Ω.');
Q('b3','Power in a resistor can be calculated with…',['P = V² ÷ R','P = V ÷ R','P = R ÷ I','P = V × R'],'P = V²/R, also P = I²R and P = VI.');
Q('b3','5 V across 100 Ω dissipates…',['0.25 W','0.5 W','0.05 W','2.5 W'],'25 ÷ 100 = 0.25 W.');
Q('b3','Roughly what power can an 0603 chip resistor handle?',['1/10 W','1 W','1/2 W','5 W'],'0603 ≈ 0.1 W, 0805 ≈ 0.125 W, 1206 ≈ 0.25 W.');
Q('b3','A resistor looks burnt in the middle. Most likely…',['It was run above its power rating','It was the wrong colour code','It was fitted backwards','It is a 0 Ω link'],'Overpowered resistors overheat and discolour.');
Q('b3','10 mA through 1 kΩ dissipates…',['0.1 W','1 W','0.01 W','10 W'],'P = I²R = 0.0001 × 1000 = 0.1 W.');
Q('b4','Two 1 kΩ resistors in parallel equal…',['500 Ω','2 kΩ','1 kΩ','250 Ω'],'Equal resistors in parallel = half the value.');
Q('b4','In a series circuit, what is the same through every component?',['Current','Voltage','Power','Resistance'],'Series = one path, so the current is the same everywhere.');
Q('b4','In parallel, what is the same across every branch?',['Voltage','Current','Power','Resistance'],'All parallel branches connect across the same two points.');
Q('b4','12 V into a 10k/10k voltage divider gives…',['6 V','12 V','3 V','4 V'],'Equal resistors split the voltage in half.');
Q('b4','Capacitors in parallel…',['Add together','Use the product-over-sum rule','Halve in value','Cancel out'],'Capacitances add in parallel — opposite to resistors.');
Q('b4','4.7 kΩ in series with 330 Ω equals…',['5.03 kΩ','4.37 kΩ','5.3 kΩ','310 Ω'],'Series resistances simply add: 4700 + 330 = 5030 Ω.');
Q('b4','Parallel resistance is always…',['Smaller than the smallest resistor','Bigger than the biggest','The average','Equal to the biggest'],'Adding paths always lowers total resistance.');
Q('b5','UK mains supply is…',['230 V AC, 50 Hz','120 V AC, 60 Hz','230 V DC','110 V AC, 50 Hz'],'UK mains is nominally 230 V RMS at 50 Hz.');
Q('b5','The period of a 50 Hz signal is…',['20 ms','50 ms','2 ms','5 ms'],'Period = 1 ÷ 50 = 0.02 s = 20 ms.');
Q('b5','Which part of a linear PSU turns AC into one-direction current?',['Rectifier','Transformer','Regulator','Fuse'],'Diodes in a rectifier only let current one way.');
Q('b5','230 V RMS has a peak of about…',['325 V','230 V','460 V','163 V'],'Peak = RMS × 1.414 ≈ 325 V.');
Q('b5','Why can a PSU be dangerous even when unplugged?',['Large capacitors can stay charged','Transformers store AC','Fuses hold voltage','Diodes discharge slowly'],'Bulk electrolytic caps can hold a lethal charge.');
Q('b6','100 nF is the same as…',['0.1 µF','100 µF','1 µF','10 pF'],'1 µF = 1000 nF, so 100 nF = 0.1 µF.');
Q('b6','4K7 on a drawing means…',['4.7 kΩ','47 kΩ','4.7 Ω','470 Ω'],'The K acts as the decimal point: 4.7 kΩ.');
Q('b6','4R7 means…',['4.7 Ω','47 Ω','4.7 kΩ','0.47 Ω'],'R marks the decimal point in ohms.');
Q('b6','4700 pF equals…',['4.7 nF','47 nF','0.47 nF','4.7 µF'],'1000 pF = 1 nF.');
Q('b6','What is the difference between 1 MΩ and 1 mΩ?',['A billion times','A thousand times','A million times','None — same thing'],'Mega (10⁶) vs milli (10⁻³) is 10⁹ apart.');
Q('b6','2n2 on a capacitor drawing means…',['2.2 nF','22 nF','2.2 pF','220 nF'],'n is the decimal point in nanofarads.');
Q('b6','How many microamps in 1.5 mA?',['1500 µA','150 µA','15 µA','15,000 µA'],'1 mA = 1000 µA.');
Q('b7','A solder bridge between two pins causes…',['A short circuit','An open circuit','Higher resistance','Nothing'],'A bridge is an unintended low-resistance path.');
Q('b7','A meter showing "OL" on resistance usually means…',['Open circuit','Short circuit','Battery flat','Exactly 0 Ω'],'OL = over limit — no path, so open.');
Q('b7',"Kirchhoff's current law says…",['Current in = current out at a junction','Voltages round a loop add to the supply','V = IR','Power is conserved'],'KCL: charge is conserved at every node.');
Q('b7','Resistance checks should be done with the board…',['Unpowered','Powered','Under load','Connected to mains'],'Powered circuits give false readings and can damage the meter.');
Q('b7','A ground plane on a PCB is…',['A large copper area/layer at 0 V','A metal stiffener','The silkscreen layer','A type of via'],'A ground plane gives a low-impedance 0 V reference.');

C('basics','Current (I)','Flow of charge — measured in amps (A).');
C('basics','Voltage (V)','Electrical "push"/potential difference between two points — volts (V).');
C('basics','Resistance (R)','Opposition to current — ohms (Ω).');
C('basics',"Ohm's law",'V = I × R  (I = V/R, R = V/I)');
C('basics','Power formulas','P = V × I = I²R = V²/R  (watts)');
C('basics','Series resistors','Add up: R = R1 + R2 + … Same current through all.');
C('basics','Parallel resistors','1/R = 1/R1 + 1/R2. Two: (R1×R2)/(R1+R2). Same voltage across all.');
C('basics','Voltage divider formula','Vout = Vin × R2 / (R1 + R2)');
C('basics','UK mains','230 V RMS, 50 Hz AC (≈325 V peak)');
C('basics','RMS to peak','Vpeak = Vrms × 1.414');
C('basics','Frequency → period','T = 1 / f (50 Hz → 20 ms)');
C('basics','Conventional current direction','+ to − (what symbols use). Electrons go − to +.');
C('basics','Short circuit','Unintended low-resistance path — huge current, blown fuses.');
C('basics','Open circuit','A break in the path — no current flows.');
C('basics','Kirchhoff current law','Current into a node = current out.');
C('basics','Kirchhoff voltage law','Voltages around a closed loop sum to zero.');
C('basics','k / M / m / µ / n / p','×10³ / ×10⁶ / ×10⁻³ / ×10⁻⁶ / ×10⁻⁹ / ×10⁻¹²');
C('basics','1 µF = ? nF = ? pF','1000 nF = 1,000,000 pF');
C('basics','4R7, 4K7, 1M5','4.7 Ω, 4.7 kΩ, 1.5 MΩ');
C('basics','Volts ÷ kΩ =','milliamps (mA) — quick Ohm\'s law shortcut');
C('basics','Ground (GND)','0 V reference point all voltages are measured from.');
C('basics','Energy','Power × time (Wh). Battery capacity in mAh = current × hours.');

/* ============================ MODULE 2: RESISTORS ============================ */
M.push({ id: 'resistors', title: 'Resistors', icon: '〰️', color: '#e8a05c',
 blurb: 'Colour codes, SMD markings, power, tolerance and the many resistor types.',
 lessons: [
 { id: 'r1', title: 'What resistors do', body: `
<p>A resistor limits current and sets voltages. It's the most common component on almost every board.</p>
{{sym:resistor}}
<h3>Common jobs</h3>
<ul><li><b>Current limiting</b> — e.g. stopping an LED drawing too much current.</li>
<li><b>Voltage dividers</b> — scaling a voltage down for a sensor input or setting a regulator's output.</li>
<li><b>Pull-up / pull-down</b> — holding a digital input high or low when nothing drives it (typically 4.7 k–10 k).</li>
<li><b>Termination</b> — small values (22–100 Ω) in series with fast signals to stop reflections.</li>
<li><b>Current sensing</b> — tiny values (e.g. R010 = 10 mΩ) where the voltage across tells you the current.</li>
<li><b>0 Ω links</b> — jumpers that let a pick-and-place machine bridge tracks, or select options.</li></ul>
<h3>Not polarised</h3>
<p>Resistors work either way round — there's no + or −. But for neatness and inspection, IPC guidance prefers colour codes/markings read in the same direction.</p>
<h3>Symbols</h3>
<p>UK/IEC symbol is a <b>rectangle</b>; the US/ANSI symbol is a <b>zig-zag</b>. Reference designator: <b>R</b> (R1, R2…). Resistor networks/arrays: <b>RN</b>.</p>` },

 { id: 'r2', title: 'Colour codes', body: `
<p>Through-hole resistors use coloured bands. Learn the sequence:</p>
<div class="colours"><span style="background:#000;color:#fff">0 Black</span><span style="background:#7a4a1f;color:#fff">1 Brown</span><span style="background:#d22">2 Red</span><span style="background:#f80">3 Orange</span><span style="background:#fd0;color:#000">4 Yellow</span><span style="background:#2a2">5 Green</span><span style="background:#26e">6 Blue</span><span style="background:#a3d">7 Violet</span><span style="background:#888">8 Grey</span><span style="background:#fff;color:#000">9 White</span></div>
<div class="tip"><b>Mnemonic:</b> "<b>B</b>ad <b>B</b>eer <b>R</b>ots <b>O</b>ur <b>Y</b>oung <b>G</b>uts <b>B</b>ut <b>V</b>odka <b>G</b>oes <b>W</b>ell" — Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White.</div>
<h3>4-band</h3>
<p>Band 1 = 1st digit, band 2 = 2nd digit, band 3 = <b>multiplier</b> (number of zeros), band 4 = tolerance.</p>
<div class="ex">Yellow-Violet-Red-Gold = 4, 7, ×100 = 4700 Ω = <b>4.7 kΩ ±5%</b><br>Brown-Black-Orange-Gold = 1, 0, ×1000 = <b>10 kΩ ±5%</b></div>
<h3>5-band (precision)</h3>
<p>Three digits, then multiplier, then tolerance. Brown-Black-Black-Red-Brown = 1,0,0 ×100 = <b>10 kΩ ±1%</b>.</p>
<h3>6-band</h3>
<p>Like 5-band plus a <b>temperature coefficient</b> (ppm/°C) band at the end.</p>
<h3>Special multiplier bands</h3>
<p><b>Gold</b> as a multiplier = ×0.1, <b>Silver</b> = ×0.01. So Brown-Black-Gold = 1.0 Ω.</p>
<h3>Tolerance bands</h3>
<p>Brown ±1%, Red ±2%, Green ±0.5%, Blue ±0.25%, Violet ±0.1%, Gold ±5%, Silver ±10%.</p>
<div class="tip">Which end to start? The tolerance band is usually gold/silver and set slightly apart. Bands start closer to one end. If unsure — measure it!</div>
<p>Single black band = <b>0 Ω</b> link.</p>` },

 { id: 'r3', title: 'SMD resistor codes', body: `
<p>Chip resistors are too small for colours, so they're printed with codes (0402 and smaller usually have <b>no marking at all</b> — you rely on the reel label and the machine program).</p>
<h3>3-digit code (±5%)</h3>
<p>Two digits + number of zeros. <b>103</b> = 10 + 000 = 10,000 Ω = <b>10 kΩ</b>. <b>472</b> = 4.7 kΩ. <b>221</b> = 220 Ω. <b>100</b> = 10 Ω (not 100!). <b>000</b> or <b>0</b> = 0 Ω link.</p>
<h3>4-digit code (±1%)</h3>
<p>Three digits + number of zeros. <b>1002</b> = 100 + 00 = 10 kΩ. <b>4701</b> = 4.7 kΩ. <b>1000</b> = 100 Ω.</p>
<h3>R notation</h3>
<p><b>4R7</b> = 4.7 Ω, <b>R22</b> = 0.22 Ω, <b>R010</b> = 0.01 Ω (common for current sense).</p>
<h3>EIA-96 (±1%, 0603)</h3>
<p>Two digits + a letter. The two digits are a <b>lookup code</b> (01 = 100, 02 = 102 … 96 = 976) and the letter is the multiplier:</p>
<p>Z ×0.001, Y/R ×0.01, X/S ×0.1, A ×1, B/H ×10, C ×100, D ×1000, E ×10000, F ×100000.</p>
<div class="ex"><b>01C</b> = 100 × 100 = 10 kΩ. <b>68X</b> = 499 × 0.1 = 49.9 Ω. <b>01B</b> = 1 kΩ.</div>
<div class="job"><b>On the line:</b> if a marking doesn't match the BOM, check whether it's a 4-digit vs 3-digit code before calling it a wrong part — "1002" and "103" are both 10 kΩ.</div>` },

 { id: 'r4', title: 'Tolerance, power and E-series', body: `
<h3>Tolerance</h3>
<p>How far the real value can be from the marked value. A 10 kΩ ±5% resistor can measure anywhere from 9.5 kΩ to 10.5 kΩ. Precision parts are ±1%, ±0.1% or better.</p>
<h3>E-series (preferred values)</h3>
<p>Resistors aren't made in every value — they follow sets spaced so tolerances overlap:</p>
<ul><li><b>E12</b> (±10%): 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82</li>
<li><b>E24</b> (±5%): adds 11, 13, 16, 20, 24, 30, 36, 43, 51, 62, 75, 91</li>
<li><b>E96</b> (±1%): 96 values per decade (100, 102, 105, 107…)</li></ul>
<p>So you'll see 4.7 k and 47 k constantly, but never 5 k in E12.</p>
<h3>Power rating</h3>
<p>Calculated with P = I²R. Pick a part rated at least <b>2×</b> the actual dissipation for reliability. Bigger body = more power. Chip sizes: 0201 (1/20 W), 0402 (1/16), 0603 (1/10), 0805 (1/8), 1206 (1/4), 2010 (3/4), 2512 (1 W).</p>
<h3>Voltage rating</h3>
<p>Even if power is fine, small resistors have a maximum working voltage (e.g. 50 V for 0402, 200 V for 1206). High-voltage dividers use several resistors in series.</p>
<h3>Temperature coefficient (TCR)</h3>
<p>Change in resistance with temperature, in ppm/°C. Thick-film chips are ~±100–200 ppm; thin-film precision parts ±25 ppm or better.</p>` },

 { id: 'r5', title: 'Resistor types', body: `
<ul><li><b>Carbon film</b> — cheap THT general purpose, ±5%. Often beige body.</li>
<li><b>Metal film</b> — more accurate and stable (±1%), lower noise. Often blue body with 5 bands.</li>
<li><b>Wirewound</b> — wire wrapped on a ceramic core, handles high power (several W). Often in ceramic/aluminium housings. Inductive, so not for high frequency.</li>
<li><b>Thick film chip</b> — the standard SMD resistor: black top, white ceramic body, printed code.</li>
<li><b>Thin film chip</b> — precision SMD, tighter tolerance and TCR.</li>
<li><b>Resistor arrays/networks</b> — several resistors in one package (designator RN), e.g. 4 × 10 k in an 0603-size array.</li></ul>
<h3>Variable resistors</h3>
<ul><li><b>Potentiometer</b> (pot) — 3 terminals, a wiper moves along a track. Used as a voltage divider (volume knobs).</li>
<li><b>Trimmer / preset</b> — small pot adjusted with a screwdriver during calibration. Designator often <b>VR</b> or <b>RV</b>.</li>
<li><b>Rheostat</b> — variable resistor using two terminals.</li></ul>
<h3>Sensing resistors</h3>
<ul><li><b>NTC thermistor</b> — resistance <b>drops</b> as temperature rises. Temperature sensing and inrush current limiting.</li>
<li><b>PTC thermistor</b> — resistance <b>rises</b> with temperature. Resettable fuses (polyfuses) are PTCs.</li>
<li><b>LDR</b> (light dependent resistor) — resistance drops in light.</li>
<li><b>Varistor (MOV)</b> — resistance drops sharply at high voltage; clamps mains surges. Usually a blue/orange disc.</li></ul>` },
 ]});

Q('r1','Which is NOT a typical job for a resistor?',['Storing charge','Limiting LED current','Pull-up on a digital input','Voltage divider'],'Storing charge is a capacitor’s job.');
Q('r1','Do resistors have polarity?',['No — either way round','Yes, band end is +','Yes, only SMD types','Only above 1 W'],'Resistors are non-polarised.');
Q('r1','A 0 Ω resistor is used as…',['A jumper/link','A fuse only','A current sense resistor','A pull-up'],'0 Ω parts act as jumpers placeable by machine.');
Q('r1','Typical pull-up resistor value is…',['4.7 k–10 k','1–10 Ω','1–10 MΩ','0 Ω'],'Pull-ups are usually a few kΩ to tens of kΩ.');
Q('r1','The reference designator for a resistor network is usually…',['RN','R','RV','N'],'RN = resistor network/array.');
Q('r1','The IEC (UK/European) resistor symbol is…',['A rectangle','A zig-zag','A circle with arrow','Two parallel lines'],'IEC uses a rectangle; US/ANSI uses a zig-zag.');
Q('r2','Brown-Black-Red-Gold is…',['1 kΩ ±5%','10 kΩ ±5%','100 Ω ±5%','12 Ω ±5%'],'1, 0, ×100 = 1000 Ω.');
Q('r2','Yellow-Violet-Orange-Gold is…',['47 kΩ','4.7 kΩ','470 kΩ','470 Ω'],'4, 7, ×1000 = 47,000 Ω.');
Q('r2','Red-Red-Brown-Gold is…',['220 Ω','22 Ω','2.2 kΩ','221 Ω'],'2, 2, ×10 = 220 Ω.');
Q('r2','What digit is Green?',['5','4','6','3'],'Black0 Brown1 Red2 Orange3 Yellow4 Green5.');
Q('r2','What digit is Violet?',['7','6','8','9'],'Blue 6, Violet 7, Grey 8, White 9.');
Q('r2','A gold tolerance band means…',['±5%','±10%','±1%','±2%'],'Gold ±5%, Silver ±10%, Brown ±1%.');
Q('r2','Gold used as the multiplier band means…',['×0.1','×10','×1000','×0.01'],'Gold multiplier = ×0.1, silver = ×0.01.');
Q('r2','Brown-Black-Black-Red-Brown (5-band) is…',['10 kΩ ±1%','1 kΩ ±1%','100 kΩ ±1%','10 kΩ ±2%'],'1,0,0 ×100 = 10,000 Ω, brown = ±1%.');
Q('r2','Orange-Orange-Brown-Gold is…',['330 Ω','33 Ω','3.3 kΩ','331 kΩ'],'3, 3, ×10 = 330 Ω.');
Q('r2','The 6th band on a 6-band resistor shows…',['Temperature coefficient','Power rating','Voltage rating','Manufacturer'],'6th band = TCR in ppm/°C.');
Q('r3','SMD code 103 means…',['10 kΩ','103 Ω','1 kΩ','100 kΩ'],'10 followed by 3 zeros.');
Q('r3','SMD code 472 means…',['4.7 kΩ','472 Ω','47 kΩ','4.72 Ω'],'47 + 00 = 4700 Ω.');
Q('r3','SMD code 100 means…',['10 Ω','100 Ω','1 kΩ','1 Ω'],'10 + no zeros = 10 Ω.');
Q('r3','4-digit code 1002 means…',['10 kΩ','1 kΩ','100 kΩ','1002 Ω'],'100 + 00 = 10,000 Ω.');
Q('r3','R010 is…',['0.01 Ω','10 Ω','0.1 Ω','1 kΩ'],'R is the decimal point: 0.010 Ω = 10 mΩ.');
Q('r3','EIA-96 code 01C is…',['10 kΩ','1 kΩ','100 Ω','100 kΩ'],'01 = 100, C = ×100 → 10 kΩ.');
Q('r3','Why do 0402 resistors often have no marking?',['Too small to print','They are all 0 Ω','Markings are on the bottom','Machines can read colour'],'0402 and smaller are usually unmarked.');
Q('r3','SMD 221 is…',['220 Ω','221 Ω','22 Ω','2.2 kΩ'],'22 + one zero.');
Q('r3','SMD 4701 is…',['4.7 kΩ','470 Ω','47 kΩ','4.7 MΩ'],'470 + one zero = 4700 Ω.');
Q('r3','SMD 105 is…',['1 MΩ','100 kΩ','10 kΩ','105 Ω'],'10 + 5 zeros = 1,000,000 Ω.');
Q('r4','A 10 kΩ ±5% resistor could measure…',['9.5 k to 10.5 k','9.9 k to 10.1 k','9 k to 11 k','Exactly 10 k'],'5% of 10 k = 500 Ω either way.');
Q('r4','Which value is in the E12 series?',['4.7','5.0','6.0','4.5'],'E12: 10 12 15 18 22 27 33 39 47 56 68 82.');
Q('r4','A 1206 chip resistor is rated about…',['1/4 W','1/20 W','1 W','2 W'],'1206 ≈ 0.25 W.');
Q('r4','Good practice: choose a power rating of at least…',['2× the actual dissipation','Exactly the dissipation','Half the dissipation','10× always'],'Derating by ~50% improves reliability.');
Q('r4','Which series gives ±1% values?',['E96','E12','E6','E24'],'E96 = 96 values per decade, 1%.');
Q('r4','TCR describes…',['Change in resistance with temperature','Tolerance','Power rating','Voltage rating'],'Temperature coefficient of resistance, in ppm/°C.');
Q('r4','Which chip size typically handles ~1 W?',['2512','0603','0402','0805'],'2512 is the big power chip resistor.');
Q('r5','An NTC thermistor’s resistance…',['Falls as temperature rises','Rises as temperature rises','Stays constant','Falls in light'],'Negative temperature coefficient.');
Q('r5','A resettable fuse (polyfuse) is a type of…',['PTC thermistor','NTC thermistor','Varistor','LDR'],'PTCs heat up and go high resistance under overcurrent.');
Q('r5','A MOV/varistor is used to…',['Clamp voltage surges','Sense light','Set an LED current','Measure temperature'],'Varistors drop resistance at high voltage, absorbing surges.');
Q('r5','Which resistor type suits high power (5 W+)?',['Wirewound','Thick film 0402','Carbon film 1/4 W','Thin film'],'Wirewound handles high power.');
Q('r5','A trimmer resistor is…',['A small pot adjusted with a screwdriver','A fixed resistor cut to size','A fuse','A thermistor'],'Trimmers/presets are set during calibration.');
Q('r5','Blue-bodied 5-band THT resistors are usually…',['Metal film ±1%','Carbon film ±5%','Wirewound','Thermistors'],'Metal film parts are commonly blue with 5 bands.');
Q('r5','How many terminals does a potentiometer have?',['3','2','4','1'],'Two track ends plus the wiper.');

C('resistors','Colour code order','Black0 Brown1 Red2 Orange3 Yellow4 Green5 Blue6 Violet7 Grey8 White9');
C('resistors','Mnemonic for colour code','Bad Beer Rots Our Young Guts But Vodka Goes Well');
C('resistors','4-band layout','Digit, Digit, Multiplier, Tolerance');
C('resistors','5-band layout','Digit, Digit, Digit, Multiplier, Tolerance');
C('resistors','Gold / Silver tolerance','±5% / ±10%');
C('resistors','Brown / Red tolerance','±1% / ±2%');
C('resistors','Gold / Silver as multiplier','×0.1 / ×0.01');
C('resistors','Brown-Black-Orange','10 kΩ');
C('resistors','Yellow-Violet-Red','4.7 kΩ');
C('resistors','Red-Red-Brown','220 Ω');
C('resistors','Brown-Black-Red','1 kΩ');
C('resistors','Orange-Orange-Brown','330 Ω');
C('resistors','Brown-Black-Yellow','100 kΩ');
C('resistors','SMD 3-digit code','2 digits + number of zeros (±5%). 103 = 10 kΩ');
C('resistors','SMD 4-digit code','3 digits + number of zeros (±1%). 1002 = 10 kΩ');
C('resistors','SMD 000','0 Ω link / jumper');
C('resistors','EIA-96 code','2-digit lookup value + letter multiplier. 01C = 10 kΩ');
C('resistors','EIA-96 letters','Z×0.001 Y/R×0.01 X/S×0.1 A×1 B/H×10 C×100 D×1k E×10k F×100k');
C('resistors','E12 series','10 12 15 18 22 27 33 39 47 56 68 82');
C('resistors','Chip resistor power: 0402 / 0603 / 0805 / 1206','1/16 W / 1/10 W / 1/8 W / 1/4 W');
C('resistors','NTC thermistor','Resistance FALLS as temperature rises.');
C('resistors','PTC thermistor','Resistance RISES with temperature — polyfuses.');
C('resistors','Varistor (MOV)','Clamps voltage spikes/surges; resistance drops at high voltage.');
C('resistors','Pull-up resistor','Holds an input HIGH when nothing drives it (4.7–10 kΩ typical).');
C('resistors','Current sense resistor','Very low value (e.g. R010); voltage across it = I × R.');
C('resistors','Potentiometer','3-terminal variable resistor; wiper gives adjustable voltage divider.');
C('resistors','Thick vs thin film chip','Thick = standard/cheap; thin = precision, low TCR.');

/* ============================ MODULE 3: CAPACITORS ============================ */
M.push({ id: 'capacitors', title: 'Capacitors', icon: '🔋', color: '#4db8ff',
 blurb: 'Storing charge, decoupling, types, codes, polarity and ratings.',
 lessons: [
 { id: 'c1', title: 'What a capacitor does', body: `
<p>A capacitor is two conductive plates separated by an insulator called the <b>dielectric</b>. Apply a voltage and charge builds up on the plates — energy is stored in the electric field.</p>
{{sym:capacitor}}
<p>Capacitance is measured in <b>farads (F)</b>. A farad is huge, so real parts are in µF, nF and pF.</p>
<h3>Key behaviour</h3>
<ul><li><b>Blocks DC</b> — once charged, no steady current flows through it.</li>
<li><b>Passes AC</b> — changing voltages get through; the higher the frequency, the easier.</li>
<li><b>Resists sudden voltage changes</b> — it acts like a tiny local battery.</li></ul>
<h3>Common jobs</h3>
<ul><li><b>Decoupling / bypass</b> — 100 nF next to every IC power pin to supply fast current spikes and soak up noise.</li>
<li><b>Bulk / smoothing</b> — big electrolytics after a rectifier or at a board's power input.</li>
<li><b>Coupling</b> — passing an AC signal while blocking DC between stages (audio).</li>
<li><b>Timing</b> — with a resistor, sets a time constant (RC).</li>
<li><b>Filtering</b> — with R or L to remove certain frequencies.</li></ul>
<h3>Time constant</h3>
<p><b>τ = R × C</b>. After one τ, a capacitor charges to ~63% of the supply; after <b>5τ</b> it's considered fully charged. 10 kΩ × 100 µF = 1 second.</p>
<p>Designator: <b>C</b>.</p>` },

 { id: 'c2', title: 'Capacitor types', body: `
<h3>Ceramic (MLCC)</h3>
<p>Multi-Layer Ceramic Capacitors are by far the most common on SMT boards — tan/brown/grey chips with <b>no markings</b>. Not polarised. Values pF to ~100 µF. Cheap, small, low ESR — perfect for decoupling. Fragile: they <b>crack</b> if the board flexes or from thermal shock (e.g. touching a hot iron to a cold part).</p>
<h3>Aluminium electrolytic</h3>
<p>Cylindrical "can", big values (1 µF to 10,000s µF). <b>Polarised</b> — fitted backwards they can bulge, vent or explode. THT radial versions have a stripe marking the <b>negative</b> lead, which is also <b>shorter</b>. SMD "V-chip" types sit on a plastic base; the marked/black half-moon on top is <b>negative</b>. They dry out with age and heat — a classic failure in power supplies (bulging tops).</p>
<h3>Tantalum</h3>
<p>Small, stable, polarised. Usually yellow, orange or black moulded chips. <b>The stripe/bar on a tantalum marks POSITIVE</b> — the opposite of electrolytics! Reversed or over-voltaged tantalums can fail short and burn.</p>
<h3>Polymer</h3>
<p>Solid polymer aluminium or tantalum — low ESR, don't dry out; common on motherboards near CPUs.</p>
<h3>Film</h3>
<p>Polyester, polypropylene — boxy plastic THT parts. Stable, non-polarised, good for audio, mains filtering. <b>X and Y safety capacitors</b> across mains are film/ceramic types certified to fail safely.</p>
<h3>Supercapacitors</h3>
<p>Farads of capacitance at low voltage (2.7 V per cell) — used for memory backup and energy storage.</p>
<div class="job"><b>Polarity summary:</b> Electrolytic stripe = <b>−</b>. Tantalum bar = <b>+</b>. Always check the PCB silkscreen/polarity mark.</div>` },

 { id: 'c3', title: 'Capacitor codes and markings', body: `
<h3>3-digit code (pF)</h3>
<p>Same system as resistors but the answer is in <b>picofarads</b>: two digits + number of zeros.</p>
<ul><li><b>104</b> = 10 + 0000 = 100,000 pF = <b>100 nF</b> = 0.1 µF — the classic decoupling cap</li>
<li><b>103</b> = 10,000 pF = 10 nF</li><li><b>102</b> = 1 nF</li><li><b>101</b> = 100 pF</li>
<li><b>105</b> = 1 µF</li><li><b>220</b> = 22 pF (crystal load caps)</li><li><b>474</b> = 470 nF</li></ul>
<h3>Tolerance letters</h3>
<p>Often after the code: <b>J</b> ±5%, <b>K</b> ±10%, <b>M</b> ±20%, <b>Z</b> −20/+80%. So "104K" = 100 nF ±10%. (Small values: B ±0.1 pF, C ±0.25 pF, D ±0.5 pF, F ±1%.)</p>
<h3>Electrolytics</h3>
<p>Printed plainly: e.g. "470 µF 25 V 105 °C". The temperature is the max rated temperature — 105 °C parts last longer than 85 °C ones.</p>
<h3>Tantalum codes</h3>
<p>Often a value code like <b>107</b> (100 µF — remember the code is in pF: 10 + 7 zeros pF = 100 µF) and a voltage letter: <b>A</b> = 10 V, <b>C</b> = 16 V, <b>D</b> = 20 V, <b>E</b> = 25 V, <b>J</b> = 6.3 V, <b>G</b> = 4 V.</p>
<div class="job"><b>On the line:</b> MLCCs are unmarked — if parts get mixed up off a reel, you can't identify them by eye. Never put loose chip caps back on a reel; use an LCR meter or scrap them.</div>` },

 { id: 'c4', title: 'Ratings: voltage, ESR and dielectric', body: `
<h3>Voltage rating</h3>
<p>Never exceed it. Good practice is to use a cap rated well above the working voltage — <b>at least 1.5–2×</b>, and more for tantalums. A 12 V rail would use 25 V caps.</p>
<h3>ESR</h3>
<p><b>Equivalent Series Resistance</b> — the small internal resistance. Low ESR is critical for switching power supplies; high ESR causes heating and ripple. Aged electrolytics have high ESR. An ESR meter is a great tool for checking old caps in-circuit.</p>
<h3>Ceramic dielectrics</h3>
<ul><li><b>C0G / NP0</b> (Class 1) — very stable with temperature and voltage, small values (pF–nF). Timing, filters, RF.</li>
<li><b>X7R</b> (Class 2) — ±15% from −55 to +125 °C. General decoupling.</li>
<li><b>X5R</b> — ±15% from −55 to +85 °C. Higher values in small sizes.</li>
<li><b>Y5V / Z5U</b> — cheap, value can drop by 80%! Avoid for anything important.</li></ul>
<div class="tip"><b>DC bias effect:</b> Class 2 MLCCs lose capacitance as DC voltage is applied. A 10 µF 6.3 V 0603 cap at 5 V might only give 3–4 µF!</div>
<h3>Temperature & lifetime</h3>
<p>Electrolytic life roughly <b>doubles for every 10 °C cooler</b> it runs. That's why they're kept away from hot regulators.</p>
<h3>Leakage</h3>
<p>A small current that flows through the dielectric; higher in electrolytics.</p>` },
 ]});

Q('c1','A capacitor stores energy in…',['An electric field','A magnetic field','Chemical bonds only','Heat'],'Charge on the plates creates an electric field.');
Q('c1','Capacitors block…',['DC','AC','Both','Neither'],'Once charged, no steady DC flows; changing (AC) signals pass.');
Q('c1','The classic decoupling capacitor value is…',['100 nF','100 µF','100 pF','1 F'],'100 nF (0.1 µF) next to IC power pins.');
Q('c1','The RC time constant formula is…',['τ = R × C','τ = R ÷ C','τ = C ÷ R','τ = 1/(RC)'],'τ = RC seconds.');
Q('c1','After how many time constants is a capacitor considered fully charged?',['5','1','2','10'],'~99% charged after 5τ.');
Q('c1','10 kΩ × 100 µF gives a time constant of…',['1 s','0.1 s','10 s','1 ms'],'10,000 × 0.0001 = 1 s.');
Q('c1','The insulator between a capacitor’s plates is called…',['Dielectric','Electrolyte','Substrate','Anode'],'The dielectric sets much of the capacitor’s behaviour.');
Q('c2','On an aluminium electrolytic, the stripe marks…',['Negative','Positive','Pin 1','The voltage'],'Electrolytic stripe = negative (shorter lead).');
Q('c2','On a tantalum capacitor, the bar marks…',['Positive','Negative','Ground','Nothing'],'Tantalum bar = positive — opposite of electrolytics.');
Q('c2','Most common capacitor on SMT boards?',['MLCC ceramic','Tantalum','Film','Supercap'],'MLCCs are everywhere.');
Q('c2','MLCCs often crack due to…',['Board flex and thermal shock','Too little solder paste','Being unmarked','Low humidity'],'Ceramic is brittle — flexing or sudden heat cracks them.');
Q('c2','A bulging-top electrolytic usually means…',['It has failed','It is a high-voltage type','Normal for 105 °C caps','It is a polymer type'],'Bulging = failed/dried out.');
Q('c2','On a THT electrolytic the negative lead is…',['Shorter','Longer','Thicker','Bent'],'Long lead = positive.');
Q('c2','X and Y capacitors are used for…',['Mains filtering, failing safely','Crystal loading','Decoupling CPUs','Timing'],'Safety-rated mains caps.');
Q('c2','Supercapacitors are typically rated around…',['2.7 V per cell','50 V','400 V','0.7 V'],'Supercaps are low voltage, very high capacitance.');
Q('c3','Capacitor code 104 is…',['100 nF','104 pF','10 nF','1 µF'],'10 + 4 zeros pF = 100,000 pF = 100 nF.');
Q('c3','Capacitor code 103 is…',['10 nF','100 nF','1 nF','103 pF'],'10,000 pF = 10 nF.');
Q('c3','Capacitor code 220 is…',['22 pF','220 pF','22 nF','2.2 pF'],'22 + no zeros = 22 pF.');
Q('c3','Capacitor code 105 is…',['1 µF','10 µF','100 nF','1 nF'],'1,000,000 pF = 1 µF.');
Q('c3','The letter K after a cap code means…',['±10%','±5%','±20%','Kilo'],'J 5%, K 10%, M 20%.');
Q('c3','Tolerance letter M means…',['±20%','Mega','±10%','Micro'],'M = ±20%.');
Q('c3','Capacitor codes give the value in…',['Picofarads','Microfarads','Nanofarads','Farads'],'The base unit for codes is pF.');
Q('c3','Code 474 is…',['470 nF','47 nF','4.7 µF','474 pF'],'47 + 4 zeros pF = 470,000 pF = 470 nF.');
Q('c4','A good voltage rating for caps on a 12 V rail is…',['25 V','12 V','10 V','6.3 V'],'Use 1.5–2× margin or more.');
Q('c4','ESR stands for…',['Equivalent Series Resistance','Electrical Storage Rating','Effective Supply Ripple','Extra Safe Rating'],'Internal series resistance of a capacitor.');
Q('c4','Which ceramic dielectric is the most stable?',['C0G/NP0','X7R','Y5V','Z5U'],'Class 1 C0G barely changes with temp or voltage.');
Q('c4','X7R is stable to ±15% over…',['−55 to +125 °C','−55 to +85 °C','0 to 70 °C','−30 to +85 °C'],'X = −55, 7 = +125, R = ±15%.');
Q('c4','DC bias effect means a Class 2 MLCC…',['Loses capacitance with applied DC voltage','Gains capacitance with voltage','Becomes polarised','Blocks AC'],'High-K ceramics lose a lot of capacitance under DC.');
Q('c4','Electrolytic lifetime roughly doubles for every…',['10 °C cooler','1 °C cooler','50 °C cooler','10 V lower'],'The "10 degree rule".');
Q('c4','Which dielectric should be avoided for important circuits?',['Y5V','C0G','X7R','X5R'],'Y5V can lose up to ~80% of its value.');

C('capacitors','Capacitor basics','Two plates + dielectric. Stores charge. Blocks DC, passes AC.');
C('capacitors','Unit of capacitance','Farad (F). Real parts: µF, nF, pF.');
C('capacitors','Time constant','τ = R × C. 63% after 1τ, fully charged after 5τ.');
C('capacitors','Decoupling cap','100 nF placed close to each IC power pin.');
C('capacitors','Code 104','100 nF (0.1 µF)');
C('capacitors','Code 103','10 nF');
C('capacitors','Code 102','1 nF');
C('capacitors','Code 101','100 pF');
C('capacitors','Code 105','1 µF');
C('capacitors','Code 220','22 pF');
C('capacitors','Code 474','470 nF');
C('capacitors','Tolerance letters J / K / M','±5% / ±10% / ±20%');
C('capacitors','Electrolytic polarity mark','Stripe = NEGATIVE. Short lead = negative.');
C('capacitors','Tantalum polarity mark','Bar/stripe = POSITIVE.');
C('capacitors','MLCC','Multi-layer ceramic chip cap. Unmarked, non-polarised, cracks easily.');
C('capacitors','ESR','Equivalent Series Resistance — low is good; old electrolytics go high.');
C('capacitors','C0G / NP0','Class 1 ceramic — very stable; small values; timing/RF.');
C('capacitors','X7R','Class 2 ceramic, ±15% from −55 to +125 °C.');
C('capacitors','X5R','Class 2 ceramic, ±15% from −55 to +85 °C.');
C('capacitors','Capacitors in parallel','Add up: C = C1 + C2.');
C('capacitors','Capacitors in series','Product over sum (like resistors in parallel).');
C('capacitors','Voltage derating for caps','Use at least 1.5–2× the working voltage.');
C('capacitors','Failed electrolytic signs','Bulging top, leaking, high ESR, crusty residue.');
C('capacitors','X / Y capacitors','Safety-rated mains filter caps (X across L-N, Y line to earth).');
C('capacitors','Tantalum voltage code letters','G 4V, J 6.3V, A 10V, C 16V, D 20V, E 25V');

/* ============================ MODULE 4: INDUCTORS & OTHERS ============================ */
M.push({ id: 'inductors', title: 'Inductors & Other Passives', icon: '🌀', color: '#b48cff',
 blurb: 'Inductors, ferrites, transformers, crystals, fuses, relays and connectors.',
 lessons: [
 { id: 'i1', title: 'Inductors and ferrite beads', body: `
<p>An inductor is a coil of wire. Current through it creates a <b>magnetic field</b> that stores energy. Inductance is measured in <b>henries (H)</b> — usually µH or mH.</p>
{{sym:inductor}}
<h3>Key behaviour</h3>
<ul><li><b>Resists changes in current</b> — the opposite of a capacitor, which resists changes in voltage.</li>
<li><b>Passes DC</b> easily (just the wire resistance), but <b>opposes AC</b> more as frequency rises.</li>
<li>Interrupting the current suddenly causes a big <b>voltage spike</b> (back-EMF) — that's why relay coils need a flyback diode.</li></ul>
<h3>Where you'll see them</h3>
<ul><li><b>Switching regulators</b> (buck/boost) — the big square shielded SMD inductors next to the regulator IC.</li>
<li><b>Filters</b> — LC filters remove noise from supplies.</li>
<li><b>Common-mode chokes</b> — two windings on one core, on USB/Ethernet/mains inputs to block noise.</li></ul>
<h3>Ratings</h3>
<p><b>Saturation current</b> — above this the core can't store more energy and inductance collapses. <b>DCR</b> — the DC resistance of the winding.</p>
<h3>Ferrite beads</h3>
<p>Look like chip resistors (often black or grey). They act as a resistor at high frequency, turning noise into heat, while passing DC freely. Designator <b>FB</b> or <b>L</b>. Rated in ohms <i>at 100 MHz</i> (e.g. "600 Ω @ 100 MHz").</p>
<div class="job"><b>On the line:</b> an unmarked black chip could be a ferrite bead, not a resistor — check the designator and BOM.</div>` },

 { id: 'i2', title: 'Transformers and relays', body: `
<h3>Transformers</h3>
<p>Two (or more) coils on a shared core. AC in the <b>primary</b> creates a changing magnetic field that induces a voltage in the <b>secondary</b>. Only works with <b>AC</b>.</p>
<div class="formula">V<sub>s</sub> / V<sub>p</sub> = N<sub>s</sub> / N<sub>p</sub></div>
<p>A 10:1 turns ratio turns 230 V into 23 V. Transformers also provide <b>isolation</b> — no direct electrical connection between primary and secondary, which is key for safety. Designator: <b>T</b> or <b>TR</b>.</p>
<p>Switch-mode supplies use small high-frequency ferrite transformers instead of big heavy iron ones.</p>
<h3>Relays</h3>
<p>An electrically operated switch: a coil becomes an electromagnet and pulls a contact over. Lets a small low-voltage signal switch a big load (mains, motors) with isolation.</p>
<ul><li><b>NO</b> — normally open (closes when energised)</li>
<li><b>NC</b> — normally closed (opens when energised)</li>
<li><b>COM</b> — common contact</li>
<li>SPST, SPDT, DPDT — poles and throws</li></ul>
<p>Relay coils need a <b>flyback diode</b> across them to absorb the voltage spike when switched off. <b>Solid-state relays (SSRs)</b> do the same job with no moving parts. Designator: <b>K</b> (sometimes RL).</p>` },

 { id: 'i3', title: 'Crystals and oscillators', body: `
<p>Digital circuits need an accurate clock. A <b>quartz crystal</b> vibrates mechanically at a very precise frequency when driven electrically (the piezoelectric effect).</p>
<ul><li><b>Crystal (Y or X designator)</b> — passive, 2 pins (or 4 with case grounds). Needs an oscillator circuit, usually inside a microcontroller, plus two <b>load capacitors</b> (typically 12–22 pF C0G) to ground.</li>
<li><b>Oscillator (OSC/X/U)</b> — active, 4 pins: power, ground, output, enable. Gives a ready-made clock signal.</li>
<li><b>Ceramic resonator</b> — cheaper, less accurate, often 3 pins with built-in caps.</li>
<li><b>32.768 kHz crystals</b> — used for real-time clocks (2¹⁵ = 32,768, so dividing gives exactly 1 second).</li></ul>
<h3>Accuracy</h3>
<p>Measured in <b>ppm</b> (parts per million). ±20 ppm on a 16 MHz crystal = ±320 Hz.</p>
<div class="job"><b>Handling:</b> crystals are shock-sensitive — a dropped crystal can be damaged internally. Keep load caps and traces short; excess flux residue near a crystal can stop it oscillating.</div>` },

 { id: 'i4', title: 'Fuses, switches and connectors', body: `
<h3>Fuses (F)</h3>
<p>A thin conductor that melts if current gets too high, protecting the circuit and preventing fire.</p>
<ul><li><b>Fast-blow (F)</b> vs <b>slow-blow/time-delay (T)</b> — slow-blow tolerates brief surges like motor start-up.</li>
<li>Rated in current, voltage and breaking capacity.</li>
<li>SMD fuses look like chip resistors; THT ones are glass/ceramic cartridges (20×5 mm common in the UK).</li>
<li><b>Resettable PTC</b> fuses recover after cooling.</li></ul>
<h3>Switches (S / SW)</h3>
<p>Tactile push buttons, slide switches, DIP switches (banks of tiny switches for configuration), toggle, rotary. Poles and throws again: SPST, SPDT, DPDT.</p>
<h3>Connectors (J / P / CN / X)</h3>
<ul><li><b>Headers</b> — 2.54 mm (0.1") pitch pins, the classic.</li>
<li><b>JST, Molex</b> — wire-to-board housings in various pitches.</li>
<li><b>USB, RJ45, D-sub, barrel jack</b> — external interfaces.</li>
<li><b>FFC/FPC</b> — flat flex cable connectors with latches.</li>
<li><b>Board-to-board</b> — mezzanine connectors.</li></ul>
<p>Convention: <b>J</b> is often the fixed (jack) side, <b>P</b> the plug. Pin 1 is shown by a square pad, triangle or dot.</p>
<h3>Other parts</h3>
<p>Buzzers/speakers (<b>BZ / LS</b>), batteries (<b>BT</b>), test points (<b>TP</b>), heatsinks (<b>HS</b>), mounting holes (<b>MH / H</b>).</p>` },
 ]});

Q('i1','An inductor stores energy in…',['A magnetic field','An electric field','A dielectric','Chemical bonds'],'Current in a coil creates a magnetic field.');
Q('i1','Inductors resist changes in…',['Current','Voltage','Resistance','Temperature'],'Capacitors resist voltage change; inductors resist current change.');
Q('i1','Unit of inductance?',['Henry (H)','Farad (F)','Tesla (T)','Weber'],'Inductance is in henries; practical parts are µH/mH.');
Q('i1','A ferrite bead is usually rated in…',['Ohms at 100 MHz','Microhenries','Farads','Watts'],'e.g. 600 Ω @ 100 MHz.');
Q('i1','Above an inductor’s saturation current…',['Inductance collapses','It becomes a capacitor','It blocks DC','Nothing changes'],'The core can’t store more energy, so inductance drops sharply.');
Q('i1','Common-mode chokes are found on…',['USB/Ethernet/mains inputs','Crystal circuits','LED indicators','Pull-ups'],'They block common-mode noise on cables.');
Q('i1','Inductors pass DC…',['Easily','Not at all','Only above 1 kHz','Only through the core'],'DC only sees the winding resistance (DCR).');
Q('i2','A transformer only works with…',['AC','DC','Both equally','Batteries'],'It needs a changing magnetic field.');
Q('i2','A 10:1 transformer with 230 V primary gives…',['23 V','2300 V','10 V','230 V'],'Vs = Vp × Ns/Np = 230 / 10.');
Q('i2','A relay’s NO contact…',['Closes when the coil is energised','Opens when energised','Is always closed','Is the coil connection'],'Normally open = closes when switched.');
Q('i2','Why does a relay coil need a diode across it?',['To absorb the back-EMF spike','To make it faster','To rectify the load','To set coil current'],'Flyback diodes protect the driver transistor.');
Q('i2','Designator for a relay is usually…',['K','R','T','Q'],'K (sometimes RL).');
Q('i2','A big benefit of transformers in PSUs is…',['Isolation from mains','Turning DC into AC','Storing energy long term','Removing need for fuses'],'Primary and secondary aren’t directly connected.');
Q('i3','A crystal’s accuracy is given in…',['ppm','pF','Ω','%/V'],'Parts per million.');
Q('i3','What do crystal load capacitors typically measure?',['12–22 pF','100 nF','10 µF','1 nF'],'Small C0G caps, often 12–22 pF.');
Q('i3','A 4-pin oscillator differs from a 2-pin crystal because…',['It is active and outputs a clock','It is a resonator','It has no power pins','It is unpolarised'],'Oscillators contain the drive circuit.');
Q('i3','Why are RTC crystals 32.768 kHz?',['It divides by 2¹⁵ to give 1 second','It is the cheapest','Mains frequency multiple','Matches USB'],'32,768 = 2¹⁵.');
Q('i3','Something that can stop a crystal oscillating:',['Flux residue/contamination nearby','Correct load caps','Short traces','A ground ring'],'Leakage and contamination upset the oscillator.');
Q('i3','A crystal is usually given the designator…',['Y or X','C','K','Q'],'Y (or X) for crystals.');
Q('i4','A "T" rated fuse is…',['Slow-blow (time-delay)','Thermal','Tiny','Tested'],'T = time-lag; F = fast.');
Q('i4','Standard header pin pitch is…',['2.54 mm','1.27 mm','5 mm','0.5 mm'],'0.1 inch = 2.54 mm.');
Q('i4','DIP switches are used for…',['Configuration settings','Mains switching','Fuse protection','Audio'],'Banks of small switches set options.');
Q('i4','Test points are usually designated…',['TP','T','P','TT'],'TP1, TP2…');
Q('i4','Pin 1 of a connector footprint is often shown by…',['A square pad','A round pad','A via','A fiducial'],'Square pad, dot or triangle.');
Q('i4','A slow-blow fuse is chosen when…',['There are brief start-up surges','The circuit is very sensitive','It is DC only','Voltage is high'],'It tolerates inrush without nuisance blowing.');

C('inductors','Inductor','Coil storing energy in a magnetic field. Resists change in current. Henries (H).');
C('inductors','Inductor vs capacitor','L resists current change & passes DC; C resists voltage change & blocks DC.');
C('inductors','Saturation current','Current above which an inductor’s core saturates and inductance collapses.');
C('inductors','DCR','DC resistance of an inductor’s winding.');
C('inductors','Ferrite bead','Lossy at high freq — kills noise, passes DC. Rated Ω @ 100 MHz. FB.');
C('inductors','Common-mode choke','Two windings on one core; blocks noise common to both lines.');
C('inductors','Transformer ratio','Vs/Vp = Ns/Np. AC only. Gives isolation.');
C('inductors','Relay','Coil-operated switch. Designator K. Needs flyback diode.');
C('inductors','NO / NC / COM','Normally open / normally closed / common contact.');
C('inductors','SPST / SPDT / DPDT','Single pole single throw / single pole double throw / double pole double throw.');
C('inductors','Crystal (Y)','Quartz resonator, 2 pins, needs load caps + oscillator circuit.');
C('inductors','Oscillator','Active clock source: VCC, GND, OUT, EN.');
C('inductors','32.768 kHz','RTC crystal — 2¹⁵, divides to exactly 1 Hz.');
C('inductors','ppm','Parts per million — crystal accuracy. ±20 ppm @ 16 MHz = ±320 Hz.');
C('inductors','Fuse F vs T','F = fast-blow, T = time-delay / slow-blow.');
C('inductors','Polyfuse','Resettable PTC fuse — recovers after cooling.');
C('inductors','Designators J / P','J = jack/fixed connector, P = plug.');
C('inductors','Designators BT, BZ, LS, TP','Battery, buzzer, loudspeaker, test point.');
C('inductors','Back-EMF','Voltage spike when current through an inductor is suddenly interrupted.');
C('inductors','SSR','Solid-state relay — no moving parts, switches with semiconductors.');
})();
