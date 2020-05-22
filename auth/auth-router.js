const router = require('express').Router();

//bringing in all of my stuff i need to make a token and authenticate this user. 

const bcrypt = require('bcryptjs')
const users = require('./authModel')
const jwt = require('jsonwebtoken')




router.post('/register', (req, res) => {
  // implement registration
  const { username, password} = req.body
    if(!username || !password) {
        res.status(403).json({message: 'invalid username,  password'})
    }else{
        users.insert({username, password: bcrypt.hashSync(password, 4)})
            .then(user => {
                res.status(200).json({message: 'register successful', username: username})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'failed to register'})
            })
    }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body
    if(!username || !password) {
        res.status(403).json({message: 'invalid username and password'})
    }else{
        users.findByUsername(username)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({message: 'login successful', username: username, token})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'failed to login'})
            })
    }
});

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET || 'duh', options)
  }

module.exports = router;
