const passport = require('passport');
const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const User = require('../models/user');
const { addPlaces, yelpAPI } = require('../helper');

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
  const data = await Place.find({city}).populate('users');
  res.send(data);
});


//middleware will include the user
router.post('/going', async (req, res) => {
  //get the name of the place from the body and use to find the place
  // console.log(req.user);
  const { name } = req.body;
  const place = await Place.findOne({name}).populate('users');
  // console.log('[PLACE]', place);
  //grab city to filter for return data
  const { city } = place;
  const [user] = await place.users.filter(user=> user._id.toString() === req.user._id.toString());
  //remove the user
  if(user) {
    const { googleId, _id } = user;
    //get the place (non populated users version)
    const place1 = await Place.findOne({name});
    //get position of the user in the array
    const pos = place1.users.indexOf(_id);
    //if the first position then start at 0 to splice
    if(place1.users.length === 1) {
      place1.users.splice(0,1);
    } else {
      place1.users.splice(pos, 1);
    }
    //save the user changes
    await place1.save();
  } else {
    //add the user
    place.users.push(req.user._id);
    await place.save();
  }

  //return places for given city back to client
  const places = await Place.find({city}).populate('users');
  res.send(places);
});

module.exports = router;



// router.get('/test/add', async (req, res) => {
//   const user = new User({name: 'Josh', googleId: '1234'});
//   const saved = await user.save();
//   // const place = await Place.findOne({name: "Girl & the Goat"});
//   // place.users.push(saved);

//   // await place.save();

//   res.send();
// })



// router.get('/test', (req, res) => {
//   res.send({hello: 'works'});
// })