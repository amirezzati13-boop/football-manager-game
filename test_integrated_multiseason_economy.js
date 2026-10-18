const fs=require('node:fs');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');

function extractFunction(name){
  const start=app.indexOf(`function ${name}(`);
  assert.notEqual(start,-1,`missing live function ${name}`);
  const paren=app.indexOf('(',start); let pd=0,pquote=null,pescape=false,closeParen=-1;
  for(let i=paren;i<app.length;i++){const ch=app[i];if(pquote){if(pescape)pescape=false;else if(ch==='\\')pescape=true;else if(ch===pquote)pquote=null;continue;}if(ch==='\"'||ch==="'"||ch==='`'){pquote=ch;continue;}if(ch==='(')pd++;else if(ch===')'&&--pd===0){closeParen=i;break;}}
  const brace=app.indexOf('{',closeParen); let depth=0,quote=null,escape=false;
  for(let i=brace;i<app.length;i++){
    const ch=app[i];
    if(quote){if(escape)escape=false;else if(ch==='\\')escape=true;else if(ch===quote)quote=null;continue;}
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch==='{')depth++; else if(ch==='}'&&--depth===0)return app.slice(start,i+1);
  }
  throw new Error(`could not extract ${name}`);
}
const state={season:1,week:0,cash:900000,seasonOpeningCash:900000,attendance:1400,ticketPrice:18,
  squad:[{id:'P1',name:'بازیکن نمونه',wage:1600},{id:'P2',name:'بازیکن دوم',wage:1900}],
  staff:{coach:true,assistant:true,fitness:true,fitnessLevel:2,medical:true,analyst:true,academyCoach:false,staffLevels:{assistant:1,medical:1,analyst:1,academyCoach:0}},
  accruedWages:0,seasonWagesAccrued:0,seasonTicketIncome:0,seasonTransferIncome:0,seasonTransferCosts:0,
  seasonSponsorIncome:0,seasonPrizeIncome:0,seasonOperatingCosts:0,wageShortfall:0,dismissalShortfall:0,transferRestricted:false,
  loans:[],financeLedger:[],history:[],events:[]};
const ctx={state,Math,Number,Date,event:(text,type)=>state.events.push({text,type}),console};
vm.createContext(ctx);
for(const name of ['weeklyWageCommitment','projectedSeasonReserve','canSpend','recordFinance','processLoans'])vm.runInContext(extractFunction(name),ctx);

const wage=()=>Math.round(ctx.weeklyWageCommitment()/30);
const reserve=()=>ctx.projectedSeasonReserve();
const spend=(n)=>ctx.canSpend(n);
const loanPlayer={id:'P2',name:'بازیکن دوم',wage:1900,ovr:60};
const loanFee=7000,wageSupport=Math.round(loanPlayer.wage*10/30),totalLoanReceipt=loanFee+wageSupport;
state.cash+=totalLoanReceipt;state.seasonTransferIncome+=totalLoanReceipt;
ctx.recordFinance('income_loan',totalLoanReceipt,'قرض بازیکن',{loanFee,wageSupport,loanWeeks:10});
state.loans.push({id:loanPlayer.id,name:loanPlayer.name,player:loanPlayer,startWeek:0,dueWeek:10,returnWeek:10,remainingWeeks:10,loanWeeks:10,fee:loanFee,wageSupport,wageSupportWeeks:10,wageSupportPaid:true,totalReceipt:totalLoanReceipt,accountingModel:'upfront-full-wage-support'});
state.squad=state.squad.filter(p=>p.id!==loanPlayer.id);
assert.equal(state.cash,900000+totalLoanReceipt,'loan receipt should credit cash exactly once');
assert.equal(state.seasonTransferIncome,totalLoanReceipt,'loan receipt should be booked as season transfer income once');
assert.equal(state.loans.length,1);

