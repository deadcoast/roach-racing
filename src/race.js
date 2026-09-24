/* RRR W05 browser port of W04.RACE.PATH2P5.v1.
 * Normalized path-space experiment, not limb/rigid-body physics.
 * Same time step, controller, shared energy, action and gate semantics.
 * Additive W05 contact geometry parameters default to exact W04 constants.
 */
(function(root){'use strict';
const EPS=1e-8,G=1;
const copy=x=>JSON.parse(JSON.stringify(x));
const req=(ok,msg)=>{if(!ok)throw new Error(msg);};
const finite=(v,key,min=0)=>req(typeof v==='number'&&Number.isFinite(v)&&v>=min,`Invalid ${key}`);
const clip=(v,a,b)=>Math.max(a,Math.min(b,v));
const mod=(x,n)=>((x%n)+n)%n;
function posePiece(p,d,lateral=0){const s=clip(d,0,p.length),h=p.heading+p.curvature*s;
 let x,y;if(Math.abs(p.curvature)<EPS){x=p.x+s*Math.cos(h);y=p.y+s*Math.sin(h);}
 else{x=p.x+(Math.sin(h)-Math.sin(p.heading))/p.curvature;y=p.y-(Math.cos(h)-Math.cos(p.heading))/p.curvature;}
 return [x-lateral*Math.sin(h),y+lateral*Math.cos(h),h];}
class Course{
 constructor(data){this.id=data.id;this.pieces=copy(data.pieces);this.laps=data.laps;req(this.pieces.length>0&&Number.isInteger(this.laps)&&this.laps>0,'Invalid course');
 req(new Set(this.pieces.map(p=>p.id)).size===this.pieces.length,'Duplicate track piece');
 this.ends=[];this.length=0;for(let i=0;i<this.pieces.length;i++){
  const p=this.pieces[i],b=this.pieces[(i+1)%this.pieces.length];
  for(const k of ['length','width','grip','resistance','ceiling'])finite(p[k],k);
  for(const k of ['curvature','x','y','heading'])finite(p[k],k,-Infinity);
  req(p.length>0&&p.width>0&&Math.abs(p.curvature)*p.width/2<.95,'Invalid track geometry');
  const [x,y,h]=posePiece(p,p.length);req(Math.hypot(x-b.x,y-b.y)<1e-6&&Math.abs(mod(h-b.heading+Math.PI,2*Math.PI)-Math.PI)<1e-6,'Disconnected course');
  this.length+=p.length;this.ends.push(this.length);
 }
 this.total=this.length*this.laps;this.gates=[];for(let l=0;l<this.laps;l++)for(const e of this.ends)this.gates.push(l*this.length+e);
 }
 locate(s){const q=mod(s,this.length);let start=0;for(let i=0;i<this.pieces.length;i++){if(q<this.ends[i]-EPS)return [this.pieces[i],q-start,i];start=this.ends[i];}const i=this.pieces.length-1;return[this.pieces[i],this.pieces[i].length,i];}
 pose(s,d=0){const[p,q]=this.locate(s);return posePiece(p,q,d);}
 clearance(s,distance,height){const n=Math.floor(distance/.05);for(let i=0;i<Math.max(2,n+1);i++){const[p]=this.locate(s+distance*i/Math.max(1,n));if(!p.jumpable||Math.abs(p.curvature)>EPS||p.ceiling<height)return false;}return true;}
 data(){return{id:this.id,laps:this.laps,length:this.length,pieces:copy(this.pieces)};}
}
function foundryCourse(straight=20,laps=2,grip=1.6){finite(straight,'straight');req(straight>=8&&straight<=30,'Course length outside profile');
 const recipe=[['Pack Run',straight/2,0],['Gutter Run',straight/2,0],['Drum Bend',1.5*Math.PI,1/3],['Service Run',6,0],['Drum Bend',1.5*Math.PI,1/3],['Pack Run',straight/2,0],['Gutter Run',straight/2,0],['Drum Bend',1.5*Math.PI,1/3],['Service Run',6,0],['Drum Bend',1.5*Math.PI,1/3]];
 const pieces=[];let x=0,y=0,h=0;recipe.forEach(([name,length,curvature],i)=>{const p={id:`W05.SECTION.${i}`,name,length,curvature,x,y,heading:h,width:2.4,grip,resistance:.15,jumpable:!curvature,ceiling:5};pieces.push(p);[x,y,h]=posePiece(p,length);});
 return new Course({id:`W05.FOUNDRY.S${straight}.G${grip}.v1`,pieces,laps});}
function build(data){const b=Object.assign({id:'entry',host_id:'HOST',name:'Workshop racer',component_ids:[],drive_source:'HOST.native_drive',hopper_source:null,mass:1,cadence:10,force:2,stride:.25,leverage:1,grip:1,delivery:3,efficiency:.75,reserve:120,width:.38,length:.62,height:.26,hopper:null,preload:.7,alignment_error:0,horn:false,claws:false,armor:'light',provenance:[]},copy(data));
 for(const k of ['mass','cadence','force','stride','leverage','grip','delivery','efficiency','reserve','width','length','height','preload','alignment_error'])finite(b[k],k);
 for(const k of ['release_delay','rough_grip','lateral_accel','correction_rate','settle','damping','impact_absorb','aero_drag','downforce','horn_impact'])if(b[k]!==undefined)finite(b[k],k);for(const k of ['damping','impact_absorb'])if(b[k]!==undefined)req(b[k]<=1,'Invalid '+k);req(['mass','cadence','force','stride','leverage','width','length'].every(k=>b[k]>0),'Nonpositive body or drive');req(b.efficiency>0&&b.efficiency<=1,'Invalid efficiency');req(new Set(b.component_ids).size===b.component_ids.length,'Duplicate fitted component');
 if(b.hopper)req(b.hopper.length===3&&b.hopper.every(Number.isFinite)&&b.hopper[0]>=0&&b.hopper[0]<=1&&b.hopper[1]>=0&&b.hopper[1]<=1&&b.hopper[2]>=0,'Invalid hopper');req(['light','medium','heavy'].includes(b.armor),'Invalid armor');return b;}
function runner(data){const b=build(data.build),r=Object.assign({build:b,policy:{passing:true,jumping:false,attacking:false,counter:false,preferred_line:0},s:0,d:0,v:0,energy:b.reserve,state:'run',timer:0,z:0,vz:0,cooldown:0,attack:null,attack_target:null,attack_due:0,action_charge:0,pass_target:null,pass_line:null,finish:null,next_gate:0,passed:[],distance:0},copy(data));r.build=b;r.policy=Object.assign({passing:true,jumping:false,attacking:false,counter:false,preferred_line:0},data.policy||{});req(r.s===0&&r.v===0,'Standing start required');req(r.energy>=0&&r.energy<=b.reserve,'Invalid reserve');r.id=b.id;return r;}
function legal(b,equipment){req(['open','speedsters','fireworks'].includes(equipment),'Unsupported event');return equipment==='speedsters'?!(b.horn||b.claws):equipment==='fireworks'?(b.horn||b.claws)&&b.armor==='light':true;}
const bFor=r=>r.build;
const pairs=list=>{const p=[];for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++)p.push([list[i],list[j]]);return p;};
// W08: pass completion uses wrapped course separation; an installed whole-body profile can
// take a bounded lateral walking step from rest. Lateral distance shares the powered movement
// budget, not a free teleport. Raw legacy entries keep the prior lateral-rate branch.
class Race{
 constructor(course,entrants,equipment='open',dt=.01){this.course=course instanceof Course?course:new Course(course);this.runners=entrants.map(runner).sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);const rs=this.runners;
 req(dt>=.001&&dt<=.025,'Invalid timestep');req(rs.length>0,'Empty race');const fittedIds=rs.flatMap(r=>r.build.component_ids);req(new Set(fittedIds).size===fittedIds.length,'One component fitted to multiple entrants');req(new Set(rs.map(r=>r.id)).size===rs.length&&new Set(rs.map(r=>r.build.host_id)).size===rs.length,'Duplicate entrant or host');
 for(const r of rs){const b=r.build;req(legal(b,equipment),'Illegal build capability');req(Math.abs(r.d)+b.width/2<this.course.pieces[0].width/2,'Outside start');req(this.course.pieces.every(p=>b.width<p.width),'Body cannot fit track');req(Math.sqrt((b.cadence*b.stride/b.leverage)**2+2*b.preload/b.mass)*dt<b.length/4,'Timestep too coarse');}
 for(const[a,b]of pairs(rs))req(Math.abs(a.d-b.d)>=(a.build.width+b.build.width)/2,'Overlapping start boxes');
 Object.assign(this,{dt,equipment,time:0,events:[],frames:[],_frame:0,_ahead:{},_last_pair_event:{}});this.capture();
 }
 emit(kind,r,payload={}){this.events.push(Object.assign({t:Math.round(this.time*1e6)/1e6,kind,runner:r.id},payload));}
 near(a,b){return mod(b.s-a.s+this.course.length/2,this.course.length)-this.course.length/2;}
 capture(){this.frames.push({t:Math.round(this.time*1e6)/1e6,runners:this.runners.map(r=>({id:r.id,s:r.s,d:r.d,z:r.z,v:r.v,energy:r.energy,state:r.state,finish:r.finish,gates:r.next_gate}))});}
 step(){const dt=this.dt,old=copy(this.runners),by=Object.fromEntries(this.runners.map(r=>[r.id,r])),oldid=Object.fromEntries(old.map(r=>[r.id,r]));
 for(const r of this.runners){if(r.finish!==null)continue;const o=oldid[r.id],b=r.build; r.cooldown=Math.max(0,r.cooldown-dt);const[p]=this.course.locate(o.s);
  const ahead=old.filter(q=>q.id!==o.id&&q.finish===null&&this.near(o,q)>0).sort((a,b)=>this.near(o,a)-this.near(o,b));
  const target=ahead.find(q=>this.near(o,q)<2&&Math.abs(q.d-o.d)<(q.build.width+o.build.width)/2+.1);
  if(o.state==='run'&&o.cooldown<=0&&o.attack===null){
   if(r.policy.counter&&b.claws){const threats=old.filter(q=>q.attack==='ram'&&q.attack_target===o.id&&Math.abs(this.near(o,q))<(b.claw_trigger||1.35)&&Math.abs(q.d-o.d)<.4&&q.z<o.build.height);if(threats.length){r.attack='claw';r.attack_target=threats[0].id;r.attack_due=this.time+(b.claw_delay||.10);this.emit('claw_windup',r,{target:r.attack_target});}}
   if(r.attack===null&&target&&r.policy.jumping&&b.hopper&&o.v>target.v+.15&&.58<this.near(o,target)&&this.near(o,target)<1.8){const[ret,phase]=b.hopper,useful=b.preload*ret*Math.max(0,1-phase-b.alignment_error),vz=Math.sqrt(useful/b.mass),air=2*vz/G,flight_v=Math.sqrt(o.v*o.v+useful/b.mass),corridor=Math.max(.2,flight_v)*air+o.build.length;
    if(r.energy>=b.preload&&useful>0&&this.course.clearance(o.s,corridor,vz*vz/(2*G)+b.height)){r.attack='jump';r.attack_due=this.time+.12;this.emit('jump_load',r,{source:b.hopper_source});}}
   if(r.attack===null&&target&&r.policy.attacking&&b.horn&&this.near(o,target)<(b.horn_trigger||1.2)){r.attack='ram';r.attack_target=target.id;r.attack_due=this.time+.18;this.emit('ram_windup',r,{target:target.id});}
  }
  if(o.state==='run'){let goal=r.policy.preferred_line;
   if(r.pass_target){const passed=oldid[r.pass_target];if(!passed||this.near(passed,o)>(o.build.length+passed.build.length)/2+.35||passed.finish!==null){r.pass_target=null;r.pass_line=null;}
    else{const clearance=(o.build.width+passed.build.width)/2+.10,side=r.pass_line>=passed.d?1:-1;goal=passed.d+side*clearance;r.pass_line=goal;}}
   if(target&&r.policy.passing&&r.attack===null&&r.pass_target===null){const clearance=(b.width+target.build.width)/2+.10,candidates=[target.d+clearance,target.d-clearance],valid=candidates.filter(d=>Math.abs(d)+b.width/2<p.width/2-.03&&old.every(q=>[r.id,target.id].includes(q.id)||Math.abs(this.near(o,q))>1||Math.abs(d-q.d)>(b.width+q.build.width)/2+.03));
    if(valid.length){goal=valid.sort((a,b)=>Math.abs(a-o.d)-Math.abs(b-o.d))[0];r.pass_target=target.id;r.pass_line=goal;}}
   const limit=Math.max(0,p.width/2-b.width/2-.025);goal=clip(goal,-limit,limit);const restStep=!!b.body_profile&&r.pass_target!==null&&o.v<EPS&&r.energy>EPS;const max_shift=(restStep?(b.correction_rate??.75):Math.min(b.correction_rate??.75,o.v*.55))*dt;r.d=o.d+clip(goal-o.d,-max_shift,max_shift);
  }
 }
 const draw=Object.fromEntries(this.runners.map(r=>[r.id,0]));for(const r of this.runners){if(r.finish!==null||r.attack===null)continue;const needed=r.attack==='jump'?r.build.preload:r.attack==='ram'?.10:.08,charge=Math.min(Math.max(0,needed-r.action_charge),.65*r.build.delivery*dt,r.energy);r.action_charge+=charge;r.energy-=charge;draw[r.id]=charge/dt;}
 const losses=Object.fromEntries(this.runners.map(r=>[r.id,0])),held=new Set(),cancelled=new Set();
 const due=this.runners.filter(r=>r.finish===null&&r.attack&&this.time+EPS>=r.attack_due&&r.action_charge+EPS>=(r.attack==='jump'?r.build.preload:r.attack==='ram'?.10:.08));
 for(const r of due){if(r.attack!=='claw')continue;const target=by[r.attack_target],o=oldid[r.id];const hit=!!(target&&target.finish===null&&Math.abs(this.near(o,oldid[target.id]))<(r.build.claw_reach||1.4)&&Math.abs(o.d-oldid[target.id].d)<.45&&oldid[target.id].z<r.build.height&&r.action_charge+EPS>=.08);r.action_charge=0;
  if(hit){held.add(r.id);held.add(target.id);cancelled.add(target.id);this.emit('claw_contact',r,{target:target.id,cancelled_action:target.attack});}else this.emit('claw_miss',r);r.attack=null;r.cooldown=2.5;}
 for(const r of due){if(cancelled.has(r.id)){r.attack=null;r.action_charge=0;r.cooldown=2;continue;}const o=oldid[r.id];
  if(r.attack==='jump'){if(r.action_charge+EPS>=r.build.preload&&r.build.hopper){const[ret,phase]=r.build.hopper,useful=r.build.preload*ret*Math.max(0,1-phase-r.build.alignment_error),vz=Math.sqrt(useful/r.build.mass),flight_v=Math.sqrt(r.v*r.v+useful/r.build.mass);
   if(useful>0&&this.course.clearance(r.s,Math.max(.2,flight_v)*2*vz/G+r.build.length,vz*vz/(2*G)+r.build.height)){r.v=flight_v;r.vz=vz;r.z=EPS;r.state='air';this.emit('takeoff',r,{source:r.build.hopper_source,useful_energy:useful});}}
   r.attack=null;r.action_charge=0;r.cooldown=3;
  }else if(r.attack==='ram'){const target=oldid[r.attack_target],hit=!!(target&&target.finish===null&&0<this.near(o,target)&&this.near(o,target)<(r.build.horn_reach||1.35)&&Math.abs(o.d+(r.build.horn_offset||0)-target.d)<.43&&o.z<.1&&target.z<o.build.height&&r.action_charge+EPS>=.10);r.action_charge=0;
   if(hit){const closing=Math.max(0,o.v-target.v),loss=Math.min(target.v,(.20+.55*closing)*(r.build.horn_impact??1));losses[target.id]+=loss;losses[r.id]+=.1;this.emit('ram_contact',r,{target:target.id,speed_loss:loss});}else this.emit('ram_miss',r);r.attack=null;r.cooldown=2;}
 }
 for(const r of this.runners){if(r.finish!==null)continue;const o=oldid[r.id],b=r.build,[p,q,pi]=this.course.locate(o.s);r.v=Math.max(0,r.v-losses[r.id]);if(held.has(r.id)){r.state='held';r.timer=.30;r.attack=null;r.action_charge=0;}let v1;
  if(r.state==='air'){r.z+=r.vz*dt-.5*G*dt*dt;r.vz-=G*dt;v1=Math.max(0,r.v-.025*dt);if(r.z<=0){r.z=0;r.vz=0;r.state='settling';r.timer=(b.settle??(b.hopper?b.hopper[2]:.18))*(1-(b.damping??0));this.emit('landing',r,{settle_duration:r.timer});}}
  else if(['held','settling'].includes(r.state)){v1=Math.max(0,r.v-.50*dt);r.timer-=dt;if(r.timer<=0){r.state='run';this.emit('recovered',r);}}
  else{const contactGrip=p.surface==='loose'?(b.rough_grip??b.grip):b.grip,cycle=1/b.cadence+(b.release_delay??0),free=(1/cycle)*b.stride/b.leverage,desired=b.force*b.leverage*Math.max(0,1-r.v/free),available=Math.min(Math.max(0,b.delivery-draw[r.id]),r.energy/dt),cap=(Math.sqrt(r.v*r.v+2*dt*b.efficiency*available/b.mass)-r.v)*b.mass/dt,drive=Math.min(desired,cap,p.grip*contactGrip*(b.mass*G+(b.downforce||0)*r.v*r.v));
   v1=Math.max(0,r.v+(drive-p.resistance-(b.aero_drag??0)*r.v*r.v)*dt/b.mass);const nextp=this.course.pieces[(pi+1)%this.course.pieces.length],brake=.85*p.grip*contactGrip*(G+(b.downforce||0)*r.v*r.v/b.mass);
   for(const[piece,distance]of [[p,0],[nextp,Math.max(0,p.length-q)]]){if(piece.curvature){const radius=1/Math.abs(piece.curvature)-Math.abs(r.d)*(piece.curvature>=0?1:-1),turn=Math.sqrt(Math.min(piece.grip*(piece.surface==='loose'?(b.rough_grip??b.grip):b.grip)*(G+(b.downforce||0)*r.v*r.v/b.mass),b.lateral_accel??Infinity)*radius),target_v=Math.sqrt(turn*turn+2*brake*distance);if(v1>target_v)v1=Math.max(target_v,r.v-brake*dt);}}
   const distance=(r.v+v1)*dt*.5,spend=drive*distance/b.efficiency;req(spend<=r.energy+1e-7&&spend<=b.delivery*dt+1e-7,'Power budget exceeded');r.energy=Math.max(0,r.energy-spend);
  }
  const motion=(r.v+v1)*dt*.5;if(b.body_profile){r.d=o.d+clip(r.d-o.d,-motion*.55,motion*.55);}const lateral=r.d-o.d,forward=Math.sqrt(Math.max(0,motion*motion-lateral*lateral)),metric=1-p.curvature*(o.d+r.d)/2;req(metric>0,'Invalid course metric');r.s=o.s+forward/metric;r.distance+=motion;r.v=v1;
 }
 for(const[a,b]of pairs(this.runners)){if(a.finish!==null||b.finish!==null)continue;const delta=this.near(a,b),leader=delta>=0?b:a,follower=delta>=0?a:b,sep=Math.abs(delta),len=(a.build.length+b.build.length)/2;
  if(sep<len&&Math.abs(a.d-b.d)<(a.build.width+b.build.width)/2&&Math.abs(a.z-b.z)<Math.max(a.build.height,b.build.height)){follower.s=Math.max(oldid[follower.id].s,follower.s-(len-sep));follower.v=Math.min(follower.v,leader.v);const key=[a.id,b.id].sort().join('|');if(this.time-(this._last_pair_event[key]??-999)>.5){this.emit('body_contact',follower,{target:leader.id});this._last_pair_event[key]=this.time;}}}
 for(const r of this.runners){if(r.finish!==null)continue;const o=oldid[r.id];while(r.next_gate<this.course.gates.length&&this.course.gates[r.next_gate]<=r.s+EPS){const gate=this.course.gates[r.next_gate],f=r.s>o.s?(gate-o.s)/(r.s-o.s):0,crossing=this.time+clip(f,0,1)*dt;r.passed.push({gate:r.next_gate,t:crossing});const ended=this.course.pieces[r.next_gate%this.course.pieces.length];r.next_gate++;if(ended.bump&&r.state==='run'&&r.next_gate<this.course.gates.length){r.state='settling';r.timer=(bFor(r).settle??.18)*(1-(bFor(r).damping??0))*ended.bump;r.v=Math.max(0,r.v-.08*ended.bump*(1-(bFor(r).impact_absorb??.4)));this.emit('seam_landing',r,{settle_duration:r.timer,section:ended.id});}
  if(r.next_gate===this.course.gates.length){r.finish=crossing;r.s=this.course.total;r.state='finished';this.emit('finish',r,{finish_time:crossing});}}
  req(r.energy>=-EPS&&Number.isFinite(r.s),'Invalid race state');}
 for(const[a,b]of pairs(this.runners)){if(a.finish!==null||b.finish!==null)continue;const diff=a.s-b.s,key=[a.id,b.id].join('|');if(Math.abs(diff)>.12){const sign=diff>0?1:-1;if(key in this._ahead&&this._ahead[key]!==sign){const passer=sign>0?a:b,passed=sign>0?b:a;this.emit('overtake',passer,{target:passed.id,airborne:passer.z>passed.build.height});}this._ahead[key]=sign;}}
 this.time+=dt;if(this.time+EPS>=this._frame*.08){this.capture();this._frame++;}
 }
 done(max=180){return this.time>=max||this.runners.every(r=>r.finish!==null);}
 result(){this.capture();const ranked=[...this.runners].sort((a,b)=>(a.finish===null)-(b.finish===null)||(a.finish===null?-a.s:a.finish)-(b.finish===null?-b.s:b.finish));let previous=null,place=0;
 const rows=ranked.map((r,i)=>{if(r.finish===null)place=null;else if(previous===null||Math.abs(r.finish-previous)>1e-7)place=i+1;previous=r.finish;return{place,id:r.id,host_id:r.build.host_id,name:r.build.name,finish_time:r.finish,gates:r.next_gate,required_gates:this.course.gates.length,remaining_energy:r.energy,build:copy(r.build)};});
 return{model:'W07.PATH2P5.parts.v1',scope:'Normalized W07 parts experiment: drive, leverage, contact, structural support, correction, compliance, damping and aero; not full limb physics',course:this.course.data(),equipment:this.equipment,dt:this.dt,results:rows,events:copy(this.events),frames:copy(this.frames)};
 }
 run(max=180){while(!this.done(max))this.step();return this.result();}
}
const api={Course,Race,foundryCourse,posePiece,build,runner,legal,copy,req,finite,clip};root.RRRRace=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
