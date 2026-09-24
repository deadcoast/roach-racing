"""Create a hash-manifested archive; verify it after extracting before executing tests."""
from pathlib import Path
import hashlib,json,zipfile
ROOT=Path(__file__).resolve().parents[1]
items={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(ROOT.rglob('*')) if p.is_file() and p.name!='package_manifest.json' and '__pycache__' not in p.parts}
(ROOT/'package_manifest.json').write_text(json.dumps({'format':'RRR.ARCHIVE.1','version':'0.8.0','scope':'SHA256 and exact inventory, not authenticity or gameplay quality.','files':items},indent=2)+'\n')
out=ROOT.parent/'RRR_Wave_08_Agent_Pack.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for rel in sorted([*items,'package_manifest.json']):z.write(ROOT/rel,'RRR_Wave_08/'+rel)
print(out,out.stat().st_size,'bytes',len(items),'hashed files')