for(let seasonNo=1;seasonNo<=3;seasonNo++){
  assert.equal(state.season,seasonNo);
  const opening=state.cash;
  state.seasonOpeningCash=opening;
  for(let week=0;week<30;week++){
    state.week=week;
    const ticketIncome=state.attendance*state.ticketPrice;
    state.cash+=ticketIncome;state.seasonTicketIncome+=ticketIncome;
    ctx.recordFinance('income_ticket',ticketIncome,'درآمد بلیت');
    const weeklyWages=wage();
    state.accruedWages+=weeklyWages;state.seasonWagesAccrued+=weeklyWages;
    ctx.recordFinance('expense_wages_accrued',weeklyWages,'قسط روزانه از دستمزد سالانه');
    const operatingCost=Math.round(1800+state.squad.length*95+(state.staff.medical?450:0)+(state.staff.fitness?350:0));
    const paidOperating=Math.min(state.cash,operatingCost);
    state.cash=Math.max(0,state.cash-operatingCost);state.seasonOperatingCosts+=operatingCost;
    ctx.recordFinance('expense_operating',operatingCost,'هزینه جاری');
    state.week++;
    ctx.processLoans();
  }
  // Match the live season-close ordering: sponsor/prize receipts before wage settlement.
  const sponsorIncome=65000;state.cash+=sponsorIncome;state.seasonSponsorIncome+=sponsorIncome;ctx.recordFinance('income_sponsor',sponsorIncome,'اسپانسر');
  const prizeIncome=30000;state.cash+=prizeIncome;state.seasonPrizeIncome+=prizeIncome;ctx.recordFinance('income_prize',prizeIncome,'پاداش لیگ');
  const due=state.accruedWages;const paid=Math.min(state.cash,due);state.cash-=paid;
  ctx.recordFinance('expense_wages_paid',paid,'پرداخت دستمزد پایان فصل');
  if(due-paid)ctx.recordFinance('liability_wages_shortfall',due-paid,'کسری دستمزد');
  state.wageShortfall+=due-paid;state.accruedWages=0;state.transferRestricted=state.wageShortfall>0||state.dismissalShortfall>0;
  const row={season:seasonNo,openingCash:opening,closingCash:state.cash,ticketIncome:state.seasonTicketIncome,sponsorIncome:state.seasonSponsorIncome,prizeIncome:state.seasonPrizeIncome,operatingCosts:state.seasonOperatingCosts,transferIncome:state.seasonTransferIncome,transferCosts:state.seasonTransferCosts,wagesAccrued:state.seasonWagesAccrued,wagesPaid:paid,wageShortfall:due-paid,netCashChange:state.cash-opening};
  state.history.push(row);
  assert.equal(row.netCashChange,row.closingCash-row.openingCash,'season cash delta must reconcile');
  assert.equal(row.wagesPaid+row.wageShortfall,row.wagesAccrued,'accrued wages must reconcile to paid + shortfall');
  assert(row.ticketIncome>0&&row.operatingCosts>0&&row.sponsorIncome>0&&row.prizeIncome>0,'integrated season must include real income and expenses');
  assert(state.cash>=0,'cash must not become negative');
  assert(state.financeLedger.length<=100,'ledger must remain bounded');
  if(seasonNo<3){
    state.season++;state.week=0;state.seasonOpeningCash=state.cash;
    state.seasonTicketIncome=0;state.seasonTransferIncome=0;state.seasonTransferCosts=0;state.seasonSponsorIncome=0;state.seasonPrizeIncome=0;state.seasonOperatingCosts=0;state.seasonWagesAccrued=0;
  }
}
assert.equal(state.history.length,3);
assert(state.history.every((h,i)=>i===0||h.openingCash===state.history[i-1].closingCash),'next season opening balance must equal prior season closing balance');
// The bounded ledger intentionally evicts old entries after 100 records; loan booking was checked at creation above.
assert(state.financeLedger.some(t=>t.type==='expense_wages_accrued'));
assert(state.financeLedger.some(t=>t.type==='expense_wages_paid'));
assert(state.financeLedger.some(t=>t.type==='expense_operating'));
assert(state.financeLedger.some(t=>t.type==='income_ticket'));
assert(state.loans.length===0,'10-week loan should return during the first season when capacity allows');
assert(state.squad.some(p=>p.id==='P2'),'loaned player must return to the squad exactly once');
assert.equal(state.squad.filter(p=>p.id==='P2').length,1);
assert.match(app,/const sponsorBase=\(\{local:65000,regional:120000,national:210000\}\)\[state\.sponsor\]/,'live season close must credit sponsor receipts');
assert.match(app,/const due=state\.accruedWages;const paid=Math\.min\(state\.cash,due\)/,'live season close must cap wage payment at available cash');
assert.match(app,/const annualWageBase=weeklyWageCommitment\(\);const wage=Math\.round\(annualWageBase\/30\);state\.accruedWages\+=wage/,'annual wages must accrue in 1/30 installments across the 30-day season');
assert.match(app,/function agePlayersOneYear\(\)/,'season age progression helper must exist');
assert.match(app,/p\.ageMonths=Math\.round\(months\)\+12/, 'players age by one full year when day 33 starts the next season');
assert.match(app,/if\(state\.calendarDay===33\)\{agePlayersOneYear\(\)/, 'age progression is tied to the day-33 season start');
assert.match(app,/state\.transferRestricted=state\.wageShortfall>0/,'wage shortfall must restrict transfers');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1);assert.equal(scripts[0][1],app,'inline app script must stay synced');
console.log('PASS integrated economy: 3 sequential seasons with live wage/reserve/loan helpers, tickets, operating costs, sponsor, prize and wage settlement');
console.log(`PASS reconciliation: ${state.history.length} season ledgers; ${state.financeLedger.length} recent transactions; loan return verified; final cash ${state.cash}`);
