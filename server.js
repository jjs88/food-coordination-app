const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const places = require('./routes/places');
const auth = require('./routes/auth');
require('./db');
require('./passport');

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', places);  
app.use('/', auth);



if(process.env.NODE_ENV === 'production') {
  //express will serve up production assets
  app.use(express.static('client/build'));
  //express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}



const port = 5000;
app.listen(port, () => {
  console.log('listening on port:', port);
});