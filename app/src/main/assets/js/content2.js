// Spark content part 2: Diodes, Transistors, ICs & Regulators, Digital logic
(function () {
const M = window.MODULES, QS = window.QUESTIONS, CS = window.CARDS;
const Q = (l, q, a, e) => QS.push({ l, q, a, e });
const C = (m, f, b) => CS.push({ m, f, b });

/* ============================ MODULE 5: DIODES ============================ */
M.push({ id: 'diodes', title: 'Diodes & LEDs', icon: '▶️', color: '#ff6b6b',
 blurb: 'One-way valves for current: rectifiers, zeners, Schottkys, LEDs and TVS.',
 lessons: [
 { id: 'd1', title: 'How a diode works', body: `
<p>A diode lets current flow <b>one way only</b> — from <b>anode (+)</b> to <b>cathode (−)</b>. It's made from a junction of P-type and N-type semiconductor (a <b>PN junction</b>).</p>
{{sym:diode}}
<p>The arrow in the symbol points in the direction of conventional current; the bar is the cathode. On the real part, the <b>band/stripe marks the cathode</b>.</p>
<h3>Forward and reverse</h3>
<ul><li><b>Forward biased</b> — anode more positive than cathode. Once above the <b>forward voltage (V<sub>f</sub>)</b>, current flows. Silicon diodes: ~<b>0.6–0.7 V</b>.</li>
<li><b>Reverse biased</b> — almost no current flows (tiny leakage) until the <b>reverse breakdown voltage</b>.</li></ul>
<h3>Key ratings</h3>
<ul><li><b>V<sub>f</sub></b> — forward voltage drop</li><li><b>I<sub>f</sub></b> — max forward current</li><li><b>V<sub>RRM</sub></b> / PIV — max repetitive reverse voltage</li><li><b>t<sub>rr</sub></b> — reverse recovery time (speed)</li></ul>
<h3>Testing with a meter</h3>
<p>Use the <b>diode test</b> mode: red on anode, black on cathode should read ~0.5–0.7 V (silicon). Reversed it should read OL. Reading near 0 both ways = shorted; OL both ways = open.</p>
<p>Designator: <b>D</b> (LEDs often <b>LED</b> or D).</p>` },

 { id: 'd2', title: 'Rectifiers and bridges', body: `
<p>Rectifier diodes like the <b>1N4001–1N4007</b> (1 A, 50–1000 V) convert AC to DC.</p>
<ul><li><b>Half-wave</b> — one diode, only uses half of the AC wave. Bumpy, inefficient.</li>
<li><b>Full-wave bridge</b> — four diodes in a diamond; both halves of the wave come out positive. Output loses <b>2 × V<sub>f</sub></b> (~1.4 V).</li></ul>
<p>Bridge rectifiers come as single 4-pin packages marked <b>~ ~ + −</b> (two AC inputs, DC + and −). Designator <b>BR</b> or D.</p>
<p>After rectification a big <b>smoothing capacitor</b> fills the gaps between peaks. The leftover wobble is called <b>ripple</b>.</p>
<h3>Other uses</h3>
<ul><li><b>Reverse polarity protection</b> — a series diode stops damage if a battery is fitted backwards.</li>
<li><b>Flyback / freewheel diodes</b> — across relay coils and motors to absorb inductive spikes (cathode to +).</li>
<li><b>OR-ing</b> — two supplies feeding one rail through diodes.</li>
<li><b>Signal diodes</b> — the 1N4148 (glass body, black band) for small fast signals.</li></ul>` },

 { id: 'd3', title: 'Zener, Schottky and TVS diodes', body: `
<h3>Zener diodes</h3>
<p>Designed to be used in <b>reverse breakdown</b>. They conduct at a precise reverse voltage — the <b>zener voltage</b> (e.g. 3.3 V, 5.1 V, 12 V) — and hold it there. Used as simple voltage references and clamps, always with a series resistor to limit current. Symbol: diode with bent "Z" ends on the bar.</p>
<h3>Schottky diodes</h3>
<p>Metal–semiconductor junction. <b>Low forward voltage</b> (~0.2–0.45 V) and very fast switching. Used in switching regulators, reverse polarity protection, and solar panels. Downside: higher reverse leakage. Common part: <b>1N5819</b>, BAT54 (SOT-23). Symbol: bar with "S" hooks.</p>
<h3>TVS diodes</h3>
<p><b>Transient Voltage Suppressors</b> — clamp fast spikes like ESD and surges, protecting sensitive inputs (USB, data lines). Can be <b>unidirectional</b> or <b>bidirectional</b> (bidirectional ones have no polarity). Often in tiny SOD-323 or SOT-23 packages, sometimes arrays.</p>
<h3>Other diodes</h3>
<ul><li><b>Photodiode</b> — produces current when light hits it.</li>
<li><b>Varactor</b> — capacitance changes with reverse voltage; used for tuning.</li></ul>
<div class="job"><b>On the line:</b> SOD-123/SOD-323 diodes have a band at the cathode end — match it to the line/bar on the silkscreen. In SOT-23, the package itself sets orientation, so check the pin-out in the datasheet.</div>` },

 { id: 'd4', title: 'LEDs', body: `
<p><b>Light Emitting Diodes</b> emit light when forward biased. Their forward voltage depends on colour:</p>
<table class="tbl"><tr><th>Colour</th><th>V<sub>f</sub> (approx.)</th></tr><tr><td>Infrared</td><td>1.2–1.5 V</td></tr><tr><td>Red</td><td>1.8–2.1 V</td></tr><tr><td>Yellow/Orange</td><td>2.0–2.2 V</td></tr><tr><td>Green (true)</td><td>2.0–3.2 V</td></tr><tr><td>Blue/White</td><td>2.8–3.4 V</td></tr></table>
<h3>Always use a resistor</h3>
<p>LEDs must have their current limited, usually by a series resistor:</p>
<div class="formula">R = (V<sub>supply</sub> − V<sub>f</sub>) ÷ I</div>
<div class="ex">5 V supply, red LED (2 V), 15 mA: R = (5 − 2) ÷ 0.015 = 200 Ω → use <b>220 Ω</b> (next E12 value up).</div>
<h3>Identifying polarity</h3>
<ul><li>THT: <b>longer leg = anode (+)</b>; flat edge on the rim = cathode.</li>
<li>Inside a clear LED, the bigger "anvil" is usually the cathode.</li>
<li>SMD: a green dot, notch, T-mark or corner chamfer marks the cathode — <b>but it varies by manufacturer, so check the datasheet</b>.</li>
<li>Diode-test mode on a meter will often light the LED dimly when correct.</li></ul>
<h3>Others</h3>
<p>RGB LEDs (3 LEDs, common anode or cathode), addressable LEDs (WS2812 — have a built-in chip), 7-segment displays.</p>` },
 ]});

Q('d1','Current flows through a diode from…',['Anode to cathode','Cathode to anode','Either way','Gate to source'],'Conventional current flows anode → cathode.');
Q('d1','The band on a diode marks the…',['Cathode','Anode','Gate','Positive'],'Band = cathode.');
Q('d1','Typical silicon diode forward voltage is…',['0.6–0.7 V','0.2 V','2 V','5 V'],'Silicon PN junction ≈ 0.6–0.7 V.');
Q('d1','In diode-test mode, a good silicon diode forward reads about…',['0.5–0.7 V','0 V','OL','3 V'],'Reverse should read OL.');
Q('d1','A diode reading near 0 V both ways is…',['Shorted','Open','Good','A Schottky'],'Low both directions = failed short.');
Q('d1','A diode is made from a junction of…',['P-type and N-type semiconductor','Two metals','Copper and ceramic','Carbon and silicon dioxide'],'The PN junction.');
Q('d2','A full-wave bridge rectifier uses how many diodes?',['4','2','1','6'],'Four diodes in a diamond.');
Q('d2','Output of a bridge rectifier loses about…',['1.4 V (2 × Vf)','0.7 V','0 V','3 V'],'Current passes through two diodes each half-cycle.');
Q('d2','1N4007 is a…',['1 A 1000 V rectifier diode','Zener diode','LED','Schottky'],'1N400x family, the 7 is 1000 V.');
Q('d2','The remaining wobble after smoothing is called…',['Ripple','Noise floor','Hum','Drift'],'Ripple voltage.');
Q('d2','A flyback diode across a relay coil is fitted with its cathode to…',['The positive supply side','Ground','Either way','The contacts'],'It is reverse biased normally, conducting only on the spike.');
Q('d2','1N4148 is a…',['Small fast signal diode','Power rectifier','Zener','TVS'],'Glass-bodied small-signal diode.');
Q('d2','Bridge rectifier pins are marked…',['~ ~ + −','A K G S','1 2 3 4 only','IN OUT GND'],'Two AC inputs and DC outputs.');
Q('d3','A zener diode is used in…',['Reverse breakdown, to hold a fixed voltage','Forward bias as a rectifier','Light emission','Switching relays'],'Zeners regulate at their breakdown voltage.');
Q('d3','Main advantage of a Schottky diode is…',['Low forward voltage and fast switching','High reverse voltage','Light emission','Zero leakage'],'Vf ≈ 0.2–0.45 V.');
Q('d3','TVS diodes protect against…',['Voltage transients like ESD','Overcurrent only','Reverse polarity only','Low voltage'],'They clamp fast spikes.');
Q('d3','A bidirectional TVS…',['Has no polarity','Must have band to +','Is a zener','Only works on AC'],'It clamps in both directions.');
Q('d3','A zener must normally be used with…',['A series resistor','A parallel inductor','No other parts','A fuse in parallel'],'The resistor limits the zener current.');
Q('d3','A downside of Schottky diodes is…',['Higher reverse leakage','High forward voltage','Slow switching','They emit light'],'Leakage rises, especially when hot.');
Q('d4','On a THT LED, the longer leg is the…',['Anode (+)','Cathode (−)','Gate','Ground'],'Long leg = anode.');
Q('d4','A red LED has a forward voltage of about…',['2 V','0.7 V','3.3 V','5 V'],'Red ≈ 1.8–2.1 V.');
Q('d4','A blue or white LED has a forward voltage of about…',['3 V','2 V','1.2 V','5 V'],'Blue/white ≈ 2.8–3.4 V.');
Q('d4','LED resistor for 5 V, red LED (2 V), 15 mA?',['200 Ω → use 220 Ω','33 Ω','1 kΩ','2 kΩ'],'(5 − 2) / 0.015 = 200 Ω.');
Q('d4','The flat edge on an LED’s rim marks the…',['Cathode','Anode','Pin 1 of an IC','Colour'],'Flat = cathode.');
Q('d4','LED resistor for 12 V, white LED (3 V), 20 mA?',['450 Ω → use 470 Ω','600 Ω','150 Ω','1.2 kΩ'],'(12 − 3)/0.02 = 450 Ω; next standard up = 470 Ω.');
Q('d4','SMD LED cathode markings…',['Vary by manufacturer — check datasheet','Are always a green dot on anode','Are never present','Always red'],'Conventions vary!');

C('diodes','Diode direction','Current flows anode (+) → cathode (−). Band = cathode.');
C('diodes','Silicon diode Vf','≈ 0.6–0.7 V');
C('diodes','Schottky Vf','≈ 0.2–0.45 V, fast, more leakage');
C('diodes','Zener diode','Used in reverse breakdown to hold a fixed voltage. Needs series R.');
C('diodes','TVS diode','Transient voltage suppressor — clamps ESD/surges.');
C('diodes','1N4001–1N4007','1 A rectifier family, 50 V to 1000 V.');
C('diodes','1N4148','Small, fast signal diode (glass body).');
C('diodes','1N5819','1 A 40 V Schottky.');
C('diodes','Bridge rectifier','4 diodes → full-wave DC. Loses 2 × Vf.');
C('diodes','Flyback diode','Across relay/motor coil; absorbs back-EMF spike.');
C('diodes','Diode test reading','Forward ~0.5–0.7 V; reverse OL. Short = ~0 both ways.');
C('diodes','LED resistor formula','R = (Vsupply − Vf) / I');
C('diodes','LED Vf by colour','IR 1.2–1.5, Red ~2, Yellow ~2.1, Blue/White ~3–3.4 V');
C('diodes','LED long leg','Anode (+). Flat side = cathode.');
C('diodes','Ripple','Leftover AC wobble on a DC supply after smoothing.');
C('diodes','Photodiode','Generates current when light falls on it.');
C('diodes','Varactor','Diode whose capacitance varies with reverse voltage (tuning).');
C('diodes','Reverse polarity protection','Series diode (often Schottky) blocks backwards supply.');

/* ============================ MODULE 6: TRANSISTORS ============================ */
M.push({ id: 'transistors', title: 'Transistors', icon: '🔀', color: '#5ee0a0',
 blurb: 'BJTs and MOSFETs as switches and amplifiers, pinouts and packages.',
 lessons: [
 { id: 't1', title: 'What a transistor does', body: `
<p>A transistor is a semiconductor that uses a <b>small signal to control a bigger current</b>. It works as either a <b>switch</b> (on/off — digital) or an <b>amplifier</b> (making a signal bigger — analogue). Billions of them make up every processor.</p>
<p>Two main families:</p>
<ul><li><b>BJT</b> (Bipolar Junction Transistor) — <b>current</b>-controlled. Pins: <b>Base, Collector, Emitter</b>.</li>
<li><b>MOSFET</b> (Metal-Oxide-Semiconductor Field Effect Transistor) — <b>voltage</b>-controlled. Pins: <b>Gate, Drain, Source</b>.</li></ul>
<p>Designator: <b>Q</b> (sometimes T or M for FETs).</p>
<h3>Why switch with a transistor?</h3>
<p>A microcontroller pin can only supply ~10–20 mA. A transistor lets that pin switch a motor, relay, LED strip or heater that needs amps.</p>
<div class="tip">Think of it as a tap: a small turn of the handle (base/gate) controls a big flow of water (collector/drain current).</div>` },

 { id: 't2', title: 'BJTs: NPN and PNP', body: `
{{sym:npn}}
<h3>NPN</h3>
<p>Current into the <b>base</b> allows a much larger current from <b>collector to emitter</b>. The arrow is on the emitter pointing <b>out</b> ("<b>N</b>ot <b>P</b>ointing i<b>N</b>"). The emitter usually goes to ground — a <b>low-side switch</b>.</p>
<h3>PNP</h3>
<p>The opposite: emitter at the positive supply, pulling current <b>out</b> of the base turns it on. The arrow points <b>in</b> ("<b>P</b>ointing i<b>N P</b>roudly"). Used as a <b>high-side switch</b>.</p>
<h3>Gain</h3>
<p><b>h<sub>FE</sub> (β)</b> — current gain. I<sub>C</sub> = β × I<sub>B</sub>. Typically 100–300. A base current of 1 mA could control 100 mA+.</p>
<h3>Key voltages</h3>
<ul><li><b>V<sub>BE</sub></b> ≈ 0.7 V when on (it's a PN junction)</li>
<li><b>V<sub>CE(sat)</sub></b> ≈ 0.1–0.3 V when fully on (saturated)</li></ul>
<p>Always use a <b>base resistor</b> to limit base current (e.g. 1 k–10 k from a microcontroller pin).</p>
<h3>Common parts</h3>
<p><b>BC547 / BC557</b> (NPN/PNP, TO-92), <b>2N3904 / 2N3906</b>, <b>MMBT3904</b> and <b>BC847/BC857</b> (SOT-23 versions), <b>TIP120</b> (Darlington, TO-220).</p>
<p>A <b>Darlington</b> pair is two transistors combined for very high gain.</p>` },

 { id: 't3', title: 'MOSFETs', body: `
{{sym:nmos}}
<p>MOSFETs are controlled by the <b>voltage</b> between gate and source (V<sub>GS</sub>). The gate is insulated, so almost <b>no current flows into it</b> once charged — perfect for driving from logic.</p>
<h3>N-channel</h3>
<p>Positive V<sub>GS</sub> turns it on, current flows drain → source. Source to ground — low-side switch. The most common power switch.</p>
<h3>P-channel</h3>
<p>Source at the supply; pulling the gate <b>below</b> the source turns it on. High-side switch, reverse polarity protection.</p>
<h3>Key specs</h3>
<ul><li><b>V<sub>GS(th)</sub></b> — threshold voltage where it <i>starts</i> to turn on. Not fully on there!</li>
<li><b>R<sub>DS(on)</sub></b> — resistance when fully on. Lower = less heat (milliohms in good parts).</li>
<li><b>V<sub>DS</sub></b> max, <b>I<sub>D</sub></b> max.</li>
<li><b>Logic-level</b> MOSFETs are fully on at 3.3–5 V gate drive; standard ones need ~10 V.</li></ul>
<h3>Body diode</h3>
<p>Every power MOSFET has an internal diode from source to drain (for N-channel). It's shown in the symbol.</p>
<h3>ESD sensitivity</h3>
<p>The thin gate oxide is <b>very easily destroyed by static</b>. A floating gate can also turn on randomly — that's why a <b>gate pull-down resistor</b> (e.g. 10 k–100 k) is used.</p>
<p>Common parts: <b>2N7002</b> and <b>BSS138</b> (small N, SOT-23), <b>AO3401</b> (P, SOT-23), <b>IRLZ44N</b> (logic-level N, TO-220).</p>` },

 { id: 't4', title: 'Packages and pinouts', body: `
<h3>Through-hole</h3>
<ul><li><b>TO-92</b> — small black half-cylinder with 3 legs. BC547: C-B-E with flat face towards you (but it varies — always check!).</li>
<li><b>TO-220</b> — rectangular body with metal tab and mounting hole for a heatsink. MOSFETs usually G-D-S; the <b>tab is usually connected to the middle pin</b> (drain/collector) — so it may be live!</li>
<li><b>TO-247</b> — bigger power version.</li></ul>
<h3>Surface mount</h3>
<ul><li><b>SOT-23</b> — tiny 3-pin package, 2 pins one side, 1 on the other. Typical BJT: 1=B, 2=E, 3=C. MOSFET: 1=G, 2=S, 3=D.</li>
<li><b>SOT-223</b> — 3 pins + a big tab (often regulators).</li>
<li><b>DPAK (TO-252)</b> / <b>D²PAK (TO-263)</b> — power packages, tab soldered to the PCB as a heatsink.</li>
<li><b>SOIC-8 / PowerPAK / DFN</b> — power MOSFETs in IC-like packages.</li></ul>
<div class="tip"><b>Never assume a pinout.</b> The same package can have different pin orders between manufacturers. The datasheet and the PCB footprint are the truth.</div>
<h3>Marking codes</h3>
<p>SOT-23 parts have short codes like "1AM" (MMBT3904) or "702" (2N7002) — search "SMD marking code" to identify them.</p>
<h3>Heat</h3>
<p>Power = I² × R<sub>DS(on)</sub> for a MOSFET, or V<sub>CE</sub> × I<sub>C</sub> for a BJT. Thermal pads and heatsinks carry this away; <b>thermal paste or pads</b> must be applied correctly on assembly.</p>` },
 ]});

Q('t1','The three pins of a BJT are…',['Base, Collector, Emitter','Gate, Drain, Source','Anode, Cathode, Gate','Input, Output, Ground'],'BJT = B, C, E.');
Q('t1','The three pins of a MOSFET are…',['Gate, Drain, Source','Base, Collector, Emitter','Anode, Cathode, Gate','VCC, GND, OUT'],'MOSFET = G, D, S.');
Q('t1','A BJT is controlled by…',['Current into the base','Voltage on the gate only','Light','Magnetic field'],'BJTs are current-controlled.');
Q('t1','A MOSFET is controlled by…',['Gate-source voltage','Base current','Drain current','Temperature'],'MOSFETs are voltage-controlled.');
Q('t1','Transistor designator is usually…',['Q','T only','X','U'],'Q1, Q2…');
Q('t1','The two main uses of a transistor are…',['Switch and amplifier','Fuse and filter','Rectifier and regulator','Storage and timing'],'Digital switching or analogue amplification.');
Q('t2','The arrow on an NPN transistor symbol…',['Points out on the emitter','Points in on the emitter','Is on the base','Is on the collector'],'"Not Pointing iN".');
Q('t2','An NPN is usually used as a…',['Low-side switch','High-side switch','Rectifier','Voltage reference'],'Emitter to ground.');
Q('t2','BJT current gain is called…',['hFE (β)','RDS(on)','VGS(th)','ppm'],'IC = β × IB.');
Q('t2','VBE of a conducting silicon BJT is about…',['0.7 V','0.1 V','3.3 V','5 V'],'It’s a PN junction.');
Q('t2','BC547 and BC557 are…',['NPN and PNP small-signal BJTs','MOSFETs','Regulators','Diodes'],'BC547 NPN, BC557 PNP.');
Q('t2','Why use a base resistor?',['To limit base current','To increase gain','To reverse polarity','To stop oscillation only'],'Without it the base-emitter junction is a diode straight across the drive.');
Q('t2','With β = 100 and IB = 1 mA, the max IC is about…',['100 mA','1 mA','10 mA','1 A'],'IC = β × IB.');
Q('t3','RDS(on) is…',['Drain–source resistance when fully on','Threshold voltage','Gate charge','Max drain current'],'Lower RDS(on) = less heat.');
Q('t3','VGS(th) is the voltage where a MOSFET…',['Just starts to turn on','Is fully on','Breaks down','Turns off'],'Threshold is the start, not fully enhanced.');
Q('t3','A logic-level MOSFET is…',['Fully on with 3.3–5 V gate drive','Only for logic signals','A P-channel type','Needs 10 V+'],'Designed for MCU drive.');
Q('t3','Why add a gate pull-down resistor?',['Stops a floating gate turning on randomly','Increase speed','Reduce RDS(on)','Protect from overcurrent'],'Keeps the FET off when the driver is undefined.');
Q('t3','MOSFETs are especially sensitive to…',['ESD on the gate','Light','Magnetic fields','Humidity only'],'The thin gate oxide is easily punctured.');
Q('t3','2N7002 is a…',['Small N-channel MOSFET','PNP BJT','Zener','Voltage regulator'],'SOT-23 N-FET.');
Q('t3','A P-channel MOSFET is typically a…',['High-side switch','Low-side switch','Rectifier','Clock source'],'Source to supply, gate pulled low to turn on.');
Q('t3','Power lost in a MOSFET switch ≈',['I² × RDS(on)','V × RDS(on)','VGS × ID','I ÷ RDS(on)'],'Conduction loss = I²R.');
Q('t4','On most TO-220 MOSFETs, the metal tab connects to…',['The drain (middle pin)','The gate','The source','Nothing'],'Tab = middle pin; can be live!');
Q('t4','SOT-23 is…',['A tiny 3-pin SMD package','A large power package','An 8-pin IC','A BGA'],'2 pins one side, 1 the other.');
Q('t4','Golden rule for transistor pinouts:',['Always check the datasheet','All TO-92s are E-B-C','All SOT-23s are G-S-D','Pin 1 is always the gate'],'Pinouts vary between makers.');
Q('t4','DPAK and D²PAK packages dissipate heat through…',['A tab soldered to the PCB','A screw-on heatsink only','The leads only','Air vents'],'The tab is soldered to a copper pad.');
Q('t4','TO-92 is…',['A small 3-leg THT package','An SMD power package','A crystal can','A diode package'],'Half-cylinder black plastic.');
Q('t4','SOT-223 has…',['3 pins plus a large tab','8 pins','2 pins','A ball grid'],'Common for LDO regulators.');

C('transistors','BJT pins','Base, Collector, Emitter. Current-controlled.');
C('transistors','MOSFET pins','Gate, Drain, Source. Voltage-controlled.');
C('transistors','NPN arrow','Points OUT of emitter ("Not Pointing iN"). Low-side switch.');
C('transistors','PNP arrow','Points IN ("Pointing iN Proudly"). High-side switch.');
C('transistors','hFE / β','BJT current gain. IC = β × IB.');
C('transistors','VBE','≈ 0.7 V when a silicon BJT is on.');
C('transistors','VCE(sat)','≈ 0.1–0.3 V, BJT fully on.');
C('transistors','RDS(on)','MOSFET on-resistance. Loss = I² × RDS(on).');
C('transistors','VGS(th)','Gate threshold — where a MOSFET STARTS to turn on.');
C('transistors','Logic-level MOSFET','Fully on at 3.3–5 V gate drive.');
C('transistors','Gate pull-down','10–100 kΩ gate-source; keeps MOSFET off when floating.');
C('transistors','Body diode','Internal diode in power MOSFETs (source→drain in N-ch).');
C('transistors','Darlington','Two BJTs cascaded for very high gain (e.g. TIP120).');
C('transistors','TO-220 tab','Usually connected to middle pin (drain/collector) — can be live.');
C('transistors','SOT-23 MOSFET typical pins','1 Gate, 2 Source, 3 Drain (check datasheet!)');
C('transistors','SOT-23 BJT typical pins','1 Base, 2 Emitter, 3 Collector (check datasheet!)');
C('transistors','2N7002 / BSS138','Small N-channel MOSFETs (SOT-23).');
C('transistors','BC547 / BC557','NPN / PNP general-purpose BJTs (TO-92).');
C('transistors','Low-side vs high-side switch','Low-side switches the ground side (N-type); high-side switches the supply (P-type).');

/* ============================ MODULE 7: ICs & REGULATORS ============================ */
M.push({ id: 'ics', title: 'ICs, Regulators & Op-amps', icon: '🔲', color: '#7aa2ff',
 blurb: 'Integrated circuits, pin 1, power regulation, op-amps, MCUs and the 555.',
 lessons: [
 { id: 'ic1', title: 'Integrated circuits and pin 1', body: `
<p>An <b>Integrated Circuit (IC)</b> is a complete circuit — from a few transistors to billions — built on a single silicon <b>die</b> and sealed in a package. Designator: <b>U</b> (sometimes IC).</p>
<h3>Finding pin 1</h3>
<p>Getting IC orientation wrong is one of the most common and costly assembly faults. Pin 1 is shown by:</p>
<ul><li>A <b>dot</b> or dimple on the package top</li>
<li>A <b>notch</b> at one end (DIP) — pin 1 is to the left of the notch when the notch is at the top</li>
<li>A <b>bevelled edge</b> along the pin 1 side (SOIC)</li>
<li>A <b>chamfered corner</b> or triangle marker (QFN/BGA)</li></ul>
<p>On the PCB: a dot, a "1", a square pad, or a chamfered corner in the silkscreen outline.</p>
<h3>Pin numbering</h3>
<p>Pins are numbered <b>anticlockwise</b> viewed from the top, starting at pin 1. On a DIP-8, pins 1–4 down the left side, 5–8 back up the right.</p>
<p>BGAs use a <b>grid</b>: rows are letters (A, B, C… skipping I, O, Q, S, X, Z), columns are numbers. Ball A1 is the pin 1 corner.</p>
<div class="job"><b>On the line:</b> after placement or rework, always check the pin 1 dot lines up with the board marker. A reversed IC can short its supply and die the moment power is applied.</div>` },

 { id: 'ic2', title: 'Voltage regulators', body: `
<p>Regulators provide a steady supply voltage regardless of input or load changes.</p>
<h3>Linear regulators</h3>
<p>Act like an automatically adjusted resistor, burning off excess voltage as <b>heat</b>.</p>
<div class="formula">P<sub>heat</sub> = (V<sub>in</sub> − V<sub>out</sub>) × I</div>
<div class="ex">12 V → 5 V at 0.5 A: (12 − 5) × 0.5 = <b>3.5 W</b> of heat — needs a heatsink!</div>
<ul><li><b>78xx</b> series — 7805 = +5 V, 7812 = +12 V. TO-220: Input, Ground, Output. Needs ~2 V headroom.</li>
<li><b>79xx</b> — negative versions (different pin order!).</li>
<li><b>LDO</b> (Low Drop-Out) — works with much less headroom (0.1–0.5 V). E.g. AMS1117-3.3, MCP1700. Common in SOT-223 and SOT-23-5.</li>
<li><b>LM317</b> — adjustable, set by two resistors.</li></ul>
<p>They need input and output capacitors — some LDOs are unstable without the right output cap ESR.</p>
<h3>Switching regulators (SMPS)</h3>
<p>Switch on and off very fast (100 kHz–several MHz) and use an <b>inductor</b> and capacitors to transfer energy — <b>85–95% efficient</b>, so little heat.</p>
<ul><li><b>Buck</b> — steps down (12 V → 3.3 V)</li><li><b>Boost</b> — steps up (3.7 V battery → 5 V)</li><li><b>Buck-boost</b> — either</li></ul>
<p>Spot them by the IC + inductor + diode (or internal switch) + capacitor group. Downside: electrical noise; layout matters a lot.</p>
<h3>Voltage references</h3>
<p>Precise reference voltages for ADCs, e.g. TL431 (adjustable shunt reference).</p>` },

 { id: 'ic3', title: 'Op-amps and comparators', body: `
{{sym:opamp}}
<p>An <b>operational amplifier</b> is a high-gain differential amplifier with two inputs — <b>non-inverting (+)</b> and <b>inverting (−)</b> — and one output. It amplifies the difference between them.</p>
<h3>The golden rules (with negative feedback)</h3>
<ul><li>The output does whatever it takes to make the <b>two inputs equal</b>.</li><li>The inputs draw <b>no current</b>.</li></ul>
<h3>Common circuits</h3>
<ul><li><b>Non-inverting amplifier</b> — gain = 1 + R<sub>f</sub>/R<sub>g</sub></li>
<li><b>Inverting amplifier</b> — gain = −R<sub>f</sub>/R<sub>in</sub></li>
<li><b>Voltage follower / buffer</b> — gain of 1, isolates a weak signal source</li>
<li><b>Filters, integrators, summing amps</b></li></ul>
<h3>Comparators</h3>
<p>Compare two voltages and give a digital-like output: high if + &gt; −, low otherwise. Used for threshold detection (battery low, over-temperature). LM393 is a classic dual comparator; LM358 and TL072 are classic dual op-amps (all SOIC-8/DIP-8).</p>
<h3>Rail-to-rail</h3>
<p>Older op-amps can't swing their output all the way to the supply rails. "Rail-to-rail" types can — important at low voltages like 3.3 V.</p>
<div class="tip">Dual op-amps in 8-pin packages almost always use the same pinout: 1 = out A, 2 = −in A, 3 = +in A, 4 = V−, 5 = +in B, 6 = −in B, 7 = out B, 8 = V+.</div>` },

 { id: 'ic4', title: 'Microcontrollers, memory and the 555', body: `
<h3>Microcontrollers (MCUs)</h3>
<p>A small computer on one chip: CPU, flash memory (program), RAM, and peripherals like timers, ADCs, UART, SPI, I²C and GPIO pins. Examples: <b>ATmega328</b> (Arduino Uno), <b>STM32</b>, <b>ESP32</b> (with WiFi), <b>PIC</b>, <b>RP2040</b>.</p>
<p>They need: a stable supply with decoupling caps, a clock (internal or crystal), a reset circuit, and a <b>programming/debug header</b> (SWD, JTAG, ISP, UART). Boards are often programmed at end-of-line test.</p>
<h3>Communication buses</h3>
<ul><li><b>UART</b> — TX/RX serial, asynchronous</li><li><b>I²C</b> — 2 wires (SDA, SCL) with pull-up resistors, many devices on one bus by address</li><li><b>SPI</b> — 4 wires (MOSI, MISO, SCK, CS), fast</li><li><b>CAN</b> — robust differential bus, used in cars (CAN-H, CAN-L)</li><li><b>USB</b> — D+ and D− differential pair</li></ul>
<h3>Memory</h3>
<ul><li><b>EEPROM</b> — small, byte-rewritable, keeps data without power (settings, serial numbers)</li><li><b>Flash</b> — larger non-volatile storage</li><li><b>SRAM/DRAM</b> — fast, loses data without power</li></ul>
<h3>The 555 timer</h3>
<p>A classic 8-pin chip that makes timing pulses (<b>monostable</b>) or continuous square waves (<b>astable</b>), set by resistors and a capacitor. Pins: 1 GND, 2 Trigger, 3 Output, 4 Reset, 5 Control, 6 Threshold, 7 Discharge, 8 VCC.</p>
<h3>Other common ICs</h3>
<p>Motor drivers, gate drivers, MOSFET drivers, opto-isolators (optocouplers — light gives isolation between circuits), level shifters, ADCs/DACs, sensor ICs, PMICs.</p>` },
 ]});

Q('ic1','IC designator is usually…',['U','IC only','Q','D'],'U1, U2…');
Q('ic1','IC pins are numbered…',['Anticlockwise from pin 1 viewed from the top','Clockwise from the notch','Left to right only','Randomly'],'Anticlockwise from the top.');
Q('ic1','Which is NOT a pin 1 indicator?',['A fiducial','A dot','A notch','A bevelled edge'],'Fiducials are PCB alignment marks.');
Q('ic1','On a BGA, the pin 1 ball is called…',['A1','1A','P1','00'],'Rows are letters, columns numbers.');
Q('ic1','On a DIP-8, pin 8 is…',['Opposite pin 1, top right','Next to pin 1','Bottom left','The centre'],'1–4 down the left, 5–8 up the right.');
Q('ic1','What can happen if an IC is fitted rotated 180°?',['Supply shorted and the IC destroyed at power-up','Nothing — ICs are symmetrical','It runs slower','It runs in reverse'],'Power pins land in the wrong place.');
Q('ic1','BGA row letters skip…',['I, O, Q, S, X, Z','A, B, C','Vowels only','Nothing'],'To avoid confusion with numbers.');
Q('ic2','A 7805 regulator outputs…',['+5 V','−5 V','7.8 V','0.5 V'],'78xx positive; 05 = 5 V.');
Q('ic2','A linear regulator dropping 12 V to 5 V at 0.5 A wastes…',['3.5 W','6 W','2.5 W','0.35 W'],'(12 − 5) × 0.5 = 3.5 W.');
Q('ic2','LDO stands for…',['Low Drop-Out','Linear Direct Output','Low Distortion Oscillator','Load Disconnect Option'],'Works with small headroom.');
Q('ic2','A buck converter…',['Steps voltage down efficiently','Steps voltage up','Converts DC to AC','Is a linear regulator'],'Buck = down.');
Q('ic2','A boost converter…',['Steps voltage up','Steps voltage down','Is a rectifier','Is an LDO'],'Boost = up.');
Q('ic2','Typical switching regulator efficiency is…',['85–95%','20–30%','100%','50% always'],'Much better than linear for big drops.');
Q('ic2','TO-220 7805 pinout is…',['Input, Ground, Output','Output, Input, Ground','Ground, Input, Output','Adj, Out, In'],'I-G-O for 78xx.');
Q('ic2','A tell-tale sign of a switching regulator on a board is…',['An inductor next to the IC','A crystal','A large fuse','A relay'],'Inductor + caps around the IC.');
Q('ic2','LM317 is…',['An adjustable linear regulator','A 5 V fixed regulator','An op-amp','A buck converter'],'Output set by two resistors.');
Q('ic3','An op-amp amplifies…',['The difference between its inputs','Only the + input','Current only','The supply voltage'],'Differential amplifier.');
Q('ic3','With negative feedback, an op-amp output tries to…',['Make the two inputs equal','Go to 0 V','Maximise current','Oscillate'],'Golden rule #1.');
Q('ic3','Non-inverting amp gain is…',['1 + Rf/Rg','−Rf/Rin','Rf × Rg','1'],'Classic formula.');
Q('ic3','A voltage follower has a gain of…',['1','0','−1','Infinite'],'Buffer: output = input.');
Q('ic3','A comparator outputs…',['High or low depending which input is bigger','A smooth amplified signal','A clock','A fixed voltage'],'Digital-like decision.');
Q('ic3','LM358 is a…',['Dual op-amp','Voltage regulator','Timer','MOSFET'],'Classic dual op-amp.');
Q('ic3','Rail-to-rail means the output…',['Can swing close to both supply rails','Is always at a rail','Has two supplies','Is digital'],'Important at low voltages.');
Q('ic3','On a standard dual op-amp, pin 8 is…',['V+','Output A','V−','+in B'],'Pin 4 V−, pin 8 V+.');
Q('ic4','I²C uses which two lines?',['SDA and SCL','TX and RX','MOSI and MISO','D+ and D−'],'Data and clock, with pull-ups.');
Q('ic4','I²C lines need…',['Pull-up resistors','Series diodes','Ferrite beads only','Crystals'],'Open-drain bus.');
Q('ic4','Which memory keeps data without power and is byte-rewritable?',['EEPROM','SRAM','DRAM','Cache'],'Used for settings and serial numbers.');
Q('ic4','A 555 in astable mode produces…',['A continuous square wave','A single pulse','A sine wave','A fixed DC voltage'],'Monostable = single pulse.');
Q('ic4','Pin 8 on a 555 timer is…',['VCC','Ground','Output','Reset'],'Pin 1 GND, pin 8 VCC.');
Q('ic4','An optocoupler provides…',['Isolation between circuits using light','Amplification','Voltage regulation','Timing'],'LED + phototransistor in one package.');
Q('ic4','SPI typically uses…',['MOSI, MISO, SCK, CS','SDA, SCL','TX, RX','CAN-H, CAN-L'],'4-wire synchronous bus.');
Q('ic4','SWD and JTAG are used for…',['Programming and debugging MCUs','Power supply','Audio','Mains isolation'],'Debug interfaces.');
Q('ic4','CAN bus is common in…',['Cars','Mains wiring','Crystal circuits','LED strips'],'Robust automotive bus.');

C('ics','IC designator','U (U1, U2…)');
C('ics','Pin 1 indicators','Dot, notch, bevelled edge, chamfered corner, triangle.');
C('ics','IC pin numbering','Anticlockwise viewed from the top, starting at pin 1.');
C('ics','BGA pin naming','Row letter + column number. A1 = pin 1 corner. Skips I O Q S X Z.');
C('ics','Linear regulator heat','P = (Vin − Vout) × I');
C('ics','78xx / 79xx','Fixed positive / negative linear regulators (7805 = +5 V).');
C('ics','7805 TO-220 pins','Input, Ground, Output');
C('ics','LDO','Low Drop-Out regulator — needs only ~0.1–0.5 V headroom.');
C('ics','AMS1117-3.3','Common 3.3 V LDO in SOT-223.');
C('ics','Buck converter','Switching regulator that steps DOWN.');
C('ics','Boost converter','Switching regulator that steps UP.');
C('ics','SMPS efficiency','~85–95% vs linear (Vout/Vin).');
C('ics','Op-amp golden rules','With feedback: inputs equal; no input current.');
C('ics','Non-inverting gain','1 + Rf/Rg');
C('ics','Inverting gain','−Rf/Rin');
C('ics','Voltage follower','Op-amp buffer, gain = 1.');
C('ics','Comparator','Output high if V+ > V−, else low. e.g. LM393.');
C('ics','Dual op-amp pinout','1 OutA, 2 −A, 3 +A, 4 V−, 5 +B, 6 −B, 7 OutB, 8 V+');
C('ics','555 pins','1 GND 2 TRIG 3 OUT 4 RESET 5 CTRL 6 THRESH 7 DISCH 8 VCC');
C('ics','555 modes','Astable = square wave; Monostable = one pulse.');
C('ics','Microcontroller','CPU + flash + RAM + peripherals on one chip.');
C('ics','UART','TX/RX async serial.');
C('ics','I²C','SDA + SCL, needs pull-ups, addressed devices.');
C('ics','SPI','MOSI, MISO, SCK, CS — fast 4-wire bus.');
C('ics','EEPROM','Non-volatile, byte-rewritable memory.');
C('ics','Optocoupler','LED + photodetector — gives galvanic isolation.');
C('ics','SWD / JTAG','Programming/debug interfaces for MCUs.');

/* ============================ MODULE 8: DIGITAL LOGIC ============================ */
M.push({ id: 'logic', title: 'Digital Logic', icon: '🧮', color: '#f78fb3',
 blurb: 'Binary, logic gates, truth tables, logic levels and hex.',
 lessons: [
 { id: 'lg1', title: 'Binary and logic levels', body: `
<p>Digital circuits only care about two states: <b>HIGH (1)</b> and <b>LOW (0)</b>.</p>
<h3>Logic levels</h3>
<ul><li><b>5 V logic</b> (TTL/older CMOS) — 0 V = low, 5 V = high</li><li><b>3.3 V logic</b> — most modern MCUs</li><li><b>1.8 V / 1.2 V</b> — modern processors and memory</li></ul>
<p>There are thresholds: an input must be below V<sub>IL</sub> to count as low and above V<sub>IH</sub> to count as high. In between is undefined. Connecting 5 V outputs to 3.3 V inputs can damage them — use a <b>level shifter</b> unless the input is "5 V tolerant".</p>
<h3>Floating inputs</h3>
<p>An unconnected CMOS input "floats" and randomly reads high or low (and can draw extra current). Always tie unused inputs with a <b>pull-up or pull-down</b> resistor.</p>
<h3>Binary numbers</h3>
<p>Each digit (bit) is worth double the one to its right: 128, 64, 32, 16, 8, 4, 2, 1.</p>
<div class="ex">1011 = 8 + 0 + 2 + 1 = <b>11</b>. 11111111 = 255 (one byte max).</div>
<h3>Hexadecimal</h3>
<p>Base 16: 0–9 then A=10, B=11, C=12, D=13, E=14, F=15. One hex digit = 4 bits. <b>0xFF</b> = 255, <b>0x10</b> = 16, <b>0x7F</b> = 127. Used for addresses, register values, I²C addresses (e.g. 0x48).</p>
<p>8 bits = 1 byte. 4 bits = 1 nibble.</p>` },

 { id: 'lg2', title: 'Logic gates', body: `
<p>Gates take one or more inputs and give an output following a fixed rule — the <b>truth table</b>.</p>
<table class="tbl"><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr></table>
<ul><li><b>NOT</b> (inverter) — flips the input. Shown by a small circle (bubble).</li>
<li><b>AND</b> — 1 only if <i>all</i> inputs are 1.</li>
<li><b>OR</b> — 1 if <i>any</i> input is 1.</li>
<li><b>NAND</b> — NOT-AND: 0 only when all inputs are 1.</li>
<li><b>NOR</b> — NOT-OR: 1 only when all inputs are 0.</li>
<li><b>XOR</b> — 1 when the inputs are <i>different</i>.</li>
<li><b>XNOR</b> — 1 when the inputs are the <i>same</i>.</li></ul>
<div class="tip">NAND and NOR are "universal" — you can build any other gate from just NANDs.</div>
<h3>Chips</h3>
<p>74-series logic: <b>74HC00</b> (quad NAND), <b>74HC04</b> (hex inverter), <b>74HC08</b> (quad AND), <b>74HC32</b> (quad OR), <b>74HC86</b> (quad XOR). Many modern boards use single-gate parts in SOT-23-5 (74LVC1G…).</p>` },

 { id: 'lg3', title: 'Flip-flops, counters and signals', body: `
<h3>Sequential logic</h3>
<p>Gates give an output based only on current inputs. <b>Sequential</b> logic also remembers past states.</p>
<ul><li><b>Flip-flop</b> — stores one bit. A <b>D flip-flop</b> copies D to Q on the clock's rising edge.</li>
<li><b>Register</b> — a group of flip-flops storing a byte or word.</li>
<li><b>Shift register</b> — moves bits along one per clock (74HC595 — expand outputs with 3 pins).</li>
<li><b>Counter</b> — counts clock pulses.</li></ul>
<h3>Digital signal terms</h3>
<ul><li><b>Clock</b> — regular square wave that keeps everything in step</li>
<li><b>Rising / falling edge</b> — low-to-high / high-to-low transitions</li>
<li><b>Duty cycle</b> — % of time the signal is high. 50% = square wave.</li>
<li><b>PWM</b> — Pulse Width Modulation: varying duty cycle to control LED brightness or motor speed</li>
<li><b>Active low</b> — a signal that does its job when LOW, shown with a bar over the name, a # or "n" prefix: <span style="text-decoration:overline">RESET</span>, CS#, nRST</li>
<li><b>Open-drain / open-collector</b> — output can only pull low; needs a pull-up resistor (I²C uses this)</li>
<li><b>Tri-state</b> — output can be high, low or disconnected (high impedance)</li></ul>
<h3>Debouncing</h3>
<p>Mechanical buttons "bounce" — their contacts make and break many times in a few milliseconds. An RC filter, a Schmitt trigger input, or software fixes this.</p>` },
 ]});

Q('lg1','Binary 1011 equals…',['11','13','9','1011'],'8 + 2 + 1 = 11.');
Q('lg1','0xFF in decimal is…',['255','256','100','15'],'F = 15; 15×16 + 15 = 255.');
Q('lg1','0x10 equals…',['16','10','2','32'],'1 × 16 + 0.');
Q('lg1','One hex digit represents…',['4 bits','8 bits','2 bits','1 byte'],'A nibble.');
Q('lg1','A floating CMOS input…',['Reads randomly — tie with a pull resistor','Always reads 0','Always reads 1','Is fine to leave'],'Undefined state + extra current.');
Q('lg1','Connecting a 5 V output to a 3.3 V-only input may…',['Damage it — use a level shifter','Work fine always','Make it faster','Reduce noise'],'Unless the input is 5 V tolerant.');
Q('lg1','The biggest value in one byte is…',['255','256','128','1024'],'8 bits all 1.');
Q('lg1','Binary 10000000 is…',['128','64','256','100'],'The top bit of a byte is worth 128.');
Q('lg2','An AND gate outputs 1 when…',['All inputs are 1','Any input is 1','Inputs differ','All inputs are 0'],'AND = all.');
Q('lg2','An OR gate outputs 1 when…',['Any input is 1','All inputs are 1','Inputs differ','Never'],'OR = any.');
Q('lg2','XOR outputs 1 when…',['The inputs are different','Both are 1','Both are 0','Always'],'Exclusive OR.');
Q('lg2','NAND output with inputs 1 and 1 is…',['0','1','Undefined','Toggles'],'AND gives 1, inverted to 0.');
Q('lg2','NOR output with inputs 0 and 0 is…',['1','0','Undefined','Toggles'],'OR gives 0, inverted to 1.');
Q('lg2','A small circle (bubble) on a gate symbol means…',['Inversion (NOT)','Clock input','Ground','Power'],'Bubble = invert.');
Q('lg2','Which gates are "universal"?',['NAND and NOR','AND and OR','XOR and XNOR','NOT only'],'Any logic can be made from either.');
Q('lg2','74HC04 contains…',['Six inverters','Four NAND gates','Four OR gates','A flip-flop'],'Hex inverter.');
Q('lg2','XNOR outputs 1 when…',['The inputs are the same','The inputs differ','Both are 0 only','Never'],'Equality detector.');
Q('lg3','A D flip-flop…',['Copies D to Q on the clock edge','Inverts its input','Counts to 10','Is an analogue amplifier'],'Stores one bit.');
Q('lg3','PWM is used to…',['Control LED brightness or motor speed','Convert AC to DC','Store data','Measure resistance'],'Varying the duty cycle varies average power.');
Q('lg3','A 25% duty cycle means the signal is high…',['A quarter of the time','Three-quarters','Half','Never'],'Duty = high time ÷ period.');
Q('lg3','A signal named nRST or with a bar over it is…',['Active low','Active high','A clock','Analogue'],'It does its job when LOW.');
Q('lg3','An open-drain output needs…',['A pull-up resistor','A series capacitor','A crystal','Nothing'],'It can only pull low.');
Q('lg3','Switch bounce is fixed with…',['Debouncing (RC, Schmitt trigger or software)','A bigger fuse','A ferrite','A heatsink'],'Contacts chatter for a few ms.');
Q('lg3','74HC595 is a…',['Shift register','Voltage regulator','Op-amp','Timer'],'Serial-in, parallel-out.');
Q('lg3','Tri-state outputs can be…',['High, low or high-impedance','Only high','Only low','Analogue'],'The third state disconnects the output.');

C('logic','AND','1 only if ALL inputs are 1.');
C('logic','OR','1 if ANY input is 1.');
C('logic','NOT','Inverts: 1→0, 0→1. Bubble symbol.');
C('logic','NAND','0 only when all inputs are 1. Universal gate.');
C('logic','NOR','1 only when all inputs are 0. Universal gate.');
C('logic','XOR','1 when inputs are DIFFERENT.');
C('logic','XNOR','1 when inputs are the SAME.');
C('logic','Binary place values','128 64 32 16 8 4 2 1');
C('logic','Hex A–F','A10 B11 C12 D13 E14 F15');
C('logic','0xFF','255 (8 bits all set)');
C('logic','Nibble / Byte','4 bits / 8 bits');
C('logic','Floating input','Undefined — tie with pull-up/down.');
C('logic','Level shifter','Translates between logic voltages (e.g. 5 V ↔ 3.3 V).');
C('logic','D flip-flop','Copies D to Q on clock edge — stores 1 bit.');
C('logic','PWM','Pulse width modulation — duty cycle controls average power.');
C('logic','Duty cycle','% of each period the signal is high.');
C('logic','Active low','Signal acts when LOW — bar, #, or n prefix (nRST).');
C('logic','Open-drain','Can only pull low; needs pull-up (I²C).');
C('logic','Tri-state','High / Low / High-Z (disconnected).');
C('logic','Debouncing','Removing contact bounce from buttons.');
C('logic','74HC00 / 04 / 08 / 32 / 86','Quad NAND / hex NOT / quad AND / quad OR / quad XOR');
})();
