
(()=> {
const countries=[{id:'IR',name:'ایران',clubs:['باشگاه شما','سپیدرود شمال','پارس‌نوین','ستاره کویر','دریای جنوب','شاهین البرز','آریا خوزستان','آذرخش تبریز','طلوع مشهد','پیکان شرق','کاوه اصفهان','سپهر کرمان','نیروی زاگرس','ساحل انزلی','فولاد دماوند','پیشرو قم']},
{id:'EN',name:'انگلستان',clubs:['Northbridge FC','Kingsford Town','Redwich Athletic','Westmoor United','Ashbury City','Riverside FC','Eastport Albion','Crownfield','Oakchester','Millford Rovers','Brightwell','Stonebridge','Lakeside FC','Newbury Town','Fairhaven','Blackmere']},
{id:'ES',name:'اسپانیا',clubs:['Atlético del Norte','Real Bahía','Unión Verde','Deportivo Sol','Ciudad Roja','Mar Azul','Valle CF','Montaña Club','Racing Central','Estrella Sur','Puerto Real','Villa Nueva','Costa Alta','San Aurelio','Campo FC','Nueva Corona']},
{id:'DE',name:'آلمان',clubs:['SV Nordtal','FC Linden','Rot-Weiss Hafen','TSV Bergheim','Eintracht Wald','Blau Stern','Viktoria Süd','Union Feld','Dynamo Mitte','Fortuna See','Sportfreunde West','SC Morgen','Grünstadt','Hansa Höhen','Borussia Tal','Waldhof']},
{id:'IT',name:'ایتالیا',clubs:['Aurora Calcio','Real Monti','AC Marina','Sportiva Verde','Città Nuova','Virtus Est','Lazio Collina','Porto Rosso','Atletico Valle','San Pietro','Rinascita FC','Unione Lago','Stella Bianca','Castello Calcio','Olimpia Sud','Borgo United']},
{id:'FR',name:'فرانسه',clubs:['AS Montclair','FC Rivière','Étoile du Port','Union Belleville','Sporting Valois','Olympique Nord','Racing des Pins','Stade Lumière','AC Fontaine','FC des Collines','Villefranche','Redon Athletic','Saint-Clair','Mont-Rouge','Port Soleil','Boisvert FC']}];
const tiers=[1,2,3,4,5,6], groupsByTier={1:1,2:2,3:4,4:8,5:16,6:32}, initialCash=1250000;
function groupsForTier(t){return Array.from({length:groupsByTier[t]||0},(_,i)=>`G${i+1}`)}
function allGroupEntries(){return tiers.flatMap(t=>groupsForTier(t).map(g=>({tier:t,group:g})));}
let state;
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('fa-IR',{maximumFractionDigits:0}).format(Math.round(n))+' ₼';
const num=n=>new Intl.NumberFormat('fa-IR').format(n);
function rng(seed){let x=Math.sin(seed*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function key(c,t,g){return `${c}_${t}_${g}`}
function makeLeague(c,t,g){
 const base=countries.find(x=>x.id===c).clubs;
 const teams=Array.from({length:16},(_,i)=>{const isUser=c==='IR'&&t===4&&g==='G1'&&i===0;return {id:isUser?'USER_CLUB':`${c}-${t}-${g}-${i}`,name:isUser?'باشگاه شما':`${base[(i+(t-1)*3+(Number(g.slice(1))-1)*5)%16]} ${t>1?`(${t})`:''} ${g}`.trim(),isHuman:isUser,accountId:isUser?'LOCAL_MANAGER':null,played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}});
 return {teams,results:[]};
}
function newState(){
 let leagues={};
 for(const c of countries)for(const t of tiers)for(const g of groupsForTier(t))leagues[key(c.id,t,g)]=makeLeague(c.id,t,g);
 const squad=Array.from({length:20},(_,i)=>({id:'P'+(i+1),name:['امیر رضایی','سامان کریمی','مهدی نادری','آرمان حسینی','پارسا محمدی','کیان احمدی','بردیا جعفری','علی مرادی','طاها اکبری','سینا کاظمی','یاسین صادقی','آریا موسوی','محمد امینی','رادین عباسی','اشکان رحیمی','پویا صالحی','امیرعلی رستمی','عرفان حیدری','ماهان یوسفی','شایان قاسمی'][i],age:18+(i%13),ovr:48+(i%25),potential:60+(i%40),position:['GK','CB','FB','DM','CM','AM','W','ST'][i%8],wage:1200+(i%6)*250,fitness:100,innateTalent:['رهبر','تمام‌کننده','پاسور','جنگنده','واکنش سریع'][i%5],earnedTalents:[]}));
 return {tactics:{formation:'4-2-3-1',style:'متعادل',positions:{},lineup:[]},season:1,week:0,calendarDay:1,seasonStage:'league',postseasonMoves:[],cash:initialCash,seasonOpeningCash:initialCash,attendance:1400,ticketPrice:18,seasonTicketIncome:0,seasonTransferIncome:0,seasonTransferCosts:0,sponsor:'local',seasonSponsorIncome:0,seasonPrizeIncome:0,seasonOperatingCosts:0,seasonWagesAccrued:0,accruedWages:0,wageShortfall:0,transferRestricted:false,rewardBoxes:1,boxes:{normal:1,rare:0,epic:0,legendary:0},inventory:{gold:0,energy:3,puzzlePieces:{}},achievements:{firstWin:false,tenWins:false,leagueChampion:false,cupChampion:false,openBoxes:0},dailyTasks:{playWeek:0,openBox:0,train:0},leagues,squad,academy:Array.from({length:30},(_,i)=>({id:'A'+(i+1),name:'استعداد '+(i+1),age:16+(i%6),ovr:20+(i%40),potential:45+(i%56),position:['GK','CB','FB','DM','CM','AM','W','ST'][i%8],innateTalent:['استعداد خام','سرعتی','تکنیکی','جنگنده'][i%4],earnedTalents:[]})),offers:[],loans:[],market:[{id:'M1',name:'بازیکن آزاد ۱',age:22,ovr:58,potential:68,position:'CM',fee:85000,wage:2200},{id:'M2',name:'بازیکن آزاد ۲',age:19,ovr:51,potential:82,position:'ST',fee:62000,wage:1800},{id:'M3',name:'بازیکن آزاد ۳',age:27,ovr:64,potential:65,position:'CB',fee:115000,wage:2800}],staff:{coach:false,assistant:false,fitness:false,fitnessLevel:0,medical:false,analyst:false,academyCoach:false,staffLevels:{assistant:0,medical:0,analyst:0,academyCoach:0},coachProfile:null},cup:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},cups:{IR:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},EN:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},ES:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},DE:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},FR:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false},IT:{round:1,done:[],champion:null,teams:[],matches:[],initialized:false}},ucl:{initialized:false,leagueRound:0,teams:[],leagueMatches:[],table:[],playoffMatches:[],playoffDone:false,bracket:{},champion:null,history:[]},events:[{text:'بازی جدید آغاز شد؛ جهان فوتبال ساخته شد.',type:'info'}],tab:'home',country:'IR',tier:4,group:'G1',history:[]};
}
function save(){
 try{
  validateState(state);
  const serialized=JSON.stringify(state);
  const current=localStorage.getItem('fm_final_state');
  // Keep the last known-good snapshot before replacing the primary save.
  if(current&&current!==serialized){
   try{const previous=JSON.parse(current);validateState(previous);localStorage.setItem('fm_final_state_backup',current)}catch(_){/* never replace a good backup with a corrupt snapshot */}
  }
  localStorage.setItem('fm_final_state',serialized);
  try{localStorage.setItem('fm_save_meta',JSON.stringify({version:46,savedAt:new Date().toISOString(),bytes:serialized.length,season:state.season,week:state.week}))}catch(_){/* metadata is optional */}
 }catch(e){event('ذخیره‌سازی انجام نشد؛ فضای مرورگر یا اعتبار داده‌ها را بررسی کنید. '+(e?.message||''),'warn')}
}
function validateState(s){
 if(!s||typeof s!=='object'||Array.isArray(s))throw Error('ساختار ذخیره معتبر نیست.');
 if(!s.leagues||typeof s.leagues!=='object'||Object.keys(s.leagues).length!==378)throw Error('ساختار لیگ‌ها باید ۳۷۸ گروه داشته باشد.');
 for(const c of countries)for(const t of tiers)for(const g of groupsForTier(t)){
  const k=key(c.id,t,g),l=s.leagues[k];
  if(!l||!Array.isArray(l.teams)||l.teams.length!==16)throw Error(`ظرفیت لیگ ${k} باید ۱۶ تیم باشد.`);
  if(l.teams.some(team=>!team||typeof team.id!=='string'||typeof team.name!=='string'))throw Error(`اطلاعات تیم در ${k} ناقص است.`);
  if(new Set(l.teams.map(team=>team.id)).size!==l.teams.length)throw Error(`شناسهٔ تکراری در لیگ ${k} وجود دارد.`);
 }
 if(!Array.isArray(s.squad)||s.squad.length>32||s.squad.some(p=>!p||typeof p.id!=='string'||typeof p.name!=='string'))throw Error('فهرست تیم اصلی نامعتبر است.');
 if(new Set(s.squad.map(p=>p.id)).size!==s.squad.length)throw Error('شناسهٔ بازیکن تکراری در فهرست اصلی وجود دارد.');
 if(!Array.isArray(s.academy)||s.academy.length>30||s.academy.some(p=>!p||typeof p.id!=='string'||typeof p.name!=='string'))throw Error('فهرست آکادمی نامعتبر است.');
 if(!Number.isFinite(Number(s.cash))||!Number.isInteger(Number(s.week))||s.week<0||s.week>30)throw Error('موجودی یا شماره هفته نامعتبر است.');
 if(s.calendarDay!==undefined&&(!Number.isInteger(Number(s.calendarDay))||Number(s.calendarDay)<1||Number(s.calendarDay)>33))throw Error('روز تقویم فصل باید بین ۱ و ۳۳ باشد.');
 if(!Number.isInteger(Number(s.season))||Number(s.season)<1)throw Error('شماره فصل نامعتبر است.');
 if(s.seasonOpeningCash!==undefined&&!Number.isFinite(Number(s.seasonOpeningCash)))throw Error('موجودی آغاز فصل نامعتبر است.');
 // Validate optional newer subsystems without rejecting legacy saves that omit them.
 for(const field of ['market','offers','loans','financeLedger','history','events']){
  if(s[field]!==undefined&&!Array.isArray(s[field]))throw Error(`ساختار ${field} نامعتبر است.`);
 }
 if(Array.isArray(s.market)&&s.market.some(p=>!p||typeof p.id!=='string'||typeof p.name!=='string'))throw Error('فهرست بازار نامعتبر است.');
 if(Array.isArray(s.loans)){
  const loanIds=new Set();
  for(const loan of s.loans){
   if(!loan||!loan.player||typeof loan.player.id!=='string'||!Number.isInteger(Number(loan.remainingWeeks))||Number(loan.remainingWeeks)<0||!Number.isFinite(Number(loan.totalReceipt??0)))throw Error('رکورد قرض بازیکن نامعتبر است.');
   if(loanIds.has(loan.player.id))throw Error('یک بازیکن در چند رکورد قرض ثبت شده است.');
   loanIds.add(loan.player.id);
  }
 }
 if(Array.isArray(s.financeLedger)){
  if(s.financeLedger.length>100)throw Error('دفتر مالی بیش از سقف مجاز ۱۰۰ تراکنش دارد.');
  for(const tx of s.financeLedger)if(!tx||typeof tx.type!=='string'||!Number.isFinite(Number(tx.amount))||!Number.isFinite(Number(tx.season))||!Number.isFinite(Number(tx.week)))throw Error('تراکنش دفتر مالی نامعتبر است.');
 }
 if(s.inventory!==undefined&&(!s.inventory||typeof s.inventory!=='object'||!Number.isFinite(Number(s.inventory.gold??0))||Number(s.inventory.gold??0)<0||!Number.isFinite(Number(s.inventory.energy??0))||Number(s.inventory.energy??0)<0))throw Error('موجودی آیتم‌ها نامعتبر است.');
 return true;
}
function systemHTML(){return `<h3>وضعیت داده‌های ذخیره‌شده</h3><div class="subgrid"><div class="stat"><small>کشورها</small><strong>۶</strong></div><div class="stat"><small>سطوح لیگ</small><strong>۶</strong></div><div class="stat"><small>گروه‌ها</small><strong>۳۷۸</strong></div><div class="stat"><small>جایگاه باشگاهی</small><strong>۶۰۴۸</strong></div></div><h3>قواعد پیاده‌سازی‌شده</h3><ul><li>لیگ ۱۶ تیمی و رفت‌وبرگشت؛ ۳۰ هفته برای هر تیم.</li><li>امتیاز لیگ ۳/۱/۰؛ موتور مسابقه بر پایهٔ قدرت نسبی، پست‌های بازیکنان باشگاه شما، سبک/آرایش تاکتیکی و امتیاز میزبانی با نوسان بذرپذیر.</li><li>صعود/سقوط و پلی‌آف در روز ۳۱؛ تسویه و قرعه‌کشی روز ۳۲؛ شروع فصل جدید در روز ۳۳.</li><li>دستمزد سالانه به‌صورت ۱/۳۰ در ۳۰ هفتهٔ لیگ انباشته می‌شود؛ تسویه روز ۳۲ و افزایش سن یک‌ساله در آغاز روز ۳۳ انجام می‌شود.</li><li>بازیکن آزاد نمونه، ارتقای آکادمی، استخدام محدود کادر و فروش بازیکن در پنجره‌های مشخص.</li></ul><h3>ماژول‌های ناقص</h3><p class="note">مذاکرهٔ چندمرحله‌ای کامل، رقابت قاره‌ای ۳۶ تیمی، امکانات باشگاه، مدیریت فعال‌سازی سطح‌های پایین‌تر، حساب آنلاین و نسخهٔ Android در این نمونه کامل نشده‌اند. اقتصاد زنده هنوز به آزمون چندفصلی و تنظیم تعادل نیاز دارد. قرض بازیکن در نمونه وجود دارد، اما هزینه و حقوق قرض‌گیرنده هنوز با همهٔ قواعد نهایی تطبیق داده نشده است. جام حذفی سراسری با حضور همهٔ ۱٬۰۰۸ باشگاه هر کشور از شش سطح لیگ اجرا می‌شود؛ دسته‌های پایین‌تر شروع می‌کنند و دسته‌های بالاتر مرحله‌به‌مرحله وارد می‌شوند.</p><h3>دروازهٔ تحویل نسخهٔ نهایی</h3><ul><li>ذخیرهٔ محلی، بازیابی JSON، لیگ، جام، نقل‌وانتقال و دفتر مالی در نمونهٔ وب موجودند.</li><li>قواعد پلی‌آف، مدل اقتصادی زنده، هزینهٔ قرض‌گیرنده و رقابت قاره‌ای هنوز نیازمند تطبیق و آزمون‌اند.</li><li>پیش از انتشار: آزمون تعاملی در مرورگر، آزمون روی دستگاه اندروید، و آزمون چندفصلی موتور زنده الزامی است.</li></ul><p class="note">این بخش وضعیت فعلی را شفاف می‌کند؛ موارد ناقص به‌عنوان قابلیت نهایی معرفی نمی‌شوند.</p><h3>فناوری و کتابخانه‌ها</h3><ul><li>HTML5، CSS و JavaScript خام؛ یک فایل مستقل.</li><li>بدون کتابخانه خارجی یا CDN؛ اعداد فارسی با Intl.NumberFormat.</li><li>ذخیره محلی با اعتبارسنجی، نسخهٔ پشتیبان خودکار قبلی در <code>fm_final_state_backup</code> و بازیابی خودکار از پشتیبان معتبر در صورت خرابی فایل اصلی.</li><li>پشتیبان JSON برای انتقال/نگهداری دستی ذخیره.</li><li>این نسخه APK نیست و همگام‌سازی ابری ندارد.</li></ul><p class="note">برای انتقال بازی، ابتدا پشتیبان‌گیری کنید. بازیابی فایل JSON با ساختار معتبر را می‌پذیرد و پیش از جایگزینی، ظرفیت لیگ‌ها و فهرست‌های اصلی را بررسی می‌کند.</p>`}
function load(){
 const keys=['fm_final_state','fm_final_state_backup','fm_v38_state','fm_v37_state','fm_v36_state','fm_v35_state','fm_v34_state','fm_v30_state','fm_v29_state','fm_v28_state','fm_v27_state','fm_v26_state','fm_v25_state','fm_v24_state','fm_v19_state','fm_v18_state','fm_v17_state','fm_v16_state','fm_v12_state','fm_v11_state'];
 for(const storageKey of keys){
  try{
   const raw=localStorage.getItem(storageKey);if(!raw)continue;
   const s=JSON.parse(raw);if(!s||!s.leagues||Object.keys(s.leagues).length!==378)continue;
   s.calendarDay=Number.isInteger(Number(s.calendarDay))?Math.max(1,Math.min(33,Number(s.calendarDay))):Math.min(31,Math.max(1,Number(s.week||0)+1));s.settledSeason??=null;s.seasonStage??=(Number(s.week)>=30?'postseason':'league');s.postseasonMoves??=[];s.drawHistory??=[];
   s.tactics??={formation:'4-2-3-1',style:'متعادل',positions:{}};s.tactics.positions??={};s.tactics.formation??='4-2-3-1';s.tactics.style??='متعادل';s.squad??=[];s.squad.forEach(p=>{if(!Number.isFinite(Number(p.ageMonths))||Number(p.ageMonths)<=0)p.ageMonths=Math.max(16,Number(p.age)||22)*12;if(!Number.isFinite(Number(p.fitness)))p.fitness=100;p.earnedTalents??=[];p.innateTalent??='استعداد پنهان'});s.academy??=[];s.academy.forEach(p=>{if(!Number.isFinite(Number(p.ageMonths))||Number(p.ageMonths)<=0)p.ageMonths=Math.max(16,Number(p.age)||16)*12;p.earnedTalents??=[];p.innateTalent??='استعداد پنهان'});s.rewardBoxes??=1;s.boxes??={normal:Number(s.rewardBoxes)||0,rare:0,epic:0,legendary:0};s.inventory??={gold:0,energy:3,puzzlePieces:{}};s.inventory.puzzlePieces??={};s.achievements??={firstWin:false,tenWins:false,leagueChampion:false,cupChampion:false,openBoxes:0};s.dailyTasks??={playWeek:0,openBox:0,train:0};s.market??=[];s.offers??=[];s.loans??=[];s.staff??={coach:false,assistant:false,fitness:false,fitnessLevel:0,medical:false};s.staff.fitnessLevel=Math.max(0,Math.min(12,Number(s.staff.fitnessLevel??(s.staff.fitness?1:0))||0));if(s.staff.fitnessLevel>0&&s.staff.fitnessLevel<=5&&s.staff.fitnessLegacyFiveLevel!==true){s.staff.fitnessLevel=({1:1,2:4,3:7,4:10,5:12})[s.staff.fitnessLevel]||s.staff.fitnessLevel;s.staff.fitnessLegacyFiveLevel=true;}s.staff.fitness=s.staff.fitnessLevel>0||!!s.staff.fitness;s.staff.analyst=!!s.staff.analyst;s.staff.academyCoach=!!s.staff.academyCoach;s.staff.staffLevels??={assistant:s.staff.assistant?1:0,medical:s.staff.medical?1:0,analyst:s.staff.analyst?1:0,academyCoach:s.staff.academyCoach?1:0};s.staff.coachProfile??=s.staff.coach?{license:'C',rankLevel:1,experience:0,traits:{tactics:50,attack:50,defence:50,development:50,management:50}}:null;s.cup??={round:1,done:[],champion:null};s.accruedWages??=0;s.seasonOpeningCash??=Number(s.cash)||0;s.financeLedger??=[];s.seasonTicketIncome??=0;s.seasonTransferIncome??=0;s.seasonTransferCosts??=0;s.sponsor??='local';s.seasonSponsorIncome??=0;s.seasonPrizeIncome??=0;s.seasonOperatingCosts??=0;s.seasonWagesAccrued??=s.accruedWages??0;s.wageShortfall??=0;s.dismissalShortfall??=0;s.transferRestricted??=(s.wageShortfall>0||s.dismissalShortfall>0);s.history??=[];s.events??=[];s.cup.teams??=[];s.cup.matches??=[];s.cup.initialized??=false;s.cups??={};for(const c of countries){s.cups[c.id]??={round:1,done:[],champion:null,teams:[],matches:[],initialized:false};s.cups[c.id].teams??=[];s.cups[c.id].matches??=[];s.cups[c.id].done??=[];s.cups[c.id].initialized??=false;}if(!s.cups[s.country]||(!s.cups[s.country].initialized&&!s.cups[s.country].champion&&s.cup?.initialized))s.cups[s.country]=s.cup;else s.cup=s.cups[s.country];s.ucl??={initialized:false,leagueRound:0,teams:[],leagueMatches:[],table:[],playoffMatches:[],playoffDone:false,bracket:{},champion:null,history:[]};s.ucl.teams??=[];s.ucl.leagueMatches??=[];s.ucl.table??=[];s.ucl.playoffMatches??=[];s.ucl.bracket??={};s.ucl.history??=[];s.ucl.prizesPaid??={};
   s.loans=(s.loans||[]).filter((l,i,a)=>l&&l.player&&l.player.id&&!a.slice(0,i).some(x=>x.player?.id===l.player.id));
   validateState(s);
   if(storageKey==='fm_final_state_backup')try{localStorage.setItem('fm_final_state',JSON.stringify(s));}catch(_){}
   return s;
  }catch(e){continue}
 }
 return newState();
}
// Migrate old saves into the six-tier pyramid while preserving legacy club identities.
function loadMigrated(){
 try{
  const keys=['fm_final_state','fm_v38_state','fm_v37_state','fm_v36_state','fm_v35_state','fm_v34_state','fm_v30_state','fm_v29_state','fm_v28_state','fm_v27_state','fm_v26_state','fm_v25_state','fm_v24_state','fm_v19_state','fm_v18_state','fm_v17_state','fm_v16_state','fm_v12_state','fm_v11_state'];
  let raw=null; for(const k of keys){const v=localStorage.getItem(k);if(v){raw=v;break}}
  const old=raw?JSON.parse(raw):null;
  if(!old||!old.leagues||Object.keys(old.leagues).length===378)return load();
  const fresh=newState();
  for(const field of ['squad','academy','market','offers','loans','staff','cash','attendance','ticketPrice','season','calendarDay','seasonStage','postseasonMoves','seasonFinalRank','drawHistory','history','events','tactics','cup','cups','ucl','inventory','boxes','rewardBoxes','achievements','dailyTasks','financeLedger','seasonTicketIncome','seasonTransferIncome','seasonTransferCosts','seasonSponsorIncome','seasonPrizeIncome','seasonOperatingCosts','seasonWagesAccrued','seasonOpeningCash','accruedWages','wageShortfall','dismissalShortfall','transferRestricted']) if(old[field]!==undefined)fresh[field]=old[field];
  // Preserve every old club from each country's first four tiers and groups A/B.
  // A/B map to G1/G2 where available; additional new groups retain generated AI clubs.
  const seen=new Set();
  for(const c of countries)for(let t=1;t<=4;t++)for(const [legacyG,newG] of [['A','G1'],['B','G2']]){
   const legacy=old.leagues[`${c.id}_${t}_${legacyG}`]; const target=fresh.leagues[key(c.id,t,newG)];
   if(!legacy||!Array.isArray(legacy.teams)||!target)continue;
   target.teams=legacy.teams.slice(0,16).map((team,i)=>{
    let copy={...team};
    if(!copy.id||seen.has(copy.id))copy.id=`MIG-${c.id}-${t}-${newG}-${i+1}`;
    seen.add(copy.id); copy.isHuman=!!copy.isHuman||copy.id==='USER_CLUB';
    if(copy.isHuman){copy.id='USER_CLUB';copy.name='باشگاه شما';copy.accountId=copy.accountId||'LOCAL_MANAGER';}
    return copy;
   });
   // Backfill missing slots without discarding any legacy team.
   const generated=makeLeague(c.id,t,newG).teams;
   while(target.teams.length<16){const candidate=generated.find(x=>!seen.has(x.id));const fill=candidate?{...candidate}:{id:`AI-${c.id}-${t}-${newG}-${target.teams.length+1}`,name:`باشگاه هوش مصنوعی ${target.teams.length+1}`};seen.add(fill.id);target.teams.push(fill)}
   target.results=Array.isArray(legacy.results)?legacy.results:[];
  }
  // Keep a single human club. If the legacy save lacks a clear manager club, preserve its old home-team slot.
  let human=null;
  for(const l of Object.values(fresh.leagues)){const i=l.teams.findIndex(t=>t.id==='USER_CLUB'||t.isHuman);if(i>=0){human=l.teams[i];break}}
  if(!human){human=fresh.leagues[key('IR',4,'G1')].teams[0];human.id='USER_CLUB';human.name='باشگاه شما';human.isHuman=true;human.accountId='LOCAL_MANAGER'}
  for(const l of Object.values(fresh.leagues))for(let i=0;i<l.teams.length;i++)if(l.teams[i]===human){}else if(l.teams[i].id==='USER_CLUB'||l.teams[i].isHuman){l.teams[i].isHuman=false;l.teams[i].accountId=null;if(l.teams[i].id==='USER_CLUB')l.teams[i].id=`AI-REPLACED-${Math.random().toString(36).slice(2,9)}`}
  // Preserve the manager's actual legacy location where it can be identified; do not guess a replacement tier/group.
  const legacyHuman=Object.entries(old.leagues).find(([k,l])=>Array.isArray(l?.teams)&&l.teams.some(t=>t&&(t.id==='USER_CLUB'||t.isHuman)));
  const locationMatch=legacyHuman&&legacyHuman[0].match(/^([A-Z]{2})_(\d+)_([AB])$/);
  fresh.country=countries.some(c=>c.id===old.country)?old.country:'IR';
  if(locationMatch){const [,lc,lt,lg]=locationMatch;fresh.country=countries.some(c=>c.id===lc)?lc:fresh.country;fresh.tier=Math.max(1,Math.min(6,Number(lt)||4));fresh.group=lg==='B'?'G2':'G1';}
  else {fresh.tier=4;fresh.group='G1';}
  fresh.season=Number.isInteger(Number(old.season))&&Number(old.season)>0?Number(old.season):1;
  // The old fixture graph differs from the new 378-group graph, so retain results in copied leagues but restart the active round to avoid skipped or duplicated fixtures.
  fresh.week=0;
  fresh.events=[{text:'ذخیرهٔ قدیمی مهاجرت شد. هویت باشگاه، داده‌های موجود و فصل حفظ شدند؛ به‌دلیل تفاوت ساختار برنامهٔ مسابقات، هفتهٔ جاری از صفر شروع می‌شود و نتایج قدیمی بازنویسی نشده‌اند.',type:'warn'},...(fresh.events||[])];
  return fresh;
 }catch(e){return newState()}
}
state=loadMigrated();
state.tactics??={formation:'4-2-3-1',style:'متعادل',positions:{},lineup:[]};
state.tactics.positions??={};
delete state.tactics.trainingFocus;
state.tactics.lineup=Array.isArray(state.tactics.lineup)?state.tactics.lineup:[];
function startingPlayers(){
 const squad=Array.isArray(state.squad)?state.squad:[];
 const available=squad.filter(p=>Math.max(0,Number(p.injuryWeeksRemaining)||0)===0);
 const valid=state.tactics.lineup.filter(id=>available.some(p=>String(p.id)===String(id))).slice(0,11);
 for(const p of available.slice().sort((a,b)=>(Number(b.ovr)||0)-(Number(a.ovr)||0))){
  if(valid.length>=Math.min(11,available.length))break;
  if(!valid.some(id=>String(id)===String(p.id)))valid.push(p.id);
 }
 state.tactics.lineup=valid;
 return valid.map(id=>squad.find(p=>String(p.id)===String(id))).filter(Boolean);
}
function league(){return state.leagues[key(state.country,state.tier,state.group)]}
function sortTeams(l){return [...l.teams].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.name.localeCompare(b.name))}
function clubTeam(){for(const l of Object.values(state.leagues||{})){const t=l.teams?.find(x=>x.id==='USER_CLUB'||x.isHuman===true);if(t)return t}return state.leagues[key('IR',4,'G1')].teams[0]}
function event(text,type='info'){state.events.unshift({text,type,week:state.week,season:state.season});state.events=state.events.slice(0,60)}
function renderSelectors(){
 $('country').innerHTML=countries.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
 $('tier').innerHTML=tiers.map(t=>`<option value="${t}">سطح ${t}</option>`).join('');
 $('country').value=state.country;$('tier').value=state.tier;$('group').innerHTML=groupsForTier(state.tier).map(g=>`<option value="${g}">گروه ${g.slice(1)}</option>`).join('');$('group').value=state.group;
 $('country').onchange=()=>{state.cups??={};state.cups[state.country]=state.cup;state.country=$('country').value;state.cups[state.country]??={round:1,done:[],champion:null,teams:[],matches:[],initialized:false};state.cup=state.cups[state.country];render();save()};
 $('tier').onchange=()=>{state.tier=+$('tier').value;const valid=groupsForTier(state.tier);if(!valid.includes(state.group))state.group=valid[0];renderSelectors();render();save()};
 $('group').onchange=()=>{state.group=$('group').value;render();save()};
}
function playerAgeYears(p){const months=Number(p?.ageMonths);return Number.isFinite(months)&&months>0?months/12:Math.max(16,Number(p?.age)||22)}
function playerAgeLabel(p){const months=Math.max(0,Math.round(Number.isFinite(Number(p?.ageMonths))&&Number(p.ageMonths)>0?Number(p.ageMonths):Math.max(16,Number(p?.age)||22)*12));return `${Math.floor(months/12)} سال و ${months%12} ماه`}
function agePlayersOneYear(){const seen=new Set();for(const p of [...(state.squad||[]),...(state.academy||[]),...(state.market||[]),...(state.loans||[]).map(l=>l.player).filter(Boolean)]){if(!p||seen.has(p.id))continue;seen.add(p.id);const months=Number.isFinite(Number(p.ageMonths))&&Number(p.ageMonths)>0?Number(p.ageMonths):Math.max(16,Number(p.age)||22)*12;p.ageMonths=Math.round(months)+12;p.age=Math.floor(p.ageMonths/12);}}
function playerValue(p){
 const ovr=Math.max(1,Number(p?.ovr)||1),age=Math.max(16,playerAgeYears(p));
 const ageFactor=age<=20?1.42:age<=23?1.28:age<=26?1.08:age<=29?.88:age<=32?.66:.45;
 const talentCount=[p?.innateTalent,...(p?.earnedTalents||[])].filter(Boolean).length;
 return Math.max(1000,Math.round((ovr*ovr*175+Math.max(0,25-age)*650)*ageFactor*(1+Math.min(.18,talentCount*.035))));
}
function playerWageSuggestion(p){const ovr=Math.max(1,Number(p?.ovr)||1),age=Math.max(16,playerAgeYears(p));return Math.round((250+ovr*ovr*1.25)*(age<21?1.08:age>31?.88:1));}
function recordFinance(type,amount,note,meta={}){const value=Math.round(Number(amount)||0);if(!value)return;state.financeLedger??=[];state.financeLedger.unshift({id:`${state.season||1}-${state.week||0}-${Date.now()}-${state.financeLedger.length}`,season:Number(state.season)||1,week:Number(state.week)||0,type,amount:value,note:String(note||type),...meta});state.financeLedger=state.financeLedger.slice(0,100);}
const rewardTalentPool=['تمام‌کننده','پاسور','جنگنده','رهبر','واکنش سریع','سرعتی','تکنیکی'];
const boxTypes={normal:{label:'عادی',cost:100,weights:[['gold',45],['energy',25],['puzzle',20],['talent',10]]},rare:{label:'کمیاب',cost:250,weights:[['gold',30],['energy',25],['puzzle',25],['talent',20]]},epic:{label:'حماسی',cost:600,weights:[['gold',20],['energy',20],['puzzle',25],['talent',35]]},legendary:{label:'افسانه‌ای',cost:1400,weights:[['gold',15],['energy',15],['puzzle',20],['talent',50]]}};
function grantBox(type,reason){if(!Object.prototype.hasOwnProperty.call(boxTypes,type))return false;state.boxes??={normal:0,rare:0,epic:0,legendary:0};state.boxes[type]=Math.max(0,Number(state.boxes[type])||0)+1;state.rewardBoxes=Object.values(state.boxes).reduce((a,b)=>a+(Number(b)||0),0);event(`صندوق ${boxTypes[type].label} دریافت شد: ${reason}`,'good');return true}
function awardAchievement(id,title,type='normal'){state.achievements??={};if(state.achievements[id])return;state.achievements[id]=true;grantBox(type,`دستاورد «${title}»`)}
function openRewardBox(type='normal'){
 if(!Object.prototype.hasOwnProperty.call(boxTypes,type)){event('نوع صندوق معتبر نیست.','warn');return}
 state.boxes??={normal:Number(state.rewardBoxes)||0,rare:0,epic:0,legendary:0};if(!(state.boxes[type]||0)){event('صندوقی از این سطح برای باز کردن ندارید.','warn');render();return}
 if(!state.squad.length){event('برای باز کردن صندوق به بازیکن نیاز است.','warn');return}
 const seed=(state.season||1)*9109+(state.week||0)*313+state.squad.length*71+(state.events?.length||0)*17;const info=boxTypes[type],roll=rng(seed+({normal:1,rare:2,epic:3,legendary:4}[type]));let chosen='talent',sum=0;for(const [item,w] of info.weights){sum+=w/100;if(roll<sum){chosen=item;break}}
 state.inventory??={gold:0,energy:0,puzzlePieces:{}};state.inventory.puzzlePieces??={};let reward='';
 if(chosen==='gold'){const n={normal:50,rare:150,epic:400,legendary:1200}[type];state.inventory.gold=(state.inventory.gold||0)+n;if(typeof recordFinance==='function')recordFinance('reward_gold',n,'جایزه گلد صندوق',{currency:'gold'});reward=`${num(n)} گلد`}
 else if(chosen==='energy'){const n={normal:1,rare:2,epic:4,legendary:8}[type];state.inventory.energy=(state.inventory.energy||0)+n;reward=`${num(n)} انرژی‌زا`}
 else if(chosen==='puzzle'){const p=state.squad[Math.floor(rng(seed+19)*state.squad.length)];state.inventory.puzzlePieces[p.id]=(state.inventory.puzzlePieces[p.id]||0)+1;reward=`قطعه پازل ${p.name}`}
 else {const p=state.squad[Math.floor(rng(seed+29)*state.squad.length)],pool=rewardTalentPool.filter(t=>!(p.earnedTalents||[]).includes(t));if(pool.length){const t=pool[Math.floor(rng(seed+39)*pool.length)];p.earnedTalents??=[];p.earnedTalents.push(t);reward=`تلنت ${t} برای ${p.name}`}else{state.inventory.gold=(state.inventory.gold||0)+50;if(typeof recordFinance==='function')recordFinance('reward_gold',50,'جایگزین تلنت تکراری',{currency:'gold'});reward='۵۰ گلد (جایگزین تلنت تکراری)'}}
 state.boxes[type]--;state.rewardBoxes=Object.values(state.boxes).reduce((a,b)=>a+(Number(b)||0),0);state.achievements??={};state.achievements.openBoxes=(state.achievements.openBoxes||0)+1;state.dailyTasks??={};state.dailyTasks.openBox=(state.dailyTasks.openBox||0)+1;if(state.achievements.openBoxes>=5)awardAchievement('openFiveBoxes','باز کردن ۵ صندوق','rare');event(`صندوق ${info.label} باز شد؛ جایزه: ${reward}.`,'good');render();save();
}

