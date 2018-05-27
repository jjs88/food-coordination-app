module.exports = (req, res, next) => {
  // console.log('USER', req.user);
  if(!req.user) {
    return res.status(401).send({error: 'a user is not logged in!'});
  }
  next();
}