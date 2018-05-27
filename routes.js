const passport = require('passport');
const express = require('express');
const router = express.Router();
const key = 'Bearer O92IUSj8sUA9BMPyQECyv9hbS1CKNw4WsUF2sspFbcAeQoksRe-tq2yHuKcyccF6h6wVWDP5NujbrwVyrsswF9kVwaRYR1ojKXTm5IbSIkBxjYvKGAvu6Fz_NKwFW3Yx';
const Place = require('./models/place');
const User = require('./models/user');
const { addPlaces, yelpAPI } = require('./helper');

router.post('/getPlaces', async (req, res) => {
  const { city } = req.body;
  //check if the city is in the DB
  const saved = await Place.findOne({city})
  //if not, get the place data and save it to the DB
  if(!saved) {
    const {businesses:places} = await yelpAPI(city);
    try {
      const data = await addPlaces(places, city);
      res.send(data);
    } catch(err) {
     res.status(401).send(err);
    }
  } 
  //send back the data
  const data = await Place.find({city});
  res.send(data);
});


//middleware will include the user
router.post('/going', async (req, res) => {
  //will have the user and place

  console.log('[going data]', req.body);
  //find the place
  // const place = await Place.findOne({name: "Girl & the Goat"}).populate('users');
  // //find the user (create a helper method on the schema)
  // const user = await place.users.filter(user=> user.name === 'Josh');
  // console.log(place, user);

  //if not found, add

  //return the place
  res.send({works: 'works'});
});


router.get('/test/add', async (req, res) => {
  const user = new User({name: 'Josh', googleId: '1234'});
  const saved = await user.save();
  // const place = await Place.findOne({name: "Girl & the Goat"});
  // place.users.push(saved);

  // await place.save();

  res.send();
})


router.get('/test', (req, res) => {
  res.send({hello: 'works'});
})





module.exports = router;