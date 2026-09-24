#!/usr/bin/env python3
"""Rebuild and verify the delivered W08 scope; prior-release evidence stays labeled."""
from __future__ import annotations
import argparse, hashlib, json, os, platform, subprocess, sys, tempfile, zipfile
from datetime import datetime, timezone
from pathlib import Path
import jsonschema
ROOT=Path(__file__).resolve().parent
E=ROOT/'evidence';E.mkdir(exist_ok=True)
def sha(p:Path)->str:return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p:str):return json.loads((ROOT/p).read_text())
def ids(x):
    out=set()
    if isinstance(x,dict):
        if isinstance(x.get('id'),str):out.add(x['id'])
        for v in x.values():out.update(ids(v))
    elif isinstance(x,list):
        for v in x:out.update(ids(v))
    return out

def main()->int:
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--browser',action='store_true')
    parser.add_argument('--prior-release',action='store_true')
    args=parser.parse_args();steps=[]
    def command(name,argv,cwd=ROOT,timeout=120):
        r=subprocess.run(argv,cwd=cwd,text=True,capture_output=True,timeout=timeout)
        (E/(name+'.log')).write_text('$ '+' '.join(map(str,argv))+'\n'+r.stdout+'\n'+r.stderr+'\nEXIT '+str(r.returncode)+'\n')
        steps.append({'name':name,'exit':r.returncode})
        if r.returncode:raise RuntimeError(name+' failed; inspect its log')
    try:
        for p in (ROOT/'src').glob('*.js'):command('syntax_'+p.stem,['node','--check',str(p)])
        command('build',[sys.executable,'tools/build_app.py'])
        command('new_behaviors',['node','tests/stable.cjs'])
        command('legacy_bench',['node','tests/bench_regression.cjs'])
        command('legacy_parity',['node','tests/parity.cjs'])
        command('documents',[sys.executable,'tools/write_spec.py'])
        if args.browser:command('browser',[sys.executable,'tests/browser_stable.py'],timeout=150)
        spec=read('RRR_Wave_08.spec');base=read('reference/world_context_v0.7.json');world=read('world_context_v0.8.json')
        jsonschema.Draft202012Validator(read('wave08.schema.json')).validate(spec)
        assert sha(ROOT/'reference/world_context_v0.7.json')==spec['manifest']['base_sha256']
        for k in base:
            if k not in ['manifest','development_waves']:assert world[k]==base[k],k
        assert world['development_waves'][:-1]==base['development_waves']
        assert world['development_waves'][-1]==spec
        # Preserve the meanings of earlier queued task IDs while developing subordinate work.
        prior_next=base['development_waves'][-1]['Plan']['next']
        assert [{k:v for k,v in x.items() if k!='current_scope_status'} for x in spec['Plan']['carried_commitments']]==prior_next
        definitions=[*spec['rules'],*spec['Plan']['tasks'],*spec['Plan']['next'],*spec['entities'],*spec['world_threads'],*spec['Reference']['sources']]
        names=[x['id'] for x in definitions];assert len(names)==len(set(names))
        known=ids(base)|set(names)
        for r in spec['rules']:
            for target in r['refines']:assert target in known,(r['id'],target)
        for t in spec['world_threads']:assert t['institution'] in known,t['institution']
        seen=set()
        for t in spec['Plan']['tasks']:
            assert all(dep in seen for dep in t['depends_on']),t['id'];seen.add(t['id'])
        html=(ROOT/'RRR_Living_Stable_v0.8.html').read_text()
        for marker in ['__CSS__','__ENGINE__','__WORLD__','__HOSTS__']:assert marker not in html
        assert '<script src=' not in html and '<link rel="stylesheet"' not in html
        assert not any(p.suffix.lower() in {'.ttf','.otf','.woff','.woff2'} for p in ROOT.rglob('*') if p.is_file())
        model=read('evidence/stable_tests.json');bench=read('evidence/model_report.json');parity=read('evidence/parity_report.json')
        assert model['failed']==0 and bench['summary']['failed']==0 and all(x['passed'] for x in parity['cases'])
        browser=read('evidence/browser_report.json') if (E/'browser_report.json').exists() else None
        browser_current=bool(browser and browser.get('html_sha256')==sha(ROOT/'RRR_Living_Stable_v0.8.html'))
        if args.browser:assert browser_current and browser['failed']==0 and not browser['errors']
        prior=None
        if args.prior_release:
            with tempfile.TemporaryDirectory(prefix='rrr-w07-regression-') as tmp:
                dest=Path(tmp)
                with zipfile.ZipFile(ROOT/'reference/RRR_Wave_07_Agent_Pack.zip') as z:
                    for item in z.infolist():
                        p=(dest/item.filename).resolve()
                        if not p.is_relative_to(dest.resolve()):raise ValueError('Unsafe prior-archive path')
                        if (item.external_attr>>16)&0o170000==0o120000:raise ValueError('Archive symlink')
                    z.extractall(dest)
                roots=list(dest.glob('*/src/world.js'));assert len(roots)==1
                old=roots[0].parent.parent
                command('preserved_w07_behaviors',['node','tests/world_parts.cjs'],cwd=old)
                command('preserved_w07_migration_cycles',['node','tests/migration_and_cycles.cjs'],cwd=old)
                a=json.loads((old/'evidence/world_parts_report.json').read_text());b=json.loads((old/'evidence/migration_cycles.json').read_text())
                assert a['summary']['failed']==0
                prior={'scope':'Executed on unchanged extracted W07 release, not credited as W08 behavioral coverage.','behavior_tests':a['summary'],'migration_checks':b['count'],'operational_probes':b['cycleCount'],'archive_sha256':sha(ROOT/'reference/RRR_Wave_07_Agent_Pack.zip')}
                (E/'preserved_release_report.json').write_text(json.dumps(prior,indent=2)+'\n')
        report={'status':'passed','recorded_utc':datetime.now(timezone.utc).isoformat(),'platform':platform.platform(),'python':sys.version.split()[0],
          'scope':'Schema/identity preservation, bounded behavioral models, declared comparisons and optional browser/prior-release execution; no human playtest or economy calibration.',
          'new_behavior_tests':{'passed':model['passed'],'failed':model['failed']},'legacy_bench':bench['summary'],'raw_legacy_comparisons':len(parity['cases']),
          'structural_checks':{'schema':True,'baseline_sha':True,'unchanged_non_manifest_context':True,'unchanged_prior_waves':True,'prior_task_meanings':True,'unique_new_definition_ids':True,'rule_references':True,'world_institutions':True,'ordered_dependencies':True},
          'browser':{'executed_this_command':args.browser,'evidence_matches_html':browser_current,'passed':browser['passed'] if browser_current else None,'failed':browser['failed'] if browser_current else None,'native_launch':browser.get('navigation') if browser_current else None},
          'prior_release':prior,'html_sha256':sha(ROOT/'RRR_Living_Stable_v0.8.html'),'baseline_sha256':spec['manifest']['base_sha256'],'source_files':{str(p.relative_to(ROOT)):sha(p)for p in sorted((ROOT/'src').glob('*'))if p.is_file()},'steps':steps}
        (E/'validation_report.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:report[k]for k in ['status','new_behavior_tests','legacy_bench','raw_legacy_comparisons','browser','prior_release']},indent=2));return 0
    except Exception as ex:
        (E/'validation_failure.json').write_text(json.dumps({'error':str(ex),'steps':steps},indent=2));raise
if __name__=='__main__':raise SystemExit(main())
