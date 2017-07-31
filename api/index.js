const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const config = require('../config')
const credentials = require('../credentials')

const MongoClient = require('mongodb').MongoClient;

const scrapeNews = require('./scrapeNews').scrapeNews;

var availableRoutes = [
    {
        title: 'news',
        routename: '/news/:year/:month/:day',
        methods: ["GET"],
        description: [
            "Gets article for a specified date from a specified newspaper."
        ]
    }
]

router.get('/', (req, res) => {
    res.render('pages/api-entry', {
        appname: config.APPNAME,
        routes: availableRoutes
    })
})

const internalServerError = 
    (res, reason, source) => res.status(500).send({ error: `Error retrieving data from ${source}.`, reason: reason })
const badUserRequestError = 
    (res, reason) => res.status(400).send({ error: `Invalid user request to ${route} API endpoint.`, reason: reason })

router.get(availableRoutes[0].routename, (req, res) => {
    const { year, month, day } = req.params;
    
    if (parseInt(year, 10) > 1924 || parseInt(year, 10) < 1800) {
        res.status(500).send({ error: 'cannot retrieve dates with years > 1924 or < 1800 '})
    }
    const dateString = `${year}-${month}-${day}`;
    const query = { dateString: {$eq: dateString} };
    
    const dbName = 'articles';
    const uri = `mongodb://admin:${credentials.db.password}@historical-word-cloud-shard-00-00-knue8.mongodb.net:27017,historical-word-cloud-shard-00-01-knue8.mongodb.net:27017,historical-word-cloud-shard-00-02-knue8.mongodb.net:27017/${dbName}?ssl=true&replicaSet=historical-word-cloud-shard-0&authSource=admin`;
    MongoClient.connect(uri, (err,db) => {
        if (err) console.log(err);
        console.log('successfully connected to db');
        db.collection('articles').find(query).toArray((err, result) => {
            if (err) console.log(err);
            console.log('successfully queried db')
            if (result.length === 0) {
                scrapeNews(year, month, day).then((data) => {
                    db.collection('articles').insertMany(data, (err, res) => {
                        if (err) console.log(err);
                        console.log(`inserted ${res.insertedCount} documents`);
                        db.close();
                    });
                    res.send(data);
                })
            } else {
                console.log(`successfully retrieved ${result.length} documents`)
                res.send(result);
                db.close();
            }
            
        });
    });
})

//nothing matched our api requests, return 404
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid API usage. Response not found.' }))

module.exports = router