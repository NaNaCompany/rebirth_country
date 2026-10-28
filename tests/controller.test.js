import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import * as engine from '../src/engine.js';
import * as creditFunctions from '../src/credits.js';
const languages=['ko','en','es','zh','ja','de','fr','pt'];
function element(){return {hidden:false,disabled:false,value:'',textContent:'',attributes:{},listeners:{},style:{setProperty(){}},classList:{add(){},remove(){}},addEventListener(event,fn){this.listeners[event]=fn;},querySelectorAll(){return [];},append(){},replaceChildren(){},setAttribute(k,v){this.attributes[k]=v;},select(){},remove(){},async click(){if(this.disabled)return;await this.listeners.click?.();await this.onclick?.();}};}
async function controller(lang,{countryResponse,wait=true}={}){
 const dir=lang==='ko'?'src/':'locales/'+lang+'/src/',raw=await fs.readFile(dir+'app.js','utf8'),html=await fs.readFile(dir+'index.html','utf8'),nodes=new Map(),storage=new Map();
 const document={baseURI:'https://nanalab.kr/rebirth_country/'+lang+'/',title:'',body:element(),getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);},querySelector:()=>element(),querySelectorAll:()=>[],createElement:()=>element(),execCommand:()=>false};
 document.getElementById('draw').disabled=/<button\b[^>]*id="draw"[^>]*\bdisabled\b/.test(html);
 document.getElementById('globe').getContext=()=>new Proxy({},{get:()=>()=>{}});
 const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},navigator={clipboard:{writeText:async()=>{throw Error('blocked');}},share:async()=>{const e=Error('cancelled');e.name='AbortError';throw e;}};
 const context=vm.createContext({...engine,...creditFunctions,document,localStorage,navigator,URL,Intl,Math,JSON,console,location:{href:document.baseURI,reload(){}},history:{replaceState(){},pushState(){}},window:{localStorage,scrollTo(){},open:()=>null},matchMedia:()=>({matches:true}),addEventListener(){},setInterval:()=>0,clearInterval(){},setTimeout:fn=>{fn();return 0;},clearTimeout(){},requestAnimationFrame(){},fetch:async url=>url.pathname.endsWith('countries.json')?(countryResponse?await countryResponse:{ok:true,json:async()=>JSON.parse(await fs.readFile('docs/'+lang+'/countries.json','utf8'))}):{ok:true,json:async()=>({type:'MultiPolygon',coordinates:[]})}});
 vm.runInContext(raw.replace(/^import .*;\r?\n/gm,'').replace(/init\(\);\s*$/,'globalThis.ready=init();'),context);
 if(wait)await context.ready;
 return {context,nodes,navigator,document,html};
}
test('all eight actual controllers preserve draw credits and cancel/failure share boundaries',async()=>{
 for(const lang of languages){
  const {context,nodes,navigator,document}=await controller(lang);
  assert.equal(vm.runInContext('countries.length',context),199,lang);
  await nodes.get('draw').click();assert.equal(vm.runInContext('credits.remaining',context),1,lang+' first free draw');assert.ok(nodes.get('result-title').textContent);
  await nodes.get('share').onclick();assert.equal(vm.runInContext('credits.remaining',context),1,lang+' cancelled share');
  await nodes.get('copy').onclick();assert.equal(vm.runInContext('credits.remaining',context),1,lang+' failed copy');
  nodes.get('share-x').onclick();assert.equal(vm.runInContext('credits.remaining',context),1,lang+' blocked popup');
  await vm.runInContext('draw()',context);assert.equal(vm.runInContext('credits.remaining',context),0,lang+' one redraw');
  navigator.clipboard.writeText=async()=>{};await nodes.get('copy').onclick();assert.equal(vm.runInContext('credits.remaining',context),2,lang+' copy preparation +2');
  await nodes.get('copy').onclick();assert.equal(vm.runInContext('credits.remaining',context),2,lang+' only one reward per card');assert.ok(document.title);
 }
});
test('draw markup blocks early clicks until delayed country data and listeners are ready in all languages',async()=>{
 for(const lang of languages){
  let resolveCountry;const countryResponse=new Promise(resolve=>{resolveCountry=resolve;});
  const {context,nodes,html}=await controller(lang,{countryResponse,wait:false}),button=nodes.get('draw');
  assert.match(html,/<button\b[^>]*id="draw"[^>]*\bdisabled\b/,lang+' disabled before module execution');
  assert.equal(button.disabled,true,lang+' disabled during fetch');assert.equal(button.attributes['aria-busy'],'true');
  await button.click();assert.equal(vm.runInContext('credits.started',context),false,lang+' early click spends no credit');assert.equal(vm.runInContext('current',context),null);
  resolveCountry({ok:true,json:async()=>JSON.parse(await fs.readFile('docs/'+lang+'/countries.json','utf8'))});await context.ready;
  assert.equal(button.disabled,false,lang+' enabled after init');assert.equal(button.attributes['aria-busy'],'false');
  await button.click();assert.equal(vm.runInContext('credits.started',context),true,lang+' first enabled click draws');assert.equal(vm.runInContext('credits.remaining',context),1);assert.ok(nodes.get('result-title').textContent);
 }
});
test('failed or malformed country data leaves draw disabled with persistent localized recovery text',async()=>{
 const recovery={ko:'새로고침',en:'refresh',es:'recarga',zh:'刷新',ja:'再読み込み',de:'neu laden',fr:'recharge',pt:'recarregue'};
 for(const lang of languages)for(const response of [{ok:false},{ok:true,json:async()=>[]}]){
  const {context,nodes}=await controller(lang,{countryResponse:Promise.resolve(response)}),button=nodes.get('draw');
  assert.equal(button.disabled,true,lang+' stays disabled on failure');assert.equal(button.attributes['aria-busy'],'false');assert.ok(button.textContent.includes(recovery[lang]),lang+' localized persistent recovery text');assert.ok(nodes.get('toast').textContent,lang+' localized error announcement');
  await button.click();assert.equal(vm.runInContext('credits.started',context),false,lang+' failed load spends no credit');assert.equal(vm.runInContext('countries.length',context),0);
 }
});
