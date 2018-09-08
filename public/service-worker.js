var version = ['v1']
// var siteLocation = location.href
// console.log(siteLocation)

self.addEventListener('install', event => {
    console.log('installing…');
    self.skipWaiting()
    // event.waitUntil(
    //   caches.open(version[0]).then(cache => cache.add('/offline.html'))
    // );
  });
  
  self.addEventListener('activate', event => {

    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
        console.log('event request', event)
          if (!version.includes(key)) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log('Ready to handle fetches!');
      })
    );
  });

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push received....', e)
  self.registration.showNotification(data.title, {
    body: data.body
  })
})

