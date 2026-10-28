export function choose(countries, mode = 'population', excluded = [], random = Math.random) {
  const pool = countries.filter(c => !excluded.includes(c.code));
  if (!pool.length) throw new Error('There is no country to draw.');
  const weight = c => mode === 'equal' ? 1 : c.population;
  const total = pool.reduce((sum, c) => sum + weight(c), 0);
  let target = Math.min(Math.max(random(), 0), 1 - Number.EPSILON) * total;
  return pool.find(c => (target -= weight(c)) < 0) || pool.at(-1);
}
export function probability(country, countries, mode = 'population', excluded = []) {
  const pool = countries.filter(c => !excluded.includes(c.code));
  if (!pool.some(c => c.code === country.code)) return 0;
  return (mode === 'equal' ? 1 / pool.length : country.population / pool.reduce((s,c) => s+c.population,0)) * 100;
}
export const percentage = p => p < .001 ? p.toFixed(5) : p < .1 ? p.toFixed(3) : p.toFixed(2);
