// do not make changes to this file
const router = require('express').Router();
const jokes = require('./jokes-data');
const loginCheck = require('../middleware/restricted.js')

router.get('/', loginCheck, (req, res) => {
  res.status(200).json(jokes);
});

module.exports = router;
