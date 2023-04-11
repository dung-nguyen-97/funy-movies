const { DataTypes } = require('sequelize');
const User =  require('../users/user.model');

module.exports = model;

function model(sequelize) {
  const attributes = {
    url: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  };

  return sequelize.define('Movie', attributes);
}

