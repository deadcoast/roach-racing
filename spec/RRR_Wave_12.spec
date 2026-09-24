{
  "manifest": {
    "id": "W12",
    "version": "0.12.0",
    "date": "2026-09-11",
    "title": "RRR — Makers & Bloodlines",
    "status": "revisable_foundations_and_interactive_local_prototype",
    "extends": "world_context_v0.11.json",
    "base_sha256": "b643d9ce8eec7001716d2725a869ec7b1594acc9b03263e9c7e68e5c67a7cff1",
    "runtime_base": "Recovered Wave11 source",
    "reconstruction": "New implementation of missing Wave10 maker requirements; not recovery of that missing source",
    "serialization": "Strict JSON in .spec; RRR exchange format, not an asserted canonical private MIVIM grammar"
  },
  "Reference": {
    "sources": [
      {
        "id": "W12.S01",
        "title": "Tamiya — FM-A Balanced Starter Pack, 18710",
        "url": "https://www.tamiya.com/english/products/18710/index.html",
        "checked_on": "2026-09-11",
        "function": "A complete assembly kit and selected upgrade parts supply a coordinated build project.",
        "limit": "No RRR genetics, pricing, manufacturing or product-acceptance coefficient is supplied by this reference."
      },
      {
        "id": "W12.S02",
        "title": "Tamiya — Mini 4WD Setup Guide",
        "url": "https://www.tamiya.com/english/mini4wd/setupguide/setupguide.htm",
        "checked_on": "2026-09-11",
        "function": "Drive output, gearing, contact material, assembly and handling remain distinct decisions.",
        "limit": "Physical Mini 4WD is a separate reference layer from Gaiden. Walking-animal properties and all RRR values are fictional; no fixed-wheel formula is copied."
      },
      {
        "id": "W12.S03",
        "title": "SEGA — Gaiden Adventure / Pocket Circuit",
        "url": "https://ryu-ga-gotoku.com/gaiden/asia_en/adventure/",
        "checked_on": "2026-09-11",
        "function": "A recurring Pocket Circuit venue combines parts acquisition, Time Attack and rivals.",
        "limit": "Player kit manufacturing and biological breeding commissions are RRR extensions, not features inferred from the Coliseum content elsewhere on this page."
      }
    ],
    "previous_task": "W12.T01",
    "source_roles": {
      "native": [
        [
          "stride",
          "min",
          "Native stride"
        ],
        [
          "support",
          "min",
          "Native support"
        ]
      ],
      "drive": [
        [
          "cadence",
          "min",
          "Cadence"
        ],
        [
          "force",
          "min",
          "Useful force"
        ],
        [
          "efficiency",
          "min",
          "Conversion efficiency"
        ]
      ],
      "pads": [
        [
          "grip",
          "min",
          "Clean purchase"
        ],
        [
          "rough_grip",
          "min",
          "Loose purchase"
        ],
        [
          "release",
          "max",
          "Release delay"
        ]
      ],
      "hopper": [
        [
          "hopper.0",
          "min",
          "Elastic return"
        ],
        [
          "hopper.1",
          "max",
          "Release mismatch"
        ],
        [
          "hopper.2",
          "max",
          "Settling"
        ]
      ],
      "frame": [
        [
          "support",
          "min",
          "Lateral support"
        ]
      ],
      "gear": [
        [
          "ratio",
          "range",
          "Mechanical advantage"
        ]
      ],
      "reserve": [
        [
          "reserve",
          "min",
          "Capacity"
        ],
        [
          "delivery",
          "min",
          "Delivery"
        ]
      ],
      "suspension": [
        [
          "settle",
          "max",
          "Settling"
        ],
        [
          "impact_absorb",
          "min",
          "Impact response"
        ]
      ],
      "damper": [
        [
          "damping",
          "min",
          "Rebound damping"
        ]
      ],
      "stabilizer": [
        [
          "latency",
          "max",
          "Signal delay"
        ],
        [
          "correction",
          "min",
          "Correction"
        ],
        [
          "support_width",
          "range",
          "Support extension"
        ]
      ],
      "horn": [
        [
          "reach",
          "range",
          "Contact reach"
        ],
        [
          "impact",
          "min",
          "Transferred impact"
        ]
      ],
      "claws": [
        [
          "reach",
          "range",
          "Working reach"
        ],
        [
          "closure",
          "max",
          "Closing delay"
        ]
      ],
      "vanes": [
        [
          "downforce",
          "range",
          "Hold-down operating range"
        ],
        [
          "drag",
          "max",
          "Resistance"
        ]
      ],
      "brake": [
        [
          "brake_mu",
          "range",
          "Brake friction"
        ],
        [
          "brake_travel",
          "range",
          "Compression travel"
        ],
        [
          "brake_rough",
          "range",
          "Dusty-contact friction"
        ]
      ],
      "railguide": [
        [
          "rail_friction",
          "max",
          "Rail friction"
        ],
        [
          "rail_support",
          "min",
          "Guide support"
        ]
      ]
    },
    "mechanism_substitutions": {
      "redline": [
        "redline",
        "torque"
      ],
      "torque": [
        "redline",
        "torque"
      ],
      "sticktoe": [
        "sticktoe",
        "cleats"
      ],
      "cleats": [
        "sticktoe",
        "cleats"
      ],
      "fatbody": [
        "fatbody",
        "nectarcrop"
      ],
      "nectarcrop": [
        "fatbody",
        "nectarcrop"
      ],
      "splitvanes": [
        "splitvanes",
        "browfoil"
      ],
      "browfoil": [
        "splitvanes",
        "browfoil"
      ],
      "gripstrip": [
        "gripstrip",
        "feltbrake"
      ],
      "feltbrake": [
        "gripstrip",
        "feltbrake"
      ]
    },
    "preserved": [
      "original host and anatomy",
      "all prior race results",
      "existing thirteen reproductive forms",
      "source components and traits",
      "club meets and prizes",
      "owned circuits",
      "native body plans",
      "optional catching/breeding/buying",
      "Open and other class identity"
    ]
  },
  "Plan": {
    "tasks": [
      {
        "id": "W12.T01.REFERENCE",
        "title": "Recover the executable handoff and retain the real W11 application",
        "priority": "P0",
        "depends_on": [],
        "role": "supporting",
        "status": "reviewed",
        "acceptance": "Runtime extends recovered W11. Missing W10 maker source is reconstructed from its written requirements, not falsely recovered."
      },
      {
        "id": "W12.T01.RECIPE",
        "title": "Translate an actual fitted construction into measured commercial requirements",
        "priority": "P0",
        "depends_on": [
          "W12.T01.REFERENCE"
        ],
        "role": "novel_integration",
        "status": "implemented_and_model_tested",
        "acceptance": "Native host and every actual preparation have explicit promises. Mechanism-based alternatives and fitting are distinct from a source instance sheet."
      },
      {
        "id": "W12.T01.PACK",
        "title": "Construct full kits from alternate real stock without consuming the reference",
        "priority": "P0",
        "depends_on": [
          "W12.T01.RECIPE"
        ],
        "role": "novel_integration",
        "status": "implemented_and_browser_tested",
        "acceptance": "A real bred component and another living host become one paid-for, packable, openable kit. Native anatomy remains explicit."
      },
      {
        "id": "W12.T01.BREEDERS",
        "title": "Deliver living selected stock using bounded observed line evidence",
        "priority": "P0",
        "depends_on": [
          "W12.T01.REFERENCE"
        ],
        "role": "novel_integration",
        "status": "implemented_and_browser_tested",
        "acceptance": "Two measured broods and an eligible actual A/B pair are distinct checks. Unknown siblings and reproductive failure remain visible."
      },
      {
        "id": "W12.T03.DEMAND",
        "title": "Connect a permitted winning build to a specific funded product request",
        "priority": "P1",
        "depends_on": [
          "W12.T01.RECIPE",
          "W12.T01.PACK"
        ],
        "role": "novel_integration",
        "status": "implemented_and_browser_tested",
        "acceptance": "An actual completed championship and owner publication can prompt one bounded product inquiry; no cash is earned before physical delivery."
      },
      {
        "id": "W12.T01.COUNTER",
        "title": "Integrate maker output into Two Nets and the recipient workbench",
        "priority": "P0",
        "depends_on": [
          "W12.T01.PACK",
          "W12.T01.BREEDERS",
          "W12.T03.DEMAND"
        ],
        "role": "visual_and_interaction_execution",
        "status": "rendered_and_browser_tested",
        "acceptance": "Product, host, contents, measurements and evidence remain recognizable. The bought-back kit opens into the original workbench as a draft, not an instant racer."
      },
      {
        "id": "W12.REPAIR",
        "title": "Correct encountered semantic, custody and pricing shortcuts",
        "priority": "P0",
        "depends_on": [
          "W12.T01.RECIPE",
          "W12.T01.COUNTER"
        ],
        "role": "supporting_and_design_repair",
        "status": "implemented_and_tested",
        "acceptance": "Geometry is not universally higher-better; historical receipts do not own animals forever; same-counter retail avoids a posted instant buyback profit."
      },
      {
        "id": "W12.CLOSE",
        "title": "Validate the delivered source, interactions, migration and archive",
        "priority": "P0",
        "depends_on": [
          "W12.T01.REFERENCE",
          "W12.T01.RECIPE",
          "W12.T01.PACK",
          "W12.T01.BREEDERS",
          "W12.T03.DEMAND",
          "W12.T01.COUNTER",
          "W12.REPAIR"
        ],
        "role": "supporting",
        "status": "verification_recorded_separately",
        "acceptance": "Report exact tests, input provenance, negative operating examples and unverified game-wide criteria."
      }
    ],
    "next": [
      {
        "id": "W13.T01",
        "priority": "P0",
        "title": "Improve visible active-limb racing through the existing component mechanisms",
        "acceptance": "Hopper loading, target clearance, air passage and landing recovery produce legible useful actions across representative own/rival constructions. Compare altered genes and fitted geometry separately. Preserve fees, maker provenance and finish-first competition; do not award an action or win bonus to conceal bad timing."
      },
      {
        "id": "W13.T02",
        "priority": "P0",
        "title": "Calibrate production routes and repeat customer demand over several cohorts",
        "acceptance": "Matched starting resources and action budgets compare retail assembly, caught donors and retained breeding lines. Include failed attempts, care, spare inventory, actual buyer funding and positive or negative margins. No forced breeder profession or invented guaranteed profit."
      },
      {
        "id": "W13.T03",
        "priority": "P1",
        "title": "Broaden custom kit adaptation and customer specificity",
        "acceptance": "Safe re-preparation and explicit recipe revision/adaptation for different host plans; real ordinary and premium customer uses for additional part combinations. Existing signed-looking local records are not secure authority. Retain old requirements and do not silently weaken accepted commissions."
      },
      {
        "id": "W13.T04",
        "priority": "P1",
        "title": "Continue real storage, transport, Factional and Flyer prerequisites",
        "acceptance": "Implement the required living condition, transport and locomotion mechanisms before declaring shipped products, aerial events or later championship stages complete. Earlier death/regrowth decisions remain explicit."
      }
    ],
    "carried": "Prior W12.T02 movement fidelity and W12.T04 later competition are not closed by maker work; W12.T03 is implemented only as bounded owner-approved inquiries."
  },
  "Workflow": [
    "read actual W11 handoff",
    "trace kit and parts purpose to primary reference",
    "reconstruct maker model on shared state",
    "implement explicit measured promises and alternate stock",
    "integrate living breeder requests",
    "render existing-roach product interface",
    "exercise actual clubs and nursery via controls",
    "repair encountered direction/custody/quote defects",
    "regress and verify extracted artifact"
  ],
  "Adherence": {
    "admission": "required_quality_at_declared_scope AND novel_development_adherence",
    "innovation_profile": [
      "effectiveness",
      "creativity",
      "scaling_potential"
    ],
    "numerical_grade": null,
    "numerical_grade_reason": "No authorized numerical MIVIM scoring formula",
    "authority": "User premises outrank generated proposal branches. Synthetic tests are not authored canon or player rewards."
  },
  "rule_groups": [
    {
      "name": "REFERENCE / function and continuity",
      "origin": "source_hobby_translation",
      "refines": [
        "W11.REFERENCE.01",
        "W11.REFERENCE.06"
      ],
      "rules": [
        {
          "id": "W12.REFERENCE.01",
          "statement": "Commercial kit manufacturing extends the source hobby’s complete-kit and interchangeable-part functions.",
          "decision": "Build a product another hobbyist can assemble.",
          "observable": "No 1:1 claim is made for biological breeding or escrow in a PCR menu."
        },
        {
          "id": "W12.REFERENCE.02",
          "statement": "Reconstruct maker behavior against the recovered W11 state; do not claim to recover missing W10 source.",
          "decision": "Continue the actual executable.",
          "observable": "Club meets, prior specimens, Trackworks and the workbench remain."
        },
        {
          "id": "W12.REFERENCE.03",
          "statement": "Keep user premises above generated implementation branches.",
          "decision": "Choose speed, winning, collecting, breeding or commerce without a required profession.",
          "observable": "No race-rank gene lock, universal point cap, new body species ban or mandatory sidegrade appears."
        },
        {
          "id": "W12.REFERENCE.04",
          "statement": "A requirement describes a useful mechanism rather than just a shared menu label.",
          "decision": "Distinguish a sensor from a physical brace even when both stabilize.",
          "observable": "The automatic substitution group cannot replace one with the other indiscriminately."
        },
        {
          "id": "W12.REFERENCE.05",
          "statement": "Source references do not establish normalized RRR equations or final prices.",
          "decision": "Use a declared protocol and scope.",
          "observable": "Authored quantitative promises remain revisable game data."
        }
      ]
    },
    {
      "name": "RECIPE / promises and independent stock",
      "origin": "source_hobby_translation_and_rrr_production",
      "refines": [
        "W05.RECIPE.02",
        "W07.SHOP.05"
      ],
      "rules": [
        {
          "id": "W12.RECIPE.01",
          "statement": "Publish either the current committed build or an owned recorded club-round construction.",
          "decision": "Choose a real reference.",
          "observable": "Uncommitted draft and fabricated winner metadata cannot serve as an implicit build."
        },
        {
          "id": "W12.RECIPE.02",
          "statement": "Publication preserves the source host, components, positions and results.",
          "decision": "Create a reusable design without sacrificing the original.",
          "observable": "The champion can continue racing with H-6 while a different kit is made."
        },
        {
          "id": "W12.RECIPE.03",
          "statement": "A recipe specifies the source body plan and observed native mass, stride and support requirements.",
          "decision": "Choose another suitable living foundation.",
          "observable": "Matching the name Lowline alone is insufficient when native measurements fail."
        },
        {
          "id": "W12.RECIPE.04",
          "statement": "Each physical preparation becomes one recipe slot with actual measurements and preparation choices.",
          "decision": "Promise the useful properties of an assembly.",
          "observable": "A Hopper serving three functional roles is not three inventory items."
        },
        {
          "id": "W12.RECIPE.05",
          "statement": "Known legacy observations are normalized from the exact existing compiler defaults.",
          "decision": "Describe historical parts that omit explicit fields.",
          "observable": "Published efficiency or release is the declared old profile, not an invented new assay."
        },
        {
          "id": "W12.RECIPE.06",
          "statement": "Default margins create visible operating ranges or one-sided bounds; they are not statistical confidence.",
          "decision": "Choose an appropriate manufacturing allowance.",
          "observable": "The interface shows actual thresholds rather than an unexplained quality percentage."
        },
        {
          "id": "W12.RECIPE.07",
          "statement": "Individual measurement promises may be authored explicitly at publication.",
          "decision": "Set quick release and adequate dusty purchase independently.",
          "observable": "Only known axes and valid finite bounds are accepted; the reference must satisfy every promise."
        },
        {
          "id": "W12.RECIPE.08",
          "statement": "Geometry and operating ranges are not globally higher-better.",
          "decision": "Specify useful leverage, brake engagement material or reach.",
          "observable": "A larger ratio can fail the specified range without being universally lower quality."
        },
        {
          "id": "W12.RECIPE.09",
          "statement": "Mechanism-compatible substitutions must meet actual measurement and mass requirements.",
          "decision": "Use different donors or permitted preparations.",
          "observable": "Rarity and product names cannot hide a failed criterion."
        },
        {
          "id": "W12.RECIPE.10",
          "statement": "Signature mode restricts preparation choices, not individual identities.",
          "decision": "Sell a recognizable construction with repeatable source forms.",
          "observable": "Another properly measured individual can supply its parts."
        },
        {
          "id": "W12.RECIPE.11",
          "statement": "Recipe rows retain intended positions and setup while the actual substitute arrangement is checked again.",
          "decision": "Adjust placement where needed.",
          "observable": "Individually qualifying components can still fail whole-body fitting."
        },
        {
          "id": "W12.RECIPE.12",
          "statement": "Each publication is immutable and receives a new identity; current recipe version is one.",
          "decision": "Publish a changed promise as a new product.",
          "observable": "No in-place revision editor or completed revision-series system is claimed."
        },
        {
          "id": "W12.RECIPE.13",
          "statement": "Recipe export is knowledge, not world ownership.",
          "decision": "Share the product specification.",
          "observable": "The local exported product has no authority to mint host, anatomy, money or prizes."
        }
      ]
    },
    {
      "name": "KIT / actual assembly and custody",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W08.KIT.01",
        "W08.STABLE.03"
      ],
      "rules": [
        {
          "id": "W12.KIT.01",
          "statement": "Packing requires another owned mature intact measured host that is not the active bench animal.",
          "decision": "Leave the source racer intact and select a real foundation.",
          "observable": "The historical HOST cradle is nontransferable only in this fixture, not a universal species restriction."
        },
        {
          "id": "W12.KIT.02",
          "statement": "A parked registered host must have a native-only fitted state and an empty prepared-part draft before packing.",
          "decision": "Unfit deliberately or use unused stock.",
          "observable": "Packing does not silently dismantle a separate racer."
        },
        {
          "id": "W12.KIT.03",
          "statement": "Working, reproducing, packed or meet-entered hosts are unavailable.",
          "decision": "Schedule production with the real animal.",
          "observable": "One host cannot serve two simultaneous incompatible commitments."
        },
        {
          "id": "W12.KIT.04",
          "statement": "Every selected component must be owned, loose, usable and absent from every fitted build and draft reservation.",
          "decision": "Release genuine stock before using it.",
          "observable": "A draft-only removal does not free installed tissue."
        },
        {
          "id": "W12.KIT.05",
          "statement": "Alternative preparations cannot spend the same anatomical region twice; disjoint sources remain useful.",
          "decision": "Allocate fatbody to reservoir or damper, and reserve separate donor material for both.",
          "observable": "One valid complete kit has real physical sources for every listed item."
        },
        {
          "id": "W12.KIT.06",
          "statement": "Packing checks recipe promises, protected-host consent and complete geometry before changing the world.",
          "decision": "Commit a reviewed full kit.",
          "observable": "Any rejection leaves ownership, funds and custody unchanged."
        },
        {
          "id": "W12.KIT.07",
          "statement": "Successful packing costs four credits and one world turn plus care in this profile.",
          "decision": "Budget performed work and supplies.",
          "observable": "Host and components lock before time advances, preventing an automatic sale race."
        },
        {
          "id": "W12.KIT.08",
          "statement": "A packed host continues to need care and holding until ownership changes.",
          "decision": "Deliver, retain or open the kit.",
          "observable": "A tin does not stop biological obligations."
        },
        {
          "id": "W12.KIT.09",
          "statement": "Opening releases the same host and components and does not equip them.",
          "decision": "Assemble personally after unpacking.",
          "observable": "The guide creates a draft; fitting still commits the real construction."
        },
        {
          "id": "W12.KIT.10",
          "statement": "Maker retail transfers all existing kit contents without cloning them.",
          "decision": "Buy the same delivered product from Two Nets.",
          "observable": "The original donor identities reach the recipient bench and race."
        },
        {
          "id": "W12.KIT.11",
          "statement": "Opened supplier receipts remain history rather than perpetual ownership constraints.",
          "decision": "Reuse or sell a previously opened native host appropriately.",
          "observable": "An old receipt neither blocks legitimate packing nor reopens to restore missing assets."
        }
      ]
    },
    {
      "name": "BREEDER / purposeful evidence and living delivery",
      "origin": "rrr_native_progression",
      "refines": [
        "W08.LINE.05",
        "W03.BREED.07"
      ],
      "rules": [
        {
          "id": "W12.BREEDER.01",
          "statement": "A breeder request names a donor form, measured contribution and actual living delivery.",
          "decision": "Supply synchronization or release for another breeding project.",
          "observable": "The request does not accept prepared tissue instead of reproductive stock."
        },
        {
          "id": "W12.BREEDER.02",
          "statement": "Customer evidence evaluates its own target rather than blindly trusting the line’s selected label.",
          "decision": "Use relevant recorded observations.",
          "observable": "A renamed line does not rewrite or satisfy unrelated customer requirements."
        },
        {
          "id": "W12.BREEDER.03",
          "statement": "Count distinct tested descendants, matching descendants and distinct measured broods separately.",
          "decision": "Develop enough useful observed evidence.",
          "observable": "Repeated tests of one individual or many siblings do not create several broods."
        },
        {
          "id": "W12.BREEDER.04",
          "statement": "Untested observed descendants remain unknown; unopened future outcomes do not enter the report.",
          "decision": "Assay only when the information is useful.",
          "observable": "The interface cannot reveal hidden survival or convert missing evidence into failure or success."
        },
        {
          "id": "W12.BREEDER.05",
          "statement": "Sold or prepared descendants can remain historical evidence with their actual custody.",
          "decision": "Keep useful records after commercial use.",
          "observable": "Evidence does not recreate owned stock."
        },
        {
          "id": "W12.BREEDER.06",
          "statement": "The delivered pair must itself be owned, intact, mature, measured, unreserved and composed of compatible A/B roles.",
          "decision": "Choose eligible descendants from the line.",
          "observable": "A strong evidence report cannot bypass unavailable or unsuitable living animals."
        },
        {
          "id": "W12.BREEDER.07",
          "statement": "Both delivered animals must satisfy the customer contribution.",
          "decision": "Supply relevant future breeders, not arbitrary members of a famous line.",
          "observable": "A compatible pair alone does not fulfill a synchronization promise."
        },
        {
          "id": "W12.BREEDER.08",
          "statement": "Protected delivery animals require scoped confirmation; original founders are not implicitly sold.",
          "decision": "Select exactly which reproductive assets to transfer.",
          "observable": "The two delivered identities change owner while the source line remains."
        },
        {
          "id": "W12.BREEDER.09",
          "statement": "A delivery freezes the narrow evidence claim that was accepted.",
          "decision": "Retain receipt counts and sampled-brood identities.",
          "observable": "Selected measured descendants are not reported as an unbiased future yield or a race-win guarantee."
        },
        {
          "id": "W12.BREEDER.10",
          "statement": "Failure and inconvenient reproductive-role distributions remain real outcomes.",
          "decision": "Retry, source another contribution or decline a commitment.",
          "observable": "The browser test preserves an all-A early brood and a failed attempt instead of spawning a convenient pair."
        }
      ]
    },
    {
      "name": "DEMAND / useful products and earned income",
      "origin": "rrr_native_hobby_economy",
      "refines": [
        "W11.REWARD.04",
        "W03.CASH.01"
      ],
      "rules": [
        {
          "id": "W12.DEMAND.01",
          "statement": "Two complete-kit briefs and two breeder briefs coexist with ordinary immediate trade.",
          "decision": "Supply a construction, a breeding contribution or surplus.",
          "observable": "A casual racer need not become a certified breeder."
        },
        {
          "id": "W12.DEMAND.02",
          "statement": "Accepting an order reserves actual buyer funds but pays no seller.",
          "decision": "Accept a feasible commitment.",
          "observable": "Escrow, current cash and hoped-for income remain distinct."
        },
        {
          "id": "W12.DEMAND.03",
          "statement": "Accepted delivery transfers all promised assets and payment together.",
          "decision": "Complete a whole-kit or pair handover.",
          "observable": "Retries cannot duplicate funds, hosts or components."
        },
        {
          "id": "W12.DEMAND.04",
          "statement": "Local deadlines are inclusive; later expiry returns unearned funds.",
          "decision": "Hand over actual stock at the counter within the displayed window.",
          "observable": "No shipping system is implied by a local due date."
        },
        {
          "id": "W12.DEMAND.05",
          "statement": "Completed repeatable briefs can offer their next bounded edition when the buyer can fund it.",
          "decision": "Produce another physical kit rather than repeat a receipt.",
          "observable": "No infinite customer or immediate income is created by renewal."
        },
        {
          "id": "W12.DEMAND.06",
          "statement": "An owner may publish an actual champion’s recorded round and request one specific showroom inquiry per meet.",
          "decision": "Translate public interest into a new product goal.",
          "observable": "An alternate host and stock must satisfy the published promise before payment."
        },
        {
          "id": "W12.DEMAND.07",
          "statement": "Champion inquiries are finite authored counter opportunities, not simulated mass popularity.",
          "decision": "Use the disclosed two-edition limit and funding.",
          "observable": "The race trophy itself neither adds a genetic bonus nor pays product income."
        },
        {
          "id": "W12.DEMAND.08",
          "statement": "Delivered sealed maker kits appear as the same assets on the main Two Nets shelf.",
          "decision": "Buy, supply or inspect actual commercial inventory.",
          "observable": "A separate maker view cannot hide a second cloned shop instance."
        },
        {
          "id": "W12.DEMAND.09",
          "statement": "Retail quotes consider already posted same-counter kit buyback prices.",
          "decision": "Pay for stock or add real production value.",
          "observable": "An unchanged newly purchased kit cannot immediately profit against a currently posted request from the same counter."
        },
        {
          "id": "W12.DEMAND.10",
          "statement": "Operating costs, capital, retained stock, gross receipts and cash changes remain distinct.",
          "decision": "Compare a completed project honestly.",
          "observable": "The tested first manufacturing route may lose cash despite a successful sale."
        },
        {
          "id": "W12.DEMAND.11",
          "statement": "Claimed line reliability is supported by observations rather than a price aura.",
          "decision": "Seek a useful customer and deliver accepted stock.",
          "observable": "A new name or qualification label does not autonomously increase every buyer’s price."
        }
      ]
    },
    {
      "name": "PRESENT / useful decisions in one hobby",
      "origin": "rrr_native_visual_and_interaction_execution",
      "refines": [
        "W07.PRESENT.02",
        "W11.PRESENT.04"
      ],
      "rules": [
        {
          "id": "W12.PRESENT.01",
          "statement": "The maker counter leads with the actual proposed animal and recognizable parts.",
          "decision": "See the product before inspecting details.",
          "observable": "The same anatomy renderer serves bench, maker and kit shelf."
        },
        {
          "id": "W12.PRESENT.02",
          "statement": "Reference construction, printed requirements, selected stock and physical tin are separate visible stages.",
          "decision": "Identify the next meaningful action.",
          "observable": "A published recipe is not styled as already-owned product inventory."
        },
        {
          "id": "W12.PRESENT.03",
          "statement": "Each rejected stock item states the relevant measurement, fit, ownership or reservation cause.",
          "decision": "Repair the correct issue.",
          "observable": "Unmeasured is not confused with genetically poor, and fitted elsewhere is not incompatible."
        },
        {
          "id": "W12.PRESENT.04",
          "statement": "Per-measurement and placement controls are optional depth with explicit keyboard-friendly inputs.",
          "decision": "Choose coarse starting promises or detailed tuning.",
          "observable": "Precision dragging and allele notation are not required to make a kit."
        },
        {
          "id": "W12.PRESENT.05",
          "statement": "Donor-route and contribution actions use the same existing project and field identities.",
          "decision": "Find the anatomy the product lacks.",
          "observable": "A range mismatch above the upper bound suggests less, not automatically more."
        },
        {
          "id": "W12.PRESENT.06",
          "statement": "Line evidence and live delivery selectors remain beside the actual customer.",
          "decision": "Inspect the evidence gap and eligible animals together.",
          "observable": "Count labels explicitly say measured broods and unmeasured descendants."
        }
      ]
    },
    {
      "name": "CONTINUITY / scoped quality and preserved history",
      "origin": "supporting",
      "refines": [
        "W11.VALIDATION.02",
        "W08.HISTORY.01"
      ],
      "rules": [
        {
          "id": "W12.CONTINUITY.01",
          "statement": "Migration appends maker state without granting player cash or rerolling stock.",
          "decision": "Continue existing saves.",
          "observable": "W11 data is preserved except declared schema/profile changes; no W10 executable migration is invented."
        },
        {
          "id": "W12.CONTINUITY.02",
          "statement": "Restore synchronizes the selected world catalogue before maker validation.",
          "decision": "Restore a legitimate alternate world.",
          "observable": "Previously viewed fixtures cannot cause stale descriptor validation failures."
        },
        {
          "id": "W12.CONTINUITY.03",
          "statement": "World backup and product export have different authority.",
          "decision": "Restore local world state explicitly or export only knowledge.",
          "observable": "Consistency checking is not secure multiplayer authority."
        },
        {
          "id": "W12.CONTINUITY.04",
          "statement": "The existing race, bench, artwork, club and circuit source bodies stay unchanged.",
          "decision": "Extend production without replacing existing racing.",
          "observable": "No movement fidelity or new tournament stage is credited to this wave."
        },
        {
          "id": "W12.CONTINUITY.05",
          "statement": "Required quality and novel-development adherence remain noncompensable gates.",
          "decision": "Assess the implemented contribution at its scope.",
          "observable": "Test count, output length and speed do not establish novelty or enjoyment."
        },
        {
          "id": "W12.CONTINUITY.06",
          "statement": "Effectiveness, creativity and scaling potential retain separate evidence states.",
          "decision": "Carry human, platform and economy gaps forward.",
          "observable": "An actual browser route does not establish world-scale performance or guaranteed profit."
        }
      ]
    }
  ],
  "customer_briefs": [
    {
      "id": "W12.ORDER.CLUB",
      "type": "kit",
      "name": "Foundry / club-entry tin",
      "buyer": "shop",
      "price": 96,
      "window": 24,
      "requiredKinds": [
        "drive",
        "pads"
      ],
      "equipment": "speedsters",
      "minMass": 0,
      "maxMass": 4,
      "limit": 2,
      "purpose": "One complete host kit with a supplied drive and contact set; no dedicated weapons. The recipient assembles it.",
      "bounds": {
        "drive": {
          "cadence": {
            "min": 9
          },
          "force": {
            "min": 1.9
          }
        },
        "pads": {
          "release": {
            "max": 0.07
          }
        }
      }
    },
    {
      "id": "W12.ORDER.HOP",
      "type": "kit",
      "name": "Two Nets / hopping project",
      "buyer": "shop",
      "price": 112,
      "window": 28,
      "requiredKinds": [
        "hopper",
        "reserve"
      ],
      "equipment": "open",
      "minMass": 0,
      "maxMass": 4,
      "limit": 2,
      "purpose": "One complete host, paired launch assembly and separately sourced supply. Useful intermediate Hoppers qualify.",
      "bounds": {
        "hopper": {
          "hopper.0": {
            "min": 0.6
          },
          "hopper.1": {
            "max": 0.08
          }
        },
        "reserve": {
          "delivery": {
            "min": 4
          }
        }
      }
    },
    {
      "id": "W12.ORDER.BREED.HOP",
      "type": "breeder",
      "name": "Cinderhouse / synchronized founders",
      "buyer": "shop",
      "price": 76,
      "window": 32,
      "kind": "hopper",
      "target": {
        "kind": "hopper",
        "trait": "phase",
        "op": "max",
        "threshold": 0.07
      },
      "minTested": 3,
      "minMatches": 2,
      "minBroods": 2,
      "limit": 1,
      "purpose": "An intact measured A/B pair descended from the recorded line. Both delivered animals meet synchronization; evidence spans two measured broods."
    },
    {
      "id": "W12.ORDER.BREED.FEET",
      "type": "breeder",
      "name": "Glassline / quick-release founders",
      "buyer": "shop",
      "price": 84,
      "window": 36,
      "kind": "stick",
      "target": {
        "kind": "stick",
        "trait": "release",
        "op": "max",
        "threshold": 0.045
      },
      "minTested": 3,
      "minMatches": 2,
      "minBroods": 2,
      "limit": 1,
      "purpose": "An intact measured A/B pair from the line. Useful release can complement a higher-purchase breeding project."
    }
  ],
  "entities": [
    {
      "id": "W12.ENTITY.RECIPE",
      "fields": [
        "id",
        "version",
        "name",
        "source",
        "host.plans",
        "host.requirements",
        "guide",
        "referenceProfile",
        "slots",
        "protocol",
        "requirementOverrides",
        "signature"
      ],
      "boundary": "Knowledge object, immutable; no inventory ownership. Requirement keys include HOST and actual S-numbered slots."
    },
    {
      "id": "W12.ENTITY.KIT",
      "fields": [
        "id",
        "type",
        "hostId",
        "recipe",
        "recipeRevision",
        "owner",
        "status",
        "items",
        "guide",
        "entry",
        "profile",
        "preparedFor",
        "created"
      ],
      "boundary": "Physical packed host and anatomy, later opened historical receipt. Proposed entry is not an actual race result."
    },
    {
      "id": "W12.ENTITY.ORDER",
      "fields": [
        "id",
        "type",
        "buyer",
        "purpose",
        "price",
        "window",
        "state",
        "escrow",
        "edition",
        "limit",
        "deadline",
        "deliveries",
        "requiredKinds_or_target"
      ],
      "boundary": "Buyer terms stay fixed. Receipt is earned only on accepted actual stock."
    },
    {
      "id": "W12.ENTITY.CLAIM",
      "fields": [
        "lineId",
        "target",
        "tested",
        "matching",
        "broods",
        "unmeasured",
        "rows",
        "limit"
      ],
      "boundary": "Frozen selected-sample evidence; not statistical future guarantee or new specimen ownership."
    },
    {
      "id": "W12.ENTITY.PUBLICATION",
      "fields": [
        "id",
        "recipeId",
        "meet",
        "round",
        "hostId",
        "champion",
        "build"
      ],
      "boundary": "Owner-selected actual history; one specific inquiry per meet. No invented earlier or future race."
    },
    {
      "id": "W12.ENTITY.RECEIPT",
      "fields": [
        "id",
        "orderId",
        "edition",
        "tick",
        "assets",
        "paid",
        "claim"
      ],
      "boundary": "One delivery edition, one payment and exact transferred assets; no replay renewal."
    }
  ],
  "world_threads": [
    {
      "id": "W12.THREAD.WINNER_TO_TIN",
      "institution": "VENUE_FOUNDRY",
      "path": [
        "actual frozen club-round build",
        "owner-approved recipe",
        "separate host and real qualifying stock",
        "personal packing",
        "funded delivery",
        "same kit on shop shelf"
      ],
      "value": "Sporting achievement provides a recognizable reference and bounded product opportunity, not a duplicate winning roach.",
      "runtime": "Implemented including actual competition-to-sale browser route."
    },
    {
      "id": "W12.THREAD.TWO_NETS",
      "institution": "SHOP_TWO_NETS",
      "path": [
        "published component promises",
        "ordinary and selected brood output",
        "actual host and preparations",
        "funded kit handover",
        "retail quote",
        "open guide",
        "recipient fitting and race"
      ],
      "value": "The Wrangloid buys useful player work and sells a real kit that another hobbyist can build.",
      "runtime": "Implemented local transactions and recipient controls; NPC retail uptake not simulated."
    },
    {
      "id": "W12.THREAD.CINDER",
      "institution": "ORG_CINDER",
      "path": [
        "missing synchronization contribution",
        "existing hopper habitat or founder stock",
        "several observed broods",
        "specific measured descendant A/B pair",
        "bounded evidence claim",
        "funded living-stock sale"
      ],
      "value": "Breeding expertise has a separate product from extracted racing anatomy.",
      "runtime": "Implemented through Two Nets delegated buyer wallet."
    },
    {
      "id": "W12.THREAD.CONTACT",
      "institution": "SHOP_TWO_NETS",
      "path": [
        "quick-release foot requirement",
        "Glazed Overgrowth",
        "Glassfoot selection and compatible line",
        "running pads or alternative brake preparation",
        "kit or living founder commission"
      ],
      "value": "The same inherited material can serve racing construction and a customer’s future breeding project.",
      "runtime": "Existing source/preparation paths and new stock/claim matching; not a new insect or mutation system."
    },
    {
      "id": "W12.THREAD.BENCHLINE",
      "institution": "MEDIA_BENCHLINE",
      "path": [
        "permitted actual result",
        "frozen public build",
        "bounded product inquiry",
        "observed delivered kit"
      ],
      "value": "Public construction information has a useful commercial follow-through without claiming genetics caused a win.",
      "runtime": "Owner publication and authored showroom request; no automatic regional news diffusion."
    }
  ],
  "repairs": [
    {
      "id": "W12.REPAIR.01",
      "before": "Mole mechanical advantage was labeled globally higher-better.",
      "after": "The catalogue marks a target range; maker matching gives the appropriate missing direction only outside the operating band.",
      "enables": "Gear selection stays about useful delivery rather than a false tier ladder."
    },
    {
      "id": "W12.REPAIR.02",
      "before": "One generic tolerance encouraged treating unrelated promises alike.",
      "after": "Explicit min/max requirements per measured native or prepared property; known axes, domain and source coverage validated.",
      "enables": "Quick release and sufficient loose-ground purchase can be specified independently."
    },
    {
      "id": "W12.REPAIR.03",
      "before": "Legacy component records omit fields that their compiler still uses.",
      "after": "Published observations include the exact declared legacy defaults without altering race code or claiming a new assay.",
      "enables": "Old earned components can be honest recipe references."
    },
    {
      "id": "W12.REPAIR.04",
      "before": "A previously opened supplier-kit record required its host to remain registered indefinitely.",
      "after": "Opened receipts retain history but do not enforce old ownership or permit reopening.",
      "enables": "A real host can participate in later legitimate manufacturing and resale."
    },
    {
      "id": "W12.REPAIR.05",
      "before": "A restore could validate maker parts against stale global descriptors from a different viewed world.",
      "after": "Synchronize validated current-world component descriptors before maker checks.",
      "enables": "Full local backup works across old and new production state."
    },
    {
      "id": "W12.REPAIR.06",
      "before": "A maker-specific sold product could be absent from the main Wrangloid shelf.",
      "after": "The same identified packed host and contents appear once at Two Nets.",
      "enables": "Production reconnects to the customer’s existing shop and workbench."
    },
    {
      "id": "W12.REPAIR.07",
      "before": "A fixed resale quote could fall below an already-posted same-counter purchase order.",
      "after": "A public quote covers eligible current kit-order buyback plus the declared 24-credit margin.",
      "enables": "Production value rather than unchanged circular trading supports the livelihood."
    },
    {
      "id": "W12.REPAIR.08",
      "before": "Line sample labels could blur all offspring with measured offspring.",
      "after": "Measured descendants, target matches, distinct measured broods and unknown descendants are explicit.",
      "enables": "A narrow evidence-backed breeder sale does not imply guaranteed future quality."
    }
  ],
  "limits": [
    "Maker code is a new reconstruction on recovered Wave11, not the missing Wave10 executable. Its written handoff remains in history.",
    "No new donor form, mutation, linkage, inherited appearance or full reproductive simulation is added. Existing thirteen-form authored quantitative profiles supply products.",
    "Product recipes retain one reference body plan, explicit native promises and fixed reference setup. Alternate-host-plan adaptation, formal revision series and user-selectable arbitrary substitution groups remain open.",
    "Prototype margins are 0/10/15/25 percent starting conveniences; individual measured bounds override them. They are neither calibrated manufacturing tolerances nor statistical confidence.",
    "The historical HOST remains on its nontransferable starter cradle. Pack another owned mature host; a parked registered host must first be native-only and free of prepared drafts.",
    "No generic sale of a currently assembled active racer. This release sells packed build-it-yourself kits and specific living breeder pairs.",
    "Four finite named briefs share the actual Two Nets wallet; institutional names describe authored customer purposes rather than fully independent national accounts. Owner-approved champion inquiries are bounded authored opportunities, not autonomous information diffusion.",
    "All deliveries are local counter transfers. Prepared-stock decay, shipping, temperature-chain logistics, general injury, aging and regrowth remain unchanged or open.",
    "Packed care uses the current simplified holding/upkeep branch. A paid receipt is not proof of balanced prices, sustainable demand or affordable growth.",
    "The first complete browser manufacturing project loses cash after its win; retained breeders, samples and reference racer are assets, not sale revenue. Comparative multi-cohort careers require further calibration.",
    "The two-roach race operators and club structure are unchanged. Hopper timing, articulated motion, true multi-roach physics, Flyer routes, Factionals and World City remain open.",
    "Recipient construction is exercised by buying back the same kit through actual controls. Autonomous NPC assembly, racing with purchased maker stock and individual customer AI are not implemented.",
    "Local product export has no importer in this wave. Whole-world restore is consistency checked, user editable, and not competitive server authority.",
    "The shared global catalogue serves one active local world. No multi-world service or large-world benchmark is established.",
    "Browser verification used exact HTML set_content after native file navigation was blocked. Native Windows/macOS origin persistence, physical touch, human usability, engagement and retention remain unverified."
  ],
  "evidence": {
    "new_operators": "evidence/maker_report.json",
    "migration": "evidence/migration_report.json",
    "browser": "evidence/browser_maker_report.json",
    "recipient_browser": "evidence/browser_retail_report.json",
    "summary": "evidence/validation_report.json",
    "scope": "Measured test results are regenerated independently of this source specification. Browser routes use ordinary funds and actual controls; nonbrowser fixtures disclose synthetic working capital."
  }
}
