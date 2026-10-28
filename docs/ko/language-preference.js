export const LANGUAGES=['ko','en','es','zh','ja','de','fr','pt'];
const spanish=new Set(['ES','MX','AR','BO','CL','CO','CR','CU','DO','EC','SV','GQ','GT','HN','NI','PA','PY','PE','PR','UY','VE']);
export function browserLanguage(languages=[]){for(const item of languages){const lang=String(item).toLowerCase().split('-')[0];if(LANGUAGES.includes(lang))return lang;}return 'en';}
const national={KR:'ko',CN:'zh',TW:'zh',HK:'zh',MO:'zh',JP:'ja',DE:'de',AT:'de',LI:'de',FR:'fr',MC:'fr',PT:'pt',BR:'pt',AO:'pt',MZ:'pt',CV:'pt',GW:'pt',ST:'pt'};
export function recommendLanguage(country,languages=[]){const code=String(country||'').toUpperCase();if(national[code])return national[code];if(spanish.has(code))return 'es';if(/^[A-Z]{2}$/.test(code))return 'en';return browserLanguage(languages);}
