{
  "manifest": {
    "id": "W08",
    "version": "0.8.0",
    "title": "RRR — The Living Stable",
    "date": "2026-09-10",
    "status": "revisable_foundations_and_interactive_local_prototype",
    "extends": "world_context_v0.7.json",
    "base_sha256": "aa7d48b0ee02b5294a3e8bf66e5d252ebbdfabfab419ebc6b369fe13a3b6098c",
    "serialization": "Strict JSON in .spec: RRR exchange format; not an asserted canonical private MIVIM grammar."
  },
  "Reference": {
    "sources": [
      {
        "id": "W08.S01",
        "title": "Tamiya — Mini 4WD Chassis and Compatible Parts",
        "url": "https://www.tamiya.com/english/cms/mini4wd_chassis_select.html",
        "checked_on": "2026-09-10",
        "scope": "Different layouts, geometry, native features and component compatibility support different car foundations.",
        "limit": "Physical Mini 4WD reference, not evidence that every PCR videogame body has these properties. RRR profile values are authored."
      },
      {
        "id": "W08.S02",
        "title": "Tamiya — FM-A Balanced Starter Pack, 18710",
        "url": "https://www.tamiya.com/english/products/18710/index.html",
        "checked_on": "2026-09-10",
        "scope": "A complete assembly kit and selected upgrade parts provide a coordinated first project.",
        "limit": "A living host and biological parts are RRR extensions. The reference supplies no genetic or economic coefficients."
      },
      {
        "id": "W08.S03",
        "title": "Tamiya — Mini 4WD Setup Guide",
        "url": "https://www.tamiya.com/english/mini4wd/setupguide/setupguide.htm",
        "checked_on": "2026-09-10",
        "scope": "Separate motor, gearing, contact, assembly and handling choices.",
        "limit": "Do not transfer fixed-wheel behavior literally into walking anatomy; no source item-grade algorithm is claimed."
      }
    ],
    "primary_previous_task": "W08.T01 from Wave07 next queue",
    "scope": "Body/chassis function from the source hobby, host biology as RRR extension; preserve the earlier eight component families.",
    "original_premises": "Speed, racing victory, kit assembly, collection, any-person capture/breeding, Wrangloid trade and optional livelihoods; Open/Flyer/Speedster/Fireworks boundaries unchanged."
  },
  "Plan": {
    "carried_commitments": [
      {
        "id": "W08.T01",
        "priority": "P0",
        "title": "Complete the body/host layer and calibrated multi-family component catalogue",
        "acceptance": "At least several selectable host bodyforms with distinct geometry and native anatomy, purchasable full kits, source-traceable component grades and comparable test protocols. No arbitrary host-stat aura. Do not reset existing stock.",
        "current_scope_status": "implemented at local host/kit/qualification scope; comprehensive progression calibration remains open"
      },
      {
        "id": "W08.T02",
        "priority": "P0",
        "title": "Expand breeding evidence and earned market progression",
        "acceptance": "Longitudinal brood records, project-specific contribution guidance for every form, measured product qualification, repeat customer demand driven by delivered stock and public racing. Use enough seeds and actual play sessions to calibrate livelihood pacing.",
        "current_scope_status": "public contribution guidance and observed line records implemented; autonomous repeat demand and human pacing remain open"
      },
      {
        "id": "W08.T03",
        "priority": "P1",
        "title": "Complete missing track and physical-hobby functions",
        "acceptance": "Editable modular layouts, explicit braking and rail-guide families, richer airborne and contact interaction. Current bump seams are not a complete suspension model; flyers need real aerial paths, not a ground reskin.",
        "current_scope_status": "carried to W09.T01; editable track and brake/rail families not implemented here"
      },
      {
        "id": "W08.T04",
        "priority": "P1",
        "title": "Viable storage, movement and commercial breadth",
        "acceptance": "Prepared-stock condition and actual shipping windows; more anatomical motion and ownership-preserving kit substitution. Species appearance inheritance and named lineage branding need real records; no hidden survival oracle.",
        "current_scope_status": "only body/kit presentation developed; storage, shipping, appearance inheritance and general substitution remain open"
      }
    ],
    "tasks": [
      {
        "id": "W08.T01.REVIEW",
        "priority": "P0",
        "title": "Audit the missing body layer and preserve the W07 world",
        "depends_on": [],
        "role": "supporting",
        "status": "spec_and_preservation_checks",
        "acceptance": "Keep original HOST, H-6, stock, cash, old waves and recorded results; trace physical-hobby and PCR functions separately."
      },
      {
        "id": "W08.T01.HOSTS",
        "priority": "P0",
        "title": "Add native body profiles and a multi-host stable",
        "depends_on": [
          "W08.T01.REVIEW"
        ],
        "role": "novel_integration",
        "status": "implemented_model_and_browser",
        "acceptance": "Three body plans affect native geometry, mass, stride and support; each has separate drafts and fitted tissue."
      },
      {
        "id": "W08.T01.KITS",
        "priority": "P0",
        "title": "Supply complete living-host kits at Two Nets",
        "depends_on": [
          "W08.T01.HOSTS"
        ],
        "role": "novel_integration",
        "status": "implemented_model_and_browser",
        "acceptance": "Buy identified host and real contents; open, draft, personally fit, and race without duplicating the old roach."
      },
      {
        "id": "W08.T01.HEREDITY",
        "priority": "P0",
        "title": "Breed or catch a whole host and commission it as a racer",
        "depends_on": [
          "W08.T01.HOSTS"
        ],
        "role": "novel_integration",
        "status": "implemented_bounded_reproductive_profile",
        "acceptance": "Actual offspring or capture becomes the same racer identity. Native heredity does not copy acquired grafts."
      },
      {
        "id": "W08.T02.LINES",
        "priority": "P0",
        "title": "Record project contributions and observed named-line outcomes",
        "depends_on": [
          "W08.T01.HEREDITY"
        ],
        "role": "novel_integration",
        "status": "implemented_public_evidence_projection",
        "acceptance": "Every current donor form supports an explicit target; untested descendants and unobserved brood survival remain unknown."
      },
      {
        "id": "W08.T01.QUALIFY",
        "priority": "P1",
        "title": "Introduce family-specific measured component qualification",
        "depends_on": [
          "W08.T01.REVIEW"
        ],
        "role": "design_and_runtime",
        "status": "implemented_twelve_profiles",
        "acceptance": "All required measurements satisfy a named profile; geometry choices remain specifications and no grade modifies stats or price."
      },
      {
        "id": "W08.T01.RACING",
        "priority": "P0",
        "title": "Preserve race, custody and mass correctness across body changes",
        "depends_on": [
          "W08.T01.HOSTS",
          "W08.T01.KITS"
        ],
        "role": "experimental_and_supporting",
        "status": "implemented_and_controlled_comparisons",
        "acceptance": "One component stays on one host; native fuel mass is accounted for; a wider kit can complete a course without a stationary lateral lock."
      },
      {
        "id": "W08.T01.PRESENT",
        "priority": "P1",
        "title": "Render host recognition, complete tins and lineage evidence",
        "depends_on": [
          "W08.T01.KITS",
          "W08.T02.LINES",
          "W08.T01.QUALIFY"
        ],
        "role": "visual_execution",
        "status": "rendered_and_browser_exercised",
        "acceptance": "Same body plan is recognizable in shop, bench, stable and race. Narrow layout retains controls; no human usability claim."
      },
      {
        "id": "W08.CLOSE",
        "priority": "P0",
        "title": "Validate migration, archive and next-wave handoff",
        "depends_on": [
          "W08.T01.REVIEW",
          "W08.T01.HOSTS",
          "W08.T01.KITS",
          "W08.T01.HEREDITY",
          "W08.T02.LINES",
          "W08.T01.QUALIFY",
          "W08.T01.RACING",
          "W08.T01.PRESENT"
        ],
        "role": "supporting",
        "status": "automated_and_scoped_review",
        "acceptance": "Separate new tests, legacy comparisons, preserved-release regression, browser evidence and unverified gameplay claims."
      }
    ],
    "next": [
      {
        "id": "W09.T01",
        "priority": "P0",
        "title": "Editable modular circuits with purposeful approach braking and rail-guide anatomy",
        "acceptance": "Construct validated connected layouts from owned sections; publish course versions; add brake and rail-guide donor/preparation/fitting behaviors where the course makes them useful. Preserve finish-first racing, real energy, host geometry and current stable."
      },
      {
        "id": "W09.T02",
        "priority": "P0",
        "title": "Player-built complete kits and evidence-backed breeding commissions",
        "acceptance": "Package and sell actual owned host/component configurations with appropriate care/custody; distinct breeder orders use observed line evidence and actual funded demand. Preserve easy ordinary trade; no synthetic reputation-to-money aura."
      },
      {
        "id": "W09.T03",
        "priority": "P1",
        "title": "Broader trait distributions and measured progression calibration",
        "acceptance": "Evaluate useful intermediate grades, several bodyforms and same-condition product improvements over enough seeded populations. Keep genetics, condition, preparation and sampling bias separate. Human participation needed before engagement claims."
      },
      {
        "id": "W09.T04",
        "priority": "P1",
        "title": "Viable storage, stage-specific donors and motion fidelity",
        "acceptance": "Extend Clockleaf or aquatic-stage supply and actual storage/arrival windows; improve leg loading/recovery and preserved source markings without replacing existing native/graft state. Do not close world-wide death/regrowth by assumption."
      }
    ]
  },
  "Workflow": [
    "review actual W07 queue and files",
    "extend native body and custody model",
    "integrate real complete kits and host reproduction",
    "add evidence-bound projects and qualifications",
    "render in existing application",
    "adversarial and matched model comparisons",
    "actual browser flows and image review",
    "preserve baseline, validate and verify archive"
  ],
  "Adherence": {
    "authority": "User premises govern; generated body, grade and reproductive profiles remain proposals.",
    "non_goals": [
      "new fixed race-power score",
      "story replacing atomic mechanics",
      "hidden grade multiplier",
      "fabricated generic MIVIM grade",
      "claim of human engagement from unit tests"
    ],
    "preservation": "All prior non-manifest context and prior waves are unchanged; original stock and game interfaces continue."
  },
  "rules": [
    {
      "id": "W08.REFERENCE.01",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "Body selection is a distinct remaining reference function, not another name for the replaceable frame.",
      "decision": "Choose the living foundation before selecting grafts.",
      "observable": "Native body and supporting frame remain different objects.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.REFERENCE.02",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "Physical chassis evidence informs geometry and fitting; it does not establish undocumented PCR videogame coefficients.",
      "decision": "Use the relevant source layer.",
      "observable": "Every numerical RRR body profile is labeled authored and normalized.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.REFERENCE.03",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "Complete kits contain the foundation as well as selected components; conversion tins do not.",
      "decision": "Buy a new racer project or modify an existing one.",
      "observable": "The shop names whether a living host is included.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.REFERENCE.04",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "Speed, winning, personally assembled kits, collecting and optional livelihoods remain simultaneous objectives.",
      "decision": "Catch, breed, purchase or build through the path of interest.",
      "observable": "A roach bought at the shop is not intrinsically inferior to an equivalent bred animal.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.REFERENCE.05",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "No new species ban, universal slot cap, point budget or player-rank gene lock is introduced by these starter profiles.",
      "decision": "Solve actual fit or choose the appropriate event.",
      "observable": "Broader integration remains open beyond the current local interfaces.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.REFERENCE.06",
      "category": "REFERENCE",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.REFERENCE.01",
        "W07.REFERENCE.06"
      ],
      "statement": "MIVIM assesses quality and novel-development adherence as hard gates, with effectiveness, creativity and scaling assessed separately.",
      "decision": "Keep evidence scoped.",
      "observable": "Counts, speed or vocabulary cannot replace an achieved design contribution.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.01",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "A registered racer is the original whole specimen, not a second animal manufactured by registration.",
      "decision": "Commission an owned mature whole roach.",
      "observable": "Specimen, stable and race reference the same identity.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.02",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Lowline, Needleback and Broadback are body plans within one reproductive roach form in this branch.",
      "decision": "Select geometry rather than a rarity caste.",
      "observable": "Cross-plan mating uses the same declared reproductive eligibility.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.03",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Native mass, envelope, stride, drive, reserve and support are explicit body parameters.",
      "decision": "Choose a foundation for a construction.",
      "observable": "The body affects actual compiled inputs instead of a hidden performance aura.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.04",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Three inherited multipliers modify native mass, stride and support independently.",
      "decision": "Select the contribution needed in host stock.",
      "observable": "An inherited improvement need not receive a compulsory invented drawback.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.05",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Native anatomy supplies every essential role not replaced by a prepared sect.",
      "decision": "Race a native host or progressively customize it.",
      "observable": "Opening a kit does not require replacing every organ before the animal functions.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.06",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "The native body model is separate from protected carapace and installed thoracic bracing.",
      "decision": "Tune support and protection through their own anatomy.",
      "observable": "A broad body does not grant invisible heavy armor.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.07",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Body proportions constrain supported root regions; prepared sect dimensions do not scale automatically to fill a host.",
      "decision": "Reposition, rotate, select or reprepare an incompatible component.",
      "observable": "A root can fit Broadback and not Needleback without a species blacklist.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.08",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Host profile mass includes the declared native reserve state; selected fill is subtracted and added consistently.",
      "decision": "Fit a different reservoir and select fill.",
      "observable": "Additional energy mass cannot disappear because the reservoir was replaced.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.09",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Registration includes a native sizing observation in this workshop profile, without changing inheritance.",
      "decision": "Commission and inspect actual measurements.",
      "observable": "Prior unknown stock is not silently enhanced by its new name.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HOST.10",
      "category": "HOST",
      "origin": "source_hobby_translation_and_rrr_biology",
      "refines": [
        "W05.BENCH.09",
        "W07.REFERENCE.06"
      ],
      "statement": "Registered racers are protected from ordinary donor liquidation; complete racer selling is a later distinct transaction.",
      "decision": "Retain a personal stable or sell uncommissioned stock.",
      "observable": "Releasing a founder flag cannot accidentally sell an assembled named racer.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.01",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "There is one active workbench and one persisted bench state per inactive registered host.",
      "decision": "Select a different racer.",
      "observable": "The old host keeps its fitted design, draft, finish and sheets.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.02",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "Selecting a bench changes attention, not anatomy or elapsed time.",
      "decision": "Compare owned hosts without repeatedly dismantling them.",
      "observable": "Custody and care do not change merely from selecting a card.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.03",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "Installed and draft-reserved components on inactive hosts are unavailable to the active host.",
      "decision": "Release a plan or physically unfit before sharing stock.",
      "observable": "A single drive cannot power two roaches at once.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.04",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "A removal in a draft does not release the actual fitted component until commitment.",
      "decision": "Review before dismantling.",
      "observable": "Parked draft changes cannot create loose copies.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.05",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "A failed fitting or host operation leaves all affected identities, ownership and funds unchanged.",
      "decision": "Correct the actual error then retry.",
      "observable": "No half-transferred kit or duplicate tissue is left behind.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.06",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "Registered hosts remain living care obligations; the historical HOST retains its disclosed dedicated-cradle accounting.",
      "decision": "Budget for a growing stable.",
      "observable": "Migration does not double-charge the old host, while extra racers are not costless inventory.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.07",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "A host occupied by the current reproductive attempt cannot simultaneously be fitted or attend a race.",
      "decision": "Use another roach or wait until the reservation ends.",
      "observable": "Breeding and racing share one animal rather than copies.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.STABLE.08",
      "category": "STABLE",
      "origin": "rrr_native_inventory_integration",
      "refines": [
        "W05.BENCH.01",
        "W06.STOCK.07"
      ],
      "statement": "Frozen race records preserve the actual entered host profile and configuration.",
      "decision": "Modify a different or the same racer later.",
      "observable": "Old appearance, component identity and results do not follow current edits.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.01",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "A complete tin owns actual custody of one whole host and its listed component instances.",
      "decision": "Buy a complete build project.",
      "observable": "The foundation is included explicitly and cannot also be listed as loose stock.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.02",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Purchase transfers the complete packed inventory and money once.",
      "decision": "Commit a specific finite offer.",
      "observable": "Refresh or transaction retry creates no second host.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.03",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Opening registers the included host and releases the included sects without equipping them.",
      "decision": "Begin personal assembly.",
      "observable": "The roach begins with its native anatomy, not an instant finished premium build.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.04",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "An optional illustrated recipe fills a valid draft on its included host.",
      "decision": "Follow the kit guide or depart from it.",
      "observable": "The user must still commit the assembly; unrelated draft work is not silently discarded.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.05",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Opening one kit does not disassemble or overwrite a previously owned racer.",
      "decision": "Keep several complete projects.",
      "observable": "The original host and its H-6 assembly remain where they were.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.06",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Kit value derives from selected complementary stock, preparation, living foundation and guidance.",
      "decision": "Compare useful contents and total price.",
      "observable": "No set multiplier or bonus genome is added.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.07",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Third Friend uses different donors for its full reservoir and rebound organ.",
      "decision": "Supply each function with real tissue.",
      "observable": "The same fatbody is not spent twice.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.KIT.08",
      "category": "KIT",
      "origin": "source_hobby_translation",
      "refines": [
        "W07.SHOP.03",
        "W05.RECIPE.04"
      ],
      "statement": "Complete kits and body stock in this release are finite supplier endowments, not earned player rewards or autonomous factory output.",
      "decision": "Purchase, catch or breed further stock.",
      "observable": "The prototype does not credit unimplemented retail replenishment or player-kit manufacturing.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.01",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "Whole-host capture uses a bounded service-gallery population with visible body plans and initially unmeasured inherited properties.",
      "decision": "Search for a living foundation or unrelated founder.",
      "observable": "Catching does not grant a perfect profile or require championship rank.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.02",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "The current roach profile uses four initiated places, a nymph transition and adult maturity in the dry nursery.",
      "decision": "Reserve room and care before breeding.",
      "observable": "Actual offspring appear through the existing world clock.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.03",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "An offspring receives one parental body plan and one allele from each parent at each of three independent quantitative loci.",
      "decision": "Combine native contributions across plans.",
      "observable": "This is a discrete plan choice, not an implemented continuously blended morphology.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.04",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "Installed grafts, paint, number, tuning and earned results are not inherited by the offspring.",
      "decision": "Breed hosts and donor lines for different purposes.",
      "observable": "A child of a fitted racer does not spawn its parents’ paid components.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.05",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "Protected replacements and brood uncertainty retain the earlier production rules.",
      "decision": "Retain breeders, inspect children or use ordinary output policy.",
      "observable": "No surviving compatible pair or exceptional child is promised.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.06",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "An adult offspring may be registered as a personal racer with an empty prepared-part arrangement.",
      "decision": "Use the child as stock or begin a new kit project.",
      "observable": "Its actual ancestry and body profile follow it onto the bench.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.07",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "The same host observation feeds selection, native compilation and historical entry data.",
      "decision": "Assay or commission before making a specific claim.",
      "observable": "The body trait does not become an unrelated race-power number.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.BREED.08",
      "category": "BREED",
      "origin": "rrr_native_progression",
      "refines": [
        "W07.BREED.03",
        "W03.BREED.04"
      ],
      "statement": "Genetic inputs and brood outcomes remain stable under inspection, selling, renaming, save/restore and equivalent clock advances.",
      "decision": "Continue a project across sessions.",
      "observable": "Repeated views do not generate another genetic opportunity.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.01",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "All eleven current reproductive forms support an explicit selectable property, direction and bounded target.",
      "decision": "Name the missing contribution or a product objective.",
      "observable": "A generic keep-the-rarest rule does not replace purposeful selection.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.02",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Guidance uses known measurements and the selected project, never hidden genetics.",
      "decision": "Inspect a promising animal or retain it provisionally.",
      "observable": "Same public evidence produces the same advice.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.03",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "A complementary breeder can fail the finished-product goal and still matter to the line.",
      "decision": "Retain synchronization in an otherwise weak hopper.",
      "observable": "Immediate racing value and reproductive contribution remain distinct.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.04",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "A named line records a compatible founder pair and a fixed target at creation.",
      "decision": "Create a recognizable breeding project.",
      "observable": "Naming protects its founders but awards neither stats nor cash.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.05",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Line reports count reproductive attempts, observed descendants, tested descendants, matches and distinct tested broods separately.",
      "decision": "Evaluate what has actually been observed.",
      "observable": "Untested animals are not represented as failures or successes.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.06",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Unopened brood survival and future genetic outcomes are absent from public line reports.",
      "decision": "Plan with disclosed uncertainty.",
      "observable": "A table cannot reveal which young will survive before observation.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.07",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Historically measured sold or prepared descendants remain part of the evidence with their custody kept separate.",
      "decision": "Review a line after selling useful output.",
      "observable": "Evidence preservation does not restore ownership.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.08",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Selected observations are not an unbiased population-yield estimate or a race-winning guarantee.",
      "decision": "Publish a narrow count-based claim.",
      "observable": "One measured success with untested siblings is displayed exactly that way.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.LINE.09",
      "category": "LINE",
      "origin": "rrr_native_evidence_and_hobby_identity",
      "refines": [
        "W03.BREED.07",
        "W03.INTAKE.02"
      ],
      "statement": "Line targets are records rather than global mutable preferences.",
      "decision": "Begin a revised project explicitly.",
      "observable": "Changing the current intake target does not rewrite the old line’s evidence question.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.01",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "Twelve preparation-specific profiles define component qualification using named measured axes and a versioned protocol.",
      "decision": "Compare stock within its relevant product purpose.",
      "observable": "Different components are not flattened into one overall power number.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.02",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "A band requires all its stated criteria; one exceptional axis cannot compensate for a failed required axis.",
      "decision": "Inspect the limiting contribution.",
      "observable": "The label is a conjunction, not a disguised weighted score.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.03",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "Hobby, Club, Circuit, Premier and Apex are authored qualification bands, not PCR’s undisclosed formulas or MIVIM grades.",
      "decision": "Read the declared profile.",
      "observable": "The source game is not credited with invented numeric thresholds.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.04",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "Missing evidence and values below the profile baseline remain unqualified.",
      "decision": "Acquire suitable measurements or use a different profile.",
      "observable": "Unknown is not zero, maximum or automatic Hobby acceptance.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.05",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "Pure geometry choices remain specifications where a universal better direction would be misleading.",
      "decision": "Choose Lowstep ratio, horn reach or brace width for the intended assembly.",
      "observable": "A longer lever is not assigned a higher tier merely because it is longer.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.06",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "Qualification displays neither mutate race inputs nor raise actual buyer payments.",
      "decision": "Use the label as a readable summary.",
      "observable": "Customers still accept their own specifications; rarity, price and breeding value remain separate.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.QUALIFY.07",
      "category": "QUALIFY",
      "origin": "rrr_native_translation_of_component_quality",
      "refines": [
        "W07.REFERENCE.04",
        "W07.REFERENCE.05"
      ],
      "statement": "The discrete current genomes may leave some display bands sparsely populated or empty.",
      "decision": "Calibrate distributions and profiles later.",
      "observable": "Five labels do not establish five well-balanced progression tiers.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.01",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "The same native profile and installed component observations compile into the existing ground race model.",
      "decision": "Enter a changed body or fitted set.",
      "observable": "No unrelated score determines completion.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.02",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "Passing separation uses wrapped course proximity rather than absolute lap difference.",
      "decision": "Complete an overtake even around lapped traffic.",
      "observable": "A prior lap cannot leave a permanent unfinished passing target.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.03",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "Body-profile runners can request lateral movement from rest, bounded by the same available powered motion budget.",
      "decision": "Clear a stopped side-by-side encounter.",
      "observable": "Wider bodies do not deadlock because their old forward speed is zero; lateral motion is not free teleportation.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.04",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "The six unchanged raw historical experiments retain their numerical and event comparisons.",
      "decision": "Add a forward body branch without rewriting saved runs.",
      "observable": "Preserved parity does not mean race.js is byte-identical or full physics is validated.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.05",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "Body comparisons identify all changed inputs; component comparisons fix the host and other conditions.",
      "decision": "Interpret time differences honestly.",
      "observable": "A whole-body comparison is not advertised as an isolated gene result.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.RACE.06",
      "category": "RACE",
      "origin": "rrr_native_motion_repair",
      "refines": [
        "W05.RACE.02",
        "W07.PART.12"
      ],
      "statement": "Replay and historical inspection remain free of world-time or money settlement.",
      "decision": "Watch and compare repeatedly.",
      "observable": "A roster of racers does not multiply attendance or prizes.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.PRESENT.01",
      "category": "PRESENT",
      "origin": "rrr_native_visual_execution",
      "refines": [
        "W07.PRESENT.01",
        "W05.POLISH.03"
      ],
      "statement": "Visible native body plans retain distinctive proportions in live stock, kit lids, bench, stable and race records.",
      "decision": "Recognize the actual living foundation.",
      "observable": "Three plans are not three names above an identical silhouette.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.PRESENT.02",
      "category": "PRESENT",
      "origin": "rrr_native_visual_execution",
      "refines": [
        "W07.PRESENT.01",
        "W05.POLISH.03"
      ],
      "statement": "Native anatomy scales with the body while prepared grafts retain their own drawing and fitting dimensions.",
      "decision": "Judge construction space and mounted components together.",
      "observable": "Growing a host does not secretly resize bought hardware-like anatomy.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.PRESENT.03",
      "category": "PRESENT",
      "origin": "rrr_native_visual_execution",
      "refines": [
        "W07.PRESENT.01",
        "W05.POLISH.03"
      ],
      "statement": "The stable has a clear active-host selector, per-host actions and preserved draft state.",
      "decision": "Switch projects without losing work.",
      "observable": "Casual use does not require reading ancestry tables or manually exporting every build.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.PRESENT.04",
      "category": "PRESENT",
      "origin": "rrr_native_visual_execution",
      "refines": [
        "W07.PRESENT.01",
        "W05.POLISH.03"
      ],
      "statement": "Line evidence, traits and qualification expand beside the same specimen or component.",
      "decision": "Choose depth when useful.",
      "observable": "Expert records do not become a disconnected administrative application.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.PRESENT.05",
      "category": "PRESENT",
      "origin": "rrr_native_visual_execution",
      "refines": [
        "W07.PRESENT.01",
        "W05.POLISH.03"
      ],
      "statement": "Narrow layouts preserve explicit buy, open, guide, fit, race and register controls.",
      "decision": "Use tap-friendly controls instead of precision dragging.",
      "observable": "Physical touch and human testing still require separate evidence.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HISTORY.01",
      "category": "HISTORY",
      "origin": "supporting",
      "refines": [
        "W07.EVIDENCE.01",
        "W07.EVIDENCE.05"
      ],
      "statement": "Migration preserves old cash, specimen records, prepared parts, draft/fitted arrangements and historical results.",
      "decision": "Continue a W07 save.",
      "observable": "New supplier stock and the native HOST record are disclosed additions, not new earned player funds.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HISTORY.02",
      "category": "HISTORY",
      "origin": "supporting",
      "refines": [
        "W07.EVIDENCE.01",
        "W07.EVIDENCE.05"
      ],
      "statement": "World backup contains all registered hosts, their separate builds, selected project and named lines.",
      "decision": "Restore the same local world.",
      "observable": "A corrupt native profile, duplicate custody or invalid inherited plan is rejected.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HISTORY.03",
      "category": "HISTORY",
      "origin": "supporting",
      "refines": [
        "W07.EVIDENCE.01",
        "W07.EVIDENCE.05"
      ],
      "statement": "Personal sheets target a specific host and existing components.",
      "decision": "Keep or share a design without creating stock.",
      "observable": "A sheet for a different host requests a deliberate adaptation instead of changing anatomy implicitly.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HISTORY.04",
      "category": "HISTORY",
      "origin": "supporting",
      "refines": [
        "W07.EVIDENCE.01",
        "W07.EVIDENCE.05"
      ],
      "statement": "The cumulative context appends W08 while retaining every prior non-manifest field and wave.",
      "decision": "Use new rules with preserved history.",
      "observable": "The byte-preserved baseline and manifest make the update auditable.",
      "status": "revisable_implemented_profile"
    },
    {
      "id": "W08.HISTORY.05",
      "category": "HISTORY",
      "origin": "supporting",
      "refines": [
        "W07.EVIDENCE.01",
        "W07.EVIDENCE.05"
      ],
      "statement": "Rendered review, model correctness, native-platform behavior, human enjoyment and world-scale calibration remain separate evidence states.",
      "decision": "Keep unmet acceptance work in the queue.",
      "observable": "No passing test count is a final innovation or retention grade.",
      "status": "revisable_implemented_profile"
    }
  ],
  "profiles": {
    "hostPlans": {
      "lowline": {
        "name": "Gutterbred Lowline",
        "subtitle": "The familiar club foundation",
        "mass": 1.6,
        "width": 0.38,
        "length": 0.62,
        "height": 0.26,
        "stride": 0.25,
        "cadence": 10,
        "force": 2,
        "reserve": 120,
        "delivery": 3,
        "support": 1.92,
        "scaleX": 1,
        "scaleY": 1,
        "colour": "vermilion",
        "source": "Warm service galleries",
        "signs": "Flattened shed plates; low running posture and intact native joints.",
        "use": "Balanced native anatomy; familiar root spacing for club kits.",
        "select": "Select lower structural mass, useful native stride or supporting tissue. Graft performance remains a separate donor project."
      },
      "needleback": {
        "name": "Needleback",
        "subtitle": "A slender, long-striding foundation",
        "mass": 1.38,
        "width": 0.33,
        "length": 0.68,
        "height": 0.24,
        "stride": 0.27,
        "cadence": 10,
        "force": 1.9,
        "reserve": 110,
        "delivery": 3,
        "support": 1.56,
        "scaleX": 0.868421052631579,
        "scaleY": 1.0967741935483872,
        "colour": "ivory",
        "source": "Slab-edge service cracks",
        "signs": "Narrow tapered molts; long clean steps through close seams.",
        "use": "Slender passing profile and long native stride; less width for graft roots.",
        "select": "Retain useful stride without confusing long steps with motor cadence. Mass and native support can improve independently."
      },
      "broadback": {
        "name": "Broadback",
        "subtitle": "A broad, load-bearing foundation",
        "mass": 1.93,
        "width": 0.47,
        "length": 0.66,
        "height": 0.3,
        "stride": 0.245,
        "cadence": 9.5,
        "force": 2.7,
        "reserve": 140,
        "delivery": 3.6,
        "support": 2.78,
        "scaleX": 1.2368421052631577,
        "scaleY": 1.0645161290322582,
        "colour": "ochre",
        "source": "Heavy salvage shelter beds",
        "signs": "Wide articulated thorax; sustained pushing and evenly supported stance.",
        "use": "Wider native support and working area for a loaded build. The body occupies real passing space.",
        "select": "Select support per carried mass and useful native stride rather than simply the largest host."
      }
    },
    "wholeKits": [
      {
        "id": "NEEDLE",
        "name": "Needle & Thread",
        "plan": "needleback",
        "number": "18",
        "price": 108,
        "products": [
          "redline",
          "sticktoe"
        ],
        "tag": "COMPLETE HOST KIT / SPEEDSTERS",
        "purpose": "A whole slender host, a selected drive and quick-release feet. Build a personal sprint racer; native anatomy supplies every remaining role.",
        "approach": "clean"
      },
      {
        "id": "BROAD",
        "name": "Foundry Heavy",
        "plan": "broadback",
        "number": "28",
        "price": 124,
        "products": [
          "torque",
          "lowstep",
          "boxbrace"
        ],
        "tag": "COMPLETE HOST KIT / LOADED RUNNER",
        "purpose": "A whole Broadback, forceful musculature, short hip leverage and a supporting frame. Configure a loaded runner; add derby anatomy from your own stock.",
        "approach": "clean"
      },
      {
        "id": "LOWLINE",
        "name": "Third Friend",
        "plan": "lowline",
        "number": "08",
        "price": 118,
        "products": [
          "hoppers",
          "fatbody",
          "keel"
        ],
        "tag": "COMPLETE HOST KIT / HOPPER",
        "purpose": "A whole Lowline, paired Hoppers and separately sourced reservoir and damper. Set preload and landing behavior yourself.",
        "approach": "hopper"
      }
    ],
    "hostReproduction": {
      "name": "Rad-roach host",
      "form": "HOST",
      "family": "Body / native foundation",
      "habitat": "Service galleries / host colonies",
      "colour": "#b77750",
      "sign": "Intact whole body; inspect plan, mass and native stride before commissioning a racer.",
      "seek": "Select the living foundation: structural mass, stride and supporting tissue. Acquired grafts are not inherited.",
      "stage": "adult",
      "facility": "dry",
      "region": "body",
      "livePrice": 18,
      "breedPrice": 35,
      "products": [],
      "profile": {
        "count": 4,
        "hatch": 2,
        "stages": [
          [
            2,
            "nymph"
          ],
          [
            6,
            "adult"
          ]
        ],
        "success": 0.9,
        "survival": 0.9,
        "cost": 6
      },
      "traits": [
        [
          "massFactor",
          "Native mass factor",
          "ratio",
          1.04,
          -0.04,
          "lower"
        ],
        [
          "strideFactor",
          "Native stride factor",
          "ratio",
          0.97,
          0.03,
          "higher"
        ],
        [
          "supportFactor",
          "Native support factor",
          "ratio",
          0.95,
          0.05,
          "higher"
        ]
      ]
    },
    "componentQualification": {
      "redline": {
        "name": "Sprint drive",
        "axes": [
          [
            "cadence",
            9,
            12,
            "Cadence"
          ],
          [
            "force",
            1.9,
            2.6,
            "Useful force"
          ],
          [
            "efficiency",
            0.7,
            0.77,
            "Conversion efficiency"
          ]
        ]
      },
      "torque": {
        "name": "Load drive",
        "axes": [
          [
            "force",
            3.5,
            4.4,
            "Useful force"
          ]
        ]
      },
      "hoppers": {
        "name": "Paired launch",
        "axes": [
          [
            "hopper.0",
            0.55,
            0.7,
            "Return"
          ],
          [
            "hopper.1",
            0.12,
            0.02,
            "Release mismatch"
          ],
          [
            "hopper.2",
            0.18,
            0.06,
            "Settling"
          ]
        ]
      },
      "springknees": {
        "name": "Landing recovery",
        "axes": [
          [
            "settle",
            0.18,
            0.06,
            "Settling"
          ],
          [
            "impact_absorb",
            0.55,
            0.7,
            "Impact response"
          ]
        ]
      },
      "sticktoe": {
        "name": "Clean fast-release contact",
        "axes": [
          [
            "grip",
            1.15,
            1.45,
            "Clean purchase"
          ],
          [
            "release",
            0.07,
            0.02,
            "Release delay"
          ]
        ]
      },
      "cleats": {
        "name": "Loose-surface contact",
        "axes": [
          [
            "rough_grip",
            1.25,
            1.55,
            "Loose purchase"
          ],
          [
            "release",
            0.05,
            0.026,
            "Release delay"
          ]
        ]
      },
      "boxbrace": {
        "name": "Light structural support",
        "axes": [
          [
            "support",
            0.6,
            1.1,
            "Lateral support"
          ],
          [
            "$mass",
            0.28,
            0.2,
            "Carried structure"
          ]
        ]
      },
      "fatbody": {
        "name": "Sustained supply",
        "axes": [
          [
            "reserve",
            155,
            205,
            "Capacity"
          ],
          [
            "delivery",
            4,
            7,
            "Delivery"
          ]
        ]
      },
      "keel": {
        "name": "Rebound dissipation",
        "axes": [
          [
            "damping",
            0.18,
            0.5,
            "Damping"
          ]
        ]
      },
      "gyropods": {
        "name": "Correction sensing",
        "axes": [
          [
            "latency",
            0.2,
            0.08,
            "Signal delay"
          ],
          [
            "correction",
            0.7,
            0.9,
            "Response"
          ],
          [
            "$mass",
            0.07,
            0.046,
            "Carried sensor"
          ]
        ]
      },
      "splitvanes": {
        "name": "Light hold-down",
        "axes": [
          [
            "downforce",
            0.025,
            0.055,
            "Hold-down"
          ],
          [
            "drag",
            0.009,
            0.003,
            "Air resistance"
          ],
          [
            "$mass",
            0.05,
            0.03,
            "Carried surface"
          ]
        ]
      },
      "browfoil": {
        "name": "Shaped-plate hold-down",
        "axes": [
          [
            "downforce",
            0.025,
            0.05,
            "Hold-down"
          ]
        ]
      }
    },
    "currentForms": [
      "hopper",
      "cicada",
      "scarab",
      "mole",
      "stick",
      "wax",
      "fly",
      "mantis",
      "horn",
      "moth",
      "roach"
    ],
    "productCount": 16
  },
  "entities": [
    {
      "id": "W08.ENTITY.HOST",
      "fields": [
        "specimen_id",
        "body_plan",
        "native_protocol",
        "native_measurements",
        "native_exchange_units",
        "registration",
        "active_or_stabled_bench"
      ],
      "invariant": "Registration is a role on an owned whole specimen, never a duplicate animal."
    },
    {
      "id": "W08.ENTITY.FULL_KIT",
      "fields": [
        "kit_id",
        "recipe_id",
        "host_id",
        "component_ids",
        "owner",
        "packed_status",
        "price"
      ],
      "invariant": "Every packed asset has this kit as its unique custody holder; opening does not fit."
    },
    {
      "id": "W08.ENTITY.NAMED_LINE",
      "fields": [
        "line_id",
        "name",
        "founders",
        "kind",
        "target_snapshot",
        "created_turn",
        "observed_descendants",
        "measured_sample",
        "distinct_broods"
      ],
      "invariant": "Naming supplies identity and protection, not performance or statistically unjustified confidence."
    },
    {
      "id": "W08.ENTITY.QUALIFICATION",
      "fields": [
        "product_profile",
        "protocol_version",
        "required_axes",
        "observed_values",
        "band_or_null",
        "limitations"
      ],
      "invariant": "All required measurements meet the declared band; labels mutate no performance or commerce state."
    },
    {
      "id": "W08.ENTITY.STABLE_CUSTODY",
      "fields": [
        "active_host",
        "parked_benches",
        "installed_ids",
        "draft_reserved_ids",
        "loose_inventory"
      ],
      "invariant": "One component cannot be installed or reserved across two hosts; switching is not tissue transfer."
    }
  ],
  "world_threads": [
    {
      "id": "W08.THREAD.TWO_NETS",
      "institution": "SHOP_TWO_NETS",
      "purpose": "Complete host-kit retail and whole founder stock",
      "inputs": [
        "one living host",
        "identified compatible parts",
        "published assembly recipe",
        "finite buyer funds"
      ],
      "output": "Owned packed kit → open host → personal fitting → race",
      "implemented": "Counter purchase, packed custody, opening and guide-to-draft implemented.",
      "remaining": "Player-authored commercial production and autonomous restocking remain open."
    },
    {
      "id": "W08.THREAD.FOUNDRY",
      "institution": "VENUE_FOUNDRY",
      "purpose": "Several personal racers with one shared workshop",
      "inputs": [
        "owned stable",
        "individual drafts",
        "shared prepared stock",
        "care and attendance time"
      ],
      "output": "One selected real host attends; another can remain in a reproductive or building project.",
      "implemented": "Host switching, cross-host reservations and reproductive attendance blocking.",
      "remaining": "Multi-heat roster regulations, lending and paid fitting expansion remain open."
    },
    {
      "id": "W08.THREAD.CINDER",
      "institution": "ORG_CINDER",
      "purpose": "Select native foundations and component stock against useful kit specifications",
      "inputs": [
        "complementary founders",
        "native mass/stride/support observations",
        "measured descendant samples"
      ],
      "output": "Identifiable host line with bounded evidence for future supply.",
      "implemented": "Host breeding and line observations.",
      "remaining": "Automatic certified-line orders, statistical heritability and price adaptation remain open."
    },
    {
      "id": "W08.THREAD.BENCHLINE",
      "institution": "MEDIA_BENCHLINE",
      "purpose": "Preserve racer identity, build recipes and restricted lineage claims",
      "inputs": [
        "owner-selected title",
        "actual body and fitted version",
        "observed descendants",
        "frozen results"
      ],
      "output": "A visible recognizable stable and build history that can later be published.",
      "implemented": "Local stable, sheets and line records; no automatic public news or sales.",
      "remaining": "Publication permissions, information diffusion, collector claims and commercial reputation."
    },
    {
      "id": "W08.THREAD.CASES",
      "institution": "ORG_CARRIERS",
      "purpose": "Future transport of whole kits has both animal-care and component-custody obligations",
      "inputs": [
        "host holding envelope",
        "packed components",
        "target arrival",
        "provider capacity"
      ],
      "output": "A declared delivery rather than a remote grant of a new host.",
      "implemented": "Foundation dependency only; current retail is local counter handover.",
      "remaining": "Provider record routing and transport simulation; this thread makes no runtime claim."
    }
  ],
  "experiments": {
    "completeKitRace": {
      "host": "W08.HOST.KIT.NEEDLE",
      "parts": [
        "W07.PART.W08.KIT.DONOR.1.redline",
        "W07.PART.W08.KIT.DONOR.2.sticktoe"
      ],
      "results": [
        {
          "host": "W05.NPC.HOST",
          "time": 66.32816990878543,
          "energy": 88.51270584371616,
          "gates": 20,
          "required": 20
        },
        {
          "host": "W08.HOST.KIT.NEEDLE",
          "time": 84.33468938485275,
          "energy": 68.28612553392429,
          "gates": 20,
          "required": 20
        }
      ],
      "cash": 1023
    },
    "hostBrood": {
      "seed": "host.0",
      "parents": [
        "W08.SHOP.HOST.needleback.A",
        "W08.SHOP.HOST.broadback.B"
      ],
      "offspring": [
        {
          "id": "W07.BROOD.1.1",
          "plan": "needleback",
          "stage": "adult",
          "protected": true,
          "genes": [
            [
              1,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ]
          ]
        },
        {
          "id": "W07.BROOD.1.2",
          "plan": "needleback",
          "stage": "adult",
          "protected": false,
          "genes": [
            [
              1,
              0
            ],
            [
              0,
              1
            ],
            [
              1,
              0
            ]
          ]
        },
        {
          "id": "W07.BROOD.1.3",
          "plan": "needleback",
          "stage": "adult",
          "protected": true,
          "genes": [
            [
              1,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "id": "W07.BROOD.1.4",
          "plan": "broadback",
          "stage": "adult",
          "protected": false,
          "genes": [
            [
              1,
              0
            ],
            [
              0,
              1
            ],
            [
              1,
              1
            ]
          ]
        }
      ],
      "scope": "Declared success seed with synthetic test funding; not observed viability or inheritance calibration."
    },
    "lineReport": {
      "id": "W08.LINE.2",
      "name": "Longstep / trial",
      "kind": "roach",
      "target": {
        "kind": "roach",
        "trait": "strideFactor",
        "op": "min",
        "threshold": 1,
        "focus": "complement"
      },
      "founders": [
        "W08.SHOP.HOST.needleback.A",
        "W08.SHOP.HOST.broadback.B"
      ],
      "attempts": 1,
      "observedDescendants": 4,
      "tested": 1,
      "matching": 1,
      "untested": 3,
      "distinctTestedBroods": 1,
      "rows": [
        {
          "id": "W07.BROOD.1",
          "stage": "complete",
          "initiated": 4,
          "observedYoung": 4,
          "tested": 1,
          "matching": 1,
          "unknown": 3
        }
      ],
      "generations": [
        0,
        1
      ],
      "claim": "1 of 1 observed descendants meet this target; 3 unmeasured. Selected observations are not an unbiased yield forecast."
    },
    "kitCompletion": [
      {
        "kit": "NEEDLE",
        "time": 84.33468938485275,
        "place": 2,
        "energy": 68.28612553392429,
        "scope": "A completion check; no kit is promised to win every circuit."
      },
      {
        "kit": "BROAD",
        "time": 128.15851639928067,
        "place": 1,
        "energy": 107.67345377000234,
        "scope": "A completion check; no kit is promised to win every circuit."
      },
      {
        "kit": "LOWLINE",
        "time": 90.72114834700115,
        "place": 2,
        "energy": 148.30254508524825,
        "scope": "A completion check; no kit is promised to win every circuit."
      }
    ],
    "nativeComparison": {
      "protocol": "W08.NATIVE.LONG.1",
      "scope": "Synthetic equal-livery/native-only single-racer comparison. Entire native body profile changes; not isolated genes or a balanced class result.",
      "profiles": [
        {
          "plan": "lowline",
          "mass": 1.6,
          "width": 0.38,
          "stride": 0.25,
          "finish": 90.22348317616863,
          "energyUsed": 31.05494104244022
        },
        {
          "plan": "needleback",
          "mass": 1.38,
          "width": 0.33,
          "stride": 0.27,
          "finish": 83.96777879502973,
          "energyUsed": 31.046711720301815
        },
        {
          "plan": "broadback",
          "mass": 1.9300000000000002,
          "width": 0.47,
          "stride": 0.245,
          "finish": 93.17940771123205,
          "energyUsed": 31.391031619286068
        }
      ]
    },
    "needleKitComparison": {
      "before": 86.83682916276166,
      "after": 84.33468938485275,
      "changed": [
        "W07.PART.W08.KIT.DONOR.1.redline",
        "W07.PART.W08.KIT.DONOR.2.sticktoe"
      ],
      "scope": "Same Needleback host, setup, rival, course and grid. Both included components change; not an isolated drive experiment."
    }
  },
  "MIVIM": {
    "objective": "An individually sourced or bred whole host carries its native geometry into personal kit assembly, persistent stable custody and the same racing system, with measurement-led component and lineage evidence.",
    "comparator": "One fixed roach recolored as several models; kit purchase spawns a fitted racer; each bench duplicates shared parts; names or rarity labels award synthetic performance.",
    "hard_gates": "quality_at_declared_scope AND novel_development_adherence_at_declared_scope",
    "numeric_grading": "No authorized numerical scoring formula or weights are invented.",
    "findings": {
      "quality": "Implemented model, interactions and reviewed renders at declared local-prototype scope. Complete game and human usability gate open.",
      "novel_development_adherence": "Concrete project-specific whole-organism, kit, ownership and evidence integration. No worldwide novelty claim.",
      "effectiveness": "Demonstrated for tested body selection, purchased/caught/bred host registration, fitting, races, custody, backup and public evidence.",
      "creativity": "Distinct whole-kit presentation and shared biological origin-to-racer path delivered; experiential originality remains unmeasured.",
      "scaling_potential": "Reusable body/specimen profiles and shared command paths; a small local stable is not a large-world or multi-server benchmark."
    },
    "supporting_work": "Schema, reference checks, numerical parity and custody tests protect the intended integration. Their existence is not proof of fun or commercial success."
  },
  "limitations": [
    "One local active world, multiple owned racers, and one selected player entry per two-racer ground event. No multi-player stable event or server authority.",
    "Three discrete body plans plus three independent native loci. No blended anatomy, host personality learning, mutation, linkage or inherited appearance.",
    "The host is one additional reproductive form beside ten existing donors. A discrete parental plan is not a species-level mating restriction.",
    "Supported roots use simplified geometric bounds. No full articulated limb, swept collision, loaded muscle visualization or general multi-drive assembly.",
    "Complete kit retail is implemented; player-manufactured full kits, sale of registered assembled racers, autonomous restocking and dynamic lineage pricing are not.",
    "Measurement labels summarize twelve authored preparation profiles. Geometry-only parts and missing evidence are not forced into a tier. Thresholds and tier population are not calibrated.",
    "Named lines report observed descendants and selected samples, not unbiased heritability estimates or guaranteed supply contracts.",
    "Existing normalized path-space ground racing, simplified contact, reservoir mass at entry, and restricted reusable native cradles remain. Flight, broad storage decay and shipped orders are open.",
    "Old HOST care has dedicated-cradle overhead; other living hosts occupy care and holding capacity. Opening money/facilities and supplier additions are disclosed endowments.",
    "Local backup is editable user data, not anti-cheat. Native-file launch was blocked by the host; exact HTML was tested via set_content. Windows/macOS persistence and physical touch not verified.",
    "No human playtest, retention measurement or full economic balance. MIVIM has no authorized numerical formula in the recovered requirements."
  ],
  "evidence": {
    "model": "evidence/stable_tests.json",
    "bench_regression": "evidence/model_report.json",
    "legacy_parity": "evidence/parity_report.json",
    "browser": "evidence/browser_report.json",
    "validation": "evidence/validation_report.json",
    "authority": "Measured computational outputs and tests, not real biology, economy calibration or human playtest."
  }
}