function teamMatchProfile(team){
 const isUser=!!(team&&(team.id==='USER_CLUB'||team.isHuman===true));
 let rating=Number(team?.ovr)||50, attack=rating, defence=rating, keeper=rating, fitness=100;
 if(isUser&&Array.isArray(state?.squad)&&state.squad.length){
  const allPlayers=state.squad.filter(p=>p&&Number.isFinite(Number(p.ovr)));
  const players=startingPlayers().filter(p=>Number.isFinite(Number(p.ovr)));
  const bench=allPlayers.filter(p=>!players.some(x=>String(x.id)===String(p.id)));
  const avg=arr=>arr.length?arr.reduce((n,p)=>n+Number(p.ovr),0)/arr.length:rating;
  fitness=players.length?players.reduce((n,p)=>n+Math.max(0,Math.min(100,Number(p.fitness??100)||0)),0)/players.length:100;
  const gks=players.filter(p=>p.position==='GK');
  const backs=players.filter(p=>['CB','FB'].includes(p.position));
  const mids=players.filter(p=>['DM','CM','AM'].includes(p.position));
  const forwards=players.filter(p=>['W','ST'].includes(p.position));
  rating=avg(players);attack=forwards.length?avg(forwards):rating;defence=backs.length?avg(backs):rating;keeper=gks.length?avg(gks):rating;
  const tb=p=>[p.innateTalent,...(p.earnedTalents||[])].reduce((v,t)=>v+({'تمام‌کننده':.8,'پاسور':.55,'جنگنده':.45,'رهبر':.35,'واکنش سریع':.65,'سرعتی':.4,'تکنیکی':.4}[t]||0),0);
  // Trained skills influence the match engine without replacing the player's core OVR.
  // Values are stored only when earned through manual training; cap contribution to avoid runaway balance.
  const skill=(p,keys)=>keys.reduce((sum,k)=>sum+Math.max(0,Math.min(100,Number(p.trainingAttributes?.[k])||0)),0)/Math.max(1,keys.length)/100;
  const front=players.filter(p=>['ST','W','AM'].includes(p.position)),back=players.filter(p=>['CB','FB','DM','GK'].includes(p.position));
  const midfield=players.filter(p=>['DM','CM','AM'].includes(p.position));
  attack+=front.reduce((n,p)=>n+tb(p)+skill(p,['speed','control','shooting'])*1.5,0)/Math.max(1,front.length);
  defence+=back.reduce((n,p)=>n+tb(p)+skill(p,['defending','strength'])*1.25,0)/Math.max(1,back.length);
  if(midfield.length)attack+=midfield.reduce((n,p)=>n+skill(p,['passing','decisions','stamina'])*.75,0)/midfield.length;
  if(gks.length)keeper+=gks.reduce((n,p)=>n+skill(p,['decisions','strength'])*1.1,0)/gks.length;
  const formation=state.tactics?.formation||'4-2-3-1';
  const shapeBonus=formation==='4-3-3'?1.1:formation==='3-5-2'?.7:formation==='5-3-2'?-.2:0;
  const style=state.tactics?.style||'متعادل';
  if(style.includes('هجومی')){attack+=2.2;defence-=1.4}else if(style.includes('دفاعی')){attack-=1.4;defence+=2.2}
  attack+=shapeBonus; defence-=shapeBonus*.35;
  const fatiguePenalty=(100-fitness)*.075;
  const tired=players.filter(p=>Number(p.fitness??100)<68).length;
  const benchAverage=bench.length?avg(bench):rating;
  const benchLift=Math.max(0,Math.min(1.8,(benchAverage-rating)*.09+tired*.22));
  rating+=benchLift;attack+=benchLift*.9;defence+=benchLift*.65;
  rating-=fatiguePenalty;attack-=fatiguePenalty*1.15;defence-=fatiguePenalty*.9;keeper-=fatiguePenalty*.7;
 }
 return {rating,attack,defence,keeper,fitness,isUser};
}
function calculateUserSubstitutions(team,seed=0){
 const isUser=!!(team&&(team.id==='USER_CLUB'||team.isHuman===true));
 if(!isUser||!Array.isArray(state.squad)||!state.squad.length)return {subs:[],attack:0,defence:0};
 const starters=startingPlayers();
 const bench=state.squad.filter(p=>!starters.some(x=>String(x.id)===String(p.id)))
  .sort((a,b)=>((Number(b.ovr)||0)+(Number(b.fitness??100)||0)*.025)-((Number(a.ovr)||0)+(Number(a.fitness??100)||0)*.025));
 const candidates=starters.filter(p=>Number(p.fitness??100)<82||Number(p.ovr)<=Math.min(...starters.map(x=>Number(x.ovr)||0))+3)
  .sort((a,b)=>(Number(a.fitness??100)-Number(b.fitness??100))||((Number(a.ovr)||0)-(Number(b.ovr)||0)));
 const subs=[];let attack=0,defence=0;
 for(let i=0;i<Math.min(3,bench.length,candidates.length||Math.min(2,bench.length));i++){
  const out=candidates[i]||starters.slice().sort((a,b)=>(Number(a.ovr)||0)-(Number(b.ovr)||0))[i];
  const incoming=bench.find(p=>!subs.some(s=>String(s.incoming.id)===String(p.id)));
  if(!out||!incoming)continue;
  const rawGain=(Number(incoming.ovr)||0)-(Number(out.ovr)||0)+((Number(incoming.fitness??100)||0)-(Number(out.fitness??100)||0))*.035;
  const assistantLevel=Math.max(0,Math.min(12,Number(state.staff?.staffLevels?.assistant)||0));
  const gain=rawGain*(1+assistantLevel*.006);
  const attacking=['ST','W','AM'].includes(incoming.position)||['ST','W','AM'].includes(out.position);
  const defending=['GK','CB','FB','DM'].includes(incoming.position)||['GK','CB','FB','DM'].includes(out.position);
  attack+=gain*(attacking?.22:.08);defence+=gain*(defending?.20:.07);
  subs.push({minute:60+i*9,out,incoming,gain:Math.round(gain*10)/10});
 }
 return {subs,attack:Math.max(-1.2,Math.min(1.2,attack)),defence:Math.max(-1.2,Math.min(1.2,defence))};
}
function sampleGoals(chance,seed){
 // A bounded Poisson-like draw; chance is expected goals, clamped to a plausible range.
 const lambda=Math.max(.12,Math.min(3.4,chance));let product=1,count=0,limit=Math.exp(-lambda);
 while(product>limit&&count<7){product*=Math.max(.000001,rng(seed+count*19+1));if(product>limit)count++}
 return Math.min(6,count);
}
function nextLeagueFixture(){
 const l=league();
 const pair=scheduledPairs(state.week).find(([a,b])=>l.teams[a]?.id===clubTeam().id||l.teams[b]?.id===clubTeam().id);
 if(!pair)return {opponent:null,isHome:true};
 const [a,b]=pair,home=l.teams[a],away=l.teams[b];
 return {opponent:home.id===clubTeam().id?away:home,isHome:home.id===clubTeam().id};
}
function matchWeather(){
 const seed=(Number(state.season)||1)*997+(Number(state.week)||0)*37+String(state.country||'IR').length*13;
 const pool=[
  {name:'آفتابی',attack:.35,defence:0,fitness:0,note:'زمین خشک است؛ بازی سریع و پاس‌های کوتاه مناسب‌اند.'},
  {name:'ابری',attack:0,defence:0,fitness:0,note:'شرایط متعادل است؛ تاکتیک اصلی را بر اساس کیفیت تیم انتخاب کن.'},
  {name:'بارانی',attack:-.35,defence:.2,fitness:-1,note:'زمین لغزنده است؛ پاس‌های ساده‌تر و دفاع منظم ریسک را کاهش می‌دهد.'},
  {name:'باد شدید',attack:-.2,defence:0,fitness:-.5,note:'ارسال‌های بلند دقت کمتری دارند؛ بازی زمینی می‌تواند مؤثرتر باشد.'},
  {name:'گرم',attack:-.1,defence:-.1,fitness:-1.5,note:'فشار شدید انرژی بیشتری مصرف می‌کند؛ آمادگی نیمکت اهمیت بالاتری دارد.'}
 ];
 return pool[Math.floor(rng(seed)*pool.length)];
}
function opponentRecentForm(opponent){
 if(!opponent)return {played:0,goalsFor:0,goalsAgainst:0,trend:'هنوز داده‌ای ثبت نشده',summary:'برای این حریف هنوز سابقهٔ کافی در دسترس نیست.'};
 const results=(league().results||[]).filter(r=>String(r.text||'').includes(opponent.name)).slice(-5);
 let gf=0,ga=0,w=0,d=0,l=0,played=0;
 for(const r of results){
  const m=String(r.text||'').match(/^(.*?)\s+(\d+)–(\d+)\s+(.*?)$/);
  if(!m)continue;
  const homeName=m[1],hg=Number(m[2]),ag=Number(m[3]),awayName=m[4];
  if(homeName===opponent.name){gf+=hg;ga+=ag;played++;if(hg>ag)w++;else if(hg===ag)d++;else l++;}
  else if(awayName===opponent.name){gf+=ag;ga+=hg;played++;if(ag>hg)w++;else if(ag===hg)d++;else l++;}
 }
 const trend=w>=3?'فرم اخیر خوب':l>=3?'فرم اخیر ضعیف':played?'فرم متغیر':'هنوز داده‌ای ثبت نشده';
 return {played,goalsFor:gf,goalsAgainst:ga,trend,summary:played?`در ${num(played)} بازی ثبت‌شده: ${num(gf)} گل زده و ${num(ga)} گل خورده؛ ${num(w)} برد، ${num(d)} مساوی و ${num(l)} باخت.`:'برای این حریف هنوز نتیجهٔ قبلی قابل تحلیل نیست.'};
}
function analystAdvice(){
 const {opponent,isHome}=nextLeagueFixture(),weather=matchWeather(),form=opponentRecentForm(opponent);
 const analystLevel=Math.max(0,Math.min(12,Number(state.staff?.staffLevels?.analyst)||0));
 const starters=startingPlayers(),avg=starters.length?starters.reduce((a,p)=>a+(Number(p.ovr)||0),0)/starters.length:0;
 const tired=starters.filter(p=>Number(p.fitness??100)<70).length;
 let suggestedStyle='متعادل',suggestedFormation='4-2-3-1',reason='تعادل بین دفاع و حمله را حفظ کن.';
 if(form.played>=3&&form.goalsFor>form.goalsAgainst+2){suggestedStyle='ضدحمله';reason='حریف در بازی‌های اخیر گل‌زن‌تر بوده؛ فضاهای پشت خط دفاع را هدف بگیر.';}
 else if(form.played>=3&&form.goalsAgainst>form.goalsFor+2){suggestedStyle='مالکانه';reason='حریف در بازی‌های اخیر گل‌های زیادی دریافت کرده؛ مالکیت و فشار تدریجی می‌تواند فرصت بسازد.';}
 if(tired>=3){suggestedFormation='4-4-2';reason+=' چند بازیکن اصلی خسته‌اند؛ آرایش ساده‌تر و پوشش میانهٔ زمین را در نظر بگیر.';}
 if(weather.name==='بارانی'||weather.name==='باد شدید'){suggestedStyle='مالکانه';reason+=' وضعیت هوا بازی زمینی و پاس‌های کوتاه را ترجیح می‌دهد.';}
 if(avg<Number(opponent?.ovr||avg)-4){suggestedStyle='ضدحمله';reason+=' قدرت ترکیب پایین‌تر از برآورد کلی حریف است؛ فضاهای انتقالی را هدف بگیر.';}
 if(analystLevel===0){reason='گزارش پایه و کم‌اطمینان است. '+reason;}else if(analystLevel>=10){reason='تحلیل با جزئیات بیشتر (سطح آنالیزور '+num(analystLevel)+' از ۱۲): '+reason;}else if(analystLevel>=4){reason='تحلیل با اطمینان متوسط: '+reason;}
 return {opponent,isHome,weather,form,suggestedStyle,suggestedFormation,reason,tired,avg,analystLevel,confidence:analystLevel===0?'پایه':analystLevel>=10?'بالاتر':'متوسط'};
}
function simMatch(home,away,seed){
 const h=teamMatchProfile(home),a=teamMatchProfile(away);
 const homeAdv=2.4;
 let hAttack=h.attack+homeAdv,aAttack=a.attack,hDefence=h.defence,aDefence=a.defence;
 const userHome=home.id==='USER_CLUB'||home.isHuman===true,userAway=away.id==='USER_CLUB'||away.isHuman===true;
 if(userHome||userAway){
  const weather=matchWeather(),style=state.tactics?.style||'متعادل';
  let attackBonus=0,defenceBonus=0;
  if(weather.name==='بارانی'||weather.name==='باد شدید'){if(style==='مالکانه')attackBonus+=.2;else attackBonus-=.25}
  if(weather.name==='گرم'&&style==='پرس شدید'){attackBonus-=.6;defenceBonus-=.35}
  if(userHome){hAttack+=attackBonus;hDefence+=defenceBonus}else{aAttack+=attackBonus;aDefence+=defenceBonus}
 }
 const homeSubs=calculateUserSubstitutions(home,seed+31),awaySubs=calculateUserSubstitutions(away,seed+47);
 // Pre-match preparation is fixed for this match; no tactical controls are exposed during simulation.
 const hChance=Math.max(.25,1.22+(hAttack-aDefence)*.035+(h.rating-a.rating)*.008+homeSubs.attack*.012-awaySubs.defence*.012);
 const aChance=Math.max(.20,1.08+(aAttack-hDefence)*.035+(a.rating-h.rating)*.008+awaySubs.attack*.012-homeSubs.defence*.012);
 const hg=sampleGoals(hChance,seed), ag=sampleGoals(aChance,seed+13);
 [home,away].forEach(t=>t.played++);
 home.gf+=hg;home.ga+=ag;away.gf+=ag;away.ga+=hg;
 if(hg>ag){home.w++;away.l++;home.pts+=3}else if(hg<ag){away.w++;home.l++;away.pts+=3}else{home.d++;away.d++;home.pts++;away.pts++}
 return `${home.name} ${num(hg)}–${num(ag)} ${away.name}`;
}
function buildMatchReport(home,away,homeGoals,awayGoals,seed){
 const events=[];
 // The user sees a post-match summary, not a minute-by-minute live match.
 const weather=matchWeather();
 const userHome=home.id==='USER_CLUB'||home.isHuman===true,userAway=away.id==='USER_CLUB'||away.isHuman===true;
 const userGoals=userHome?homeGoals:awayGoals,oppGoals=userHome?awayGoals:homeGoals;
 const summary=userGoals>oppGoals?'تیم با استفاده از موقعیت‌های خود نتیجهٔ مثبتی گرفت.':userGoals<oppGoals?'تیم در تبدیل موقعیت‌ها یا مهار حملات حریف مشکل داشت.':'دو تیم عملکردی نزدیک داشتند و بازی با نتیجهٔ برابر تمام شد.';
 events.push({text:summary,type:'summary'});
 events.push({text:`شرایط جوی: ${weather.name}. ${weather.note}`,type:'weather'});
 const homeProfile=teamMatchProfile(home),awayProfile=teamMatchProfile(away);
 const homeShots=Math.max(homeGoals,Math.round(4+rng(seed+811)*10+(homeProfile.attack-awayProfile.defence)*.12));
 const awayShots=Math.max(awayGoals,Math.round(3+rng(seed+823)*9+(awayProfile.attack-homeProfile.defence)*.12));
 const homePoss= Math.max(25,Math.min(75,Math.round(50+(homeProfile.rating-awayProfile.rating)*.45+(rng(seed+829)-.5)*16)));
 const userIsHome=home.id==='USER_CLUB'||home.isHuman===true;
 const userIsAway=away.id==='USER_CLUB'||away.isHuman===true;
 const homeSubs=calculateUserSubstitutions(home,seed+31),awaySubs=calculateUserSubstitutions(away,seed+47);
 let substitutions=[];
 if(userIsHome)substitutions=homeSubs.subs.map(s=>({minute:s.minute,text:`${s.minute}′ تعویض انجام شد: ${s.incoming.name} به‌جای ${s.out.name} (اثر قدرت ${s.gain>0?'+':''}${s.gain})`}));
 else if(userIsAway)substitutions=awaySubs.subs.map(s=>({minute:s.minute,text:`${s.minute}′ تعویض انجام شد: ${s.incoming.name} به‌جای ${s.out.name} (اثر قدرت ${s.gain>0?'+':''}${s.gain})`}));
 for(const sub of substitutions)events.push({minute:sub.minute,text:sub.text,type:'substitution'});
 const userShots=userIsHome?homeShots:awayShots,oppShots=userIsHome?awayShots:homeShots;
 const userPoss=userIsHome?homePoss:100-homePoss;
 const resultDelta=userGoals>oppGoals?.65:userGoals<oppGoals?-.55:.1;
 const playerRatings=(userIsHome||userIsAway?startingPlayers():[]).map((p,i)=>{
  const fitness=Math.max(0,Math.min(100,Number(p.fitness??100)));
  const base=5.7+(Number(p.ovr||50)-50)*.035+(fitness-75)*.012+resultDelta+(userShots-oppShots)*.025+(rng(seed+900+i)-.5)*1.15;
  return {id:p.id,name:p.name,position:p.position,rating:Math.round(Math.max(4,Math.min(9.8,base))*10)/10};
 }).sort((a,b)=>b.rating-a.rating);
 const coachNotes=[];
 if(userShots<oppShots)coachNotes.push('برای بازی بعدی روی ساخت موقعیت و حضور بیشتر بازیکنان هجومی کار کن.');
 if(userGoals<oppGoals)coachNotes.push('در صورت تداوم دریافت گل، تمرین دفاع تیمی و پوشش جلوی مدافعان را در نظر بگیر.');
 if(userPoss<42)coachNotes.push('مالکیت پایین بود؛ تمرین پاس و مالکیت یا آرایش با حضور هافبک بیشتر را بررسی کن.');
 if(userGoals>oppGoals&&userShots>=oppShots)coachNotes.push('ساختار کلی مؤثر بود؛ پیش از تغییرات بزرگ، همین آرایش را در بازی بعدی دوباره ارزیابی کن.');
 if(!coachNotes.length)coachNotes.push('برای تصمیم بعدی، روند چند مسابقه را کنار هم بررسی کن و بر اساس یک نتیجه تنها تاکتیک را عوض نکن.');
 events.sort((a,b)=>(a.minute??0)-(b.minute??0));
 return {season:state.season,week:state.week+1,home:home.name,away:away.name,homeGoals,awayGoals,score:`${homeGoals}–${awayGoals}`,events,stats:{homeShots,awayShots,homePoss,awayPoss:100-homePoss,homeCorners:Math.floor(rng(seed+839)*8),awayCorners:Math.floor(rng(seed+853)*7)},substitutions,playerRatings,coachNotes,seed};
}
function fitnessRank(level){return level<=0?'بدون مربی':level<=3?'مبتدی':level<=6?'قابل قبول':level<=9?'ماهر':'حرفه‌ای'}
function academyRank(level){return level<=0?'بدون مربی':level<=3?'مبتدی':level<=6?'ماهر':'حرفه‌ای'}
function runManualTraining(playerId,focus='متعادل'){
 const player=state.squad.find(p=>String(p.id)===String(playerId));
 if(!player)return {ok:false,message:'بازیکن انتخاب‌شده پیدا نشد.'};
 if(Number(player.injuryWeeksRemaining)>0)return {ok:false,message:'بازیکن مصدوم است و تا پایان دورهٔ درمان امکان تمرین ندارد.'};
 const focuses=['سرعت','قدرت','استقامت','پاس','کنترل توپ','شوت','دفاع','تصمیم‌گیری','متعادل'];
 if(!focuses.includes(focus))return {ok:false,message:'نوع تمرین معتبر نیست.'};
 player.trainingProgressByFocus??={};player.trainingAttributes??={};
 const level=Math.max(0,Math.min(12,Number(state.staff?.fitnessLevel)||0));
 const coachBonus=level?1+level*.025:1;
 const progressGain=Math.round((focus==='متعادل'?8:10)*coachBonus*10)/10;
 const focusKeys={'سرعت':'speed','قدرت':'strength','استقامت':'stamina','پاس':'passing','کنترل توپ':'control','شوت':'shooting','دفاع':'defending','تصمیم‌گیری':'decisions','متعادل':'balanced'};
 const key=focusKeys[focus];
 player.trainingProgressByFocus[key]=Math.max(0,Number(player.trainingProgressByFocus[key])||0)+progressGain;
 let growth=0,attributeGrowth=0;
 if(focus==='متعادل'){
  player.physicalTrainingProgress=Math.max(0,Number(player.physicalTrainingProgress)||0)+progressGain;
  if(player.physicalTrainingProgress>=100&&Number(player.ovr)<Number(player.potential||player.ovr)){
   player.ovr=Math.min(Number(player.potential||player.ovr),Number(player.ovr)+1);player.physicalTrainingProgress-=100;growth=1;
  }
 }else if(player.trainingProgressByFocus[key]>=100){
  player.trainingAttributes[key]=Math.min(100,Math.max(0,Number(player.trainingAttributes[key])||0)+1);
  player.trainingProgressByFocus[key]-=100;attributeGrowth=1;
 }
 state.trainingLog??=[];
 state.trainingLog.unshift({season:state.season,week:state.week,playerId:player.id,playerName:player.name,focus,progressGain,growth,attributeGrowth,coachLevel:level});
 state.trainingLog=state.trainingLog.slice(0,50);
 state.dailyTasks??={playWeek:0,openBox:0,train:0};state.dailyTasks.train=(Number(state.dailyTasks.train)||0)+1;
 return {ok:true,player,focus,progressGain,growth,attributeGrowth};
}
function updateSquadFitness(){
 if(!Array.isArray(state.squad))return;
 const assistantLevel=Math.max(0,Number(state.staff?.staffLevels?.assistant)||0);
 const starters=startingPlayers();
 for(const p of state.squad){
  const current=Math.max(0,Math.min(100,Number(p.fitness??100)||0));
  const isStarter=starters.some(x=>String(x.id)===String(p.id));
  const matchLoad=isStarter?6:1;
  const recoveryBonus=assistantLevel>0?Math.min(2,assistantLevel*.08):0;
  p.fitness=Math.round(Math.max(0,Math.min(100,current-matchLoad+recoveryBonus)));
 }
}

