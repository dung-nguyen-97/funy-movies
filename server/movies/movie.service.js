const db = require('../helpers/db');

module.exports = {
  create,
  getAll
};

async function create(params) {
  if (await db.Movie.findOne({ where: { url: params.url } })) {
    throw 'Video "' + params.url + '" is already taken';
  }

  await db.Movie.create(params);
}

async function getAll() {
  return await db.Movie.findAll({ order: [['id', 'DESC']] });
}
