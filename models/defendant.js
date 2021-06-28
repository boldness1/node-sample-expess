'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Defendant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Case}) {
        this.belongsTo(Case);
    }
  };
  Defendant.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      advocate: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      case_id: DataTypes.INTEGER,
      hukum: DataTypes.STRING,
      icra: DataTypes.STRING,
      hapislik: DataTypes.STRING,
      taksit_orani: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Defendant',
  });


  return Defendant;
};