function weeklyWageCommitment(){
 const players=state.squad.reduce((sum,p)=>sum+Math.max(0,Number(p.wage)||0),0);
 const level=Math.max(0,Math.min(12,Number(state.staff?.fitnessLevel??(state.staff?.fitness?1:0))||0));
 const fitnessWages=[0,700,760,820,1000,1080,1160,1400,1500,1600,1900,2050,2200];
 const baseWages={coach:1800,assistant:900,medical:800,analyst:850,academyCoach:900};
 const staff=Object.entries(state.staff||{}).reduce((sum,[role,hired])=>{
  if(role==='fitness')return sum+(fitnessWages[level]||0);
  if(role==='staffLevels'||role==='coachProfile'||role==='fitnessLegacyFiveLevel')return sum;
  return sum+(hired?(baseWages[role]||0):0);
 },0);
 const levels=state.staff?.staffLevels||{};
 return players+staff+Object.entries(levels).reduce((sum,[role,lvl])=>sum+Math.max(0,Number(lvl)||0)*({assistant:80,medical:75,analyst:85,academyCoach:90}[role]||0),0);
}
function projectedSeasonReserve(){
 const remaining=Math.max(0,30-state.week);
 return Math.max(0,Number(state.accruedWages)||0)+(weeklyWageCommitment()/30)*remaining;
}
function canSpend(amount){return !state.transferRestricted && Number(state.cash)-projectedSeasonReserve()>=Number(amount);}
function scheduledPairs(week){
 // 16-team double round robin: 15 unique rounds, then the same fixtures with venues reversed.
 const round=((Number(week)||0)%15);
 const ids=Array.from({length:16},(_,i)=>i);
 for(let r=0;r<round;r++){const last=ids.pop();ids.splice(1,0,last)}
 const reverseHalf=Number(week)>=15;
 const pairs=[];
 for(let i=0;i<8;i++){let a=ids[i],b=ids[15-i];if((round%2)===1)[a,b]=[b,a];if(reverseHalf)[a,b]=[b,a];pairs.push([a,b])}
 return pairs;
}
function recoverInjuriesWeekly(){
 const doctorLevel=state.staff?.medical?Math.max(1,Math.min(12,Number(state.staff?.staffLevels?.medical)||1)):0;
 for(const p of state.squad||[]){
  const remaining=Math.max(0,Number(p.injuryWeeksRemaining)||0);
  if(!remaining)continue;
  p.injuryWeeksRemaining=Math.max(0,remaining-(doctorLevel>=7?2:1));
  if(p.injuryWeeksRemaining===0){p.injury=null;event(`${p.name} پس از دورهٔ درمان به آمادگی بازگشت.`,'good');}
 }
}
function applyPostMatchInjuries(seed){
 const doctorLevel=state.staff?.medical?Math.max(1,Math.min(12,Number(state.staff?.staffLevels?.medical)||1)):0;
 const starters=startingPlayers();let injured=[];
 starters.forEach((p,i)=>{
  if(Number(p.injuryWeeksRemaining)>0)return;
  const fitness=Math.max(0,Math.min(100,Number(p.fitness??100)));
  const risk=Math.max(0,0.018+(65-fitness)*0.0012-doctorLevel*0.001);
  if(rng(seed+701+i)<risk){
   let weeks=1+(rng(seed+811+i)>.58?1:0)+(rng(seed+907+i)>.91?1:0);
   if(doctorLevel>=10&&weeks>1)weeks--;
   p.injuryWeeksRemaining=weeks;p.injury=weeks>=3?'مصدومیت متوسط':'مصدومیت خفیف';injured.push({name:p.name,weeks});
  }
 });
 if(injured.length){state.lastMatchReport.injuries=injured;for(const p of injured)event(`${p.name} پس از مسابقه دچار ${p.weeks===1?'مصدومیت خفیف':p.weeks===2?'مصدومیت خفیف':'مصدومیت متوسط'} شد؛ دورهٔ درمان: ${p.weeks} هفته.`,'warn');}
 return injured;
}
function cupMatchScore(a,b,seed){const pa=(a.ovr||50)+(a.tier===1?14:a.tier===2?9:a.tier===3?4:0),pb=(b.ovr||50)+(b.tier===1?14:b.tier===2?9:b.tier===3?4:0);let ga=Math.floor(rng(seed+1)*3),gb=Math.floor(rng(seed+2)*3);if(pa-pb>12&&ga<=gb)ga=gb+1;if(pb-pa>12&&gb<=ga)gb=ga+1;if(ga===gb){if(rng(seed+3)>.5)ga++;else gb++;}return [ga,gb];}
const NATIONAL_CUP_WEEKS=[4,9,14,19]; // After league weeks 5/10/15/20: tier 6/5/4/3 enter in sequence.
function cupTeamsForTier(countryId,tier){
 const entrants=[];for(const group of groupsForTier(tier)){const l=state.leagues[key(countryId,tier,group)];for(const team of (l?.teams||[]))entrants.push({...team,tier,group,country:countryId,isHuman:team.id==='USER_CLUB'||!!team.isHuman});}return entrants;
}
function cupStableOrder(teams,seed){return teams.slice().sort((a,b)=>{const score=t=>{let h=seed;for(const ch of String(t.id))h=(h*33+ch.charCodeAt(0))>>>0;return h};return score(a)-score(b)||String(a.id).localeCompare(String(b.id));});}
function playCupPoolTo(cup,target,countryId,label,seed){
 cup.pool??=[];cup.matches??=[];cup.done??=[];let rounds=0;
 while(cup.pool.length>target&&rounds<12){
  const ordered=cupStableOrder(cup.pool,seed+rounds*997+countryId.charCodeAt(0));const next=[],roundMatches=[];
  for(let i=0;i<ordered.length;i+=2){if(!ordered[i+1]){next.push(ordered[i]);continue;}const a=ordered[i],b=ordered[i+1];const [ga,gb]=cupMatchScore(a,b,seed+rounds*10000+i*17+countryId.charCodeAt(0));const winner=ga>gb?a:b;const m={a,b,scoreA:ga,scoreB:gb,winner,played:true,round:cup.matches.length+1};roundMatches.push(m);next.push(winner);cup.done.unshift(`${label}، دور ${num(m.round)}: ${a.name} ${ga}–${gb} ${b.name} • صعود: ${winner.name}`);if(a.id==='USER_CLUB'||b.id==='USER_CLUB'||a.isHuman||b.isHuman)event(`جام حذفی: ${a.name} ${ga}–${gb} ${b.name}؛ صعود ${winner.name}`,'good');}
  cup.matches.push(roundMatches);cup.pool=next;rounds++;
 }
 cup.done=cup.done.slice(0,250);cup.round=cup.matches.length+1;cup.lastStage=label;return cup.pool.length;
}
function enterCupTier(cup,countryId,tier,label,target,seed){
 const entrants=cupTeamsForTier(countryId,tier);const existing=new Set((cup.pool||[]).map(t=>t.id));const fresh=entrants.filter(t=>!existing.has(t.id));cup.pool=[...(cup.pool||[]),...fresh];cup.teams??=[];const teamIds=new Set(cup.teams.map(t=>t.id));for(const t of fresh)if(!teamIds.has(t.id)){cup.teams.push(t);teamIds.add(t.id)}cup.enteredTiers??=[];if(!cup.enteredTiers.includes(tier))cup.enteredTiers.push(tier);cup.initialized=true;cup.season=state.season;cup.country=countryId;playCupPoolTo(cup,target,countryId,label,seed);return fresh.length;
}
function awardNationalCupChampion(cup,countryId){
 if(!cup.pool||cup.pool.length!==1)return false;const winner=cup.pool[0];cup.champion=winner.name;cup.championId=winner.id;cup.completed=true;cup.country=countryId;cup.season=state.season;cup.rewardPaid=!!cup.rewardPaid;
 if(!cup.rewardPaid&&(winner.id==='USER_CLUB'||winner.isHuman)){awardAchievement('cupChampion','قهرمانی جام حذفی','epic');const prize=250000;state.cash+=prize;state.seasonPrizeIncome=(state.seasonPrizeIncome||0)+prize;recordFinance('income_cup_prize',prize,'پاداش قهرمانی جام حذفی',{country:countryId});cup.rewardPaid=true;event(`قهرمان جام حذفی: ${cup.champion}. پاداش ${money(prize)} پرداخت شد.`,'good')}
 return true;
}
function playScheduledNationalCupRound(){
 state.cups??={};let any=false;
 for(const c of countries){const countryId=c.id;let cup=state.cups[countryId];if(!cup||cup.season!==state.season||!cup.progressiveFormat){cup={round:1,done:[],champion:null,championId:null,teams:[],matches:[],pool:[],enteredTiers:[],initialized:false,progressiveFormat:true,season:state.season,country:countryId,rewardPaid:false};state.cups[countryId]=cup;}if(cup.champion)continue;
  const stage={4:{tier:6,label:'مرحلهٔ مقدماتی دستهٔ ششم',target:16},9:{tier:5,label:'ورود دستهٔ پنجم',target:16},14:{tier:4,label:'ورود دستهٔ چهارم',target:16},19:{tier:3,label:'ورود دستهٔ سوم',target:16}}[state.week];if(!stage)continue;
  enterCupTier(cup,countryId,stage.tier,stage.label,stage.target,state.season*100000+state.week*1000);state.cups[countryId]=cup;if(countryId===state.country)state.cup=cup;any=true;
  event(`${c.name}: جام حذفی؛ ${stage.label}، ${num(cup.pool.length)} تیم در ادامهٔ رقابت باقی ماندند.`,'info');
 }return any;
}
function simulateWeek(){
 if(state.week>=30){advanceSeasonCalendar();return}
 recoverInjuriesWeekly();
 let matches=0, userHome=false, userResult='';
 for(const c of countries)for(const t of tiers)for(const g of groupsForTier(t)){
  const l=state.leagues[key(c.id,t,g)];
  // Round-robin schedule generated from round number; each week 8 matches.
  const pairs=scheduledPairs(state.week);
  for(let j=0;j<pairs.length;j++){
   const [a,b]=pairs[j],home=l.teams[a],away=l.teams[b];
   const homeGFBefore=home.gf,awayGFBefore=away.gf;
   const result=simMatch(home,away,state.season*100000+state.week*1000+matches*17+j);
   if(c.id===state.country&&t===state.tier&&g===state.group&&(home.id===clubTeam().id||away.id===clubTeam().id)){
    userResult=result;
    if(home.id===clubTeam().id||away.id===clubTeam().id){
     const gh=Math.max(0,home.gf-homeGFBefore),ga=Math.max(0,away.gf-awayGFBefore);
     state.lastMatchReport=buildMatchReport(home,away,gh,ga,state.season*100000+state.week*1000+matches*17+j);
     const userHomeNow=home.id===clubTeam().id;const userGoals=userHomeNow?gh:ga,oppGoals=userHomeNow?ga:gh;
     state.lastMatchReport.userIsHome=userHomeNow;state.lastMatchReport.userScore=`${userGoals}–${oppGoals}`;
     state.matchReportHistory=Array.isArray(state.matchReportHistory)?state.matchReportHistory:[];
     state.matchReportHistory.unshift({season:state.lastMatchReport.season,week:state.lastMatchReport.week,opponent:userHomeNow?away.name:home.name,score:state.lastMatchReport.userScore,coachNotes:state.lastMatchReport.coachNotes||[]});
     state.matchReportHistory=state.matchReportHistory.slice(0,10);
     applyPostMatchInjuries(state.season*100000+state.week*1000+matches*17+j);
    }
    if(home.id===clubTeam().id){userHome=true;const formFactor=Math.max(.78,Math.min(1.18,1+(home.pts-away.pts)*.012+(home.gf-home.ga)*.025));const attendance=Math.max(250,Math.round(state.attendance*(0.7+rng(state.week+state.season)*0.6)*formFactor));const income=attendance*state.ticketPrice;state.cash+=income;state.seasonTicketIncome=(state.seasonTicketIncome||0)+income;if(typeof recordFinance==='function')recordFinance('income_ticket',income,'درآمد بلیت مسابقه');event(`درآمد بلیت: ${money(income)} از ${num(attendance)} تماشاگر.`,'good')}
   }
   l.results.push({week:state.week+1,text:result});matches++;
  }
 }
 const annualWageBase=weeklyWageCommitment();const wage=Math.round(annualWageBase/30);state.accruedWages+=wage;state.seasonWagesAccrued=(state.seasonWagesAccrued||0)+wage;if(typeof recordFinance==='function')recordFinance('expense_wages_accrued',wage,'قسط روزانه از دستمزد سالانه؛ هنوز از نقد پرداخت نشده',{annualWageBase,seasonDays:30});
 const operatingCost=Math.round(1800+state.squad.length*95+(state.staff.medical?450:0)+(state.staff.fitness?350:0));state.cash=Math.max(0,state.cash-operatingCost);state.seasonOperatingCosts=(state.seasonOperatingCosts||0)+operatingCost;if(typeof recordFinance==='function')recordFinance('expense_operating',operatingCost,'هزینه جاری باشگاه');if(operatingCost)event(`هزینهٔ جاری باشگاه (نگهداری و عملیات): ${money(operatingCost)}.`,'info');
 if(state.ucl?.initialized&&state.ucl.leagueRound<8&&[2,5,8,11,14,17,20,23].includes(state.week)){for(const m of state.ucl.leagueMatches[state.ucl.leagueRound])uclPlayGame(m);state.ucl.leagueRound++;updateUclTable();event(`هفتهٔ ${num(state.ucl.leagueRound)} لیگ قهرمانان هم‌زمان با برنامهٔ فصل برگزار شد.`,'good')}if(NATIONAL_CUP_WEEKS.includes(state.week))playScheduledNationalCupRound();state.week++;state.calendarDay=Math.min(31,state.week+1);state.seasonStage=state.week>=30?'postseason':'league';updateSquadFitness();processLoans();state.dailyTasks??={playWeek:0,openBox:0,train:0};state.dailyTasks.playWeek=1;const ut=clubTeam();if(typeof awardAchievement==='function'&&ut.w>=1)awardAchievement('firstWin','اولین برد','normal');if(typeof awardAchievement==='function'&&ut.w>=10)awardAchievement('tenWins','۱۰ برد لیگ','rare');event(`هفتهٔ ${num(state.week)} شبیه‌سازی شد؛ ${num(matches)} مسابقه در کل ساختار. قسط دستمزد سالانه ${money(wage)} به تعهدات پایان فصل اضافه شد. ${userResult?'نتیجهٔ باشگاه شما: '+userResult:''}`,'info');
 render();save();
}
function tableHTML(l){
 const rows=sortTeams(l);
 return `<div class="table-wrap"><table><thead><tr><th>#</th><th>باشگاه</th><th>بازی</th><th>برد</th><th>مساوی</th><th>باخت</th><th>گل</th><th>تفاضل</th><th>امتیاز</th></tr></thead><tbody>${rows.map((x,i)=>`<tr class="${x.id===clubTeam().id?'me':''}"><td>${num(i+1)}</td><td>${x.name}</td><td>${num(x.played)}</td><td>${num(x.w)}</td><td>${num(x.d)}</td><td>${num(x.l)}</td><td>${num(x.gf)}:${num(x.ga)}</td><td>${num(x.gf-x.ga)}</td><td><b>${num(x.pts)}</b></td></tr>`).join('')}</tbody></table></div>`;
}
function fixturesHTML(){
 const l=league();let out='';
 for(let w=state.week;w<Math.min(30,state.week+4);w++){
  const games=scheduledPairs(w).map(([a,b])=>[l.teams[a],l.teams[b]]);
  out+=`<h3 style="font-size:13px">هفته ${num(w+1)}</h3><div class="events">${games.map(([h,a])=>`<div class="event row"><span>${h.name} — ${a.name}</span><span class="pill">${h.id===clubTeam().id||a.id===clubTeam().id?'بازی باشگاه شما':'برنامه'}</span></div>`).join('')}</div>`;
 }
 return out||'<div class="empty">برنامهٔ فصل تمام شده است.</div>';
}
function movementHTML(){
 const standings=sortTeams(league());
 const rows=standings.map((t,i)=>`<div class="event row"><span>${num(i+1)}. ${t.name}</span><span>${num(t.pts)} امتیاز</span><span class="pill ${i===0?'good':i===1?'warn':i>=14?'bad':''}">${i===0?'قهرمان گروه':i===1?'نامزد پلی‌آف':i>=14?'منطقه سقوط':'بقا'}</span></div>`).join('');
 return `<p class="note">قانون جدول: امتیاز، تفاضل گل، گل زده و نام. قهرمان گروه صعود مستقیم دارد؛ تیم‌های ۱۵ و ۱۶ سقوط مستقیم دارند؛ تیم دوم در دو مرحلهٔ پلی‌آف تک‌بازی شرکت می‌کند. در پایین‌ترین سطح، سقوط و صعود به سطح پایین‌تر وجود ندارد.</p>${rows}<div class="event"><b>ساختار گروه‌ها</b><p class="note">هر گروه بالاتر به دو گروه متناظر در سطح پایین‌تر متصل است. پلی‌آف با برندهٔ گروه دوم هم‌سطح و سپس تیم چهاردهم گروه بالاتر برگزار می‌شود.</p></div>`;
}
function runEconomyStressTest(){
 // Deterministic, isolated scenario model; never changes the active save.
 const scenarios=[
  {name:'پایه',income:560000,wages:480000,other:70000,transfer:0},
  {name:'فصل موفق',income:760000,wages:500000,other:85000,transfer:80000},
  {name:'افت نتایج',income:390000,wages:500000,other:90000,transfer:0},
  {name:'فشار هزینه',income:510000,wages:620000,other:125000,transfer:-60000},
  {name:'بحران نقدینگی',income:300000,wages:540000,other:110000,transfer:-100000}
 ];
 const rows=scenarios.map(x=>{let cash=initialCash,minimum=cash,shortfall=0;for(let y=1;y<=10;y++){const variation=1+((y%3)-1)*.035;const inc=Math.round(x.income*variation),cost=Math.round((x.wages+x.other)*variation)-x.transfer;cash+=inc-cost;if(cash<0){shortfall+=-cash;cash=0}minimum=Math.min(minimum,cash)}return {...x,ending:cash,minimum,shortfall,net:cash-initialCash}});
 const ok=rows.every(r=>Number.isFinite(r.ending)&&r.ending>=0)&&rows.length===5;
 return {rows,ok};
}
function economyStressHTML(){const r=runEconomyStressTest();return `<h3>آزمون فشار اقتصاد — ۱۰ فصل فرضی</h3><p class="note">این آزمون مستقل و قطعی است؛ ذخیرهٔ زنده را تغییر نمی‌دهد. ورودی‌ها فرض‌های آزمایشی‌اند، نه درآمدها یا ضرایب مصوب طراحی.</p><div class="stat"><small>سلامت اجرای آزمون</small><strong>${r.ok?'۵ سناریو اجرا شد':'خطا در آزمون'}</strong></div><div class="table-wrap"><table><thead><tr><th>سناریو</th><th>درآمد سالانه</th><th>دستمزد</th><th>سایر هزینه</th><th>تغییر نقد ۱۰ فصل</th><th>نقد پایان</th><th>کسری تجمعی</th></tr></thead><tbody>${r.rows.map(x=>`<tr><td>${x.name}</td><td>${money(x.income)}</td><td>${money(x.wages)}</td><td>${money(x.other)}</td><td>${money(x.net)}</td><td>${money(x.ending)}</td><td>${money(x.shortfall)}</td></tr>`).join('')}</tbody></table></div><p class="note">مدل آزمون، موجودی را زیر صفر نگه نمی‌دارد و کسری را جدا ثبت می‌کند؛ مدل زندهٔ بازی هنوز به همهٔ درآمدهای لیگ، اسپانسر، تعمیرات و هزینهٔ قرض متصل نشده است.</p>`}
function financeHTML(){
 return `<div class="finance-panel"><div class="finance-section-title">خلاصهٔ مالی باشگاه <span>نمای کلی فصل جاری</span></div><div class="subgrid"><div class="stat"><small>وضعیت نقل‌وانتقال</small><strong>${state.transferRestricted?'محدود':'عادی'}</strong></div><div class="stat"><small>نقد فعلی</small><strong>${money(state.cash)}</strong></div><div class="stat"><small>تعهد دستمزد انباشتهٔ فصل</small><strong>${money(state.accruedWages)}</strong></div><div class="stat"><small>ذخیرهٔ پیشنهادی تا پایان فصل</small><strong>${money(projectedSeasonReserve())}</strong></div><div class="stat"><small>نقد آزاد پس از ذخیره</small><strong>${money(Math.max(0,state.cash-projectedSeasonReserve()))}</strong></div><div class="stat"><small>کسری دستمزد</small><strong>${money(state.wageShortfall)}</strong></div><div class="stat"><small>کسری هزینهٔ فسخ</small><strong>${money(state.dismissalShortfall||0)}</strong></div><div class="stat"><small>کل بدهی ثبت‌شده</small><strong>${money((state.wageShortfall||0)+(state.dismissalShortfall||0))}</strong></div><div class="stat"><small>درآمد بلیت هفتهٔ بعد (پیش‌بینی ساده)</small><strong>${money(state.attendance*state.ticketPrice)}</strong></div></div><div class="controls" style="margin-top:12px"><div class="field"><label>قرارداد اسپانسر</label><select id="sponsor"><option value="local" ${state.sponsor==='local'?'selected':''}>محلی — پاداش ثابت کمتر</option><option value="regional" ${state.sponsor==='regional'?'selected':''}>منطقه‌ای — پاداش متوسط</option><option value="national" ${state.sponsor==='national'?'selected':''}>ملی — پاداش بیشتر، هدف رتبهٔ بالاتر</option></select></div><button id="repay" ${state.cash<=0||((state.wageShortfall||0)+(state.dismissalShortfall||0))<=0?'disabled':''}>تسویهٔ بدهی‌های ثبت‌شده</button><div class="field"><label>قیمت بلیت</label><select id="price">${[10,15,18,22,28,35].map(p=>`<option value="${p}" ${p===state.ticketPrice?'selected':''}>${p} ₼</option>`).join('')}</select></div><div class="field"><label>میانگین تماشاگر فرضی</label><select id="attendance">${[500,1000,1400,2500,5000,8000].map(n=>`<option value="${n}" ${n===state.attendance?'selected':''}>${num(n)}</option>`).join('')}</select></div></div><p class="note">مدل مالی این نسخه آزمایشی است. دستمزدها طی فصل انباشته و هنگام بستن فصل تسویه می‌شوند؛ خرید و استخدام به نقد آزاد پس از ذخیرهٔ دستمزدهای پیش‌بینی‌شده محدود است. پرداخت پایان فصل از موجودی موجود بیشتر نمی‌شود و کسری ثبت می‌شود. این جایگزین مدل اقتصادی نهایی نیست.</p><h3 style="font-size:14px">گزارش فصل‌های بسته‌شده</h3>${(state.history||[]).slice().reverse().slice(0,5).map(h=>`<div class="event"><b>فصل ${num(h.season)}</b> • تغییر نقد: ${money(h.netCashChange||0)} • بلیت: ${money(h.ticketIncome||0)} • دریافتی انتقال/قرض: ${money(h.transferIncome||0)} • خرید: ${money(h.transferCosts||0)} • دستمزد پرداختی: ${money(h.wagesPaid||0)} • کسری: ${money(h.wageShortfall||0)} • نقد پایان: ${money(h.closingCash??h.cash??0)}</div>`).join('')||'<div class="empty">پس از بستن اولین فصل، گزارش مالی اینجا ثبت می‌شود.</div>'}<p class="note">گزارش از این نسخه به بعد ثبت می‌شود؛ فصل‌های قدیمی فاقد جزئیات درآمد و هزینه هستند و به‌صورت مصنوعی بازسازی نمی‌شوند.</p><h3 style="font-size:14px">دفتر تراکنش‌های مالی</h3><p class="note">آخرین ۱۰۰ ثبت مالی؛ گلد و پول باشگاه در دفترهای جدا ثبت می‌شوند. ثبت دستمزد تعهدشده با پرداخت نقدی آن متفاوت است.</p>${(state.financeLedger||[]).slice(0,20).map(tx=>`<div class="event row"><span><b>${tx.note}</b><br><small>فصل ${num(tx.season)} • هفته ${num(tx.week)} • ${tx.currency==='gold'?'گلد':'پول باشگاه'} • ${tx.type}</small></span><strong>${tx.currency==='gold'?'🪙 ':''}${money(tx.amount)}</strong></div>`).join('')||'<div class="empty">هنوز تراکنشی در دفتر ثبت نشده است.</div>'}${economyStressHTML()}<h3 style="font-size:14px">رویدادهای مالی اخیر</h3>${state.events.filter(e=>/بلیت|دستمزد|نقد|درآمد/.test(e.text)).map(e=>`<div class="event">${e.text}</div>`).join('')||'<div class="empty">هنوز رویداد مالی ثبت نشده است.</div>'}</div>`;
}

