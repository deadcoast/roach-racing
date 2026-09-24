/* W07 authored biological catalogue. Numbers are normalized experimental profiles.
 * A product is a preparation of anatomy, not a new genome or a generic rarity buff. */
(function (root) {
    'use strict';
    const cp = x => JSON.parse(JSON.stringify(x));
    const FORMS = {
        hopper: { name: 'Switchyard hopper', form: 'HOPPER', family: 'Suspension / active mobility', habitat: 'Switchyard Verge', sign: 'Paired release and clean recovery after a short hop.', seek: 'Keep synchronized legs to complement a high-return line; distance alone is misleading.', colour: '#c3944e', products: ['hoppers', 'springknees'], livePrice: 8, breedPrice: 20, facility: 'dry', stage: 'adult', region: 'hind_pair', profile: { count: 6, hatch: 2, stages: [[2, 'nymph'], [5, 'adult']], success: .88, survival: .85, cost: 6 }, traits: [['return', 'Elastic return', 'ratio', .55, .075, 'higher'], ['phase', 'Release mismatch', 'T', .12, -.05, 'lower'], ['settle', 'Settling time', 'T', .18, -.06, 'lower']] },
        cicada: { name: 'Furnace cicada', form: 'CICADA', family: 'Motor', habitat: 'Cooling-kiln Galleries', sign: 'Rhythmic loaded movement; intact thorax, not loudness.', seek: 'Select cadence, force and useful work per reserve unit independently. Efficiency now reaches the race.', colour: '#b85d48', products: ['redline'], livePrice: 10, breedPrice: 24, facility: 'root', stage: 'adult', region: 'drive', profile: { count: 4, hatch: 2, stages: [[2, 'root_nymph'], [7, 'adult']], success: .82, survival: .85, cost: 7 }, traits: [['cadence', 'Loaded cadence', 'cycles/T', 9, 1.5, 'higher'], ['force', 'Drive force', 'F', 1.9, .35, 'higher'], ['efficiency', 'Drive efficiency', 'ratio', .7, .035, 'higher']] },
        scarab: { name: 'Kilnback scarab', form: 'SCARAB', family: 'Motor / frame', habitat: 'Furnace Compost Beds', sign: 'Short loaded pushes; interlocking inner plates; do not grade by shell size.', seek: 'Strong support at ordinary mass creates frame stock; thick working muscles supply a different product.', colour: '#b5a28a', products: ['torque', 'boxbrace'], livePrice: 10, breedPrice: 24, facility: 'soil', stage: 'adult', region: 'drive', profile: { count: 4, hatch: 2, stages: [[2, 'grub'], [5, 'pupa'], [7, 'adult']], success: .86, survival: .88, cost: 7 }, traits: [['force', 'Drive force', 'F', 3.5, .45, 'higher'], ['support', 'Lateral support', 'F', .6, .25, 'higher'], ['density', 'Structural mass', 'M', .28, -.04, 'lower']] },
        mole: { name: 'Ballast mole cricket', form: 'MOLE', family: 'Gears / tires', habitat: 'Ballast Banks', sign: 'Intact short hip levers, toothed toes, grit-free joints.', seek: 'Lowstep leverage serves loaded starts; purchase on ash supplies a separate contact product.', colour: '#b69365', products: ['lowstep', 'cleats'], livePrice: 9, breedPrice: 22, facility: 'soil', stage: 'adult', region: 'hip_levers', profile: { count: 5, hatch: 2, stages: [[2, 'burrow_nymph'], [6, 'adult']], success: .85, survival: .88, cost: 6 }, traits: [['ratio', 'Mechanical advantage', 'ratio', 1.18, .12, 'higher'], ['roughGrip', 'Loose-surface purchase', 'ratio', 1.25, .15, 'higher'], ['release', 'Foot release delay', 'T', .05, -.012, 'lower']] },
        stick: { name: 'Glassfoot stick insect', form: 'STICK', family: 'Tires / contact material', habitat: 'Glazed Overgrowth', sign: 'Pad attachment followed by release; inspect clean surfaces under comparable conditions.', seek: 'Grip and release are distinct. A sticky but slow foot can bottleneck a high-cadence build.', colour: '#acb49b', products: ['sticktoe'], livePrice: 9, breedPrice: 22, facility: 'reed', stage: 'adult', region: 'contact_pads', profile: { count: 5, hatch: 3, stages: [[3, 'nymph'], [7, 'adult']], success: .9, survival: .88, cost: 6 }, traits: [['grip', 'Clean purchase', 'ratio', 1.15, .15, 'higher'], ['release', 'Foot release delay', 'T', .07, -.025, 'lower'], ['dust', 'Dust retention', 'ratio', .68, .12, 'higher']] },
        wax: { name: 'Reservoir waxmoth', form: 'WAX', family: 'Battery / rebound damper', habitat: 'Insulation Cavities', sign: 'Supported feeding larvae, not swollen recent gut contents; retain some to adulthood.', seek: 'Harvest larval fatbody for energy OR a prepared damper. Adult breeders are not the same usable tissue stage.', colour: '#d2b37d', products: ['fatbody', 'keel'], livePrice: 9, breedPrice: 24, facility: 'drawer', stage: 'larva', region: 'fatbody', profile: { count: 6, hatch: 1, stages: [[1, 'larva'], [4, 'pupa'], [6, 'adult']], success: .9, survival: .9, cost: 5 }, traits: [['capacity', 'Usable reserve', 'E', 155, 25, 'higher'], ['delivery', 'Delivery ceiling', 'E/T', 4, 1.5, 'higher'], ['damping', 'Rebound dissipation', 'ratio', .18, .16, 'higher']] },
        fly: { name: 'Sumpfly', form: 'FLY', family: 'Side stabilizer / sensing', habitat: 'Damp Service Voids', sign: 'Paired club-ended organs; controlled turns, not merely frantic flight.', seek: 'Low signal delay permits an earlier correction through existing limbs. Sensors supply no free force.', colour: '#8eb2aa', products: ['gyropods'], livePrice: 8, breedPrice: 20, facility: 'drawer', stage: 'adult', region: 'sensors', profile: { count: 5, hatch: 1, stages: [[1, 'larva'], [3, 'pupa'], [5, 'adult']], success: .88, survival: .86, cost: 5 }, traits: [['latency', 'Signal delay', 'T', .2, -.06, 'lower'], ['correction', 'Usable correction', 'ratio', .7, .1, 'higher'], ['mass', 'Paired organ mass', 'M', .07, -.012, 'lower']] },
        mantis: { name: 'Saltglass mantis', form: 'MANTIS', family: 'Grasp offense / support braces', habitat: 'Saltglass Perches', sign: 'Long useful reach with quick closure; isolate predatory stock in transit.', seek: 'Select fast closing arms for interception OR prepare the same limbs as disabled-attack counterbraces.', colour: '#bcb38a', products: ['catchclaws', 'counterbraces'], livePrice: 12, breedPrice: 28, facility: 'predator', stage: 'adult', region: 'forelimbs', profile: { count: 4, hatch: 2, stages: [[2, 'nymph'], [7, 'adult']], success: .78, survival: .85, cost: 8 }, traits: [['reach', 'Working reach', 'L', 1.2, .15, 'higher'], ['closure', 'Closure delay', 'T', .17, -.045, 'lower'], ['support', 'Brace extension', 'L', .1, .025, 'higher']] },
        horn: { name: 'Bullhorn beetle', form: 'HORN', family: 'Ram / front aero', habitat: 'Compost Undercrofts', sign: 'Intact root and useful curve; long tips can conceal weak bases.', seek: 'Preserve the horn-root assembly for attacks; separate head plates can become a browfoil.', colour: '#dfc69b', products: ['bullhorn', 'browfoil'], livePrice: 12, breedPrice: 28, facility: 'soil', stage: 'adult', region: 'horn', profile: { count: 4, hatch: 2, stages: [[2, 'grub'], [5, 'pupa'], [8, 'adult']], success: .85, survival: .88, cost: 7 }, traits: [['reach', 'Contact reach', 'L', 1.2, .12, 'higher'], ['impact', 'Transferred impact', 'ratio', .85, .15, 'higher'], ['vane', 'Shaped-plate hold-down', 'coefficient', .025, .0125, 'higher']] },
        moth: { name: 'Ashveil moth', form: 'MOTH', family: 'Front wing / aero', habitat: 'Textile Ruins', sign: 'Intact margins and stiff light veins; resting inspection preserves surfaces.', seek: 'Select high hold-down at modest drag, while retaining distinctive natural patterns for collectors.', colour: '#948b75', products: ['splitvanes'], livePrice: 9, breedPrice: 22, facility: 'drawer', stage: 'adult', region: 'wings', profile: { count: 5, hatch: 1, stages: [[1, 'larva'], [3, 'pupa'], [6, 'adult']], success: .88, survival: .87, cost: 6 }, traits: [['downforce', 'Hold-down', 'coefficient', .025, .015, 'higher'], ['drag', 'Air resistance', 'coefficient', .009, -.003, 'lower'], ['mass', 'Surface mass', 'M', .05, -.01, 'lower']] }
    };
    const FACILITIES = { dry: { name: 'Dry-bank nursery', cost: 0, note: 'Paired running stock; six committed places.' }, root: { name: 'Root-and-emergence cabinet', cost: 34, note: 'Root-fed juveniles then adult drive donors; seven-turn profile.' }, soil: { name: 'Deep-soil nursery', cost: 32, note: 'Burrowing young, pupation where required, protected emergence.' }, reed: { name: 'Vertical molt case', cost: 30, note: 'Climbing nymphs and room for intact pads to develop.' }, drawer: { name: 'Larval / pupation drawer', cost: 28, note: 'Stage selection: retain replacements instead of harvesting every larva.' }, predator: { name: 'Partitioned predator case', cost: 38, note: 'Controlled pairing and separated growing arms.' } };
    // Templates describe prepared geometry. Biological input values are computed from the actual donor.
    const PRODUCTS = {
        hoppers: { name: 'Grasshopper Hoppers', kind: 'hopper', template: 'H-6', regions: ['hind_pair'], vital: false, stages: ['adult'], price: 22, pcr: 'Suspension + RRR jump', purpose: 'One paired assembly carries launch and landing anatomy.' },
        springknees: { name: 'Locust Springknees', kind: 'suspension', regions: ['hind_pair'], vital: false, stages: ['adult'], price: 18, pcr: 'Suspension', purpose: 'Fit landing couplers to native hind legs. A complete Hopper already contains this tissue; the two are alternative builds.' },
        redline: { name: 'Cicada Redline', kind: 'drive', template: 'UPGRADE-DRIVE', regions: ['drive'], vital: true, stages: ['adult'], price: 30, pcr: 'Motor', purpose: 'Cadence, force and conversion efficiency feed motion and energy consumption separately.' },
        torque: { name: 'Scarab Torque Bundle', kind: 'drive', template: 'W05.TORQUE', regions: ['drive'], vital: true, stages: ['adult'], price: 28, pcr: 'Motor', purpose: 'High force at lower cadence; ratio is still a separate component choice.' },
        boxbrace: { name: 'Scarab Boxbrace', kind: 'frame', regions: ['support_plates'], vital: true, stages: ['adult'], price: 24, pcr: 'Frame', purpose: 'Lateral structural support changes the corner load limit at an actual carried mass. Not an armor score.' },
        lowstep: { name: 'Mole-Cricket Lowstep', kind: 'gear', regions: ['hip_levers'], vital: false, stages: ['adult'], price: 20, pcr: 'Gears', purpose: 'A prepared leverage ratio multiplies the fine-tuning setting; force and free stride speed move in opposite directions.' },
        cleats: { name: 'Mole-Cricket Cleats', kind: 'pads', template: 'W05.PADS', regions: ['toe_tips'], vital: false, stages: ['adult'], price: 18, pcr: 'Tires', purpose: 'Mechanical purchase on loose ash differs from performance on smooth enamel.' },
        sticktoe: { name: 'Sticktoe Contact Set', kind: 'pads', template: 'W05.PADS', regions: ['contact_pads'], vital: false, stages: ['adult'], price: 20, pcr: 'Tires', purpose: 'Purchase limits slip; peel delay changes usable cadence. The same feet do not gain extra traction from a rarity label.' },
        fatbody: { name: 'Waxmoth Fatbody', kind: 'reserve', template: 'W05.CROP', regions: ['fatbody'], vital: true, stages: ['larva'], price: 24, pcr: 'Battery', purpose: 'Capacity, delivery and loaded mass govern range and supplied power. Larva is the usable donor stage.' },
        keel: { name: 'Larval Keel', kind: 'damper', regions: ['fatbody'], vital: true, stages: ['larva'], price: 20, pcr: 'Physical Mini 4WD mass damper', purpose: 'The same larval tissue is allocated to a constrained damping assembly, not simultaneously to a second reservoir.' },
        gyropods: { name: 'Fly Gyropods', kind: 'stabilizer', regions: ['sensors'], vital: false, stages: ['adult'], price: 22, pcr: 'Side stabilizer — sensing alternative', purpose: 'Signal delay changes the correction rate supplied through available legs; no added force or armor.' },
        catchclaws: { name: 'Mantis Catchclaws', kind: 'claws', template: 'W05.CLAWS', regions: ['forelimbs'], vital: false, stages: ['adult'], price: 28, pcr: 'RRR derby extension', purpose: 'Reach and closure timing feed actual grasp attempts.' },
        counterbraces: { name: 'Mantis Counterbraces', kind: 'stabilizer', regions: ['forelimbs'], vital: false, stages: ['adult'], price: 22, pcr: 'Side stabilizer — physical support', purpose: 'Forelimbs are prepared as support-only lateral braces with grasp disabled. Added support competes with passing width.' },
        bullhorn: { name: 'Bullhorn Ram', kind: 'horn', template: 'W05.HORN', regions: ['horn'], vital: false, stages: ['adult'], price: 28, pcr: 'RRR derby extension', purpose: 'Root-supported contact, reach and impact alter an aligned charge.' },
        browfoil: { name: 'Beetle Browfoil', kind: 'vanes', template: 'W05.VANES', regions: ['head_plates'], vital: false, stages: ['adult'], price: 18, pcr: 'Front wing', purpose: 'Prepared head-shell vanes add hold-down and real modeled drag; they do not grant flight.' },
        splitvanes: { name: 'Ashveil Split-Vanes', kind: 'vanes', template: 'W05.VANES', regions: ['wings'], vital: false, stages: ['adult'], price: 20, pcr: 'Front wing', purpose: 'Light veined surfaces with selectable hold-down, drag and mass.' }
    };
    const GEOMETRY = {
        frame: { mass: .20, replaces: .15, default: { x: 0, y: .02, angle: 0 }, bounds: [-.07, .07, -.08, .12], layer: 'structural', roots: [[-.16, 0, .1, .50], [.16, 0, .1, .50]], roles: ['frame'] },
        gear: { mass: .08, replaces: .05, default: { x: 0, y: .13, angle: 0 }, bounds: [-.06, .06, .07, .20], layer: 'transmission', roots: [[0, 0, .27, .14]], roles: ['leverage'] },
        suspension: { mass: .12, replaces: .08, default: { x: 0, y: .31, angle: 0 }, bounds: [-.08, .08, .22, .42], layer: 'shell', roots: [[-.27, 0, .13, .18], [.27, 0, .13, .18]], roles: ['landing'] },
        damper: { mass: .13, replaces: 0, default: { x: 0, y: .22, angle: 0 }, bounds: [-.09, .09, .1, .38], layer: 'ventral', roots: [[0, 0, .16, .20]], roles: ['rebound'] },
        stabilizer: { mass: .07, replaces: 0, default: { x: 0, y: 0, angle: 0 }, bounds: [-.08, .08, -.10, .10], layer: 'support', roots: [[-.34, 0, .10, .13], [.34, 0, .10, .13]], roles: ['balance'] }
    };
    function traits(s) { const form = FORMS[s.kind]; if (!form)
        throw Error('Unknown donor'); return Object.fromEntries(form.traits.map(([key, , , base, step], i) => [key, Number((base + step * (s.genes[i][0] + s.genes[i][1])).toFixed(5))])); }
    function regions(kind) { if(kind==='roach')return ['body']; return [...new Set(FORMS[kind].products.flatMap(k => PRODUCTS[k].regions))]; }
    function productStats(s, key) {
        const t = traits(s);
        switch (key) {
            case 'hoppers': return { hopper: [t.return, t.phase, t.settle], max_preload: 6 };
            case 'springknees': return { settle: t.settle, impact_absorb: t.return };
            case 'redline': return { cadence: t.cadence, force: t.force, efficiency: t.efficiency };
            case 'torque': return { cadence: 9, force: t.force, efficiency: .75 };
            case 'boxbrace': return { support: t.support };
            case 'lowstep': return { ratio: t.ratio };
            case 'cleats': return { grip: .98, rough_grip: t.roughGrip, release: t.release };
            case 'sticktoe': return { grip: t.grip, rough_grip: t.grip * t.dust, release: t.release };
            case 'fatbody': return { reserve: t.capacity, delivery: t.delivery };
            case 'keel': return { damping: t.damping };
            case 'gyropods': return { correction: t.correction, latency: t.latency };
            case 'counterbraces': return { support_width: t.support, correction: .8, latency: t.closure };
            case 'catchclaws': return { reach: t.reach, closure: t.closure };
            case 'bullhorn': return { reach: t.reach, impact: t.impact };
            case 'browfoil': return { downforce: t.vane, drag: .007 };
            case 'splitvanes': return { downforce: t.downforce, drag: t.drag };
            default: throw Error('Unknown product');
        }
    }
    function descriptor(s, p, base) {
        const f = FORMS[s.kind], d = PRODUCTS[p.product];
        let a = d.template ? cp(base.find(x => x.id === d.template)) : { ...cp(GEOMETRY[d.kind]), stats: {} };
        const t = traits(s);
        a.id = p.id;
        a.name = d.name + ' · ' + s.id;
        a.short = d.name;
        a.kind = d.kind;
        a.donor = s.id;
        a.form = 'W02.DONOR.' + f.form;
        a.source = s.origin;
        a.origin = `Prepared turn ${p.created}; ${s.parents.length ? 'parents ' + s.parents.join(' × ') : 'individual donor'}`;
        a.purpose = d.purpose;
        a.colour = f.colour;
        a.signature = f.sign;
        a.product = p.product;
        a.pcr = d.pcr;
        a.stats = productStats(s, p.product);
        a.grade = 'TESTED ' + d.kind.toUpperCase();
        a.next = f.seek;
        a.measure = Object.entries(a.stats).map(([k, v]) => k.replace(/_/g, ' ') + ': ' + (Array.isArray(v) ? v.join(' / ') : Number(v).toFixed(3))).join(' · ');
        if (p.product === 'boxbrace')
            a.mass = t.density;
        if (p.product === 'gyropods')
            a.mass = t.mass;
        if (p.product === 'counterbraces') {
            a.mass = .17;
            a.roots = [[-.37, 0, .12, .2], [.37, 0, .12, .2]];
        }
        if (p.product === 'fatbody')
            a.mass = .17;
        if (p.product === 'splitvanes')
            a.mass = t.mass;
        a.observation = { protocol: 'W07.COMPONENT.1', values: cp(a.stats), donor: s.id };
        return a;
    }
    const KITS = [
        { id: 'CONTACT', name: 'Glassline / contact pair', tag: 'Tires + stabilizer', products: ['sticktoe', 'gyropods'], price: 59, purpose: 'Clean purchase, quick release and sensory correction. Build it on your existing roach.' },
        { id: 'LOAD', name: 'Lowstep / load kit', tag: 'Motor + gears + frame', products: ['torque', 'lowstep', 'boxbrace'], price: 96, purpose: 'Loaded force, mechanical advantage and supporting structure. Three distinct choices, not a set bonus.' },
        { id: 'HOP', name: 'Last Laugh / hop set', tag: 'Hoppers + reserve + damper', products: ['hoppers', 'fatbody', 'keel'], price: 84, purpose: 'A paired launch assembly, a separate energy donor and a separate damper donor. No duplicated fatbody.' }
    ];
    const MAP = [['Body', 'Host / native bodyform', 'Lowline, Needleback, Broadback', 'Native geometry, mass, stride and support; whole-host kits and inherited native profiles'], ['Tires', 'Foot-contact sets', 'sticktoe, cleats', 'purchase / release / surface response'], ['Frame', 'Thoracic brace', 'boxbrace', 'supported lateral load / carried mass'], ['Motor', 'Drive musculature', 'redline, torque', 'cadence / force / conversion efficiency'], ['Gears', 'Hip-lever assembly', 'lowstep', 'ratio × fine adjustment'], ['Battery', 'Metabolic reservoir', 'fatbody + existing Nectar Crop', 'capacity / delivery / fill mass'], ['Side Stabilizer', 'Sensors or support limbs', 'gyropods, counterbraces', 'correction rate or support footprint'], ['Suspension', 'Landing couplers', 'springknees or whole hoppers', 'settling / impact transfer'], ['Front Wing', 'Shell vanes', 'splitvanes, browfoil', 'hold-down / aerodynamic drag'], ['Mass dampers (physical hobby extension)', 'Rebound organ', 'keel', 'rebound damping; not a duplicate reservoir'], ['Weapons / active jump (RRR extension)', 'Horn / claws / hoppers', 'bullhorn, catchclaws, hoppers', 'race interaction; not PCR slot claims']];
    const api = { FORMS, FACILITIES, PRODUCTS, GEOMETRY, KITS, MAP, traits, regions, productStats, descriptor };
    root.RRRCatalog = api;
    if (typeof module !== 'undefined')
        module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
