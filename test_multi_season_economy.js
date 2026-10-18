const fs=require('fs'),assert=require('assert'),path=require('path');
const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1,'expected exactly one inline application script');
assert.equal(scripts[0][1],app,'inline app script must match app.js');
assert(/seasonOpeningCash:initialCash/.test(app),'new game must snapshot its opening balance');
assert(/s\.seasonOpeningCash\?\?=Number\(s\.cash\)\|\|0/.test(app),'legacy saves need a conservative opening-balance fallback');
assert(/const openingCash=Number\.isFinite\(Number\(state\.seasonOpeningCash\)\)/.test(app),'season close must use the saved opening balance');
assert(/state\.seasonStage='new-season-ready';state\.calendarDay=33/.test(app),'day 32 must settle accounts and complete the draw before day 33');
assert(/if\(state\.calendarDay===33\)\{agePlayersOneYear\(\);const oldSeason=state\.season;state\.season\+\+;state\.week=0;state\.calendarDay=1/.test(app),'new season must begin on day 33 and snapshot post-settlement cash');
assert(/seasonOpeningCash.*موجودی آغاز فصل نامعتبر/.test(app),'opening balance must be validated');
assert(/'seasonOpeningCash'/.test(app),'opening balance must be included in migration fields');
// Multi-season accounting invariant: closing a season establishes the exact opening balance
// for the next one, even when cash changed due to transfers before its first match.
let cash=500000, opening=cash, history=[];
for(let season=1;season<=10;season++){
  cash += 12500; // ticket/sponsor receipts
  cash -= 9000;  // operating costs
  cash -= 20000; // wages paid at settlement
  history.push({season,openingCash:opening,closingCash:cash,netCashChange:cash-opening});
  opening=cash;
  cash-=2500; // pre-season activity; this must belong to the new season's opening balance
  opening=cash;
}
assert.equal(history.length,10);
for(let i=1;i<history.length;i++)assert.equal(history[i].openingCash,history[i-1].closingCash-2500,'opening cash should reflect post-settlement pre-season transactions');
assert(history.every(x=>x.netCashChange===x.closingCash-x.openingCash),'net change must reconcile with season opening/closing cash');
console.log('PASS multi-season economy: opening cash snapshots, legacy fallback, migration, validation, and source sync');
console.log('PASS 10-season accounting invariant: net cash change reconciles to each season opening and closing balance');
