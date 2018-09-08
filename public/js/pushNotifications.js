console.log('Push')
const publicVapidKey = 'BLV1N_Ve2cKSzxVHOknLIfBi66Gpze4EVzrRvSN29mOmE5de3U0jLPCgvUZDOTKpXctp8XGG583ri3kVjvLcKl8'

$(document).ready(function() { 
    var pushNotificationBtn = document.getElementById('send-push-notification')
    console.log(pushNotificationBtn)

    Notification.requestPermission()

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Push notification')
        if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(result) {
                console.log(result)
                if (result == 'granted') {
                    registerUser()
                }
            })
        }
    }

    pushNotificationBtn.addEventListener('click', function(evt) {
        console.log("Push clicked")
        send()
    }) 
})

async function registerUser() {
    const register = await navigator.serviceWorker.register('/../service-worker.js')
    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    })
    $.ajax({
        type: 'POST',
        url: '/push_notifications/register_user',
        crossDomain: true,
        dataType: 'json',
        data: {
            subscription : JSON.stringify(subscription),
        }
    });  
}

async function send() {
    const register = await navigator.serviceWorker.register('/../service-worker.js')
    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    })
    console.log('Push registered')

    if (Notification.permission == 'granted') {
        console.log('Permission set')

        var now = new Date()
        var title = `Test ${now}`

        $.ajax({
            type: 'POST',
            url: '/push_notifications/subscribe',
            crossDomain: true,
            dataType: 'json',
            data: {
                subscription : JSON.stringify(subscription),
                title: title
            }
        });   
    }
    console.log('Push sent')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
  