import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
const products=JSON.parse(await readFile(new URL('../data/products.json',import.meta.url),'utf8'));
assert.equal(products.length,94);
assert.equal(new Set(products.map(p=>p.id)).size,94);
assert.equal(new Set(products.map(p=>p.code)).size,94);
const missing=[];
for(const p of products){assert.ok(Number.isFinite(p.price)&&p.price>0);for(const key of ['thumbnail','detailImage']){if(!p[key]){if(key==='thumbnail')missing.push(`${p.category} ${p.code}`);continue;}assert.ok(p[key].startsWith('/products/'));await access(new URL('../public'+p[key],import.meta.url));}}
assert.deepEqual(missing,[]);
console.log('PASS: 94 products, 8 categories, all configured image paths resolve. No missing configured product images.');
