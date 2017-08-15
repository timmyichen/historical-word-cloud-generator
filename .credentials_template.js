// fill in the fields below
// then rename this file to .credentials.js

const username = '';
const password = '';
const dbName = '';

module.exports = {
    db: {
        username,
        password,
        uri: `mongodb://admin:${password}@historical-word-cloud-shard-00-00-knue8.mongodb.net:27017,historical-word-cloud-shard-00-01-knue8.mongodb.net:27017,historical-word-cloud-shard-00-02-knue8.mongodb.net:27017/${dbName}?ssl=true&replicaSet=historical-word-cloud-shard-0&authSource=admin`
    }
}