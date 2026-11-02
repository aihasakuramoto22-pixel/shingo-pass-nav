// シンゴーパス offline cache (used only when the app is served over https next to this file)
const C='shp-app-v40';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./shingo_pass_nav.html','./moped_nav.html','./manifest.json','./icon-192.png','./icon-512.png'].map(u=>new Request(u,{cache:'reload'}))).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>/^shp-app-/.test(k)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
if(q.mode==='navigate'||/\.html(\?|$)|\/$/.test(new URL(q.url).pathname)){
const net=fetch(q,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));}return res;});
const cached=caches.match(q).then(r=>r||caches.match('./index.html'));
e.respondWith(cached.then(r=>r||net).catch(()=>cached.then(r=>r||Response.error())));
e.waitUntil(net.catch(()=>{}));return;}
if(/cyberjapandata|manifest\.json|icon-\d+\.png/.test(q.url)){e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{if(res.ok&&/cyberjapandata/.test(q.url)){const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));}return res;})));}});
