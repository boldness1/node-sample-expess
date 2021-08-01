'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({Defendant, Prosecutor, User}) {
        // this.belongsTo(User,{foreignKey:'UserId'});
        this.hasOne(Defendant,{ onUpdate:'Cascade',foreignKey:{allowNull:false}});
        this.hasOne(Prosecutor,{ onUpdate:'Cascade',foreignKey:{allowNull:false}});
    }
  };

  Case.init({
    status: DataTypes.INTEGER,
    location: DataTypes.STRING,
    case_no: DataTypes.INTEGER,
    defendant_id: DataTypes.INTEGER,
    prosecutor_id: DataTypes.INTEGER,
    case_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Case',
    paranoid: true,
  });
  return Case;
};