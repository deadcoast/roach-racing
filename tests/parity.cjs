const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const R=require('../src/race.js');
const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'../reference/wave04_python_reference.json')));
const rows=[];
for(const[k,c]of Object.entries(cases)){
 const i=c.input,r=new R.Race(i.course,i.entrants,i.equipment,i.dt).run();
 const events=r.events.map(e=>e.kind),expected=c.expected.events.map(e=>e.kind);
 const diffs=r.results.map(v=>{let e=c.expected.results.find(x=>x.id===v.id);return{id:v.id,time_delta:Math.abs(v.finish_time-e.finish_time),energy_delta:Math.abs(v.remaining_energy-e.remaining_energy),gates:v.gates===e.gates};});
 const pass=JSON.stringify(events)===JSON.stringify(expected)&&diffs.every(v=>v.time_delta<1e-6&&v.energy_delta<1e-6&&v.gates);
 rows.push({case:k,passed:pass,diffs,events:events.length,expected_events:expected.length});
 console.log(k,pass,diffs);
 assert(pass,JSON.stringify({k,events,expected,diffs}));
}
fs.writeFileSync(path.join(__dirname,'../evidence/parity_report.json'),JSON.stringify({scope:'JS port versus unchanged Python W04, six matched experiments; no claim of physical validity',tolerance:1e-6,cases:rows},null,2));
