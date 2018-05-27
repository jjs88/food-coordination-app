if(process.env.NODE_ENV === 'production') {
  module.exports =  'mongodb://josh:josh@ds237700.mlab.com:37700/food-coord-dev'
} else {
  module.exports =  'mongodb://josh:josh@ds237700.mlab.com:37700/food-coord-prod'
}