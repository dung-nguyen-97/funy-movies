const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const movieService = require('./movie.service');
const authorize = require('../middleware/authorize');

// routes
router.post('/share', authorize, movieSchema, share);
router.get('/list', authorize, getAll);

module.exports = router;

function movieSchema(req, _, next) {
  const schema = Joi.object({
    url: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function share(req, res, next) {
  movieService
    .create({ ...req.body, user_id: req.user_id })
    .then(() => res.json({ message: 'Share successful' }))
    .catch(next);
}

function getAll(req, res, next) {
  movieService
    .getAll()
    .then((movies) => res.json(movies))
    .catch(next);
}
