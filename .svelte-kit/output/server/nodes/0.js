import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BVrO4fff.js","_app/immutable/chunks/B_eR6wdd.js","_app/immutable/chunks/K0aZDt7b.js","_app/immutable/chunks/CqFghqGp.js","_app/immutable/chunks/DVgfddIX.js","_app/immutable/chunks/BnCFUYBX.js","_app/immutable/chunks/BnmfMBjG.js","_app/immutable/chunks/BuBOIzj0.js","_app/immutable/chunks/B3EFq9GR.js","_app/immutable/chunks/CDejXRmM.js","_app/immutable/chunks/CkRqmbKL.js","_app/immutable/chunks/STtQHxoh.js","_app/immutable/chunks/CR_ybAnS.js","_app/immutable/chunks/DNMWl4Qg.js","_app/immutable/chunks/oGbzho37.js","_app/immutable/chunks/D5aKCX1C.js","_app/immutable/chunks/BFaeuE3c.js","_app/immutable/chunks/BiTtOZ-R.js"];
export const stylesheets = ["_app/immutable/assets/0.nXSjhWL_.css"];
export const fonts = [];
