/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const router = require('express').Router();
const users = require('./authModel')
const jwt = require('jsonwebtoken')
const jokes = require('../jokes/jokes-router')

// router.get('/api/jokes', validateToken, (req,res) => {
//   console.log(req.username)
//   users.find()
//       .then(user => {
//           const filtered = user.filter(item => {
//               return item === req.username
          
//           })
//           const users = filtered.map(res => {
//               return { id: res.id, username: res.username}
//           })
//           res.status(200).json(users)
//       })
//       .catch(err => {
//           console.log(err)
//           res.status(500).json({message: "failed to find users"})
//       })
// })

module.exports = function validateToken(req,res,next) {
  const token = req.headers.authorization
  if(token) {
      jwt.verify(token, process.env.JWT_SECRET || 'duh', (err, decodedToken) => {
          if(err) {
              res.status(401).json({message: 'token not valid'})
          }else{
              req.username = decodedToken
              
              next()
              
          }
      })
  }else{
      res.status(400).json({message: 'no auth token'})
  } 
}

// module.exports = (req, res, next) => {
//     res.status(401).json({ you: 'shall not pass!' });
//   };

// module.exports = router




