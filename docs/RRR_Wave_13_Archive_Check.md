# Lucky 13 — Delivered-archive verification

Checked: 2026-09-11T14:49:15.300592+00:00

Archive: `RRR_Lucky_13_Agent_Pack.zip`
SHA-256: `295af8bead702eaf9bef215835054f2620ab322a75358770a7fb89e1daccc99d`

**PASS:** Exact ZIP inventory: 90 hashed payload files plus the manifest. All file sizes and hashes matched.

**PASS:** Independent extraction rebuilt the HTML and reran all six model/regression suites. 57 source, tool, test, reference, application, specification and cumulative-data files remained byte-identical to their packaged values. Generated validation logs may change.

**Harness note:** The combined extract-and-run tool invocation reached its execution limit. The same extracted directory was retained; its validator was rerun directly to completion, then its packaged immutable bytes were compared again. No failed test was ignored or relabeled.

| Suite rerun from extraction | Passed | Failed |
|---|---:|---:|
| wildlands | 61 | 0 |
| maker | 83 | 0 |
| club | 59 | 0 |
| trackworks | 70 | 0 |
| bench | 63 | 0 |
| historical_parity | 6 | 0 |

**PASS:** Schema, cumulative-baseline preservation, task ordering, runtime/spec agreement, all 24 source-to-product relationships and twelve unchanged prior functional modules.

**Browser:** 32 actual-control checks with zero reported failures or uncaught errors. The recorded report matches this exact rebuilt HTML. Controls were executed in the development workspace and their source binding was rechecked on extraction; browser actions were not rerun during extraction. File navigation was blocked, so the exact HTML ran with `set_content` in Linux Chromium.

**Supply:** 32 executed runs, independently repeated as four source-bound eight-run batches. Complete seed/case coverage and exact source hashes rechecked from extraction. Two different loadouts and a fixed automated visible-candidate policy are not a causal tool comparison or a calibrated income curve.

**Unverified:** Native Windows/macOS execution and origin persistence, physical touch, human usability, retention, full ecology/biology, articulated race fidelity and world-scale economic balance.

**Scope:** A turn-based spatial expedition integrated with the existing local game, not a continuous open-world terrain or a complete finished DLC.

This verification report remains outside the ZIP, avoiding a self-referential archive hash.
