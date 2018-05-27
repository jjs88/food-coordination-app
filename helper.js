const request = require('request');
const key = 'Bearer O92IUSj8sUA9BMPyQECyv9hbS1CKNw4WsUF2sspFbcAeQoksRe-tq2yHuKcyccF6h6wVWDP5NujbrwVyrsswF9kVwaRYR1ojKXTm5IbSIkBxjYvKGAvu6Fz_NKwFW3Yx';
const Place = require('./models/place');

exports.addPlaces = function(places, city) {
  return new Promise((resolve, reject) => {
    try {
      places.forEach( async place => {
        //destructure 
        const {
          name,
          image_url,
          url,
          rating
        } = place;
        const newPlace = new Place({name, image_url, url, rating, city});
        await newPlace.save();
      })
      // wait one second... database doesnt seem to be completely saved even with the await functionality.
      //returns an empty array
      setTimeout(async () => {
        const data = await Place.find({city});
        resolve(data);
      },1000)
    } catch(err) {
      reject(err);
    }
  })
}

exports.yelpAPI = function(city) {
  return new Promise((resolve, reject) => {
    request({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': key,
      },
      uri: `https://api.yelp.com/v3/businesses/search?location=${city}&radius=4000&limit=10`
    }, function(err, resp, body) {
        err ? reject(err): resolve(JSON.parse(body));
    })
  })
}

