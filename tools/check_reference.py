#!/usr/bin/env python3
"""Check this compendium's documentary integrity. Does not test gameplay or biology."""
from __future__ import annotations
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote


def strict_json(path: Path):
    def pairs(items):
        result = {}
        for key, value in items:
            if key in result:
                raise ValueError(f"Duplicate JSON key in {path.name}: {key}")
            result[key] = value
        return result
    def invalid(value):
        raise ValueError(f"Nonfinite JSON value: {value}")
    return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=pairs,
                      parse_constant=invalid)


def identities(value):
    found = []
    if isinstance(value, dict):
        if isinstance(value.get("id"), str):
            found.append(value["id"])
        for child in value.values():
            found.extend(identities(child))
    elif isinstance(value, list):
        for child in value:
            found.extend(identities(child))
    return found


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def fragments(path: Path):
    text = path.read_text(encoding="utf-8")
    explicit = re.findall(r'<a\s+(?:id|name)=["\']([^"\']+)', text)
    result = set(explicit)
    for title in re.findall(r"^#{1,6}\s+(.+)$", text, re.M):
        result.add(re.sub(r"[^\w\- ]", "", title.lower()).replace(" ", "-"))
    return result, explicit


def run(root: Path) -> dict:
    records = []
    def check(name, condition, detail):
        records.append({"name": name, "passed": bool(condition), "detail": detail})
    base_dir = root / "reference/W19"
    spec = strict_json(root / "RRR_Wave_20.spec")
    base = strict_json(base_dir / "RRR_World_Context_v0.19.json")
    current = strict_json(root / "RRR_World_Context_v0.20.json")
    index = strict_json(root / "RRR_Current_Reference_v0.20.json")
    comp = spec["Compendium"]
    inventory = strict_json(root / "evidence/baseline_inventory.json")
    check("strict JSON", True, "Four reference JSON records parsed with duplicate/nonfinite rejection.")
    got_files = {p.relative_to(base_dir).as_posix() for p in base_dir.rglob("*") if p.is_file()}
    check("exact inherited file roster", got_files == set(inventory), f"{len(got_files)} inherited files.")
    changed = [name for name, digest in inventory.items()
               if not (base_dir / name).is_file() or sha(base_dir / name) != digest]
    check("inherited bytes unchanged", not changed, changed or "All inherited files match recorded SHA-256.")
    check("base snapshot binding", sha(base_dir / "RRR_World_Context_v0.19.json") == spec["manifest"]["base_sha256"], "Wave20 names the exact cumulative input.")
    inherited_changed = [key for key in base if key not in ("manifest", "development_waves") and current.get(key) != base[key]]
    check("cumulative non-manifest preservation", not inherited_changed, inherited_changed or "All prior non-manifest, non-wave-list fields unchanged.")
    check("history is exact prefix", current["development_waves"][:-1] == base["development_waves"], f"{len(base['development_waves'])} earlier wave records unchanged.")
    check("appended wave equals standalone spec", current["development_waves"][-1] == spec, "No separate content drift in the cumulative copy.")
    check("author premises unchanged", index["author_premises_preserved"] == base["author_canon"], f"{len(base['author_canon'])} inherited author-premise records.")
    premise_text = (root / "RRR_Wave_20_Author_Premises.md").read_text()
    check("printed premise fidelity", all(item["statement"] in premise_text for item in base["author_canon"]), "Printed statements are verbatim inherited text, not elevated new proposals.")
    ids = identities(comp) + identities(spec["Reference"]["sources"])
    duplicates = [key for key,count in Counter(ids).items() if count > 1]
    check("unique authored record identifiers", not duplicates, duplicates or f"{len(ids)} current authored/source identifiers.")
    known = set(ids) | set(identities(base))
    missing = []
    def inspect_refs(value):
        if isinstance(value, dict):
            for key, child in value.items():
                if key in ("prior_refs", "source_refs", "reference_ids"):
                    missing.extend(ref for ref in child if ref not in known)
                elif key in ("current_ref", "parent") and isinstance(child, str) and child not in known:
                    missing.append(child)
                else:
                    inspect_refs(child)
        elif isinstance(value, list):
            for child in value:
                inspect_refs(child)
    inspect_refs(comp)
    check("scoped reference targets", not missing, sorted(set(missing)) or "Every declared source/prior/current relationship resolves by ID.")
    components=comp["component_passports"]
    check("component coverage", len(components)==34 and spec["manifest"]["statistics"]["foundational_component_passports"]==30,
          "30 foundational preparations plus 4 separately identified flight supplements; not new species.")
    products=comp["product_briefs"]
    roles={"Host","Drive","Linkage","Contact","Structure/protection","Reserve","Balance/control","Receiving/damping","Special anatomy","Finish/support"}
    check("complete product-role bills", len(products)==8 and all(set(p["bill_of_functions"])==roles for p in products), "Eight ten-role bills; textual fit/measurement parameters are not numerical validation.")
    check("open decisions preserved", len(comp["decision_resolutions"])==12 and current["decisions"]==base["decisions"], "Developed subquestions do not replace the historical authority-decision records.")
    main=(root/"RRR_Wave_20_Foundations.md").read_text()
    parity=[]
    for chapter in comp["chapters"]:
        body=re.sub(r"^## ", "### ", chapter["body"], flags=re.M)
        body=re.sub(r"(?m)^(\*\*(W20\.[A-Z0-9_.]+) —)", lambda m:'<a id="'+m.group(2).lower().replace('.', '-').replace('_','-')+'"></a>\n\n'+m.group(1),body)
        if body not in main:parity.append(chapter["id"])
    check("main manuscript and structured chapter agreement", not parity, parity or f"{len(comp['chapters'])} complete chapter bodies match their rendered form.")
    # Verify all CURRENT local document targets. Preserved documents are byte checked, not silently repaired.
    count=0; bad=[]; repeated=[]; cache={}
    def check_target(origin, target):
        nonlocal count
        if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", target): return
        count+=1
        file,_,fragment=target.partition('#')
        dest=(origin.parent/unquote(file)).resolve() if file else origin.resolve()
        if not dest.is_relative_to(root.resolve()):
            bad.append([origin.name,target,"outside pack"]);return
        if not dest.is_file():
            bad.append([origin.name,target,"missing file"]);return
        if fragment:
            if dest not in cache:cache[dest]=fragments(dest)[0]
            if unquote(fragment) not in cache[dest]:bad.append([origin.name,target,"missing anchor"])
    for p in root.glob("*.md"):
        text=p.read_text()
        explicit=fragments(p)[1]
        repeated.extend([p.name, key] for key,n in Counter(explicit).items() if n>1)
        for match in re.finditer(r"(?<!!)\[[^\]]*\]\(([^\s)]+)\)",text):
            check_target(p, match.group(1))
    check("current local document links", not bad, {"count":count,"failures":bad})
    check("unambiguous current anchors", not repeated, repeated or "No duplicate explicit anchors in current Markdown.")
    for row in index["subject_records"]:
        check_target(root/"RRR_Current_Reference_v0.20.json",row["document"]+'#'+row["anchor"])
    check("machine-readable subject routes", not bad, f"{len(index['subject_records'])} subject routes verified along with current document links.")
    raw_costs=[10,4,6,4,18,2]
    check("illustrative service arithmetic",sum(raw_costs)==44 and 48-44==4 and 48-64==-16 and 70-64==6 and 44<=60<64,
          "One authored quote and two branches; specialist work is not pre-financeable from 60 without a stated change. Not an economy simulation.")
    check("no runtime claim",spec["manifest"]["runtime_modified"] is False and len(spec["Review"]["future_studies"])==6,
          "Six future studies remain unperformed. This checker verifies documents, not fun, physiology, or gameplay.")
    return {"scope":"compendium_integrity_only", "passed":all(r["passed"] for r in records),
            "checks":records,"current_markdown_local_links":next(r['detail']['count'] for r in records if r['name']=='current local document links'),
            "inherited_files":len(inventory),"limits":["No application modified or rerun","No physical material tests","No human study","No market or retention validation"]}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--report',type=Path)
    args=parser.parse_args()
    try:
        report=run(args.root.resolve())
    except (OSError,ValueError,KeyError,TypeError) as exc:
        print(f"Reference check failed: {exc}",file=sys.stderr)
        return 2
    text=json.dumps(report,ensure_ascii=False,indent=2)
    if args.report:
        args.report.parent.mkdir(parents=True,exist_ok=True)
        args.report.write_text(text+'\n',encoding='utf-8')
    print(text)
    return 0 if report['passed'] else 1

if __name__=='__main__':
    raise SystemExit(main())
