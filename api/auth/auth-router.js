const db = require('../../data/dbConfig.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const router = require('express').Router();
const { isValid } = require("./users-service.js");

const Jokes = require('../jokes/jokes-data.js');

router.post('/register', (req, res) => {
  //res.end('implement register, please!');
  const credentials = req.body;

  if (isValid(credentials)) {
    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, 10);

    credentials.password = hash;

  db('users').insert(credentials)
    .then(ids => {
      db('users as u')
        .select('u.id', 'u.username')
        .where('u.id', ids)
        .first()
        .then(newUser => {
          const token = generateToken(newUser);
          res.status(201).json({ data: newUser, token })
        })
    })
    .catch(err => {
        console.log('POST error, auth-router.js line 34', err);
        res.status(500).json({ message: 'Failed to store data'})
    })
  } else {
    res.status(400).json({
      message: "username and password required",
    });
  }

});

router.post('/login', (req, res) => {
  //res.end('implement login, please!');
    const { username, password } = req.body;
    if (isValid(req.body)) {
        db('users as u')
            .select('u.id', 'u.username', 'u.password')
            .where({username: username})
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    req.session.user = user
                    const token = generateToken(user);
                    res.status(200).json({ message: `welcome ${user.username}`, token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
      res.status(400).json({
        message: "username and password required",
      });
    }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