function squadHTML(){const windowOpen=state.week===0||(state.week>=15&&state.week<=18);return `<p class="note">فهرست اصلی حداکثر ۳۲ نفر است؛ باشگاه با ۲۰ بازیکن شروع می‌کند. پنجرهٔ انتقال بازیکنان قراردادی در هفتهٔ ۱۵ تا ۱۸ و فاصلهٔ بین فصل‌هاست. پیشنهاد فروش و قرض کوتاه‌مدت در این نسخه فعال است؛ بازار هنوز نمونه‌ای و تک‌باشگاهی است.</p><div class="event">وضعیت پنجره: <b class="${windowOpen?'good':'warn'}">${windowOpen?'باز':'بسته'}</b> • فروش فوری فقط در پنجرهٔ باز فعال است.</div><div class="table-wrap"><table><thead><tr><th>بازیکن</th><th>سن</th><th>پست</th><th>قدرت</th><th>ارزش تخمینی</th><th>دستمزد سالانه</th><th>اقدام</th></tr></thead><tbody>${state.squad.map(p=>`<tr><td>${p.name}</td><td>${playerAgeLabel(p)}</td><td>${p.position}</td><td>${p.ovr}</td><td>${money(playerValue(p))}</td><td>${money(p.wage)}</td><td><button data-sell="${p.id}" ${(!windowOpen||state.transferRestricted)?'disabled':''}>پیشنهاد فروش</button> <button data-loan="${p.id}" ${(!windowOpen||state.transferRestricted)?'disabled':''}>قرض ۱۰ هفته‌ای</button> <button data-dismiss="${p.id}" ${state.transferRestricted?'disabled':''}>فسخ</button></td></tr>`).join('')}</tbody></table></div><p>تعداد بازیکنان: ${state.squad.length}/32 • جای خالی: ${32-state.squad.length}</p>`}
function marketHTML(){const windowOpen=state.week===0||(state.week>=15&&state.week<=18);return `<div class="market-overview"><div class="market-metric"><small>وضعیت پنجره</small><strong class="${windowOpen?'good':'warn'}">${windowOpen?'باز':'بسته'}</strong><span>${windowOpen?'خرید بازیکن آزاد ممکن است':'انتقال بازیکن قراردادی متوقف است'}</span></div><div class="market-metric"><small>فهرست تیم</small><strong>${num(state.squad.length)} <i>/ ۳۲</i></strong><span>${num(Math.max(0,32-state.squad.length))} جای خالی</span></div><div class="market-metric"><small>نقد آزاد تخمینی</small><strong>${money(Math.max(0,state.cash-projectedSeasonReserve()))}</strong><span>${state.transferRestricted?'محدودیت مالی فعال':'پس از ذخیرهٔ دستمزدها'}</span></div><div class="market-metric"><small>بازیکنان آزاد</small><strong>${num(state.market.length)}</strong><span>قابل جست‌وجو و مرتب‌سازی</span></div></div><p class="note">بازیکنان آزاد نمونه در تمام فصل قابل جذب‌اند. خرید همچنان به ظرفیت فهرست و نقد آزاد وابسته است؛ انتقال بازیکن قراردادی فقط در پنجره انجام می‌شود.</p><div class="controls"><div class="field"><label for="marketSearch">جست‌وجوی بازیکن آزاد</label><input id="marketSearch" type="search" placeholder="نام، پست یا سن…"></div><div class="field"><label for="marketSort">مرتب‌سازی</label><select id="marketSort"><option value="ovr">قدرت بیشتر</option><option value="value">ارزش بازار</option><option value="fee">قیمت کمتر</option><option value="age">سن کمتر</option></select></div></div><h3>قرض‌های فعال</h3>${(state.loans||[]).map(l=>`<div class="event">${l.name} • ${num(Math.max(0,l.remainingWeeks??(l.returnWeek-state.week)))} هفته تا پایان قرض • هزینهٔ قرض ${money(l.fee)} • سهم دستمزد ${money(l.wageSupport||0)}</div>`).join('')||'<div class="empty">قرض فعالی وجود ندارد.</div>'}<h3>پیشنهادهای اخیر</h3>${(state.offers||[]).slice(0,8).map(o=>`<div class="event">${o.text}</div>`).join('')||'<div class="empty">هنوز پیشنهادی ثبت نشده است.</div>'}<h3>بازیکنان آزاد</h3>${state.market.length?[...state.market].sort((a,b)=>((window.marketSortKey==='value'?playerValue(b)-playerValue(a):window.marketSortKey==='fee'?a.fee-b.fee:window.marketSortKey==='age'?a.age-b.age:b.ovr-a.ovr))).map(p=>`<div class="event row" data-marketrow data-marketname="${p.name.toLowerCase()} ${p.position.toLowerCase()} ${p.age}"><span><b>${p.name}</b><br><small>سن ${playerAgeLabel(p)} • ${p.position} • قدرت ${p.ovr} • ارزش تخمینی ${money(playerValue(p))} • دستمزد سالانه ${money(p.wage)}</small></span><span>${money(p.fee)} <button data-buy="${p.id}" ${state.transferRestricted||state.squad.length>=32||!canSpend(p.fee)?'disabled':''}>خرید</button></span></div>`).join(''):'<div class="empty">بازیکن آزاد دیگری در فهرست نیست.</div>'}`}
function academyHTML(){return `<p class="note">آکادمی حداکثر ۳۰ بازیکن دارد. بازیکن ۲۱ ساله باید به تیم اصلی ارتقا یابد یا آزاد شود. تمرین آکادمی فقط با فشردن دکمه توسط مدیر اجرا می‌شود؛ مربی آکادمی احتمال رشد در همان تمرین دستی را افزایش می‌دهد.</p><div class="table-wrap"><table><thead><tr><th>بازیکن</th><th>سن</th><th>پست</th><th>قدرت</th><th>تلنت‌ها</th><th></th></tr></thead><tbody>${state.academy.map(p=>`<tr><td>${p.name}</td><td>${playerAgeLabel(p)}</td><td>${p.position}</td><td>${p.ovr}</td><td>${[p.innateTalent,...(p.earnedTalents||[])].filter(Boolean).join("، ")}</td><td><button data-promote="${p.id}" ${state.squad.length>=32?'disabled':''}>ارتقا</button></td></tr>`).join('')}</tbody></table></div><button id="train">تمرین هفتگی آکادمی</button>`}
function staffHTML(){
 const staff=state.staff;const levels=staff.staffLevels||(staff.staffLevels={assistant:staff.assistant?1:0,medical:staff.medical?1:0,analyst:staff.analyst?1:0,academyCoach:staff.academyCoach?1:0});
 const level=Math.max(0,Math.min(12,Number(staff.fitnessLevel??(staff.fitness?1:0))||0));
 const roleDefs=[['coach','سرمربی',90000,'سرمربی مسئول تصمیم‌های فنی بزرگسالان است؛ رتبهٔ اکتسابی با پول ارتقا نمی‌یابد.'],['assistant','مربی کمکی',45000,'بهبود کیفیت تعویض خودکار؛ همچنان تابع محدودیت‌ها و تنظیمات مدیر.'],['medical','پزشک تیم',42000,'پشتیبانی مدیریت مصدومیت و بازگشت بازیکن.'],['analyst','آنالیزور',48000,'تحلیل روند بازی‌های قبلی؛ تاکتیک و ترکیب حریف محرمانه می‌ماند.'],['academyCoach','مربی آکادمی',50000,'تمرین و پرورش بازیکنان جوان.']];
 const costs=[38000,42000,47000,52000,58000,64000,71000,79000,88000,98000,109000,121000];
 const wage=[0,700,760,820,1000,1080,1160,1400,1500,1600,1900,2050,2200];
 const quality=['بدون مربی','پایه','پایه','پایه','قابل قبول','قابل قبول','قابل قبول','خوب','خوب','خوب','حرفه‌ای','حرفه‌ای','حرفه‌ای'];
 const rows=roleDefs.map(([id,name,cost,desc])=>{const hired=!!staff[id];const rankLevel=id==='coach'?0:id==='academyCoach'?Math.min(9,Number(levels[id])||0):Math.min(12,Number(levels[id])||0);const max=id==='academyCoach'?9:12;const rankName=id==='coach'?(staff.coachProfile?`مجوز ${staff.coachProfile.license} • رتبه ${num(staff.coachProfile.rankLevel||1)} از ۱۲`:'بدون سرمربی'):rankLevel?`${id==='academyCoach'?academyRank(rankLevel):fitnessRank(rankLevel)} • زیرسطح ${num((rankLevel-1)%3+1)} از ۳`:'استخدام نشده';return `<div class="event staff-card"><div class="row"><span><b>${name}</b><br><small>${desc}</small><br><span class="pill">${hired?rankName:'بدون کادر'}</span></span><span>${hired?'استخدام شده':`<button data-hire="${id}" data-cost="${cost}" ${!canSpend(cost)?'disabled':''}>استخدام • ${money(cost)}</button>`}</span></div>${hired&&id!=='coach'?`<div class="subgrid"><div class="stat"><small>سطح فعلی</small><strong>${num(rankLevel)} از ${num(max)}</strong></div><div class="stat"><small>دستمزد سالانه پایه</small><strong>${money(({assistant:900,medical:800,analyst:850,academyCoach:900})[id]+rankLevel*({assistant:80,medical:75,analyst:85,academyCoach:90})[id])}</strong></div></div>${rankLevel<max?`<button data-staff-upgrade="${id}" data-cost="${costs[rankLevel]}" ${!canSpend(costs[rankLevel])?'disabled':''}>ارتقای زیرسطح • ${money(costs[rankLevel])}</button>`:'<span class="pill">بالاترین سطح</span>'}`:''}</div>`}).join('');
 return `<p class="note">در آغاز باشگاه کادر فنی ندارد. هزینه‌های استخدام و ارتقا و دستمزدهای تازه، تا زمان آزمون تعادل آزمایشی‌اند؛ خرید فقط از نقد آزاد پس از ذخیرهٔ تعهدات قطعی انجام می‌شود.</p><div class="event staff-card"><b>مربی بدنساز</b><div class="subgrid"><div class="stat"><small>رتبه و زیرسطح</small><strong>${level?`${fitnessRank(level)} • ${num((level-1)%3+1)} از ۳`:'استخدام نشده'}</strong></div><div class="stat"><small>اثر بر تمرین دستی</small><strong>${level?`ضریب ${num((1+level*.025).toFixed(2))}`:'بدون مربی'}</strong></div><div class="stat"><small>دستمزد سالانه</small><strong>${money(wage[level])}</strong></div></div><p class="note">تمرین فقط با انتخاب دستی مدیر اجرا می‌شود. بدنساز می‌تواند روی پیشرفت تمرین دستی اثر بگذارد؛ هیچ تمرین روزانه یا هفتگی خودکاری انجام نمی‌شود.</p>${level<12?`<button data-fitness-upgrade data-cost="${level===0?38000:costs[level]}" ${!canSpend(level===0?38000:costs[level])?'disabled':''}>${level===0?'استخدام بدنساز سطح ۱':'ارتقای بدنساز به سطح '+num(level+1)} • ${money(level===0?38000:costs[level])}</button>`:'<span class="pill">بالاترین سطح</span>'}</div><h3>ساختار کادر فنی</h3>${rows}${staff.coach&&staff.coachProfile?`<div class="event staff-card"><b>ویژگی‌های ذاتی سرمربی</b><div class="subgrid">${[['tactics','تاکتیک'],['attack','حمله'],['defence','دفاع'],['development','پرورش بازیکن'],['management','مدیریت تیم']].map(([k,n])=>`<div class="stat"><small>${n}</small><strong>${num(staff.coachProfile.traits?.[k]||50)} از ۱۰۰</strong></div>`).join('')}</div><p class="note">مجوز: ${staff.coachProfile.license} • رتبهٔ اکتسابی فعلی: ${num(staff.coachProfile.rankLevel||1)} از ۱۲. این ویژگی‌ها ذاتی‌اند و با پرداخت پول افزایش نمی‌یابند.</p></div>`:''}<p class="note">رتبهٔ سرمربی از تجربه و دستاوردها به دست می‌آید و قابل خرید نیست. پنج ویژگی فنی سرمربی ذاتی‌اند و با پرداخت پول افزایش پیدا نمی‌کنند. نگاشت مجوز سرمربی به دسته‌های لیگ هنوز نیازمند تصمیم است.</p>`;
}
function ensureCountryCup(countryId){
 state.cups??={};
 let cup=state.cups[countryId];
 if(cup?.completed&&cup.championId)return cup;
 // Build and finish this country's independent cup without changing the user's active country/save context.
 const oldCountry=state.country,oldCup=state.cup,oldTier=state.tier,oldGroup=state.group;
 try{
  state.country=countryId;state.tier=1;state.group='G1';
  if(!cup?.progressiveFormat||cup.season!==state.season){initCup();cup=state.cup;}
  else state.cup=cup;
  // The UCL qualifier lookup may happen before the cup calendar reaches its final day.
  // Do not invent a champion early: the true winner is only known after day 31.
  return state.cups[countryId]||state.cup;
 }finally{state.country=oldCountry;state.cup=oldCup;state.tier=oldTier;state.group=oldGroup;}
}
function uclSorted(){return (state.ucl?.table||[]).slice().sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.name.localeCompare(b.name));}
function captureUclLeagueRanks(){
 const ranks={};
 for(const c of countries){const league=state.leagues[key(c.id,1,'G1')];ranks[c.id]=sortTeams(league).map((t,i)=>({...t,country:c.id,countryName:c.name,leagueRank:i+1}));}
 return ranks;
}
function buildUclQualificationSnapshot(ranks){
 const entrants=[];
 for(const c of countries){
  const ranked=ranks?.[c.id]||[];if(ranked.length<6)return null;
  const countryCup=state.cups?.[c.id];
  if(!countryCup?.completed||!countryCup.championId||countryCup.season!==state.season)return null;
  for(let i=0;i<5;i++)entrants.push({...ranked[i],seedSource:`لیگ رتبه ${i+1}`,qualificationType:'league',pot:1});
  const cupWinner=countryCup.teams?.find(t=>t.id===countryCup.championId)||null;
  if(!cupWinner)return null;
  const winnerAlreadyInTopFive=ranked.slice(0,5).some(t=>t.id===cupWinner.id);
  if(winnerAlreadyInTopFive){
   entrants.push({...ranked[5],seedSource:'سهمیه جایگزین قهرمان جام حذفی (رتبه ۶ لیگ)',qualificationType:'cupReplacement',pot:2});
  }else{
   const winnerRank=ranked.findIndex(t=>t.id===cupWinner.id)+1;
   entrants.push({...cupWinner,country:c.id,countryName:c.name,leagueRank:winnerRank||null,seedSource:'قهرمان جام حذفی',qualificationType:'cup',pot:2});
  }
 }
 if(entrants.length!==36||new Set(entrants.map(t=>t.id)).size!==36)return null;
 const all=entrants.map(t=>({...t}));
 const first=all.filter(t=>t.leagueRank===1).slice(0,6);
 const runners=all.filter(t=>t.leagueRank===2).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga));
 const cupBerths=all.filter(t=>t.qualificationType==='cup'||t.qualificationType==='cupReplacement');
 const pot1=[...first,...runners.slice(0,3)];
 const pot2=[...cupBerths,...runners.slice(3)];
 const thirds=all.filter(t=>t.leagueRank===3).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga));
 const fourths=all.filter(t=>t.leagueRank===4).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga));
 const fifths=all.filter(t=>t.leagueRank===5).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga));
 const pots=[pot1,[...pot2], [...thirds.slice(0,6),...fourths.slice(0,3)], [...fourths.slice(3),...fifths]];
 const used=new Set();
 for(let pi=0;pi<4;pi++){
  pots[pi]=pots[pi].filter(t=>!used.has(t.id)).slice(0,9);
  pots[pi].forEach(t=>{used.add(t.id);t.pot=pi+1});
 }
 const leftovers=all.filter(t=>!used.has(t.id));
 for(const t of leftovers){const target=pots.find(p=>p.length<9);if(target){t.pot=pots.indexOf(target)+1;target.push(t);used.add(t.id)}}
 const flat=pots.flat();
 if(flat.length!==36||pots.some(p=>p.length!==9))return null;
 return {season:state.season,createdDay:31,teams:flat,pots};
}
function uclQualifiers(){
 const snapshot=state.nextUclQualificationSnapshot;
 if(!snapshot?.teams||snapshot.teams.length!==36)return null;
 const teams=snapshot.teams.map(t=>({...t}));
 const pots=[1,2,3,4].map(n=>teams.filter(t=>t.pot===n));
 if(pots.some(p=>p.length!==9)||new Set(teams.map(t=>t.id)).size!==36)return null;
 return {teams,pots,qualificationSeason:snapshot.season};
}
function makeUclSchedule(teams,pots){
 const counts=Object.fromEntries(teams.map(t=>[t.id,{}])),opponents=Object.fromEntries(teams.map(t=>[t.id,new Set()])),home=Object.fromEntries(teams.map(t=>[t.id,0]));const rounds=[];const seedBase=state.season*800+teams.length*31;
 function findMatching(round,attempt){
  const remaining=new Set(teams.map(t=>t.id)),pairs=[];
  function recurse(){if(!remaining.size)return true;
   let chosen=null,options=null;
   for(const id of remaining){const t=teams.find(x=>x.id===id);const opts=[...remaining].filter(oid=>oid!==id).map(oid=>teams.find(x=>x.id===oid)).filter(o=>o.country!==t.country&&!opponents[id].has(o.id)&&(counts[id][o.pot]||0)<2&&(counts[o.id][t.pot]||0)<2);
    if(!options||opts.length<options.length){chosen=t;options=opts;if(opts.length<=1)break;}}
   if(!chosen||!options.length)return false;
   options.sort((a,b)=>rng(seedBase+round*10007+attempt*701+chosen.id.length*31+a.id.length)-rng(seedBase+round*10007+attempt*701+chosen.id.length*31+b.id.length));
   for(const other of options){remaining.delete(chosen.id);remaining.delete(other.id);pairs.push([chosen,other]);if(recurse())return true;pairs.pop();remaining.add(chosen.id);remaining.add(other.id);}
   return false;
  }
  return recurse()?pairs:null;
 }
 for(let round=0;round<8;round++){
  let found=null;for(let attempt=0;attempt<300&&!found;attempt++)found=findMatching(round,attempt);
  if(!found)throw Error(`قرعه‌کشی لیگ قهرمانان برای هفته ${round+1} با شروط سید و کشور حل نشد.`);
  rounds.push(found.map(([a,b],i)=>{let homeTeam=a,awayTeam=b;if((home[a.id]||0)>=(home[b.id]||0)){homeTeam=b;awayTeam=a;}if(home[homeTeam.id]>=4&&home[awayTeam.id]<4){homeTeam=awayTeam;awayTeam=homeTeam===a?b:a;}home[homeTeam.id]=(home[homeTeam.id]||0)+1;counts[a.id][b.pot]=(counts[a.id][b.pot]||0)+1;counts[b.id][a.pot]=(counts[b.id][a.pot]||0)+1;opponents[a.id].add(b.id);opponents[b.id].add(a.id);return {id:`UCL-${round+1}-${i+1}`,home:homeTeam.id,away:awayTeam.id,played:false,scoreHome:null,scoreAway:null,round:round+1};}));
 }
 // Orient the 8-regular schedule graph as an Euler circuit so every club gets exactly four home and four away matches.
 const adjacency=Object.fromEntries(teams.map(t=>[t.id,[]]));let edgeId=0;const edgeMap=new Map();
 for(let ri=0;ri<rounds.length;ri++)for(let mi=0;mi<rounds[ri].length;mi++){const m=rounds[ri][mi],eid=edgeId++;edgeMap.set(eid,{round:ri,match:mi});adjacency[m.home].push({to:m.away,eid});adjacency[m.away].push({to:m.home,eid});}
 const usedEdges=new Set(),stack=[teams[0].id],tour=[];
 while(stack.length){const v=stack[stack.length-1];while(adjacency[v].length&&usedEdges.has(adjacency[v][adjacency[v].length-1].eid))adjacency[v].pop();if(!adjacency[v].length){tour.push(stack.pop());continue;}const e=adjacency[v].pop();if(usedEdges.has(e.eid))continue;usedEdges.add(e.eid);stack.push(e.to);}
 // Each consecutive pair in the Euler tour represents an edge; orient it in tour direction.
 const degree=Object.fromEntries(teams.map(t=>[t.id,0]));
 for(let i=0;i<tour.length-1;i++){const from=tour[i],to=tour[i+1];const candidates=[];for(const [eid,loc] of edgeMap){if(usedEdges.has('oriented-'+eid))continue;const m=rounds[loc.round][loc.match];if((m.home===from&&m.away===to)||(m.home===to&&m.away===from))candidates.push([eid,loc,m]);}if(!candidates.length)continue;const [eid,loc,m]=candidates[0];m.home=from;m.away=to;usedEdges.add('oriented-'+eid);degree[from]++;}
 return rounds;
}
function startUcl(){
 if(state.ucl?.initialized&&state.ucl.season===state.season){event('لیگ قهرمانان این فصل قبلاً قرعه‌کشی شده است.','info');render();return;}
 if(state.ucl?.champion&&state.ucl?.season&&!state.ucl.history?.some(h=>Number(h.season)===Number(state.ucl.season)))recordUclSeasonHistory(state.ucl);
 const priorHistory=Array.isArray(state.ucl?.history)?state.ucl.history.slice():[];
 const q=uclQualifiers();if(!q){event('سهمیه‌های لیگ قهرمانان هنوز آماده نیستند؛ ابتدا باید فصل قبل تمام شود و قهرمان واقعی جام حذفی هر شش کشور مشخص باشد. سهمیهٔ موقت انتخاب نمی‌شود.','warn');render();return;}
 const teams=q.teams.map(t=>({...t,played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}));const pots=[1,2,3,4].map(n=>teams.filter(t=>t.pot===n));
 const rounds=makeUclSchedule(teams,pots);
 state.ucl={initialized:true,season:state.season,qualificationSeason:q.qualificationSeason,leagueRound:0,teams,leagueMatches:rounds,table:teams.map(t=>({...t})),playoffMatches:[],playoffDone:false,bracket:{},champion:null,history:priorHistory,prizesPaid:{},finalRewardsPaid:false,finalizedSeason:null};
 state.nextUclQualificationSnapshot=null;
 event(`قرعه‌کشی لیگ قهرمانان انجام شد: ۳۶ تیم بر اساس نتایج فصل ${num(q.qualificationSeason)}؛ قهرمانان واقعی جام حذفی یا سهمیهٔ جایگزین رتبهٔ ششم.`, 'good');render();save();
}
function uclPlayGame(m,neutral=false,seedOffset=0){const a=state.ucl.teams.find(t=>t.id===m.home),b=state.ucl.teams.find(t=>t.id===m.away);if(!a||!b)return null;const seed=state.season*900000+state.ucl.leagueRound*101+m.id.split('-').reduce((x,y)=>x+y.length,0)+(m.round||0)+seedOffset;const ap=teamMatchProfile(a),bp=teamMatchProfile(b);const homeAdv=neutral?0:2.4;const x=sampleGoals(Math.max(.25,1.22+(ap.attack+homeAdv-bp.defence)*.035),seed),y=sampleGoals(Math.max(.2,1.08+(bp.attack-ap.defence)*.035),seed+13);m.played=true;m.scoreHome=x;m.scoreAway=y;m.winner=x===y?(rng(seed+97)>.5?a:b):(x>y?a:b);m.neutral=neutral;return m;}
function updateUclTable(){const map=new Map(state.ucl.teams.map(t=>[t.id,t]));for(const t of map.values())Object.assign(t,{played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0});for(const round of state.ucl.leagueMatches)for(const m of round){if(!m.played)continue;const a=map.get(m.home),b=map.get(m.away);a.played++;b.played++;a.gf+=m.scoreHome;a.ga+=m.scoreAway;b.gf+=m.scoreAway;b.ga+=m.scoreHome;if(m.scoreHome>m.scoreAway){a.w++;b.l++;a.pts+=3}else if(m.scoreHome<m.scoreAway){b.w++;a.l++;b.pts+=3}else{a.d++;b.d++;a.pts++;b.pts++}}state.ucl.table=Array.from(map.values());}
function playUclRound(){const u=state.ucl;if(!u.initialized){startUcl();return}if(u.leagueRound>=8){event('مرحلهٔ لیگ قهرمانان به پایان رسیده است.','info');render();return}for(const m of u.leagueMatches[u.leagueRound])uclPlayGame(m);u.leagueRound++;updateUclTable();event(`هفتهٔ ${num(u.leagueRound)} لیگ قهرمانان برگزار شد.`,'good');render();save();}
function playUclPlayoff(){const u=state.ucl;if(!u.initialized||u.leagueRound<8){event('ابتدا هر هشت هفتهٔ مرحلهٔ لیگ قهرمانان را برگزار کنید.','warn');render();return}if(u.playoffDone)return;const table=uclSorted();u.playoffMatches=[];for(let i=0;i<8;i++){const a=table[8+i],b=table[23-i];if(a&&b){const m={id:`UCL-PO-${i+1}`,home:a.id,away:b.id,round:1};uclPlayGame(m,true);u.playoffMatches.push(m)}}u.playoffDone=true;u.bracket={r16:[...table.slice(0,8).map(t=>({id:t.id,name:t.name,country:t.country,countryName:t.countryName})),...u.playoffMatches.map(m=>{const t=u.teams.find(x=>x.id===m.winner.id);return {id:t.id,name:t.name,country:t.country,countryName:t.countryName}})]};event('پلی‌آف تک‌بازی انجام شد؛ هشت برنده به یک‌هشتم نهایی رسیدند.','good');render();save();}
function uclTie(a,b,id){const leg1={id:id+'-L1',home:a.id,away:b.id,round:1},leg2={id:id+'-L2',home:b.id,away:a.id,round:2};uclPlayGame(leg1,false,101);uclPlayGame(leg2,false,202);let sa=leg1.scoreHome+leg2.scoreAway,sb=leg1.scoreAway+leg2.scoreHome;if(sa===sb){if(rng(state.season*733+id.length)>.5)sa++;else sb++;}return {id,home:a.id,away:b.id,played:true,leg1,leg2,scoreHome:sa,scoreAway:sb,winner:sa>sb?a:b};}
function awardUclPrize(stage,team){const u=state.ucl;u.prizesPaid??={};if(u.prizesPaid[stage])return;const isUser=team&&(team.id==='USER_CLUB'||team.isHuman);const prize={r16:40000,qf:80000,sf:140000,finalist:220000,champion:400000}[stage]||0;if(isUser&&prize>0){state.cash+=prize;state.seasonPrizeIncome=(state.seasonPrizeIncome||0)+prize;event(`پاداش لیگ قهرمانان برای ${stage==='champion'?'قهرمانی':stage==='finalist'?'رسیدن به فینال':stage==='sf'?'نیمه‌نهایی':stage==='qf'?'یک‌چهارم نهایی':'یک‌هشتم نهایی'}: ${money(prize)} به حساب باشگاه افزوده شد.`,'good')}u.prizesPaid[stage]=true;}
function recordUclSeasonHistory(u=state.ucl){
 if(!u||!u.champion||!u.season)return false;u.history=Array.isArray(u.history)?u.history:[];if(u.history.some(h=>Number(h.season)===Number(u.season)))return false;
 const final=u.bracket?.finalMatches?.[0]||null;const winnerId=final?.winner?.id||u.teams?.find(t=>t.name===u.champion)?.id||null;const finalists=final?[final.home,final.away].map(id=>{const t=u.teams?.find(x=>x.id===id);return t?{id:t.id,name:t.name,country:t.country,countryName:t.countryName}:null}).filter(Boolean):[];
 u.history.unshift({season:Number(u.season),qualificationSeason:Number(u.qualificationSeason??u.season-1),champion:u.champion,championId:winnerId,finalists,finalScore:final?{home:Number(final.scoreHome),away:Number(final.scoreAway)}:null,completed:true,recordedAtDay:31,table:(u.table||[]).slice().sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||a.name.localeCompare(b.name)).map((t,i)=>({rank:i+1,id:t.id,name:t.name,country:t.country,pts:t.pts,w:t.w,d:t.d,l:t.l,gf:t.gf,ga:t.ga})),qualificationSources:(u.teams||[]).map(t=>({id:t.id,country:t.country,qualificationType:t.qualificationType||null,seedSource:t.seedSource||null,pot:t.pot}))});u.history=u.history.slice(0,20);u.finalizedSeason=Number(u.season);return true;
}
function playUclKnockout(){const u=state.ucl;if(!u.playoffDone){event('ابتدا پلی‌آف را برگزار کنید.','warn');render();return}const stages=['r16','qf','sf','final'];const stage=stages.find(k=>!u.bracket[k+'Done']);if(!stage)return;
 if(stage==='r16'){const direct=uclSorted().slice(0,8),winners=u.playoffMatches.map(m=>u.teams.find(t=>t.id===m.winner.id));const ties=[];for(let i=0;i<8;i++)ties.push(uclTie(direct[i],winners[7-i],`UCL-R16-${i+1}`));u.bracket.r16Matches=ties;u.bracket.r16Winners=ties.map(m=>m.winner);u.bracket.r16Done=true;awardUclPrize('r16',u.bracket.r16Winners.find(t=>t.id==='USER_CLUB'));event('یک‌هشتم نهایی رفت‌وبرگشت برگزار شد.','info');
 }else if(stage==='qf'||stage==='sf'){const prev=stage==='qf'?'r16Winners':'qfWinners',teams=u.bracket[prev]||[];if(teams.length<2){event('تیم‌های مرحلهٔ بعدی آماده نیستند.','warn');render();return}const ties=[];for(let i=0;i<teams.length;i+=2)ties.push(uclTie(teams[i],teams[i+1],`UCL-${stage.toUpperCase()}-${i/2+1}`));u.bracket[stage+'Matches']=ties;u.bracket[stage+'Winners']=ties.map(m=>m.winner);u.bracket[stage+'Done']=true;awardUclPrize(stage,u.bracket[stage+'Winners'].find(t=>t.id==='USER_CLUB'));event(`${stage==='qf'?'یک‌چهارم نهایی':'نیمه‌نهایی'} رفت‌وبرگشت برگزار شد.`,'good');
 }else{const teams=u.bracket.sfWinners||[];if(teams.length!==2){event('دو فینالیست مشخص نشده‌اند.','warn');render();return}const m={id:'UCL-FINAL',home:teams[0].id,away:teams[1].id,round:5};uclPlayGame(m,true,404);if(m.scoreHome===m.scoreAway){if(rng(state.season*997)>.5)m.scoreHome++;else m.scoreAway++;m.winner=m.scoreHome>m.scoreAway?teams[0]:teams[1]}u.bracket.finalMatches=[m];u.bracket.finalDone=true;u.champion=m.winner.name;if(!u.finalRewardsPaid){if(m.winner.id==='USER_CLUB'||m.winner.isHuman){awardUclPrize('champion',m.winner);state.achievements??={};state.achievements.uclChampion=true;state.boxes??={normal:0,rare:0,epic:0,legendary:0};state.boxes.legendary=(state.boxes.legendary||0)+1;event('دستاورد قهرمانی لیگ قهرمانان ثبت شد؛ یک صندوق افسانه‌ای دریافت کردید.','good')}else if(teams.some(t=>t.id==='USER_CLUB'))awardUclPrize('finalist',teams.find(t=>t.id==='USER_CLUB'));u.finalRewardsPaid=true;}recordUclSeasonHistory(u);event(`قهرمان لیگ قهرمانان: ${u.champion}. فینال در زمین بی‌طرف برگزار شد.`,'good')}
 render();save();}
