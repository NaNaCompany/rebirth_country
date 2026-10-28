import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const repo=path.resolve(import.meta.dirname,'../../..');
const digest=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const source=JSON.parse(await fs.readFile(path.join(repo,'locales/en/data/countries-source.json'),'utf8'));
const allowed=JSON.parse(await fs.readFile(path.join(repo,'locales/en/data/passport-color-families.json'),'utf8'));
const all=source.filter(c=>Object.hasOwn(allowed.colors,c.cca2)&&c.population>0);
assert.equal(all.length,199);
let hashChecks=0;
const keyByLanguage={ja:'jpn',de:'deu',fr:'fra',pt:'por'};
for(const [lang,key] of Object.entries(keyByLanguage)){
 const dir=path.join(repo,'locales',lang);
 for(const file of ['src/app.js','src/credits.js','src/engine.js','scripts/build.mjs']){
  const result=spawnSync(process.execPath,['--check',path.join(dir,file)],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
 }
 for(const file of ['src/engine.js','src/style.css','src/favicon.svg',...((await fs.readdir(path.join(repo,'locales/en/src/licenses'))).map(f=>'src/licenses/'+f)),...((await fs.readdir(path.join(repo,'locales/en/data'))).filter(f=>f!=='passport-colors.json').map(f=>'data/'+f))]){
  assert.equal(await digest(path.join(dir,file)),await digest(path.join(repo,'locales/en',file)),lang+': '+file);hashChecks++;
 }
 const localized=all.map(c=>c.translations?.[key]?.common||new Intl.DisplayNames([lang],{type:'region'}).of(c.cca2));
 assert.equal(localized.length,199);assert.ok(localized.every(name=>typeof name==='string'&&name.length>0));
 if(lang==='ja')assert.equal(localized[all.findIndex(c=>c.cca2==='XK')],'コソボ');
 const html=await fs.readFile(path.join(dir,'src/index.html'),'utf8'),app=await fs.readFile(path.join(dir,'src/app.js'),'utf8'),build=await fs.readFile(path.join(dir,'scripts/build.mjs'),'utf8');
 assert.ok(html.includes('<html lang="'+lang+'">'));
 for(const fragment of ['Population mode weights','These are game probabilities','Build tool binaries are not distributed','Please enter the country name','Rebirth Passport'])assert.ok(!html.includes(fragment),lang+': untranslated '+fragment);
 for(const fragment of ['No retries left','Failed to load country information','There are no search results','The sharing window','Copying is blocked',' people','My next life:'])assert.ok(!app.includes(fragment),lang+': untranslated '+fragment);
 for(const fragment of ['Your next country','A country I met by chance','Start your own next life','Base population-weighted chance','Discover your next life'])assert.ok(!build.includes(fragment),lang+': untranslated '+fragment);
}
console.log(JSON.stringify({languages:Object.keys(keyByLanguage),countriesPerLanguage:199,scriptSyntaxChecks:16,preservedHashChecks:hashChecks,translationChecks:'passed'},null,2));
