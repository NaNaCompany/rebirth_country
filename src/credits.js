export const CREDIT_KEY='rebirth-country-credits-v1';
export function loadCredits(storage){
 try{const s=JSON.parse(storage.getItem(CREDIT_KEY));if(s&&s.version===1&&typeof s.started==='boolean'&&Number.isSafeInteger(s.remaining)&&s.remaining>=0&&Number.isSafeInteger(s.round)&&s.round>=0&&Number.isSafeInteger(s.rewardedRound)&&s.rewardedRound>=-1)return s;}catch{}
 return {version:1,started:false,remaining:1,round:0,rewardedRound:-1,lastCode:null};
}
export function spendDraw(s){if(s.started&&s.remaining===0)return false;if(s.started)s.remaining--;s.started=true;s.round++;return true;}
export function rewardShare(s){if(!s.started||s.rewardedRound===s.round)return false;s.remaining+=2;s.rewardedRound=s.round;return true;}
