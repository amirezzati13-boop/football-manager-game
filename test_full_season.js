const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function grab(name,next){const start=script.indexOf('function '+name+'(');if(start<0)throw Error('missing '+name);const end=script.indexOf('\nfunction '+next+'(',start+1);if(end<0)throw Error('missing next '+next);return script.slice(start,end)}
const functions=[
 grab('rng','newState'),grab('sortTeams','clubTeam'),grab('clubTeam','event'),grab('event','renderSelectors'),grab('startingPlayers','league'),grab('teamMatchProfile','calculateUserSubstitutions'),grab('calculateUserSubstitutions','sampleGoals'),grab('sampleGoals','simMatch'),grab('simMatch','weeklyWageCommitment'),grab('weeklyWageCommitment','projectedSeasonReserve'),grab('scheduledPairs','simulateWeek'),grab('simulateWeek','tableHTML'),grab('standingsFor','playoffWinner'),grab('playoffWinner','playoffWinnerTwoLeg'),grab('runSeasonMovement','homeHTML')
].join('\n');
const countries=[{id:'IR',name:'Iran'},{id:'EN',name:'England'},{id:'ES',name:'Spain'},{id:'DE',name:'Germany'},{id:'IT',name:'Italy'},{id:'FR',name:'France'}];
const tiers=[1,2,3,4,5,6];
const groupsForTier=t=>Array.from({length:2**(t-1)},(_,i)=>`G${i+1}`);
const key=(c,t,g)=>`${c}_${t}_${g}`;
const state={tactics:{formation:'4-2-3-1',style:'متعادل',positions:{},lineup:[]},season:1,week:0,country:'IR',tier:4,group:'G1',leagues:{},squad:[],staff:{},cash:100000000,attendance:1000,ticketPrice:5,accruedWages:0,seasonWagesAccrued:0,seasonTicketIncome:0,seasonTransferIncome:0,seasonTransferCosts:0,wageShortfall:0,dismissalShortfall:0,transferRestricted:false,events:[],history:[],loans:[]};
for(const c of countries)for(const t of tiers)for(const g of groupsForTier(t)){
 const teams=Array.from({length:16},(_,i)=>({id:`${c.id}-${t}-${g}-${i}`,name:`Club ${c.id}-${t}-${g}-${i}`,played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0,isHuman:false}));
 if(c.id==='IR'&&t===4&&g==='G1'){teams[0].id='USER_CLUB';teams[0].isHuman=true;teams[0].name='باشگاه شما'}
 state.leagues[key(c.id,t,g)]={teams,results:[]};
}
const ctx={console,Math,assert,countries,tiers,groupsForTier,key,state,rng:null,render:()=>{},save:()=>{},processLoans:()=>{},event(text,type='info'){state.events.unshift({text,type,week:state.week,season:state.season})},num:x=>String(x),money:x=>String(x),localStorage:{setItem(){}},initialCash:100000000};
vm.createContext(ctx);vm.runInContext(functions,ctx);
// Fixture audit: every team plays once per round; every unordered pair occurs once in each half, with home venue reversed.
const firstHalf=[];
for(let w=0;w<15;w++){const pairs=ctx.scheduledPairs(w);assert.equal(pairs.length,8);assert.equal(new Set(pairs.flat()).size,16);firstHalf.push(pairs.map(([a,b])=>`${Math.min(a,b)}-${Math.max(a,b)}`).sort().join('|'));}
assert.equal(new Set(firstHalf.flatMap(x=>x.split('|'))).size,120,'all 120 unique pairings in first half');
for(let w=0;w<15;w++){const a=ctx.scheduledPairs(w),b=ctx.scheduledPairs(w+15);assert.equal(a.length,b.length);for(const [x,y] of a){assert(b.some(([u,v])=>u===y&&v===x),'second half must reverse home/away') }}
const totalTeams=Object.values(state.leagues).reduce((s,l)=>s+l.teams.length,0);assert.equal(totalTeams,6048);
for(let w=0;w<30;w++){ctx.simulateWeek();assert.equal(state.week,w+1);}
for(const [k,l] of Object.entries(state.leagues)){
 assert.equal(l.results.length,240,`${k} has 240 match records`);
 for(const t of l.teams){assert.equal(t.played,30,`${k}/${t.id} played 30`);assert.equal(t.w+t.d+t.l,30,`${k}/${t.id} WDL sum`);assert.equal(t.pts,3*t.w+t.d,`${k}/${t.id} points calculation`);assert.equal(t.gf>=0&&t.ga>=0,true)}
}
const user=ctx.clubTeam();assert.equal(user.id,'USER_CLUB');assert.equal(user.played,30);
const beforeIDs=Object.values(state.leagues).flatMap(l=>l.teams.map(t=>t.id));assert.equal(new Set(beforeIDs).size,6048);
const movementLogs=ctx.runSeasonMovement();
const after=Object.values(state.leagues).flatMap(l=>l.teams);assert.equal(after.length,6048);assert.equal(new Set(after.map(t=>t.id)).size,6048);
for(const [k,l] of Object.entries(state.leagues)){assert.equal(l.teams.length,16,k);assert.equal(l.results.length,0,k+' results cleared');for(const t of l.teams){assert.equal(t.played,0);assert.equal(t.pts,0)}}
assert.equal(ctx.clubTeam().id,'USER_CLUB','human club identity preserved across season');
state.season++;state.week=0;assert.equal(state.season,2);assert.equal(state.week,0);
console.log('PASS fixture schedule: 30 rounds, 8 matches/group/round, all pairings once per half and reversed venues');
console.log('PASS full season: 30 rounds simulated across 378 groups / 90,720 matches');
console.log('PASS standings: every club played 30, W+D+L=30, points=3W+D');
console.log('PASS season transition: 6,048 club identities preserved, 378 groups stay at 16, results and stats reset, human club identity preserved');
console.log('Movement events: '+movementLogs.length);
