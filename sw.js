// シンゴーパス offline cache (used only when the app is served over https next to this file)
const C='shp-app-v34';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./shingo_pass_nav.html','./moped_nav.html'].map(u=>new Request(u,{cache:'reload'}))).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
if(q.mode==='navigate'||/\.html(\?|$)|\/$/.test(new URL(q.url).pathname)){e.respondWith(fetch(q,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));}return res;}).catch(()=>caches.match(q).then(r=>r||caches.match('./index.html'))));return;}
if(/cyberjapandata/.test(q.url)){e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));}return res;})));}});
