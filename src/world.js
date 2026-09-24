/* W07 one-world continuation. Profiled living supply and real two-way retail.
 * Authored game organisms; normalized coefficients and turns; not husbandry guidance. */
(function (root) {
    'use strict';
    const B = root.RRRBench || (typeof require === 'function' ? require('./bench.js') : null);
    const C = root.RRRCatalog || (typeof require === 'function' ? require('./catalog.js') : null);
    const H=root.RRRHosts||(typeof require==='function'?require('./hosts.js'):null);
    const E=root.RRREvidence||(typeof require==='function'?require('./evidence.js'):null);
    const { copy, canonical } = B, FORMS = C.FORMS, PRODUCTS = C.PRODUCTS;
    const need = (c, m) => { if (!c)
        throw Error(m); }, int = (n, a, b, k) => need(Number.isSafeInteger(n) && n >= a && n <= b, `Invalid ${k}`);
    const SCHEMA = 'RRR.W08.WORLD.1';
    const ROUTES = Object.fromEntries(Object.entries(FORMS).map(([kind, f]) => [kind === 'hopper' ? 'verge' : kind === 'cicada' ? 'kiln' : kind, { name: f.habitat, kind, cost: kind === 'hopper' ? 6 : 8, duration: 2, source: f.habitat, find: f.sign + ' ' + f.seek, ordinary: f.products.map(k => PRODUCTS[k].name).join(' / '), stage: f.stage }]));
    function rng(key) { let h = 2166136261; for (const c of key) {
        h ^= c.charCodeAt(0);
        h = Math.imul(h, 16777619);
    } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    const traits = C.traits;
    function specimen(id, kind, genes, sex, origin, tick = 0) { return { ...(kind==='roach'?{bodyPlan:'lowline'}:{}), id, kind, genes: copy(genes), sex, origin, stage: 'adult', owner: 'player', alive: true, anatomy: true, regions: Object.fromEntries(C.regions(kind).map(r => [r, 'intact'])), protected: false, measured: false, parents: [], born: tick, brood: null, appearance: FORMS[kind].sign, condition: 'intact', schedule: [] }; }
    function addPart(w, s, product, owner = 'player', kit = null) {
        const d = PRODUCTS[product];
        need(d && FORMS[s.kind].products.includes(product), 'Preparation does not belong to this donor');
        need(d.regions.every(r => s.regions[r] === 'intact'), 'Source anatomy already allocated or damaged');
        const id = `W07.PART.${s.id}.${product}`;
        need(!w.parts.some(p => p.id === id), 'Duplicate preparation');
        for (const r of d.regions)
            s.regions[r] = id;
        s.anatomy = Object.values(s.regions).some(v => v === 'intact');
        s.measured = true;
        s.condition = d.vital ? 'vital extraction / supported remains' : 'prepared source removed / supported donor';
        if (d.vital) {
            s.alive = false;
            s.remainsUntil = w.tick + 2;
            s.schedule = [];
        }
        const p = { id, product, owner, donor: s.id, kind: d.kind, legacy: false, created: w.tick, kit, condition: 'usable' };
        p.snapshot = C.descriptor(s, p, B.BASE);
        w.parts.push(p);
        return id;
    }
    function seedRetail(w) {
        w.retail = { seeded: true, liveOffers: [], looseOffers: [] };
        w.kits = [];
        w.contracts = [
            { id: 'W07.ORDER.CONTACT', name: 'Glassline contact order', product: 'sticktoe', requirements: { grip: { min: 1.3 }, release: { max: .045 } }, quantity: 2, unitPrice: 31, window: 12, status: 'offered', delivered: [], escrow: 0 },
            { id: 'W07.ORDER.DRIVE', name: 'Efficient drive order', product: 'redline', requirements: { cadence: { min: 10.5 }, efficiency: { min: .75 } }, quantity: 2, unitPrice: 40, window: 14, status: 'offered', delivered: [], escrow: 0 },
            { id: 'W07.ORDER.FRAME', name: 'Low-mass frame order', product: 'boxbrace', requirements: { support: { min: .85 } }, maxMass: .24, quantity: 2, unitPrice: 34, window: 16, status: 'offered', delivered: [], escrow: 0 }
        ];
        let n = 0;
        for (const [kind, f] of Object.entries(FORMS).filter(([k])=>k!=='roach')) {
            for (const sex of ['A', 'B']) {
                const genes = sex === 'A' ? [[1, 1], [0, 0], [1, 0]] : [[0, 0], [1, 1], [0, 1]], s = specimen(`W07.SHOP.LIVE.${kind}.${sex}`, kind, genes, sex, `Two Nets / documented ${kind} breeding line`);
                s.owner = 'shop';
                s.measured = true;
                s.evidence = 'Shop-controlled observation; larval records retained for adult waxmoths';
                w.specimens.push(s);
                w.retail.liveOffers.push({ id: s.id, price: f.breedPrice });
            }
        }
        function supply(key, kit) { const kind = Object.keys(FORMS).find(k => FORMS[k].products.includes(key)), s = specimen(`W07.SHOP.DONOR.${++n}`, kind, [[1, 0], [1, 0], [1, 0]], 'A', 'Two Nets / selected preparation stock'); s.owner = 'shop'; s.stage = PRODUCTS[key].stages[0]; w.specimens.push(s); const id = addPart(w, s, key, 'shop', kit); return id; }
        for (const key of Object.keys(PRODUCTS)) {
            const id = supply(key, null);
            w.retail.looseOffers.push({ id, price: PRODUCTS[key].price + 15 });
        }
        for (const recipe of C.KITS) {
            const id = 'W07.KIT.' + recipe.id, items = recipe.products.map(key => supply(key, id));
            w.kits.push({ id, recipe: recipe.id, owner: 'shop', status: 'packed', items, price: recipe.price });
        }
    }
    function initial(bench) {
        const w = { schema: SCHEMA, profile: 'W08.HOBBY.1', revision: 1, tick: 0, seed: 'RRR-W06-FOUNDERS-0', next: 1, bench: bench ? B.restore(JSON.stringify(bench)) : B.initial(), specimens: [], parts: B.BASE.map(a => ({ id: a.id, owner: 'player', donor: a.donor, kind: a.kind, legacy: true, created: 0, kit: null })), broods: [], accounts: { player: 142, shop: 160, services: 0, sponsor: 60, external: 0, escrow: 0 }, ledger: [], receipts: {}, plans: {}, capacity: { holding: 24, nursery: 6 }, facilities: { dry: 6 }, project: 'synchrony', pendingRace: null, results: [], orders: { epoch: 0, ordinary: 8, assemblies: 4 }, field: Object.fromEntries(Object.keys(ROUTES).map(k => [k, { epoch: -1, taken: [] }])), auto: { dispatch: false, loop: null }, careArrears: 0, inTransit: 0 };
        for (const [id, g, sex] of [['P-R', [[1, 1], [0, 0], [1, 1]], 'A'], ['P-S', [[0, 0], [1, 1], [1, 1]], 'B']]) {
            const s = specimen(id, 'hopper', g, sex, 'Retained Wave 03 founder');
            s.protected = true;
            s.measured = true;
            w.specimens.push(s);
        }
        seedRetail(w); seedHosts(w);
        return w;
    }
    // Each registered animal has exactly one bench: active, or parked. Never both.
    function seedHosts(w){
        w.hosts={};w.stabled={};w.lines=[];w.selection=null;
        let original=w.specimens.find(s=>s.id==='HOST');
        if(!original){original=specimen('HOST','roach',[[1,0],[1,0],[1,0]],'A','Historical host / declared forward W08 native profile');original.protected=true;original.measured=true;w.specimens.push(original);}
        const p=H.profile(original);w.bench.host_id='HOST';w.bench.host_profile=copy(p);
        w.hosts.HOST={id:'HOST',specimenId:'HOST',profile:p,registeredAt:w.tick};
        w.field.roach??={epoch:-1,taken:[]};
        for(const [plan,data]of Object.entries(H.PLANS))for(const sex of ['A','B']){
            const id=`W08.SHOP.HOST.${plan}.${sex}`,s=specimen(id,'roach',sex==='A'?[[1,1],[0,0],[1,0]]:[[0,0],[1,1],[0,1]],sex,'Two Nets / '+data.name+' founder stock');
            s.bodyPlan=plan;s.owner='shop';s.measured=true;s.evidence='W08 native mass, stride and support observation';w.specimens.push(s);w.retail.liveOffers.push({id,price:35});
        }
        let n=0;
        for(const recipe of H.FULL_KITS){
            const id='W08.KIT.'+recipe.id,hostId='W08.HOST.KIT.'+recipe.id;
            const h=specimen(hostId,'roach',[[1,0],[1,0],[1,0]],'B','Two Nets / '+recipe.name+' host');h.bodyPlan=recipe.plan;h.owner='shop';h.measured=true;h.kit=id;w.specimens.push(h);
            const items=recipe.products.map(key=>{const kind=Object.keys(FORMS).find(k=>FORMS[k].products.includes(key));const d=specimen(`W08.KIT.DONOR.${++n}`,kind,[[1,0],[1,0],[1,0]],'A','Two Nets / independently allocated full-kit donor');d.owner='shop';d.stage=PRODUCTS[key].stages[0];w.specimens.push(d);return addPart(w,d,key,'shop',id);});
            w.kits.push({id,recipe:recipe.id,type:'whole_host',hostId,owner:'shop',status:'packed',items,price:recipe.price});
        }
    }
    function registerHost(w,id){
        const s=findSpec(w,id);need(s.kind==='roach'&&s.owner==='player'&&s.alive&&s.stage==='adult'&&!s.kit,'Needs an owned adult whole roach, outside its package');
        need(s.regions.body==='intact','Host body requires intact native anatomy in this profile');need(!parentBusy(w,id),'Finish pairing before commissioning this host');
        if(w.hosts[id])return id;
        const p=H.profile(s);w.hosts[id]={id,specimenId:id,profile:p,registeredAt:w.tick};w.stabled[id]=B.initialHost(p);s.measured=true;s.protected=true;s.autoOrdinary=false;
        return id;
    }
    function switchHost(w,id){
        need(w.hosts[id],'Commission the whole host first');if(w.bench.host_id===id)return id;
        const s=findSpec(w,id);need(s.owner==='player'&&!s.kit&&s.alive,'Host unavailable');
        const next=w.stabled[id];need(next,'Missing parked bench');w.stabled[w.bench.host_id]=w.bench;delete w.stabled[id];w.bench=next;return id;
    }
    function layoutKit(w,id){
        const k=w.kits.find(k=>k.id===id);need(k?.type==='whole_host'&&k.owner==='player'&&k.status==='unpacked','Open the owned whole-host kit first');
        need(w.bench.host_id===k.hostId,'Bring the included host to the bench first');
        need(canonical(w.bench.draft)===canonical(w.bench.fitted),'Fit or discard the current draft before laying out the guide');
        const r=H.FULL_KITS.find(x=>x.id===k.recipe);let next=copy(w.bench);next.draft.placements=[];
        for(const part of k.items){need(availablePart(w,part),'Kit guide needs a part currently reserved elsewhere');next=B.place(next,part);}
        next.draft.name=r.name.toUpperCase();next.draft.number=r.number;next.draft.approach=r.approach;
        need(!B.fitting(next.draft,next.host_profile).length,'Guide requires a revised fitting');w.bench=next;return id;
    }
    function setSelection(w,cmd){
        const f=FORMS[cmd.kind];need(f,'Unknown project donor');const t=f.traits.find(t=>t[0]===cmd.trait);need(t,'Unknown project trait');
        need(['min','max'].includes(cmd.op)&&Number.isFinite(cmd.threshold),'Invalid project bound');
        const ends=[t[3],t[3]+t[4]*2];need(cmd.threshold>=Math.min(...ends)-1e-6&&cmd.threshold<=Math.max(...ends)+1e-6,'Target outside declared donor profile');
        w.selection={kind:cmd.kind,trait:cmd.trait,op:cmd.op,threshold:cmd.threshold,focus:cmd.focus==='product'?'product':'complement'};return copy(w.selection);
    }
    function createLine(w,cmd){
        need(typeof cmd.name==='string'&&cmd.name.trim().length>=2&&cmd.name.length<=40&&!/[\x00-\x1f]/.test(cmd.name),'Line name needs 2–40 printable characters');
        need(Array.isArray(cmd.parents)&&cmd.parents.length===2&&cmd.parents[0]!==cmd.parents[1],'Choose two distinct founders');
        const ps=cmd.parents.map(id=>findSpec(w,id));need(ps.every(s=>s.owner==='player'&&s.alive&&s.stage==='adult'&&!s.kit),'Founders must be owned reproductive adults');
        need(ps[0].kind===ps[1].kind&&ps[0].sex!==ps[1].sex,'Line needs a compatible reproductive pair');
        need(w.selection?.kind===ps[0].kind,'Choose the line’s target on its donor form first');need(w.lines.length<100,'Local line register full');
        const id='W08.LINE.'+w.next++;w.lines.push({id,name:cmd.name.trim(),kind:ps[0].kind,founders:copy(cmd.parents),target:copy(w.selection),created:w.tick,owner:'player'});
        ps.forEach(s=>{s.protected=true;s.autoOrdinary=false;});return id;
    }
    function validateHosts(w){
        need(w.hosts&&w.stabled&&Array.isArray(w.lines),'Missing stable or lineage registry');need(!w.stabled[w.bench.host_id],'Active host duplicated in parked stable');
        const states=allBenches(w),ids=new Set(),used=new Map();need(Object.keys(w.hosts).length===states.length,'Orphan host or bench');
        for(const b of states){
            need(!ids.has(b.host_id),'Duplicate host bench');ids.add(b.host_id);const entry=w.hosts[b.host_id],animal=findSpec(w,b.host_id);
            need(entry&&entry.specimenId===animal.id&&animal.kind==='roach'&&animal.owner==='player'&&animal.alive&&animal.stage==='adult'&&!animal.kit,'Invalid registered whole host');
            const expected=H.profile(animal);need(canonical(b.host_profile)===canonical(expected)&&canonical(entry.profile)===canonical(expected),'Host anatomy/profile mismatch');
            B.restore(JSON.stringify(b));for(const id of new Set([...b.fitted.placements,...b.draft.placements].map(x=>x.id))){
                const p=findPart(w,id);need(p.owner==='player'&&!p.kit,'Host uses transferred or packed stock');need(!used.has(id),'One sect reserved or installed on two hosts');used.set(id,b.host_id);
            }
        }
        for(const k of w.kits)if(k.hostId){const s=findSpec(w,k.hostId);need(k.type==='whole_host'&&H.FULL_KITS.some(r=>r.id===k.recipe),'Unknown complete kit');
            if(k.status==='packed')need(s.owner===k.owner&&s.kit===k.id&&!w.hosts[s.id],'Packed host custody mismatch');
            else need(s.kit==null&&w.hosts[s.id],'Opened host missing from stable');}
        for(const s of w.specimens)if(s.kit)need(w.kits.some(k=>k.id===s.kit&&k.status==='packed'&&k.hostId===s.id),'Orphan packed host');
        need(w.lines.length<=100&&new Set(w.lines.map(l=>l.id)).size===w.lines.length,'Invalid line registry');
        for(const line of w.lines){need(typeof line.name==='string'&&line.name.length<=40&&line.founders.length===2,'Invalid named line');for(const id of line.founders)need(findSpec(w,id).kind===line.kind,'Line has unrelated-form founder');E.validateTarget(line.target);}
        if(w.selection)E.validateTarget(w.selection);
    }
    function live(w) { return w.specimens.filter(s => s.owner === 'player' && s.alive); }
    function active(w) { return w.broods.filter(b => !['complete', 'failed'].includes(b.stage)); }
    function occupied(w) { return (w.inTransit || 0) + live(w).filter(s=>s.id!=='HOST').length + active(w).filter(b => b.stage === 'eggs').reduce((a, b) => a + b.count, 0); }
    function nursery(w, facility) { return active(w).filter(b => !facility || b.facility === facility).reduce((a, b) => a + b.count, 0); }
    function parentBusy(w, id) { return active(w).some(b => b.parentIds.includes(id) && w.tick < b.hatch); }
    function findSpec(w, id) { const s = w.specimens.find(s => s.id === id); need(s, 'Unknown specimen'); return s; }
    function findPart(w, id) { const p = w.parts.find(p => p.id === id); need(p, 'Unknown sect'); return p; }
    function allBenches(w){return [w.bench,...Object.values(w.stabled||{})];}
    function reservedHost(w,id){return allBenches(w).find(b=>[...b.draft.placements,...b.fitted.placements].some(p=>p.id===id))?.host_id||null;}
    function availablePart(w, id) { const p = w.parts.find(p => p.id === id),other=Object.values(w.stabled||{}).some(b=>[...b.draft.placements,...b.fitted.placements].some(x=>x.id===id)); return p && p.owner === 'player' && !p.kit && p.condition !== 'unusable' && !other; }
    function descriptor(w, p) { if (p.legacy)
        return copy(B.BASE.find(a => a.id === p.id)); return copy(p.snapshot); }
    function sync(w) { B.setExtras(w.parts.filter(p => !p.legacy).map(p => descriptor(w, p))); }
    function available(w) { return w.parts.filter(p => availablePart(w, p.id)).map(p => descriptor(w, p)); }
    function spendable(w) { return Math.max(0, w.accounts.player - w.careArrears); }
    function transfer(w, from, to, amount, reason, ref) { int(amount, 0, 1e7, 'money'); need(Number.isFinite(w.accounts[from]) && Number.isFinite(w.accounts[to]), 'Unknown account'); need(w.accounts[from] >= amount, `Insufficient ${from} funds`); w.accounts[from] -= amount; w.accounts[to] += amount; w.ledger.push({ tick: w.tick, from, to, amount, reason, ref: ref || null }); }
    function pay(w, n, reason, ref) { need(spendable(w) >= n, 'Cash reserved for unpaid care; sell surplus or take funded club work'); transfer(w, 'player', 'services', n, reason, ref); }
    function upkeep(w) { return 1 + Math.ceil(live(w).filter(s=>s.id!=='HOST').length / 6) + active(w).length; }
    function forecast(w, ticks = 1) { int(ticks, 0, 24, 'forecast'); const cost = (1 + Math.ceil(occupied(w) / 6) + active(w).length) * ticks; return { ticks, cashCost: cost, newArrears: Math.max(0, cost - w.accounts.player), carePerTick: upkeep(w), safe: w.accounts.player >= cost && !w.careArrears, until: w.tick + ticks, kind: 'bounded_capacity_not_hidden_survival' }; }
    function settleCare(w) { const n = Math.min(w.careArrears, w.accounts.player); if (n) {
        transfer(w, 'player', 'services', n, 'Catch up care');
        w.careArrears -= n;
    } }
    function preparable(w, s) { return FORMS[s.kind].products.filter(k => { const d = PRODUCTS[k]; return d.stages.includes(s.stage) && (s.alive || w.tick <= (s.remainsUntil ?? -1)) && d.regions.every(r => s.regions[r] === 'intact'); }); }
    function publicSpec(w, s) {
        const f = FORMS[s.kind], known = s.measured ? traits(s) : null;
        let reason = s.protected ? 'Protected founder / replacement' : s.stage !== 'adult' ? 'Stage ' + s.stage + ' · check preparation window' : !known ? 'Unmeasured · select by evidence' : s.kind === 'hopper' && w.project === 'synchrony' && known.phase <= .03 ? 'Useful synchronization complement' : s.kind === 'hopper' && w.project === 'return' && known.return >= .69 ? 'Useful high-return contribution' : 'Measured stock · choose race, breeding, sale or collection';
        const advice=E.guidance(w,s); if(advice)reason=advice.reason;
        return { kit:s.kit??null, registered:!!w.hosts?.[s.id],bodyPlan:s.bodyPlan??null,lineAdvice:advice, id: s.id, kind: s.kind, name: f.name, sex: s.sex, stage: s.stage, origin: s.origin, parents: copy(s.parents), appearance: s.appearance, condition: s.condition, protected: s.protected, alive: s.alive, anatomy: s.anatomy, measured: s.measured, traits: known, reason, canBreed: s.stage === 'adult' && s.alive && !s.kit && !parentBusy(w, s.id), reserved: parentBusy(w, s.id), products: preparable(w, s), nextStage: s.schedule?.[0] ?? null, facility: f.facility, seek: f.seek, evidence: s.evidence ?? (s.measured ? 'W07 controlled profile observation' : 'Not measured'), owner: s.owner };
    }
    function inherited(a, b, rand) { return a.genes.map((g, i) => [g[rand() < .5 ? 0 : 1], b.genes[i][rand() < .5 ? 0 : 1]]); }
    function broodStart(w, ids, retained = 2, auto = false) {
        need(Array.isArray(ids) && ids.length === 2 && ids[0] !== ids[1], 'Choose two different parents');
        const ps = ids.map(id => findSpec(w, id));
        need(ps.every(s => s.owner === 'player' && s.alive && s.stage === 'adult'), 'Only owned reproductive adults can pair');
        need(ps[0].kind === ps[1].kind, 'Universal grafting does not imply cross-species reproduction');
        need(ps[0].sex !== ps[1].sex, 'Profile requires complementary A/B reproductive roles');
        need(ps.every(s=>!s.kit),'Open packed live stock before pairing'); need(ps.every(s => !parentBusy(w, s.id) && !s.working), 'Parent is working or already pairing');
        const f = FORMS[ps[0].kind], p = f.profile;
        need(w.facilities[f.facility] >= p.count, `Needs ${C.FACILITIES[f.facility].name}; buy its real stage-support capacity`);
        need(nursery(w, f.facility) + p.count <= w.facilities[f.facility], 'This stage nursery already has a committed brood');
        need(occupied(w) + p.count <= w.capacity.holding, 'Future holding is full');
        need(w.careArrears === 0 && w.accounts.player >= p.cost + forecast(w, Math.min(6, p.stages.at(-1)[0])).cashCost + p.count, 'Reserve initiation and conservative care before committing more young');
        need(w.broods.length < 300, 'Local brood archive limit');
        pay(w, p.cost, 'Initiate ' + f.name + ' brood');
        const id = `W07.BROOD.${w.next++}`, rand = rng(w.seed + '|' + id + '|' + ids.join('|')), success = rand() < (p.success);
        const outcomes = Array.from({ length: p.count }, (_, i) => ({ id: id + '.' + (i + 1), genes: inherited(ps[0], ps[1], rand), sex: rand() < .5 ? 'A' : 'B', survives: rand() < p.survival, ...(ps[0].kind==='roach'?{bodyPlan:ps[rand()<.5?0:1].bodyPlan}: {}) }));
        if (auto)
            retained = Math.max(0, 2 - live(w).filter(s => s.kind === ps[0].kind && s.protected && s.parents.length && s.stage === 'adult').length);
        w.broods.push({ id, kind: ps[0].kind, facility: f.facility, parentIds: copy(ids), start: w.tick, hatch: w.tick + p.hatch, mature: w.tick + p.stages.at(-1)[0], stage: 'eggs', count: p.count, outcomes, success, retained, auto, retainedIds: [], delivered: [], outcomeRecorded: false });
        return id;
    }
    function quoteSpec(w, s) { if (!s.alive || !s.anatomy || !['adult', FORMS[s.kind].stage].includes(s.stage))
        return 0; return FORMS[s.kind].livePrice; }
    function sellSpec(w, id) { const s = findSpec(w, id); need(!w.hosts?.[id]&&!s.kit,'Registered or packed host cannot be sold as loose donor stock'); need(s.owner === 'player' && quoteSpec(w, s) > 0 && Object.values(s.regions).every(v => v === 'intact'), 'Ordinary order needs intact live stock in a useful stage'); need(!s.protected && !parentBusy(w, id) && !s.working, 'Release protection / finish work before sale'); const q = quoteSpec(w, s); need(w.orders.ordinary > 0 && w.accounts.shop >= q, 'Ordinary quota filled or buyer unfunded'); transfer(w, 'shop', 'player', q, 'Ordinary live stock sale', id); s.owner = 'shop'; s.autoOrdinary = false; w.orders.ordinary--; w.retail.liveOffers.push({ id, price: q + 10 }); settleCare(w); return q; }
    function protectedDraft(w,id){return allBenches(w).some(b=>[...b.draft.placements,...b.fitted.placements].some(p=>p.id===id));}
    function eligibleParts(w) { return w.parts.filter(p => availablePart(w, p.id) && !p.legacy && !protectedDraft(w, p.id)); }
    function sellPart(w, id) { const p = findPart(w, id); need(availablePart(w, id) && !p.legacy && !protectedDraft(w, id), 'Unfit, remove draft reservations and unpack before selling current prepared stock'); const q = PRODUCTS[p.product].price; need(w.orders.assemblies > 0 && w.accounts.shop >= q, 'Ordinary assembly order is filled or unfunded'); transfer(w, 'shop', 'player', q, 'Prepared assembly sale', id); p.owner = 'shop'; w.retail.looseOffers.push({ id, price: q + 15 }); w.orders.assemblies--; settleCare(w); return q; }
    function autoDispatch(w) { if (!w.auto.dispatch)
        return; for (const p of eligibleParts(w)) {
        if (w.orders.assemblies <= 0 || w.accounts.shop < PRODUCTS[p.product].price)
            break;
        sellPart(w, p.id);
    } }
    function renew(w) { const epoch = Math.floor(w.tick / 12); if (epoch <= w.orders.epoch)
        return; w.orders = { epoch, ordinary: 8, assemblies: 4 }; const n = Math.max(0, Math.min(100, 180 - w.accounts.shop)); w.accounts.external -= n; w.accounts.shop += n; w.ledger.push({ tick: w.tick, from: 'external', to: 'shop', amount: n, reason: 'Declared off-screen hobby customer receipts', ref: 'MARKET.' + epoch }); }
    function expireContracts(w) { for (const o of w.contracts)
        if (o.status === 'active' && w.tick > o.deadline) {
            if (o.escrow)
                transfer(w, 'escrow', 'shop', o.escrow, 'Unfilled order refund', o.id);
            o.escrow = 0;
            o.status = 'expired';
        } }
    function step(w, n, allowAuto = true) {
        int(n, 0, 24, 'world advance');
        for (let i = 0; i < n; i++) {
            w.tick++;
            const cost = upkeep(w), paid = Math.min(cost, w.accounts.player);
            if (paid)
                transfer(w, 'player', 'services', paid, 'Care + workshop turn');
            w.careArrears += cost - paid;
            for (const b of active(w)) {
                const profile = FORMS[b.kind].profile;
                if (w.tick >= b.hatch && b.stage === 'eggs') {
                    if (!b.success) {
                        b.stage = 'failed';
                        b.outcomeRecorded = true;
                        continue;
                    }
                    b.stage = 'growing';
                    for (const o of b.outcomes.filter(o => o.survives)) {
                        const s = specimen(o.id, b.kind, o.genes, o.sex, 'Nursery ' + b.id, w.tick);
                        s.stage = profile.stages[0][1];
                        s.schedule = profile.stages.slice(1).map(([offset, stage]) => ({ tick: b.start + offset, stage }));
                        s.parents = copy(b.parentIds);
                        s.brood = b.id; if(b.kind==='roach')s.bodyPlan=o.bodyPlan;
                        w.specimens.push(s);
                    }
                }
            }
            for (const s of w.specimens) {
                if (!s.alive)
                    continue;
                while (s.schedule?.length && w.tick >= s.schedule[0].tick) {
                    s.stage = s.schedule.shift().stage;
                }
            }
            for (const b of active(w))
                if (b.stage === 'growing' && w.tick >= b.mature) {
                    b.stage = 'complete';
                    const kids = w.specimens.filter(s => s.brood === b.id && s.alive && s.owner === 'player');
                    const retained = [];
                    for (const sex of ['A', 'B']) {
                        const s = kids.find(s => s.sex === sex);
                        if (s)
                            retained.push(s);
                    }
                    for (const s of kids)
                        if (retained.length < b.retained && !retained.includes(s))
                            retained.push(s);
                    for (const s of retained.slice(0, b.retained)) {
                        s.protected = true;
                        b.retainedIds.push(s.id);
                    }
                    if (b.auto)
                        for (const s of kids.filter(s => !s.protected))
                            s.autoOrdinary = true;
                    b.outcomeRecorded = true;
                }
            renew(w);
            expireContracts(w);
            if (allowAuto) {
                for (const s of live(w).filter(s => s.autoOrdinary && !w.hosts?.[s.id] && !s.kit && !s.protected && !s.working && !parentBusy(w, s.id) && s.stage === 'adult' && Object.values(s.regions).every(v => v === 'intact'))) {
                    if (w.orders.ordinary <= 0 || w.accounts.shop < FORMS[s.kind].livePrice)
                        break;
                    sellSpec(w, s.id);
                    const b = w.broods.find(b => b.id === s.brood);
                    if (b)
                        b.delivered.push(s.id);
                }
                autoDispatch(w);
                const l = w.auto.loop;
                if (l?.enabled && !active(w).some(b => b.parentIds.some(id => l.parents.includes(id)))) {
                    try {
                        l.last = broodStart(w, l.parents, 2, l.sellSurplus);
                        l.blocked = null;
                    }
                    catch (e) {
                        l.blocked = e.message;
                    }
                }
            }
        }
    }
    function fieldRun(w, route, method) {
        const r = ROUTES[route];
        need(r, 'Unknown route');
        need(['protect', 'bulk'].includes(method), 'Unknown containment');
        const ep = Math.floor(w.tick / 6), f = w.field[route];
        if (f.epoch !== ep) {
            f.epoch = ep;
            f.taken = [];
        }
        const slots = [0, 1, 2, 3].filter(x => !f.taken.includes(x)).slice(0, method === 'protect' ? 2 : 3);
        need(slots.length, 'Local cohort searched; return after its six-turn refresh');
        need(occupied(w) + slots.length <= w.capacity.holding, 'No safe incoming holding space');
        need(spendable(w) >= r.cost + forecast(w, r.duration).cashCost, 'Need travel and care reserve');
        pay(w, r.cost, 'Field run / ' + r.name);
        const captures = [];
        for (const slot of slots) {
            f.taken.push(slot);
            const rand = rng(w.seed + '|' + route + '|' + ep + '|' + slot), genes = Array.from({ length: 3 }, () => [rand() < .45 ? 1 : 0, rand() < .45 ? 1 : 0]), s = specimen(`W07.CATCH.${route}.${ep}.${slot}`, r.kind, genes, rand() < .5 ? 'A' : 'B', r.source, w.tick + r.duration);
            s.stage = r.stage; if(s.kind==='roach')s.bodyPlan=Object.keys(H.PLANS)[Math.floor(rand()*3)];
            if (r.stage === 'larva')
                s.schedule = [{ tick: w.tick + r.duration + 3, stage: 'pupa' }, { tick: w.tick + r.duration + 5, stage: 'adult' }];
            if (method === 'bulk' && rand() < .28) {
                s.regions[FORMS[s.kind].region] = 'damaged';
                s.anatomy = Object.values(s.regions).some(v => v === 'intact');
                s.condition = 'desired anatomy damaged in bulk transit';
            }
            captures.push(s);
        }
        w.inTransit += captures.length;
        step(w, r.duration);
        w.inTransit -= captures.length;
        w.specimens.push(...captures);
        return captures.map(s => s.id);
    }
    function prepare(w, id, product) { const s = findSpec(w, id); product = product || FORMS[s.kind].products[0]; need(s.owner === 'player' && preparable(w, s).includes(product), 'Wrong stage, expired remains, or unavailable anatomy for this preparation'); need(!s.protected && !parentBusy(w, id) && !s.working, 'Release founder protection / finish pairing before irreversible preparation'); need(spendable(w) >= 4 + forecast(w, 1).cashCost, 'Need preparation supplies and care'); pay(w, 4, 'Prepare ' + PRODUCTS[product].name, id); s.working = 'prepare'; const stage = s.stage; step(w, 1); delete s.working; need(s.stage === stage && preparable(w, s).includes(product), 'The preparation window closes during this turn; start earlier'); return addPart(w, s, product); }
    function fit(w) { sync(w); need(!parentBusy(w,w.bench.host_id),'This host is pairing; wait for release before fitting'); need(w.bench.draft.placements.every(p => availablePart(w, p.id)), 'Component is sold or still packed in a kit'); if (canonical(w.bench.draft) === canonical(w.bench.fitted))
        return 'unchanged'; need(spendable(w) >= 2 + forecast(w, 1).cashCost, 'Need fitting fee and care'); const b = B.commit(w.bench); pay(w, 2, 'Fitting supplies', String(b.revision)); step(w, 1); w.bench = b; return b.revision; }
    function buyLive(w, id) { const s = findSpec(w, id), offer = w.retail.liveOffers.find(x => x.id === id); need(offer && s.owner === 'shop' && s.alive && !s.kit, 'This individual is no longer offered'); need(occupied(w) + 1 <= w.capacity.holding, 'No incoming holding capacity'); need(spendable(w) >= offer.price, 'Not enough spendable cash'); transfer(w, 'player', 'shop', offer.price, 'Buy identified live stock', id); s.owner = 'player'; s.protected = true; s.autoOrdinary = false; return id; }
    function buyPart(w, id) { const p = findPart(w, id), offer = w.retail.looseOffers.find(x => x.id === id); need(offer && p.owner === 'shop' && !p.kit, 'This component is no longer offered loose'); need(spendable(w) >= offer.price, 'Not enough spendable cash'); transfer(w, 'player', 'shop', offer.price, 'Buy prepared sect', id); p.owner = 'player'; return id; }
    function buyKit(w, id) { const k = w.kits.find(k => k.id === id); if(k?.hostId){const h=findSpec(w,k.hostId);need(h.owner==='shop'&&h.kit===id,'Whole-host kit lacks its actual host');need(occupied(w)+1<=w.capacity.holding,'No space for the living kit host');} need(k && k.owner === 'shop' && k.status === 'packed', 'Kit unavailable'); need(spendable(w) >= k.price, 'Not enough spendable cash'); need(k.items.every(id => { const p = findPart(w, id); return p.owner === 'shop' && p.kit === k.id; }), 'Kit inventory incomplete'); transfer(w, 'player', 'shop', k.price, k.hostId?'Buy complete living-host kit':'Buy coordinated conversion kit', id); k.owner = 'player'; if(k.hostId){const h=findSpec(w,k.hostId);h.owner='player';h.protected=true;} for (const id of k.items)
        findPart(w, id).owner = 'player'; return id; }
    function unpack(w, id) { const k = w.kits.find(k => k.id === id); need(k && k.owner === 'player' && k.status === 'packed', 'No owned sealed kit'); for (const id of k.items) {
        const p = findPart(w, id);
        need(p.owner === 'player' && p.kit === k.id, 'Kit custody mismatch');
        p.kit = null;
    } k.status = 'unpacked'; if(k.hostId){const h=findSpec(w,k.hostId);h.kit=null;registerHost(w,h.id);} return copy(k.items); }
    function contract(w, id) { const o = w.contracts.find(o => o.id === id); need(o, 'Unknown order'); return o; }
    function matches(w, p, o) { const a = descriptor(w, p); return p.product === o.product && p.condition === 'usable' && (!o.maxMass || a.mass <= o.maxMass) && Object.entries(o.requirements).every(([k, q]) => typeof a.stats[k] === 'number' && (q.min === undefined || a.stats[k] >= q.min) && (q.max === undefined || a.stats[k] <= q.max)); }
    function acceptOrder(w, id) { const o = contract(w, id); need(o.status === 'offered', 'Order is not open'); const n = o.quantity * o.unitPrice; transfer(w, 'shop', 'escrow', n, 'Fund measured order', id); o.escrow = n; o.deadline = w.tick + o.window; o.status = 'active'; return id; }
    function deliver(w, id, ids) { const o = contract(w, id); need(o.status === 'active' && w.tick <= o.deadline, 'Order inactive or late'); need(Array.isArray(ids) && ids.length > 0 && new Set(ids).size === ids.length && ids.length <= o.quantity - o.delivered.length, 'Invalid delivery quantity'); for (const id of ids) {
        const p = findPart(w, id);
        need(availablePart(w, id) && !p.legacy && !protectedDraft(w, id) && matches(w, p, o), 'Delivery requires loose, owned, measured assemblies meeting this product specification');
    } const n = ids.length * o.unitPrice; need(o.escrow >= n, 'Order lacks reserved funds'); transfer(w, 'escrow', 'player', n, 'Accepted measured delivery', o.id); o.escrow -= n; for (const id of ids) {
        findPart(w, id).owner = 'shop';
        o.delivered.push(id);
    } if (o.delivered.length === o.quantity)
        o.status = 'complete'; settleCare(w); return n; }
    function finishRace(w, run) { const pending = w.pendingRace; need(pending, 'No attendance reserved'); need(run && Array.isArray(run.results) && run.results.length === pending.request.entrants.length, 'Wrong computed entrants'); for (const e of pending.request.entrants) {
        const matches = run.results.filter(r => r.host_id === e.build.host_id);
        need(matches.length === 1 && canonical(matches[0].build) === canonical(e.build), 'Result mismatches frozen entry');
        const r = matches[0];
        need(r.finish_time === null || (Number.isFinite(r.finish_time) && r.finish_time >= 0 && r.gates === r.required_gates), 'Invalid finish');
    } pay(w, 3, 'Club attendance', pending.id); step(w, 2); const out = { id: pending.id, attendedAt: w.tick, entry: pending.request, results: copy(run.results), duration: run.frames?.at(-1)?.t ?? null, payout: 0 }; w.results.push(out); if (w.results.length > 12)
        w.results.shift(); w.pendingRace = null; return out; }
    function validate(w) {
        need(w && w.schema === SCHEMA && w.profile === 'W08.HOBBY.1', 'Unsupported world');
        int(w.tick, 0, 100000, 'tick');
        int(w.next, 1, 100000, 'sequence');
        int(w.revision, 1, 1000000, 'revision');
        need(typeof w.seed === 'string' && w.seed.length < 100, 'Invalid seed');
        int(w.careArrears, 0, 1e7, 'arrears');
        need(w.inTransit === 0, 'Uncommitted travel');
        need(Object.keys(w.accounts).sort().join(',') === 'escrow,external,player,services,shop,sponsor', 'Unexpected accounts');
        need(Object.values(w.accounts).reduce((a, b) => a + b, 0) === 362, 'Money conservation failed');
        for (const k of ['player', 'shop', 'services', 'sponsor', 'escrow'])
            int(w.accounts[k], 0, 1e9, 'account');
        int(w.accounts.external, -1e9, 0, 'external');
        need(w.specimens.length <= 2400 && w.parts.length <= 2400 && w.broods.length <= 300, 'Local archive bound');
        const ids = new Set();
        for (const s of w.specimens) {
            need(typeof s.id === 'string' && /^[A-Za-z0-9_.-]{1,120}$/.test(s.id) && !ids.has(s.id), 'Duplicate or unsafe specimen ID');
            ids.add(s.id);
            need(FORMS[s.kind] && ['player', 'shop', 'released', 'boarded'].includes(s.owner), 'Bad form or owner');
            need(s.genes.length === 3 && s.genes.every(g => Array.isArray(g) && g.length === 2 && g.every(x => x === 0 || x === 1)), 'Invalid genes');
            need(['A', 'B'].includes(s.sex) && ['adult', 'nymph', 'root_nymph', 'grub', 'pupa', 'burrow_nymph', 'larva'].includes(s.stage), 'Invalid stage / reproductive role');
            need(['alive', 'anatomy', 'protected', 'measured'].every(k => typeof s[k] === 'boolean'), 'Invalid live state');
            need(C.regions(s.kind).every(k => Object.hasOwn(s.regions, k)), 'Missing anatomy'); if(s.kind==='roach')need(H.PLANS[s.bodyPlan],'Invalid body plan');
            need(Array.isArray(s.schedule) && s.schedule.every(x => Number.isSafeInteger(x.tick) && x.tick > w.tick && ['adult', 'pupa', 'nymph', 'grub', 'larva', 'root_nymph', 'burrow_nymph'].includes(x.stage)), 'Invalid stage schedule');
        }
        for (const s of w.specimens)
            for (const id of s.parents)
                need(ids.has(id), 'Missing parent');
        const parts = new Set();
        for (const p of w.parts) {
            need(!parts.has(p.id), 'Duplicate part');
            parts.add(p.id);
            need(['player', 'shop'].includes(p.owner), 'Invalid part owner');
            if (p.legacy) {
                need(B.BASE.some(a => a.id === p.id), 'Unknown legacy part');
                continue;
            }
            const s = findSpec(w, p.donor), d = PRODUCTS[p.product];
            need(d && FORMS[s.kind].products.includes(p.product), 'Wrong donor product');
            need(d.regions.every(r => s.regions[r] === p.id), 'Anatomy allocation mismatch');
            need(p.snapshot && p.snapshot.id === p.id && p.snapshot.donor === p.donor, 'Missing component snapshot');
            need(canonical(p.snapshot) === canonical(C.descriptor(s, p, B.BASE)), 'Altered component descriptor or inherited measurements');
        }
        for (const s of w.specimens)
            for (const [region, holder] of Object.entries(s.regions))
                if (!['intact', 'damaged'].includes(holder)) {
                    const p = w.parts.find(p => p.id === holder);
                    need(p && p.donor === s.id && PRODUCTS[p.product].regions.includes(region), 'Missing anatomy destination');
                }
        for (const a of B.BASE)
            need(parts.has(a.id), 'Missing historical stock');
        for (const k of w.kits) {
            need(k.items.length === new Set(k.items).size, 'Duplicate kit item');
            for (const id of k.items) {
                const p = findPart(w, id);
                if (k.status === 'packed')
                    need(p.kit === k.id && p.owner === k.owner, 'Pack custody mismatch');
            }
        }
        for (const p of w.parts)
            if (p.kit)
                need(w.kits.some(k => k.id === p.kit && k.status === 'packed' && k.items.includes(p.id)), 'Orphan kit custody');
        let escrow = 0;
        for (const o of w.contracts) {
            int(o.escrow, 0, 10000, 'escrow');
            escrow += o.escrow;
            need(o.delivered.length <= o.quantity && o.delivered.length === new Set(o.delivered).size, 'Invalid order delivery');
            if (o.status === 'active')
                need(o.escrow === (o.quantity - o.delivered.length) * o.unitPrice, 'Order funding mismatch');
        }
        need(escrow === w.accounts.escrow, 'Escrow sum mismatch');
        for (const b of w.broods) {
            const f = FORMS[b.kind];
            need(f && b.parentIds.length === 2 && b.parentIds.every(id => ids.has(id)), 'Invalid brood parents');
            need(b.count === f.profile.count && b.outcomes.length === b.count, 'Invalid brood bounds');
            need(new Set(b.outcomes.map(o=>o.id)).size===b.count,'Duplicate future offspring');
            for(const o of b.outcomes){need(typeof o.survives==='boolean'&&['A','B'].includes(o.sex)&&Array.isArray(o.genes)&&o.genes.length===3&&o.genes.every(g=>Array.isArray(g)&&g.length===2&&g.every(a=>a===0||a===1)),'Invalid recorded brood outcome'); if(b.kind==='roach')need(H.PLANS[o.bodyPlan]&&b.parentIds.some(id=>findSpec(w,id).bodyPlan===o.bodyPlan),'Invalid inherited body plan');}

            need(['eggs', 'growing', 'complete', 'failed'].includes(b.stage), 'Invalid brood state');
        }
        need(occupied(w) <= w.capacity.holding, 'Unsafe total occupancy');
        for (const f of Object.keys(C.FACILITIES))
            need(nursery(w, f) <= (w.facilities[f] || 0), 'Unsafe stage-specific nursery');
        need(w.capacity.holding >= 24 && w.capacity.holding <= 120, 'Invalid capacity');
        sync(w);
        validateHosts(w);
        B.restore(JSON.stringify(w.bench));
        need([...w.bench.fitted.placements, ...w.bench.draft.placements].every(p => availablePart(w, p.id)), 'Build uses sold or packed stock');
        need(w.ledger.length <= 24000, 'Local ledger bound');
        return true;
    }
    function apply(input, cmd) {
        need(cmd && typeof cmd.type === 'string', 'Missing command');
        const key = cmd.key || null, payload = canonical({ ...cmd, key: undefined });
        if (key && input.receipts[key]) {
            need(input.receipts[key].payload === payload, 'Transaction identity reused with changed content');
            return { world: copy(input), result: copy(input.receipts[key].result), replayed: true };
        }
        const w = copy(input);
        sync(w);
        need(!w.pendingRace || ['raceFinish', 'raceCancel'].includes(cmd.type), 'Race attendance in progress');
        let result = null;
        try {
            switch (cmd.type) {
                case 'registerHost': result=registerHost(w,cmd.id);break;
            case 'switchHost': result=switchHost(w,cmd.id);break;
            case 'layoutKit': result=layoutKit(w,cmd.id);break;
            case 'createLine': result=createLine(w,cmd);break;
            case 'selectionProject': result=setSelection(w,cmd);break;
            case 'field':
                    result = fieldRun(w, cmd.route, cmd.method || 'protect');
                    break;
                case 'assay': {
                    const s = findSpec(w, cmd.id);
                    need(s.owner === 'player' && s.alive && [FORMS[s.kind].stage, 'adult'].includes(s.stage) && !s.measured, 'Needs living unmeasured usable-stage stock');
                    need(s.kind !== 'wax' || s.stage === 'larva', 'Measure waxmoth tissue as a larva; retain those observations when it becomes an adult');
                    need(!parentBusy(w, s.id), 'Finish pairing first');
                    need(spendable(w) >= 2 + forecast(w, 1).cashCost, 'Need assay and care');
                    pay(w, 2, 'Controlled assay', s.id);
                    s.working = 'assay';
                    const stage = s.stage;
                    step(w, 1);
                    delete s.working;
                    need(s.stage === stage, 'Stage changes during the assay; start earlier');
                    s.measured = true;
                    s.evidence = 'W07 stage ' + stage + ' controlled assay';
                    result = publicSpec(w, s);
                    break;
                }
                case 'protect': {
                    const s = findSpec(w, cmd.id);
                    need(s.owner === 'player' && !parentBusy(w, s.id), 'Stock not owned or pairing');
                    s.protected = !s.protected;
                    break;
                }
                case 'project':
                    need(['synchrony', 'return', 'commerce'].includes(cmd.value), 'Unknown project');
                    w.project = cmd.value;
                    break;
                case 'breed':
                    result = broodStart(w, cmd.parents, 2, !!cmd.auto);
                    if (cmd.repeat)
                        w.auto.loop = { parents: copy(cmd.parents), sellSurplus: !!cmd.auto, enabled: true, blocked: null, last: result };
                    step(w, 1);
                    break;
                case 'pauseLoop':
                    if (w.auto.loop)
                        w.auto.loop.enabled = false;
                    break;
                case 'prepare':
                    result = prepare(w, cmd.id, cmd.product);
                    break;
                case 'sellLive':
                    result = sellSpec(w, cmd.id);
                    break;
                case 'sellPart':
                    result = sellPart(w, cmd.id);
                    break;
                case 'bulkSell': {
                    need(Array.isArray(cmd.ids) && cmd.ids.length === new Set(cmd.ids).size && cmd.ids.length <= 100, 'Invalid batch');
                    for (const id of cmd.ids) {
                        const s = findSpec(w, id);
                        need(w.project === 'commerce' || (s.measured && !/complement|contribution/.test(publicSpec(w, s).reason)), 'Review possible project stock first');
                    }
                    result = cmd.ids.reduce((n, id) => n + sellSpec(w, id), 0);
                    break;
                }
                case 'board': {
                    const s = findSpec(w, cmd.id);
                    need(s.owner === 'player' && !s.protected && !parentBusy(w, s.id) && s.alive && Object.values(s.regions).some(v => v !== 'intact'), 'Release protection; supported-body placement only');
                    pay(w, 2, 'Supported donor placement', s.id);
                    s.owner = 'boarded';
                    break;
                }
                case 'release': {
                need(!w.hosts?.[cmd.id]&&!findSpec(w,cmd.id).kit,'Registered or packed host cannot be released');
                    const s = findSpec(w, cmd.id);
                    need(s.owner === 'player' && s.alive && !s.protected && !parentBusy(w, s.id) && Object.values(s.regions).every(v => v === 'intact'), 'Only intact unreserved stock may be released');
                    s.owner = 'released';
                    break;
                }
                case 'wait':
                    step(w, cmd.turns || 1);
                    break;
                case 'work':
                    need(w.accounts.shop >= 16, 'Job desk unfunded');
                    transfer(w, 'shop', 'player', 16, 'Club setup labor');
                    step(w, 2);
                    settleCare(w);
                    break;
                case 'expand':
                    need(w.capacity.holding < 120, 'Local rack limit');
                    pay(w, 40, 'Additional holding rack');
                    w.capacity.holding += 12;
                    w.facilities.dry += 6;
                    w.capacity.nursery += 6;
                    break;
                case 'facility': {
                    const f = C.FACILITIES[cmd.id];
                    need(f && !w.facilities[cmd.id], 'Unknown or already owned stage facility');
                    pay(w, f.cost, 'Build ' + f.name);
                    w.facilities[cmd.id] = 6;
                    w.capacity.nursery += 6;
                    break;
                }
                case 'dispatch':
                    w.auto.dispatch = !!cmd.value;
                    if (w.auto.dispatch)
                        autoDispatch(w);
                    break;
                case 'fit':
                    result = fit(w);
                    break;
                case 'buyLive':
                    result = buyLive(w, cmd.id);
                    break;
                case 'buyPart':
                    result = buyPart(w, cmd.id);
                    break;
                case 'buyKit':
                    result = buyKit(w, cmd.id);
                    break;
                case 'unpack':
                    result = unpack(w, cmd.id);
                    break;
                case 'acceptOrder':
                    result = acceptOrder(w, cmd.id);
                    break;
                case 'deliverOrder':
                    result = deliver(w, cmd.id, cmd.ids);
                    break;
                case 'cancelOrder': {
                    const o = contract(w, cmd.id);
                    need(o.status === 'active', 'No active order');
                    if (o.escrow)
                        transfer(w, 'escrow', 'shop', o.escrow, 'Cancel unfilled order', o.id);
                    o.escrow = 0;
                    o.status = 'cancelled';
                    break;
                }
                case 'raceStart': {
                    need(!parentBusy(w,w.bench.host_id),'This host is pairing; enter another racer or wait'); const q = B.raceRequest(w.bench, cmd.settings || {});
                    need(spendable(w) >= 3 + forecast(w, 2).cashCost, 'Need attendance and care');
                    q.metadata.world_clock_integrated = true;
                    q.metadata.world_start = w.tick;
                    q.metadata.world_profile = w.profile;
                    q.metadata.attendance_turns = 2;
                    const id = `W07.RACE.${w.next++}`;
                    w.pendingRace = { id, request: q };
                    result = copy(q);
                    break;
                }
                case 'raceFinish':
                    result = finishRace(w, cmd.result);
                    break;
                case 'raceCancel':
                    w.pendingRace = null;
                    break;
                default: throw Error('Unknown world action');
            }
            w.revision++;
            if (key) {
                need(typeof key === 'string' && key.length < 120, 'Invalid transaction identity');
                w.receipts[key] = { payload, result: copy(result) };
            }
            validate(w);
            return { world: w, result };
        }
        catch (e) {
            sync(input);
            throw e;
        }
    }
    function custody(w){return Object.fromEntries(w.parts.map(p=>{
        const fitted=allBenches(w).find(b=>b.fitted.placements.some(x=>x.id===p.id));
        return[p.id,{owner:p.owner,custody:p.kit?'kit':p.owner!=='player'?'transferred':fitted?'installed':'inventory',holder:p.kit??(p.owner!=='player'?p.owner:fitted?.host_id??null),reserved_by:reservedHost(w,p.id)}];
    }));}
    function save(w) { validate(w); return JSON.stringify({ format: 'RRR.W08.SAVE.1', world: w }); }
    function migrate(v) {
        need(v.schema === 'RRR.W06.WORLD.1' && v.profile === 'W06.SUPPLY.1', 'Unsupported migration');
        const w = copy(v);
        w.schema = SCHEMA;
        w.profile = 'W08.HOBBY.1';
        w.facilities = { dry: w.capacity.nursery };
        w.accounts.escrow = 0;
        for (const s of w.specimens) {
            s.regions = Object.fromEntries(C.regions(s.kind).map(r => [r, s.anatomy ? 'intact' : 'damaged']));
            s.schedule = [];
        }
        for (const p of w.parts) {
            p.kit = null;
            if (p.legacy)
                continue;
            const s = findSpec(w, p.donor);
            p.product = s.kind === 'hopper' ? 'hoppers' : 'redline';
            p.condition = 'usable';
            for (const r of PRODUCTS[p.product].regions)
                s.regions[r] = p.id;
            p.snapshot = C.descriptor(s, p, B.BASE);
        }
        for (const b of w.broods) {
            b.kind = 'hopper';
            b.facility = 'dry';
            if (b.stage === 'nymphs')
                b.stage = 'growing';
            for (const s of w.specimens.filter(s => s.brood === b.id && s.stage !== 'adult' && s.alive))
                s.schedule = [{ tick: b.mature, stage: 'adult' }];
        }
        for (const key of Object.keys(ROUTES))
            w.field[key] ??= { epoch: -1, taken: [] };
        seedRetail(w); seedHosts(w);
        w.pendingRace = null;
        w.migration = 'W06 to W07: old identities preserved; forward race model changes; shop stock explicitly seeded; no player cash granted';
        validate(w);
        return w;
    }
    function migrate07(v){
        need(v.schema==='RRR.W07.WORLD.1'&&v.profile==='W07.SUPPLY.1','Unsupported W07 migration');
        const w=copy(v);w.schema=SCHEMA;w.profile='W08.HOBBY.1';w.pendingRace=null;
        seedHosts(w);w.migration='W07 → W08: original host, stock, money and ancestry preserved; new supplier hosts and kits explicitly seeded. Old results are not recomputed.';
        validate(w);return w;
    }
    function restore(text) {
        need(typeof text==='string'&&text.length<16000000,'Save exceeds local bound'); const d=JSON.parse(text);
        if(d.format==='RRR.W06.SAVE.1')return migrate(d.world);
        if(d.format==='RRR.W07.SAVE.1')return migrate07(d.world);
        need(d.format==='RRR.W08.SAVE.1','Not a supported world backup');const w=copy(d.world);validate(w);return w;
    }
    const api = { H, E, allBenches, reservedHost, registerHost, migrate07, SCHEMA, FORMS, ROUTES, initial, traits, live, active, occupied, nursery, parentBusy, publicSpec, descriptor, sync, available, apply, validate, save, restore, forecast, upkeep, spendable, quoteSpec, eligibleParts, custody, rng, preparable, matches, availablePart, migrate };
    root.RRRWorld = api;
    if (typeof module !== 'undefined')
        module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
