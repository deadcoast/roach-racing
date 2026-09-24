"""Exercise actual UI paths. Read-only hooks inspect outputs; no funds or genomes are injected."""
from pathlib import Path
import json, hashlib, os
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
checks=[];errors=[];routes=[]
def check(name,passed,details=None):
    checks.append({'name':name,'passed':bool(passed),**({'details':details} if details else {})})
    if not passed: raise AssertionError(name)
def w(q,expr):return q.evaluate('(w)=>'+expr,q.evaluate('RRR_WORKBENCH.world()'))
def shot(q,name):
    q.wait_for_function('document.getElementById("toast").hidden',timeout=4500);q.screenshot(path=str(ROOT/'evidence'/name),full_page=True)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
    def page():
        q=browser.new_page(viewport={'width':1440,'height':1000},accept_downloads=True,reduced_motion='reduce')
        q.on('pageerror',lambda e:errors.append(str(e)));q.on('dialog',lambda d:d.accept())
        q.set_content((ROOT/'RRR_Living_Stable_v0.8.html').read_text(),wait_until='load');q.wait_for_function('typeof RRR_WORKBENCH!=="undefined"')
        return q
    # Native navigation attempt on separate page. Failed navigation must not poison the test page context.
    probe=browser.new_page()
    try:probe.goto((ROOT/'RRR_Living_Stable_v0.8.html').as_uri(),timeout=8000);routes.append({'file_navigation':'succeeded'})
    except Exception as e:routes.append({'file_navigation':'blocked','error':str(e).splitlines()[0],'used':'exact HTML set_content on fresh pages'})
    probe.close()
    try:
        q=page();check('Original editable workbench and historical host are retained',w(q,"w.bench.host_id==='HOST'&&w.bench.fitted.placements[0].id==='H-6'"))
        q.click('#tab-stable');check('Three bodyform references accompany the actual stable',q.locator('.plan-previews > div').count()==3)
        shot(q,'stable_initial.png')
        q.click('#browse-hosts');check('Useful stable discovery opens actual whole-host shop stock',q.locator('#shop-kind').input_value()=='roach')
        check('Full kits contain three distinct identified hosts',q.locator('[data-whole-kit]').count()==3)
        shot(q,'complete_kits_desktop.png')
        q.click('[data-shop="buyKit"][data-id="W08.KIT.NEEDLE"]');check('Complete-kit payment transfers its real living host',w(q,"w.accounts.player===34&&w.specimens.find(s=>s.id==='W08.HOST.KIT.NEEDLE').owner==='player'"))
        q.click('[data-shop="unpack"][data-id="W08.KIT.NEEDLE"]');check('Opening brings the included empty host to the existing workbench',w(q,"w.bench.host_id==='W08.HOST.KIT.NEEDLE'&&w.bench.fitted.placements.length===0"))
        check('Parked original H-6 is absent from new host tray',q.locator('[data-stock="H-6"]').count()==0)
        q.click('#tab-stable');q.click('[data-stable="layoutKit"][data-id="W08.KIT.NEEDLE"]');check('Guide arranges real parts as a draft rather than granting an assembled racer',w(q,"w.bench.draft.placements.length===2&&w.bench.fitted.placements.length===0"))
        check('Narrow native geometry is visible in the bench artwork',q.locator('#bench .native-body').get_attribute('transform').find('0.868')>=0)
        q.click('#fit-part') if not q.locator('#fit-part').is_disabled() else None # no required action when guide already includes selection
        q.click('#commit');check('Fitting commits the exact kit contents',w(q,"w.bench.fitted.placements.length===2&&w.stabled.HOST.fitted.placements[0].id==='H-6'"))
        part=w(q,'w.bench.fitted.placements[1].id');q.locator('[data-stock="'+part+'"]').click();check('Measured product qualifications are exposed beside actual sects',q.locator('#part-info .quality-tag').count()==1)
        shot(q,'needle_workbench.png')
        before=w(q,'w.tick');q.click('#go-race');q.click('#run');q.wait_for_function('RRR_WORKBENCH.runs().length===1',timeout=30000)
        check('Fresh race records the selected nonhistorical host and its native profile',q.evaluate("RRR_WORKBENCH.runs()[0].results.some(r=>r.host_id==='W08.HOST.KIT.NEEDLE'&&r.build.body_profile.plan==='needleback')"))
        check('Attendance advances shared care once for the actual entered host',w(q,'w.tick')==before+2)
        frozen=q.evaluate('JSON.stringify(RRR_WORKBENCH.runs()[0])');world_at_end=w(q,'JSON.stringify(w)')
        q.click('#end');q.click('#replay-start');q.locator('#scrub').fill('780');check('Replay changes no stock, care, funds or attendance',w(q,'JSON.stringify(w)')==world_at_end)
        q.click('#end');shot(q,'needle_race.png')
        q.click('#tab-bench');q.select_option('#active-host','HOST');check('Switch restores the original roach and its fitted Hopper',w(q,"w.bench.host_id==='HOST'&&w.bench.fitted.placements[0].id==='H-6'"))
        check('Parked kit drive cannot appear as an available loose part',w(q,"w.stabled['W08.HOST.KIT.NEEDLE'].fitted.placements.every(p=>!RRRWorld.availablePart(w,p.id))"))
        q.locator('#finish > summary').click();q.fill('#name','ORIGINAL / KEPT');check('Changing another draft does not rewrite previous host race',q.evaluate('JSON.stringify(RRR_WORKBENCH.runs()[0])')==frozen)
        q.click('#tab-race');q.click('#result-to-bench');check('Historical race-to-bench action selects the recorded host first',w(q,"w.bench.host_id==='W08.HOST.KIT.NEEDLE'"))
        q.click('#tab-stock')
        with q.expect_download() as down:q.click('#save-world')
        backup=ROOT/'evidence/browser_world_backup.json';down.value.save_as(backup);saved=w(q,'JSON.stringify(w)')
        q.click('#wait-one');q.set_input_files('#world-file',str(backup));q.wait_for_timeout(100);check('Full backup restores all stabled builds and active host without duplication',w(q,'JSON.stringify(w)')==saved)
        q.click('#tab-stable');shot(q,'stable_two_hosts.png')
        q.set_viewport_size({'width':390,'height':844});shot(q,'stable_mobile.png');check('Stable has no horizontal overflow at narrow width',q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
        q.click('#tab-shop');shot(q,'kits_mobile.png');check('Full kit cards retain natural mobile flow',q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
        q.click('#tab-bench');shot(q,'bench_mobile.png');check('Host selector and fitting controls remain reachable on narrow screen',q.locator('#active-host').is_visible() and q.locator('#commit').is_visible() and q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
        # A separate purchaser/breeder uses only actual opening cash and ordinary UI actions.
        b=page();b.click('#tab-shop');b.select_option('#shop-kind','roach')
        parents=['W08.SHOP.HOST.needleback.A','W08.SHOP.HOST.broadback.B']
        for id in parents:b.click('[data-shop="buyLive"][data-id="'+id+'"]')
        check('Actual bought host founders remain separate animals',w(b,"w.specimens.filter(s=>s.kind==='roach'&&s.owner==='player').length===3"))
        check('Live host shelf illustrates distinct visible body plans',b.locator('svg[aria-label="Gutterbred Lowline / adult"]').count()>0 and b.locator('svg[aria-label="Broadback / adult"]').count()>0)
        b.click('#tab-stable');b.select_option('#selection-kind','roach');b.select_option('#selection-trait','strideFactor');b.fill('#selection-threshold','1');b.click('#apply-selection')
        b.fill('#line-name','LONGSTEP / first brood');b.select_option('#line-parent-a',parents[0]);b.select_option('#line-parent-b',parents[1]);b.click('#create-line')
        check('Line recording protects founders without creating descendants',w(b,"w.lines.length===1&&w.broods.length===0"))
        b.click('#tab-stock');b.select_option('#parent-a',parents[0]);b.select_option('#parent-b',parents[1]);b.click('#breed')
        check('Owned host founders use the whole-host reproduction profile',w(b,"w.broods[0].kind==='roach'&&w.broods[0].count===4"))
        b.click('#tab-stable');check('Unopened brood report withholds unobserved survival',b.get_by_text('Survival unobserved',exact=True).count()==1)
        b.click('#tab-stock');b.click('#wait-four');b.click('#wait-one')
        children=w(b,"w.specimens.filter(s=>s.brood===w.broods[0].id&&s.alive&&s.stage==='adult').map(s=>s.id)")
        check('Existing clock produces actual adult host offspring',len(children)>0)
        kid=children[0];b.locator('[data-specimen="'+kid+'"]').locator('[data-world="assay"]').click()
        b.click('#tab-stable');check('Brood records separate measured from unknown descendants',w(b,"RRREvidence.lineReport(w,w.lines[0]).tested===1&&RRREvidence.lineReport(w,w.lines[0]).observedDescendants>0"))
        shot(b,'line_evidence_desktop.png')
        b.locator('[data-stable="registerHost"][data-id="'+kid+'"]').click();b.locator('[data-stable="switchHost"][data-id="'+kid+'"]').click()
        check('The grown offspring becomes the active racer without copying an existing build',w(b,"w.bench.host_id==="+json.dumps(kid)+"&&w.bench.fitted.placements.length===0&&w.specimens.find(s=>s.id==="+json.dumps(kid)+").parents.length===2"))
        b.click('[data-stock="UPGRADE-DRIVE"]');b.click('#fit-part');b.click('#commit');b.click('#go-race');b.click('#run');b.wait_for_function('RRR_WORKBENCH.runs().length===1',timeout=30000)
        check('Bred host fitted with owned stock enters a new race under its own identity',b.evaluate('(id)=>RRR_WORKBENCH.runs()[0].results.some(r=>r.host_id===id&&r.build.component_ids.includes("UPGRADE-DRIVE"))',kid))
        b.click('#end');shot(b,'bred_host_race.png')
        b.click('#tab-stable');b.set_viewport_size({'width':390,'height':844});shot(b,'lines_mobile.png');check('Line forms and records stay within narrow viewport',b.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
        # Caught-host path is not a shop privilege.
        c=page();c.click('#tab-stock');c.select_option('#route-choice','roach');c.click('[data-scout="roach"]')
        caught=w(c,"w.specimens.find(s=>s.kind==='roach'&&s.id!=='HOST'&&s.owner==='player'&&!s.measured).id")
        c.locator('[data-world="registerHost"][data-id="'+caught+'"]').click();c.click('#tab-stable');c.locator('[data-stable="switchHost"][data-id="'+caught+'"]').click()
        check('A field-caught whole host can enter the same personal bench',w(c,'w.bench.host_id==='+json.dumps(caught)))
        # Actual W07 file migration through UI preserves the previous balance and genetic state.
        c.click('#tab-stock');c.set_input_files('#world-file',str(ROOT/'reference/w07_save_fixture.json'));c.wait_for_timeout(100)
        check('Earlier world backup migrates through the real restore input',w(c,"w.schema==='RRR.W08.WORLD.1'&&w.accounts.player===142&&Object.keys(w.hosts).join()==='HOST'"))
        check('No undefined labels rendered',c.get_by_text('undefined',exact=False).count()==0)
        check('No uncaught browser errors',not errors,errors)
    finally:
        report={'scope':'Linux Chromium, actual controls and read-only output inspection. No money, offspring or genomes injected. Exact packaged HTML via set_content; native file launch blocked.', 'html_sha256':hashlib.sha256((ROOT/'RRR_Living_Stable_v0.8.html').read_bytes()).hexdigest(), 'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'checks':checks,'errors':errors,'navigation':routes}
        (ROOT/'evidence/browser_report.json').write_text(json.dumps(report,indent=2));print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':errors}));browser.close()
