const db = require('../../data/dbConfig.js');
const router = require('express').Router();

const Jokes = require('../jokes/jokes-data.js');

router.post('/register', (req, res) => {
  //res.end('implement register, please!');
  const credentials = req.body;
  db('users').insert(credentials)
    .then(ids => {
      db('users as u')
        .select('u.id', 'u.username')
        .where('u.id')
        .first()
        .then(newUser => {
          res.status(201).json(newUser)
        })
    })
    .catch(err => {
        console.log('POST error', err);
        res.status(500).json({ message: 'Failed to store data'})
    })




  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

function find() {
  return db('users as u')
      .select('u.id', 'u.username')
}

function findBy(user) {
  return db('users as u')
      .select('u.id', 'u.username', 'u.password')
      .where(user)
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

function findById(id) {
  return db('users as u')
      .select('u.id', 'u.username')
      .where('u.id', id)
      .first();
}

module.exports = router;
