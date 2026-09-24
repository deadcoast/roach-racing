from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'src/template.html').read_text()
for key,name in [('CSS','style.css'),('ENGINE','race.js'),('CATALOG','catalog.js'),('HOSTS','hosts.js'),('EVIDENCE','evidence.js'),('BENCH','bench.js'),('ART','anatomy.js'),('WORLD','world.js'),('APP','app.js')]:
    text=(ROOT/'src'/name).read_text()
    assert '</script' not in text.lower(),name
    assert '__'+key+'__' in s,key
    s=s.replace('__'+key+'__',text)
out=ROOT/'RRR_Living_Stable_v0.8.html';out.write_text(s)
print(out,len(s.encode()),'bytes')
