const express = require('express');
const router = express.Router();
const cinemaLogic = require('../logic/cinema');

router.get('/getAllCinema', (req, res) => {
  cinemaLogic.getAllCinema(req, res);
})
router.get('/findAllCinemaByQuery', (req, res) => {
  cinemaLogic.findAllCinemaByQuery(req, res);
})
router.post('/addCinemaBatch', (req, res) => {
  cinemaLogic.addCinemaBatch(req, res);
})

module.exports = router;