function uclHTML(){const u=state.ucl;if(!u.initialized)return `<p class="note">لیگ قهرمانان: ۳۶ تیم از شش کشور؛ از هر کشور پنج تیم برتر لیگ برتر و قهرمان جام حذفی. چهار سید ۹ تیمی، هشت بازی برای هر تیم (چهار خانگی و چهار خارج از خانه)، سپس صعود مستقیم ۸ تیم و پلی‌آف رتبه‌های ۹ تا ۲۴.</p><p class="note">سهمیه‌ها فقط پس از پایان فصل و مشخص‌شدن قهرمان واقعی جام حذفی هر شش کشور ثبت می‌شوند. پیش از آن، قرعه‌کشی انجام نمی‌شود و نمایندهٔ موقت انتخاب نخواهد شد.</p><button id="startUcl">تولید سهمیه‌ها و قرعه‌کشی ۳۶ تیم</button><h3>تاریخچهٔ لیگ قهرمانان</h3><div class="events">${(u.history||[]).map(h=>`<div class="event"><b>فصل ${num(h.season)} — ${h.champion}</b><br><small>${h.finalists?.map(t=>t.name).join(' • ')||'فینالیست‌ها در ذخیرهٔ تاریخی قدیمی موجود نبودند'}${h.finalScore?` • ${num(h.finalScore.home)}–${num(h.finalScore.away)}`:''}</small></div>`).join('')||'<div class="empty">هنوز تاریخچه‌ای ثبت نشده است.</div>'}</div>`;
 const table=uclSorted();const matches=u.leagueMatches[u.leagueRound]||[];const rows=table.map((t,i)=>`<tr class="${t.id==='USER_CLUB'?'me':''}"><td>${i+1}</td><td>${t.name}</td><td>${t.countryName||t.country}</td><td>${t.played}</td><td>${t.w}-${t.d}-${t.l}</td><td>${t.gf}:${t.ga}</td><td><b>${t.pts}</b></td><td>سید ${t.pot}</td></tr>`).join('');const matchList=matches.map(m=>{const a=u.teams.find(t=>t.id===m.home),b=u.teams.find(t=>t.id===m.away);return `<div class="event row"><span>${a?.name||m.home} — ${b?.name||m.away}</span><b>${m.played?`${m.scoreHome}–${m.scoreAway}`:'در انتظار'}</b></div>`}).join('');const playoff=u.playoffMatches.map(m=>`<div class="event row"><span>${u.teams.find(t=>t.id===m.home)?.name} — ${u.teams.find(t=>t.id===m.away)?.name}</span><b>${m.scoreHome}–${m.scoreAway}</b></div>`).join('');return `<div class="subgrid"><div class="stat"><small>باشگاه‌ها</small><strong>۳۶</strong></div><div class="stat"><small>هفته‌های مرحله لیگ</small><strong>${u.leagueRound}/۸</strong></div><div class="stat"><small>صعود مستقیم</small><strong>۸</strong></div><div class="stat"><small>قهرمان</small><strong>${u.champion||'—'}</strong></div><div class="stat"><small>جایزهٔ قاره‌ای این فصل</small><strong>${money(state.seasonPrizeIncome||0)}</strong></div></div><h3>مرحلهٔ لیگ</h3><button id="playUclRound" ${u.leagueRound>=8?'disabled':''}>برگزاری هفتهٔ ${Math.min(8,u.leagueRound+1)}</button><div class="events">${matchList}</div><h3>جدول ۳۶ تیمی</h3><div class="table-wrap"><table><thead><tr><th>#</th><th>باشگاه</th><th>کشور</th><th>بازی</th><th>ب-م-خ</th><th>گل</th><th>امتیاز</th><th>سید</th></tr></thead><tbody>${rows}</tbody></table></div><h3>پلی‌آف رتبه‌های ۹ تا ۲۴</h3><button id="playUclPlayoff" ${u.leagueRound<8||u.playoffDone?'disabled':''}>برگزاری پلی‌آف</button><div class="events">${playoff||'<div class="empty">هنوز پلی‌آف برگزار نشده است.</div>'}</div><h3>مرحلهٔ حذفی</h3><button id="playUclKnockout" ${!u.playoffDone||u.champion?'disabled':''}>اجرای مرحلهٔ حذفی بعدی</button><div class="events">${Object.entries(u.bracket||{}).filter(([k,v])=>Array.isArray(v)&&v.some(x=>x&&x.played)).map(([k,v])=>`<h4>${k}</h4>${v.map(m=>m?.home?`<div class="event">${u.teams.find(t=>t.id===m.home)?.name} ${m.scoreHome}–${m.scoreAway} ${u.teams.find(t=>t.id===m.away)?.name}</div>`:'').join('')}`).join('')||'<div class="empty">مرحلهٔ حذفی هنوز آغاز نشده است.</div>'}</div><h3>تاریخچهٔ فصل‌های لیگ قهرمانان</h3><div class="events">${(u.history||[]).map(h=>`<div class="event"><b>فصل ${num(h.season)} — ${h.champion}</b><br><small>${h.finalists?.map(t=>t.name).join(' • ')||'فینالیست‌ها در ذخیرهٔ تاریخی قدیمی موجود نبودند'}${h.finalScore?` • ${num(h.finalScore.home)}–${num(h.finalScore.away)}`:''}</small></div>`).join('')||'<div class="empty">هنوز تاریخچه‌ای ثبت نشده است.</div>'}</div>`;}

