const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch')
const db = require('../../util/dataBase')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
const pgp = require('pg-promise')
require('dotenv').config()

// Push notifications
const webpush = require('web-push') 
const publicVapidKey = process.env.PUSHNOTIFICATIONPUBLICKEY
const privateVapidKey = process.env.PUSHNOTIFICATIONPRIVATEKEY

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

router.post('/register_user', (req, res) => {
    console.log("Registered user")
    var subscription = req.body.subscription
    var userId = 1

    db.task(t=> { 
        return t.any(`SELECT * FROM push_notification_subscriptions WHERE subscription = '${subscription}'`).then(function(userSubscription) {
            console.log(userSubscription)
            if (userSubscription.length == 0) {
                return t.any(`INSERT INTO push_notification_subscriptions (user_id, subscription) values ('${userId}', '${subscription}')`)
            }
        }).catch(function(err){
            console.log(err)
        })
    })
})

router.post('/subscribe', (req, res) => {
    console.log("Push notification sent")
    var subscription = req.body.subscription
    var title = req.body.title
    var userId = 1
    console.log(subscription)
    res.status(201).json({})

    const payload = JSON.stringify({title: title, body: 'Testing notification1'})

    db.task(t=> { 
        return t.any(`SELECT * FROM push_notification_subscriptions WHERE subscription = '${subscription}'`).then(function(userSubscription) {
            if (userSubscription.length == 0) {
                return t.any(`INSERT INTO push_notification_subscriptions (user_id, subscription) values ('${userId}', '${subscription}')`)
            }
            return t.any(`SELECT * FROM push_notification_subscriptions`).then(function(allSubscriptions) {
                var allSubLen = allSubscriptions.length
                if (allSubLen != 0) {
                    for (var i = 0; i < allSubLen; i++) {
                        var sub = allSubscriptions[i]['subscription']
                        webpush.sendNotification(JSON.parse(sub), payload).catch(err => console.error(err))
                    }
                }
            })
        })
    })
})

module.exports = router;
