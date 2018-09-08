// Service Worker file registration
var siteLocation = window.location.href

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/../service-worker.js')
}