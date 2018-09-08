const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch')
// const db = require('../../config/dataBase')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
const pgp = require('pg-promise')
require('dotenv').config()

// Push notifications
const webpush = require('web-push') 
const publicVapidKey = process.env.PUSHNOTIFICATIONPUBLICKEY
const privateVapidKey = process.env.PUSHNOTIFICATIONPRIVATEKEY

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// // router.post('/register_user', (req, res) => {
// //     console.log("Registered user")
// //     var customerID = req.user.customer_id
// //     var restaurantGroupId = req.user.restaurant_group_id
// //     var subscription = req.body.subscription

// //     db.task(t=> { 
// //         return t.any(`SELECT * FROM push_notification_subscriptions WHERE subscription = '${subscription}'`).then(function(userSubscription) {
// //             console.log(userSubscription)
// //             if (userSubscription.length == 0) {
// //                 return t.any(`INSERT INTO push_notification_subscriptions (customer_id, restaurant_group_id, subscription) values ('${customerID}', '${restaurantGroupId}', '${subscription}')`)
// //             }
// //         })
// //     })
// // })

router.post('/subscribe', (req, res) => {
    console.log("Push notification sent")
    var subscription = req.body.subscription
    var title = req.body.title
    console.log(subscription)
    res.status(201).json({})

    const payload = JSON.stringify({title: title, body: 'Testing notification1'})

    webpush.sendNotification(JSON.parse(subscription), payload).catch(err => console.error(err))

    // db.task(t=> { 
    //     return t.any(`SELECT * FROM push_notification_subscriptions WHERE subscription = '${subscription}'`).then(function(userSubscription) {
    //         console.log(userSubscription)
    //         if (userSubscription.length == 0) {
    //             return t.any(`INSERT INTO push_notification_subscriptions (customer_id, restaurant_group_id, subscription) values ('${customerID}', '${restaurantGroupId}', '${subscription}')`)
    //         }
    //         return t.any(`SELECT * FROM push_notification_subscriptions`).then(function(allSubscriptions) {
    //             var allSubLen = allSubscriptions.length
    //             if (allSubLen != 0) {
    //                 console.log(allSubscriptions)
    //                 for (var i = 0; i < allSubLen; i++) {
    //                     var sub = allSubscriptions[i]['subscription']
    //                     webpush.sendNotification(JSON.parse(sub), payload).catch(err => console.error(err))
    //                 }
    //             }
    //         })
    //     })
    // })
})

module.exports = router;
