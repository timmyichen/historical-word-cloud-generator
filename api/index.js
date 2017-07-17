const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const config = require('../config')

var availableRoutes = [
    {
        title: 'Hello World!',
        routename: '/helloworld',
        methods: ["GET"],
        description: [
            "Example of how to set up an Express API in a separate router file."
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
    res.send({
        "text": "Hello World! (from an API)"
    })
})

//nothing matched our api requests, return 404
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid API usage. Response not found.' }))

module.exports = router