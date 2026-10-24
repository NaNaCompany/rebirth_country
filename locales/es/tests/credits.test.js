import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadCredits,spendDraw,rewardShare} from '../src/credits.js';
test('first draw free, one retry, persistence and one reward per round',()=>{
 const s=loadCredits({getItem:()=>null});
 assert.equal(spendDraw(s),true);assert.equal(s.remaining,1);
 assert.equal(spendDraw(s),true);assert.equal(s.remaining,0);
 assert.equal(spendDraw(s),false);
 assert.equal(rewardShare(s),true);assert.equal(s.remaining,2);
 assert.equal(rewardShare(s),false);assert.equal(s.remaining,2);
 const restored=loadCredits({getItem:()=>JSON.stringify(s)});
 assert.equal(restored.remaining,2);assert.equal(rewardShare(restored),false);
 assert.equal(spendDraw(restored),true);assert.equal(restored.remaining,1);
 assert.equal(rewardShare(restored),true);assert.equal(restored.remaining,3);
});
test('unavailable or corrupt storage starts safely',()=>{
 assert.equal(loadCredits(undefined).remaining,1);
 assert.equal(loadCredits({getItem:()=>'{broken'}).started,false);
});
