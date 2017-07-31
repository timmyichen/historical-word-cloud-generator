const express = require('express');
const engines = require('consolidate');
const config = require('./config');

const apiRoutes = require('./api/index');

const app = express();

const fs = require('fs');

app.use('/api', apiRoutes);

app.engine('njk', engines.nunjucks);
app.set('view engine', 'njk');
app.set('views', __dirname + '/views');
if (config.DEVMODE) {
  app.use(express.static('public'));
} else {
  app.use(express.static('/app/public'));
}

app.get('/bundle.js', (req,res) => {
  res.sendFile('/public/bundle.js')
})

app.get('*', (req, res) => {
  res.render('pages/index', {
    appname: config.APPNAME
  });
});

app.listen(config.PORT, function () {
  console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
})