function cupHTML(){const cup=state.cup, names={1:'مرحلهٔ سراسری',2:'یک‌هشتم نهایی',3:'یک‌چهارم نهایی',4:'نیمه‌نهایی',5:'فینال'}, matches=cup.initialized?(cup.matches[cup.round-1]||[]):[];const cards=matches.map(m=>`<div class="event row"><span><b>${m.a.name}</b> ${m.played?`${m.scoreA}–${m.scoreB}`:'—'} <b>${m.b.name}</b></span><span>${m.played?`صعود: ${m.winner.name}`:'در انتظار شبیه‌سازی'}</span></div>`).join('');return `<div class="stat"><small>جام حذفی کشور ${countries.find(c=>c.id===state.country).name}</small><strong>${cup.champion?`قهرمان: ${cup.champion}`:cup.initialized?(names[cup.round]||`دور ${cup.round}`):'آمادهٔ قرعه‌کشی'}</strong></div><p class="note">جام حذفی سراسری با حضور تمام ۱٬۰۰۸ باشگاه هر کشور از شش سطح لیگ. دستهٔ ششم شروع می‌کند؛ دسته‌های پنجم، چهارم و سوم به‌ترتیب پس از هفته‌های ۵، ۱۰، ۱۵ و ۲۰ وارد می‌شوند. دستهٔ دوم و سپس دستهٔ اول در روز ۳۱ اضافه می‌شوند تا فینال همان روز تعیین شود. هر مسابقه تک‌بازی و زمین بی‌طرف است.</p><button id="playCup" disabled>${cup.champion?'جام به پایان رسیده':'اجرای خودکار در هفتهٔ برنامه‌ریزی‌شده'}</button>${cup.initialized?`<h3>مسابقات دور جاری</h3>${cards||'<div class="empty">مسابقه‌ای در این دور باقی نمانده است.</div>'}`:''}<h3>نتایج دورهای برگزارشده</h3><div class="events">${cup.done.map(x=>`<div class="event">${x}</div>`).join('')||'<div class="empty">هنوز مسابقه‌ای در جام انجام نشده است.</div>'}</div>`;}
function buyPlayer(id){const i=state.market.findIndex(p=>p.id===id);if(i<0)return;const p=state.market[i];if(state.transferRestricted||state.squad.length>=32||!canSpend(p.fee)){event('خرید انجام نشد: محدودیت مالی، ظرفیت یا نقدینگی آزاد پس از ذخیرهٔ دستمزدها کافی نیست.','warn');return}state.cash-=p.fee;state.seasonTransferCosts=(state.seasonTransferCosts||0)+p.fee;if(typeof recordFinance==='function')recordFinance('expense_transfer',p.fee,`خرید بازیکن ${p.name}`);state.squad.push({...p,id:'P'+(Date.now())+'-'+Math.random().toString(36).slice(2,7),wage:p.wage});state.market.splice(i,1);event(`${p.name} با پرداخت کامل ${money(p.fee)} به تیم پیوست.`,'good');render();save()}
function sellPlayer(id){const i=state.squad.findIndex(p=>p.id===id);if(i<0)return;const windowOpen=state.week===0||(state.week>=15&&state.week<=18);if(!windowOpen||state.transferRestricted){event('فروش انجام نشد: پنجره بسته است یا محدودیت مالی فعال است.','warn');render();return}const p=state.squad[i];const value=playerValue(p);const ask=prompt(`پیشنهاد قیمت برای ${p.name} را وارد کنید. ارزش برآوردی: ${money(value)}`,String(value));if(ask===null)return;const fee=Math.floor(Number(ask));if(!Number.isFinite(fee)||fee<=0){alert('مبلغ معتبر نیست.');return}const accepted=fee>=value*.78 || rng(state.season*777+state.week*91+p.ovr+fee%997)>.72;if(accepted){const proceeds=Math.round(fee*.95);state.cash+=proceeds;state.seasonTransferIncome=(state.seasonTransferIncome||0)+proceeds;if(typeof recordFinance==='function')recordFinance('income_transfer',proceeds,`فروش بازیکن ${p.name}`,{grossFee:fee,transactionFee:fee-proceeds});state.squad.splice(i,1);const text=`پیشنهاد ${money(fee)} برای ${p.name} پذیرفته شد؛ دریافتی خالص ${money(proceeds)}.`;state.offers.unshift({text,fee,player:p.name,accepted:true});event(text,'good')}else{const counter=Math.round(value*(1.05+rng(fee+p.ovr)*.25));const text=`پیشنهاد ${money(fee)} برای ${p.name} رد شد؛ قیمت درخواستی باشگاه مقابل ${money(counter)} است.`;state.offers.unshift({text,fee,player:p.name,accepted:false,counter});event(text,'warn')}render();save()}
function loanPlayer(id){const i=state.squad.findIndex(p=>p.id===id);if(i<0)return;const windowOpen=state.week===0||(state.week>=15&&state.week<=18);if(!windowOpen||state.transferRestricted){event('قرض دادن فقط در پنجرهٔ نقل‌وانتقال و بدون محدودیت مالی ممکن است.','warn');render();return}const p=state.squad[i];if((state.loans||[]).some(l=>l.player?.id===p.id)){event('این بازیکن از قبل در فهرست قرض‌ها ثبت شده است.','warn');return}const value=playerValue(p);const loanWeeks=10;const fee=Math.round(value*.07);const wageSupport=Math.round(Math.max(0,Number(p.wage)||0)*loanWeeks/30);const totalReceipt=fee+wageSupport;if(!confirm(`قرض ${p.name} برای ${loanWeeks} هفته؟ دریافتی یکجای باشگاه: هزینهٔ قرض ${money(fee)} + سهم دستمزد دوره ${money(wageSupport)}؛ جمع ${money(totalReceipt)}. بازیکن پس از دوره برمی‌گردد.`))return;state.cash+=totalReceipt;state.seasonTransferIncome=(state.seasonTransferIncome||0)+totalReceipt;if(typeof recordFinance==='function')recordFinance('income_loan',totalReceipt,`قرض ${p.name}`,{loanFee:fee,wageSupport,loanWeeks});state.loans??=[];state.loans.push({id:p.id,name:p.name,player:p,startWeek:state.week,dueWeek:state.week+loanWeeks,returnWeek:state.week+loanWeeks,remainingWeeks:loanWeeks,loanWeeks,fee,wageSupport,wageSupportWeeks:loanWeeks,wageSupportPaid:true,totalReceipt,accountingModel:'upfront-full-wage-support'});state.squad.splice(i,1);state.offers??=[];state.offers.unshift({text:`قرض ${p.name} ثبت شد؛ هزینه ${money(fee)} و سهم دستمزد ${money(wageSupport)} دریافت شد.`,player:p.name,fee,wageSupport,totalReceipt,accepted:true,loan:true});event(`${p.name} برای ${loanWeeks} هفته قرض داده شد؛ دریافتی کل ${money(totalReceipt)} شامل هزینه و سهم دستمزد است.`,'good');render();save()}
function processLoans(){state.loans??=[];const pending=[];for(const loan of state.loans){if(!loan||!loan.player?.id)continue;if(!Number.isFinite(Number(loan.remainingWeeks))){loan.remainingWeeks=Math.max(0,Number(loan.loanWeeks)||Math.max(0,Number(loan.dueWeek??loan.returnWeek??state.week)-state.week))}loan.remainingWeeks=Math.max(0,Number(loan.remainingWeeks)-1);loan.dueWeek=Number.isFinite(Number(loan.dueWeek))?Number(loan.dueWeek):Number(loan.returnWeek??state.week);loan.returnWeek=loan.dueWeek;const due=loan.remainingWeeks<=0;if(due&&state.squad.length<32){if(!state.squad.some(p=>p.id===loan.player.id)){state.squad.push(loan.player);event(`${loan.name} پس از تکمیل دورهٔ قرض به تیم بازگشت.`,'info')}else event(`${loan.name}: از ثبت تکراری بازگشت جلوگیری شد.`,'warn')}else{pending.push(loan);if(due)event(`${loan.name} دورهٔ قرضش تمام شده اما فهرست اصلی پر است؛ بازگشت تا ایجاد جای خالی معلق ماند.`,'warn')}}state.loans=pending}
function dismissPlayer(id){const i=state.squad.findIndex(p=>p.id===id);if(i<0)return;const p=state.squad[i];const baseValue=playerValue(p);const fee=Math.round(baseValue*.10);const before=Math.max(0,Number(state.cash)||0);const paid=Math.min(before,fee);const shortfall=fee-paid;state.cash=before-paid;if(shortfall>0){state.transferRestricted=true;state.dismissalShortfall=(state.dismissalShortfall||0)+shortfall}state.squad.splice(i,1);state.loans=(state.loans||[]).filter(l=>l.player?.id!==p.id);state.market??=[];if(!state.market.some(x=>x.id===p.id)){state.market.push({...p,id:p.id,fee:0,wage:Math.max(0,Number(p.wage)||0),freeAgent:true})}const msg=shortfall>0?`${p.name} آزاد شد؛ هزینهٔ فسخ ${money(fee)} بود و کسری ${money(shortfall)} ثبت شد. محدودیت نقل‌وانتقال تا تسویه برقرار است.`:`${p.name} آزاد شد و به فهرست بازیکنان آزاد رفت؛ هزینهٔ فسخ ${money(fee)} پرداخت شد.`;event(msg,shortfall>0?'warn':'info');render();save()}
function promotePlayer(id){const i=state.academy.findIndex(p=>p.id===id);if(i<0||state.squad.length>=32)return;const p=state.academy.splice(i,1)[0];state.squad.push({...p,id:'P'+Date.now(),wage:playerWageSuggestion(p),innateTalent:p.innateTalent||'استعداد پنهان',earnedTalents:p.earnedTalents||[]});event(`${p.name} از آکادمی به تیم اصلی ارتقا یافت.`,'good');render();save()}
function initCup(){
 const country=state.country;const cup={round:1,done:[],champion:null,championId:null,teams:[],matches:[],pool:[],enteredTiers:[],initialized:true,progressiveFormat:true,season:state.season,country,rewardPaid:false};
 // All 1,008 clubs in this country's six-tier pyramid enter the same national cup, with lower tiers starting first.
 state.cup=cup;state.cups??={};state.cups[country]=cup;event(`جام حذفی ${countries.find(c=>c.id===country)?.name||country}: همهٔ ۱٬۰۰۸ باشگاه در شش سطح لیگ وارد رقابت می‌شوند؛ دسته‌های پایین‌تر زودتر آغاز می‌کنند.`,'info');
}
function playCup(){
 if(state.cup.champion)return;if(!state.cup.initialized)initCup();const cup=state.cup,matches=cup.matches[cup.round-1]||[];if(!matches.length){event('مرحلهٔ بعدی جام در دسترس نیست.','warn');render();return;}const winners=[];
 matches.forEach((m,i)=>{if(!m.played){const [ga,gb]=cupMatchScore(m.a,m.b,state.season*10000+cup.round*100+i*7);m.scoreA=ga;m.scoreB=gb;m.winner=ga>gb?m.a:m.b;m.played=true;const text=`${m.a.name} ${ga}–${gb} ${m.b.name} • صعود: ${m.winner.name}`;cup.done.unshift(`دور ${cup.round}: ${text}`);if(m.a.isUser||m.b.isUser)event(`جام حذفی: ${text}`,'good');}winners.push(m.winner);});
 if(winners.length===1){cup.champion=winners[0].name;cup.championId=winners[0].id;cup.country=state.country;cup.season=state.season;cup.completed=true;state.cups??={};state.cups[state.country]=cup;if(winners[0].id==='USER_CLUB'||winners[0].isHuman){awardAchievement('cupChampion','قهرمانی جام حذفی','epic');const prize=250000;state.cash+=prize;state.seasonPrizeIncome=(state.seasonPrizeIncome||0)+prize;event(`قهرمان جام حذفی: ${cup.champion}. پاداش ${money(prize)} به باشگاه شما پرداخت شد.`,'good');}else{event(`قهرمان جام حذفی ${countries.find(c=>c.id===state.country)?.name||state.country}: ${cup.champion}. پاداش به باشگاه قهرمان تعلق می‌گیرد.`,'good');}}
 else{const next=[];for(let i=0;i<winners.length;i+=2)next.push({a:winners[i],b:winners[i+1],played:false,winner:null,scoreA:null,scoreB:null});cup.matches.push(next);cup.round++;state.cups??={};state.cups[state.country]=cup;event(`دور ${num(cup.round)} جام حذفی قرعه‌کشی شد؛ ${num(winners.length)} تیم باقی مانده‌اند.`,'info');}render();save();
}
function standingsFor(c,t,g){return sortTeams(state.leagues[key(c,t,g)])}
function resetTeamStats(t){Object.assign(t,{played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0});return t}
function swapTeamBetween(c, fromT, fromG, fromIndex, toT, toG, toIndex, reason, log=true){
 const from=state.leagues[key(c,fromT,fromG)], to=state.leagues[key(c,toT,toG)];
 const a=from.teams[fromIndex], b=to.teams[toIndex];
 from.teams[fromIndex]=resetTeamStats({...b});
 to.teams[toIndex]=resetTeamStats({...a});
 if(log)event(`${countries.find(x=>x.id===c).name}: ${a.name} جابه‌جا شد با ${b.name} (${reason}).`,'warn');
}
function playoffWinner(teamA,teamB,seed){
 // Stage 1: single match, extra-time/penalties represented by a deterministic tiebreak.
 const scoreA=Math.floor(rng(seed)*4)+(teamA.pts>teamB.pts?1:0);
 const scoreB=Math.floor(rng(seed+31)*4)+(teamB.pts>teamA.pts?1:0);
 if(scoreA!==scoreB)return scoreA>scoreB?teamA:teamB;
 return rng(seed+67)>=0.5?teamA:teamB;
}
function playoffWinnerTwoLeg(teamA,teamB,seed){
 // Stage 2: home-and-away, aggregate score, no away-goals rule.
 const firstA=Math.floor(rng(seed)*4)+(teamA.pts>teamB.pts?1:0);
 const firstB=Math.floor(rng(seed+31)*4)+(teamB.pts>teamA.pts?1:0);
 const secondB=Math.floor(rng(seed+101)*4)+(teamB.pts>teamA.pts?1:0);
 const secondA=Math.floor(rng(seed+132)*4)+(teamA.pts>teamB.pts?1:0);
 const aggA=firstA+secondA, aggB=firstB+secondB;
 if(aggA!==aggB)return aggA>aggB?teamA:teamB;
 const extraA=Math.floor(rng(seed+211)*3), extraB=Math.floor(rng(seed+223)*3);
 if(extraA!==extraB)return extraA>extraB?teamA:teamB;
 return rng(seed+307)>=0.5?teamA:teamB;
}
function runSeasonMovement(){
 const log=[];
 for(const c of countries){
  const rank={};
  for(const t of tiers)for(const g of groupsForTier(t))rank[key(c.id,t,g)]=standingsFor(c.id,t,g);
  // Direct movement: every upper group maps to exactly two groups below it.
  for(let upperT=1;upperT<6;upperT++){
   const upperGroups=groupsForTier(upperT), lowerGroups=groupsForTier(upperT+1);
   for(let ui=0;ui<upperGroups.length;ui++){
    const ug=upperGroups[ui], lowerPair=[lowerGroups[ui*2],lowerGroups[ui*2+1]];
    const upper=state.leagues[key(c.id,upperT,ug)];
    const upperRank=rank[key(c.id,upperT,ug)];
    // Two lower champions replace upper 15th and 16th.
    for(let j=0;j<2;j++){
     const lg=lowerPair[j], lower=state.leagues[key(c.id,upperT+1,lg)], champion=rank[key(c.id,upperT+1,lg)][0], relegated=upperRank[14+j];
     swapTeamBetween(c.id,upperT+1,lg,lower.teams.findIndex(x=>x.id===champion.id),upperT,ug,upper.teams.findIndex(x=>x.id===relegated.id),'صعود/سقوط مستقیم');
    }
    // Runner-ups of the paired lower groups play one knockout match; winner challenges upper 14th.
    const a=rank[key(c.id,upperT+1,lowerPair[0])][1], b=rank[key(c.id,upperT+1,lowerPair[1])][1];
    const firstWinner=playoffWinner(a,b,state.season*100000+upperT*1000+ui*31+c.id.charCodeAt(0));
    const upper14=upperRank[13];
    const finalWinner=playoffWinner(firstWinner,upper14,state.season*200000+upperT*2000+ui*47+c.id.charCodeAt(0));
    if(finalWinner.id===firstWinner.id){
     const lowerGroup=firstWinner.id===a.id?lowerPair[0]:lowerPair[1];
     const lower=state.leagues[key(c.id,upperT+1,lowerGroup)];
     const upperNow=state.leagues[key(c.id,upperT,ug)];
     swapTeamBetween(c.id,upperT+1,lowerGroup,lower.teams.findIndex(x=>x.id===firstWinner.id),upperT,ug,upperNow.teams.findIndex(x=>x.id===upper14.id),'صعود پلی‌آف تک‌بازی');
     log.push(`${c.name} سطح ${upperT}: ${firstWinner.name} با دو برد تک‌بازی صعود کرد.`);
    }else log.push(`${c.name} سطح ${upperT}: ${upper14.name} در پلی‌آف تک‌بازی باقی ماند.`);
   }
  }
 }
 if(state.country&&state.tier&&state.group&&typeof awardAchievement==='function'){const userGroup=standingsFor(state.country,state.tier,state.group);if(userGroup[0]?.id==='USER_CLUB'||userGroup[0]?.isHuman)awardAchievement('leagueChampion','قهرمانی لیگ','epic');}
 for(const l of Object.values(state.leagues)){l.teams.forEach(resetTeamStats);l.results=[]}
 return log;
}

function completeCupForCountry(countryId){
 state.cups??={};let cup=state.cups[countryId];
 if(!cup||cup.season!==state.season||!cup.progressiveFormat){const oldCountry=state.country,oldCup=state.cup,oldTier=state.tier,oldGroup=state.group;try{state.country=countryId;state.tier=1;state.group='G1';initCup();cup=state.cup;}finally{state.country=oldCountry;state.cup=oldCup;state.tier=oldTier;state.group=oldGroup;}}
 if(cup.champion)return cup.champion;
 // Day 31: tier 2 joins the lower-tier qualifiers first; tier 1 enters only for the final national stage.
 if(!(cup.enteredTiers||[]).includes(2)){enterCupTier(cup,countryId,2,'ورود دستهٔ دوم در روز ۳۱',16,state.season*200000+31);}
 if(!(cup.enteredTiers||[]).includes(1)){enterCupTier(cup,countryId,1,'ورود دستهٔ اول و مراحل پایانی روز ۳۱',1,state.season*300000+31);}
 awardNationalCupChampion(cup,countryId);state.cups[countryId]=cup;if(countryId===state.country)state.cup=cup;return cup.champion||null;
}
function finishContinentalFinal(){
 const u=state.ucl;if(!u?.initialized||u.champion)return;
 // Complete missing phases in order so a scheduled season finale cannot leave the competition stranded.
 let guard=0;while(!u.champion&&guard++<20){
  if(u.leagueRound<8){for(const m of (u.leagueMatches[u.leagueRound]||[]))if(!m.played)uclPlayGame(m);u.leagueRound++;updateUclTable();continue;}
  if(!u.playoffDone){playUclPlayoff();continue;}
  const before=u.champion;playUclKnockout();if(u.champion||u.champion===before)break;
 }
}
function settleSeasonAndDraw(){
 const closingSeason=state.season;
 // Idempotency guard: a restored/retried day-32 action must never pay a season twice.
 if(Number(state.settledSeason)===Number(closingSeason)){state.calendarDay=33;state.seasonStage='new-season-ready';return;}
const openingCash=Number.isFinite(Number(state.seasonOpeningCash))?Number(state.seasonOpeningCash):(state.history.length?Number(state.history[state.history.length-1].closingCash??initialCash):initialCash);
 const userClub=clubTeam();const userLeague=Object.values(state.leagues).find(l=>l.teams.some(t=>t.id===userClub.id));const rank=Math.max(1,Number(state.seasonFinalRank)||((userLeague?.teams||[]).slice().sort((a,b)=>b.pts-a.pts||((b.gf-b.ga)-(a.gf-a.ga))).findIndex(t=>t.id===userClub.id)+1));
 const sponsorBase=({local:65000,regional:120000,national:210000})[state.sponsor]||65000;const sponsorMultiplier=rank===1?1.25:rank<=4?1.08:rank<=8?0.9:0.72;const sponsorIncome=Math.round(sponsorBase*sponsorMultiplier);state.cash+=sponsorIncome;state.seasonSponsorIncome=(state.seasonSponsorIncome||0)+sponsorIncome;recordFinance('income_sponsor',sponsorIncome,'تسویه اسپانسر روز ۳۲');event(`درآمد قرارداد اسپانسر (${state.sponsor}، رتبه ${num(rank)}): ${money(sponsorIncome)}.`,'good');
 const prizeScale=({1:180000,2:110000,3:75000,4:50000,5:30000,6:20000,7:12000,8:8000})[rank]||0;const prizeIncome=Math.round(prizeScale*(state.tier===1?1:state.tier===2?.72:state.tier===3?.5:state.tier===4?.32:state.tier===5?.2:.12));state.cash+=prizeIncome;state.seasonPrizeIncome=(state.seasonPrizeIncome||0)+prizeIncome;recordFinance('income_prize',prizeIncome,'پاداش رتبه لیگ روز ۳۲');
 const due=state.accruedWages;const paid=Math.min(state.cash,due);state.cash-=paid;recordFinance('expense_wages_paid',paid,'پرداخت دستمزد پایان فصل روز ۳۲');if(due-paid)recordFinance('liability_wages_shortfall',due-paid,'کسری دستمزد ثبت‌شده');state.wageShortfall+=due-paid;state.accruedWages=0;state.transferRestricted=state.wageShortfall>0||(state.dismissalShortfall||0)>0;
 state.history.push({season:closingSeason,week:state.week,calendarDay:32,openingCash,cashBeforeSettlement:state.cash+paid,closingCash:state.cash,ticketIncome:state.seasonTicketIncome||0,sponsorIncome:state.seasonSponsorIncome||0,prizeIncome:state.seasonPrizeIncome||0,operatingCosts:state.seasonOperatingCosts||0,transferIncome:state.seasonTransferIncome||0,transferCosts:state.seasonTransferCosts||0,wagesAccrued:state.seasonWagesAccrued||due,wagesPaid:paid,wageShortfall:due-paid,netCashChange:state.cash-openingCash});
 event(`تسویهٔ روز ۳۲: دستمزد ${money(paid)} پرداخت شد؛ ${money(due-paid)} به‌دلیل کمبود نقد پرداخت‌نشده ثبت شد.` ,due>paid?'bad':'good');
 // League movement and stats reset already happened on day 31. The common draw is now recorded for all countries and tiers.
 state.drawHistory??=[];state.drawHistory.unshift({season:closingSeason,day:32,countries:countries.length,tiers:tiers.length,groups:Object.keys(state.leagues).length,completed:true});state.drawHistory=state.drawHistory.slice(0,20);
 state.settledSeason=closingSeason;state.seasonStage='new-season-ready';state.calendarDay=33;
 state.seasonOpeningCash=state.cash;state.seasonTicketIncome=0;state.seasonTransferIncome=0;state.seasonTransferCosts=0;state.seasonSponsorIncome=0;state.seasonPrizeIncome=0;state.seasonOperatingCosts=0;state.seasonWagesAccrued=0;
 event('روز ۳۲: تسویهٔ مالی و قرعه‌کشی مشترک فصل جدید برای همهٔ کشورها و سطوح لیگ ثبت شد. اقدام بعدی، هفتهٔ اول فصل جدید است.','good');
}
function advanceSeasonCalendar(){
 state.calendarDay=Number.isInteger(Number(state.calendarDay))?Number(state.calendarDay):Math.min(31,Math.max(1,Number(state.week||0)+1));
 if(state.week<30){event(`ابتدا باید ۳۰ هفتهٔ لیگ تکمیل شود؛ اکنون ${num(state.week)} از ۳۰ هفته برگزار شده است.`,'warn');render();return;}
 if(state.calendarDay<=31){
  const userBeforeMovement=clubTeam();const leagueBeforeMovement=Object.values(state.leagues).find(l=>l.teams.some(t=>t.id===userBeforeMovement.id));state.seasonFinalRank=Math.max(1,(leagueBeforeMovement?.teams||[]).slice().sort((a,b)=>b.pts-a.pts||((b.gf-b.ga)-(a.gf-a.ga))).findIndex(t=>t.id===userBeforeMovement.id)+1);const uclLeagueRanks=captureUclLeagueRanks();const moves=runSeasonMovement();state.postseasonMoves=moves;for(const c of countries)completeCupForCountry(c.id);finishContinentalFinal();const nextUclSnapshot=buildUclQualificationSnapshot(uclLeagueRanks);if(nextUclSnapshot){state.nextUclQualificationSnapshot=nextUclSnapshot;event('سهمیه‌های فصل بعد لیگ قهرمانان بر اساس جدول نهایی و قهرمانان واقعی جام حذفی ذخیره شد.','good')}else{state.nextUclQualificationSnapshot=null;event('سهمیه‌های فصل بعد لیگ قهرمانان ذخیره نشد؛ اطلاعات کامل قهرمانی جام حذفی در همهٔ کشورها موجود نبود.','warn')}state.calendarDay=32;state.seasonStage='settlement-draw';
  event('روز ۳۱ تکمیل شد: پلی‌آف‌های صعود و سقوط همهٔ کشورها و سطوح اجرا شدند و فینال‌های رقابت‌های جامیِ فعال تعیین تکلیف شدند.','good');moves.slice(0,8).forEach(x=>event(x,'info'));if(moves.length>8)event(`و ${num(moves.length-8)} رویداد جابه‌جایی دیگر انجام شد.`,'info');render();save();return;
 }
 if(state.calendarDay===32){settleSeasonAndDraw();render();save();return;}
 if(state.calendarDay===33){agePlayersOneYear();const oldSeason=state.season;state.season++;state.week=0;state.calendarDay=1;state.seasonStage='league';state.postseasonMoves=[];state.seasonFinalRank=null;state.seasonOpeningCash=state.cash;state.accruedWages=0;state.seasonWagesAccrued=0;event(`هفتهٔ اول فصل ${num(oldSeason+1)} آغاز شد؛ سن بازیکنان یک سال افزایش یافت.`,'good');simulateWeek();return;}
}

