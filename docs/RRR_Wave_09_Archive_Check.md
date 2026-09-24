# RRR Wave v0.9 — Delivered-archive verification

**Result: passed.** The actual delivered ZIP was extracted to a separate directory, its initial exact inventory and hashes verified, and its validator executed from that extraction.

| Check | Result |
|---|---|
| Exact initial inventory | 62 files plus the manifest itself |
| Initial per-file SHA-256 and byte lengths | All matched |
| Current Trackworks/contact tests | 70 passed |
| Current migration and donor lifecycle tests | 31 passed |
| Continued bench tests | 63 passed |
| Raw historical numerical comparisons | 6 passed |
| Original Wave 08 stable suite | 105 passed on unchanged prior sources |
| Browser evidence | 30 checks, zero uncaught page errors, exact delivered-HTML hash |
| Schema, references, dependencies, cumulative preservation, profiles | Passed |
| Application and source bytes after rebuild/tests | Unchanged |
| Extracted validator exit status | 0 |

**ZIP SHA-256:** `63dc881b3aa67438f6358c590ce92cc7e42de7ca79a12a0f1472bd27cdb739a4`  
**HTML SHA-256:** `3df5781d7bd2b274be1261e031060fb23eb50f4c971fa895d0cfb97e2a2e023b`  
**Extracted validation duration:** 27.74 seconds.

The actual browser suite was executed separately before packaging. This extracted run verifies its report against the exact HTML and does not claim a second browser execution. Browser controls ran in Linux Chromium using exact HTML `set_content` after the host blocked native file navigation. No Windows/macOS native persistence, physical-touch test, human playtest, full ecological simulation, long-run economic calibration, or finished-game acceptance is claimed.

Model tests include explicitly synthetic controlled material and donor inputs; the actual browser route uses normal opening funds, purchases, field catches, and workbench controls. Historical numerical parity protects earlier inputs without certifying physical realism. A completed test is supporting evidence, not a final MIVIM or retention grade.

Re-running tests updates evidence timestamps, execution paths and logs. Initial integrity is verified before those expected evidence writes; protected application/source files are compared afterward. The manifest is an integrity inventory, not a signed authenticity claim.
