const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const trains = require('./routes/trains');
const users = require('./routes/users');
const routes = require('./routes/routes');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
   secret: 'keyboard cat'
  })
)

app.get('/', function(req, res){
  res.render('index')
})

app.use('/trains', trains)
app.use('/routes', routes)
app.use('/users', users)


app.listen(3000)
