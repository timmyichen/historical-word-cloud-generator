let username;
let password;
let dbName;

if (process.env.NODE_ENV === 'production') {
    username = process.env.DB_USER;
    password = process.env.DB_PASS;
    dbName = process.env.DB_NAME;
    
    module.exports = {
        db: {
            username,
            password,
            uri: `mongodb://admin:${password}@historical-word-cloud-shard-00-00-knue8.mongodb.net:27017,historical-word-cloud-shard-00-01-knue8.mongodb.net:27017,historical-word-cloud-shard-00-02-knue8.mongodb.net:27017/${dbName}?ssl=true&replicaSet=historical-word-cloud-shard-0&authSource=admin`
        }
    }
} else {
    module.exports = require('./.credentials_dev.js')
}