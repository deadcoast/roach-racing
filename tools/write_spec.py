"""Build the versioned agent documents from authored rules and actual model profiles."""
from pathlib import Path
import json, hashlib, subprocess, copy
ROOT=Path(__file__).resolve().parents[1]
def load(p):return json.loads((ROOT/p).read_text())
def dump(p,x):(ROOT/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
base=load('reference/world_context_v0.7.json')
subprocess.run(['node','-e',"const fs=require('fs'),H=require('./src/hosts.js'),C=require('./src/catalog.js'),E=require('./src/evidence.js');fs.writeFileSync('evidence/declared_profiles.json',JSON.stringify({hostPlans:H.PLANS,wholeKits:H.FULL_KITS,hostReproduction:C.FORMS.roach,componentQualification:E.PROFILES,currentForms:Object.keys(C.FORMS),productCount:Object.keys(C.PRODUCTS).length},null,2));"],cwd=ROOT,check=True)
profiles=load('evidence/declared_profiles.json');experiments=load('evidence/stable_experiments.json')
sources=[
 dict(id='W08.S01',title='Tamiya — Mini 4WD Chassis and Compatible Parts',url='https://www.tamiya.com/english/cms/mini4wd_chassis_select.html',checked_on='2026-09-10',scope='Different layouts, geometry, native features and component compatibility support different car foundations.',limit='Physical Mini 4WD reference, not evidence that every PCR videogame body has these properties. RRR profile values are authored.'),
 dict(id='W08.S02',title='Tamiya — FM-A Balanced Starter Pack, 18710',url='https://www.tamiya.com/english/products/18710/index.html',checked_on='2026-09-10',scope='A complete assembly kit and selected upgrade parts provide a coordinated first project.',limit='A living host and biological parts are RRR extensions. The reference supplies no genetic or economic coefficients.'),
 dict(id='W08.S03',title='Tamiya — Mini 4WD Setup Guide',url='https://www.tamiya.com/english/mini4wd/setupguide/setupguide.htm',checked_on='2026-09-10',scope='Separate motor, gearing, contact, assembly and handling choices.',limit='Do not transfer fixed-wheel behavior literally into walking anatomy; no source item-grade algorithm is claimed.')]
tasks=[
 ('T01','P0','Audit the missing body layer and preserve the W07 world',[],'supporting','spec_and_preservation_checks','Keep original HOST, H-6, stock, cash, old waves and recorded results; trace physical-hobby and PCR functions separately.'),
 ('T02','P0','Add native body profiles and a multi-host stable',['T01'],'novel_integration','implemented_model_and_browser','Three body plans affect native geometry, mass, stride and support; each has separate drafts and fitted tissue.'),
 ('T03','P0','Supply complete living-host kits at Two Nets',['T02'],'novel_integration','implemented_model_and_browser','Buy identified host and real contents; open, draft, personally fit, and race without duplicating the old roach.'),
 ('T04','P0','Breed or catch a whole host and commission it as a racer',['T02'],'novel_integration','implemented_bounded_reproductive_profile','Actual offspring or capture becomes the same racer identity. Native heredity does not copy acquired grafts.'),
 ('T05','P0','Record project contributions and observed named-line outcomes',['T04'],'novel_integration','implemented_public_evidence_projection','Every current donor form supports an explicit target; untested descendants and unobserved brood survival remain unknown.'),
 ('T06','P1','Introduce family-specific measured component qualification',['T01'],'design_and_runtime','implemented_twelve_profiles','All required measurements satisfy a named profile; geometry choices remain specifications and no grade modifies stats or price.'),
 ('T07','P0','Preserve race, custody and mass correctness across body changes',['T02','T03'],'experimental_and_supporting','implemented_and_controlled_comparisons','One component stays on one host; native fuel mass is accounted for; a wider kit can complete a course without a stationary lateral lock.'),
 ('T08','P1','Render host recognition, complete tins and lineage evidence',['T03','T05','T06'],'visual_execution','rendered_and_browser_exercised','Same body plan is recognizable in shop, bench, stable and race. Narrow layout retains controls; no human usability claim.'),
 ('T09','P0','Validate migration, archive and next-wave handoff',['T01','T02','T03','T04','T05','T06','T07','T08'],'supporting','automated_and_scoped_review','Separate new tests, legacy comparisons, preserved-release regression, browser evidence and unverified gameplay claims.')]
task_ids={'T01':'W08.T01.REVIEW','T02':'W08.T01.HOSTS','T03':'W08.T01.KITS','T04':'W08.T01.HEREDITY','T05':'W08.T02.LINES','T06':'W08.T01.QUALIFY','T07':'W08.T01.RACING','T08':'W08.T01.PRESENT','T09':'W08.CLOSE'}
tasks=[dict(id=task_ids[i],priority=p,title=t,depends_on=[task_ids[x] for x in d],role=r,status=s,acceptance=a)for i,p,t,d,r,s,a in tasks]
carried=copy.deepcopy(base['development_waves'][-1]['Plan']['next'])
carried_status={'W08.T01':'implemented at local host/kit/qualification scope; comprehensive progression calibration remains open','W08.T02':'public contribution guidance and observed line records implemented; autonomous repeat demand and human pacing remain open','W08.T03':'carried to W09.T01; editable track and brake/rail families not implemented here','W08.T04':'only body/kit presentation developed; storage, shipping, appearance inheritance and general substitution remain open'}
for t in carried:t['current_scope_status']=carried_status[t['id']]

rules=[]
def group(name,origin,refines,items):
 for n,(statement,decision,result)in enumerate(items,1):rules.append(dict(id=f'W08.{name}.{n:02}',category=name,origin=origin,refines=refines,statement=statement,decision=decision,observable=result,status='revisable_implemented_profile'))
group('REFERENCE','source_hobby_translation',['W07.REFERENCE.01','W07.REFERENCE.06'],[
 ('Body selection is a distinct remaining reference function, not another name for the replaceable frame.','Choose the living foundation before selecting grafts.','Native body and supporting frame remain different objects.'),
 ('Physical chassis evidence informs geometry and fitting; it does not establish undocumented PCR videogame coefficients.','Use the relevant source layer.','Every numerical RRR body profile is labeled authored and normalized.'),
 ('Complete kits contain the foundation as well as selected components; conversion tins do not.','Buy a new racer project or modify an existing one.','The shop names whether a living host is included.'),
 ('Speed, winning, personally assembled kits, collecting and optional livelihoods remain simultaneous objectives.','Catch, breed, purchase or build through the path of interest.','A roach bought at the shop is not intrinsically inferior to an equivalent bred animal.'),
 ('No new species ban, universal slot cap, point budget or player-rank gene lock is introduced by these starter profiles.','Solve actual fit or choose the appropriate event.','Broader integration remains open beyond the current local interfaces.'),
 ('MIVIM assesses quality and novel-development adherence as hard gates, with effectiveness, creativity and scaling assessed separately.','Keep evidence scoped.','Counts, speed or vocabulary cannot replace an achieved design contribution.')])
group('HOST','source_hobby_translation_and_rrr_biology',['W05.BENCH.09','W07.REFERENCE.06'],[
 ('A registered racer is the original whole specimen, not a second animal manufactured by registration.','Commission an owned mature whole roach.','Specimen, stable and race reference the same identity.'),
 ('Lowline, Needleback and Broadback are body plans within one reproductive roach form in this branch.','Select geometry rather than a rarity caste.','Cross-plan mating uses the same declared reproductive eligibility.'),
 ('Native mass, envelope, stride, drive, reserve and support are explicit body parameters.','Choose a foundation for a construction.','The body affects actual compiled inputs instead of a hidden performance aura.'),
 ('Three inherited multipliers modify native mass, stride and support independently.','Select the contribution needed in host stock.','An inherited improvement need not receive a compulsory invented drawback.'),
 ('Native anatomy supplies every essential role not replaced by a prepared sect.','Race a native host or progressively customize it.','Opening a kit does not require replacing every organ before the animal functions.'),
 ('The native body model is separate from protected carapace and installed thoracic bracing.','Tune support and protection through their own anatomy.','A broad body does not grant invisible heavy armor.'),
 ('Body proportions constrain supported root regions; prepared sect dimensions do not scale automatically to fill a host.','Reposition, rotate, select or reprepare an incompatible component.','A root can fit Broadback and not Needleback without a species blacklist.'),
 ('Host profile mass includes the declared native reserve state; selected fill is subtracted and added consistently.','Fit a different reservoir and select fill.','Additional energy mass cannot disappear because the reservoir was replaced.'),
 ('Registration includes a native sizing observation in this workshop profile, without changing inheritance.','Commission and inspect actual measurements.','Prior unknown stock is not silently enhanced by its new name.'),
 ('Registered racers are protected from ordinary donor liquidation; complete racer selling is a later distinct transaction.','Retain a personal stable or sell uncommissioned stock.','Releasing a founder flag cannot accidentally sell an assembled named racer.')])
group('STABLE','rrr_native_inventory_integration',['W05.BENCH.01','W06.STOCK.07'],[
 ('There is one active workbench and one persisted bench state per inactive registered host.','Select a different racer.','The old host keeps its fitted design, draft, finish and sheets.'),
 ('Selecting a bench changes attention, not anatomy or elapsed time.','Compare owned hosts without repeatedly dismantling them.','Custody and care do not change merely from selecting a card.'),
 ('Installed and draft-reserved components on inactive hosts are unavailable to the active host.','Release a plan or physically unfit before sharing stock.','A single drive cannot power two roaches at once.'),
 ('A removal in a draft does not release the actual fitted component until commitment.','Review before dismantling.','Parked draft changes cannot create loose copies.'),
 ('A failed fitting or host operation leaves all affected identities, ownership and funds unchanged.','Correct the actual error then retry.','No half-transferred kit or duplicate tissue is left behind.'),
 ('Registered hosts remain living care obligations; the historical HOST retains its disclosed dedicated-cradle accounting.','Budget for a growing stable.','Migration does not double-charge the old host, while extra racers are not costless inventory.'),
 ('A host occupied by the current reproductive attempt cannot simultaneously be fitted or attend a race.','Use another roach or wait until the reservation ends.','Breeding and racing share one animal rather than copies.'),
 ('Frozen race records preserve the actual entered host profile and configuration.','Modify a different or the same racer later.','Old appearance, component identity and results do not follow current edits.')])
group('KIT','source_hobby_translation',['W07.SHOP.03','W05.RECIPE.04'],[
 ('A complete tin owns actual custody of one whole host and its listed component instances.','Buy a complete build project.','The foundation is included explicitly and cannot also be listed as loose stock.'),
 ('Purchase transfers the complete packed inventory and money once.','Commit a specific finite offer.','Refresh or transaction retry creates no second host.'),
 ('Opening registers the included host and releases the included sects without equipping them.','Begin personal assembly.','The roach begins with its native anatomy, not an instant finished premium build.'),
 ('An optional illustrated recipe fills a valid draft on its included host.','Follow the kit guide or depart from it.','The user must still commit the assembly; unrelated draft work is not silently discarded.'),
 ('Opening one kit does not disassemble or overwrite a previously owned racer.','Keep several complete projects.','The original host and its H-6 assembly remain where they were.'),
 ('Kit value derives from selected complementary stock, preparation, living foundation and guidance.','Compare useful contents and total price.','No set multiplier or bonus genome is added.'),
 ('Third Friend uses different donors for its full reservoir and rebound organ.','Supply each function with real tissue.','The same fatbody is not spent twice.'),
 ('Complete kits and body stock in this release are finite supplier endowments, not earned player rewards or autonomous factory output.','Purchase, catch or breed further stock.','The prototype does not credit unimplemented retail replenishment or player-kit manufacturing.')])
group('BREED','rrr_native_progression',['W07.BREED.03','W03.BREED.04'],[
 ('Whole-host capture uses a bounded service-gallery population with visible body plans and initially unmeasured inherited properties.','Search for a living foundation or unrelated founder.','Catching does not grant a perfect profile or require championship rank.'),
 ('The current roach profile uses four initiated places, a nymph transition and adult maturity in the dry nursery.','Reserve room and care before breeding.','Actual offspring appear through the existing world clock.'),
 ('An offspring receives one parental body plan and one allele from each parent at each of three independent quantitative loci.','Combine native contributions across plans.','This is a discrete plan choice, not an implemented continuously blended morphology.'),
 ('Installed grafts, paint, number, tuning and earned results are not inherited by the offspring.','Breed hosts and donor lines for different purposes.','A child of a fitted racer does not spawn its parents’ paid components.'),
 ('Protected replacements and brood uncertainty retain the earlier production rules.','Retain breeders, inspect children or use ordinary output policy.','No surviving compatible pair or exceptional child is promised.'),
 ('An adult offspring may be registered as a personal racer with an empty prepared-part arrangement.','Use the child as stock or begin a new kit project.','Its actual ancestry and body profile follow it onto the bench.'),
 ('The same host observation feeds selection, native compilation and historical entry data.','Assay or commission before making a specific claim.','The body trait does not become an unrelated race-power number.'),
 ('Genetic inputs and brood outcomes remain stable under inspection, selling, renaming, save/restore and equivalent clock advances.','Continue a project across sessions.','Repeated views do not generate another genetic opportunity.')])
group('LINE','rrr_native_evidence_and_hobby_identity',['W03.BREED.07','W03.INTAKE.02'],[
 ('All eleven current reproductive forms support an explicit selectable property, direction and bounded target.','Name the missing contribution or a product objective.','A generic keep-the-rarest rule does not replace purposeful selection.'),
 ('Guidance uses known measurements and the selected project, never hidden genetics.','Inspect a promising animal or retain it provisionally.','Same public evidence produces the same advice.'),
 ('A complementary breeder can fail the finished-product goal and still matter to the line.','Retain synchronization in an otherwise weak hopper.','Immediate racing value and reproductive contribution remain distinct.'),
 ('A named line records a compatible founder pair and a fixed target at creation.','Create a recognizable breeding project.','Naming protects its founders but awards neither stats nor cash.'),
 ('Line reports count reproductive attempts, observed descendants, tested descendants, matches and distinct tested broods separately.','Evaluate what has actually been observed.','Untested animals are not represented as failures or successes.'),
 ('Unopened brood survival and future genetic outcomes are absent from public line reports.','Plan with disclosed uncertainty.','A table cannot reveal which young will survive before observation.'),
 ('Historically measured sold or prepared descendants remain part of the evidence with their custody kept separate.','Review a line after selling useful output.','Evidence preservation does not restore ownership.'),
 ('Selected observations are not an unbiased population-yield estimate or a race-winning guarantee.','Publish a narrow count-based claim.','One measured success with untested siblings is displayed exactly that way.'),
 ('Line targets are records rather than global mutable preferences.','Begin a revised project explicitly.','Changing the current intake target does not rewrite the old line’s evidence question.')])
group('QUALIFY','rrr_native_translation_of_component_quality',['W07.REFERENCE.04','W07.REFERENCE.05'],[
 ('Twelve preparation-specific profiles define component qualification using named measured axes and a versioned protocol.','Compare stock within its relevant product purpose.','Different components are not flattened into one overall power number.'),
 ('A band requires all its stated criteria; one exceptional axis cannot compensate for a failed required axis.','Inspect the limiting contribution.','The label is a conjunction, not a disguised weighted score.'),
 ('Hobby, Club, Circuit, Premier and Apex are authored qualification bands, not PCR’s undisclosed formulas or MIVIM grades.','Read the declared profile.','The source game is not credited with invented numeric thresholds.'),
 ('Missing evidence and values below the profile baseline remain unqualified.','Acquire suitable measurements or use a different profile.','Unknown is not zero, maximum or automatic Hobby acceptance.'),
 ('Pure geometry choices remain specifications where a universal better direction would be misleading.','Choose Lowstep ratio, horn reach or brace width for the intended assembly.','A longer lever is not assigned a higher tier merely because it is longer.'),
 ('Qualification displays neither mutate race inputs nor raise actual buyer payments.','Use the label as a readable summary.','Customers still accept their own specifications; rarity, price and breeding value remain separate.'),
 ('The discrete current genomes may leave some display bands sparsely populated or empty.','Calibrate distributions and profiles later.','Five labels do not establish five well-balanced progression tiers.')])
group('RACE','rrr_native_motion_repair',['W05.RACE.02','W07.PART.12'],[
 ('The same native profile and installed component observations compile into the existing ground race model.','Enter a changed body or fitted set.','No unrelated score determines completion.'),
 ('Passing separation uses wrapped course proximity rather than absolute lap difference.','Complete an overtake even around lapped traffic.','A prior lap cannot leave a permanent unfinished passing target.'),
 ('Body-profile runners can request lateral movement from rest, bounded by the same available powered motion budget.','Clear a stopped side-by-side encounter.','Wider bodies do not deadlock because their old forward speed is zero; lateral motion is not free teleportation.'),
 ('The six unchanged raw historical experiments retain their numerical and event comparisons.','Add a forward body branch without rewriting saved runs.','Preserved parity does not mean race.js is byte-identical or full physics is validated.'),
 ('Body comparisons identify all changed inputs; component comparisons fix the host and other conditions.','Interpret time differences honestly.','A whole-body comparison is not advertised as an isolated gene result.'),
 ('Replay and historical inspection remain free of world-time or money settlement.','Watch and compare repeatedly.','A roster of racers does not multiply attendance or prizes.')])
group('PRESENT','rrr_native_visual_execution',['W07.PRESENT.01','W05.POLISH.03'],[
 ('Visible native body plans retain distinctive proportions in live stock, kit lids, bench, stable and race records.','Recognize the actual living foundation.','Three plans are not three names above an identical silhouette.'),
 ('Native anatomy scales with the body while prepared grafts retain their own drawing and fitting dimensions.','Judge construction space and mounted components together.','Growing a host does not secretly resize bought hardware-like anatomy.'),
 ('The stable has a clear active-host selector, per-host actions and preserved draft state.','Switch projects without losing work.','Casual use does not require reading ancestry tables or manually exporting every build.'),
 ('Line evidence, traits and qualification expand beside the same specimen or component.','Choose depth when useful.','Expert records do not become a disconnected administrative application.'),
 ('Narrow layouts preserve explicit buy, open, guide, fit, race and register controls.','Use tap-friendly controls instead of precision dragging.','Physical touch and human testing still require separate evidence.')])
group('HISTORY','supporting',['W07.EVIDENCE.01','W07.EVIDENCE.05'],[
 ('Migration preserves old cash, specimen records, prepared parts, draft/fitted arrangements and historical results.','Continue a W07 save.','New supplier stock and the native HOST record are disclosed additions, not new earned player funds.'),
 ('World backup contains all registered hosts, their separate builds, selected project and named lines.','Restore the same local world.','A corrupt native profile, duplicate custody or invalid inherited plan is rejected.'),
 ('Personal sheets target a specific host and existing components.','Keep or share a design without creating stock.','A sheet for a different host requests a deliberate adaptation instead of changing anatomy implicitly.'),
 ('The cumulative context appends W08 while retaining every prior non-manifest field and wave.','Use new rules with preserved history.','The byte-preserved baseline and manifest make the update auditable.'),
 ('Rendered review, model correctness, native-platform behavior, human enjoyment and world-scale calibration remain separate evidence states.','Keep unmet acceptance work in the queue.','No passing test count is a final innovation or retention grade.')])
limits=[
 'One local active world, multiple owned racers, and one selected player entry per two-racer ground event. No multi-player stable event or server authority.',
 'Three discrete body plans plus three independent native loci. No blended anatomy, host personality learning, mutation, linkage or inherited appearance.',
 'The host is one additional reproductive form beside ten existing donors. A discrete parental plan is not a species-level mating restriction.',
 'Supported roots use simplified geometric bounds. No full articulated limb, swept collision, loaded muscle visualization or general multi-drive assembly.',
 'Complete kit retail is implemented; player-manufactured full kits, sale of registered assembled racers, autonomous restocking and dynamic lineage pricing are not.',
 'Measurement labels summarize twelve authored preparation profiles. Geometry-only parts and missing evidence are not forced into a tier. Thresholds and tier population are not calibrated.',
 'Named lines report observed descendants and selected samples, not unbiased heritability estimates or guaranteed supply contracts.',
 'Existing normalized path-space ground racing, simplified contact, reservoir mass at entry, and restricted reusable native cradles remain. Flight, broad storage decay and shipped orders are open.',
 'Old HOST care has dedicated-cradle overhead; other living hosts occupy care and holding capacity. Opening money/facilities and supplier additions are disclosed endowments.',
 'Local backup is editable user data, not anti-cheat. Native-file launch was blocked by the host; exact HTML was tested via set_content. Windows/macOS persistence and physical touch not verified.',
 'No human playtest, retention measurement or full economic balance. MIVIM has no authorized numerical formula in the recovered requirements.'
]
nextq=[
 dict(id='W09.T01',priority='P0',title='Editable modular circuits with purposeful approach braking and rail-guide anatomy',acceptance='Construct validated connected layouts from owned sections; publish course versions; add brake and rail-guide donor/preparation/fitting behaviors where the course makes them useful. Preserve finish-first racing, real energy, host geometry and current stable.'),
 dict(id='W09.T02',priority='P0',title='Player-built complete kits and evidence-backed breeding commissions',acceptance='Package and sell actual owned host/component configurations with appropriate care/custody; distinct breeder orders use observed line evidence and actual funded demand. Preserve easy ordinary trade; no synthetic reputation-to-money aura.'),
 dict(id='W09.T03',priority='P1',title='Broader trait distributions and measured progression calibration',acceptance='Evaluate useful intermediate grades, several bodyforms and same-condition product improvements over enough seeded populations. Keep genetics, condition, preparation and sampling bias separate. Human participation needed before engagement claims.'),
 dict(id='W09.T04',priority='P1',title='Viable storage, stage-specific donors and motion fidelity',acceptance='Extend Clockleaf or aquatic-stage supply and actual storage/arrival windows; improve leg loading/recovery and preserved source markings without replacing existing native/graft state. Do not close world-wide death/regrowth by assumption.')]
threads=[
 dict(id='W08.THREAD.TWO_NETS',institution='SHOP_TWO_NETS',purpose='Complete host-kit retail and whole founder stock',inputs=['one living host','identified compatible parts','published assembly recipe','finite buyer funds'],output='Owned packed kit → open host → personal fitting → race',implemented='Counter purchase, packed custody, opening and guide-to-draft implemented.',remaining='Player-authored commercial production and autonomous restocking remain open.'),
 dict(id='W08.THREAD.FOUNDRY',institution='VENUE_FOUNDRY',purpose='Several personal racers with one shared workshop',inputs=['owned stable','individual drafts','shared prepared stock','care and attendance time'],output='One selected real host attends; another can remain in a reproductive or building project.',implemented='Host switching, cross-host reservations and reproductive attendance blocking.',remaining='Multi-heat roster regulations, lending and paid fitting expansion remain open.'),
 dict(id='W08.THREAD.CINDER',institution='ORG_CINDER',purpose='Select native foundations and component stock against useful kit specifications',inputs=['complementary founders','native mass/stride/support observations','measured descendant samples'],output='Identifiable host line with bounded evidence for future supply.',implemented='Host breeding and line observations.',remaining='Automatic certified-line orders, statistical heritability and price adaptation remain open.'),
 dict(id='W08.THREAD.BENCHLINE',institution='MEDIA_BENCHLINE',purpose='Preserve racer identity, build recipes and restricted lineage claims',inputs=['owner-selected title','actual body and fitted version','observed descendants','frozen results'],output='A visible recognizable stable and build history that can later be published.',implemented='Local stable, sheets and line records; no automatic public news or sales.',remaining='Publication permissions, information diffusion, collector claims and commercial reputation.'),
 dict(id='W08.THREAD.CASES',institution='ORG_CASE_RUNNERS',purpose='Future transport of whole kits has both animal-care and component-custody obligations',inputs=['host holding envelope','packed components','target arrival','provider capacity'],output='A declared delivery rather than a remote grant of a new host.',implemented='Foundation dependency only; current retail is local counter handover.',remaining='Provider record routing and transport simulation; this thread makes no runtime claim.')]
# Reuse the actual Case Runners id if its seed identifier differs.
for r in base.get('seed_records',[]):
 if isinstance(r,dict) and 'case runners' in str(r).lower():
  if r.get('id'):threads[-1]['institution']=r['id'];break
entities=[
 dict(id='W08.ENTITY.HOST',fields=['specimen_id','body_plan','native_protocol','native_measurements','native_exchange_units','registration','active_or_stabled_bench'],invariant='Registration is a role on an owned whole specimen, never a duplicate animal.'),
 dict(id='W08.ENTITY.FULL_KIT',fields=['kit_id','recipe_id','host_id','component_ids','owner','packed_status','price'],invariant='Every packed asset has this kit as its unique custody holder; opening does not fit.'),
 dict(id='W08.ENTITY.NAMED_LINE',fields=['line_id','name','founders','kind','target_snapshot','created_turn','observed_descendants','measured_sample','distinct_broods'],invariant='Naming supplies identity and protection, not performance or statistically unjustified confidence.'),
 dict(id='W08.ENTITY.QUALIFICATION',fields=['product_profile','protocol_version','required_axes','observed_values','band_or_null','limitations'],invariant='All required measurements meet the declared band; labels mutate no performance or commerce state.'),
 dict(id='W08.ENTITY.STABLE_CUSTODY',fields=['active_host','parked_benches','installed_ids','draft_reserved_ids','loose_inventory'],invariant='One component cannot be installed or reserved across two hosts; switching is not tissue transfer.')]
review={
 'objective':'An individually sourced or bred whole host carries its native geometry into personal kit assembly, persistent stable custody and the same racing system, with measurement-led component and lineage evidence.',
 'comparator':'One fixed roach recolored as several models; kit purchase spawns a fitted racer; each bench duplicates shared parts; names or rarity labels award synthetic performance.',
 'hard_gates':'quality_at_declared_scope AND novel_development_adherence_at_declared_scope',
 'numeric_grading':'No authorized numerical scoring formula or weights are invented.',
 'findings':{
  'quality':'Implemented model, interactions and reviewed renders at declared local-prototype scope. Complete game and human usability gate open.',
  'novel_development_adherence':'Concrete project-specific whole-organism, kit, ownership and evidence integration. No worldwide novelty claim.',
  'effectiveness':'Demonstrated for tested body selection, purchased/caught/bred host registration, fitting, races, custody, backup and public evidence.',
  'creativity':'Distinct whole-kit presentation and shared biological origin-to-racer path delivered; experiential originality remains unmeasured.',
  'scaling_potential':'Reusable body/specimen profiles and shared command paths; a small local stable is not a large-world or multi-server benchmark.'},
 'supporting_work':'Schema, reference checks, numerical parity and custody tests protect the intended integration. Their existence is not proof of fun or commercial success.'}
spec={
 'manifest':dict(id='W08',version='0.8.0',title='RRR — The Living Stable',date='2026-09-10',status='revisable_foundations_and_interactive_local_prototype',extends='world_context_v0.7.json',base_sha256=hashlib.sha256((ROOT/'reference/world_context_v0.7.json').read_bytes()).hexdigest(),serialization='Strict JSON in .spec: RRR exchange format; not an asserted canonical private MIVIM grammar.'),
 'Reference':dict(sources=sources,primary_previous_task='W08.T01 from Wave07 next queue',scope='Body/chassis function from the source hobby, host biology as RRR extension; preserve the earlier eight component families.',original_premises='Speed, racing victory, kit assembly, collection, any-person capture/breeding, Wrangloid trade and optional livelihoods; Open/Flyer/Speedster/Fireworks boundaries unchanged.'),
 'Plan':dict(carried_commitments=carried,tasks=tasks,next=nextq),
 'Workflow':['review actual W07 queue and files','extend native body and custody model','integrate real complete kits and host reproduction','add evidence-bound projects and qualifications','render in existing application','adversarial and matched model comparisons','actual browser flows and image review','preserve baseline, validate and verify archive'],
 'Adherence':dict(authority='User premises govern; generated body, grade and reproductive profiles remain proposals.',non_goals=['new fixed race-power score','story replacing atomic mechanics','hidden grade multiplier','fabricated generic MIVIM grade','claim of human engagement from unit tests'],preservation='All prior non-manifest context and prior waves are unchanged; original stock and game interfaces continue.'),
 'rules':rules,'profiles':profiles,'entities':entities,'world_threads':threads,'experiments':experiments,'MIVIM':review,'limitations':limits,
 'evidence':dict(model='evidence/stable_tests.json',bench_regression='evidence/model_report.json',legacy_parity='evidence/parity_report.json',browser='evidence/browser_report.json',validation='evidence/validation_report.json',authority='Measured computational outputs and tests, not real biology, economy calibration or human playtest.')}
dump('RRR_Wave_08.spec',spec)
schema={'$schema':'https://json-schema.org/draft/2020-12/schema','title':'RRR W08 exchange specification','type':'object','required':list(spec.keys()),'additionalProperties':False,'properties':{k:{'type':'object'}for k in spec}}
schema['properties'].update({'Workflow':{'type':'array','items':{'type':'string'},'minItems':1},'rules':{'type':'array','minItems':1,'items':{'type':'object','additionalProperties':False,'required':list(rules[0]),'properties':{k:({'type':'array','items':{'type':'string'}}if k=='refines'else{'type':'string','minLength':1})for k in rules[0]}}},'entities':{'type':'array'},'world_threads':{'type':'array'},'limitations':{'type':'array','items':{'type':'string'}}})
dump('wave08.schema.json',schema)
cumulative=copy.deepcopy(base);cumulative['development_waves'].append(spec);cumulative['manifest'].update(version='0.8.0',latest_wave='W08',updated_on='2026-09-10',relationship_to_handbook='Appends Wave08 whole-host foundations, real complete kits, multi-host custody, observed breeding lines and measured component qualification. Prior non-manifest records and waves unchanged.',validation_scope='Bounded W08 model/browser/migration evidence; complete biology, long-run economy, human usability and retention unverified.');dump('world_context_v0.8.json',cumulative)
# Presentation from the same authored source and executed data.
lines=['# RAD ROACH RACING — WAVE v0.8','## The Living Stable','',f'**Status:** revisable foundations and an interactive local prototype. **Development:** {len(rules)} statements; three body plans; three complete kits; host catching and breeding; multi-host custody; named-line evidence; twelve measured preparation profiles.','',
 '## Reference → purpose','', 'The previous wave named its fixed host as an incomplete body-selection translation. This wave gives the source hobby’s distinct foundations a living execution. A native host differs from a replaceable thoracic brace. A complete kit differs from a conversion set. A line name differs from measured descendants.','',
 '| Reference | Function used | Boundary |','|---|---|---|']
for s in sources:lines.append(f"| {s['id']} / {s['title']} | {s['scope']} | {s['limit']} |")
lines+=['','## Plan and delivered tasks','','| Task | Contribution | Evidence state |','|---|---|---|']
for t in tasks:lines.append(f"| {t['id']} | {t['title']} | {t['status']} |")
lines+=['','## Playable route','','Open the self-contained HTML. Visit **Two Nets**, buy one full host kit, open it, then use **Stable & lines** to lay out its guide. Review the real parts and press **Fit this build** before racing. The earlier host retains its own arrangement. Alternative routes buy whole founders or catch service-gallery hosts; grown offspring can become new racers without duplicating stock.','',
 '## Three native foundations','','All quantities below are normalized authored inputs, not measured insects or calibrated physical units. The base values use neutral native-trait factors. Native mass includes the declared full native reserve state. Installed components and the chosen fill alter actual entry mass.','',
 '| Body | Native mass | Width / length | Stride | Native force | Support | Purpose |','|---|---:|---|---:|---:|---:|---|']
for key,p in profiles['hostPlans'].items():lines.append(f"| {p['name']} | {p['mass']:.2f} M | {p['width']:.2f} / {p['length']:.2f} L | {p['stride']:.3f} L | {p['force']:.2f} F | {p['support']:.2f} F | {p['use']} |")
lines+=['','Native body plan changes supported fitting regions and passing envelope. Selected mass, stride and support can vary independently within that plan. The new body is a real animal with native anatomy; installed grafts remain separately purchased, prepared and fitted assets.','',
 '## Whole kits, not another copy of the current roach','','| Kit | Included host | Actual preparations | Prototype price |','|---|---|---|---:|']
for k in profiles['wholeKits']:lines.append(f"| {k['name']} | {profiles['hostPlans'][k['plan']]['name']} | {', '.join(k['products'])} | {k['price']} cr |")
lines+=['','These prices and supplier endowments are declared starting content. Buying transfers a packed whole host and existing parts. Opening registers the included host but does not install the parts. The optional guide creates a draft. Personal placement, tuning and fitting remain available. Native anatomy supplies all remaining roles. The two waxmoth products in Third Friend come from different individuals.','',
 '## Whole-host selection and heredity','',
 'Service-gallery capture provides whole stock of visible Lowline, Needleback or Broadback plan. Assay or commissioning reveals the three native measurements used by the current model. Shop founders provide another route; breeding is never a required career for a racer.','',
 '**Current experimental reproduction:** up to four initiated young; nymph transition at offset two; adulthood at offset six; A/B pair eligibility within the one roach form. A child inherits one parent’s complete body plan and one allele per parent at each of three independent quantitative loci. The 0.9 reproductive-success and 0.9 survival parameters are authored probes, not calibrated life history.','',
 '**Selectable host contributions:** lower native mass, useful stride, and native support. The exact native profile derives from the body plan and measured genetic factors; the model does not add separate inherited acceleration or speed points duplicating those causes.','',
 'A host’s acquired horn, engine tissue, painted shell, race record and builder settings do not enter its germline. A registered racer occupied by a current reproductive attempt cannot race or be refitted until its reservation releases. Keeping several racers allows different projects to continue without making several copies of one part.','',
 '## Named-line records and useful contribution guidance','',
 'A target can be selected for every current reproductive form. **Missing contribution** and **finished product** are explicitly distinguished. For example, a low-return high-synchrony Hopper can supply the missing trait to an established high-return project. Unknown observations request review.','',
 'A named line protects its two founders and freezes the target it is studying. It reports attempts, observed descendants, measured descendants, target matches and distinct measured broods. Historically sold or prepared measured descendants remain evidence, not owned stock. One measured success plus untested siblings is exactly that; it is not a 100% brood-yield guarantee. The name itself changes neither genes nor price.','',
 '## Measured component qualification','',
 'Twelve profiles cover redline, torque, hoppers, springknees, sticktoe, cleats, boxbrace, fatbody, keel, gyropods, splitvanes and browfoil. Each contains real named axes and requires every criterion at the candidate band. Hobby → Club → Circuit → Premier → Apex are authored display bands, not a copied PCR formula or a MIVIM score.','',
 'Some current profiles deliberately measure only a narrow purpose: a torque band describes its useful-force axis, not proof of universal superiority. Geometry-only Lowstep, horn, claw and brace arrangements show **Specification only**. Missing observations or failed baseline criteria remain unqualified. Labels have no stat or price multiplier. With the current discrete genes, some display bands may have little or no population; their pacing remains an explicit calibration task.','',
 '## Exact foundation statements','']
last=None
for r in rules:
 if r['category']!=last:lines+=['### '+r['category'].title(),f"Origin: `{r['origin']}`. Refines: "+', '.join('`'+x+'`'for x in r['refines'])+'.',''];last=r['category']
 lines+=[f"**{r['id']}** — {r['statement']}",f"Decision: {r['decision']} Observable: {r['observable']}",'']
lines+=['## Connected world work','']
for t in threads:lines+=[f"### {t['id']} / `{t['institution']}`",f"**Purpose:** {t['purpose']}.",f"**Inputs:** {'; '.join(t['inputs'])}.",f"**Output:** {t['output']}",f"**Implemented:** {t['implemented']}",f"**Still open:** {t['remaining']}",'']
lines+=['## Executed comparisons','',
 '### Native-only profile comparison','','One roach, same controlled long course, neutral trait factors, no prepared sects. The whole native profile changes; this is not an isolated genetic trial or a world ranking.','',
 '| Body | Completion / normalized T | Consumed reserve / E |','|---|---:|---:|']
for p in experiments['nativeComparison']['profiles']:lines.append(f"| {p['plan']} | {p['finish']:.6f} | {p['energyUsed']:.6f} |")
a=experiments['needleKitComparison'];lines+=['','### Same host, included kit components',f"The same Needleback changes from **{a['before']:.6f} T** with native anatomy to **{a['after']:.6f} T** after both supplied drive and contact components are fitted. Course, rival, grid and setup remain fixed. This is a coordinated two-component comparison, not an isolated motor claim.",'',
 'All three full-kit configurations complete the checked two-roach circuit. That check does not promise that any kit wins every event. The wide loaded build exposed a stationary lateral-passing lock: W08 resolves wrapped-lap proximity and permits a powered lateral request from rest using the same motion budget. `race.js` therefore differs from W07, while all six raw legacy numerical and event comparisons still match.','',
 '### Actual browser path','',
 'The browser path purchases and opens a Needle kit, fits its real parts, races its actual host, switches back without losing the original H-6 build, and restores a full multi-host backup. A second path purchases two native founders with ordinary opening cash, creates a target and named line, breeds, observes adult offspring, measures one child, commissions that child, fits the owned UPGRADE-DRIVE and races it. A third path captures a host from the service galleries and brings it to the same bench. No browser hook injects cash, animals or genomes.','',
 '## MIVIM contribution review','','| Criterion | Finding |','|---|---|']
for k,v in review['findings'].items():lines.append(f'| {k} | {v} |')
lines+=['',review['supporting_work'],'',
 '## Validation and boundaries','',
 'Current evidence files separate new behavioral operations, preserved legacy bench behavior, numerical source comparisons, browser controls, the old release regression, and schema/reference preservation. `validate_wave08.py` records the exact counts and HTML hash. Browser source checks exercise the delivered HTML, not screenshots alone. Native file launch is blocked in this host; testing uses exact HTML via `set_content`.','']
for l in limits:lines.append('**Boundary:** '+l+'\n')
lines+=['## Next ordered work','','| Task | Acceptance |','|---|---|']
for t in nextq:lines.append(f"| {t['priority']} / {t['id']} — {t['title']} | {t['acceptance']} |")
lines+=['','## Source register','']
for s in sources:lines += [f"**{s['id']} — {s['title']}**",'Scope: '+s['scope']+' Limit: '+s['limit'],f"Checked {s['checked_on']}. `{s['url']}`",'']
(ROOT/'RRR_Wave_08_Foundations.md').write_text('\n'.join(lines)+'\n')
todo=['# RRR — Wave v0.8 TODO','','A completed local implementation is not a calibrated complete game. All tasks retain the acceptance boundary below.','']
for t in tasks:todo += [f"## [x] {t['id']} — {t['title']}",f"Priority {t['priority']}. Dependencies: {', '.join(t['depends_on']) or 'none'}. Role: {t['role']}.",f"Delivered status: {t['status']}.",f"Acceptance at this scope: {t['acceptance']}",'']
todo+=['## Carried acceptance not falsely closed','','W08.T01 from the previous queue: three native bodies, full kits and qualification profiles implemented; numerical balance and multi-family progression calibration remain open.','W08.T02 from the previous queue: project guidance and named lineage evidence implemented; autonomous repeat demand, appearance inheritance and human livelihood pacing not completed.','W08.T03 and W08.T04 from the previous queue: track editing, braking/rail families, shipped preservation, full anatomical motion remain carried work.','']
for t in nextq:todo += [f"## [ ] {t['id']} — {t['title']}",f"Priority {t['priority']}. Acceptance: {t['acceptance']}",'']
(ROOT/'RRR_Wave_08_TODO.md').write_text('\n'.join(todo)+'\n')
m=['# MIVIM — Wave v0.8 contribution review','',f"**Objective:** {review['objective']}",f"**Comparator:** {review['comparator']}",f"**Hard gates:** `{review['hard_gates']}`.",review['numeric_grading'],'']
for k,v in review['findings'].items():m+=['## '+k.replace('_',' ').title(),v,'']
m+=['## Supporting assurance',review['supporting_work'],'','## Repairs discovered through development',
 'Host-aware native replacement accounting had to distinguish dry structure from declared loaded reserve; added reservoir energy mass is now carried.',
 'Cross-host availability needed both parked drafts and fitted components, not merely the active bench.',
 'A broad loaded kit could stall indefinitely at zero forward speed beside a rival. Wrapped proximity and a bounded powered sidestep repair the deadlock without a free lateral teleport.',
 'A whole-host shop initially reused one generic donor glyph. The current live shelf uses the visible native plan as the stable and kit lid do.',
 'Lineage guidance was initially repeated twice in stock cards; one evidence-based reason now leads the card.',
 'The single lineage record now fills its available row; narrow kit, bench and stable layouts remain separately inspected.','',
 '## Still unproven','Human usability, perceived distinctiveness, retention, world-scale runtime and economic balance. Source-game fidelity is functional, not a claim of copied hidden formulas.']
(ROOT/'RRR_MIVIM_Review_v0.8.md').write_text('\n'.join(m)+'\n')
(ROOT/'README.md').write_text('''# RAD ROACH RACING — The Living Stable / v0.8

Open `RRR_Living_Stable_v0.8.html` in a browser. It contains its application code, CSS and procedural art; no installation, server, network or downloaded fonts are required by the app.

## Start a whole kit
Two Nets → buy a complete host kit → open → Stable & lines → lay out its guide → review on the workbench → Fit this build → Take the line → Race this build. Original HOST and H-6 remain on their own bench.

## Start a host line
Buy or catch two compatible adult roaches. In Stable & lines choose a native target and record the founder pair. Use Live stock to breed and manage the stages. Measure descendants; commission an adult as a racer. Naming a line does not create genetic improvements or immediate demand.

## Persistence
World backup in Live stock saves all owned hosts, builds, stock, cash and lines. Header sheet export/import is only a host-specific recipe. Local storage may be blocked; portable backup is the tested fallback. Backups are editable local data, not competitive server authority.

## Files
- `RRR_Wave_08.spec`: strict-JSON authored rules, profiles, trace, tasks and evidence boundary.
- `world_context_v0.8.json`: cumulative context with the unchanged previous waves.
- `RRR_Wave_08_Foundations.md`: agent-readable full expansion.
- `RRR_Wave_08_TODO.md`: delivered states and next ordered work.
- `RRR_MIVIM_Review_v0.8.md`: scoped assessment, not a numeric certification.
- `src/`: editable application sources, no external runtime dependencies.
- `tests/`: model, legacy parity and actual browser interaction paths.
- `reference/`: verbatim baseline context, previous release archive and earlier comparison fixtures.
- `evidence/`: outputs, screenshots and verification results.

## Development checks
Python 3.11+, Node 18+, and Python `jsonschema` are needed for validation. Browser checks additionally need `playwright` and Chromium. Set `CHROMIUM_EXECUTABLE` to the browser path when it is not `/usr/bin/chromium`.

```sh
python tools/build_app.py
python validate_wave08.py
python validate_wave08.py --browser --prior-release
```

`--prior-release` executes the old Wave07 tests on the preserved old release, not on the new model. Reports label that distinction. These dependencies are for development only; they are not required to open the HTML.

The host blocked native file navigation during automated review; exact HTML ran with Playwright `set_content`. Native Windows/macOS persistence, physical touch and human enjoyment remain unverified.
''')
(ROOT/'CHANGELOG.md').write_text('''# RRR / Change log

## v0.8.0 — The Living Stable

Added three native body plans, whole-host capture and reproduction, several owned racers and host-specific native exchange units. Added complete Two Nets tins with finite actual hosts/components, guide-to-draft assembly and preservation of the original racer. Added eleven-form contribution selection, named founder lines and observation-scoped descendant records. Added twelve measured component qualification profiles, leaving geometry choices and unknown evidence explicitly unranked.

Preserved the eight component families and all previous non-manifest world context. Fixed cross-host custody, native reserve-mass accounting, lapped passing-target completion and stationary lateral passing for body-profile runners. Historical raw race comparisons retain their results. Renders now share visible host plans across shop, stable, bench, build sheets and race.

No complete-racer resale, autonomous lineage demand, continuous morphology genetics, flight, editable course builder, broad storage decay, world-scale economy or human playtest is claimed.
''')
print(json.dumps({'rules':len(rules),'tasks':len(tasks),'hostPlans':len(profiles['hostPlans']),'fullKits':len(profiles['wholeKits']),'qualificationProfiles':len(profiles['componentQualification'])}))
