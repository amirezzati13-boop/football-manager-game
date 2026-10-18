const fs=require('fs'), vm=require('vm'), assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function grab(name,next){const start=script.indexOf('function '+name+'(');if(start<0)throw Error('missing '+name);const end=script.indexOf('\nfunction '+next+'(',start+1);if(end<0)throw Error('missing next '+next);return script.slice(start,end)}
const funcs=grab('sortTeams','event')+'\n'+grab('resetTeamStats','swapTeamBetween')+'\n'+grab('swapTeamBetween','playoffWinner')+'\n'+grab('playoffWinner','playoffWinnerTwoLeg')+'\n'+grab('runSeasonMovement','homeHTML');
const countries=[{id:'IR',name:'Iran'},{id:'EN',name:'England'},{id:'ES',name:'Spain'},{id:'DE',name:'Germany'},{id:'IT',name:'Italy'},{id:'FR',name:'France'}];
const tiers=[1,2,3,4,5,6];
const groupsForTier=t=>Array.from({length:2**(t-1)},(_,i)=>`G${i+1}`);
const key=(c,t,g)=>`${c}_${t}_${g}`;
function build(){const state={season:1,leagues:{}};for(const c of countries)for(const t of tiers)for(const g of groupsForTier(t)){const teams=Array.from({length:16},(_,i)=>({id:`${c.id}-${t}-${g}-${i}`,name:`Club ${c.id}-${t}-${g}-${i}`,played:30,w:10,d:5,l:15,gf:30+i,ga:20,pts:100-i, country:c.id,tier:t,group:g}));state.leagues[key(c.id,t,g)]={teams,results:[]};}return state}
function makeCtx(preferLower){const state=build();const ctx={console,Math,countries,tiers,groupsForTier,key,state,event:()=>{},standingsFor:(c,t,g)=>ctx.sortTeams(state.leagues[key(c,t,g)]),sortTeams:teams=>teams.teams.slice().sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.name.localeCompare(b.name)),resetTeamStats:null,swapTeamBetween:null,playoffWinner:null};vm.createContext(ctx);vm.runInContext(funcs,ctx);ctx.playoffWinner=(a,b)=>preferLower?a:(a.tier>b.tier?a:b);return ctx}
// Scenario A: force lower-tier runners-up to win both knockout matches.
const promote=makeCtx(true);const before=new Map();for(const [k,l] of Object.entries(promote.state.leagues))before.set(k,l.teams.map(t=>t.id));promote.runSeasonMovement();
for(const c of countries)for(let t=1;t<6;t++)for(let gi=0;gi<groupsForTier(t).length;gi++){
 const ug=groupsForTier(t)[gi], lowerA=groupsForTier(t+1)[gi*2], lowerB=groupsForTier(t+1)[gi*2+1];
 const upper=promote.state.leagues[key(c.id,t,ug)].teams, lowA=promote.state.leagues[key(c.id,t+1,lowerA)].teams, lowB=promote.state.leagues[key(c.id,t+1,lowerB)].teams;
 const oldUpper=before.get(key(c.id,t,ug)), oldA=before.get(key(c.id,t+1,lowerA)), oldB=before.get(key(c.id,t+1,lowerB));
 assert(upper.some(x=>x.id===oldA[0]),`champion A promoted ${c.id} T${t} ${ug}`);assert(upper.some(x=>x.id===oldB[0]),`champion B promoted ${c.id} T${t} ${ug}`);
 assert(upper.some(x=>x.id===oldA[1]||x.id===oldB[1]),`one lower runner-up wins playoff ${c.id} T${t} ${ug}`);
 assert(!upper.some(x=>x.id===oldUpper[14]||x.id===oldUpper[15]),`15th/16th relegated ${c.id} T${t} ${ug}`);
}
// At the bottom tier there is no outgoing relegation: no teams disappear, and champions move only upward into tier 5.
for(const c of countries)for(const g of groupsForTier(6)){const ids=promote.state.leagues[key(c.id,6,g)].teams.map(t=>t.id);assert.equal(ids.length,16);}
// Scenario B: upper-tier 14th wins the final playoff; it remains in the upper group and no runner-up enters it.
const retain=makeCtx(false);const oldUpper14={};for(const c of countries)for(let t=1;t<6;t++)for(const g of groupsForTier(t)){oldUpper14[key(c.id,t,g)]=retain.state.leagues[key(c.id,t,g)].teams[13].id;}
retain.playoffWinner=(a,b)=>b.id.endsWith('-13')?b:a; // final playoff: choose upper 14th; first round: choose first runner-up
retain.runSeasonMovement();
for(const c of countries)for(let t=1;t<6;t++)for(const g of groupsForTier(t)){const ids=retain.state.leagues[key(c.id,t,g)].teams.map(x=>x.id);assert(ids.includes(oldUpper14[key(c.id,t,g)]),`14th retains when it wins final playoff ${key(c.id,t,g)}`)}
console.log('PASS: forced promotion scenario — champions replace 15th/16th and lower runner-up can win the single-match playoff');
console.log('PASS: forced retention scenario — upper-tier 14th stays when it wins the final single-match playoff');
console.log('PASS: lowest tier retains 16 clubs per group and has no lower tier to relegate into');
