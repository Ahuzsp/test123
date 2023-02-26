const express = require('express');
const router = express.Router();
const movieLogic = require('../logic/movies');

router.post('/addMovieInstance', (req, res) => {
  movieLogic.addMovieInstance(req, res);
})

router.get('/getMoviesByQuery', (req, res) => {
  movieLogic.getMoviesByQuery(req, res);
})

router.post('/setMovieHot', (req, res) => {
  movieLogic.setMovieHot(req, res);
})
module.exports = router;