function homeHTML(){
 const standings=sortTeams(league()).slice(0,5);
 const rank=sortTeams(league()).findIndex(t=>t.id===clubTeam().id)+1;
 const next=league().teams.find(t=>t.id!==clubTeam().id&&t.played===clubTeam().played) || league().teams[(state.week+7)%16];
 const starters=startingPlayers();
 const spots=[['ST',50,13],['LW',24,25],['RW',76,25],['CM',34,45],['CM',66,45],['DM',50,59],['LB',16,73],['CB',39,77],['CB',61,77],['RB',84,73],['GK',50,91]];
 const roster=starters.map((p,i)=>`<div class="ref-player" style="left:${spots[i][1]}%;top:${spots[i][2]}%"><div class="ref-face">${p.name.slice(0,1)}</div><b class="ref-rating">${num(p.ovr)}</b><span>${p.name}</span><small>${spots[i][0]}</small></div>`).join('');
 return `<section class="mobile-match-hero" aria-label="مسابقهٔ بعدی"><div class="mobile-match-top"><span class="match-prep-dot"></span><span>آماده‌سازی پیش از مسابقه</span><b>هفتهٔ ${num(state.week+1)} لیگ</b></div><div class="mobile-match-stadium"><div class="stadium-light left-light"></div><div class="stadium-light right-light"></div><div class="mobile-team"><div class="mobile-crest">♞</div><strong>باشگاه شما</strong><small>میزبان</small></div><div class="mobile-vs">VS</div><div class="mobile-team"><div class="mobile-crest rival-crest">${(next?.name||'حریف').slice(0,1)}</div><strong>${next?.name||'حریف بعدی'}</strong><small>میهمان</small></div></div><div class="mobile-match-meta"><span>◷ ساعت ۱۸:۰۰</span><span>⌖ ورزشگاه آزادی</span><button class="primary" onclick="document.querySelector('[data-tab=fixtures]').click()">جزئیات مسابقه <b>‹</b></button></div></section><div class="ref-dashboard">
 <section class="ref-pitch-panel"><div class="ref-section-head"><div><span class="ref-kicker">MATCHDAY SQUAD</span><h3>ترکیب اصلی</h3></div><button class="ref-link" onclick="document.querySelector('[data-tab=tactics]').click()">ویرایش ترکیب ←</button></div><div class="ref-pitch"><div class="ref-pitch-lines"><i></i><b></b><em></em><small></small></div>${roster}</div><div class="ref-coach"><div class="coach-mark">♟</div><div><small>سرمربی</small><b>کادر فنی باشگاه</b><span>آماده‌سازی برای مسابقهٔ بعدی</span></div><button onclick="document.querySelector('[data-tab=staff]').click()">›</button></div></section>
 <aside class="ref-club-panel"><div class="ref-club-title"><div><span class="ref-kicker">CLUB OVERVIEW</span><h3>باشگاه شما</h3><small>رتبهٔ فعلی: ${num(rank)}</small></div><div class="ref-mini-crest">♞</div></div><div class="ref-metrics"><div><span>♟</span><small>بازیکنان</small><b>${num(state.squad.length)}</b></div><div><span>◷</span><small>سن میانگین</small><b>${num(state.squad.length?state.squad.reduce((a,p)=>a+(p.age||0),0)/state.squad.length:0).replace(/(\.\d)$/, '$1')}</b></div><div><span>◆</span><small>قدرت تیم</small><b>${num(Math.round(state.squad.reduce((a,p)=>a+(p.ovr||0),0)/Math.max(1,state.squad.length)))}</b></div></div><h4>بازیکنان کلیدی</h4><div class="ref-key-players">${starters.slice(0,3).map(p=>`<div class="ref-key-player"><div class="ref-face small-face">${p.name.slice(0,1)}</div><div><b>${p.name}</b><small>${p.position==='GK'?'دروازه‌بان':p.position==='ST'?'مهاجم':p.position==='CB'?'مدافع':'بازیکن تیم'}</small></div><strong>${num(p.ovr)}</strong></div>`).join('')}</div><button class="ref-all-players" onclick="document.querySelector('[data-tab=players]').click()">مشاهدهٔ همهٔ بازیکنان　›</button></aside>
 </div><section class="ref-news"><div class="ref-news-photo"><span>⚽</span></div><div class="ref-news-copy"><small>اخبار تیم</small><b>${state.week===0?'آماده‌سازی تیم برای شروع فصل':'گزارش و آماده‌سازی هفتهٔ جاری'}</b><span>حریف بعدی: ${next?.name||'در انتظار تعیین'} • هفتهٔ ${num(state.week+1)}</span></div><button onclick="document.querySelector('[data-tab=fixtures]').click()">›</button></section>
 ${state.lastMatchReport?`<section class="home-card match-report-card"><div class="ref-section-head"><div><span class="ref-kicker">FULL TIME REPORT</span><h3>گزارش آخرین مسابقه</h3></div><strong class="match-report-score">${state.lastMatchReport.userScore||state.lastMatchReport.score}</strong></div><p class="note">${state.lastMatchReport.home} ${state.lastMatchReport.score} ${state.lastMatchReport.away} • هفتهٔ ${num(state.lastMatchReport.week)}</p><div class="subgrid"><div class="stat"><small>شوت</small><strong>${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.homeShots:state.lastMatchReport.stats.awayShots)} – ${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.awayShots:state.lastMatchReport.stats.homeShots)}</strong></div><div class="stat"><small>مالکیت</small><strong>${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.homePoss:state.lastMatchReport.stats.awayPoss)}٪ – ${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.awayPoss:state.lastMatchReport.stats.homePoss)}٪</strong></div><div class="stat"><small>کرنر</small><strong>${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.homeCorners:state.lastMatchReport.stats.awayCorners)} – ${num(state.lastMatchReport.userIsHome?state.lastMatchReport.stats.awayCorners:state.lastMatchReport.stats.homeCorners)}</strong></div></div>${state.lastMatchReport.playerRatings?.length?`<h4>ارزیابی بازیکنان اصلی</h4><div class="table-wrap"><table><thead><tr><th>بازیکن</th><th>پست</th><th>نمره</th></tr></thead><tbody>${state.lastMatchReport.playerRatings.map(p=>`<tr><td>${p.name}</td><td>${p.position||'—'}</td><td><b>${num(p.rating.toFixed(1))}/۱۰</b></td></tr>`).join('')}</tbody></table></div>`:''}<h4>خلاصهٔ فنی پس از مسابقه</h4><div class="events">${state.lastMatchReport.events.map(e=>`<div class="event"><span>${e.text}</span></div>`).join('')}</div>${state.lastMatchReport.coachNotes?.length?`<h4>پیشنهاد برای بازی بعد</h4><div class="events">${state.lastMatchReport.coachNotes.map(n=>`<div class="event"><span>${n}</span></div>`).join('')}</div>`:''}<p class="note">مسابقه به‌صورت شبیه‌سازی‌شده محاسبه می‌شود؛ نمایش زنده یا کنترل تاکتیک حین بازی وجود ندارد.</p></section>`:''}
 <div class="ref-lower-grid"><section class="home-card"><h3>جدول لیگ • پنج تیم برتر</h3><div class="table-wrap"><table><thead><tr><th>رتبه</th><th>باشگاه</th><th>بازی</th><th>امتیاز</th></tr></thead><tbody>${standings.map((t,i)=>`<tr class="${t.id===clubTeam().id?'me':''}"><td>${num(i+1)}</td><td>${t.name}</td><td>${num(t.played)}</td><td><b>${num(t.pts)}</b></td></tr>`).join('')}</tbody></table></div><button style="margin-top:10px;width:100%" onclick="document.querySelector('[data-tab=table]').click()">مشاهدهٔ جدول کامل ❯</button></section><section class="home-card"><h3>دسترسی سریع</h3><div class="quick-actions"><button class="quick-action" onclick="document.querySelector('[data-tab=market]').click()"><span class="qa-icon">⇄</span><b>نقل‌وانتقالات</b><small>خرید و فروش</small></button><button class="quick-action" onclick="document.querySelector('[data-tab=finance]').click()"><span class="qa-icon">◉</span><b>امور مالی</b><small>درآمد و هزینه</small></button><button class="quick-action" onclick="document.querySelector('[data-tab=academy]').click()"><span class="qa-icon">♜</span><b>آکادمی</b><small>استعدادها</small></button></div></section></div>`;
}
function tacticsHTML(){
 const base=[['ST',50,12],['LW',23,24],['RW',77,24],['AM',50,34],['CM',32,48],['CM',68,48],['DM',50,60],['LB',16,70],['CB',39,76],['CB',61,76],['RB',84,70],['GK',50,91]];
 const ps=startingPlayers();
 const tac=state.tactics??(state.tactics={formation:'4-2-3-1',style:'متعادل',positions:{}});
 const formations={'4-2-3-1':base,'4-3-3':[['ST',50,12],['LW',23,24],['RW',77,24],['CM',27,43],['CM',50,49],['CM',73,43],['LB',16,70],['CB',39,76],['CB',61,76],['RB',84,70],['GK',50,91]],'3-5-2':[['ST',38,15],['ST',62,15],['LM',14,40],['CM',35,43],['CM',50,51],['CM',65,43],['RM',86,40],['CB',30,72],['CB',50,77],['CB',70,72],['GK',50,91]],'4-4-2':[['ST',38,15],['ST',62,15],['LM',15,39],['CM',38,47],['CM',62,47],['RM',85,39],['LB',16,70],['CB',39,76],['CB',61,76],['RB',84,70],['GK',50,91]]};
 const spots=formations[tac.formation]||base;
 return `<p class="note">بازیکن را با ماوس یا لمس جابه‌جا کن. برای تعویض ترکیب، از فهرست ذخیره‌ها گزینهٔ «ورود به ترکیب» را بزن؛ انتخاب‌ها و تاکتیک‌ها ذخیره می‌شوند.</p><div class="controls"><div class="field"><label>آرایش</label><select id="formation">${Object.keys(formations).map(f=>`<option ${tac.formation===f?'selected':''}>${f}</option>`).join('')}</select></div><div class="field"><label>سبک بازی</label><select id="playStyle">${['متعادل','مالکانه','ضدحمله','پرس شدید'].map(x=>`<option ${tac.style===x?'selected':''}>${x}</option>`).join('')}</select></div><button id="resetPitch">بازنشانی چیدمان</button><span class="pill">۱۱ بازیکن اصلی</span></div><div class="pitch-wrap"><div class="pitch" id="tacticalPitch"><div class="pitch-circle"></div><div class="pitch-box top"></div><div class="pitch-box bottom"></div>${spots.map((p,i)=>{const x=ps[i]||{id:'empty'+i,name:'جای خالی',ovr:0,position:p[0]};const pos=tac.positions[x.id]||{x:p[1],y:p[2]};return `<div class="pitch-player ${i===0?'selected':''}" draggable="true" data-tactical-id="${x.id}" style="left:${pos.x}%;top:${pos.y}%" title="برای جابه‌جایی بکش"><b>${x.ovr||'—'}</b><span>${x.name}</span><small>${p[0]}</small></div>`}).join('')}</div></div><div class="home-card" style="margin-top:12px"><h3>نیمکت و تعویض ترکیب</h3><p class="note">بازیکن ذخیره را وارد ترکیب کن؛ ضعیف‌ترین بازیکن اصلی از ترکیب خارج می‌شود. حداکثر ۱۱ نفر اصلی.</p><div class="quick-actions">${state.squad.filter(p=>!ps.some(x=>String(x.id)===String(p.id))).slice(0,12).map(p=>`<div class="quick-action"><span class="qa-icon">${p.position==='GK'?'🧤':'♟'}</span><b>${p.name}</b><small>قدرت ${num(p.ovr)} • آمادگی ${num(p.fitness??100)}٪</small><button data-promote-lineup="${p.id}">ورود به ترکیب</button></div>`).join('')||'<div class="empty">بازیکن ذخیره‌ای ندارید.</div>'}</div><p class="note">ترکیب، آرایش و تاکتیک فقط پیش از شبیه‌سازی مسابقه قابل تغییر است. در طول مسابقه کنترل زنده‌ای نمایش داده نمی‌شود.</p></div>${(()=>{const a=analystAdvice();return `<section class="home-card" style="margin-top:12px"><div class="ref-section-head"><div><span class="ref-kicker">PRE-MATCH ANALYST</span><h3>گزارش آنالیزور پیش از مسابقه</h3></div><span class="pill">سطح گزارش: ${a.confidence}</span></div><p class="note">آنالیزور فقط نتایج و روندهای قبلی حریف را بررسی می‌کند؛ آرایش، ترکیب اصلی و تاکتیک حریف محرمانه باقی می‌ماند.</p><div class="subgrid"><div class="stat"><small>حریف هفتهٔ بعد</small><strong>${a.opponent?.name||'نامشخص'}</strong></div><div class="stat"><small>وضعیت هوا</small><strong>${a.weather.name}</strong></div><div class="stat"><small>آمادگی ترکیب</small><strong>${num(a.tired)} بازیکن خسته</strong></div></div><div class="event"><b>فرم اخیر حریف</b><p>${a.form.summary}</p><small>${a.form.trend}</small></div><div class="event"><b>پیشنهاد آنالیزور</b><p>${a.reason}</p><p>پیشنهاد آرایش: <b>${a.suggestedFormation}</b> • پیشنهاد سبک: <b>${a.suggestedStyle}</b></p><small>پیشنهاد خودکار اعمال نمی‌شود؛ تصمیم نهایی با مدیر تیم است.</small></div><p class="note">تمرین بازیکنان دستی است و با گذشت هفته به‌طور خودکار انجام نمی‌شود.</p></section>`})()}`;
}
function playersHTML(){return `<section class="home-card" style="margin-bottom:14px"><div class="ref-section-head"><div><span class="ref-kicker">MANUAL PLAYER TRAINING</span><h3>تمرین دستی بازیکنان</h3></div><span class="pill">انتخاب با مدیر</span></div><p class="note">تمرین فقط با انتخاب شما اجرا می‌شود. هیچ تمرین خودکار روزانه یا هفتگی وجود ندارد. اثر دقیق رشد و هزینه‌ها هنوز آزمایشی است؛ این نسخه پیشرفت تمرین را ثبت می‌کند و افزایش قدرت را به آستانهٔ پیشرفت وابسته می‌سازد.</p><div class="controls"><div class="field"><label>بازیکن</label><select id="manualTrainingPlayer">${state.squad.map(p=>`<option value="${p.id}">${p.name} • ${p.position} • قدرت ${num(p.ovr)}</option>`).join('')}</select></div><div class="field"><label>نوع تمرین</label><select id="manualTrainingFocus">${['سرعت','قدرت','استقامت','پاس','کنترل توپ','شوت','دفاع','تصمیم‌گیری','متعادل'].map(x=>`<option>${x}</option>`).join('')}</select></div><button id="runManualTraining">اجرای تمرین انتخاب‌شده</button></div>${state.trainingLog?.length?`<h4>آخرین تمرین‌ها</h4><div class="events">${state.trainingLog.slice(0,3).map(x=>`<div class="event"><b>${x.playerName}</b> — ${x.focus} • پیشرفت +${num(x.progressGain)}${x.growth?' • قدرت کلی +1':x.attributeGrowth?' • ویژگی +1':''}</div>`).join('')}</div>`:''}</section><div class="controls"><div class="field"><label>جست‌وجوی بازیکن</label><input id="playerSearch" placeholder="نام بازیکن یا پست…" style="font:inherit;padding:10px;border-radius:10px;background:#061a31;color:#fff;border:1px solid #14517b"></div><span class="pill">${num(state.squad.length)} / ۳۲ بازیکن</span><span class="pill">صندوق پاداش: ${num(state.rewardBoxes||0)}</span><button id="openRewardBox" ${!state.rewardBoxes?'disabled':''}>باز کردن صندوق پاداش</button></div><div class="player-list" id="playerList">${state.squad.slice().sort((a,b)=>b.ovr-a.ovr).map(p=>`<div class="player-card" data-playername="${p.name.toLowerCase()} ${p.position.toLowerCase()}" data-playerid="${p.id}"><div class="player-avatar">${p.name.slice(0,1)}</div><div><div class="player-name">${p.name}</div><div class="player-meta">سن ${num(p.age)} • ارزش تخمینی ${money(playerValue(p))} • دستمزد هفتگی ${money(p.wage||0)}</div></div><span class="position-tag">${p.position}</span><div class="rating">${num(p.ovr)}</div>${Number(p.injuryWeeksRemaining)>0?`<small style="grid-column:1/-1;color:#ff9b9b">مصدوم • ${num(p.injuryWeeksRemaining)} هفته تا بازگشت</small>`:''}<button class="player-profile-toggle" data-profile="${p.id}" style="grid-column:1/-1;width:100%;padding:6px">جزئیات بازیکن ⌄</button></div>`).join('')}</div>`}

function rewardsHTML(){const boxes=state.boxes??={normal:Number(state.rewardBoxes)||0,rare:0,epic:0,legendary:0},inv=state.inventory??={gold:0,energy:0,puzzlePieces:{}},ach=state.achievements??={},tasks=state.dailyTasks??={playWeek:0,openBox:0,train:0};const list=[['firstWin','اولین برد','normal'],['tenWins','۱۰ برد لیگ','rare'],['leagueChampion','قهرمانی لیگ','epic'],['cupChampion','قهرمانی جام حذفی','epic'],['openFiveBoxes','باز کردن ۵ صندوق','rare']];return `<h3>موجودی</h3><div class="subgrid"><div class="stat"><small>گلد</small><strong>${num(inv.gold||0)} 🪙</strong></div><div class="stat"><small>انرژی‌زا</small><strong>${num(inv.energy||0)} ⚡</strong></div><div class="stat"><small>قطعات پازل</small><strong>${num(Object.values(inv.puzzlePieces||{}).reduce((a,b)=>a+b,0))} 🧩</strong></div></div><h3>چهار سطح صندوق</h3><p class="note">صندوق‌ها از دستاوردها و وظایف دریافت می‌شوند و از فروشگاه هم قابل خریدند. جایزه می‌تواند گلد، انرژی‌زا، قطعهٔ پازل بازیکن یا تلنت باشد.</p><div class="subgrid">${Object.entries(boxTypes).map(([id,b])=>`<div class="event"><b>${b.label}</b><p>موجودی: ${num(boxes[id]||0)}</p><small>قیمت: ${num(b.cost)} گلد</small><div class="row" style="gap:5px;margin-top:8px"><button data-openbox="${id}" ${!(boxes[id]||0)?'disabled':''}>باز کردن</button><button data-buybox="${id}" ${(inv.gold||0)<b.cost?'disabled':''}>خرید</button></div></div>`).join('')}</div><h3>وظایف</h3><div class="event row"><span><b>وظیفهٔ هفتگی</b><br><small>پاداش: صندوق عادی</small></span><button id="taskWeek" ${tasks.playWeek===2?'disabled':''}>${tasks.playWeek===2?'تکمیل شده':tasks.playWeek===1?'دریافت پاداش':'ابتدا هفته را شبیه‌سازی کن'}</button></div><div class="event row"><span><b>باز کردن یک صندوق</b><br><small>پاداش: ۳۰ گلد</small></span><button id="taskOpen" ${(tasks.openBoxClaimedCount||0)>=(ach.openBoxes||0)?'disabled':''}>${(tasks.openBoxClaimedCount||0)>=(ach.openBoxes||0)?'ابتدا یک صندوق باز کن':'دریافت پاداش'}</button></div><h3>دستاوردها</h3>${list.map(([id,title,type])=>`<div class="event row"><span><b>${title}</b><br><small>پاداش: صندوق ${boxTypes[type].label}</small></span><span>${ach[id]?'دریافت شده ✓':'در انتظار'}</span></div>`).join('')}<h3>فروشگاه آیتم</h3><div class="event row"><span><b>۳ انرژی‌زا</b><br><small>هزینه: ۷۵ گلد</small></span><button id="buyEnergy" ${(inv.gold||0)<75?'disabled':''}>خرید</button></div>`}
function bindRewards(){document.querySelectorAll('[data-openbox]').forEach(b=>b.onclick=()=>openRewardBox(b.dataset.openbox));document.querySelectorAll('[data-buybox]').forEach(b=>b.onclick=()=>{const id=b.dataset.buybox,c=boxTypes[id].cost;if((state.inventory?.gold||0)<c)return;state.inventory.gold-=c;if(typeof recordFinance==='function')recordFinance('spend_gold',c,`خرید صندوق ${boxTypes[id].label}`,{currency:'gold'});grantBox(id,'خرید از فروشگاه');render();save()});const w=$('taskWeek');if(w)w.onclick=()=>{if(state.dailyTasks.playWeek!==1)return;state.dailyTasks.playWeek=2;grantBox('normal','وظیفهٔ هفتگی');render();save()};const o=$('taskOpen');if(o)o.onclick=()=>{const opened=Number(state.achievements?.openBoxes)||0;if(opened<1||opened<=(Number(state.dailyTasks.openBoxClaimedCount)||0)){event('برای دریافت این پاداش، ابتدا یک صندوق جدید باز کنید.','warn');return;}state.dailyTasks.openBoxClaimedCount=opened;state.dailyTasks.openBox=1;state.inventory.gold=(state.inventory.gold||0)+30;if(typeof recordFinance==='function')recordFinance('reward_gold',30,'پاداش وظیفه باز کردن صندوق',{currency:'gold'});event('وظیفه تکمیل شد: ۳۰ گلد دریافت کردید.','good');render();save()};const e=$('buyEnergy');if(e)e.onclick=()=>{if((state.inventory?.gold||0)<75)return;state.inventory.gold-=75;if(typeof recordFinance==='function')recordFinance('spend_gold',75,'خرید ۳ انرژی‌زا',{currency:'gold'});state.inventory.energy=(state.inventory.energy||0)+3;event('۳ انرژی‌زا خریداری شد.','good');render();save()}}

