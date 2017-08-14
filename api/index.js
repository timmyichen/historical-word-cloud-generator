const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const config = require('../config')
const credentials = require('../.credentials')

const MongoClient = require('mongodb').MongoClient;

const scrapeNews = require('./scrapeNews').scrapeNews;
const helpers = require('../client/helpers/helpers');

var availableRoutes = [
    {
        title: 'news',
        routename: '/news/:year/:month/:day',
        methods: ["GET"],
        description: [
            "Gets article for a specified date from a specified newspaper."
        ]
    }
];

router.get('/', (req, res) => {
    res.render('pages/api-entry', {
        appname: config.APPNAME,
        routes: availableRoutes
    });
});

const internalServerError = 
    (res, reason, source) => res.status(500).send({ error: `Error retrieving data from ${source}.`, reason: reason });
const badUserRequestError = 
    (res, reason) => res.status(400).send({ error: `Invalid user request.`, reason: reason });

router.get(availableRoutes[0].routename, (req, res) => {
    const { year, month, day } = req.params;
    
    if (helpers.isDateInvalid(year, month, day)) {
        res.status(500).send({ error: 'invalid query: out of range or includes text'});
        return;
    }
    const dateString = `${year}-${month}-${day}`;
    const query = { dateString: {$eq: dateString} };
    console.log(`date ${dateString} requested`)
    
    const dbName = 'articles';
    const uri = credentials.db.uri;
    MongoClient.connect(uri, (err,db) => {
        if (err) console.log(err);
        console.log('successfully connected to db');
        db.collection(dbName).find(query).toArray((err, result) => {
            if (err) console.log(err);
            console.log('successfully queried db');
            if (result.length === 0) {
                scrapeNews(year, month, day).then((data) => {
                    db.collection(dbName).insertMany(data, (err, res) => {
                        if (err) console.log(err);
                        console.log(`inserted ${res.insertedCount} documents`);
                        db.close();
                    });
                    res.send(data);
                }).catch((msg) => {
                    console.log(`promise rejected: ${msg}`);
                    if (msg === 'crash') {
                        db.close();
                    } else {
                        res.send({
                            empty: true,
                            // uniqueID: `${year}-${month}-${day}-${paper.id}`,
                        });
                        const emptyObject = {
                            uniqueID: dateString,
                            dateString,
                            flag: "empty"
                        };
                        db.collection(dbName).insertOne(emptyObject, (err, res) => {
                            if (err) console.log(err);
                            console.log(`inserted object with EMPTY flag for ${dateString}`);
                            db.close();
                        });
                    }
                });
            } else if (result.length === 1 && result[0].flag) {
                console.log(`db shows that previous scrapes returned zero results. no data was scraped or returned.`)
                res.send({ empty: true })
                db.close();
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