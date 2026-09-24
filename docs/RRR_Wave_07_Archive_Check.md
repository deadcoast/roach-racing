# RRR Wave 07 — delivered-archive verification

**Archive:** `RRR_Wave_07_Agent_Pack.zip`  
**SHA-256:** `bcdb159925ea4689aec2e10681fc133fb1b54c247dab4d0b0dc65adc9789c1c0`

Verified the exact 62-file inventory and every recorded SHA-256 after extraction. The manifest excludes itself.

Reran `python validate_wave07.py --browser --prior` from that extracted archive. Exit code: **0**.

| Check | Result |
|---|---|
| New component/world behavior | 115 passed, 0 failed |
| Continued bench regressions | 63 passed, 0 failed |
| Legacy Python/browser race profiles | 6 matched cases |
| World v0.6 migration | 6 checks |
| Repeated operational profiles | 36 runs across 12 seeds and 3 policies |
| Actual browser interaction | 30 checks, no uncaught errors |
| Original Wave 06 world suite | 76/76 passed in unchanged extracted reference |
| Schema, task dependencies and baseline content | Passed |
| Rebuilt HTML identical to delivered HTML | Passed |

Browser evidence uses Linux Chromium and the exact HTML via `set_content`. File navigation was blocked by the host. This does not verify Windows/macOS file launch, file-origin persistence, physical touch, human play experience, biological plausibility or complete-game balance.

The 36 operational runs use disclosed starting assets and external customer funding. They are bounded stress probes, not proof of universally profitable breeding or fair career comparisons. The browser order demonstration buys and resells a component at a loss; it verifies custody/payment rather than claiming arbitrage.

Numerical tests support the specific integration. They do not assign an innovation score or establish that the completed game is addictive.
