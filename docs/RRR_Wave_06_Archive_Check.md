# RRR Wave v0.6 — Delivered-archive verification

UTC: 2026-09-10T07:38:45.681019+00:00

Archive: `RRR_Wave_06_Agent_Pack.zip`
SHA-256: `a4e3b4cb1a61aee70cc3589823c6882c2ea4b585398470bbd14df2cd21ea0e32`
Size: 3,864,704 bytes.

## Executed against an independently extracted copy

Exact inventory and all 53 manifest file hashes passed before execution. No files escaped the archive root. Ran the extracted `validate_wave06.py` with exit code 0.

| Check | Result |
|---|---|
| Shared-world behavior | 76 passed / 0 failed |
| Preserved bench behavior | 63 passed / 0 failed |
| Unchanged W04 Python/JS comparisons | 6 passed |
| W04 regression, extracted actual prior archive | 39 passed |
| W03 regression, extracted actual prior archive | 66 passed |
| Baseline, identifiers, schema and exact HTML/source build | Passed |
| Browser evidence | 19 checks; exact current HTML hash verified |

The browser suite was executed on the working artifact before packaging. It was not repeated during this extracted-archive run; the exact artifact hash is `88cbd393bd0b8fed09087dbe1a7873019de9f2b70b00ab1cd019557529e197f9`. The carried report records actual control interaction and file-backup round trip with no uncaught errors.

The test host blocked both file-URI and loopback-HTTP navigation. Browser execution used the exact HTML via Playwright set_content. Native-file autosave, origin-backed reload, Windows/macOS behavior and physical touch remain unverified. No human playtest, whole-world benchmark, economic calibration, general breeding or final art certification is implied.

## Extracted validator output

```json
{
  "status": "passed",
  "new_behavioral": {
    "passed": 76,
    "failed": 0
  },
  "bench_regression": {
    "passed": 63,
    "failed": 0
  },
  "port_comparisons": 6,
  "prior_regressions": {
    "W04": {
      "passed": 39,
      "source": "preserved actual W05 archive"
    },
    "W03": {
      "passed": 66,
      "source": "preserved actual W05 archive"
    }
  },
  "browser": {
    "checks": 19,
    "rerun_this_validation": false,
    "html_sha256": "88cbd393bd0b8fed09087dbe1a7873019de9f2b70b00ab1cd019557529e197f9",
    "modes": [
      "File URI blocked: Page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR at file:///mnt/data/RRR_Wave_06/RRR_Living_World_v0.6.html",
      "exact HTML via set_content",
      "Loopback HTTP blocked; origin persistence UNVERIFIED: Page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR at http://127.0.0.1:44589/RRR_Living_World_v0.6.html"
    ]
  }
}
```
