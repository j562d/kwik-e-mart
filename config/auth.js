var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

// Export a middleware function that checks if there
// is a user's _id in the session and, if there is,
// fetch the user from the db and add to the req.
module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.get('Authorization');
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, function(err, decoded) {
      if (!err) {
        req.user = decoded.user;
        token = jwt.sign(
          {user: decoded.user},
          SECRET,
          {expiresIn: '5m'}
        );
        res.set('Authorization', token);
        next();
      }
    });
  } else {
    next();
  }
}
