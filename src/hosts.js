/* W08 living foundations. Authored normalized profiles, not biological claims.
 * Host body plan is inherited separately from interchangeable acquired grafts.
 * A body is a persistent whole specimen; registering it never manufactures a second animal.
 */
(function(root) {
'use strict';
const C = root.RRRCatalog || (typeof require === 'function' ? require('./catalog.js') : null);
const cp = x => JSON.parse(JSON.stringify(x));
const PLANS = {
 lowline: {name:'Gutterbred Lowline', subtitle:'The familiar club foundation', mass:1.60, width:.38, length:.62, height:.26, stride:.25, cadence:10, force:2, reserve:120, delivery:3, support:1.92, scaleX:1, scaleY:1, colour:'vermilion',
  source:'Warm service galleries', signs:'Flattened shed plates; low running posture and intact native joints.', use:'Balanced native anatomy; familiar root spacing for club kits.', select:'Select lower structural mass, useful native stride or supporting tissue. Graft performance remains a separate donor project.'},
 needleback: {name:'Needleback', subtitle:'A slender, long-striding foundation', mass:1.38, width:.33, length:.68, height:.24, stride:.27, cadence:10, force:1.9, reserve:110, delivery:3, support:1.56, scaleX:.33/.38, scaleY:.68/.62, colour:'ivory',
  source:'Slab-edge service cracks', signs:'Narrow tapered molts; long clean steps through close seams.', use:'Slender passing profile and long native stride; less width for graft roots.', select:'Retain useful stride without confusing long steps with motor cadence. Mass and native support can improve independently.'},
 broadback: {name:'Broadback', subtitle:'A broad, load-bearing foundation', mass:1.93, width:.47, length:.66, height:.30, stride:.245, cadence:9.5, force:2.7, reserve:140, delivery:3.6, support:2.78, scaleX:.47/.38, scaleY:.66/.62, colour:'ochre',
  source:'Heavy salvage shelter beds', signs:'Wide articulated thorax; sustained pushing and evenly supported stance.', use:'Wider native support and working area for a loaded build. The body occupies real passing space.', select:'Select support per carried mass and useful native stride rather than simply the largest host.'}
};
C.FORMS.roach = {
 name:'Rad-roach host', form:'HOST', family:'Body / native foundation', habitat:'Service galleries / host colonies', colour:'#b77750',
 sign:'Intact whole body; inspect plan, mass and native stride before commissioning a racer.',
 seek:'Select the living foundation: structural mass, stride and supporting tissue. Acquired grafts are not inherited.',
 stage:'adult', facility:'dry', region:'body', livePrice:18, breedPrice:35, products:[],
 profile:{count:4,hatch:2,stages:[[2,'nymph'],[6,'adult']],success:.9,survival:.9,cost:6},
 traits:[['massFactor','Native mass factor','ratio',1.04,-.04,'lower'],['strideFactor','Native stride factor','ratio',.97,.03,'higher'],['supportFactor','Native support factor','ratio',.95,.05,'higher']]
};
const nativeMass={drive:.12,hopper:.18,reserve:.10,pads:.035,frame:.15,gear:.05,suspension:.08};
function profile(s){
 const plan=PLANS[s.bodyPlan||'lowline'];if(!plan)throw Error('Unknown host body plan');
 const t=C.traits(s),n=x=>Number(x.toFixed(7)),m=plan.mass*t.massFactor;
 return {id:s.id,plan:s.bodyPlan||'lowline',name:plan.name,protocol:'W08.HOST.NATIVE.1',
  mass:n(m),width:plan.width,length:plan.length,height:plan.height,stride:n(plan.stride*t.strideFactor),
  cadence:plan.cadence,force:plan.force,reserve:plan.reserve,delivery:plan.delivery,
  support:n(plan.support*t.supportFactor),scaleX:plan.scaleX,scaleY:plan.scaleY,
  nativeMass:Object.fromEntries(Object.entries(nativeMass).map(([k,v])=>[k,n(v*m/1.6)]))};
}
function assertProfile(p){
 if(!p||!PLANS[p.plan]||typeof p.id!=='string'||!/^[A-Za-z0-9_.-]{1,180}$/.test(p.id)||p.protocol!=='W08.HOST.NATIVE.1')throw Error('Invalid host profile');
 for(const k of['mass','width','length','height','stride','cadence','force','reserve','delivery','support','scaleX','scaleY'])if(!Number.isFinite(p[k])||p[k]<=0||p[k]>300)throw Error('Invalid host property '+k);
 if(!p.nativeMass||Object.keys(p.nativeMass).length!==Object.keys(nativeMass).length)throw Error('Invalid retained native assemblies');
 for(const k of Object.keys(nativeMass))if(!Number.isFinite(p.nativeMass[k])||p.nativeMass[k]<=0||p.nativeMass[k]>.5)throw Error('Invalid native assembly mass');
 return p;
}
const FULL_KITS = [
 {id:'NEEDLE',name:'Needle & Thread',plan:'needleback',number:'18',price:108,products:['redline','sticktoe'],tag:'COMPLETE HOST KIT / SPEEDSTERS',
  purpose:'A whole slender host, a selected drive and quick-release feet. Build a personal sprint racer; native anatomy supplies every remaining role.',approach:'clean'},
 {id:'BROAD',name:'Foundry Heavy',plan:'broadback',number:'28',price:124,products:['torque','lowstep','boxbrace'],tag:'COMPLETE HOST KIT / LOADED RUNNER',
  purpose:'A whole Broadback, forceful musculature, short hip leverage and a supporting frame. Configure a loaded runner; add derby anatomy from your own stock.',approach:'clean'},
 {id:'LOWLINE',name:'Third Friend',plan:'lowline',number:'08',price:118,products:['hoppers','fatbody','keel'],tag:'COMPLETE HOST KIT / HOPPER',
  purpose:'A whole Lowline, paired Hoppers and separately sourced reservoir and damper. Set preload and landing behavior yourself.',approach:'hopper'}
];
const api={PLANS,FULL_KITS,profile,assertProfile,nativeMass};root.RRRHosts=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
