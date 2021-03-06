const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const trains = require('./routes/trains');
const users = require('./routes/users');
const routes = require('./routes/routes');
const index = require('./routes/index');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
   secret: 'keyboard cat'
  })
)

app.get('/', index)

app.use('/trains', trains)
app.use('/routes', routes)
app.use('/users', users)


app.listen(process.env.PORT || '3000')
