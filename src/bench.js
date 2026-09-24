/* W05 workshop model. A local declared-stock experiment, not a live economy.
 * Drafting changes no custody. Committing installs unique actual items atomically.
 * Reusable grafts use an explicit supported bench-release fixture; not global biology.
 */
(function (root) {
    'use strict';
    const R = root.RRRRace || (typeof require === 'function' ? require('./race.js') : null), { req, finite, copy, clip } = R;
    const H = root.RRRHosts || (typeof require === 'function' ? require('./hosts.js') : null);
    const deepFreeze = x => { if (x && typeof x === 'object') {
        Object.freeze(x);
        Object.values(x).forEach(deepFreeze);
    } return x; };
    const CATALOG = [
        { id: 'UPGRADE-DRIVE', name: 'Cicada Redline', short: 'Redline', kind: 'drive', origin: 'Purchased from the Wave 3 brood margin', donor: 'DRIVE-DONOR', form: 'W02.DONOR.CICADA', source: 'Cooling-kiln / rooted pipe galleries', purpose: 'Loaded cadence and useful force; compare at the same hip leverage.', signature: 'Ribbed copper-red muscle lobes', mass: .12, replaces: .12, stats: { cadence: 12, force: 2.5 }, grade: 'MEASURED DRIVE', colour: '#b85d48', default: { x: 0, y: -.12, angle: 0 }, bounds: [-.12, .12, -.25, .05], layer: 'internal', roots: [[0, 0, .22, .24]], roles: ['drive'], measure: '12 cadence · 2.5 force', next: 'Cadence under load is the selection target. Loudness is not a test.' },
        { id: 'W05.TORQUE', name: 'Scarab Torque Bundle', short: 'Torque', kind: 'drive', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.SCARAB.D01', form: 'W02.DONOR.SCARAB', source: 'Cooling-kiln / protected furnace beds', purpose: 'More driving force at lower cadence. A replaceable primary drive cassette in this bench profile.', signature: 'Ivory muscle columns and dark seams', mass: .20, replaces: .12, stats: { cadence: 9, force: 4.1 }, grade: 'LOAD SPECIALIST', colour: '#b5a28a', default: { x: 0, y: -.12, angle: 0 }, bounds: [-.12, .12, -.25, .05], layer: 'internal', roots: [[0, 0, .24, .27]], roles: ['drive'], measure: '9 cadence · 4.1 force', next: 'Select force per muscle mass; grow-out supports the useful adult thorax.' },
        { id: 'H-6', name: 'Grasshopper Hoppers', short: 'Hoppers', kind: 'hopper', origin: 'B1 brood / inherited F1 pair from Wave 3', donor: 'B1-6', form: 'W02.DONOR.HOPPER', source: 'Switchyard line / P-R × P-S', purpose: 'One paired assembly supplies running limbs, stored launch and landing recovery.', signature: 'Folded amber femurs with joint bands', mass: .26, replaces: .18, stats: { hopper: [.625, .07, .06], max_preload: 6 }, grade: 'SELECTED INTERMEDIATE', colour: '#c3944e', default: { x: 0, y: .30, angle: 0 }, bounds: [-.15, .15, .1, .55], layer: 'shell', roots: [[-.27, 0, .13, .18], [.27, 0, .13, .18]], roles: ['hind_limbs', 'jump', 'landing'], measure: '62.5% return · .07 phase · .06 settle', next: 'Keep synchronized stock that complements a high-return line; this pair is useful F1 output, not a guaranteed champion.' },
        { id: 'W05.CROP', name: 'Nectar Crop', short: 'Nectar crop', kind: 'reserve', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.BEE.D01', form: 'W02.DONOR.BEE', source: 'Protected flowering plots / productive colony', purpose: 'High delivery feeds drive and active actions from the same reservoir.', signature: 'Translucent amber storage lobes', mass: .12, replaces: .10, stats: { delivery: 12, reserve: 150 }, grade: 'HIGH DELIVERY', colour: '#bf9c57', default: { x: 0, y: .39, angle: 0 }, bounds: [-.12, .12, .20, .6], layer: 'internal', roots: [[0, 0, .25, .29]], roles: ['reserve'], measure: '12 delivery · 150 capacity', next: 'A full crop is temporary state. Reproductive colony stock supplies recurring donor workers.' },
        { id: 'W05.PADS', name: 'Sticktoe Contact Set', short: 'Sticktoe', kind: 'pads', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.STICK.D01', form: 'W02.DONOR.STICK', source: 'Glasshouse / shaded glazed overgrowth', purpose: 'Front and middle contact surfaces affect available traction in the simplified running model.', signature: 'Four broad, pale contact pads', mass: .05, replaces: .035, stats: { grip: 1.23 }, grade: 'CONTACT SET', colour: '#b1b3a1', default: { x: 0, y: -.04, angle: 0 }, bounds: [-.08, .08, -.15, .06], layer: 'feet', roots: [[-.4, -.16, .11, .1], [.4, -.16, .11, .1], [-.4, .13, .11, .1], [.4, .13, .11, .1]], roles: ['front_contact', 'middle_contact'], measure: '1.23 contact multiplier', next: 'Breed purchase and peel release separately. Full pad-release gait is not simulated by this multiplier.' },
        { id: 'W05.HORN', name: 'Bullhorn Ram', short: 'Bullhorn', kind: 'horn', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.HORN.D01', form: 'W02.DONOR.HORN', source: 'Cooling-kiln / debris-covered compost', purpose: 'An aligned charge can disrupt a rival. Forward placement changes the modeled reach.', signature: 'Curved bone horn on a ribbed root', mass: .14, replaces: 0, stats: {}, grade: 'OFFENSIVE ASSEMBLY', colour: '#dfc69b', default: { x: 0, y: -.66, angle: 0 }, bounds: [-.16, .16, -.82, -.42], layer: 'shell', roots: [[0, 0, .13, .22]], roles: ['ram'], measure: 'Reach responds to placement', next: 'Select root strength and useful curvature; the longest horn is not automatically the strongest.' },
        { id: 'W05.CLAWS', name: 'Mantis Catchclaws', short: 'Catchclaws', kind: 'claws', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.MANTIS.D01', form: 'W02.DONOR.MANTIS', source: 'Saltglass / vertical scrub and perches', purpose: 'A timed counter-grasp can intercept a ram; it does not grant passive armor.', signature: 'Folded serrated forearms', mass: .20, replaces: 0, stats: {}, grade: 'COUNTER / CONTROL', colour: '#bcb38a', default: { x: 0, y: -.35, angle: 0 }, bounds: [-.12, .12, -.60, -.15], layer: 'shell', roots: [[-.26, 0, .14, .20], [.26, 0, .14, .20]], roles: ['grasp'], measure: 'Closure and reach reflect fit', next: 'Long reach matters when the arm still closes in time. Rearing requires protected individual compartments.' },
        { id: 'W05.VANES', name: 'Ashveil Split-Vanes', short: 'Split-vanes', kind: 'vanes', origin: 'Explicit W05 starter-stock endowment', donor: 'W05.MOTH.D01', form: 'W02.DONOR.MOTH', source: 'Sheltered textile ruins / intact adult margins', purpose: 'A small speed-dependent hold-down term increases contact load. This is stylized aero, not powered flight.', signature: 'Paired veined shell blades', mass: .04, replaces: 0, stats: { downforce: .035 }, grade: 'BROW AERO', colour: '#948b75', default: { x: 0, y: -.56, angle: 0 }, bounds: [-.12, .12, -.72, -.25], layer: 'shell', roots: [[-.23, 0, .13, .12], [.23, 0, .13, .12]], roles: ['aero'], measure: 'Speed-dependent hold-down', next: 'Select stiff light surfaces. Split mounting can coexist with a central horn; there is no one-brow-slot ban.' }
    ].map(deepFreeze);
    const byId = Object.fromEntries(CATALOG.map(v => [v.id, v]));
    const BASE = CATALOG.slice();
    function setExtras(extras) {
        CATALOG.splice(0, CATALOG.length, ...BASE);
        for (const k of Object.keys(byId))
            delete byId[k];
        for (const a of BASE)
            byId[a.id] = a;
        for (const a of extras) {
            req(a && typeof a.id === 'string' && /^W0[678][.]PART[.][A-Za-z0-9_.-]+$/.test(a.id), 'Invalid dynamic sect identity');
            req(!byId[a.id], 'Duplicate sect');
            const safe = deepFreeze(copy(a));
            CATALOG.push(safe);
            byId[a.id] = safe;
        }
    }
    const canonical = x => { if (Array.isArray(x))
        return '[' + x.map(canonical).join(',') + ']'; if (x && typeof x === 'object')
        return '{' + Object.keys(x).sort().map(k => JSON.stringify(k) + ':' + canonical(x[k])).join(',') + '}'; return JSON.stringify(x); };
    const DEFAULT = { name: 'SECOND HELPING', number: '06', livery: 'vermilion', placements: [{ id: 'H-6', ...copy(byId['H-6'].default) }], tuning: { leverage: 1, preload: 5, stance: .38, reserve_fraction: 1 }, approach: 'clean' };
    function initial() { return { schema: 'RRR.W05.SESSION.1', stock_profile: 'W05.BENCH.STOCK.1', host_id: 'HOST', revision: 1, draft: copy(DEFAULT), fitted: copy(DEFAULT), history: [], saved_cards: [], origin_note: 'W03 H-6 installed; UPGRADE-DRIVE purchased but loose. Six other sects and bench facilities are declared W05 endowments. Base host mass 1.60 is a normalized W05 profile, not a new canonical species scale.' }; }
    function initialHost(profile, name) {
        H.assertProfile(profile);
        const s = initial(); s.host_id=profile.id; s.host_profile=copy(profile);
        s.draft.placements=[]; s.draft.name=name || profile.name.toUpperCase(); s.draft.number='08';
        s.draft.livery=H.PLANS[profile.plan].colour; s.draft.tuning.stance=.38;
        s.fitted=copy(s.draft); s.origin_note='Whole living host with retained native anatomy. No kit components are fitted by purchase.';
        return s;
    }
    function strictKeys(obj, keys, label) { req(obj && typeof obj === 'object' && !Array.isArray(obj), `Invalid ${label}`); req(Object.keys(obj).every(k => keys.includes(k)), `Unknown field in ${label}`); req(keys.every(k => Object.hasOwn(obj, k)), `Missing field in ${label}`); }
    function validateDesign(d) {
        strictKeys(d, ['name', 'number', 'livery', 'placements', 'tuning', 'approach'], 'design');
        req(typeof d.name === 'string' && d.name.trim().length > 0 && d.name.length <= 32 && !/[\x00-\x1f]/.test(d.name), 'Name must contain 1–32 printable characters');
        req(typeof d.number === 'string' && /^\d{1,2}$/.test(d.number), 'Race number must have 1–2 digits');
        req(['vermilion', 'ochre', 'ivory'].includes(d.livery), 'Unknown finish');
        req(['clean', 'hopper', 'charge', 'counter', 'opportunist'].includes(d.approach), 'Unknown race approach');
        req(Array.isArray(d.placements) && d.placements.length <= CATALOG.length, 'Invalid placement list');
        const ids = d.placements.map(p => p.id);
        req(new Set(ids).size === ids.length, 'Duplicate component identity');
        for (const p of d.placements) {
            strictKeys(p, ['id', 'x', 'y', 'angle'], 'placement');
            req(Object.hasOwn(byId, p.id), 'Component not in owned stock');
            finite(p.x, 'x', -2);
            finite(p.y, 'y', -2);
            req(Math.abs(p.x) <= 2 && Math.abs(p.y) <= 2, 'Placement outside bench');
            finite(p.angle, 'angle', -30);
            req(p.angle <= 30, 'Angle outside bench profile');
        }
        strictKeys(d.tuning, ['leverage', 'preload', 'stance', 'reserve_fraction'], 'tuning');
        for (const [k, a, b] of [['leverage', .7, 1.5], ['preload', .25, 6], ['stance', .32, .62], ['reserve_fraction', .25, 1]]) {
            finite(d.tuning[k], k, a);
            req(d.tuning[k] <= b, `${k} outside profile`);
        }
        return d;
    }
    function rectVertices(p, rect) { const [cx, cy, w, h] = rect, a = p.angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]].map(([x, y]) => [p.x + x * c - y * s, p.y + x * s + y * c]); }
    function overlaps(a, b) { for (const poly of [a, b])
        for (let i = 0; i < poly.length; i++) {
            const j = (i + 1) % poly.length, axis = [-(poly[j][1] - poly[i][1]), poly[j][0] - poly[i][0]], project = p => p.map(v => v[0] * axis[0] + v[1] * axis[1]), pa = project(a), pb = project(b);
            if (Math.max(...pa) <= Math.min(...pb) + 1e-6 || Math.max(...pb) <= Math.min(...pa) + 1e-6)
                return false;
        } return true; }
    function fitting(d, host = null) {
        if(host)H.assertProfile(host);
        validateDesign(d);
        const issues = [];
        for (const kind of ['hopper', 'reserve', 'pads', 'horn', 'claws', 'vanes', 'frame', 'gear', 'stabilizer', 'suspension', 'damper']) {
            const same = d.placements.filter(p => byId[p.id].kind === kind);
            if (same.length > 1)
                issues.push({ kind: 'interface', ids: same.map(p => p.id), message: `This prepared host accepts one ${kind} assembly; return the other before fitting.` });
        }
        if (d.placements.some(p => byId[p.id].kind === 'hopper') && d.placements.some(p => byId[p.id].kind === 'suspension'))
            issues.push({ kind: 'interface', ids: d.placements.filter(p => ['hopper', 'suspension'].includes(byId[p.id].kind)).map(p => p.id), message: 'The complete Hopper pair already contains its landing joints. Use Springknees with native hind limbs, or the complete Hopper pair; a separate damper remains possible.' });
        const drives = d.placements.filter(p => byId[p.id].kind === 'drive');
        if (drives.length > 1)
            issues.push({ kind: 'interface', ids: drives.map(p => p.id), message: 'This starter host exposes one prepared primary-drive interface. Return one drive to the tray; multi-drive integration is outside this fixture.' });
        for (const p of d.placements) {
            const a = byId[p.id], b = host ? a.bounds.map((v,i)=>v*(i<2?host.scaleX:host.scaleY)) : a.bounds;
            if(host){const width=(a.layer==='feet'?.78:.56)*host.scaleX;
                if(a.roots.some(r=>rectVertices(p,r).some(([x,y])=>Math.abs(x)>width||y < -1.04*host.scaleY||y>.90*host.scaleY)))
                    issues.push({kind:'body_support',ids:[p.id],message:`${a.short}: root exceeds this ${host.name}'s supported tissue. Reposition or use a differently prepared assembly.`});
            }
            if (p.x < b[0] || p.x > b[1] || p.y < b[2] || p.y > b[3])
                issues.push({ kind: 'support', ids: [p.id], message: `${a.name}: root outside its supported preparation range. Move the highlighted root back to its fit region.` });
        }
        for (let i = 0; i < d.placements.length; i++)
            for (let j = i + 1; j < d.placements.length; j++) {
                const a = d.placements[i], b = d.placements[j], ca = byId[a.id], cb = byId[b.id];
                if (ca.layer === cb.layer && ca.roots.some(ra => cb.roots.some(rb => overlaps(rectVertices(a, ra), rectVertices(b, rb)))))
                    issues.push({ kind: 'interference', ids: [a.id, b.id], message: `${ca.short} and ${cb.short}: mounting roots occupy the same layer. Reposition either assembly.` });
            }
        return issues;
    }
    function compile(d, revision = 1, host = null) {
        if(host)H.assertProfile(host);
        validateDesign(d);
        const issues = fitting(d, host);
        req(!issues.length, issues[0]?.message || 'Invalid fitting');
        const parts = d.placements.map(p => byId[p.id]), find = k => parts.find(p => p.kind === k), pose = k => d.placements.find(p => byId[p.id].kind === k), drive = find('drive'), hopper = find('hopper'), crop = find('reserve'), pads = find('pads'), horn = find('horn'), claws = find('claws'), vanes = find('vanes');
        // Every component contributes its mass once, even when it supplies several roles.
        let mass = 1.60 + parts.reduce((n, p) => n + p.mass - p.replaces, 0) + (crop ? crop.stats.reserve : 120) * (d.tuning.reserve_fraction - 1) * .001;
        if(host){const reserve=(crop?crop.stats.reserve:host.reserve)*d.tuning.reserve_fraction;
            mass=host.mass-host.reserve*.001+reserve*.001+parts.reduce((n,p)=>n+p.mass-(p.replaces>0?(host.nativeMass[p.kind]??p.replaces):0),0);}
        const hp = pose('hopper'), hn = pose('horn'), cl = pose('claws'), vn = pose('vanes');
        const b = R.build({ id: `W05.PLAYER.B${revision}`, host_id: 'HOST', name: d.name, component_ids: parts.map(p => p.id), drive_source: drive ? drive.id : 'HOST.native_drive', hopper_source: hopper ? hopper.id : null, mass, cadence: drive ? drive.stats.cadence : 10, force: drive ? drive.stats.force : 2, stride: .25, leverage: d.tuning.leverage, grip: pads ? pads.stats.grip : 1, delivery: crop ? crop.stats.delivery : 3, efficiency: drive?.stats.efficiency ?? .75, reserve: (crop ? crop.stats.reserve : 120) * d.tuning.reserve_fraction, width: d.tuning.stance, length: .62, height: .26, hopper: hopper ? copy(hopper.stats.hopper) : null, preload: d.tuning.preload, alignment_error: hp ? Math.abs(hp.angle) * Math.PI / 180 * .4 + Math.abs(hp.x) * .25 : 0, horn: !!horn, claws: !!claws, armor: 'light', provenance: parts.map(p => p.donor), finish: { number: d.number, livery: d.livery }, placements: copy(d.placements), bench_profile: 'W05.BENCH.STOCK.1', design_snapshot: copy(d) });
        if(host){
            b.id=`W05.PLAYER.${host.id}.B${revision}`; b.host_id=host.id;
            b.drive_source=drive?drive.id:host.id+'.native_drive'; b.cadence=drive?drive.stats.cadence:host.cadence;
            b.force=drive?drive.stats.force:host.force; b.stride=host.stride;
            b.delivery=crop?crop.stats.delivery:host.delivery; b.reserve=(crop?crop.stats.reserve:host.reserve)*d.tuning.reserve_fraction;
            b.width=host.width+(d.tuning.stance-.38); b.length=host.length;b.height=host.height;
            b.body_profile=copy(host);b.host_observation={protocol:host.protocol,subject:host.id,mass:host.mass,stride:host.stride,support:host.support};
            b.model_profile='W08.BODY.PARTS.1';
        }
        if (horn) {
            const forward = (-hn.y - .66) * .35;
            b.horn_reach = (1.35 + forward) * Math.cos(hn.angle * Math.PI / 180);
            b.horn_trigger = b.horn_reach - .15;
            b.horn_offset = hn.x * .15 + Math.sin(hn.angle * Math.PI / 180) * .15;
        }
        if (claws) {
            const forward = (-cl.y - .35) * .25;
            b.claw_reach = 1.4 + forward;
            b.claw_trigger = 1.35 + forward;
            b.claw_delay = .10 + Math.abs(cl.angle) * .001;
        }
        if (vanes)
            b.downforce = vanes.stats.downforce * Math.cos(vn.angle * Math.PI / 180);
        const frame = find('frame'), gear = find('gear'), balance = find('stabilizer'), suspension = find('suspension'), damper = find('damper');
        b.model_profile = host ? 'W08.BODY.PARTS.1' : 'W07.LIVING.PARTS.1';
        b.leverage *= gear?.stats.ratio ?? 1;
        b.release_delay = pads?.stats.release ?? (pads ? .035 : .045);
        b.rough_grip = pads?.stats.rough_grip ?? (pads ? b.grip : .9);
        b.lateral_accel = (host?host.support/b.mass:1.2) + (frame?.stats.support ?? 0) / b.mass + (balance?.stats.support_width ?? 0) / b.height;
        b.correction_rate = balance ? Math.min(.75, .35 + .5 * (balance.stats.correction ?? .8) / (1 + (balance.stats.latency ?? .15))) : .35;
        b.width += balance?.stats.support_width ?? 0;
        b.settle = suspension?.stats.settle ?? (b.hopper ? b.hopper[2] : .18);
        b.impact_absorb = suspension?.stats.impact_absorb ?? (b.hopper ? b.hopper[0] : .4);
        b.damping = damper?.stats.damping ?? 0;
        b.aero_drag = vanes?.stats.drag ?? 0;
        if (horn?.stats.reach) {
            b.horn_reach = (horn.stats.reach + (-hn.y - .66) * .35) * Math.cos(hn.angle * Math.PI / 180);
            b.horn_trigger = b.horn_reach - .15;
            b.horn_impact = horn.stats.impact ?? 1;
        }
        if (claws?.stats.reach) {
            b.claw_reach = claws.stats.reach + (-cl.y - .35) * .25;
            b.claw_trigger = b.claw_reach - .05;
            b.claw_delay = claws.stats.closure + Math.abs(cl.angle) * .001;
        }
        b.component_observations = parts.map(p => ({ id: p.id, donor: p.donor, product: p.product ?? null, values: copy(p.stats) }));
        return b;
    }
    function policy(d) { return { passing: d.approach !== 'hopper', jumping: ['hopper', 'opportunist'].includes(d.approach), attacking: ['charge', 'opportunist'].includes(d.approach), counter: ['counter', 'opportunist'].includes(d.approach), preferred_line: 0 }; }
    function custody(state) { return Object.fromEntries(CATALOG.map(a => [a.id, state.fitted.placements.some(p => p.id === a.id) ? { owner: 'player', custody: 'installed', holder: state.host_id } : { owner: 'player', custody: 'inventory', holder: null }])); }
    function nativeCustody(state) { const replaced = new Set(state.fitted.placements.map(p => byId[p.id].kind)); return Object.fromEntries([['drive', 'DRIVE'], ['hopper', 'HIND_PAIR'], ['reserve', 'RESERVE'], ['pads', 'FRONT_MIDDLE_CONTACT']].map(([kind, key]) => [state.host_id+'.NATIVE.' + key, { owner: 'player', custody: replaced.has(kind) ? 'bench_cradle' : 'installed', holder: replaced.has(kind) ? state.host_id+'.RETAINED_NATIVE_CRADLE' : state.host_id }])); }
    function commit(state) {
        const next = copy(state);
        validateDesign(next.draft);
        const issues = fitting(next.draft, next.host_profile);
        req(!issues.length, issues[0]?.message);
        if (canonical(next.fitted) === canonical(next.draft))
            return next;
        next.revision++;
        next.history.push({ revision: state.revision, design: copy(state.fitted) });
        if (next.history.length > 32)
            next.history.shift();
        next.fitted = copy(next.draft);
        return next;
    }
    function place(state, id, patch = {}) { req(Object.hasOwn(byId, id), 'Unknown component'); req(Object.keys(patch).every(k => ['x', 'y', 'angle'].includes(k)), 'Invalid placement update'); const next = copy(state); let p = next.draft.placements.find(p => p.id === id); if (!p) {
        p = { id, ...copy(byId[id].default) };
        next.draft.placements.push(p);
    } Object.assign(p, patch); validateDesign(next.draft); return next; }
    function remove(state, id) { req(Object.hasOwn(byId, id), 'Unknown component'); const next = copy(state); next.draft.placements = next.draft.placements.filter(p => p.id !== id); return next; }
    function exportCard(state) { return { schema: 'RRR.W05.BUILD_CARD.1', stock_profile: state.stock_profile, host_id: state.host_id, design: copy(state.draft), note: 'Recipe only. No ownership, money, hidden genes, or race results are granted by import.' }; }
    function importCard(state, text) { req(typeof text === 'string' && text.length < 50000, 'Build sheet too large'); const card = JSON.parse(text); strictKeys(card, ['schema', 'stock_profile', 'host_id', 'design', 'note'], 'build card'); req(card.schema === 'RRR.W05.BUILD_CARD.1' && card.stock_profile === state.stock_profile && card.host_id === state.host_id, 'Unsupported build sheet'); validateDesign(card.design); const next = copy(state); next.draft = copy(card.design); return next; }
    function restore(text) {
        req(typeof text === 'string' && text.length < 500000, 'Saved session too large');
        const value = JSON.parse(text);
        req(value.schema === 'RRR.W05.SESSION.1' && value.stock_profile === 'W05.BENCH.STOCK.1' && typeof value.host_id === 'string' && (value.host_id === 'HOST' || value.host_profile?.id === value.host_id), 'Unsupported saved session');
        validateDesign(value.draft);
        validateDesign(value.fitted);
        req(fitting(value.fitted, value.host_profile).length === 0, 'Invalid installed build');
        req(Number.isSafeInteger(value.revision) && value.revision > 0 && value.revision < 1e9, 'Invalid revision');
        const next = value.host_profile ? initialHost(value.host_profile) : initial();
        next.revision = value.revision;
        next.draft = copy(value.draft);
        next.fitted = copy(value.fitted);
        req(Array.isArray(value.history) && value.history.length <= 32, 'Invalid history');
        for (const h of value.history) {
            req(Number.isInteger(h.revision) && h.revision > 0 && h.revision < next.revision, 'Invalid prior revision');
            validateDesign(h.design);
            req(!fitting(h.design,value.host_profile).length, 'Invalid prior fitting');
        }
        next.history = copy(value.history);
        req(Array.isArray(value.saved_cards) && value.saved_cards.length <= 8, 'Invalid saved recipes');
        next.saved_cards = value.saved_cards.map(c => { validateDesign(c); return copy(c); });
        return next;
    }
    function raceRequest(state, settings = {}) {
        req(canonical(state.draft) === canonical(state.fitted), 'Commit or discard the draft before entering a race');
        const equipment = settings.equipment || 'open', rival = settings.rival || 'runner', courseName = settings.course || 'long';
        req(['runner', 'rammer', 'catcher'].includes(rival), 'Unknown rival');
        req(['long', 'short', 'dust', 'rough'].includes(courseName), 'Unknown course');
        const b = compile(state.fitted, state.revision, state.host_profile);
        req(R.legal(b, equipment), 'This build is not eligible for the selected class. Keep the build and choose Open, or remove its offensive sects.');
        let npcHorn = rival === 'rammer' || equipment === 'fireworks', npcClaws = rival === 'catcher';
        if (equipment === 'speedsters') {
            req(rival === 'runner', 'Choose the weaponless club runner for Speedsters');
            npcHorn = false;
            npcClaws = false;
        }
        const npc = R.build({ id: 'W05.NPC.CLUB', host_id: 'W05.NPC.HOST', name: rival === 'rammer' ? 'HORN TAX' : rival === 'catcher' ? 'CATCH OF THE DAY' : 'CLUB REGULAR', component_ids: ['W05.NPC.DRIVE', ...(npcHorn ? ['W05.NPC.HORN'] : []), ...(npcClaws ? ['W05.NPC.CLAWS'] : [])], drive_source: 'W05.NPC.DRIVE', cadence: 9, force: 4, mass: 1, horn: npcHorn, claws: npcClaws, finish: { number: '23', livery: 'ivory' }, provenance: ['declared_club_demonstrator_stock'] });
        const course = R.foundryCourse(courseName === 'short' ? 12 : 20, 2, courseName === 'dust' ? 1.12 : 1.6);
        if (courseName === 'rough') {
            course.id = 'W07.RIVET.WASH.v1';
            for (const p of course.pieces)
                if (!p.curvature)
                    p.bump = 1;
        }
        for (const p of course.pieces)
            p.surface = courseName === 'dust' ? 'loose' : 'smooth';
        return { course: course.data(), entrants: [{ build: npc, policy: { passing: false, attacking: npcHorn, counter: npcClaws }, d: .34 }, { build: b, policy: policy(state.fitted), d: -.34 }], equipment, dt: .01, metadata: { build_revision: state.revision, host_id: state.host_id, design: copy(state.fitted), course_label: courseName, rival, practice: true, payout: 0, world_clock_integrated: false } };
    }
    const api = { initialHost, CATALOG, BASE, setExtras, byId, initial, copy, canonical, validateDesign, fitting, compile, custody, nativeCustody, commit, place, remove, exportCard, importCard, restore, raceRequest, policy, rectVertices, overlaps };
    root.RRRBench = api;
    if (typeof module !== 'undefined')
        module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
