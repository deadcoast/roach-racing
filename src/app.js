/* Standalone local workshop controller. No network, dependencies, or precomputed races. */
(function () {
    'use strict';
    const B = RRRBench, R = RRRRace, A = RRRArt, $ = id => document.getElementById(id), esc = A.esc, STORAGE = 'RRR.W08.WORLD.1';
    const W = RRRWorld, C = RRRCatalog, H = RRRHosts, E = RRREvidence;
    let shopKind = "hopper", fieldRoute = "verge";
    let world = W.initial();
    W.sync(world);
    let state = world.bench, selected = 'H-6', cutaway = false, tab = 'bench', undo = [], redo = [], drag = null, toastTimer = null, saving = true;
    let runs = [], current = null, pinned = null, playing = false, t = 0, rate = 4, lastStamp = 0, worker = null, job = 0, images = {}, lastEvent = '', canvasW = 0, canvasH = 0, computing = false;
    try {
        const raw = localStorage.getItem(STORAGE);
        if (raw) {
            world = W.restore(raw);
            if (world.pendingRace)
                world = W.apply(world, { type: 'raceCancel' }).world;
            state = world.bench;
            W.sync(world);
        }
        else {
            const prior = localStorage.getItem('RRR.W07.WORLD.1') || localStorage.getItem('RRR.W06.WORLD.1');
            if (prior) {
                world = W.restore(prior);
                state = world.bench;
                W.sync(world);
            }
            else {
                const legacy = localStorage.getItem('RRR.W05.BENCH.1');
                if (legacy) {
                    world = W.initial(B.restore(legacy));
                    state = world.bench;
                    W.sync(world);
                }
            }
        }
    }
    catch (e) {
        saving = false;
        $('save-status').textContent = 'Autosave unavailable or rejected · export a world backup';
    }
    function tell(msg) { $('toast').textContent = msg; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, 3600); }
    function persist() { try {
        world.bench = state;
        W.validate(world);
        localStorage.setItem(STORAGE, W.save(world));
        saving = true;
        $('save-status').textContent = 'Shared world autosaved · export a world backup for portability';
    }
    catch (e) {
        saving = false;
        $('save-status').textContent = 'Memory only · browser storage unavailable · export your world';
    } }
    function dirty() { return B.canonical(state.draft) !== B.canonical(state.fitted); }
    function checkpoint() { undo.push(B.copy(state.draft)); if (undo.length > 60)
        undo.shift(); redo = []; }
    function change(fn, record = true) { try {
        if (computing)
            throw Error('Finish race computation before editing.');
        const old = B.canonical(state.draft), next = fn(B.copy(state));
        B.validateDesign(next.draft);
        if (!next.draft.placements.every(p => W.availablePart(world, p.id)))
            throw Error('Required component is no longer owned.');
        if (B.canonical(next.draft) === old)
            return;
        if (record)
            checkpoint();
        state = next;
        persist();
        renderBench();
        renderChecks();
    }
    catch (e) {
        tell(e.message);
    } }
    function select(id) { if (!Object.hasOwn(B.byId, id) || !W.availablePart(world,id))
        return; selected = id; document.querySelector('.inspector').scrollTop = 0; if (B.byId[id].layer === 'internal')
        cutaway = true; renderInventory(); renderPart(); renderBench(); $('inventory').querySelector(`[data-stock="${id}"]`)?.scrollIntoView({ block: 'nearest' }); }
    function drawGrid() { let s = '<g stroke="#9e9a87" opacity=".08" stroke-width=".7">'; for (let x = 30; x < 640; x += 32)
        s += `<path d="M${x} 52V580"/>`; for (let y = 55; y < 600; y += 32)
        s += `<path d="M20 ${y}H620"/>`; s += '</g><g stroke="#baa883" opacity=".36" stroke-width="1"><path d="M320 48v30 M305 63h30 M320 549v28 M305 562h30"/></g>'; return s; }
    function renderInventory() { if (drag?.fromTray)
        return; const focus = document.activeElement?.dataset.stock; $('inventory').innerHTML = W.available(world).map((a, i) => { const p = state.draft.placements.some(v => v.id === a.id), f = state.fitted.placements.some(v => v.id === a.id); return `<button draggable="true" class="stock${selected === a.id ? ' selected' : ''}" data-stock="${a.id}" aria-label="Inspect ${esc(a.name)}" aria-pressed="${selected === a.id}"><svg viewBox="${['drive', 'reserve'].includes(a.kind) ? '-47 -48 94 96' : a.kind === 'horn' ? '-49 -115 98 145' : '-150 -100 300 230'}" aria-hidden="true">${A.moduleShape(a.kind, a.colour)}</svg><span><strong>${esc(a.short || a.name)}</strong>${a.product ? `<span class="stock-source" title="${esc(a.donor)}">${esc(a.donor)}</span>` : ""}<span class="sub">${p ? (f ? 'FITTED' : 'IN DRAFT') : (f ? 'REMOVAL DRAFT' : 'IN TRAY')} · ${a.mass.toFixed(2)} M</span></span><span class="dot" aria-hidden="true">${p ? '◆' : '·'}</span></button>`; }).join(''); if (focus)
        $('inventory').querySelector(`[data-stock="${focus}"]`)?.focus({ preventScroll: true }); }
    function renderPart() {
        if(!W.availablePart(world,selected))selected=W.available(world)[0]?.id;
        const a = B.byId[selected], i = W.available(world).findIndex(v => v.id === selected);
        if(!a){$('part-info').innerHTML='<p>No loose or fitted sects on this bench.</p>';return;}
        $('selected-index').textContent = `${String(i + 1).padStart(2, '0')} / ${W.available(world).length}`;
        $('part-info').innerHTML = `${gradeMarkup(a)}<h3 class="part-title">${esc(a.short || a.name)}</h3><p>${esc(a.purpose)}</p><div class="part-measure">${esc(a.measure)}</div><dl class="datum"><dt>Specimen</dt><dd>${esc(a.donor)}</dd><dt>Assembly</dt><dd>${esc(a.id)}</dd><dt>Source</dt><dd>${esc(a.source)}</dd></dl><div class="part-actions"><button class="primary" id="fit-part">Fit to draft</button><button id="remove-part">Return to tray</button></div><details class="expert"><summary>Why keep or breed it?</summary><p style="margin-top:9px">${esc(a.next)}</p><p class="tiny" style="margin-top:10px">${esc(a.origin)}. Measurements and masses are declared test profiles.</p></details>`;
        $('fit-part').onclick = () => change(s => B.place(s, selected));
        $('remove-part').onclick = () => change(s => B.remove(s, selected));
    }
    function renderBench() {
        const d = state.draft, a = B.byId[selected], p = d.placements.find(p => p.id === selected), issues = B.fitting(d,state.host_profile), focus = document.activeElement?.closest?.('[data-part]')?.dataset.part;
        let region = '';
        if (p || drag?.fromTray) {
            const [bx1,bx2,by1,by2]=a.bounds,sx=state.host_profile.scaleX,sy=state.host_profile.scaleY; const [x1,x2,y1,y2]=[bx1*sx,bx2*sx,by1*sy,by2*sy];
            region = `<rect x="${320 + x1 * 165 - 5}" y="${310 + y1 * 180 - 5}" width="${(x2 - x1) * 165 + 10}" height="${(y2 - y1) * 180 + 10}" fill="#c4a46a" fill-opacity=".07" stroke="#a78c55" stroke-dasharray="3 4" stroke-width="1"/><text x="${320 + x2 * 165 + 15}" y="${310 + y1 * 180}" fill="#b3a077" font-family="monospace" font-size="8">ROOT RAIL</text>`;
        }
        $('bench').innerHTML = drawGrid() + region + A.roach(d, { selected, cutaway, issues, hostProfile:state.host_profile });
        if (focus)
            $('bench').querySelector(`[data-part="${focus}"]`)?.focus({ preventScroll: true });
        $('cutaway').setAttribute('aria-pressed', String(cutaway));
        $('host-label').textContent = state.host_profile.name.toUpperCase() + ' / ' + d.name;
        $('draft-caption').textContent = dirty() ? 'DRAFT · NOT YET FITTED' : `COMMITTED BUILD / ${String(state.revision).padStart(3, '0')}`;
        let b = null;
        try {
            b = B.compile(d, state.revision,state.host_profile);
        }
        catch (e) { }
        $('mass').textContent = b ? b.mass.toFixed(2) : '—';
        $('cadence').textContent = b ? b.cadence.toFixed(1) : '—';
        $('leverage-read').textContent = b ? b.leverage.toFixed(2) : '—';
        renderMetrics(b);
        $('fit-read').textContent = issues.length ? 'BLOCKED' : d.placements.length + ' sects';
        $('rotation').disabled = !p;
        $('rotation').value = p?.angle || 0;
        $('rotation-value').textContent = (p?.angle || 0) + '°';
        document.querySelectorAll('[data-nudge],#align').forEach(x => x.disabled = !p);
        $('root-feedback').textContent = p ? `x ${p.x.toFixed(2)} / y ${p.y.toFixed(2)} · ${a.layer} attachment layer` : 'Fit this component to enable position controls.';
        for (const k of ['leverage', 'preload', 'stance', 'reserve_fraction']) {
            const el = $(k);
            if (document.activeElement !== el)
                el.value = d.tuning[k];
        }
        $('preload').disabled = !d.placements.some(p => B.byId[p.id].kind === 'hopper');
        $('leverage-value').textContent = d.tuning.leverage.toFixed(2);
        $('preload-value').textContent = d.tuning.preload.toFixed(2);
        $('stance-value').textContent = d.tuning.stance.toFixed(2);
        $('reserve-value').textContent = Math.round(d.tuning.reserve_fraction * 100) + '%';
        $('approach').value = d.approach;
        if (document.activeElement !== $('name'))
            $('name').value = d.name;
        if (document.activeElement !== $('number'))
            $('number').value = d.number;
        document.querySelectorAll('[data-livery]').forEach(e => e.setAttribute('aria-pressed', String(e.dataset.livery === d.livery)));
        $('commit').disabled = !dirty() || issues.length > 0;
        $('discard').disabled = !dirty();
        $('undo').disabled = !undo.length;
        $('redo').disabled = !redo.length;
        $('commit-label').textContent = issues.length ? 'FIT NEEDS ATTENTION' : dirty() ? 'DRAFT CHANGED' : `BUILD ${String(state.revision).padStart(3, '0')} · FITTED`;
        $('commit-detail').textContent = issues.length ? `${issues.length} physical fitting issue${issues.length === 1 ? '' : 's'}; existing build unchanged.` : dirty() ? 'Fit all changes together before race entry.' : `${d.placements.length} fitted sects · native anatomy fills the rest.`;
        $('fit-errors').hidden = !issues.length;
        $('fit-errors').textContent = issues.map(i => i.message).join(' ');
        $('fit-part') && ($('fit-part').disabled = !!p);
        $('remove-part') && ($('remove-part').disabled = !p);
        renderInventory();
    }
    function renderMetrics(b) { if (!$('pcr-metrics'))
        return; if (!b) {
        $('pcr-metrics').textContent = 'Resolve fitting to compute the profile.';
        return;
    } const free = (1 / (1 / b.cadence + (b.release_delay || 0))) * b.stride / b.leverage; const rows = [['Unloaded pace', free.toFixed(2) + ' L/T'], ['Drive force', b.force.toFixed(2) + ' F'], ['Contact / clean', b.grip.toFixed(2)], ['Contact / loose', (b.rough_grip || b.grip).toFixed(2)], ['Corner support', b.lateral_accel.toFixed(2) + ' A'], ['Correction rate', b.correction_rate.toFixed(2) + ' L/T'], ['Drive efficiency', (100 * b.efficiency).toFixed(1) + '%'], ['Capacity / delivery', b.reserve.toFixed(0) + ' E / ' + b.delivery.toFixed(1) + ' E/T'], ['Landing recovery', (b.settle * (1 - b.damping)).toFixed(3) + ' T'], ['Hold-down / drag', (b.downforce || 0).toFixed(3) + ' / ' + b.aero_drag.toFixed(3)]]; $('pcr-metrics').innerHTML = rows.map(([a, v]) => `<div><span>${a}</span><b>${v}</b></div>`).join(''); }
    function renderChecks() { let error = ''; try {
        world.bench = state;
        W.apply(world, { type: 'raceStart', settings: raceSettings() });
    }
    catch (e) {
        error = e.message;
    } $('race-errors').hidden = !error; $('race-errors').textContent = error; $('run').disabled = !!error || computing; $('go-race').disabled = false; }
    function showTab(name) { tab = name; document.querySelectorAll('[data-tab]').forEach(e => { const on = e.dataset.tab === name; e.setAttribute('aria-selected', String(on)); e.tabIndex = on ? 0 : -1; }); for (const v of ['bench', 'race', 'sheets', 'stock', 'shop', 'stable'])
        $('view-' + v).hidden = v !== name; if (name === 'race') {
        renderChecks();
        resizeRace();
    } if(name==='stable')renderStable(); if(name==='shop')renderShop(); if(name==='bench')renderHostStrip(); if (name === 'sheets')
        renderCards(); if (name === 'stock')
        renderWorld(); if (name !== 'race')
        playing = false; }
    function raceSettings() { return { course: $('course').value, equipment: $('equipment').value, rival: $('rival').value }; }
    function download(data, name) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    function loadDraft(d) { try {
        if (computing)
            throw Error('Finish the current attendance first.');
        B.validateDesign(d);
        if (!d.placements.every(p => W.availablePart(world, p.id)))
            throw Error('This sheet needs parts no longer owned; it grants no replacement stock.');
        checkpoint();
        state.draft = B.copy(d);
        persist();
        showTab('bench');
        renderBench();
        tell('Build sheet loaded as a draft. Existing fitted stock is unchanged.');
    }
    catch (e) {
        tell(e.message);
    } }
    function renderCards() { $('cards').innerHTML = state.saved_cards.length ? state.saved_cards.map((d, i) => `<article class="sheet-card"><svg viewBox="0 0 640 600" aria-label="${esc(d.name)} assembly">${A.roach(d, { interactive: false, hostProfile:state.host_profile })}</svg><div class="meta"><div class="eyebrow">BUILD SHEET / ${String(i + 1).padStart(2, '0')}</div><h2>${esc(d.name)}</h2><p>${d.placements.length} components · ${esc(d.approach)} · leverage ${d.tuning.leverage.toFixed(2)}</p><button data-load-card="${i}">Load as draft</button><button class="quiet" data-delete-card="${i}" aria-label="Delete build sheet ${esc(d.name)}">Remove</button></div></article>`).join('') : '<div class="empty"><h2 style="font:28px Georgia;margin-bottom:9px">Keep a favourite.</h2><p>Your own arrangements, ready for the next race.<br>They reserve no parts and create no duplicates.</p></div>'; }
    function runRace() {
        let request;
        try {
            world.bench = state;
            const started = W.apply(world, { type: 'raceStart', settings: raceSettings() });
            world = started.world;
            state = world.bench;
            request = started.result;
            persist();
            renderWorld();
        }
        catch (e) {
            tell(e.message);
            renderChecks();
            return;
        }
        const token = ++job;
        computing = true;
        playing = false;
        $('run').disabled = true;
        $('run').textContent = 'Computing…';
        $('race-event').textContent = 'A new simulation is using the committed build. Results are not selected from a preset.';
        const success = result => { if (token !== job)
            return; try {
            const closed = W.apply(world, { type: 'raceFinish', result: { results: result.results, frames: [result.frames.at(-1)] } });
            world = closed.world;
            state = world.bench;
            W.sync(world);
            persist();
            renderWorld();
        }
        catch (e) {
            failure(e);
            return;
        } computing = false; if (worker) {
            worker.terminate();
            worker = null;
        } result.metadata = B.copy(request.metadata); result.run_id = world.results.at(-1).id; result.input_snapshot = B.copy(request); runs.unshift(result); if (runs.length > 8)
            runs.pop(); setRace(result, true); $('run').textContent = 'Race this build'; renderChecks(); renderHistory(); };
        const failure = error => { if (token !== job)
            return; computing = false; if (world.pendingRace) {
            world = W.apply(world, { type: 'raceCancel' }).world;
            state = world.bench;
            persist();
            renderWorld();
        } if (worker) {
            worker.terminate();
            worker = null;
        } $('run').textContent = 'Race this build'; renderChecks(); $('race-errors').hidden = false; $('race-errors').textContent = 'Simulation stopped: ' + error.message; tell(error.message); };
        let fallbackStarted = false;
        function fallback() { if (fallbackStarted || token !== job)
            return; fallbackStarted = true; worker = null; try {
            const sim = new R.Race(request.course, request.entrants, request.equipment, request.dt);
            const chunk = () => { if (token !== job)
                return; try {
                for (let i = 0; i < 100 && !sim.done(); i++)
                    sim.step();
                if (sim.done())
                    success(sim.result());
                else
                    setTimeout(chunk, 0);
            }
            catch (e) {
                failure(e);
            } };
            chunk();
        }
        catch (e) {
            failure(e);
        } }
        try {
            const source = $('engine-source').textContent + '\nonmessage=e=>{try{const q=e.data,r=new RRRRace.Race(q.course,q.entrants,q.equipment,q.dt).run();postMessage({ok:true,result:r});}catch(error){postMessage({ok:false,error:error.message});}};';
            const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
            worker = new Worker(url);
            URL.revokeObjectURL(url);
            worker.onmessage = e => e.data.ok ? success(e.data.result) : failure(new Error(e.data.error));
            worker.onerror = () => { worker?.terminate(); fallback(); };
            worker.postMessage(request);
        }
        catch (e) {
            fallback();
        }
    }
    function endTime() { return current ? current.frames[current.frames.length - 1].t : 0; }
    function setRace(result, autoplay = false) {
        current = result;
        t = 0;
        lastEvent = '';
        playing = autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        images = {};
        for (const row of current.results) {
            const d = row.build.design_snapshot || npcDesign(row.build), svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="600" viewBox="0 0 640 600">${A.roach(d, { interactive: false, hostProfile:row.build.body_profile })}</svg>`, img = new Image();
            img.onload = () => drawRace();
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            images[row.id] = img;
        }
        const focusBuild = current.results.find(v => v.host_id === current.metadata.host_id).build;
        $('focus-roach').innerHTML = `<svg viewBox="0 0 640 600" aria-label="Recorded racer build">${A.roach(focusBuild.design_snapshot, { interactive: false, hostProfile:focusBuild.body_profile })}</svg><div class="id">${esc(focusBuild.name)}<br>${esc(focusBuild.hopper_source || 'Native legs')}<br><span id="focus-state" class="muted">AT THE LINE</span></div>`;
        $('standings').innerHTML = current.results.map(row => `<div class="race-row" data-runner="${esc(row.id)}"><span class="place">—</span><div><strong>${esc(row.name)}</strong><small>At the line</small></div><span class="row-time">—</span></div>`).join('');
        for (const id of ['play', 'replay-start', 'scrub', 'end', 'pin', 'export-race', 'result-to-bench'])
            $(id).disabled = false;
        $('race-title').textContent = `${result.metadata.course_label.toUpperCase()} / BUILD ${result.metadata.build_revision}`;
        $('race-mode').textContent = result.equipment.toUpperCase() + ' · ATTENDANCE SETTLED';
        $('run-summary').textContent = 'Frozen build ' + result.metadata.build_revision + '. Parts, positions, finish, and tuning stay attached to this run.';
        resizeRace();
        renderComparison();
    }
    function npcDesign(b) { const d = B.copy(B.initial().draft); d.name = b.name; d.number = '23'; d.livery = 'ivory'; d.placements = []; if (b.horn)
        d.placements.push({ id: 'W05.HORN', ...B.copy(B.byId['W05.HORN'].default) }); if (b.claws)
        d.placements.push({ id: 'W05.CLAWS', ...B.copy(B.byId['W05.CLAWS'].default) }); return d; }
    function rowsAt(time) { const fs = current.frames; let lo = 0, hi = fs.length - 1; while (lo < hi) {
        const m = Math.ceil((lo + hi) / 2);
        if (fs[m].t <= time)
            lo = m;
        else
            hi = m - 1;
    } const a = fs[lo], b = fs[Math.min(lo + 1, fs.length - 1)], u = b.t > a.t ? (time - a.t) / (b.t - a.t) : 0; return a.runners.map(r => { const q = b.runners.find(v => v.id === r.id), v = { ...r }; for (const k of ['s', 'd', 'z', 'v', 'energy'])
        v[k] = r[k] + (q[k] - r[k]) * R.clip(u, 0, 1); return v; }); }
    function resizeRace() { if ($('view-race').hidden)
        return; const cv = $('race-canvas'), rect = cv.getBoundingClientRect(), pr = Math.min(2, devicePixelRatio || 1); canvasW = rect.width; canvasH = rect.height; cv.width = Math.round(canvasW * pr); cv.height = Math.round(canvasH * pr); cv.getContext('2d').setTransform(pr, 0, 0, pr, 0, 0); drawRace(); }
    function drawRace() {
        if ($('view-race').hidden || canvasW < 1)
            return;
        const ctx = $('race-canvas').getContext('2d'), course = current ? new R.Course(current.course) : R.foundryCourse(20, 2), W = canvasW, H = canvasH;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#202426';
        ctx.fillRect(0, 0, W, H);
        const samples = [];
        for (let s = 0; s < course.length; s += .15)
            samples.push(course.pose(s));
        const xs = samples.map(v => v[0]), ys = samples.map(v => v[1]), minx = Math.min(...xs) - 1.65, maxx = Math.max(...xs) + 1.65, miny = Math.min(...ys) - 1.7, maxy = Math.max(...ys) + 1.7, scale = Math.min((W - 35) / (maxx - minx), (H - 88) / (maxy - miny)), ox = (W - (maxx - minx) * scale) / 2 - minx * scale, oy = 48 + (H - 88 - (maxy - miny) * scale) / 2 - miny * scale;
        const xy = (x, y) => [ox + x * scale, oy + y * scale];
        function track(d = 0) { ctx.beginPath(); for (let s = 0; s < course.length + .05; s += .06) {
            const [x, y] = course.pose(s % course.length, d), [u, v] = xy(x, y);
            if (s === 0)
                ctx.moveTo(u, v);
            else
                ctx.lineTo(u, v);
        } ctx.closePath(); }
        track();
        ctx.lineWidth = 2.65 * scale;
        ctx.strokeStyle = '#12181a';
        ctx.stroke();
        track();
        ctx.lineWidth = 2.4 * scale;
        ctx.strokeStyle = '#57564b';
        ctx.stroke();
        for (const offset of [-1.10, 1.10]) {
            track(offset);
            ctx.strokeStyle = '#b0a17b';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        track();
        ctx.setLineDash([6, 9]);
        ctx.strokeStyle = '#e5d2a324';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        let ds = 0;
        for (let i = 0; i < course.pieces.length; i++) {
            const [x, y, h] = course.pose(ds), [u, v] = xy(x, y);
            ctx.save();
            ctx.translate(u, v);
            ctx.rotate(h);
            ctx.beginPath();
            ctx.moveTo(0, -1.2 * scale);
            ctx.lineTo(0, 1.2 * scale);
            ctx.strokeStyle = '#292d29';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#bdb59c';
            ctx.font = '9px monospace';
            ctx.fillText(String(i + 1).padStart(2, '0'), 3, -1.39 * scale);
            ctx.restore();
            ds += course.pieces[i].length;
        }
        const [sx, sy] = xy(0, 0);
        for (let i = 0; i < 10; i++) {
            ctx.fillStyle = i % 2 ? '#d7ceb1' : '#232725';
            ctx.fillRect(sx - 3, sy - 1.2 * scale + i * .24 * scale, 6, .24 * scale);
        }
        const [cx, cy] = xy((minx + maxx) / 2, (miny + maxy) / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#d0bc8f';
        ctx.font = `${Math.min(35, W * .033)}px Georgia`;
        ctx.fillText('FOUNDRY CLUB', cx, cy - 9);
        ctx.font = '9px monospace';
        ctx.fillStyle = '#a09b89';
        ctx.fillText(current ? 'TWO ROACHES. ONE FINISH.' : 'FIT YOUR BUILD. TAKE THE LINE.', cx, cy + 13);
        if (!current) {
            ctx.textAlign = 'left';
            return;
        }
        const rows = rowsAt(t), order = [...rows].sort((a, b) => { const ra = current.results.find(v => v.id === a.id), rb = current.results.find(v => v.id === b.id); const fa = ra.finish_time !== null && t >= ra.finish_time, fb = rb.finish_time !== null && t >= rb.finish_time; if (fa && fb)
            return (ra.place || 999) - (rb.place || 999); return Number(fb) - Number(fa) || b.s - a.s; });
        for (const r of rows) {
            const record = current.results.find(v => v.id === r.id), [x, y, h] = course.pose(r.s, r.d), [u, v] = xy(x, y), z = r.z * scale, size = Math.max(40, scale * 1.7), img = images[r.id];
            ctx.save();
            ctx.translate(u, v);
            ctx.fillStyle = '#090d0d80';
            ctx.beginPath();
            ctx.ellipse(0, 0, size * .18, size * .09, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.translate(u, v - z);
            ctx.rotate(h + Math.PI / 2);
            if (img?.complete && img.naturalWidth)
                ctx.drawImage(img, -size / 2, -size / 2, size, size);
            else {
                ctx.fillStyle = r.id.startsWith('W05.PLAYER') ? '#c87554' : '#d3c9aa';
                ctx.beginPath();
                ctx.ellipse(0, 0, size * .14, size * .27, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            ctx.fillStyle = r.id.startsWith('W05.PLAYER') ? '#f0b28a' : '#ddd2b6';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(record.build.finish?.number || '23', u, v - z - size * .40);
        }
        order.forEach((r, i) => { const row = current.results.find(v => v.id === r.id), el = $('standings').querySelector(`[data-runner="${CSS.escape(r.id)}"]`), done = row.finish_time !== null && t >= row.finish_time; el.style.order = i; el.querySelector('.place').textContent = done ? String(row.place).padStart(2, '0') : String(i + 1).padStart(2, '0'); el.querySelector('small').textContent = (done ? 'Finished' : r.state) + ' · ' + r.energy.toFixed(1) + ' E'; el.querySelector('.row-time').textContent = done ? row.finish_time.toFixed(3) : `${Math.min(2, Math.floor(r.s / course.length) + 1)}/2`; });
        $('standings').style.display = 'flex';
        $('standings').style.flexDirection = 'column';
        const focusState = rows.find(v => v.id.startsWith('W05.PLAYER'));
        if (focusState && $('focus-state'))
            $('focus-state').textContent = focusState.state.toUpperCase();
        $('scrub').value = endTime() ? t / endTime() * 1000 : 0;
        $('race-time').textContent = t.toFixed(3) + ' T';
        $('play').textContent = playing ? 'Pause' : t >= endTime() ? 'Replay' : 'Play';
        const ev = current.events.filter(v => v.t <= t && v.kind !== 'body_contact').at(-1), key = ev ? ev.t + ev.kind + ev.runner : 'start';
        if (key !== lastEvent) {
            lastEvent = key;
            const names = { takeoff: 'takes off', jump_load: 'loads the hind legs', landing: 'lands', ram_windup: 'commits the horn', ram_contact: 'makes horn contact', ram_miss: 'misses the ram', claw_windup: 'opens the catchclaws', claw_contact: 'holds the rival', claw_miss: 'misses the grasp', overtake: 'takes the position', recovered: 'resumes running', finish: 'crosses the finish' };
            let msg = 'At the release rack. Playback does not recommit the race.';
            if (ev) {
                const who = current.results.find(r => r.id === ev.runner);
                msg = `${ev.t.toFixed(3)} T · ${who.name} ${names[ev.kind] || ev.kind}${ev.airborne ? ' — airborne overtake' : ''}${ev.source ? ' / ' + ev.source : ''}.`;
            }
            $('race-event').textContent = msg;
        }
    }
    function renderHistory() { $('history').innerHTML = runs.map((r, i) => { const p = r.results.find(v => v.host_id === r.metadata.host_id); return `<button class="history-button" data-run="${i}" aria-label="Watch build ${r.metadata.build_revision} run"><span>BUILD ${String(r.metadata.build_revision).padStart(3, '0')} · ${esc(r.metadata.course_label)}</span><strong>${p.finish_time === null ? 'No finish' : p.finish_time.toFixed(3) + ' T'}</strong><span>${esc(p.name)} · ${p.place ? 'place ' + p.place : 'unfinished'}</span></button>`; }).join(''); }
    function renderComparison() { if (!current || !pinned) {
        $('comparison').textContent = 'Pin a completed run to compare the next build under the same conditions.';
        return;
    } const same = current.course.id === pinned.course.id && current.course.laps === pinned.course.laps && current.equipment === pinned.equipment && current.metadata.rival === pinned.metadata.rival; if (!same) {
        $('comparison').textContent = 'Different course, class, or rival: finish-time difference is not a matched build comparison.';
        return;
    } const a = current.results.find(v => v.host_id === current.metadata.host_id), b = pinned.results.find(v => v.host_id === pinned.metadata.host_id); if (a.finish_time === null || b.finish_time === null) {
        $('comparison').textContent = 'A run did not finish. Compare progress and replay rather than a fabricated finish time.';
        return;
    } const delta = a.finish_time - b.finish_time; $('comparison').textContent = `vs pinned build ${pinned.metadata.build_revision}: ${Math.abs(delta).toFixed(3)} T ${Math.abs(delta) < 1e-6 ? 'difference' : delta < 0 ? 'quicker' : 'slower'} · same course, class, rival and starting grid. ${current.metadata.host_id!==pinned.metadata.host_id?'Different hosts: native anatomy and body changed together, not an isolated part test.':''}`; }
    // Render public observations and actual custody; no hidden genotype in the stock cards.
    let stockView = 'all', stockSelected = new Set();
    function insectBadge(kind, stage = 'adult', bodyPlan = null) {
        if(kind==='roach'&&H.PLANS[bodyPlan]){const p=H.PLANS[bodyPlan],d={...B.initial().draft,placements:[],livery:p.colour,number:''};return `<svg viewBox="0 0 640 600" aria-label="${esc(p.name)} / ${esc(stage)}">${A.roach(d,{interactive:false,hostProfile:{scaleX:p.scaleX,scaleY:p.scaleY}})}</svg>`;}
        const colour = (C.FORMS[kind] || C.FORMS.hopper).colour;
        if (stage === 'pupa')
            return `<svg viewBox="-54 -48 108 108" aria-label="Pupal stage"><path d="M0 -34C-28 -25-24 16 0 42C24 16 28 -25 0 -34Z" fill="${colour}" stroke="#453a2b" stroke-width="3"/><path d="M-13 -20Q14 -10 14 22M13 -20Q-14 -10-14 22M-14 12H14M-10 24H10" fill="none" stroke="#5f4c34" stroke-width="2"/></svg>`;
        if (['larva', 'grub', 'root_nymph', 'burrow_nymph'].includes(stage))
            return `<svg viewBox="-54 -48 108 108" aria-label="${stage} stage"><g fill="${colour}" stroke="#645039" stroke-width="2">${[-25, -13, -1, 11, 23].map((y, i) => `<ellipse cx="${i < 2 ? -5 : i > 3 ? 7 : 0}" cy="${y}" rx="${13 + i % 2 * 3}" ry="12"/>`).join('')}<ellipse cx="-6" cy="-36" rx="12" ry="10" fill="#846647"/></g><circle cx="-12" cy="-38" r="2.5" fill="#171d19"/><path d="M-15 -23L-24 -19M7 -23L16 -19M-14 -13L-24 -8M13 -13L22 -8M-15 0L-25 4M14 0L23 4" stroke="${colour}" stroke-width="3"/></svg>`;
        const f = C.FORMS[kind] || C.FORMS.hopper, shape = C.PRODUCTS[f.products[0]]?.kind || 'frame', broad = ['scarab', 'horn', 'wax'].includes(kind), w = broad ? 18 : 11;
        return `<svg viewBox="-54 -48 108 108" aria-hidden="true"><g transform="scale(.30)">${A.moduleShape(shape, f.colour)}</g><path d="M-8 -9L-34 -22M8 -9L34 -22M-9 0L-34 10M9 0L34 10M-4 -17L-12 -37M4 -17L12 -37" stroke="${f.colour}" stroke-width="2" fill="none"/><ellipse cy="11" rx="${w}" ry="26" fill="${f.colour}" stroke="#312b22" stroke-width="2"/><path d="M-${w} 4H${w}M-${w} 12H${w}M-${w - 2} 20H${w - 2}" stroke="#4a3b2b"/><ellipse cy="-16" rx="12" ry="11" fill="${f.colour}"/><circle cx="-8" cy="-19" r="3" fill="#171d19"/><circle cx="8" cy="-19" r="3" fill="#171d19"/></svg>`;
    }
    function hasStock(id) { return world.specimens.find(s => s.id === id && s.owner === 'player'); }
    function execWorld(cmd, msg) { if (computing) {
        tell('Finish the current race computation first.');
        return null;
    } try {
        world.bench = state;
        const out = W.apply(world, cmd);
        world = out.world;
        state = world.bench;
        W.sync(world);
        undo = [];
        redo = [];
        if (!W.availablePart(world, selected))
            selected = W.available(world)[0]?.id;
        persist();
        renderWorld();
        renderPart();
        renderBench();
        renderChecks();
        tell(msg || 'World updated.');
        return out.result;
    }
    catch (e) {
        tell(e.message);
        $('world-notice-text').textContent = e.message;
        $('world-notice').hidden = false;
        W.sync(world);
        if ($('shop-feedback'))
            $('shop-feedback').textContent = e.message;
        return null;
    } }
    function renderWorld() {
        if (!$('world-bar'))
            return;
        world.bench = state;
        const f = W.forecast(world, 2), live = W.live(world), money = world.ledger.filter(l => l.to === 'player').reduce((n, l) => n + l.amount, 0), spent = world.ledger.filter(l => l.from === 'player').reduce((n, l) => n + l.amount, 0);
        $('world-bar').innerHTML = `<span class="world-clock">WORLD TURN <b>${String(world.tick).padStart(3, '0')}</b></span><span>Cash <b>${world.accounts.player} cr</b></span><span>Next 2 turns · care bound <b>${f.cashCost} cr</b></span><span class="world-bar-spacer"></span><span>${world.careArrears ? `CARE OWED ${world.careArrears} cr` : 'Offline paused · replay free'}</span>`;
        $('holding-count').textContent = `${W.occupied(world)} / ${world.capacity.holding} places committed`;
        $('income-totals').innerHTML = `<div><span>Received</span><b>${money}</b></div><div><span>Spent</span><b>${spent}</b></div><div><span>Cash now</span><b>${world.accounts.player}</b></div><div><span>Care owed</span><b>${world.careArrears}</b></div>`;
        $('project').value = world.project;
        $('dispatch-parts').checked = world.auto.dispatch;
        const visible = world.specimens.filter(s => s.owner === 'player' && (s.alive || s.remainsUntil >= world.tick));
        const list = visible.map(s => W.publicSpec(world, s)).filter(s => stockView === 'all' || (stockView === 'protected' ? s.protected : stockView === 'review' ? !s.measured : !s.protected && s.anatomy));
        $('live-inventory').innerHTML = list.length ? list.map(s => {
            const f = C.FORMS[s.kind], measure = !s.traits ? 'Not assayed · inherited values undisclosed' : f.traits.map(([key, label, unit]) => `${label} ${Number(s.traits[key]).toFixed(3)} ${unit}`).join(' · '), can = s.alive && s.anatomy;
            return `<article class="animal-card ${s.protected ? 'protected' : ''}" data-specimen="${s.id}"><div class="animal-top">${insectBadge(s.kind, s.stage, s.bodyPlan)}<div><span class="part-tag">${esc(f.family)} / ${esc(s.stage)} / ${s.sex}</span><h3>${esc(s.id)}</h3><span class="tiny muted">${esc(s.origin)}</span></div><label class="batch-check"><input type="checkbox" data-pick="${s.id}" aria-label="Select ${s.id}" ${stockSelected.has(s.id) ? 'checked' : ''}>Batch</label></div><div class="animal-reason">${esc(s.reason)}</div><div class="animal-measure">${esc(measure)}</div><div class="stock-actions"><button data-world="protect" data-id="${s.id}" ${s.reserved ? 'disabled' : ''}>${s.protected ? 'Release protection' : 'Protect'}</button><button data-world="assay" data-id="${s.id}" ${!can || s.measured ? 'disabled' : ''}>Assay · 2 cr + care</button><button data-world="sellLive" data-id="${s.id}" ${!can || s.protected || s.reserved || s.registered || s.kit ? 'disabled' : ''}>Ordinary sale · ${f.livePrice} cr</button></div>${s.kind==='roach'&&!s.registered&&!s.kit&&s.stage==='adult'?`<button data-world="registerHost" data-id="${s.id}">Commission as a racer →</button>`:''}<div class="product-choices">${s.products.map(k => `<button data-world="prepare" data-id="${s.id}" data-product="${k}" ${s.protected || s.reserved ? 'disabled' : ''}><small>${esc(C.PRODUCTS[k].pcr)}</small>Prepare ${esc(C.PRODUCTS[k].name)} →</button>`).join('') || '<span class="tiny muted">No available preparation at this stage.</span>'}</div><details><summary>Selection, provenance & handling</summary><p>${esc(f.seek)}<br>${esc(s.parents.length ? s.parents.join(' × ') : 'No recorded parentage for this field specimen.')}<br>${esc(s.condition)}. ${s.nextStage ? 'Next: ' + esc(s.nextStage.stage) + ' at W' + s.nextStage.tick : ''}</p><button data-world="board" data-id="${s.id}" ${s.protected || s.reserved || s.registered || s.kit ? 'disabled' : ''}>Place supported body · 2 cr</button><button data-world="release" data-id="${s.id}" ${s.protected || s.reserved || s.registered || s.kit ? 'disabled' : ''}>Release intact specimen</button></details></article>`;
        }).join('') : '<div class="empty">No stock in this view. Choose a route or visit Two Nets.</div>';
        const oldA = $('parent-a').value || 'P-R', oldB = $('parent-b').value || 'P-S', parents = live.filter(s => s.stage === 'adult'&&!s.kit);
        for (const [id, old] of [['parent-a', oldA], ['parent-b', oldB]]) {
            $(id).innerHTML = parents.map(s => `<option value="${s.id}" ${W.parentBusy(world, s.id) ? 'disabled' : ''}>${s.id} · ${s.kind} / ${s.sex}${W.parentBusy(world, s.id) ? ' / pairing' : ''}</option>`).join('');
            if (parents.some(s => s.id === old))
                $(id).value = old;
        }
        $('loop-status').textContent = world.auto.loop ? (world.auto.loop.enabled ? (world.auto.loop.blocked ? 'PAUSED AT BLOCKER: ' + world.auto.loop.blocked : 'REPEATING PLAN / same parents; capacity and care checked each start') : 'New starts paused. Existing young still develop and receive care.') : 'Manual plan · only the brood you start';
        $('pause-loop').disabled = !world.auto.loop?.enabled;
        $('brood-space').textContent = `${W.nursery(world)} / ${world.capacity.nursery} nursery places reserved`;
        $('brood-list').innerHTML = world.broods.length ? world.broods.slice(-8).reverse().map(b => { const f = C.FORMS[b.kind], kids = world.specimens.filter(s => s.brood === b.id && s.alive), n = kids.length; return `<article class="brood-card"><div><b>${esc(f.name)} / ${b.id}</b><span>${b.stage.toUpperCase()}</span></div><div class="stage-track">${['eggs', ...f.profile.stages.map(x => x[1])].map((x, i) => `<span class="${i === 0 || world.tick >= b.start + f.profile.stages[i - 1]?.[0] ? 'lit' : ''}">${esc(x.replace(/_/g, ' '))}</span>`).join('')}</div><p>${b.parentIds.join(' × ')}<br>${b.stage === 'eggs' ? `Hatch W${b.hatch}; ${b.count} future places reserved. Survival unobserved.` : b.stage === 'failed' ? 'Pairing failed; costs were incurred.' : `${n} living descendants. Reproductive adult stage W${b.mature}. ${b.retainedIds.length} protected; ${b.delivered.length} sold.`}</p></article>`; }).join('') : '<p class="empty compact">Choose same-form mature parents.<br>Each profile requires its own stage-support facility.</p>';
        $('market-state').textContent = `Two Nets · ${world.accounts.shop} cr available · ${world.orders.ordinary} ordinary animals / ${world.orders.assemblies} assemblies this cycle. Next funded renewal W${(world.orders.epoch + 1) * 12}.`;
        const parts = W.eligibleParts(world);
        $('market-parts').innerHTML = parts.length ? parts.map(p => `<div class="sale-part"><span>${esc(W.descriptor(world, p).name)}<small>${esc(p.id)}</small></span><button data-world="sellPart" data-id="${p.id}">Deliver · ${C.PRODUCTS[p.product].price} cr</button></div>`).join('') : '<p class="muted tiny">No loose current-output sects available. Fitted and draft-reserved parts are excluded.</p>';
        $('ledger-list').innerHTML = world.ledger.slice(-12).reverse().map(l => `<div><span>W${l.tick} · ${esc(l.reason)}</span><b>${l.to === 'player' ? '+' : l.from === 'player' ? '−' : '↔'}${l.amount}</b></div>`).join('') || '<p class="muted">Opening cash 142 cr. Historical bench stock retained.</p>';
        $('attendance-list').innerHTML = world.results.slice(-4).reverse().map(r => { const p = r.results.find(x => x.host_id === r.entry.metadata.host_id); return `<p>W${r.attendedAt} · ${esc(r.id)} · build ${r.entry.metadata.build_revision}<br>${p?.finish_time == null ? 'Unfinished' : Number(p.finish_time).toFixed(3) + ' model T'} · no prize · attendance already settled</p>`; }).join('') || '<p>No attendance yet. Saved summaries persist; replay frames stay in the session.</p>';
        const nurseryStock = world.specimens.filter(s => s.owner === 'player' && s.alive && s.stage !== 'adult');
        $('tank-lives').innerHTML = nurseryStock.slice(0, 10).map((x, i) => `<span class="tank-animal" style="left:${6 + (i % 5) * 18}%;bottom:${20 + Math.floor(i / 5) * 26}px">${insectBadge(x.kind, x.stage, x.bodyPlan)}</span>`).join('');
        $('stock-count').textContent = `${W.available(world).length} pieces`;
        renderField();
        renderShop(); renderStable(); renderHostStrip();
    }
    function initWorldUI() {
        $('live-inventory').addEventListener('change', e => { const id = e.target.dataset.pick; if (id) {
            if (e.target.checked)
                stockSelected.add(id);
            else
                stockSelected.delete(id);
        } });
        $('view-stock').addEventListener('click', e => { const b = e.target.closest('[data-world]'); if (!b)
            return; const type = b.dataset.world, id = b.dataset.id; if (type === 'prepare' && !confirm('Prepare ' + (C.PRODUCTS[b.dataset.product]?.name || 'this sect') + '? This transfers its listed source anatomy once. Vital preparations end the donor’s life; alternative products sharing the same region cannot both be harvested.'))
            return; if (type === 'release' && !confirm('Release this intact specimen without payment?'))
            return; const result = execWorld({ type, id, product: b.dataset.product }); if (type === 'prepare' && result) {
            select(result);
            showTab('bench');
            tell('New prepared sect is in your tray. Return any competing assembly in the draft, then fit your chosen part.');
        } });
        document.querySelectorAll('[data-field-route]').forEach(b => b.onclick = () => { const route = b.dataset.fieldRoute, method = $('capture-method').value; const ids = execWorld({ type: 'field', route, method }, 'Returned to intake with actual specimens.'); if (ids) {
            stockView = 'all';
            renderWorld();
            $('live-inventory').scrollIntoView({ block: 'nearest', behavior: 'auto' });
        } });
        $('stock-filter').onchange = e => { stockView = e.target.value; renderWorld(); };
        $('project').onchange = e => execWorld({ type: 'project', value: e.target.value }, 'Selection purpose changed; no hidden genes exposed.');
        $('breed').onclick = () => execWorld({ type: 'breed', parents: [$('parent-a').value, $('parent-b').value], auto: $('auto-brood').checked, repeat: $('repeat-brood').checked }, 'Pairing started. Future places and ongoing care remain committed.');
        $('pause-loop').onclick = () => execWorld({ type: 'pauseLoop' }, 'New starts paused; existing stock remains cared for.');
        $('wait-one').onclick = () => execWorld({ type: 'wait', turns: 1 }, 'One world turn: care, stages, orders, and automatic dispatch advanced together.');
        $('wait-four').onclick = () => { if (confirm('Advance four world turns? Care is charged, broods develop and funded orders may settle. Offline time remains paused.'))
            execWorld({ type: 'wait', turns: 4 }, 'Four turns advanced.'); };
        $('club-work').onclick = () => execWorld({ type: 'work' }, 'Two turns of paid club setup work completed; care costs were charged.');
        $('expand-rack').onclick = () => execWorld({ type: 'expand' }, 'Actual holding and nursery capacity expanded. No inherited traits changed.');
        $('dispatch-parts').onchange = e => { if (e.target.checked && !confirm('Authorize sale of current and future loose prepared output to funded orders? Fitted parts, draft reservations, and the historical collection are excluded.')) {
            e.target.checked = false;
            return;
        } execWorld({ type: 'dispatch', value: e.target.checked }, 'Prepared-stock dispatch policy updated.'); };
        $('bulk-live').onclick = () => { const ids = [...stockSelected].filter(id => hasStock(id)); if (!ids.length) {
            tell('Select surplus specimens first.');
            return;
        } if (confirm(`Sell this exact batch of ${ids.length} specimens? Protected, pairing, useful-project or unmeasured stock may block the whole sale. No partial sale on failure.`)) {
            const r = execWorld({ type: 'bulkSell', ids });
            if (r !== null) {
                stockSelected.clear();
                renderWorld();
            }
        } };
        $('save-world').onclick = () => { try {
            world.bench = state;
            download(JSON.parse(W.save(world)), `RRR_world_W${world.tick}.rrr-save.json`);
        }
        catch (e) {
            tell(e.message);
        } };
        $('load-world').onclick = () => $('world-file').click();
        $('world-file').onchange = async (e) => { const file = e.target.files[0]; if (!file)
            return; try {
            if (computing)
                throw Error('Finish current race first.');
            if (file.size > 8000000)
                throw Error('World save too large');
            const restored = W.restore(await file.text());
            if (!confirm('Replace the current local world with this backup? This restores saved money and inventory; it is not a recipe import.')) {
                W.sync(world);
                return;
            }
            world = restored;
            if (world.pendingRace)
                world = W.apply(world, { type: 'raceCancel' }).world;
            state = world.bench;
            undo = [];
            redo = [];
            runs = [];
            current = null;
            pinned = null;
            playing = false;
            $('history').replaceChildren();
            $('standings').replaceChildren();
            $('focus-roach').replaceChildren();
            $('comparison').textContent = '';
            for (const id of ['play', 'replay-start', 'scrub', 'end', 'pin', 'export-race', 'result-to-bench'])
                $(id).disabled = true;
            W.sync(world);
            selected = 'H-6';
            persist();
            renderWorld();
            renderPart();
            renderBench();
            renderChecks();
            showTab('stock');
            tell('World backup restored. Previous attendance receipts remain; replays do not repay anything.');
        }
        catch (error) {
            W.sync(world);
            tell('Save rejected: ' + error.message);
        } e.target.value = ''; };
        $('reset-world-notice').onclick = () => $('world-notice').hidden = true;
    }
    function renderField() { const r = W.ROUTES[fieldRoute], f = C.FORMS[r.kind]; $('new-field').innerHTML = `<div class="field-selector"><div><span class="eyebrow">TARGETED FIELDWORK / DONORS & WHOLE HOSTS</span><h3>Pick the part. <em>Find its source.</em></h3><label>Search habitat<select id="route-choice">${Object.entries(W.ROUTES).map(([key, x]) => `<option value="${key}" ${key === fieldRoute ? 'selected' : ''}>${esc(x.name)} · ${esc(C.FORMS[x.kind].name)}</option>`).join('')}</select></label></div><div class="field-evidence"><span class="part-tag">${esc(f.family)}</span><p>${esc(r.find)}</p><small>Useful stock: ${esc(r.ordinary)}. Target stage: ${esc(r.stage)}.</small><button class="primary" data-scout="${fieldRoute}">Search this habitat · ${r.cost} cr + care / 2 turns</button></div><div class="field-donor">${insectBadge(r.kind, r.stage)}</div></div><details class="facility-shelf"><summary>Stage-support facilities / ${Object.keys(world.facilities).length} configurations built</summary><div class="facility-grid">${Object.entries(C.FACILITIES).map(([key, f]) => `<article><b>${esc(f.name)}</b><p>${esc(f.note)}</p><button data-facility="${key}" ${world.facilities[key] ? 'disabled' : ''}>${world.facilities[key] ? world.facilities[key] + ' places available' : f.cost + ' cr / build'}</button></article>`).join('')}</div></details>`; }
    function statWords(s) { return C.FORMS[s.kind].traits.map(([key, label, unit]) => `${label}: ${Number(C.traits(s)[key]).toFixed(3)} ${unit}`).join(' · '); }
    function renderShop() {
        if (!$('shop-content'))
            return;
        const f = C.FORMS[shopKind], formSelect = `<select id="shop-kind" aria-label="Donor stock family">${Object.entries(C.FORMS).map(([key, x]) => `<option value="${key}" ${key === shopKind ? 'selected' : ''}>${esc(x.name)} / ${esc(x.family)}</option>`).join('')}</select>`;
        const liveOffers = world.retail.liveOffers.filter(o => { const s = world.specimens.find(s => s.id === o.id); return s?.owner === 'shop' && s.alive && !s.kit && s.kind === shopKind; }), parts = world.retail.looseOffers.filter(o => { const p = world.parts.find(p => p.id === o.id); return p?.owner === 'shop' && !p.kit && world.specimens.find(s => s.id === p.donor)?.kind === shopKind; });
        $('shop-content').innerHTML = `<div class="shop-mast"><div><span class="eyebrow">TINWATER JUNCTION / MARA VENN, WRANGLOID</span><h2>Two Nets.<em> Everything starts alive.</em></h2><p>Whole insects. Prepared sects. Coordinated kits. Find the stock that belongs in your next build.</p></div><div class="shop-seal"><b>LIVE<br>STOCK</b><span>Tested / traceable / individual</span></div></div><div class="shop-purpose"><div><span class="eyebrow">THE TANK YOU ARE BROWSING</span>${formSelect}</div><div><strong>${esc(f.family)}</strong><p>${esc(f.seek)}</p><span class="tiny muted">Wild source: ${esc(f.habitat)} · rearing: ${esc(C.FACILITIES[f.facility].name)}</span></div></div><div class="shop-shelves"><section><div class="panelhead"><h2>Living specimens</h2><span class="count">Choose the parent, not a rarity label</span></div><div class="shop-stock">${liveOffers.map(o => { const s = world.specimens.find(s => s.id === o.id); return `<article class="glass-tank">${insectBadge(s.kind, s.stage, s.bodyPlan)}<span class="part-tag">${esc(s.stage)} / reproductive role ${s.sex}</span><h3>${esc(s.id)}</h3><p>${s.measured ? esc(statWords(s)) : 'Unmeasured stock · no exact traits certified'}</p><small>${esc(s.origin)}</small><button class="primary" data-shop="buyLive" data-id="${s.id}" ${spendableShop() < o.price ? 'disabled' : ''}>Buy this individual · ${o.price} cr</button></article>`; }).join('') || '<div class="empty">No current live stock of this form. Search its habitat or develop a breeding line. This shelf does not spawn a duplicate when refreshed.</div>'}</div></section><section><div class="panelhead"><h2>Prepared anatomy</h2><span class="count">Fit the actual component</span></div><div class="shop-stock">${parts.map(o => { const p = world.parts.find(p => p.id === o.id), a = W.descriptor(world, p); return `<article class="prepared-card"><div class="product-art"><svg viewBox="-150 -125 300 265">${A.moduleShape(a.kind, a.colour)}</svg><span>${esc(C.PRODUCTS[p.product].pcr)}</span></div><h3>${esc(C.PRODUCTS[p.product].name)}</h3><p>${esc(a.purpose)}</p><div class="animal-measure">${esc(a.measure)}</div>${gradeMarkup(a)}<small>Donor ${esc(p.donor)} / ${a.mass.toFixed(3)} M</small><button data-shop="buyPart" data-id="${p.id}" ${spendableShop() < o.price ? 'disabled' : ''}>Buy this sect · ${o.price} cr</button></article>`; }).join('') || '<div class="empty">No loose component on this shelf. Prepared kits and field stock remain separate sources.</div>'}</div></section></div>${fullKitShelf()}<section class="kit-shelf"><div class="panelhead"><h2>Build-it-yourself conversion tins</h2><span class="count">Own host / real contents / no set aura</span></div><div class="kit-grid">${world.kits.filter(k=>k.type!=='whole_host').map(k => { const r = C.KITS.find(x => x.id === k.recipe); return `<article class="kit-tin"><span class="part-tag">${esc(r.tag)}</span><h3>${esc(r.name)}</h3><div class="kit-parts">${r.products.map(key => { const d = C.PRODUCTS[key]; return `<svg viewBox="-150 -125 300 265" aria-label="${esc(d.name)}">${A.moduleShape(d.kind, '#c5ab7c')}</svg>`; }).join('')}</div><p>${esc(r.purpose)}</p><small>${r.products.map(key => C.PRODUCTS[key].name).join(' + ')}</small>${k.owner === 'shop' ? `<button class="primary" data-shop="buyKit" data-id="${k.id}" ${spendableShop() < k.price ? 'disabled' : ''}>Buy this packed tin · ${k.price} cr</button>` : k.status === 'packed' ? `<button class="primary" data-shop="unpack" data-id="${k.id}">Open your tin → parts to tray</button>` : '<span class="kit-owned">Opened / contents remain individually owned</span>'}</article>`; }).join('')}</div></section><section class="order-board"><div class="panelhead"><h2>Build stock worth buying</h2><span class="count">Specified demand / reserved buyer money</span></div><div class="order-grid">${world.contracts.map(o => { const valid = W.eligibleParts(world).filter(p => W.matches(world, p, o)).slice(0, o.quantity - o.delivered.length); return `<article class="order-card"><span class="part-tag">${esc(o.status)} ${o.deadline ? ' / due W' + o.deadline : ''}</span><h3>${esc(o.name)}</h3><p>${o.quantity} × ${esc(C.PRODUCTS[o.product].name)} · ${o.unitPrice} cr each</p><div class="animal-measure">${Object.entries(o.requirements).map(([key, v]) => esc(key) + (v.min !== undefined ? ' ≥ ' + v.min : ' ≤ ' + v.max)).join(' · ')}${o.maxMass ? ' · mass ≤ ' + o.maxMass : ''}</div><small>${o.delivered.length} delivered · ${o.escrow} cr reserved · ${valid.length} current eligible loose parts</small>${o.status === 'offered' ? `<button data-shop="acceptOrder" data-id="${o.id}" ${world.accounts.shop < o.quantity * o.unitPrice ? 'disabled' : ''}>Accept / reserve ${o.quantity * o.unitPrice} cr</button>` : o.status === 'active' ? `<button class="primary" data-shop="deliverOrder" data-id="${o.id}" ${valid.length ? '' : 'disabled'}>Deliver ${valid.length} eligible part${valid.length === 1 ? '' : 's'}</button><button data-shop="cancelOrder" data-id="${o.id}">Cancel unfilled balance</button>` : ''}</article>`; }).join('')}</div><p class="tiny muted">Ordinary live-stock selling remains available in intake. These selected orders require the named component measurements; exact genes are not an acceptance condition. No automatic renewed contract is claimed.</p></section><details class="translation-board"><summary>The Pocket Circuit translation / what each part actually changes</summary>${C.MAP.map(([ref, rrr, item, effect]) => `<div><b>${esc(ref)}</b><span>${esc(rrr)}</span><p>${esc(effect)}</p></div>`).join('')}</details><div id="shop-feedback" role="status" class="shop-feedback">Individual inventory is finite. Buying transfers custody; it does not assemble the kit or improve inherited traits.</div>`;
    }
    function gradeMarkup(a) {
        const q=E.grade(a);
        return `<div class="quality-tag"><b>${esc(q.band||q.label)}</b><span>${esc(q.band?q.label:'No invented universal quality rank')}</span></div><details class="grade-detail"><summary>Measured qualification · ${esc(q.protocol)}</summary><p>${esc(q.reason)}</p>${q.axes.map(x=>`<div><span>${esc(x.label)}</span><b>${Number.isFinite(x.value)?x.value.toFixed(3):'Unknown'}</b></div>`).join('')}<p class="tiny muted">Thresholds belong to this versioned preparation profile. This label changes no price, genes or race inputs.</p></details>`;
    }
    function hostArt(s,b) {
        const p=H.profile(s),d=b?.fitted||B.initialHost(p).fitted;
        return `<svg viewBox="0 0 640 600" aria-label="${esc(p.name)} body and fitted assembly">${A.roach(d,{interactive:false,hostProfile:p})}</svg>`;
    }
    function fullKitShelf() {
        return `<section class="whole-kit-shelf"><div class="panelhead"><h2>A whole racer, in a tin.</h2><span class="count">Living host included / assemble it yourself</span></div><div class="whole-kit-grid">${world.kits.filter(k=>k.type==='whole_host').map(k=>{
            const r=H.FULL_KITS.find(r=>r.id===k.recipe),s=world.specimens.find(s=>s.id===k.hostId);
            return `<article class="whole-kit" data-whole-kit="${k.id}"><div class="kit-lid"><span class="eyebrow">TWO NETS / ${esc(H.PLANS[r.plan].name)}</span><h3>${esc(r.name)}</h3>${hostArt(s)}<span class="kit-number">${r.number}</span></div><div class="whole-kit-content"><p>${esc(r.purpose)}</p><small>${r.products.map(p=>C.PRODUCTS[p].name).map(esc).join(' + ')}<br>Native anatomy supplies every remaining role. Finite identified stock.</small>${k.owner==='shop'?`<button class="primary" data-shop="buyKit" data-id="${k.id}" ${spendableShop()<k.price?'disabled':''}>Buy host + sects · ${k.price} cr</button>`:k.status==='packed'?`<button class="primary" data-shop="unpack" data-id="${k.id}">Open this complete kit</button>`:`<button data-stable="switchHost" data-id="${k.hostId}">Bring included host to bench →</button>`}</div></article>`;
        }).join('')}</div></section>`;
    }
    function renderHostStrip() {
        const options=Object.entries(world.hosts).map(([id,h])=>{const b=id===state.host_id?state:world.stabled[id];return `<option value="${esc(id)}" ${id===state.host_id?'selected':''}>${esc(b.fitted.name)} · ${esc(h.profile.name)}</option>`;}).join('');
        $('host-strip').innerHTML=`<label><span class="eyebrow">HOST ON THE BENCH</span><select id="active-host" aria-label="Host on the bench">${options}</select></label><span>${world.hosts[state.host_id].profile.mass.toFixed(2)} M native · ${state.host_profile.width.toFixed(2)} L body width<br><small>Each roach keeps its own draft, fitted stock and build sheets.</small></span><button id="open-stable" class="quiet">Stable & breeding lines →</button>`;
    }
    function renderStable() {
        if(!$('stable-roster'))return;
        $('stable-roster').innerHTML=Object.entries(world.hosts).map(([id,h])=>{
            const s=world.specimens.find(s=>s.id===id),b=id===state.host_id?state:world.stabled[id],k=world.kits.find(k=>k.hostId===id),p=h.profile;
            return `<article class="host-card ${id===state.host_id?'current-host':''}" data-host-card="${id}"><div class="host-card-top"><span class="eyebrow">${id===state.host_id?'ON THE BENCH':'STABLED'} / ${esc(p.name)}</span><span>${b.fitted.number}</span></div>${hostArt(s,b)}<h3>${esc(b.fitted.name)}</h3><p>${esc(H.PLANS[s.bodyPlan].use)}</p><div class="host-facts"><span>Native mass <b>${p.mass.toFixed(3)} M</b></span><span>Stride <b>${p.stride.toFixed(3)} L</b></span><span>Support <b>${p.support.toFixed(3)} F</b></span><span>Fitted sects <b>${b.fitted.placements.length}</b></span></div><small>${esc(id)} · ${esc(s.parents.length?s.parents.join(' × '):s.origin)}</small><button class="${id===state.host_id?'quiet':'primary'}" data-stable="switchHost" data-id="${id}">${id===state.host_id?'Return to this workbench':'Bring to the bench'}</button>${k?.status==='unpacked'?`<button class="quiet" data-stable="layoutKit" data-id="${k.id}" data-host="${id}">Lay out ${esc(H.FULL_KITS.find(r=>r.id===k.recipe).name)} guide</button>`:''}<details><summary>Native anatomy & fit</summary><p>${esc(H.PLANS[s.bodyPlan].select)}</p><p>Width ${p.width.toFixed(3)}, length ${p.length.toFixed(3)}, native cadence ${p.cadence.toFixed(2)}, force ${p.force.toFixed(2)}, reserve ${p.reserve.toFixed(0)}. Model units, not physical calibration. Body proportions resize native anatomy; grafts keep their own dimensions.</p><p>${B.canonical(b.draft)!==B.canonical(b.fitted)?'Uncommitted draft retained. Its reserved parts cannot move to another host.':'Fitted and draft arrangements agree.'} Inherited body measurements do not copy installed grafts into offspring.</p></details></article>`;
        }).join('');
        if(Object.keys(world.hosts).length<3){$('stable-roster').insertAdjacentHTML('beforeend',`<aside class="stable-discovery" style="grid-column:span ${3-Object.keys(world.hosts).length}"><span class="eyebrow">CHOOSE THE LIVING FOUNDATION</span><h3>Different bodies.<br><em>Your next construction.</em></h3><div class="plan-previews">${Object.entries(H.PLANS).map(([key,p])=>`<div><svg viewBox="0 0 640 600">${A.roach({...B.initial().draft,placements:[],livery:p.colour,number:''},{interactive:false,hostProfile:{scaleX:p.scaleX,scaleY:p.scaleY}})}</svg><b>${esc(p.name)}</b><span>${p.mass.toFixed(2)} M · ${p.width.toFixed(2)} L wide</span><p>${esc(p.use)}</p></div>`).join('')}</div><p>Buy a whole individual or a complete tin at Two Nets. Catch one in the service galleries. Breed from owned adult hosts. No invisible collection bonus.</p><button id="browse-hosts">Browse living hosts & complete tins →</button></aside>`);$('browse-hosts').onclick=()=>{shopKind='roach';showTab('shop');};}
        const candidates=W.live(world).filter(s=>s.kind==='roach'&&!world.hosts[s.id]&&!s.kit&&s.stage==='adult'&&s.regions.body==='intact');
        $('host-candidates').innerHTML=candidates.length?`<h3>Whole hosts ready for a project</h3><div class="candidate-row">${candidates.map(s=>`<article>${hostArt(s)}<b>${esc(H.PLANS[s.bodyPlan].name)}</b><small>${esc(s.id)}</small><button data-stable="registerHost" data-id="${s.id}">Commission this living host</button></article>`).join('')}</div>`:'<p class="muted">New hosts can come from a complete tin, whole-stock purchases, a service-gallery catch, or your own brood. No racing-rank requirement.</p>';
        const eligible=W.live(world).filter(s=>s.stage==='adult'&&!s.kit);
        for(const field of ['line-parent-a','line-parent-b']){
            const old=$(field).value;$(field).innerHTML=eligible.map(s=>`<option value="${esc(s.id)}">${esc(s.id)} · ${esc(s.kind)} / ${s.sex}</option>`).join('');if(eligible.some(s=>s.id===old))$(field).value=old;
        }
        if(!$('line-parent-b').dataset.initialized){$('line-parent-b').value='P-S';$('line-parent-b').dataset.initialized='yes';}
        $('selection-current').textContent=world.selection?`${C.FORMS[world.selection.kind].name} · ${C.FORMS[world.selection.kind].traits.find(t=>t[0]===world.selection.trait)[1]} ${world.selection.op==='min'?'≥':'≤'} ${world.selection.threshold} · ${world.selection.focus==='complement'?'missing breeding contribution':'product objective'}`:'No selected contribution yet. Choose what your project is missing.';
        $('line-register').innerHTML=world.lines.length?world.lines.map(line=>{
            const r=E.lineReport(world,line);
            return `<article class="line-record"><div><span class="eyebrow">${esc(C.FORMS[line.kind].name)} / OBSERVED DESCENDANTS</span><h3>${esc(line.name)}</h3></div><p>${esc(r.claim)}</p><div class="line-counters"><span><b>${r.attempts}</b>attempts</span><span><b>${r.tested}</b>measured</span><span><b>${r.matching}</b>match target</span><span><b>${r.distinctTestedBroods}</b>tested broods</span></div><details open><summary>Brood evidence, not a winner guarantee</summary><p>${esc(line.founders.join(' × '))}</p>${r.rows.map(row=>`<div class="brood-evidence"><b>${esc(row.id)}</b><span>${esc(row.stage)}</span><span>${row.observedYoung===null?'Survival unobserved':row.observedYoung+' observed young'}</span><span>${row.tested} tested / ${row.matching} match</span></div>`).join('')||'<p>No reproductive attempts recorded for these founders yet.</p>'}<p class="tiny muted">Observed counts include known sold or prepared descendants. Untested stock is not a failed target. A selected sample is not a population forecast. The line name adds no stat or price multiplier.</p></details></article>`;
        }).join(''):'<div class="empty">Name a project. Keep its founders. Record what their descendants actually demonstrate.</div>';
    }
    function initStableUI(){
        $('selection-kind').innerHTML=Object.entries(C.FORMS).map(([key,f])=>`<option value="${key}">${esc(f.name)}</option>`).join('');
        function traitsChanged(){const kind=$('selection-kind').value,ts=C.FORMS[kind].traits;$('selection-trait').innerHTML=ts.map(t=>`<option value="${t[0]}">${esc(t[1])}</option>`).join('');boundChanged();}
        function boundChanged(){const t=C.FORMS[$('selection-kind').value].traits.find(t=>t[0]===$('selection-trait').value);$('selection-op').value=t[4]>=0?'min':'max';$('selection-threshold').value=Number((t[3]+t[4]).toFixed(4));$('target-range').textContent=`Authored range ${Math.min(t[3],t[3]+t[4]*2).toFixed(3)}–${Math.max(t[3],t[3]+t[4]*2).toFixed(3)} ${t[2]}. Choose a missing contribution, not necessarily a complete premium product.`;}
        $('selection-kind').onchange=traitsChanged;$('selection-trait').onchange=boundChanged;traitsChanged();
        $('apply-selection').onclick=()=>execWorld({type:'selectionProject',kind:$('selection-kind').value,trait:$('selection-trait').value,op:$('selection-op').value,threshold:Number($('selection-threshold').value),focus:$('selection-focus').value},'Selection goal recorded. Intake uses only observed evidence.');
        $('create-line').onclick=()=>{const out=execWorld({type:'createLine',name:$('line-name').value,parents:[$('line-parent-a').value,$('line-parent-b').value]},'Named project recorded. Founders protected; no genetic or price bonus.');if(out)$('line-name').value='';};
        document.addEventListener('click',e=>{const el=e.target.closest('[data-stable]');if(!el)return;const type=el.dataset.stable,id=el.dataset.id;if(type==='layoutKit'&&state.host_id!==el.dataset.host){if(execWorld({type:'switchHost',id:el.dataset.host})===null)return;}const result=execWorld({type,id},type==='layoutKit'?'Guide laid out as a draft. Inspect the parts, adjust their fit, then assemble.':'Host brought into the same shared workshop.');if(result!==null&&type!=='registerHost')showTab('bench');});
        $('host-strip').onchange=e=>{if(e.target.id==='active-host')execWorld({type:'switchHost',id:e.target.value},'Changed host. Each roach keeps its own stock and draft.');};
        $('host-strip').onclick=e=>{if(e.target.closest('#open-stable')){showTab('stable');renderStable();}};
    }

    function spendableShop() { return W.spendable(world); }
    function initShopUI() {
        $('new-field').onchange = e => { if (e.target.id === 'route-choice') {
            fieldRoute = e.target.value;
            renderField();
        } };
        $('new-field').onclick = e => { const f = e.target.closest('[data-facility]'), s = e.target.closest('[data-scout]'); if (f)
            execWorld({ type: 'facility', id: f.dataset.facility }, 'Stage-support facility built. Its capacity and care role are visible.'); if (s) {
            const ids = execWorld({ type: 'field', route: s.dataset.scout, method: $('capture-method').value }, 'Actual donors returned to intake.');
            if (ids) {
                stockView = 'all';
                renderWorld();
            }
        } };
        $('shop-content').onchange = e => { if (e.target.id === 'shop-kind') {
            shopKind = e.target.value;
            renderShop();
            $('shop-kind').focus();
        } };
        $('shop-content').onclick = e => { const b = e.target.closest('[data-shop]'); if (!b)
            return; const type = b.dataset.shop, id = b.dataset.id, cmd = { type, id }; if (type === 'deliverOrder') {
            const o = world.contracts.find(x => x.id === id);
            cmd.ids = W.eligibleParts(world).filter(p => W.matches(world, p, o)).slice(0, o.quantity - o.delivered.length).map(p => p.id);
        } const result = execWorld(cmd, type === 'buyLive' ? 'Individual acquired and protected. It can be retained, bred or deliberately prepared.' : type === 'buyKit' ? 'The complete tin is yours. Open it before using its real contents.' : type === 'unpack' ? 'Tin opened. Place these actual components at the workbench.' : 'Transaction completed.'); if (result) {
            if (type === 'buyPart') {
                select(result);
                showTab('bench');
            }
            else if (type === 'unpack') {
                const kit=world.kits.find(k=>k.id===id);
                if(kit?.hostId)execWorld({type:'switchHost',id:kit.hostId},'Included living host is on the bench. Parts remain loose until fitted.');
                select(result[0]);
                showTab('bench');
            }
            else {
                $('shop-feedback').textContent = 'Completed: ' + type + ' / ' + id;
            }
        } };
    }
    // Navigation and accessible controls.
    document.querySelectorAll('[data-tab]').forEach(b => { b.onclick = () => showTab(b.dataset.tab); b.onkeydown = e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
        return; e.preventDefault(); const all = [...document.querySelectorAll('[data-tab]')], i = all.indexOf(b), n = e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length; showTab(all[n].dataset.tab); all[n].focus(); }; });
    $('inventory').onclick = e => { const el = e.target.closest('[data-stock]'); if (el)
        select(el.dataset.stock); };
    $('inventory').ondragstart = e => { const el = e.target.closest('[data-stock]'); if (!el)
        return; drag = { fromTray: true, id: el.dataset.stock }; select(el.dataset.stock); e.dataTransfer.setData('text/plain', selected); e.dataTransfer.effectAllowed = 'copy'; renderBench(); };
    $('inventory').ondragend = () => { drag = null; renderBench(); };
    function benchPoint(e) { const p = $('bench').createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform($('bench').getScreenCTM().inverse()); return { x: (q.x - 320) / 165, y: (q.y - 310) / 180 }; }
    $('bench').ondragover = e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; };
    $('bench').ondrop = e => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (!Object.hasOwn(B.byId, id))
        return; const p = benchPoint(e), base=B.byId[id].bounds,h=state.host_profile,b=[base[0]*h.scaleX,base[1]*h.scaleX,base[2]*h.scaleY,base[3]*h.scaleY]; change(s => B.place(s, id, { x: Math.round(R.clip(p.x, b[0], b[1]) * 100) / 100, y: Math.round(R.clip(p.y, b[2], b[3]) * 100) / 100 })); drag = null; select(id); tell('Root placed on the supported rail. Fit the draft when ready.'); };
    $('bench').onpointerdown = e => { if (computing)
        return; const part = e.target.closest('[data-part]'); if (!part || e.button !== 0)
        return; e.preventDefault(); const id = part.dataset.part; select(id); const p = state.draft.placements.find(v => v.id === id); drag = { id, start: benchPoint(e), origin: B.copy(p), before: B.copy(state.draft), moved: false }; $('bench').setPointerCapture(e.pointerId); };
    $('bench').onpointermove = e => { if (!drag || drag.fromTray)
        return; const q = benchPoint(e), x = R.clip(Math.round((drag.origin.x + q.x - drag.start.x) * 100) / 100, -1.2, 1.2), y = R.clip(Math.round((drag.origin.y + q.y - drag.start.y) * 100) / 100, -1.5, 1.5); const p = state.draft.placements.find(v => v.id === drag.id); if (p.x === x && p.y === y)
        return; p.x = x; p.y = y; drag.moved = true; renderBench(); };
    function endDrag() { if (drag && !drag.fromTray && drag.moved) {
        undo.push(drag.before);
        if (undo.length > 60)
            undo.shift();
        redo = [];
        persist();
    } drag = null; renderBench(); renderChecks(); }
    $('bench').onpointerup = endDrag;
    $('bench').onpointercancel = endDrag;
    function nudge(dx, dy) { const p = state.draft.placements.find(v => v.id === selected); if (!p)
        return; change(s => B.place(s, selected, { x: Math.round((p.x + dx) * 100) / 100, y: Math.round((p.y + dy) * 100) / 100 })); }
    $('bench').onkeydown = e => { const p = e.target.closest('[data-part]'); if (!p)
        return; if (selected !== p.dataset.part)
        select(p.dataset.part); const step = e.shiftKey ? .05 : .01, directions = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }; if (directions[e.key]) {
        e.preventDefault();
        nudge(...directions[e.key]);
    } if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(selected);
    } };
    document.querySelectorAll('[data-nudge]').forEach(b => b.onclick = () => nudge(...({ left: [-.02, 0], right: [.02, 0], up: [0, -.02], down: [0, .02] })[b.dataset.nudge]));
    $('align').onclick = () => change(s => B.place(s, selected, B.copy(B.byId[selected].default)));
    function bindRange(el, fn) { let gesture = false, recorded = false; el.addEventListener('pointerdown', () => { gesture = true; recorded = false; }); el.addEventListener('pointerup', () => { gesture = false; }); el.addEventListener('pointercancel', () => { gesture = false; }); el.addEventListener('change', () => { gesture = false; }); el.oninput = e => { const before = B.canonical(state.draft); change(s => fn(s, Number(e.target.value)), !gesture || !recorded); if (before !== B.canonical(state.draft))
        recorded = true; }; }
    bindRange($('rotation'), (s, value) => B.place(s, selected, { angle: value }));
    for (const k of ['leverage', 'preload', 'stance', 'reserve_fraction'])
        bindRange($(k), (s, value) => { s.draft.tuning[k] = value; return s; });
    $('approach').onchange = e => change(s => { s.draft.approach = e.target.value; return s; });
    $('name').onchange = e => change(s => { s.draft.name = e.target.value.trim(); return s; });
    $('number').onchange = e => change(s => { s.draft.number = e.target.value; return s; });
    document.querySelectorAll('[data-livery]').forEach(e => e.onclick = () => change(s => { s.draft.livery = e.dataset.livery; return s; }));
    $('cutaway').onclick = () => { cutaway = !cutaway; renderBench(); };
    $('commit').onclick = () => { try {
        world.bench = state;
        world = W.apply(world, { type: 'fit' }).world;
        state = world.bench;
        W.sync(world);
        renderWorld();
        undo = [];
        redo = [];
        persist();
        renderBench();
        renderChecks();
        tell(`Build ${state.revision} fitted. Your race will use this exact arrangement.`);
    }
    catch (e) {
        tell(e.message);
    } };
    $('discard').onclick = () => change(s => { s.draft = B.copy(s.fitted); return s; });
    $('undo').onclick = () => { if (computing || !undo.length)
        return; redo.push(B.copy(state.draft)); state.draft = undo.pop(); persist(); renderBench(); renderChecks(); };
    $('redo').onclick = () => { if (computing || !redo.length)
        return; undo.push(B.copy(state.draft)); state.draft = redo.pop(); persist(); renderBench(); renderChecks(); };
    document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        $(e.shiftKey ? 'redo' : 'undo').click();
    } });
    $('go-race').onclick = () => showTab('race');
    $('run').onclick = runRace;
    for (const id of ['course', 'equipment', 'rival'])
        $(id).onchange = renderChecks;
    $('play').onclick = () => { if (!current)
        return; if (t >= endTime())
        t = 0; playing = !playing; drawRace(); };
    $('replay-start').onclick = () => { t = 0; playing = false; drawRace(); };
    $('end').onclick = () => { t = endTime(); playing = false; drawRace(); };
    $('speed').onclick = () => { rate = rate === 1 ? 2 : rate === 2 ? 4 : 1; $('speed').textContent = rate + '×'; };
    $('scrub').oninput = e => { t = Number(e.target.value) / 1000 * endTime(); playing = false; drawRace(); };
    $('pin').onclick = () => { pinned = current; renderComparison(); tell('This exact run is now the comparison reference.'); };
    $('export-race').onclick = () => { if (current)
        download(current, `RRR_run_build_${current.metadata.build_revision}.json`); };
    $('result-to-bench').onclick = () => {if(!current)return;if(state.host_id!==current.metadata.host_id){if(execWorld({type:'switchHost',id:current.metadata.host_id})===null)return;}loadDraft(current.metadata.design);};
    $('history').onclick = e => { const el = e.target.closest('[data-run]'); if (el)
        setRace(runs[Number(el.dataset.run)], false); };
    $('save-card').onclick = () => { try {
        B.validateDesign(state.draft);
        if (B.fitting(state.draft,state.host_profile).length)
            throw new Error('Resolve the fitting issues before keeping this sheet.');
        if (state.saved_cards.length >= 8)
            throw new Error('Eight local sheets retained. Export or remove one before adding another.');
        state.saved_cards.push(B.copy(state.draft));
        persist();
        renderCards();
        tell('Build sheet retained; no components duplicated.');
    }
    catch (e) {
        tell(e.message);
    } };
    $('cards').onclick = e => { const l = e.target.closest('[data-load-card]'), d = e.target.closest('[data-delete-card]'); if (l)
        loadDraft(state.saved_cards[Number(l.dataset.loadCard)]); if (d) {
        state.saved_cards.splice(Number(d.dataset.deleteCard), 1);
        persist();
        renderCards();
    } };
    $('export').onclick = () => download(B.exportCard(state), `RRR_${state.draft.name.replace(/[^\w-]/g, '_')}.rrr-build.json`);
    $('import').onclick = () => $('file-input').click();
    $('file-input').onchange = async (e) => { const file = e.target.files[0]; if (!file)
        return; try {
        if (computing)
            throw Error('Finish attendance first.');
        if (file.size > 50000)
            throw new Error('Build sheet too large.');
        const next = B.importCard(state, await file.text());
        if (!next.draft.placements.every(p => W.availablePart(world, p.id)))
            throw Error('Recipe references stock no longer owned');
        checkpoint();
        state = next;
        persist();
        renderBench();
        renderChecks();
        showTab('bench');
        tell('Imported as a draft against your existing stock.');
    }
    catch (error) {
        tell('Import rejected: ' + error.message);
    } e.target.value = ''; };
    for (const id of ['about', 'scope-link'])
        $(id).onclick = () => $('help').showModal();
    $('close-help').onclick = () => $('help').close();
    $('reset').onclick = () => { if (!confirm('Reset this workshop, including local build sheets? Export any designs you want to keep first.'))
        return; job++; worker?.terminate(); worker = null; computing = false; world = W.initial(); state = world.bench; W.sync(world); renderWorld(); undo = []; redo = []; runs = []; current = null; pinned = null; playing = false; persist(); $('help').close(); select('H-6'); showTab('bench'); renderChecks(); $('standings').replaceChildren(); $('history').replaceChildren(); $('comparison').textContent = ''; for (const id of ['play', 'replay-start', 'scrub', 'end', 'pin', 'export-race', 'result-to-bench'])
        $(id).disabled = true; tell('Workshop restored to the declared starting stock.'); };
    new ResizeObserver(resizeRace).observe($('race-canvas'));
    function tick(stamp) { if (lastStamp && playing && current && tab === 'race') {
        t = Math.min(endTime(), t + Math.min(.1, (stamp - lastStamp) / 1000) * rate);
        if (t >= endTime())
            playing = false;
        drawRace();
    } lastStamp = stamp; requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
    initWorldUI();
    initShopUI();
    initStableUI();
    renderPart();
    renderBench();
    renderChecks();
    renderWorld();
    showTab('bench');
    // Read-only test hooks and deliberate public UI operations. No hidden genome or cash mutation API.
    window.RRR_WORKBENCH = { state: () => B.copy(state), world: () => B.copy(world), tab: () => tab, select, showTab, run: runRace, runs: () => B.copy(runs), playback: () => ({ t, playing, rate }), seek: value => { if (current) {
            t = R.clip(value, 0, endTime());
            playing = false;
            drawRace();
        } }, exportSheet: () => B.exportCard(state), scope: 'Local shared-world fixture; no competitive save authority.' };
})();
