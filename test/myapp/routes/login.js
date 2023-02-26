const express = require('express');
const router = express.Router();
const loginLogic = require('../logic/login');

router.post('/userLogin', (req, res) => {
  loginLogic.userLogin(req, res);
})
router.post('/createUser', (req, res) => {
  loginLogic.createUser(req, res);
})

module.exports = router;