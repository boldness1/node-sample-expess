'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prosecutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Case}) {
        this.belongsTo(Case);
    }
  };
  Prosecutor.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      advocate: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      case_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prosecutor',
  });
  return Prosecutor;
};