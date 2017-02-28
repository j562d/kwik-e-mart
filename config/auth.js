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
          {expiresIn: '30m'}
        );
        res.set('Authorization', token);
        next();
      }
    });
  } else {
    next();
  }
}

// module.exports = function(req, res, next) {
//   var token = req.body.token || req.query.token || req.get('Authorization');
//   if (token) {
//     // remove the 'Bearer ' if it was included in the token header
//     token = token.replace('Bearer ', '');
//     // check if token is valid and not expired
//     jwt.verify(token, SECRET, function(err, decoded) {
//       if (!err) {
//         // valid token, so add user to req
//         req.user = decoded.user;
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// }

// module.exports.createToken = function(user, res) {
//   var token = jwt.sign(
//     {user: user},
//     SECRET,
//     {expiresIn: '24h'}
//   );
//   res.set('Authorization', token);
//   // return token, just in case caller wants to use it
//   return token;
// }

// module.exports.verifyToken = function(req, res, next) {
//   var token = req.body.token || req.query.token || req.get('Authorization');
//   if (token) {
//     // remove the 'Bearer ' if it was included in the token header
//     token = token.replace('Bearer ', '');
//     // check if token is valid and not expired
//     jwt.verify(token, SECRET, function(err, decoded) {
//       if (!err) {
//         // valid token, so add user to req
//         req.user = decoded.user;
//         // add a new token to implement sliding expiration!
//         module.exports.createToken(decoded.user, res);
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// }
