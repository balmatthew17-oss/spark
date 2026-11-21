// Spark content part 4: THT & soldering, Defects & IPC, ESD & safety, Test & measurement, Schematics
(function () {
const M = window.MODULES, QS = window.QUESTIONS, CS = window.CARDS;
const Q = (l, q, a, e) => QS.push({ l, q, a, e });
const C = (m, f, b) => CS.push({ m, f, b });

/* ============================ MODULE 11: THT & SOLDERING ============================ */
M.push({ id: 'tht', title: 'THT & Soldering', icon: '🔥', color: '#ff7a59',
 blurb: 'Through-hole assembly, hand soldering, wave and selective soldering, rework.',
 lessons: [
 { id: 'h1', title: 'Through-hole components', body: `
<p><b>Through-Hole Technology (THT)</b> parts have leads that pass through plated holes and are soldered on the other side. Stronger mechanically than SMT — still used for connectors, big capacitors, transformers, relays, power parts and anything that gets stressed.</p>
<h3>Lead styles</h3>
<ul><li><b>Axial</b> — leads out of each end (resistors, diodes). Bent and laid flat.</li>
<li><b>Radial</b> — both leads out of one end (electrolytics, LEDs, ceramic discs).</li>
<li><b>DIP</b> — dual in-line ICs, 2.54 mm pitch, 0.3" or 0.6" row spacing.</li>
<li><b>SIP</b> — single in-line (resistor networks, some regulators).</li></ul>
<h3>Lead forming</h3>
<ul><li>Bends should start at least <b>one lead diameter (or ~1 mm)</b> from the body — never bend right at the body or seal; it can crack the part.</li>
<li>Use proper forming tools, not just fingers or pliers that nick the leads.</li>
<li>Stress relief loops for heavy or hot parts.</li></ul>
<h3>Mounting</h3>
<ul><li>Parts sit flat on the board unless specified (stand-off for hot parts like power resistors to let air flow).</li>
<li>Markings readable and orientated consistently where possible.</li>
<li><b>Clinching</b> — bending leads over on the solder side to hold the part before soldering (fully or partially). Must not bridge to other pads.</li>
<li><b>Lead protrusion</b> after cutting: IPC typically requires the lead end to be <b>visible in the solder</b> and not exceed about 2.5 mm (class-dependent).</li></ul>
<p>Polarised THT parts: electrolytics (stripe −), diodes (band = cathode), LEDs (long leg +), ICs (notch/dot), connectors (pin 1 square pad).</p>` },

 { id: 'h2', title: 'Hand soldering technique', body: `
<h3>The basic method</h3>
<ol class="steps"><li><b>Clean</b> and tin the iron tip — a shiny tip transfers heat best.</li>
<li><b>Heat both</b> the pad and the lead together with the tip touching both.</li>
<li><b>Feed solder</b> into the joint (the lead/pad junction), <i>not</i> onto the iron tip.</li>
<li><b>Remove the solder</b>, then the iron — the whole thing takes about <b>2–4 seconds</b>.</li>
<li><b>Don't move</b> the part while the solder cools, or you get a disturbed joint.</li></ol>
<h3>Iron temperature</h3>
<ul><li>Leaded solder: around <b>315–340 °C</b>.</li><li>Lead-free: around <b>340–380 °C</b>.</li></ul>
<p>Hotter isn't better — it burns flux off faster, oxidises the tip and can lift pads. Use a bigger tip rather than more heat for large joints.</p>
<h3>Tips</h3>
<ul><li><b>Chisel</b> — general purpose, good heat transfer. <b>Conical</b> — fine work. <b>Hoof/bevel</b> — drag soldering fine-pitch ICs.</li>
<li>Clean on brass wool or a damp sponge; <b>re-tin before parking</b> the iron so the tip doesn't oxidise.</li></ul>
<h3>Flux</h3>
<p>Removes oxides and helps solder <b>wet</b> (flow and bond). Solder wire has flux cores; extra flux pens/gel help for rework. Types: <b>rosin</b>, <b>no-clean</b>, <b>water-soluble</b> (must be cleaned off, it's corrosive). Clean residue with IPA where required.</p>
<h3>A good joint</h3>
<p>Smooth, <b>concave fillet</b>, good wetting to both lead and pad (low contact angle), lead outline visible. Lead-free joints are naturally duller/grainier than leaded ones.</p>
<div class="job"><b>Safety:</b> use fume extraction — flux fumes are a respiratory sensitiser. Wash hands after handling leaded solder.</div>` },

 { id: 'h3', title: 'Wave and selective soldering', body: `
<h3>Wave soldering</h3>
<p>The board travels on a conveyor over a pumped <b>wave of molten solder</b>. Fast for boards full of THT parts.</p>
<ol class="steps"><li><b>Fluxer</b> — spray or foam flux on the underside.</li>
<li><b>Preheat</b> — evaporates flux solvents and reduces thermal shock (top-side ~100–130 °C).</li>
<li><b>Wave</b> — often a turbulent "chip wave" then a smooth "laminar wave". Solder pot ~250–265 °C for lead-free.</li>
<li><b>Cooling</b>.</li></ol>
<p>SMD parts on the bottom must be <b>glued</b> first (red SMT adhesive, cured in an oven) and orientated so the wave doesn't shadow joints. <b>Wave pallets</b> (fixtures) mask off areas that mustn't be soldered.</p>
<p>Common wave defects: <b>bridging</b> (especially at the trailing pins — "solder thieves" are pads added to fix this), <b>icicles</b>, <b>insufficient barrel fill</b>, <b>solder balls</b>, skips.</p>
<h3>Selective soldering</h3>
<p>A small <b>mini-wave nozzle</b> solders individual THT joints on a programmed path. Used on mixed boards where a full wave would damage bottom-side SMD parts. Slower but precise. Steps: drop-jet flux → preheat → nozzle solder.</p>
<h3>Hole fill</h3>
<p>For plated holes, IPC typically requires a minimum <b>vertical fill</b> of solder in the barrel (e.g. 75% for Class 2/3). Large ground connections need extra preheat to fill.</p>
<h3>Solder pot maintenance</h3>
<p>Remove <b>dross</b> (oxidised solder skin) regularly and check the pot's copper content — dissolved copper raises the melting point and causes defects.</p>` },

 { id: 'h4', title: 'Rework and repair', body: `
<h3>Desoldering tools</h3>
<ul><li><b>Solder wick (braid)</b> — copper braid soaked in flux that soaks up solder by capillary action. Press with the iron; don't drag hard or you lift pads.</li>
<li><b>Desoldering pump (solder sucker)</b> — spring-loaded vacuum.</li>
<li><b>Desoldering station</b> — heated hollow tip with vacuum, best for THT.</li>
<li><b>Hot air station</b> — for SMD parts, especially multi-lead ICs. Shield nearby parts (Kapton tape, foil).</li>
<li><b>Tweezer irons</b> — two heated tips to grip and lift chip parts.</li>
<li><b>BGA rework station</b> — controlled top and bottom heaters running a profile.</li></ul>
<h3>Rework tips</h3>
<ul><li><b>Add fresh solder/flux</b> before removing — old solder melts better when mixed with new.</li>
<li>Preheat big boards from underneath to reduce thermal shock and damage.</li>
<li>Don't reuse removed parts unless approved — they've been stressed.</li>
<li><b>Clean pads</b> flat with wick before placing a new part.</li>
<li>Limit heat cycles — each one stresses pads and the laminate.</li></ul>
<h3>Repair</h3>
<p>Lifted pads, broken tracks and damaged holes can be repaired to <b>IPC-7711/7721</b> (rework and repair standard) using jumper wires, replacement pads and epoxy — often only with customer approval.</p>
<h3>Rework vs repair</h3>
<p><b>Rework</b> brings the board back to the original spec (e.g. replacing a part). <b>Repair</b> restores function but differs from the original design (e.g. a jumper wire).</p>
<div class="job"><b>On the line:</b> always log rework against the board serial, and re-inspect after.</div>` },
 ]});

Q('h1','THT stands for…',['Through-Hole Technology','Thermal Heat Transfer','Thin Header Type','Tin-Hot Tinning'],'Leads go through holes.');
Q('h1','Axial components have leads…',['Out of each end','Both out of one end','Under the body','In a grid'],'E.g. resistors.');
Q('h1','Radial components have leads…',['Both out of one end','Out of each end','On four sides','None'],'E.g. electrolytics.');
Q('h1','Lead bends should start…',['At least ~1 lead diameter from the body','Right at the body','Inside the hole','Anywhere'],'Bending at the body can crack the seal.');
Q('h1','Clinching is…',['Bending leads on the solder side to hold the part','Cutting leads','Gluing parts','A type of crimp'],'Holds parts before soldering.');
Q('h1','Why stand hot power resistors off the board?',['To allow airflow and protect the PCB','To save space','For polarity','So AOI can see them'],'Heat can scorch the laminate.');
Q('h1','DIP ICs have a pin pitch of…',['2.54 mm','1.27 mm','0.5 mm','5 mm'],'0.1".');
Q('h2','When hand soldering, feed the solder…',['Into the joint, not onto the iron tip','Onto the iron tip','Before heating','After removing the iron'],'Heat the joint, let it melt the solder.');
Q('h2','A typical lead-free iron temperature is…',['340–380 °C','200–250 °C','450–500 °C','183 °C'],'Use the lowest temp that works.');
Q('h2','A typical hand solder joint takes about…',['2–4 seconds','20 seconds','0.5 seconds','1 minute'],'Long dwell damages pads.');
Q('h2','Why tin the tip before parking the iron?',['Prevents oxidation of the tip','Cools it','Saves solder','Keeps flux active'],'A tinned tip lasts longer.');
Q('h2','Flux’s job is to…',['Remove oxides and help solder wet','Add strength','Cool the joint','Conduct current'],'Clean surfaces wet better.');
Q('h2','A good solder fillet is…',['Smooth and concave with good wetting','Balled up and convex','Grainy and cracked','Covering the lead completely, no outline'],'Low contact angle.');
Q('h2','Moving a part while solder cools causes…',['A disturbed joint','A better joint','Tombstoning','A void'],'Looks rough and cracked.');
Q('h2','For a large joint that won’t heat, you should…',['Use a bigger tip','Crank up to max temperature','Use less flux','Hold the iron for a minute'],'Better heat transfer, not more heat.');
Q('h2','Water-soluble flux…',['Must be cleaned off — it is corrosive','Can always be left','Is the same as no-clean','Is only for SMT'],'Residues are active.');
Q('h3','Wave soldering steps are…',['Flux → Preheat → Wave → Cool','Wave → Flux → Preheat','Preheat → Wave → Flux','Print → Place → Reflow'],'Flux first.');
Q('h3','Bottom-side SMD parts going over a wave must be…',['Glued first','Placed after the wave','Taped over','Removed'],'Adhesive holds them in the wave.');
Q('h3','Solder thieves are pads added to reduce…',['Bridging on trailing pins','Voids','Tombstoning','Wicking'],'They pull excess solder away.');
Q('h3','Selective soldering uses…',['A small programmable mini-wave nozzle','A full-width wave','A reflow oven','A hot bar'],'Targets individual THT joints.');
Q('h3','Dross is…',['Oxidised solder skimmed from the pot','Flux residue','Burnt mask','Copper plating'],'Must be removed regularly.');
Q('h3','A wave pallet is used to…',['Mask off areas that mustn’t be soldered','Carry boards in the oven','Store paste','Hold reels'],'Fixture for selective protection.');
Q('h3','Dissolved copper building up in a solder pot causes…',['Higher melting point and defects','Lower melting point','Shinier joints','Nothing'],'Pot chemistry must be analysed.');
Q('h3','Insufficient barrel fill on a ground pin is often fixed by…',['More preheat','Less flux','A faster conveyor','Colder solder'],'Planes sink heat.');
Q('h4','Solder wick works by…',['Capillary action','Vacuum','Magnetism','Air pressure'],'Braid soaks up molten solder.');
Q('h4','Before desoldering an old joint, it often helps to…',['Add fresh solder and flux','Scrape it','Cool it','Apply tape'],'Fresh solder melts more easily.');
Q('h4','Rework differs from repair because rework…',['Restores the original spec','Uses jumper wires','Changes the design','Is never allowed'],'Repair deviates from the design.');
Q('h4','The IPC standard for rework and repair is…',['IPC-7711/7721','IPC-A-610','J-STD-001','IPC-2221'],'Procedures for rework/repair.');
Q('h4','Removing a QFP usually uses…',['A hot air station','A solder sucker','A wave','Wire cutters'],'Heat all leads at once.');
Q('h4','Dragging solder wick hard can…',['Lift pads','Improve wetting','Clean flux','Cool the board'],'Pads are fragile when hot.');
Q('h4','Why preheat a large board during rework?',['Reduce thermal shock and make heating easier','Dry the flux','Activate the mask','Faster cooling'],'Bottom heaters help.');

C('tht','THT','Through-Hole Technology — leads through plated holes.');
C('tht','Axial vs radial','Axial = leads each end. Radial = both leads one end.');
C('tht','Lead forming rule','Bend ≥ ~1 lead diameter from body; no nicks.');
C('tht','Clinching','Bending leads on the solder side to retain parts.');
C('tht','Lead protrusion','Lead end visible in solder; max ~2.5 mm (class-dependent).');
C('tht','Hand solder steps','Heat pad + lead → feed solder to joint → remove solder → remove iron. 2–4 s.');
C('tht','Iron temp: leaded / lead-free','~315–340 °C / ~340–380 °C');
C('tht','Tip care','Clean, re-tin before parking; brass wool > wet sponge.');
C('tht','Flux','Removes oxides, aids wetting. Rosin, no-clean, water-soluble.');
C('tht','Good joint','Smooth concave fillet, good wetting, lead outline visible.');
C('tht','Disturbed joint','Part moved while cooling — rough, cracked.');
C('tht','Wave solder process','Flux → Preheat → Wave (chip + laminar) → Cool');
C('tht','SMT adhesive','Glue (often red) holding bottom-side SMD parts for wave.');
C('tht','Solder thief','Extra pad at trailing end to prevent bridges.');
C('tht','Selective soldering','Programmable mini-wave for individual THT joints.');
C('tht','Dross','Oxidised solder on top of the pot — skim it.');
C('tht','Wave pallet','Fixture masking areas from the wave.');
C('tht','Hole fill','THT barrel solder fill — typically ≥75% (class 2/3).');
C('tht','Solder wick','Flux-soaked copper braid — soaks up solder.');
C('tht','Hot air rework','Removing/fitting multi-lead SMD parts. Shield neighbours.');
C('tht','IPC-7711/7721','Rework, modification and repair of electronic assemblies.');
C('tht','Rework vs repair','Rework = back to original spec. Repair = restores function, deviates from design.');
C('tht','J-STD-001','Requirements for soldered electrical assemblies (how to solder).');

/* ============================ MODULE 12: DEFECTS & IPC ============================ */
M.push({ id: 'quality', title: 'Defects & IPC Standards', icon: '🔍', color: '#ffd166',
 blurb: 'IPC classes, good joints, and every common solder defect and its cause.',
 lessons: [
 { id: 'q1', title: 'IPC standards and classes', body: `
<p><b>IPC</b> publishes the industry standards for electronics manufacturing. The big ones you'll hear:</p>
<ul><li><b>IPC-A-610</b> — <i>Acceptability of Electronic Assemblies</i>. The inspection bible — pictures of target, acceptable, process indicator and defect conditions.</li>
<li><b>J-STD-001</b> — <i>Requirements for Soldered Electrical and Electronic Assemblies</i>. How to make the joints (materials, methods).</li>
<li><b>IPC-7711/7721</b> — rework and repair.</li>
<li><b>IPC-A-600</b> — acceptability of bare printed boards.</li>
<li><b>IPC/WHMA-A-620</b> — cable and wire harness assemblies.</li>
<li><b>J-STD-020 / 033</b> — moisture sensitivity.</li></ul>
<h3>The three product classes</h3>
<ul><li><b>Class 1 — General electronics:</b> toys, cheap consumer goods. Just has to work.</li>
<li><b>Class 2 — Dedicated service:</b> computers, TVs, industrial, telecoms. Long life, uninterrupted service desired but not critical. Most common.</li>
<li><b>Class 3 — High performance / harsh environment:</b> medical life support, aerospace, military, automotive safety. Must work every time.</li></ul>
<p>Class 3 has the tightest criteria. The customer chooses the class in the contract.</p>
<h3>Condition categories</h3>
<ul><li><b>Target</b> — close to perfect.</li><li><b>Acceptable</b> — not perfect but reliable.</li><li><b>Process indicator</b> — not a defect, but shows the process needs attention.</li><li><b>Defect</b> — must be dispositioned (rework, repair, scrap or use-as-is with approval).</li></ul>
<p>Operators can be <b>certified</b> (CIS — Certified IPC Specialist) to these standards.</p>` },

 { id: 'q2', title: 'Bridging, opens and insufficient solder', body: `
<h3>Solder bridge (short)</h3>
<p>Solder joining two conductors that shouldn't be connected. Always a defect.</p>
<p><b>Causes:</b> too much paste, smeared print, misaligned stencil, poor under-stencil cleaning, paste slump, misplaced part, wave soldering trailing pins.</p>
<p><b>Fix:</b> flux and drag the iron, or use wick.</p>
<h3>Insufficient solder</h3>
<p>Not enough solder to form a proper fillet. <b>Causes:</b> blocked stencil apertures, low paste volume, wicking down vias, poor wetting.</p>
<h3>Open / dry joint / skip</h3>
<p>No solder connection at all. <b>Causes:</b> missing paste, lifted lead, coplanarity issue (one lead higher), part not seated, wave shadowing.</p>
<h3>Non-wetting and dewetting</h3>
<ul><li><b>Non-wetting</b> — solder doesn't stick to the surface at all; metal shows through. Caused by contamination or oxidised pads/leads (old parts, OSP aged).</li>
<li><b>Dewetting</b> — solder wetted then pulled back, leaving thin film and irregular mounds.</li></ul>
<h3>Lifted lead</h3>
<p>A gull-wing lead not touching its pad. Caused by bent leads (poor coplanarity), handling damage, or the part moving.</p>
<h3>Cold joint</h3>
<p>Dull, grainy, lumpy appearance, poor wetting — not enough heat. Weak and unreliable. (Remember lead-free is naturally a bit duller — look at wetting, not just shine.)</p>
<h3>Fractured / cracked joint</h3>
<p>Cracks through the solder from movement, thermal cycling or mechanical stress.</p>` },

 { id: 'q3', title: 'Tombstoning, billboarding and placement defects', body: `
<h3>Tombstoning (Manhattan effect, drawbridging)</h3>
<p>A chip part stands up on one end, like a gravestone. One end's solder melts and wets first, and its surface tension pulls the part upright before the other side melts.</p>
<p><b>Causes:</b> unequal pad sizes or thermal mass (one pad connected to a plane), uneven paste, misplacement, too fast a ramp, small light parts (0402/0201).</p>
<h3>Billboarding</h3>
<p>A chip part soldered on its <b>side</b> (edge-on) rather than flat. Usually a placement/feeder issue.</p>
<h3>Upside down / tombstone vs flipped</h3>
<p>A chip resistor placed <b>upside down</b> (white body showing, no marking). IPC accepts this for some classes, not others — check the criteria.</p>
<h3>Skew / offset / misalignment</h3>
<p>Part rotated or shifted off its pads. IPC sets limits on side overhang (e.g. up to 25–50% of the termination width depending on class).</p>
<h3>Wrong, missing, extra parts</h3>
<p>Wrong value (wrong reel), missing (mispick or knocked off), extra (dropped part). AOI catches most.</p>
<h3>Polarity / reversed part</h3>
<p>Diode, electrolytic, tantalum, IC, or LED fitted the wrong way. Often from a wrong rotation in the program or loading tape upside down.</p>
<h3>Damaged parts</h3>
<p>Cracked MLCCs (often invisible — show as short or open), chipped bodies, crushed leads, delaminated ICs.</p>` },

 { id: 'q4', title: 'Voids, solder balls and BGA defects', body: `
<h3>Solder balls</h3>
<p>Small spheres of solder scattered near joints. They can move and cause shorts later. <b>Causes:</b> moisture in paste (opened cold), too-fast ramp, paste printed off pad, excessive paste, spatter from flux.</p>
<h3>Mid-chip solder beads</h3>
<p>Larger balls sitting beside chip components, squeezed out from under the part. Fixed with home-plate/U-shaped stencil apertures.</p>
<h3>Voids</h3>
<p>Gas bubbles trapped inside a joint. Seen on X-ray. Small voids are normal; large ones reduce strength and heat transfer. IPC typically allows up to <b>25%</b> voiding of a BGA ball area. QFN thermal pads often use windowpane stencil designs to let gas escape.</p>
<h3>BGA defects</h3>
<ul><li><b>Head-in-pillow (HiP)</b> — the ball and the paste both melt but don't merge, looking like a head resting on a pillow. Caused by package warpage or oxidised balls. Very hard to detect — may pass test then fail in the field.</li>
<li><b>Bridging</b> between balls.</li>
<li><b>Opens / non-wet opens</b>.</li>
<li><b>Cold balls</b> — not reflowed fully.</li>
<li><b>Pad cratering</b> — the laminate under the pad fractures.</li></ul>
<h3>Other defects</h3>
<ul><li><b>Icicles / flags</b> — sharp solder points (often from wave).</li>
<li><b>Webbing / splashes</b> — thin solder films on the mask.</li>
<li><b>Blowholes / pinholes</b> — gas escaping from THT barrels (often moisture in the board).</li>
<li><b>Excess flux residue</b> — can cause leakage or corrosion if not no-clean.</li>
<li><b>Measling / delamination</b> — white spots or layers separating in the laminate from heat/moisture.</li>
<li><b>Tin whiskers</b> — tiny tin filaments that grow over time and can short.</li></ul>` },
 ]});

Q('q1','IPC-A-610 is the standard for…',['Acceptability of electronic assemblies','PCB design','Moisture sensitivity','Cable harnesses'],'The inspection standard.');
Q('q1','J-STD-001 covers…',['Requirements for soldered assemblies','Bare board acceptability','ESD control','Component packaging'],'How to solder correctly.');
Q('q1','IPC Class 3 is for…',['High-reliability: medical, aerospace, military','Toys','General consumer','Prototypes only'],'Must work every time.');
Q('q1','A computer or TV would usually be built to…',['Class 2','Class 1','Class 3','Class 0'],'Dedicated service electronics.');
Q('q1','A "process indicator" means…',['Not a defect, but the process needs attention','Must be scrapped','Perfect','Customer approval needed'],'Watch the trend.');
Q('q1','Who decides the IPC class of a product?',['The customer','The operator','The AOI machine','IPC'],'Specified in the contract.');
Q('q1','IPC/WHMA-A-620 covers…',['Cable and wire harnesses','Soldering irons','Reflow ovens','PCB laminates'],'Harness acceptability.');
Q('q2','A solder bridge is…',['Solder joining conductors that shouldn’t connect','A good joint','A via','Missing solder'],'Always a defect.');
Q('q2','Which commonly causes bridging?',['Excess or smeared paste','Too little paste','Correct stencil cleaning','Nitrogen'],'Too much solder in the gap.');
Q('q2','Non-wetting is usually caused by…',['Contaminated or oxidised surfaces','Too much flux','Nitrogen reflow','Correct temperature'],'Solder won’t bond.');
Q('q2','A cold joint looks…',['Dull, grainy and lumpy with poor wetting','Shiny and concave','Perfectly flat','Like a ball on a pillow'],'Not enough heat.');
Q('q2','Dewetting is when solder…',['Wets then pulls back leaving thin film','Never touches the surface','Bridges pins','Forms balls'],'Irregular mounds remain.');
Q('q2','A lifted lead is often caused by…',['Poor coplanarity / bent leads','Too much paste','Nitrogen','A good profile'],'One lead sits higher.');
Q('q2','Solder starved joints near vias are often due to…',['Wicking into the via','Too much flux','Nitrogen','Tombstoning'],'Solder runs down the hole.');
Q('q3','Tombstoning is when…',['A chip stands up on one end','A part is upside down','Balls appear','A joint cracks'],'Manhattan effect.');
Q('q3','Main cause of tombstoning is…',['Unequal wetting forces / thermal imbalance','Too much heat everywhere evenly','Large parts','Wave pallets'],'One end melts first.');
Q('q3','Billboarding is a chip part…',['Soldered on its side','Standing on end','Upside down','Missing'],'Edge-on.');
Q('q3','Tombstoning is most common on…',['Small chips like 0402/0201','Large BGAs','THT resistors','Connectors'],'Light parts pulled easily.');
Q('q3','Cracked MLCCs can be hard to spot because…',['Cracks are often hidden under the terminations','They change colour','They are always loud','AOI always flags them'],'They may show as a short later.');
Q('q3','Every board having the same diode reversed suggests…',['A program/rotation or tape loading error','Random operator error','Bad paste','Low humidity'],'Systematic cause.');
Q('q3','A chip resistor showing a plain white body has been placed…',['Upside down','Correctly','On its side','On the wrong pad'],'Marking is on the black top.');
Q('q4','Head-in-pillow is a defect in…',['BGA joints','THT joints','Wire harnesses','Stencils'],'Ball and paste don’t coalesce.');
Q('q4','Head-in-pillow is often caused by…',['Package warpage or oxidised balls','Too much flux','Excessive cooling','Nitrogen'],'Ball lifts away during reflow.');
Q('q4','Voids are…',['Gas bubbles inside joints','Missing parts','Cracks in mask','Holes in the stencil'],'Seen on X-ray.');
Q('q4','Solder balls are often caused by…',['Moisture in paste or too-fast ramp','Too little paste','Correct handling','Low temperature soak'],'Spatter.');
Q('q4','IPC typically allows BGA voiding up to about…',['25% of ball area','1%','75%','0%'],'Check the class requirements.');
Q('q4','Tin whiskers are…',['Thin tin filaments that grow and can short','A flux type','A stencil defect','A wave defect'],'Pure tin finishes are prone.');
Q('q4','Measling in a PCB looks like…',['White spots in the laminate','Black pads','Gold flakes','Shiny solder'],'Glass fibres separating from resin.');
Q('q4','Blowholes in THT joints are usually caused by…',['Moisture/gas escaping from the board','Too much solder','Nitrogen','Cold iron'],'Outgassing through the barrel.');
Q('q4','Mid-chip solder beads are reduced by…',['Home-plate/U-shaped stencil apertures','More paste','Faster ramp','Thicker stencil'],'Less paste under the body.');

C('quality','IPC-A-610','Acceptability of Electronic Assemblies — inspection criteria.');
C('quality','J-STD-001','Requirements for soldered assemblies — process/materials.');
C('quality','IPC-A-600','Acceptability of bare printed boards.');
C('quality','Class 1','General electronics — just has to work (toys).');
C('quality','Class 2','Dedicated service — computers, industrial. Most common.');
C('quality','Class 3','High reliability — medical, aerospace, military.');
C('quality','IPC conditions','Target / Acceptable / Process Indicator / Defect');
C('quality','Solder bridge','Unwanted solder joining conductors — short.');
C('quality','Cold joint','Dull, grainy, poorly wetted — insufficient heat.');
C('quality','Non-wetting','Solder won’t adhere; base metal exposed. Contamination/oxidation.');
C('quality','Dewetting','Solder wets then recedes, leaving thin film and mounds.');
C('quality','Tombstoning','Chip stands on one end — unequal wetting forces.');
C('quality','Billboarding','Chip soldered on its side.');
C('quality','Lifted lead','Lead not touching pad — coplanarity/handling.');
C('quality','Solder balls','Stray spheres of solder — moisture, ramp, off-pad paste.');
C('quality','Voids','Gas pockets inside joints — seen on X-ray.');
C('quality','Head-in-pillow','BGA ball and paste melt but don’t merge — warpage/oxide.');
C('quality','Icicles','Solder spikes, often from wave soldering.');
C('quality','Insufficient solder','Not enough to form a proper fillet.');
C('quality','Measling','White spots in laminate (glass/resin separation).');
C('quality','Tin whiskers','Conductive tin filaments growing over time.');
C('quality','Pad cratering','Laminate fracture under a pad (often BGA).');
C('quality','Disposition options','Rework, repair, scrap, or use-as-is (with approval).');
C('quality','Skew / offset','Part shifted or rotated on its pads.');

/* ============================ MODULE 13: ESD & SAFETY ============================ */
M.push({ id: 'esd', title: 'ESD & Safety', icon: '🛡️', color: '#9bdcff',
 blurb: 'Static control, EPAs, wrist straps, electrical and chemical safety.',
 lessons: [
 { id: 'e1', title: 'What ESD is', body: `
<p><b>Electrostatic Discharge (ESD)</b> is the sudden flow of static electricity between two objects at different charges. Walking on carpet can charge you to <b>thousands of volts</b>.</p>
<ul><li>You <b>feel</b> a static shock at about <b>3,000 V</b>.</li><li>You <b>see</b> a spark at around 8,000 V+.</li><li>Many sensitive components can be damaged by <b>less than 100 V</b> — far below what you can feel.</li></ul>
<h3>Types of damage</h3>
<ul><li><b>Catastrophic failure</b> — the part is dead straight away. Easy to find at test.</li>
<li><b>Latent damage</b> — the part is weakened but still works. It fails later in the field — the most expensive kind. Estimates suggest most ESD damage is latent.</li></ul>
<h3>Most sensitive parts</h3>
<p>MOSFETs, CMOS ICs, microcontrollers, RF parts, laser diodes, some LEDs. Anything with thin gate oxides.</p>
<h3>Triboelectric charging</h3>
<p>Charge builds up when materials rub or separate — peeling tape, sliding a board out of a bag, walking, plastic cups and packaging. That's why ordinary plastic must stay out of the work area.</p>
<p>Sensitivity is classified by models like <b>HBM</b> (Human Body Model) and <b>CDM</b> (Charged Device Model).</p>` },

 { id: 'e2', title: 'The EPA and ESD controls', body: `
<p>An <b>EPA (ESD Protected Area)</b> is a zone where everything is controlled so static can't build up. Marked with yellow signs/floor tape. Standards: <b>IEC 61340-5-1</b> and <b>ANSI/ESD S20.20</b>.</p>
<h3>The principle</h3>
<p>Ground everything conductive so charge drains away safely to a common <b>earth bonding point (EBP)</b>, and remove insulators that can't be grounded.</p>
<h3>Controls</h3>
<ul><li><b>Wrist strap</b> — worn snug on skin, connected via a coiled cord with a built-in <b>1 MΩ resistor</b> (for your safety, limiting current if you touch something live). Test it <b>daily</b> at the tester.</li>
<li><b>Heel straps / ESD footwear</b> plus an ESD floor — tested at entry.</li>
<li><b>ESD mats</b> on benches — dissipative surface, grounded.</li>
<li><b>ESD smocks/coats</b> — cover clothing, buttoned up.</li>
<li><b>Ionisers</b> — neutralise charge on insulators that can't be grounded.</li>
<li><b>ESD packaging</b> — shielding bags (metallised silvery), pink anti-static bags (low-charging only, not shielding), black conductive foam, ESD totes.</li>
<li><b>Humidity</b> — dry air (below ~30% RH) makes static much worse.</li></ul>
<h3>Good habits</h3>
<ul><li>Never bring personal plastic items, coffee cups, bubble wrap or ordinary tape into the EPA.</li>
<li>Handle boards by the edges; don't touch pins or leads.</li>
<li>Only open ESD bags inside the EPA.</li>
<li>Keep sensitive parts in shielding packaging when moving them.</li></ul>
<p>The ESD symbol is a yellow triangle with a hand and a line through it (susceptible device) — or with an arc around it (ESD protective item).</p>` },

 { id: 'e3', title: 'Electrical and workplace safety', body: `
<h3>Electrical safety</h3>
<ul><li>Current is what kills: as little as <b>~30–50 mA</b> across the chest can cause heart fibrillation.</li>
<li>Voltages above about <b>50 V AC / 120 V DC</b> are considered hazardous (beyond extra-low voltage).</li>
<li><b>Isolate</b> power and <b>prove dead</b> with a tested meter before working on a circuit.</li>
<li><b>Discharge capacitors</b> safely through a suitable resistor — don't short them with a screwdriver.</li>
<li>Use an <b>isolation transformer</b> when working on mains equipment; protect with an <b>RCD</b>.</li>
<li>Only qualified/authorised people should work on live mains.</li>
<li>Remove rings, watches and metal jewellery when working on powered equipment.</li></ul>
<h3>Hipot (flash) testing</h3>
<p>Products connected to mains often get a high-voltage insulation test (kV) — only done by trained staff in guarded stations with interlocks.</p>
<h3>Heat and chemicals</h3>
<ul><li>Soldering irons ~350 °C, solder pots and reflow ovens — burns. Always return the iron to its stand.</li>
<li><b>Flux fumes</b> — colophony (rosin) fumes can cause occupational asthma; use extraction (COSHH regulations in the UK).</li>
<li><b>Lead</b> — wash hands before eating; no food or drink at the bench.</li>
<li><b>IPA</b> and solvents — flammable; keep in labelled safety dispensers.</li>
<li>Read the <b>SDS</b> (Safety Data Sheet) for each chemical.</li>
<li>Wear safety glasses when cutting leads — clipped leads fly!</li></ul>
<h3>Batteries</h3>
<p>Lithium cells can catch fire if shorted, punctured or overheated. Never solder directly to cells unless the process allows it (tabbed cells are spot welded).</p>` },
 ]});

Q('e1','You can feel a static shock at about…',['3,000 V','30 V','300 V','30,000 V'],'Far above what damages parts.');
Q('e1','Some components can be damaged by less than…',['100 V','10,000 V','5,000 V','1,000,000 V'],'Well below what you can feel.');
Q('e1','Latent ESD damage means the part…',['Is weakened and fails later','Dies immediately','Is unaffected','Becomes stronger'],'The costliest kind.');
Q('e1','Charge from rubbing/separating materials is called…',['Triboelectric charging','Induction heating','Electrolysis','Capacitive coupling'],'Peeling tape, walking etc.');
Q('e1','Which parts are especially ESD sensitive?',['MOSFETs and CMOS ICs','Wirewound resistors','Fuses','Transformers'],'Thin gate oxides.');
Q('e1','HBM stands for…',['Human Body Model','High Breakdown Mode','Heat Bonded Material','Half Bridge Module'],'ESD sensitivity test model.');
Q('e2','EPA stands for…',['ESD Protected Area','Electrical Power Area','Earth Protection Assembly','Electronic Production Area'],'Controlled static zone.');
Q('e2','A wrist strap cord contains a resistor of…',['1 MΩ','0 Ω','1 kΩ','100 Ω'],'Limits current for user safety.');
Q('e2','Wrist straps should be tested…',['Daily (each shift)','Once a year','Never','Only when broken'],'Check before work.');
Q('e2','Silvery metallised bags are…',['ESD shielding bags','Moisture-only bags','Normal plastic','Pink antistatic only'],'Faraday cage effect.');
Q('e2','Pink anti-static bags…',['Are low-charging but not shielding','Fully shield from ESD','Are conductive foam','Are moisture barriers'],'Don’t generate charge, but don’t shield.');
Q('e2','Ionisers are used to…',['Neutralise charge on insulators','Ground conductors','Measure humidity','Clean boards'],'For items that can’t be grounded.');
Q('e2','Static is worse when the air is…',['Dry','Humid','Cold','Warm'],'Low humidity lets charge build.');
Q('e2','Which shouldn’t be in an EPA?',['A personal plastic coffee cup','An ESD mat','A grounded tote','A wrist strap'],'Ordinary plastics are charge generators.');
Q('e2','UK/EU ESD standard is…',['IEC 61340-5-1','IPC-A-610','BS 7671','J-STD-020'],'(ANSI/ESD S20.20 in the US).');
Q('e3','Roughly what current across the chest can be fatal?',['30–50 mA','1 µA','5 A minimum','1000 A'],'Can cause fibrillation.');
Q('e3','Before working on a circuit you should…',['Isolate and prove dead','Just switch it off at the button','Wear a wrist strap only','Touch it quickly'],'Test the tester too.');
Q('e3','Large capacitors should be discharged…',['Through a suitable resistor','With a screwdriver short','By waiting 1 second','Not at all'],'Controlled discharge.');
Q('e3','In the UK, chemical hazards are managed under…',['COSHH','RoHS','IPC','CE'],'Control of Substances Hazardous to Health.');
Q('e3','Rosin flux fumes can cause…',['Occupational asthma','Hair loss','Static','Burns only'],'Use fume extraction.');
Q('e3','Why wear safety glasses when cutting leads?',['Clipped leads can fly into eyes','Bright light','ESD','Solder fumes'],'Hold the lead end too.');
Q('e3','An SDS is a…',['Safety Data Sheet','Solder Deposit Spec','Static Discharge Strap','Standard Design Sheet'],'Chemical hazard info.');
Q('e3','An RCD protects people by…',['Tripping when current leaks to earth','Lowering voltage','Blocking DC','Stopping static'],'Residual current device.');

C('esd','ESD','Electrostatic discharge — sudden flow of static between objects.');
C('esd','Feel / see static','Feel ≈ 3 kV; see a spark ≈ 8 kV+. Parts damaged < 100 V.');
C('esd','Latent damage','Part weakened by ESD, fails later in the field.');
C('esd','Triboelectric charging','Charge from rubbing/separating materials.');
C('esd','EPA','ESD Protected Area — grounded, insulators removed.');
C('esd','Wrist strap resistor','1 MΩ in the cord (user safety). Test daily.');
C('esd','EBP','Earth Bonding Point — common ground for ESD controls.');
C('esd','Shielding bag','Silvery metallised — blocks ESD fields.');
C('esd','Pink bag','Low-charging (antistatic) — NOT shielding.');
C('esd','Ionisers','Neutralise charge on insulators that can’t be grounded.');
C('esd','ESD standards','IEC 61340-5-1 / ANSI/ESD S20.20');
C('esd','HBM / CDM','Human Body Model / Charged Device Model.');
C('esd','Lethal current','≈30–50 mA across the chest.');
C('esd','Prove dead','Isolate, then test with a proven meter before touching.');
C('esd','COSHH','UK regs for hazardous substances — flux fumes, solvents.');
C('esd','SDS','Safety Data Sheet for chemicals.');
C('esd','Hipot test','High-voltage insulation test (flash test).');
C('esd','RCD','Residual Current Device — trips on earth leakage.');

/* ============================ MODULE 14: TEST & MEASUREMENT ============================ */
M.push({ id: 'testing', title: 'Test & Measurement', icon: '📟', color: '#c3f584',
 blurb: 'Multimeters, scopes, PSUs, ICT, flying probe, functional test and fault finding.',
 lessons: [
 { id: 'm1', title: 'Using a multimeter', body: `
<h3>Voltage (V)</h3>
<p>Measured <b>in parallel</b> — probes across the component or from a point to ground, with the circuit powered. Select DC (V⎓) or AC (V~). The meter has very high input resistance (~10 MΩ) so it barely affects the circuit.</p>
<h3>Current (A)</h3>
<p>Measured <b>in series</b> — you must break the circuit and put the meter in the path. Move the red lead to the <b>A or mA socket</b>. Never put the meter across a supply in current mode — it's a near short and will blow the meter's fuse (or worse).</p>
<h3>Resistance (Ω)</h3>
<p>Circuit <b>unpowered</b>. In-circuit readings can be misleading because other parts in parallel affect the result — lift one end for an accurate reading.</p>
<h3>Continuity</h3>
<p>Beeps for a low-resistance path (typically &lt; ~30–50 Ω). Perfect for finding shorts, open tracks and checking cables. Unpowered only.</p>
<h3>Diode test</h3>
<p>Shows the forward voltage drop (~0.6 V silicon, ~0.3 V Schottky, ~1.8–3 V LEDs). Also handy for checking transistor junctions.</p>
<h3>Other functions</h3>
<p>Capacitance, frequency, temperature (with a thermocouple), duty cycle.</p>
<h3>Safety ratings</h3>
<p>Meters are rated by <b>CAT</b> category (CAT II for plug-in appliances, CAT III for building distribution, CAT IV at the supply origin) and voltage. Use one rated for what you're measuring.</p>
<div class="tip">Auto-ranging meters pick the range; on manual meters start on the highest range and work down.</div>` },

 { id: 'm2', title: 'Oscilloscopes and bench equipment', body: `
<h3>Oscilloscope</h3>
<p>Shows voltage over <b>time</b> as a graph — lets you see signals a meter can't: waveforms, noise, ripple, clocks and data.</p>
<ul><li><b>Vertical</b> — volts per division.</li><li><b>Horizontal</b> — time per division.</li><li><b>Trigger</b> — tells the scope when to start drawing so the waveform holds still (edge level and slope).</li><li><b>Probes</b> — usually ×10 (10:1) for less circuit loading. <b>Compensate</b> them using the scope's square-wave output.</li><li><b>Bandwidth</b> — the max frequency it can measure accurately (e.g. 100 MHz).</li></ul>
<div class="tip"><b>Ground clip warning:</b> on a normal scope, the probe ground is connected to mains earth. Clipping it to a non-ground point on mains-powered gear can cause a short. Use differential probes for floating measurements.</div>
<h3>Bench power supply</h3>
<p>Adjustable voltage with a <b>current limit</b>. Set the current limit low when first powering a new or repaired board — if there's a short, the supply limits instead of letting parts burn. Watching current draw is a great first test.</p>
<h3>Other kit</h3>
<ul><li><b>LCR meter</b> — measures inductance, capacitance, resistance accurately (and ESR).</li>
<li><b>Signal / function generator</b> — creates test waveforms.</li>
<li><b>Electronic load</b> — draws a set current to test supplies.</li>
<li><b>Logic analyser</b> — captures many digital lines and decodes buses (I²C, SPI, UART).</li>
<li><b>Thermal camera</b> — spots hot parts (shorts!) instantly.</li>
<li><b>Microscope</b> — inspection.</li></ul>` },

 { id: 'm3', title: 'Production test methods', body: `
<h3>ICT — In-Circuit Test</h3>
<p>A <b>bed-of-nails</b> fixture with hundreds of spring-loaded <b>pogo pins</b> touching test points. Tests each component individually: shorts, opens, resistor/capacitor values, diode orientation, and some IC checks. Fast and thorough, but fixtures are expensive — for high volume.</p>
<h3>Flying probe test</h3>
<p>Moving probes (2–8 heads) touch test points one by one. <b>No fixture</b> needed, so cheap to set up and good for prototypes and low volume — but slower.</p>
<h3>Functional test (FCT)</h3>
<p>Powers up the board and checks it actually <b>does its job</b>: correct voltages, current draw, communications, LEDs, buttons, outputs. Often combined with <b>programming firmware</b>.</p>
<h3>Boundary scan (JTAG)</h3>
<p>Uses the test logic built into compatible ICs to check connections between them — great for BGAs where you can't probe.</p>
<h3>Burn-in / ESS</h3>
<p>Running boards hot or cycling temperature for a period to catch "infant mortality" failures before shipping.</p>
<h3>Other tests</h3>
<ul><li><b>Hipot</b> (dielectric strength) and <b>earth bond</b> tests for mains safety.</li>
<li><b>Bare-board test</b> — checks the PCB itself for opens/shorts before assembly.</li>
<li><b>Golden board</b> — a known-good board used to validate test setups.</li></ul>
<p><b>First pass yield (FPY)</b> = boards passing first time ÷ total. Key quality metric.</p>` },

 { id: 'm4', title: 'Fault finding', body: `
<h3>A systematic approach</h3>
<ol class="steps"><li><b>Gather info</b> — what's the symptom? Which test failed? Is it one board or many?</li>
<li><b>Visual inspection first</b> — under magnification: bridges, missing/wrong/reversed parts, damaged parts, burn marks, lifted leads. Most faults are found here.</li>
<li><b>Unpowered checks</b> — resistance between power rails and ground. A near-0 Ω reading = short.</li>
<li><b>Powered with current limit</b> — check supply rails are the right voltage (start at the input and work forward).</li>
<li><b>Signals</b> — clocks running? Reset released? Use the scope.</li>
<li><b>Divide and conquer</b> — split the circuit in halves to narrow down.</li>
<li><b>Fix, re-test, and record</b> the root cause.</li></ol>
<h3>Finding a short</h3>
<ul><li>Thermal camera or <b>freeze spray</b> — the shorted part heats up.</li>
<li>Inject a small current (limited PSU, e.g. 1 V at 1 A max) and feel/measure which part warms.</li>
<li>Measure millivolt drops along the rail with a sensitive meter — voltage drops toward the short.</li>
<li>Lift parts one at a time (usually decoupling caps or a suspect IC).</li></ul>
<h3>Common culprits</h3>
<p>Solder bridges, cracked MLCCs (shorting rails), reversed tantalums/diodes/ICs, wrong value parts, open joints on QFN/BGA, missing 0 Ω links, wrong firmware, bad connectors.</p>
<h3>Record it</h3>
<p>Good defect logging (symptom, cause, location, fix) turns one repair into a process improvement.</p>` },
 ]});

Q('m1','Voltage is measured with the meter…',['In parallel across the component','In series','With power off','In the A socket'],'Across two points.');
Q('m1','Current is measured with the meter…',['In series, breaking the circuit','In parallel','Across the supply','Unpowered'],'Current must flow through the meter.');
Q('m1','Putting a meter in current mode across a supply will…',['Short it and likely blow the meter fuse','Measure voltage','Do nothing','Measure resistance'],'Current mode has near-zero resistance.');
Q('m1','Resistance and continuity should be measured…',['With the circuit unpowered','With the circuit powered','Under load','On the AC range'],'Powered readings are false.');
Q('m1','Why can in-circuit resistance readings be wrong?',['Other parts in parallel affect them','The meter is too accurate','Resistors change when soldered','Flux conducts'],'Lift one end for accuracy.');
Q('m1','A Schottky diode in diode test reads about…',['0.3 V','0.7 V','3 V','OL'],'Lower Vf.');
Q('m1','CAT ratings on meters indicate…',['Safety rating for measurement environment','Battery type','Accuracy class','Brand'],'CAT II/III/IV.');
Q('m1','A typical multimeter voltage input resistance is…',['~10 MΩ','~10 Ω','~1 kΩ','0 Ω'],'Very high, so it barely loads the circuit.');
Q('m2','An oscilloscope shows…',['Voltage over time','Resistance over time','Current only','Temperature'],'Waveforms.');
Q('m2','The trigger on a scope…',['Holds the waveform steady by choosing when to start','Turns it on','Sets bandwidth','Measures current'],'Edge, level, slope.');
Q('m2','×10 probes are used because…',['They load the circuit less','They are cheaper','They show 10× bigger','They are for current'],'Higher input impedance.');
Q('m2','Probe compensation is done using…',['The scope’s square-wave calibration output','A sine wave','A battery','Mains'],'Adjust until corners are square.');
Q('m2','On a mains-earthed scope, the probe ground clip is…',['Connected to earth — careful where you clip it','Floating','Not connected','A second input'],'Can short mains-referenced circuits.');
Q('m2','When first powering a new board, set the bench PSU…',['To a low current limit','To max current','Without a limit','To AC'],'Limits damage if shorted.');
Q('m2','A logic analyser is best for…',['Capturing and decoding digital buses','Measuring mains','Capacitance','Heat'],'Many channels, decode I²C/SPI/UART.');
Q('m2','Which instrument accurately measures inductance and ESR?',['LCR meter','Scope','Logic analyser','PSU'],'L, C, R meter.');
Q('m3','ICT uses…',['A bed-of-nails fixture','Moving probes','Cameras','X-ray'],'Pogo pins contact test points.');
Q('m3','Flying probe testing is best for…',['Prototypes and low volume','Very high volume','Wire harnesses','Paste'],'No fixture cost.');
Q('m3','Functional test checks…',['The board actually performs its job','Only resistor values','Paste volume','Component shelf life'],'Power up and exercise.');
Q('m3','Boundary scan is especially useful for…',['BGAs where you can’t probe joints','THT resistors','Fuses','Batteries'],'Uses JTAG test logic.');
Q('m3','Burn-in aims to catch…',['Early life (infant mortality) failures','Wrong labels','Paste defects','Cosmetic issues'],'Stress screening.');
Q('m3','First pass yield is…',['Boards passing first time ÷ total','Total output per hour','Rework count','Scrap value'],'Key quality metric.');
Q('m3','A golden board is…',['A known-good reference board','Gold plated','The first prototype only','A customer sample'],'Validates test setups.');
Q('m4','Usually the first step in fault finding is…',['Visual inspection','Replacing the MCU','Hipot test','Reflowing the board'],'Most faults are visible.');
Q('m4','Near 0 Ω between a power rail and ground suggests…',['A short circuit','Everything is fine','An open circuit','A flat battery'],'Rails should read more than that.');
Q('m4','Freeze spray or a thermal camera helps find…',['The part heating up from a short','Wrong firmware','Missing labels','Cold joints only'],'The shorted part gets hot.');
Q('m4','A common cause of a rail short after depanelling is…',['A cracked MLCC','Wrong firmware','Too much flux','A blown fuse'],'Board flex cracks ceramics.');
Q('m4','"Divide and conquer" means…',['Splitting the circuit to narrow down the fault','Removing every part','Testing two boards','Running two tests'],'Halving the search.');
Q('m4','Why log root causes of faults?',['To improve the process and stop repeats','It’s optional','For the customer only','To slow production'],'Data drives improvement.');
Q('m4','When checking rails powered, you should work…',['From the input forwards','From the output back randomly','Only at the MCU','Only at test points'],'Follow the power path.');

C('testing','Measuring voltage','In PARALLEL, circuit powered.');
C('testing','Measuring current','In SERIES — break the circuit; red lead to A/mA socket.');
C('testing','Measuring resistance','Circuit UNPOWERED; parallel parts affect in-circuit readings.');
C('testing','Continuity','Beep for low resistance path — find shorts/opens. Unpowered.');
C('testing','Diode test readings','Si ~0.6 V, Schottky ~0.3 V, LED ~1.8–3 V, reverse OL.');
C('testing','Meter CAT ratings','CAT II appliances, CAT III distribution, CAT IV supply origin.');
C('testing','Scope vertical / horizontal','Volts per division / time per division.');
C('testing','Scope trigger','Sets when the trace starts so waveforms are stable.');
C('testing','×10 probe','Less loading; compensate with calibration square wave.');
C('testing','Scope ground clip','Connected to mains earth — beware shorting.');
C('testing','Bench PSU current limit','Set low on first power-up to protect from shorts.');
C('testing','LCR meter','Measures inductance, capacitance, resistance, ESR.');
C('testing','Logic analyser','Captures many digital lines and decodes buses.');
C('testing','ICT','In-circuit test — bed-of-nails fixture tests each part.');
C('testing','Flying probe','Fixtureless moving-probe test; prototypes/low volume.');
C('testing','FCT','Functional test — does the board do its job?');
C('testing','Boundary scan','JTAG-based interconnect test for BGAs/ICs.');
C('testing','Burn-in','Stress screening to catch infant mortality.');
C('testing','FPY','First pass yield = passed first time ÷ total.');
C('testing','Golden board','Known-good reference board.');
C('testing','Fault-finding order','Info → Visual → Unpowered checks → Powered (limited) → Signals → Divide → Fix & record');
C('testing','Finding a short','Thermal camera, freeze spray, current injection, mV drop, lifting parts.');

/* ============================ MODULE 15: SCHEMATICS ============================ */
M.push({ id: 'schematics', title: 'Reading Schematics', icon: '📐', color: '#a0e7e5',
 blurb: 'Symbols, designators, nets, power flags and how to read a circuit diagram.',
 lessons: [
 { id: 'sc1', title: 'Schematic symbols', body: `
<p>A <b>schematic</b> shows how components connect electrically — not where they physically sit (that's the PCB layout).</p>
<div class="symgrid">{{sym:resistor}}{{sym:capacitor}}{{sym:polcap}}{{sym:inductor}}{{sym:diode}}{{sym:led}}{{sym:zener}}{{sym:npn}}{{sym:nmos}}{{sym:ground}}{{sym:battery}}{{sym:fuse}}{{sym:switch}}{{sym:opamp}}{{sym:crystal}}</div>
<h3>Things to know</h3>
<ul><li>Two styles exist: <b>IEC</b> (UK/Europe — rectangle resistor) and <b>ANSI</b> (US — zig-zag). You'll see both.</li>
<li>A <b>polarised capacitor</b> shows a + sign, or one curved plate (the curved side is negative).</li>
<li>Diode symbols: the triangle points the way conventional current flows; the bar is the cathode. Zener: bent bar. Schottky: S-shaped bar. LED: arrows pointing out.</li>
<li>Arrows on transistors show the emitter (BJT) or the channel type (MOSFET).</li></ul>
<p>Use the "Symbols" game to drill these!</p>` },

 { id: 'sc2', title: 'Designators, nets and power', body: `
<h3>Reference designators</h3>
<table class="tbl"><tr><th>Letter</th><th>Part</th><th>Letter</th><th>Part</th></tr>
<tr><td>R</td><td>Resistor</td><td>U / IC</td><td>Integrated circuit</td></tr>
<tr><td>C</td><td>Capacitor</td><td>Q</td><td>Transistor</td></tr>
<tr><td>L</td><td>Inductor</td><td>D</td><td>Diode / LED</td></tr>
<tr><td>F</td><td>Fuse</td><td>K</td><td>Relay</td></tr>
<tr><td>J / P</td><td>Connector</td><td>Y / X</td><td>Crystal</td></tr>
<tr><td>T</td><td>Transformer</td><td>SW / S</td><td>Switch</td></tr>
<tr><td>FB</td><td>Ferrite bead</td><td>TP</td><td>Test point</td></tr>
<tr><td>RN</td><td>Resistor network</td><td>BT</td><td>Battery</td></tr>
<tr><td>VR / RV</td><td>Variable resistor</td><td>LS / BZ</td><td>Speaker / Buzzer</td></tr></table>
<h3>Wires and nets</h3>
<ul><li>A <b>net</b> is every point that's electrically connected.</li>
<li>A <b>dot</b> at a crossing means connected. Lines crossing <b>without a dot</b> are not connected.</li>
<li><b>Net labels</b> — same name = connected, even on different sheets (e.g. "SDA", "VBUS").</li>
<li><b>Power symbols</b> — "+5V", "3V3", "VCC" flags and ground symbols connect all points with the same name without drawing wires.</li>
<li>Multi-sheet designs use <b>off-sheet connectors</b> or hierarchical ports.</li></ul>
<h3>Naming conventions</h3>
<p><b>VCC/VDD</b> = positive supply, <b>VEE/VSS</b> = negative or ground. <b>AGND</b> (analogue ground), <b>DGND</b> (digital), <b>PGND</b> (power), <b>GND</b>. <b>3V3</b> = 3.3 V (letter as decimal point again).</p>` },

 { id: 'sc3', title: 'Reading a circuit', body: `
<h3>A method for any schematic</h3>
<ol class="steps"><li><b>Find the power input</b> — connector, fuse, protection diode, regulator(s). Note each supply rail.</li>
<li><b>Find the "brain"</b> — the main IC/MCU. Look at its supply pins and decoupling caps.</li>
<li><b>Follow the signals</b> — inputs (sensors, buttons, connectors) → processing → outputs (LEDs, drivers, relays).</li>
<li><b>Recognise building blocks</b> — voltage dividers, LED + resistor, pull-ups, RC filters, transistor switches, crystal + load caps.</li>
<li><b>Read the notes</b> — DNP markings, part values, tolerance, voltage ratings, revision block.</li></ol>
<h3>Common building blocks to spot</h3>
<ul><li><b>Pull-up</b> — resistor from a signal to VCC.</li>
<li><b>Decoupling</b> — 100 nF from each VCC pin to GND, close to the IC.</li>
<li><b>Low-side switch</b> — MCU pin → resistor → transistor base/gate; load between supply and drain/collector; flyback diode if inductive.</li>
<li><b>RC low-pass filter</b> — series R then C to ground. Cut-off f = 1 / (2πRC).</li>
<li><b>Reverse polarity diode or P-FET</b> at the input.</li>
<li><b>ESD/TVS diodes</b> on connector pins.</li></ul>
<h3>Value notes</h3>
<p>Values may include extra info: "10k 1%", "100n 50V X7R 0402", "DNP". The BOM is the final word on exact part numbers.</p>
<div class="job"><b>On the line:</b> pairing the schematic with the assembly drawing lets you find any designator fast — and understand why a part matters when it fails.</div>` },
 ]});

Q('sc1','A schematic shows…',['How components connect electrically','Where parts physically sit','The PCB stack-up','The reflow profile'],'Layout shows physical placement.');
Q('sc1','On a polarised capacitor symbol, the curved plate is…',['Negative','Positive','Ground','The dielectric'],'Or shown with a + on the other plate.');
Q('sc1','A diode symbol with arrows pointing outward is a…',['LED','Photodiode','Zener','Schottky'],'Light coming out.');
Q('sc1','A zener symbol has a…',['Bent bar on the cathode','S-shaped bar','Circle','Arrow in'],'Z-shaped ends.');
Q('sc1','A zig-zag resistor symbol is the…',['ANSI (US) style','IEC style','A variable resistor','An inductor'],'IEC uses a rectangle.');
Q('sc1','A row of bumps/loops is the symbol for…',['An inductor','A resistor','A capacitor','A fuse'],'Coil.');
Q('sc2','Designator Q is for…',['Transistors','Crystals','Connectors','Fuses'],'Q1, Q2…');
Q('sc2','Designator L is for…',['Inductors','LEDs','Lamps only','Links'],'LEDs are usually D.');
Q('sc2','Lines crossing without a dot are…',['Not connected','Connected','Shorted','Grounded'],'A junction dot means connected.');
Q('sc2','Two net labels with the same name are…',['Connected','Different nets','Errors','Test points'],'Same name = same net.');
Q('sc2','3V3 means…',['3.3 V','33 V','3 V ×3','0.33 V'],'Letter as decimal.');
Q('sc2','VSS usually means…',['Ground / negative supply','Positive supply','A signal','Very small signal'],'VDD/VSS for CMOS.');
Q('sc2','Designator Y is usually a…',['Crystal','Transformer','Relay','Diode'],'Y or X.');
Q('sc2','AGND stands for…',['Analogue ground','Auxiliary gain node','Active ground','Alternate GND'],'Separated from noisy DGND.');
Q('sc3','When reading a schematic, start with…',['The power input','The silkscreen','The BOM cost','The test points'],'Follow power first.');
Q('sc3','RC low-pass cut-off frequency is…',['1 / (2πRC)','RC','2πRC','R/C'],'Classic formula.');
Q('sc3','A resistor from a signal line to VCC is a…',['Pull-up','Pull-down','Filter','Shunt'],'Holds the line high.');
Q('sc3','A 100 nF cap from each VCC pin to GND is…',['Decoupling','Timing','Coupling','Filtering mains'],'Local energy reservoir.');
Q('sc3','Which document is the final word on exact part numbers?',['The BOM','The schematic','The silkscreen','The Gerbers'],'MPNs live in the BOM.');
Q('sc3','"DNP" next to a part on a schematic means…',['Do not place','Double net path','Diode not polarised','Data not provided'],'Left unfitted.');

C('schematics','Schematic vs layout','Schematic = electrical connections. Layout = physical placement.');
C('schematics','Junction dot','Dot at a crossing = connected. No dot = not connected.');
C('schematics','Net label','Same name = same net, even across sheets.');
C('schematics','VCC / VDD','Positive supply rail.');
C('schematics','VEE / VSS','Negative supply / ground.');
C('schematics','AGND / DGND / PGND','Analogue / digital / power ground.');
C('schematics','R C L D Q U','Resistor, Capacitor, Inductor, Diode, Transistor, IC');
C('schematics','F K T Y J','Fuse, Relay, Transformer, Crystal, Connector');
C('schematics','FB TP RN BT SW','Ferrite bead, Test point, Resistor network, Battery, Switch');
C('schematics','IEC vs ANSI resistor','IEC = rectangle; ANSI = zig-zag.');
C('schematics','Polarised cap symbol','Curved plate = negative (or + marked).');
C('schematics','LED symbol','Diode with arrows pointing OUT.');
C('schematics','Photodiode symbol','Diode with arrows pointing IN.');
C('schematics','Zener symbol','Diode with bent (Z) bar.');
C('schematics','Schottky symbol','Diode with S-shaped bar.');
C('schematics','RC low-pass cut-off','f = 1 / (2πRC)');
C('schematics','Reading order','Power in → regulators → main IC → inputs → outputs → notes.');
C('schematics','3V3 / 1V8','3.3 V / 1.8 V');
})();
