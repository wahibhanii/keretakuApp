const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require('./routes/users');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.render('index')
})

app.use('/users', users)

app.listen(3000)

