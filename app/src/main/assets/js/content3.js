// Spark content part 3: PCBs, SMT process, Packages
(function () {
const M = window.MODULES, QS = window.QUESTIONS, CS = window.CARDS;
const Q = (l, q, a, e) => QS.push({ l, q, a, e });
const C = (m, f, b) => CS.push({ m, f, b });

/* ============================ MODULE 9: PCB ANATOMY ============================ */
M.push({ id: 'pcb', title: 'PCB Anatomy', icon: '🟩', color: '#3ddc97',
 blurb: 'Layers, copper, vias, mask, silkscreen, finishes, panels and design files.',
 lessons: [
 { id: 'p1', title: 'What a PCB is made of', body: `
<p>A <b>Printed Circuit Board</b> mechanically holds components and electrically connects them with copper instead of wires.</p>
<h3>The layers of a board (top to bottom)</h3>
<ul><li><b>Silkscreen</b> — the printed white (or black) text: designators, outlines, polarity marks, logos.</li>
<li><b>Solder mask</b> — the coloured coating (usually green) that covers copper you don't want soldered. Prevents bridges and protects against corrosion.</li>
<li><b>Copper</b> — tracks, pads and planes.</li>
<li><b>Substrate / core</b> — the insulating base, usually <b>FR-4</b> (woven fibreglass + epoxy, "flame retardant").</li></ul>
<h3>Thickness</h3>
<p>Standard board thickness is <b>1.6 mm</b> (0.062"). Thinner: 0.8 mm, 1.0 mm; thicker for big boards.</p>
<h3>Copper weight</h3>
<p>Measured in <b>ounces per square foot</b>. <b>1 oz ≈ 35 µm</b> thick — standard. 2 oz (70 µm) for higher current.</p>
<h3>Other substrates</h3>
<ul><li><b>Aluminium / IMS</b> — metal core for LED boards; pulls heat away.</li>
<li><b>Polyimide (flex)</b> — bendy circuits, often orange/amber (Kapton).</li>
<li><b>Rigid-flex</b> — rigid sections joined by flex.</li>
<li><b>Rogers / PTFE</b> — high-frequency RF boards.</li>
<li><b>CEM / FR-2</b> — cheap paper-based boards (old consumer gear).</li></ul>
<h3>Tg</h3>
<p><b>Glass transition temperature</b> — where the laminate starts to soften. Standard FR-4 ~130–140 °C; high-Tg (170 °C+) for lead-free and repeated reflow.</p>` },

 { id: 'p2', title: 'Layers, tracks and planes', body: `
<h3>Layer count</h3>
<ul><li><b>Single-sided</b> — copper on one side only (cheap products, simple THT).</li>
<li><b>Double-sided</b> — copper top and bottom, connected by plated holes.</li>
<li><b>Multilayer</b> — 4, 6, 8+ layers. Inner layers sandwiched with <b>prepreg</b> (resin-soaked glass) and core, pressed together. Typical 4-layer: Signal / GND / Power / Signal.</li></ul>
<p>Layers are named <b>Top (L1)</b>, inner layers (L2, L3…), and <b>Bottom</b>.</p>
<h3>Tracks (traces)</h3>
<p>Copper lines carrying signals and power. Width depends on current — wider = more current, less heating. Signal tracks might be 0.15–0.25 mm; power tracks 1 mm+.</p>
<h3>Planes and pours</h3>
<p>Large copper areas, usually ground or power. Benefits: low resistance, heat spreading, shielding, stable reference for signals.</p>
<h3>Controlled impedance and differential pairs</h3>
<p>High-speed signals (USB, Ethernet, HDMI, DDR) need tracks of exact width and spacing — often routed as matched <b>differential pairs</b>.</p>
<h3>Thermal relief</h3>
<p>Pads connected to big planes use thin "spokes" instead of a solid connection. Without them, the plane sucks heat away and the joint is hard to solder (cold joints).</p>
<h3>Creepage and clearance</h3>
<p>Minimum distances between conductors at different voltages — along the surface (<b>creepage</b>) and through air (<b>clearance</b>). Critical for mains. Sometimes slots are routed in the board to increase creepage.</p>` },

 { id: 'p3', title: 'Pads, holes and vias', body: `
<h3>Pads</h3>
<p>Exposed copper areas where components are soldered.</p>
<ul><li><b>SMD pads</b> — flat lands on the surface.</li>
<li><b>THT pads</b> — rings of copper around a drilled hole (the <b>annular ring</b>).</li>
<li><b>Thermal / exposed pads</b> — big centre pads under QFN, DPAK etc. for heat (often with via arrays).</li></ul>
<h3>Holes</h3>
<ul><li><b>PTH</b> — Plated Through Hole: copper-plated barrel connecting layers. Used for THT leads.</li>
<li><b>NPTH</b> — Non-Plated: mounting holes, tooling holes.</li></ul>
<h3>Vias</h3>
<p>Small plated holes that connect a track between layers. No component goes in them.</p>
<ul><li><b>Through via</b> — goes all the way through the board.</li>
<li><b>Blind via</b> — from an outer layer to an inner layer, not through.</li>
<li><b>Buried via</b> — between inner layers only, invisible from outside.</li>
<li><b>Microvia</b> — tiny laser-drilled vias, used in HDI boards.</li>
<li><b>Via-in-pad</b> — via inside a pad (BGAs); must be filled and plated over or solder wicks down it.</li>
<li><b>Tented via</b> — covered with solder mask.</li></ul>
<div class="job"><b>On the line:</b> solder disappearing from a pad into an open via is called <b>wicking</b> — it can leave a joint starved of solder.</div>
<h3>Slots and cut-outs</h3>
<p>Plated slots for connector tabs, routed cut-outs for components, castellated holes (half-holes on the board edge so a module can be soldered onto another board).</p>` },

 { id: 'p4', title: 'Surface finishes', body: `
<p>Bare copper oxidises quickly and won't solder well, so exposed pads get a protective <b>surface finish</b>.</p>
<ul><li><b>HASL</b> (Hot Air Solder Levelling) — board dipped in molten solder, levelled with hot air. Cheap, robust, but <b>not flat</b> — bad for fine-pitch parts. Comes in leaded or lead-free.</li>
<li><b>ENIG</b> (Electroless Nickel Immersion Gold) — gold colour, very flat, long shelf life, good for fine pitch and BGAs. Risk: "black pad" defect.</li>
<li><b>OSP</b> (Organic Solderability Preservative) — thin organic coating over copper. Cheap and flat but short shelf life and sensitive to handling and multiple reflows. Pads look copper-coloured.</li>
<li><b>Immersion silver</b> — flat, good solderability, but tarnishes.</li>
<li><b>Immersion tin</b> — flat, but tin whiskers and limited shelf life.</li>
<li><b>ENEPIG</b> — like ENIG with a palladium layer; good for wire bonding.</li>
<li><b>Hard gold</b> — thick electroplated gold for <b>edge connector fingers</b> that get plugged in and out.</li></ul>
<div class="tip">Handle boards by the edges, ideally with gloves — finger oils contaminate pads and cause poor wetting, especially on OSP.</div>` },

 { id: 'p5', title: 'Markings, fiducials and panels', body: `
<h3>Silkscreen information</h3>
<p>Reference designators (R12, C5, U3), component outlines, <b>polarity marks</b> (+, cathode bars, pin 1 dots), board name, revision, date code, and approvals (UL, CE, recycling marks).</p>
<h3>Fiducials</h3>
<p>Small round copper dots (often 1 mm, with a clear mask opening around them). Machine vision cameras use them to find the board's exact position and rotation. You'll find <b>global fiducials</b> (2–3 on the board/panel) and <b>local fiducials</b> near fine-pitch parts.</p>
<h3>Panelisation</h3>
<p>Small boards are made in a <b>panel (array)</b> so many can be assembled at once, then separated (<b>depanelling</b>).</p>
<ul><li><b>V-score</b> — V-shaped grooves cut top and bottom; snap or cut along straight lines.</li>
<li><b>Tab-routing / mouse bites</b> — boards held by small tabs with rows of tiny holes (they look like a mouse nibbled them).</li>
<li><b>Rails / break-away edges</b> — extra board along the edges for conveyors to grip, carrying tooling holes and fiducials.</li></ul>
<div class="job"><b>Depanelling stress:</b> snapping boards by hand flexes them and can crack MLCCs near the break line. Use the proper depaneling tool or router.</div>
<h3>Bad marks / X-outs</h3>
<p>A board in a panel that failed bare-board test is marked (an X) so the machine skips it.</p>` },

 { id: 'p6', title: 'Design files: Gerbers, BOM and centroid', body: `
<p>To make and assemble a board, the factory needs a set of files:</p>
<ul><li><b>Gerber files</b> — one file per layer (copper, mask, silk, paste, outline). The industry standard "photo" of each layer. RS-274X or the newer X2.</li>
<li><b>Drill file</b> — Excellon format; positions and sizes of every hole.</li>
<li><b>BOM</b> (Bill of Materials) — every part: designator, quantity, value, package, manufacturer part number (MPN), and approved alternatives.</li>
<li><b>Centroid / pick-and-place / XY file</b> — designator, X and Y position, rotation, and side (top/bottom) for every SMD part.</li>
<li><b>Assembly drawing</b> — shows where parts go and special instructions.</li>
<li><b>Paste layer</b> — used to make the stencil.</li>
<li><b>Fab drawing</b> — stack-up, materials, finish, tolerances.</li></ul>
<h3>DNP / DNF</h3>
<p><b>Do Not Place / Do Not Fit</b> — parts on the board design that are deliberately left off for this build variant.</p>
<h3>ECOs and revisions</h3>
<p>Changes are controlled by <b>ECNs/ECOs</b> (engineering change notices/orders). Always check you're building to the correct <b>revision</b> of BOM and drawings.</p>
<div class="job"><b>On the line:</b> rotation mistakes in the centroid file are a classic cause of every one of a part being placed backwards — catch it at first-article inspection.</div>` },
 ]});

Q('p1','The most common PCB substrate is…',['FR-4','Aluminium','Polyimide','Paper'],'Woven glass + epoxy.');
Q('p1','Standard PCB thickness is…',['1.6 mm','0.5 mm','3.2 mm','1 mm'],'0.062".');
Q('p1','1 oz copper is about…',['35 µm thick','1 mm thick','100 µm thick','3.5 µm thick'],'Per square foot.');
Q('p1','The green coating on a PCB is the…',['Solder mask','Silkscreen','Substrate','Paste'],'It prevents bridging and protects copper.');
Q('p1','Metal-core (IMS) boards are often used for…',['LEDs, for heat','Flexible circuits','RF','Cheap toys'],'Aluminium spreads heat.');
Q('p1','Tg is…',['The temperature where the laminate softens','Track gap','Total gauge','Thermal ground'],'Glass transition temperature.');
Q('p1','Flexible PCBs are usually made of…',['Polyimide','FR-4','Aluminium','Ceramic'],'Kapton/polyimide — amber colour.');
Q('p2','A typical 4-layer stack-up is…',['Signal / GND / Power / Signal','GND / GND / GND / GND','Signal / Signal / Signal / Signal','Power / Signal / Signal / GND'],'Planes in the middle.');
Q('p2','Prepreg is…',['Resin-impregnated glass used to bond layers','Pre-applied paste','A finish','A cleaning agent'],'Pre-impregnated.');
Q('p2','Thermal relief spokes help…',['Soldering pads connected to large planes','Increase current capacity','Reduce EMI','Mark polarity'],'They limit heat loss into the plane.');
Q('p2','Creepage is the distance between conductors…',['Along the surface','Through air','Through the board','Between layers'],'Clearance is through air.');
Q('p2','Why route a slot between mains and low-voltage sections?',['To increase creepage','To save copper','For cooling only','For alignment'],'Air gap = longer surface path.');
Q('p2','USB D+ and D− are routed as…',['A differential pair','Power planes','Thermal reliefs','Single wide tracks'],'Matched length/impedance.');
Q('p2','A wider track can carry…',['More current with less heating','Less current','Higher frequency only','Only ground'],'Lower resistance.');
Q('p3','A via is…',['A plated hole connecting layers','A mounting hole','A pad for THT leads only','A fiducial'],'No component goes in it.');
Q('p3','A blind via connects…',['An outer layer to an inner layer','Two inner layers only','Top to bottom','Nothing'],'Visible from one side only.');
Q('p3','A buried via connects…',['Inner layers only','Top to bottom','Top to inner','Board to chassis'],'Not visible from outside.');
Q('p3','NPTH means…',['Non-plated through hole','New PCB thickness','Negative power track','No paste'],'Mounting/tooling holes.');
Q('p3','The copper ring around a THT hole is the…',['Annular ring','Thermal relief','Fiducial','Via tent'],'Annular ring.');
Q('p3','Solder flowing into an open via is called…',['Wicking','Bridging','Tombstoning','Slumping'],'It can starve the joint.');
Q('p3','Castellated holes are used to…',['Solder a module onto another board','Mount heatsinks','Vent gas','Hold fiducials'],'Half-holes on the board edge.');
Q('p3','A tented via is…',['Covered with solder mask','Filled with copper','Drilled twice','Gold plated'],'Mask over the via.');
Q('p4','Which finish is cheap but not very flat?',['HASL','ENIG','OSP','Immersion silver'],'Hot air levelling leaves uneven solder.');
Q('p4','Gold-coloured flat finish common for BGAs is…',['ENIG','HASL','OSP','Bare copper'],'Electroless nickel immersion gold.');
Q('p4','OSP pads look…',['Copper-coloured','Gold','Silver and lumpy','Green'],'Thin organic coating over copper.');
Q('p4','Edge connector fingers usually use…',['Hard gold','OSP','HASL','Immersion tin'],'Wear resistant.');
Q('p4','A known defect with ENIG is…',['Black pad','Tin whiskers','Tombstoning','Head-in-pillow only'],'Corroded nickel layer.');
Q('p4','Why handle boards by the edges?',['Finger oils contaminate pads','To avoid fingerprints on silkscreen only','Boards are hot','To keep them flat'],'Contamination reduces solderability.');
Q('p5','Fiducials are used for…',['Machine vision alignment','Mounting','Test probes','Heat'],'Cameras find board position.');
Q('p5','Mouse bites are…',['Rows of small holes in break-away tabs','A soldering defect','Damaged traces','Via types'],'Tab-routed panel separation.');
Q('p5','V-score is…',['Grooves cut to snap boards apart','A test score','A via type','A finish'],'Straight-line depanelling.');
Q('p5','An X-out on a panel means…',['That board failed and should be skipped','The board passed','Extra parts','X-ray required'],'Bad mark.');
Q('p5','Hand-snapping panels can…',['Crack MLCCs near the break line','Improve joints','Reduce flux','Align fiducials'],'Flexing stresses ceramics.');
Q('p5','Rails on a panel are for…',['Conveyor handling, tooling holes and fiducials','Extra circuits','Cooling','Labels only'],'Break-away edges.');
Q('p6','Gerber files describe…',['Each PCB layer’s image','The parts list','Machine programs','Test results'],'One per layer.');
Q('p6','The BOM lists…',['Every part, value, designator and MPN','Hole positions','Copper layers','Reflow profile'],'Bill of materials.');
Q('p6','A centroid file gives…',['X, Y, rotation and side for each part','Copper weights','Hole sizes','Stencil thickness'],'Pick and place data.');
Q('p6','DNP means…',['Do Not Place','Double Not Plated','Data Not Provided','Direct Net Path'],'Left unfitted for this variant.');
Q('p6','Drill files are usually in which format?',['Excellon','Gerber X2','PDF','STEP'],'Excellon NC drill.');
Q('p6','Every part placed backwards in a batch often points to…',['A rotation error in the centroid file','A bad reel','Wrong paste','Low humidity'],'Systematic program error.');
Q('p6','MPN stands for…',['Manufacturer Part Number','Main Power Net','Machine Placement Note','Mask Pad Number'],'Exact orderable part.');

C('pcb','FR-4','Standard substrate: woven fibreglass + epoxy, flame retardant.');
C('pcb','Standard PCB thickness','1.6 mm');
C('pcb','1 oz copper','≈ 35 µm thick');
C('pcb','Solder mask','Coloured coating over copper — prevents bridges, protects.');
C('pcb','Silkscreen','Printed text: designators, outlines, polarity, logos.');
C('pcb','Tg','Glass transition temp of laminate (~130–170 °C).');
C('pcb','Prepreg','Resin-soaked glass sheet used to laminate multilayer boards.');
C('pcb','Thermal relief','Spoked pad connection to a plane — easier to solder.');
C('pcb','Creepage vs clearance','Creepage = along the surface. Clearance = through air.');
C('pcb','Via','Plated hole joining layers (through, blind, buried, micro).');
C('pcb','Blind via','Outer layer → inner layer.');
C('pcb','Buried via','Inner ↔ inner only.');
C('pcb','PTH / NPTH','Plated through hole / non-plated through hole.');
C('pcb','Annular ring','Copper ring around a drilled hole.');
C('pcb','Wicking','Solder drawn away down a via or lead.');
C('pcb','HASL','Hot Air Solder Levelling — cheap, uneven.');
C('pcb','ENIG','Electroless Nickel Immersion Gold — flat, gold colour. Risk: black pad.');
C('pcb','OSP','Organic coating on copper — flat, cheap, short shelf life.');
C('pcb','Hard gold','Thick plated gold for edge connector fingers.');
C('pcb','Fiducial','Copper dot for machine vision alignment (global & local).');
C('pcb','V-score','Grooves for snapping panel apart.');
C('pcb','Mouse bites','Perforated break-away tabs.');
C('pcb','X-out','Mark on a bad board in a panel — skip it.');
C('pcb','Gerber','Layer image file format (RS-274X / X2).');
C('pcb','Excellon','Drill file format.');
C('pcb','BOM','Bill of Materials: designator, qty, value, package, MPN.');
C('pcb','Centroid / XY file','Part X, Y, rotation and side for pick & place.');
C('pcb','DNP / DNF','Do Not Place / Do Not Fit.');
C('pcb','ECO / ECN','Engineering Change Order / Notice.');
C('pcb','Castellated holes','Half-plated edge holes for board-on-board modules.');

/* ============================ MODULE 10: SMT PROCESS ============================ */
M.push({ id: 'smt', title: 'The SMT Line', icon: '🏭', color: '#ff9f43',
 blurb: 'Stencils, paste, SPI, pick and place, reflow, AOI and X-ray.',
 lessons: [
 { id: 's1', title: 'The SMT line overview', body: `
<p>A typical surface-mount line runs in this order:</p>
<ol class="steps"><li><b>Board loader</b> — feeds bare PCBs (often laser-marked with a serial/barcode).</li>
<li><b>Stencil printer</b> — prints solder paste onto pads.</li>
<li><b>SPI</b> — Solder Paste Inspection measures paste volume, height and position in 3D.</li>
<li><b>Pick and place</b> — places components onto the wet paste.</li>
<li><b>Pre-reflow AOI</b> (optional) — checks placement before soldering.</li>
<li><b>Reflow oven</b> — melts the paste to form joints.</li>
<li><b>Post-reflow AOI</b> — Automated Optical Inspection of solder joints and parts.</li>
<li><b>X-ray (AXI)</b> — for hidden joints like BGAs and QFNs.</li>
<li><b>Unloader</b> — racks finished boards.</li></ol>
<p>Double-sided boards go through twice — usually the lighter side first, so heavier parts aren't hanging upside down during the second reflow (surface tension holds small parts on).</p>
<p>After SMT, boards may go to THT/selective soldering, conformal coating, test and box build.</p>
<h3>Key concepts</h3>
<ul><li><b>Changeover</b> — swapping feeders, stencil and programs for a new job.</li>
<li><b>First article inspection (FAI)</b> — checking the first board fully against BOM and drawings before running the batch.</li>
<li><b>Traceability</b> — recording which reels/lots went on which board serial.</li>
<li><b>Line balancing / cycle time</b> — the slowest machine sets the pace.</li></ul>` },

 { id: 's2', title: 'Solder paste and stencils', body: `
<h3>Solder paste</h3>
<p>Tiny solder balls (powder) suspended in <b>flux</b>. Roughly 88–90% metal by weight, but about 50% by volume.</p>
<ul><li><b>Lead-free</b>: usually <b>SAC305</b> (Sn 96.5 / Ag 3 / Cu 0.5) — melts at ~<b>217–220 °C</b>.</li>
<li><b>Leaded</b>: <b>Sn63/Pb37</b> — eutectic, melts at <b>183 °C</b>. Still used in some aerospace/military work. RoHS restricts lead.</li>
<li><b>Type 3, 4, 5</b> — powder particle size. Higher number = finer powder for smaller apertures (Type 4 is common for 0402 / fine pitch).</li>
<li><b>Flux types</b> — no-clean (residue can be left), water-soluble (must be washed), rosin.</li></ul>
<h3>Handling paste</h3>
<p>Stored in a fridge (~2–10 °C). Let it reach <b>room temperature (≈4 hours) before opening</b>, or moisture condenses in it → solder balls and spatter. Track its open time and stencil life. Stir before use. Don't mix old and new.</p>
<h3>Stencils</h3>
<p>Laser-cut stainless steel sheet with apertures matching the pads. Typical thickness <b>100–150 µm</b> (4–6 thou). Step stencils vary thickness for mixed parts.</p>
<h3>Printing</h3>
<ul><li><b>Squeegee</b> pushes paste across the stencil at a set speed, pressure and angle.</li>
<li><b>Separation speed</b> — how the board drops away matters for clean release.</li>
<li><b>Under-stencil wipe</b> — cleans the underside every few prints to prevent smearing and bridges.</li>
<li><b>Transfer efficiency / area ratio</b> — small apertures release paste poorly. Area ratio should be ≥ 0.66.</li></ul>
<p>Print faults: insufficient, excess, smearing, misalignment, slumping (paste spreading), bridging, dog-ears/peaking.</p>` },

 { id: 's3', title: 'Pick and place machines', body: `
<p>Pick-and-place machines take parts from feeders and place them onto the pasted board at high speed — tens of thousands of components per hour.</p>
<h3>Component packaging</h3>
<ul><li><b>Tape and reel</b> — embossed or paper tape with a cover tape. Most common. Tape widths 8, 12, 16, 24 mm+. 8 mm tape with 2 mm or 4 mm pitch for small chips.</li>
<li><b>Trays</b> — JEDEC trays for large ICs (QFP, BGA).</li>
<li><b>Tubes / sticks</b> — for SOICs, older parts.</li>
<li><b>Bulk</b> — loose, rare for placement.</li></ul>
<h3>The process</h3>
<ul><li><b>Feeders</b> advance tape to the pickup point.</li>
<li><b>Nozzles</b> pick parts by <b>vacuum</b>. Different nozzle sizes for different parts.</li>
<li><b>Vision</b> — cameras check each part (centring, rotation, lead check) and fiducials on the board.</li>
<li>Part is placed at the correct X/Y/rotation with controlled force.</li></ul>
<h3>Common placement problems</h3>
<ul><li><b>Mispicks</b> — nozzle fails to pick (empty tape, wrong pickup position, blocked nozzle).</li>
<li><b>Wrong part / wrong reel</b> — feeder loaded in the wrong slot. Prevented by barcode <b>feeder verification</b>.</li>
<li><b>Rotation errors</b> — program/library error.</li>
<li><b>Tombstone or skew</b> if placement off-centre.</li>
<li><b>Splicing</b> — joining a new reel to the end of the old one with splice tape to avoid stopping.</li></ul>
<div class="job"><b>Reel labels:</b> always check part number, value, lot/date code and MSL on the reel against the feeder list before loading.</div>` },

 { id: 's4', title: 'Reflow soldering', body: `
<p>The reflow oven heats the board through carefully controlled zones on a conveyor (convection, sometimes vapour phase).</p>
<h3>The reflow profile</h3>
<ol class="steps"><li><b>Preheat / ramp</b> — warm gradually, ~1–3 °C per second. Too fast = thermal shock, spatter.</li>
<li><b>Soak</b> — ~150–200 °C for 60–120 s. Evens out temperature across big and small parts and activates the flux.</li>
<li><b>Reflow (peak)</b> — above liquidus (~217 °C for SAC305) for <b>45–90 s</b> (time above liquidus, TAL). Peak ~<b>235–250 °C</b>.</li>
<li><b>Cooling</b> — controlled cool-down gives a fine grain structure for strong joints.</li></ol>
<p>Two common shapes: <b>ramp-soak-spike</b> and <b>ramp-to-spike (linear)</b>.</p>
<h3>Profiling</h3>
<p>A <b>profiler</b> with thermocouples attached to a real board runs through the oven to record actual temperatures — especially on big thermal-mass parts and small sensitive parts. The <b>component datasheets</b> give maximum peak temperatures (often 260 °C).</p>
<h3>Nitrogen reflow</h3>
<p>Running the oven with nitrogen reduces oxidation for better wetting and shinier joints.</p>
<h3>Profile problems</h3>
<ul><li>Too cold → <b>cold / grainy joints</b>, unmelted paste, head-in-pillow.</li>
<li>Too hot / too long → damaged parts, discoloured boards, excessive intermetallics.</li>
<li>Ramp too fast → solder balls, tombstoning, cracked caps.</li></ul>` },

 { id: 's5', title: 'Inspection: SPI, AOI and X-ray', body: `
<h3>SPI — Solder Paste Inspection</h3>
<p>3D measurement of each paste deposit: <b>volume, area, height, offset</b>. Industry studies say most SMT defects start at the print stage, so catching them here is cheapest.</p>
<h3>AOI — Automated Optical Inspection</h3>
<p>Cameras with different lighting compare the board to a programmed "golden" standard. Checks:</p>
<ul><li>Missing, wrong, or extra parts</li><li>Polarity and rotation</li><li>Offset/skew, tombstoning, billboarding</li><li>Solder fillets, bridges, insufficient solder, lifted leads</li><li>OCR of part markings</li></ul>
<p><b>False calls</b> — AOI flags something that's actually fine. An operator reviews each call at a <b>verification station</b>. Too many false calls wastes time; too few settings let real defects escape.</p>
<h3>AXI — Automated X-ray Inspection</h3>
<p>Sees through packages to inspect hidden joints: <b>BGA balls, QFN thermal pads, voids</b>, bridges under parts, head-in-pillow, and THT barrel fill.</p>
<h3>Manual visual inspection</h3>
<p>With a microscope or magnifier, against <b>IPC-A-610</b> criteria. Use good lighting and view joints from several angles.</p>
<div class="job"><b>On the line:</b> when you confirm a real defect at AOI review, record it properly — defect data feeds back to fix printer, placement or profile issues.</div>` },

 { id: 's6', title: 'Moisture sensitivity (MSL)', body: `
<p>Plastic IC packages absorb moisture from the air. In reflow, that moisture turns to steam and can crack the package or delaminate it internally — called <b>"popcorning"</b>.</p>
<h3>MSL levels (J-STD-020/033)</h3>
<table class="tbl"><tr><th>MSL</th><th>Floor life (≤30 °C/60% RH)</th></tr>
<tr><td>1</td><td>Unlimited</td></tr><tr><td>2</td><td>1 year</td></tr><tr><td>2a</td><td>4 weeks</td></tr><tr><td>3</td><td>168 hours (1 week)</td></tr><tr><td>4</td><td>72 hours</td></tr><tr><td>5</td><td>48 hours</td></tr><tr><td>5a</td><td>24 hours</td></tr><tr><td>6</td><td>Must bake before use (time on label)</td></tr></table>
<h3>Handling</h3>
<ul><li>Parts ship in a <b>Moisture Barrier Bag (MBB)</b> with <b>desiccant</b> and a <b>Humidity Indicator Card (HIC)</b>.</li>
<li>When opened, the floor life clock starts — record the open time.</li>
<li>If the HIC shows too much humidity, or floor life is exceeded, parts must be <b>baked</b> (e.g. 125 °C for a set number of hours, per the standard) before use.</li>
<li>Unused parts go back in dry storage (dry cabinets) or are resealed with fresh desiccant — this can pause the clock.</li></ul>
<p>The MSL level is printed on the <b>caution label</b> of the bag.</p>
<div class="tip">Reels of MLCCs and resistors are MSL 1. BGAs, QFNs, and large ICs are often MSL 3 or higher.</div>` },

 { id: 's7', title: 'SMD packages', body: `
<h3>Chip (passive) sizes — imperial codes</h3>
<table class="tbl"><tr><th>Imperial</th><th>Metric</th><th>Size (mm)</th></tr>
<tr><td>01005</td><td>0402M</td><td>0.4 × 0.2</td></tr><tr><td>0201</td><td>0603M</td><td>0.6 × 0.3</td></tr><tr><td>0402</td><td>1005M</td><td>1.0 × 0.5</td></tr><tr><td>0603</td><td>1608M</td><td>1.6 × 0.8</td></tr><tr><td>0805</td><td>2012M</td><td>2.0 × 1.25</td></tr><tr><td>1206</td><td>3216M</td><td>3.2 × 1.6</td></tr><tr><td>1210</td><td>3225M</td><td>3.2 × 2.5</td></tr><tr><td>2512</td><td>6332M</td><td>6.4 × 3.2</td></tr></table>
<div class="tip">Watch out — "0603" metric is the same as "0201" imperial! Always confirm which system a BOM uses.</div>
<h3>Discrete packages</h3>
<p><b>SOD-123, SOD-323, SOD-523</b> (diodes), <b>SMA/SMB/SMC</b> (power diodes), <b>SOT-23, SOT-23-5/6, SOT-89, SOT-223</b>, <b>DPAK</b>.</p>
<h3>IC packages with leads</h3>
<ul><li><b>SOIC</b> — gull-wing leads both sides, 1.27 mm pitch.</li>
<li><b>SSOP / TSSOP / MSOP</b> — shrunk/thin versions, 0.65 mm or 0.5 mm pitch.</li>
<li><b>QFP / LQFP / TQFP</b> — gull-wing leads on all four sides, down to 0.4 mm pitch.</li>
<li><b>PLCC</b> — J-leads curled under the body (fits sockets).</li></ul>
<h3>Leadless and array packages</h3>
<ul><li><b>QFN / DFN</b> — pads under the edges and a big centre thermal pad. Small and good thermally, but joints are hard to see.</li>
<li><b>BGA</b> — solder balls in a grid under the body. Lots of connections; needs X-ray to inspect.</li>
<li><b>CSP / WLCSP</b> — chip-scale, barely bigger than the die.</li>
<li><b>LGA</b> — flat lands, no balls.</li></ul>
<p><b>Pitch</b> = centre-to-centre distance between pins. Fine pitch (≤0.5 mm) is harder to print and inspect.</p>` },
 ]});

Q('s1','What is the usual order on an SMT line?',['Print → SPI → Place → Reflow → AOI','Place → Print → Reflow → AOI','Reflow → Print → Place','AOI → Print → Place → Reflow'],'Paste first, inspect it, then place and solder.');
Q('s1','SPI stands for…',['Solder Paste Inspection','Surface Placement Index','Serial Peripheral Interface (in SMT)','Standard Pad Inspection'],'(SPI is also a comms bus, but on the line it’s paste inspection.)');
Q('s1','First Article Inspection is…',['Fully checking the first board before running the batch','Inspecting the final board','A customer audit','X-raying every board'],'Catches program/setup errors early.');
Q('s1','On double-sided boards, which side usually reflows first?',['The side with lighter/fewer parts','The heaviest side','Doesn’t matter','Both at once'],'Light parts are held by surface tension on the second pass.');
Q('s1','Traceability means…',['Recording which component lots went on which board','Tracing tracks on the PCB','Following the conveyor','Logging operator breaks'],'Essential for recalls.');
Q('s1','AOI stands for…',['Automated Optical Inspection','Assembly Order Instruction','Automatic Oven Interface','Advanced Optical Imaging'],'Camera-based inspection.');
Q('s2','SAC305 melts at about…',['217–220 °C','183 °C','260 °C','150 °C'],'Lead-free tin-silver-copper.');
Q('s2','Sn63/Pb37 melts at…',['183 °C','217 °C','232 °C','300 °C'],'Eutectic leaded solder.');
Q('s2','Why let paste reach room temperature before opening?',['To stop moisture condensing in it','To make it thinner','To activate the flux','It doesn’t matter'],'Condensation causes solder balls.');
Q('s2','A higher paste "Type" number means…',['Finer powder particles','More flux','Higher melting point','Leaded'],'Type 4/5 for fine apertures.');
Q('s2','Typical stencil thickness is…',['100–150 µm','1–2 mm','10 µm','500 µm'],'4–6 thou.');
Q('s2','Why do an under-stencil wipe?',['Prevent smearing and bridges','Cool the stencil','Add flux','Align fiducials'],'Paste builds up under the stencil.');
Q('s2','SAC305 composition is…',['Sn 96.5%, Ag 3%, Cu 0.5%','Sn 63%, Pb 37%','Sn 99.3%, Cu 0.7%','Ag 30%, Cu 5%'],'Tin-silver-copper.');
Q('s2','Solder paste is stored…',['In a fridge (~2–10 °C)','In a hot cabinet','In the freezer at −40 °C always','Open on the bench'],'Cold storage extends life.');
Q('s2','Minimum recommended stencil area ratio is about…',['0.66','0.1','2.0','10'],'Below this paste release suffers.');
Q('s3','Pick-and-place nozzles hold parts by…',['Vacuum','Magnets','Glue','Clamps'],'Suction.');
Q('s3','The most common packaging for SMD parts is…',['Tape and reel','Bulk bags','Tubes','Trays'],'Embossed or paper tape.');
Q('s3','Splicing is…',['Joining a new reel onto the old one','Cutting a board','Mixing paste','Changing nozzles'],'Avoids stopping the machine.');
Q('s3','Feeder verification with barcodes prevents…',['Wrong reel in the wrong slot','Tombstoning','Voids','Cold joints'],'Ensures correct part per slot.');
Q('s3','Large ICs like BGAs usually come in…',['JEDEC trays','8 mm tape','Bulk bags','Paper tape'],'Trays protect them.');
Q('s3','A mispick is…',['The nozzle failing to pick a part','Placing the wrong part','A bridge','A crack'],'Empty pocket, bad pickup, blocked nozzle.');
Q('s3','Small chip parts usually come in tape that is…',['8 mm wide','24 mm wide','44 mm wide','2 mm wide'],'8 mm tape, 2 or 4 mm pitch.');
Q('s4','The soak zone is mainly to…',['Even out temperatures and activate flux','Melt the solder','Cool the board','Dry the stencil'],'Reduces ΔT across the board.');
Q('s4','Typical peak temperature for SAC305 reflow is…',['235–250 °C','183 °C','300 °C','200 °C'],'Above liquidus but below part limits.');
Q('s4','TAL stands for…',['Time Above Liquidus','Total Assembly Load','Temperature At Limit','Thermal Area Layout'],'Usually 45–90 s.');
Q('s4','A ramp rate that is too fast can cause…',['Solder balls and cracked caps','Better joints','Head-in-pillow only','Nothing'],'Thermal shock and spatter.');
Q('s4','Profiling is done using…',['Thermocouples on a real board','AOI cameras','The stencil','A multimeter'],'A profiler logs actual temperatures.');
Q('s4','Nitrogen in reflow helps by…',['Reducing oxidation','Cooling faster','Adding flux','Lowering the melting point'],'Better wetting.');
Q('s4','Not enough heat in reflow can cause…',['Cold/grainy joints and unmelted paste','Burnt boards','Delamination','Overly shiny joints'],'Paste never fully melts.');
Q('s5','Which inspection is needed for BGA joints?',['X-ray','AOI','SPI','Visual'],'Joints are hidden under the package.');
Q('s5','An AOI false call is…',['A flagged defect that is actually fine','A missed defect','A machine fault','A good board'],'Operator verifies.');
Q('s5','SPI measures paste…',['Volume, area, height and offset','Melting point','Flux type','Shelf life'],'3D measurement.');
Q('s5','The IPC standard for acceptability of assemblies is…',['IPC-A-610','IPC-2221','J-STD-020','IPC-6012'],'IPC-A-610.');
Q('s5','Voids in solder joints are best detected by…',['X-ray','AOI','Visual','ICT'],'Gas pockets inside the joint.');
Q('s5','Many SMT defects start at…',['The paste printing stage','Packing','Final test','Goods-in'],'Print quality matters most.');
Q('s6','MSL stands for…',['Moisture Sensitivity Level','Maximum Solder Limit','Machine Speed Level','Mask Solder Layer'],'Per J-STD-020/033.');
Q('s6','Floor life of an MSL 3 part is…',['168 hours','Unlimited','24 hours','1 year'],'One week at ≤30 °C/60% RH.');
Q('s6','Popcorning is…',['Package cracking from moisture turning to steam','A paste defect','Solder balls','A test failure'],'Moisture expands violently in reflow.');
Q('s6','If floor life is exceeded, parts should be…',['Baked before use','Used immediately','Scrapped always','Washed'],'Bake to drive out moisture.');
Q('s6','The card in a moisture barrier bag that shows humidity is the…',['HIC','MBB','ESD card','CoC'],'Humidity Indicator Card.');
Q('s6','Most resistors and MLCCs are MSL…',['1','3','5a','6'],'Not moisture-sensitive.');
Q('s6','MSL 6 parts must be…',['Baked before use','Used within a year','Kept frozen','Hand soldered only'],'Mandatory bake.');
Q('s7','0603 imperial is about…',['1.6 × 0.8 mm','0.6 × 0.3 mm','6 × 3 mm','3.2 × 1.6 mm'],'Metric code 1608.');
Q('s7','0402 imperial is about…',['1.0 × 0.5 mm','0.4 × 0.2 mm','4 × 2 mm','2 × 1.25 mm'],'Metric 1005.');
Q('s7','"0603 metric" is the same as…',['0201 imperial','0603 imperial','0402 imperial','1206 imperial'],'Classic confusion!');
Q('s7','QFN packages have…',['Pads under the edges and a centre thermal pad','Gull-wing leads','Balls in a grid','J-leads'],'Quad Flat No-lead.');
Q('s7','A package with leads on all four sides is…',['QFP','SOIC','SOT-23','DFN'],'Quad Flat Package.');
Q('s7','SOIC pin pitch is…',['1.27 mm','0.5 mm','2.54 mm','0.4 mm'],'0.05".');
Q('s7','PLCC packages have…',['J-leads curled under','Gull-wing leads','No leads','Balls'],'Plastic leaded chip carrier.');
Q('s7','Pitch is…',['Centre-to-centre distance between pins','The package height','The angle of the leads','Pad width'],'Fine pitch ≤ 0.5 mm.');
Q('s7','0805 imperial is about…',['2.0 × 1.25 mm','0.8 × 0.5 mm','8 × 5 mm','1.6 × 0.8 mm'],'Metric 2012.');

C('smt','SMT line order','Loader → Printer → SPI → Pick & place → Reflow → AOI → (X-ray) → Unloader');
C('smt','SAC305','Sn96.5/Ag3/Cu0.5 lead-free; melts ~217–220 °C');
C('smt','Sn63/Pb37','Eutectic leaded solder; melts 183 °C');
C('smt','Paste handling','Fridge 2–10 °C; warm to room temp (~4 h) before opening; stir.');
C('smt','Paste Type 3/4/5','Powder size — higher = finer (fine pitch).');
C('smt','Stencil thickness','Typically 100–150 µm (4–6 thou).');
C('smt','Area ratio','Aperture area ÷ wall area; ≥ 0.66 for good release.');
C('smt','Under-stencil wipe','Cleans stencil underside to prevent bridges/smears.');
C('smt','Feeders','Advance tape-and-reel parts to the pick-up point.');
C('smt','Splice','Join a new reel’s tape to the old one without stopping.');
C('smt','Reflow profile zones','Preheat → Soak → Reflow (peak) → Cooling');
C('smt','Preheat ramp rate','≈ 1–3 °C/s');
C('smt','Soak zone','≈ 150–200 °C, 60–120 s — evens temps, activates flux.');
C('smt','TAL','Time Above Liquidus, ~45–90 s.');
C('smt','SAC305 peak temp','≈ 235–250 °C');
C('smt','Profiler','Thermocouples on a real board record oven temperatures.');
C('smt','SPI measures','Paste volume, area, height, offset (3D).');
C('smt','AOI checks','Missing/wrong parts, polarity, offset, bridges, fillets, tombstones.');
C('smt','False call','AOI flags a good joint as defective.');
C('smt','AXI / X-ray','Inspects hidden joints: BGA, QFN, voids.');
C('smt','FAI','First Article Inspection — check first board fully before the run.');
C('smt','MSL','Moisture Sensitivity Level (1 = unlimited … 6 = bake before use).');
C('smt','MSL 3 floor life','168 hours at ≤30 °C/60% RH');
C('smt','Popcorning','Moisture → steam in reflow cracks the IC package.');
C('smt','MBB / HIC','Moisture barrier bag / humidity indicator card.');
C('smt','0402 / 0603 / 0805 / 1206','1.0×0.5 / 1.6×0.8 / 2.0×1.25 / 3.2×1.6 mm');
C('smt','Imperial vs metric trap','0603 metric = 0201 imperial!');
C('smt','SOIC','Gull-wing leads both sides, 1.27 mm pitch.');
C('smt','TSSOP','Thin shrink SOIC, 0.65 mm pitch typical.');
C('smt','QFP','Gull-wing leads on 4 sides.');
C('smt','QFN / DFN','No leads — edge pads + centre thermal pad.');
C('smt','BGA','Ball grid array under the body — X-ray to inspect.');
C('smt','PLCC','J-leads curled under the body.');
C('smt','Pitch','Centre-to-centre pin spacing. Fine pitch ≤ 0.5 mm.');
C('smt','Nitrogen reflow','Reduces oxidation for better wetting.');
})();