function render(){
 $('cash').textContent=money(state.cash);if($('headerCash'))$('headerCash').textContent=money(state.cash);$('wages').textContent=money(state.accruedWages);$('week').textContent=state.week<30?`${num(state.season)} / هفته ${num(state.week)} از ۳۰`:state.calendarDay===31?`${num(state.season)} / روز ۳۱ از ۳۲`:state.calendarDay===32?`${num(state.season)} / روز ۳۲ از ۳۲`:`${num(state.season)} / آمادهٔ هفتهٔ اول فصل بعد`;const advanceBtn=$('advance');if(advanceBtn)advanceBtn.textContent=state.week<30?'شبیه‌سازی هفتهٔ بعد':state.calendarDay===31?'روز ۳۱: پلی‌آف و فینال‌ها':state.calendarDay===32?'روز ۳۲: تسویه و قرعه‌کشی':'شروع هفتهٔ اول فصل جدید';const seasonBtn=$('season');if(seasonBtn)seasonBtn.textContent=state.week<30?'تقویم فصل (۳۰ هفته)':state.calendarDay===31?'اجرای روز ۳۱':state.calendarDay===32?'تسویه و قرعه‌کشی روز ۳۲':'شروع هفتهٔ اول فصل جدید';
 $('club').textContent=state.transferRestricted?'محدودیت مالی':'فعال';
 $('leagueMeta').textContent=`${countries.find(c=>c.id===state.country).name} • سطح ${num(state.tier)} • گروه ${state.group.slice(1)} • ۱۶ تیم • ۳۰ هفته • گروه‌ها در هر سطح دو برابر می‌شوند؛ تساوی‌شکنی: امتیاز، تفاضل گل، گل زده و نام`; 
 $('clubInfo').innerHTML=`<div class="event"><b>باشگاه شما</b><p class="note">باشگاه انسانی شما در ایران، سطح ۴، گروه ۱ قرار دارد.</p><div class="row"><span>جایگاه</span><b>${num(sortTeams(state.leagues[key('IR',4,'G1')]).findIndex(t=>t.id===clubTeam().id)+1)}</b></div><div class="row"><span>امتیاز</span><b>${num(clubTeam().pts)}</b></div><div class="row"><span>گل زده / خورده</span><b>${num(clubTeam().gf)} / ${num(clubTeam().ga)}</b></div></div><div class="event"><b>ساختار جهان بازی</b><p class="note">۶ کشور × ۶ سطح × ۱،۲،۴،۸،۱۶،۳۲ گروه × ۱۶ تیم = ۶۰۴۸ جایگاه باشگاهی</p><p class="note">هر گروه: ۲۴۰ مسابقه در فصل؛ هر تیم ۳۰ بازی.</p></div>`;
 $('events').innerHTML=state.events.slice(0,8).map(e=>`<div class="event"><span class="${e.type==='good'?'good':e.type==='bad'?'bad':e.type==='warn'?'warn':''}">${e.text}</span></div>`).join('');
 const tab=state.tab;
 document.body.classList.toggle('home-view',tab==='home');
 document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
 const titles={home:'صفحهٔ اصلی',ucl:'لیگ قهرمانان',rewards:'دستاوردها و فروشگاه',tactics:'ترکیب تاکتیکی',players:'بازیکنان',system:'راهنما و داده‌ها',table:'جدول لیگ',fixtures:'برنامه هفته‌ها',movement:'صعود و سقوط',finance:'مالی و رویدادها',squad:'ترکیب اصلی',market:'بازار نقل‌وانتقالات',academy:'آکادمی و رشد',cup:'جام حذفی',staff:'کادر فنی'};
 $('mainTitle').textContent=titles[tab];
 $('matchHero').style.display=tab==='home'?'grid':'none';
 $('mainContent').innerHTML=tab==='home'?homeHTML():tab==='ucl'?uclHTML():tab==='rewards'?rewardsHTML():tab==='tactics'?tacticsHTML():tab==='players'?playersHTML():tab==='system'?systemHTML():tab==='table'?tableHTML(league()):tab==='fixtures'?fixturesHTML():tab==='movement'?movementHTML():tab==='finance'?financeHTML():tab==='squad'?squadHTML():tab==='market'?marketHTML():tab==='academy'?academyHTML():tab==='staff'?staffHTML():cupHTML();
 if(tab==='rewards')bindRewards();
 if(tab==='tactics'){
  document.querySelectorAll('[data-promote-lineup]').forEach(b=>b.onclick=()=>{
   const id=b.dataset.promoteLineup;
   const incoming=state.squad.find(p=>String(p.id)===String(id));
   if(!incoming||state.tactics.lineup.some(x=>String(x)===String(id)))return;
   const starters=startingPlayers();
   if(starters.length>=11){
    const weakest=starters.slice().sort((a,b)=>(Number(a.ovr)||0)-(Number(b.ovr)||0))[0];
    state.tactics.lineup=state.tactics.lineup.filter(x=>String(x)!==String(weakest.id));
   }
   state.tactics.lineup.push(incoming.id);startingPlayers();
   event(`${incoming.name} به ترکیب اصلی اضافه شد.`,'good');render();save();
  });
  const formation=$('formation'),style=$('playStyle'),pitch=$('tacticalPitch');
  if(formation)formation.onchange=()=>{state.tactics.formation=formation.value;render();save()};
  if(style)style.onchange=()=>{state.tactics.style=style.value;save();event(`سبک بازی پیش از مسابقه به «${style.value}» تغییر کرد.`,'good');render()};
  if(pitch){let dragged=null;
   pitch.querySelectorAll('[data-tactical-id]').forEach(el=>{
    let pointerId=null;
    el.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;pointerId=e.pointerId;el.setPointerCapture?.(pointerId);el.classList.add('is-dragging');e.preventDefault()});
    el.addEventListener('pointermove',e=>{if(pointerId!==e.pointerId)return;const rect=pitch.getBoundingClientRect();const x=Math.max(7,Math.min(93,((e.clientX-rect.left)/rect.width)*100));const y=Math.max(5,Math.min(95,((e.clientY-rect.top)/rect.height)*100));el.style.left=x+'%';el.style.top=y+'%'});
    const finishPointer=e=>{if(pointerId!==e.pointerId)return;const rect=pitch.getBoundingClientRect();const x=Math.max(7,Math.min(93,((e.clientX-rect.left)/rect.width)*100));const y=Math.max(5,Math.min(95,((e.clientY-rect.top)/rect.height)*100));state.tactics.positions[el.dataset.tacticalId]={x:Math.round(x*10)/10,y:Math.round(y*10)/10};pointerId=null;el.classList.remove('is-dragging');save()};
    el.addEventListener('pointerup',finishPointer);el.addEventListener('pointercancel',e=>{if(pointerId===e.pointerId){pointerId=null;el.classList.remove('is-dragging')}});
    el.addEventListener('dragstart',e=>{dragged=el.dataset.tacticalId;e.dataTransfer?.setData('text/plain',dragged);if(e.dataTransfer)e.dataTransfer.effectAllowed='move'});
    el.addEventListener('dragover',e=>e.preventDefault());
    el.addEventListener('drop',e=>{e.preventDefault();const id=dragged||e.dataTransfer?.getData('text/plain');if(!id)return;const rect=pitch.getBoundingClientRect();const x=Math.max(7,Math.min(93,((e.clientX-rect.left)/rect.width)*100));const y=Math.max(5,Math.min(95,((e.clientY-rect.top)/rect.height)*100));state.tactics.positions[id]={x:Math.round(x*10)/10,y:Math.round(y*10)/10};render();save()});
    el.addEventListener('dragend',e=>{if(!dragged)return;const rect=pitch.getBoundingClientRect();if(e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom){const x=Math.max(7,Math.min(93,((e.clientX-rect.left)/rect.width)*100));const y=Math.max(5,Math.min(95,((e.clientY-rect.top)/rect.height)*100));state.tactics.positions[dragged]={x:Math.round(x*10)/10,y:Math.round(y*10)/10};save()}dragged=null});
   });
  }
  const reset=$('resetPitch');if(reset)reset.onclick=()=>{state.tactics.positions={};render();save();event('چیدمان زمین بازنشانی شد.','info')};
 }
 if(tab==='players'){const trainButton=$('runManualTraining');if(trainButton)trainButton.onclick=()=>{const result=runManualTraining($('manualTrainingPlayer')?.value,$('manualTrainingFocus')?.value);if(!result.ok){event(result.message,'warn');return;}event(`تمرین دستی ${result.player.name} (${result.focus}) انجام شد؛ پیشرفت +${num(result.progressGain)}${result.growth?' و قدرت کلی بازیکن یک واحد افزایش یافت.':result.attributeGrowth?' و ویژگی تمرینی یک واحد افزایش یافت.':'.'}`,'good');render();save()};const reward=$('openRewardBox');if(reward)reward.onclick=openRewardBox;const search=$('playerSearch');if(search)search.oninput=()=>document.querySelectorAll('[data-playername]').forEach(el=>el.style.display=el.dataset.playername.includes(search.value.toLowerCase())?'grid':'none');document.querySelectorAll('[data-profile]').forEach(btn=>btn.onclick=()=>{const p=state.squad.find(x=>String(x.id)===btn.dataset.profile);if(!p)return;const card=btn.closest('.player-card');const old=card.querySelector('.player-extra');if(old){old.remove();btn.textContent='جزئیات بازیکن ⌄';return}document.querySelectorAll('.player-extra').forEach(x=>x.remove());document.querySelectorAll('[data-profile]').forEach(x=>x.textContent='جزئیات بازیکن ⌄');const extra=document.createElement('div');extra.className='player-extra';extra.style.cssText='grid-column:1/-1;padding:10px;border-top:1px solid #24516f;color:#c8d9ea;font-size:12px;line-height:1.9';extra.innerHTML=`<div class="profile-sheet"><div class="profile-topline"><div class="profile-portrait">${p.position==='GK'?'🧤':'⚽'}</div><div class="profile-heading"><b>${p.name}</b><span>${p.position} <i>•</i> ${playerAgeLabel(p)}</span><small>پروفایل بازیکن • داده‌های ذخیره‌شدهٔ باشگاه</small></div><div class="profile-ovr"><strong>${num(p.ovr)}</strong><small>قدرت فعلی</small></div></div><div class="profile-metrics"><div><small>ویژگی‌های تمرین‌شده</small><b>${Object.entries(p.trainingAttributes||{}).map(([k,v])=>`${({speed:'سرعت',strength:'قدرت',stamina:'استقامت',passing:'پاس',control:'کنترل توپ',shooting:'شوت',defending:'دفاع',decisions:'تصمیم‌گیری'}[k]||k)} ${num(v)}`).join(' • ')||'هنوز ویژگی متمرکزی ثبت نشده'}</b></div><div><small>آمادگی</small><b>${Number(p.injuryWeeksRemaining)>0?`مصدوم • ${num(p.injuryWeeksRemaining)} هفته`:`${num(p.fitness??100)}٪`}</b><div class="metric-track"><i style="width:${Math.max(0,Math.min(100,Number(p.fitness??100)))}%"></i></div></div><div><small>تلنت‌ها</small><b>${[p.innateTalent,...(p.earnedTalents||[])].filter(Boolean).join(" • ")||"هنوز شناسایی نشده"}</b></div></div><div class="profile-finance"><div><small>دستمزد سالانه</small><b>${money(p.wage||0)}</b></div><div><small>دستمزد سالانه</small><b>${money(p.wage||0)}</b></div><div><small>سن بازیکن</small><b>${num(p.age)} سال</b></div></div><p class="profile-footnote">ویژگی‌های جزئی مهارتی و تاریخچهٔ رشد تا زمانی که دادهٔ واقعی آن‌ها در ذخیره ثبت نشده باشد، نمایش داده نمی‌شوند.</p></div>`;card.appendChild(extra);btn.textContent='بستن جزئیات ⌃'})}
 if(tab==='movement'){const b=$('playoff');if(b)b.onclick=()=>{$('playoffResult').textContent='این دکمه فقط خلاصهٔ سازوکار پلی‌آف را نمایش می‌دهد؛ اجرای واقعی جابه‌جایی‌ها هنگام بستن فصل انجام می‌شود.'}}
 if(tab==='finance'){ const repay=$('repay');if(repay)repay.onclick=()=>{let budget=Math.min(Math.max(0,Number(state.cash)||0),(Math.max(0,Number(state.wageShortfall)||0)+Math.max(0,Number(state.dismissalShortfall)||0)));const paidStart=budget;const wagesPaid=Math.min(budget,Math.max(0,Number(state.wageShortfall)||0));state.wageShortfall=Math.max(0,(Number(state.wageShortfall)||0)-wagesPaid);budget-=wagesPaid;const dismissalPaid=Math.min(budget,Math.max(0,Number(state.dismissalShortfall)||0));state.dismissalShortfall=Math.max(0,(Number(state.dismissalShortfall)||0)-dismissalPaid);state.cash=Math.max(0,(Number(state.cash)||0)-paidStart);state.transferRestricted=state.wageShortfall>0||state.dismissalShortfall>0;const remaining=state.wageShortfall+state.dismissalShortfall;event(`تسویهٔ بدهی: ${money(paidStart)} پرداخت شد (دستمزد ${money(wagesPaid)}، فسخ ${money(dismissalPaid)}). مانده ${money(remaining)} است.`,remaining?'warn':'good');render();save()}; $('price').onchange=()=>{state.ticketPrice=+$('price').value;render();save()};$('attendance').onchange=()=>{state.attendance=+$('attendance').value;render();save()};$('sponsor').onchange=()=>{state.sponsor=$('sponsor').value;event('قرارداد اسپانسر برای تسویهٔ پایان فصل انتخاب شد.','info');render();save()}}
 if(tab==='market'){const filter=()=>{const q=($('marketSearch')?.value||'').trim().toLowerCase();document.querySelectorAll('[data-marketrow]').forEach(el=>el.style.display=el.dataset.marketname.includes(q)?'flex':'none')};const search=$('marketSearch'),sort=$('marketSort');if(search)search.oninput=filter;if(sort)sort.onchange=()=>{window.marketSortKey=sort.value;render()};document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buyPlayer(b.dataset.buy));}
 if(tab==='squad')document.querySelectorAll('[data-loan]').forEach(b=>b.onclick=()=>loanPlayer(b.dataset.loan));
 if(tab==='squad'){document.querySelectorAll('[data-dismiss]').forEach(b=>b.onclick=()=>dismissPlayer(b.dataset.dismiss));document.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>sellPlayer(b.dataset.sell));}
 if(tab==='academy'){document.querySelectorAll('[data-promote]').forEach(b=>b.onclick=()=>promotePlayer(b.dataset.promote));const tr=$('train');if(tr)tr.onclick=()=>{let gain=0;const level=state.staff?.academyCoach?Math.max(1,Math.min(9,Number(state.staff?.staffLevels?.academyCoach)||1)):0;const chance=Math.min(.9,.55+level*.035);state.academy.forEach((p,i)=>{if(p.ovr<p.potential&&rng(state.season*100000+state.week*99+p.ovr+p.age+i*17)>1-chance){p.ovr=Math.min(p.potential,p.ovr+1);gain++}});event(`تمرین دستی آکادمی انجام شد؛ ${gain} بازیکن یک واحد رشد کردند.${level?` اثر مربی آکادمی (سطح ${num(level)}) اعمال شد.`:' بدون مربی آکادمی.'}`,'good');render();save()}}
 if(tab==='cup'){const pc=$('playCup');if(pc)pc.onclick=playCup}
 if(tab==='ucl'){const start=$('startUcl');if(start)start.onclick=startUcl;const play=$('playUclRound');if(play)play.onclick=playUclRound;const playoff=$('playUclPlayoff');if(playoff)playoff.onclick=playUclPlayoff;const knockout=$('playUclKnockout');if(knockout)knockout.onclick=playUclKnockout}
 if(tab==='staff'){
 document.querySelectorAll('[data-hire]').forEach(b=>b.onclick=()=>{const id=b.dataset.hire,cost=+b.dataset.cost;if(id==='fitness'||state.staff[id]||!canSpend(cost))return;state.cash-=cost;state.staff[id]=true;state.staff.staffLevels??={assistant:0,medical:0,analyst:0,academyCoach:0};if(id==='coach'){const seed=state.season*7919+state.week*101+17;state.staff.coachProfile={license:'C',rankLevel:1,experience:0,traits:{tactics:Math.round(42+rng(seed)*38),attack:Math.round(42+rng(seed+1)*38),defence:Math.round(42+rng(seed+2)*38),development:Math.round(42+rng(seed+3)*38),management:Math.round(42+rng(seed+4)*38)}};}else state.staff.staffLevels[id]=Math.max(1,Number(state.staff.staffLevels[id])||1);event(`${({coach:'سرمربی',assistant:'مربی کمکی',medical:'پزشک تیم',analyst:'آنالیزور',academyCoach:'مربی آکادمی'})[id]} استخدام شد.`,'good');render();save()});
 const upgrade=document.querySelector('[data-fitness-upgrade]');if(upgrade)upgrade.onclick=()=>{const level=Math.max(0,Math.min(12,Number(state.staff.fitnessLevel??(state.staff.fitness?1:0))||0)),cost=Number(upgrade.dataset.cost);if(level>=12||!canSpend(cost))return;state.cash-=cost;state.staff.fitnessLevel=level+1;state.staff.fitness=true;event(level===0?'بدنساز استخدام شد؛ اثر او فقط در تمرین دستی اعمال می‌شود.':`بدنساز به زیرسطح ${num(level+1)} ارتقا یافت؛ کیفیت تمرین دستی اندکی افزایش یافت.`,'good');render();save()};
 document.querySelectorAll('[data-staff-upgrade]').forEach(b=>b.onclick=()=>{const id=b.dataset.staffUpgrade,cost=Number(b.dataset.cost),levels=state.staff.staffLevels||(state.staff.staffLevels={});const current=Math.max(0,Number(levels[id])||0),max=id==='academyCoach'?9:12;if(current>=max||!canSpend(cost))return;state.cash-=cost;levels[id]=current+1;event(`${({assistant:'مربی کمکی',medical:'پزشک تیم',analyst:'آنالیزور',academyCoach:'مربی آکادمی'})[id]} به سطح ${num(current+1)} ارتقا یافت.`,'good');render();save()});
}
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render();save();document.querySelectorAll('[data-shortcut]').forEach(x=>x.classList.toggle('is-active',x.dataset.shortcut===state.tab || (x.dataset.shortcut==='system'&&['movement','finance','squad','academy','cup','staff','table'].includes(state.tab))))});
document.querySelectorAll('[data-shortcut]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.shortcut;render();save();document.querySelectorAll('[data-shortcut]').forEach(x=>x.classList.toggle('is-active',x===b));});
const syncBottomNav=()=>document.querySelectorAll('[data-shortcut]').forEach(b=>b.classList.toggle('is-active',b.dataset.shortcut===state.tab || (b.dataset.shortcut==='system'&&['movement','finance','squad','academy','cup','staff','table'].includes(state.tab))));
const originalRender=render;

$('advance').onclick=simulateWeek;
$('season').onclick=advanceSeasonCalendar;
$('reset').onclick=()=>{if(confirm('تمام پیشرفت محلی این نمونه پاک شود؟')){state=newState();renderSelectors();render();save()}};
$('exportSave').onclick=()=>{const blob=new Blob([JSON.stringify({format:'football-manager-save',version:47,exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='football-manager-save-final.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);event('فایل پشتیبان JSON ساخته شد.','good');render()};
$('importSave').onclick=()=> $('saveFile').click();
$('saveFile').onchange=async e=>{const f=e.target.files?.[0];if(!f)return;try{const obj=JSON.parse(await f.text());const candidate=obj.state||obj;validateState(candidate);if(!confirm('ذخیره فعلی با اطلاعات فایل جایگزین شود؟'))return;state=candidate;state.squad??=[];state.academy??=[];state.market??=[];state.offers??=[];state.loans??=[];state.staff??={coach:false,assistant:false,fitness:false,fitnessLevel:0,medical:false};state.staff.fitnessLevel=Math.max(0,Math.min(12,Number(state.staff.fitnessLevel??(state.staff.fitness?1:0))||0));state.staff.fitness=state.staff.fitnessLevel>0||!!state.staff.fitness;state.staff.staffLevels??={assistant:state.staff.assistant?1:0,medical:state.staff.medical?1:0,analyst:state.staff.analyst?1:0,academyCoach:state.staff.academyCoach?1:0};state.staff.analyst=!!state.staff.analyst;state.staff.academyCoach=!!state.staff.academyCoach;state.staff.coachProfile??=state.staff.coach?{license:'C',rankLevel:1,experience:0,traits:{tactics:50,attack:50,defence:50,development:50,management:50}}:null;state.events??=[];state.history??=[];state.cup??={round:1,done:[],champion:null,teams:[],matches:[],initialized:false};state.cup.teams??=[];state.cup.matches??=[];state.cup.initialized??=false;state.accruedWages??=0;state.seasonOpeningCash??=Number(state.cash)||0;state.financeLedger??=[];state.wageShortfall??=0;state.dismissalShortfall??=0;state.transferRestricted??=(state.wageShortfall>0||state.dismissalShortfall>0);renderSelectors();render();save();event('بازیابی پشتیبان با موفقیت انجام شد.','good');render()}catch(err){alert('بازیابی انجام نشد: '+err.message)}finally{e.target.value=''}};
renderSelectors();render();
})();
