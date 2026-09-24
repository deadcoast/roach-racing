/* W08 public-evidence projections. No random draws, hidden-genome advice or stat mutation. */
(function(root){'use strict';
const C=root.RRRCatalog||(typeof require==='function'?require('./catalog.js'):null);
const cp=x=>JSON.parse(JSON.stringify(x));
const BANDS=['Hobby','Club','Circuit','Premier','Apex'];
// Each declared profile is a conjunction of real measurements. No weighted global rarity score.
// [path, ordinary end, selected end, label]. The bounds belong to this normalized RRR branch.
const PROFILES={
 redline:{name:'Sprint drive',axes:[['cadence',9,12,'Cadence'],['force',1.9,2.6,'Useful force'],['efficiency',.7,.77,'Conversion efficiency']]},
 torque:{name:'Load drive',axes:[['force',3.5,4.4,'Useful force']]},
 hoppers:{name:'Paired launch',axes:[['hopper.0',.55,.7,'Return'],['hopper.1',.12,.02,'Release mismatch'],['hopper.2',.18,.06,'Settling']]},
 springknees:{name:'Landing recovery',axes:[['settle',.18,.06,'Settling'],['impact_absorb',.55,.7,'Impact response']]},
 sticktoe:{name:'Clean fast-release contact',axes:[['grip',1.15,1.45,'Clean purchase'],['release',.07,.02,'Release delay']]},
 cleats:{name:'Loose-surface contact',axes:[['rough_grip',1.25,1.55,'Loose purchase'],['release',.05,.026,'Release delay']]},
 boxbrace:{name:'Light structural support',axes:[['support',.6,1.1,'Lateral support'],['$mass',.28,.2,'Carried structure']]},
 fatbody:{name:'Sustained supply',axes:[['reserve',155,205,'Capacity'],['delivery',4,7,'Delivery']]},
 keel:{name:'Rebound dissipation',axes:[['damping',.18,.5,'Damping']]},
 gyropods:{name:'Correction sensing',axes:[['latency',.2,.08,'Signal delay'],['correction',.7,.9,'Response'],['$mass',.07,.046,'Carried sensor']]},
 splitvanes:{name:'Light hold-down',axes:[['downforce',.025,.055,'Hold-down'],['drag',.009,.003,'Air resistance'],['$mass',.05,.03,'Carried surface']]},
 browfoil:{name:'Shaped-plate hold-down',axes:[['downforce',.025,.05,'Hold-down']]}
};
function grade(a){
 const p=PROFILES[a.product];
 if(!p)return{band:null,protocol:'W08.PART.QUALIFICATION.1',label:'Specification only',reason:'This preparation has selectable geometry, not an authored universal better direction. Compare its stated measurements.',axes:[]};
 if(a.observation?.protocol!=='W07.COMPONENT.1')return{band:null,label:'Unqualified',protocol:'W08.PART.QUALIFICATION.1',reason:'No matching recorded component observation.',axes:[]};
 const axes=p.axes.map(([key,ordinary,selected,label])=>{const value=key==='$mass'?a.mass:key.split('.').reduce((v,k)=>v?.[k],a.stats);return{key,label,value,ordinary,selected,fraction:Number.isFinite(value)?(value-ordinary)/(selected-ordinary):null};});
 if(axes.some(a=>a.fraction===null))return{band:null,label:'Incomplete measurements',protocol:'W08.PART.QUALIFICATION.1',reason:'A required measurement is missing.',axes};
 const weakest=Math.min(...axes.map(a=>a.fraction));if(weakest < -1e-7)return{band:null,label:'Below profile baseline',protocol:'W08.PART.QUALIFICATION.1',axes,reason:'At least one required measurement falls below the lowest stated qualification. It may serve another purpose.'};const index=Math.max(0,Math.min(4,Math.floor(weakest*4+1e-7)));
 return{band:BANDS[index],label:p.name,protocol:'W08.PART.QUALIFICATION.1',index,axes,reason:'All listed axes meet this band’s thresholds. A preparation-qualified label, not an overall rarity, breeding guarantee or race bonus.'};
}
function validateTarget(t){
 if(!t||!C.FORMS[t.kind]||!['min','max'].includes(t.op)||!Number.isFinite(t.threshold))throw Error('Invalid selection target');
 const a=C.FORMS[t.kind].traits.find(a=>a[0]===t.trait);if(!a)throw Error('Unknown target trait');const ends=[a[3],a[3]+2*a[4]];
 if(t.threshold<Math.min(...ends)-1e-6||t.threshold>Math.max(...ends)+1e-6)throw Error('Target outside measured profile');
 return true;
}
function passes(value,t){return t.op==='min'?value+1e-9>=t.threshold:value-1e-9<=t.threshold;}
function guidance(w,s){
 const t=w.selection;if(!t||t.kind!==s.kind)return null;validateTarget(t);
 const label=C.FORMS[t.kind].traits.find(a=>a[0]===t.trait)[1];
 if(!s.measured)return{status:'review',value:null,reason:`Unmeasured ${label.toLowerCase()} · possible project stock; assay or choose another use.`};
 const value=C.traits(s)[t.trait],match=passes(value,t);
 return{status:match?'match':'outside_target',value,reason:match?`${label} meets this ${t.focus==='product'?'product target':'missing contribution'} · breeding success not guaranteed.`:`Outside this ${label.toLowerCase()} target · other traits, kits or collectors may still value it.`};
}
function ancestry(w,line){
 const generations=new Map(line.founders.map(id=>[id,0]));let changed=true,steps=0;
 while(changed&&steps++<=w.specimens.length){changed=false;for(const s of w.specimens){if(generations.has(s.id)||s.kind!==line.kind)continue;const found=s.parents.filter(id=>generations.has(id));if(found.length){generations.set(s.id,1+Math.max(...found.map(id=>generations.get(id))));changed=true;}}}
 return generations;
}
function lineReport(w,line){
 validateTarget(line.target);const generations=ancestry(w,line);const descendants=w.specimens.filter(s=>generations.has(s.id)&&generations.get(s.id)>0);
 const attempts=w.broods.filter(b=>b.kind===line.kind&&b.parentIds.some(id=>generations.has(id)));
 const measured=descendants.filter(s=>s.measured),matching=measured.filter(s=>passes(C.traits(s)[line.target.trait],line.target));
 const rows=attempts.map(b=>{const kids=descendants.filter(s=>s.brood===b.id),tested=kids.filter(s=>s.measured);return{id:b.id,stage:b.stage,initiated:b.count,observedYoung:b.stage==='eggs'?null:kids.length,tested:tested.length,matching:tested.filter(s=>passes(C.traits(s)[line.target.trait],line.target)).length,unknown:kids.length-tested.length};});
 return{id:line.id,name:line.name,kind:line.kind,target:cp(line.target),founders:cp(line.founders),attempts:attempts.length,observedDescendants:descendants.length,tested:measured.length,matching:matching.length,untested:descendants.length-measured.length,distinctTestedBroods:new Set(measured.map(s=>s.brood).filter(Boolean)).size,rows,
  generations:[...new Set([...generations.values()])].sort((a,b)=>a-b),
  claim:measured.length?`${matching.length} of ${measured.length} observed descendants meet this target; ${descendants.length-measured.length} unmeasured. Selected observations are not an unbiased yield forecast.`:'No measured descendant evidence yet. A named project is not a certified line.'};
}
const api={BANDS,PROFILES,grade,guidance,validateTarget,lineReport,ancestry};root.RRREvidence=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
