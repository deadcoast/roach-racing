# RRR Wave v0.5 — Delivered archive check

Archive: `RRR_Wave_05_Agent_Pack.zip`

SHA-256: `64583c81d76ba0b8a7838a37c84e1333e9bd898bacd1878b83387444627b6c3e`

Manifest: exact inventory and all 56 payload hashes passed before execution.

Executed extracted package command: `python validate_wave05.py --browser`

Exit code: **0**.

```text
{
  "status": "passed",
  "new_behavioral": {
    "passed": 63,
    "failed": 0
  },
  "port_cases": 6,
  "prior_regressions": {
    "W04": {
      "passed": 39,
      "return_code": 0
    },
    "W03": {
      "passed": 66,
      "return_code": 0
    }
  },
  "browser": {
    "browser_report": {
      "checks": 14,
      "rerun_this_validation": true,
      "html_sha256": "a231f9304dab4e8387f9a5529f4109012881aab4c8fc9d49d0451a82d23028be"
    },
    "browser_edge_report": {
      "checks": 5,
      "rerun_this_validation": true,
      "html_sha256": "a231f9304dab4e8387f9a5529f4109012881aab4c8fc9d49d0451a82d23028be"
    }
  }
}


```

This verifies reproducibility of the delivered package in Linux Chromium and the model toolchain. Native file navigation remained blocked; the exact HTML bytes ran through set_content. It does not certify Windows/macOS launch, file-URL storage, human usability, biological realism, economy balance or a complete game. Generated logs and screenshots from this rerun are not used to rewrite the delivered archive.
