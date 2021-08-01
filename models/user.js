'use strict';
const bcrypt = require('bcrypt');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Case}) {
            this.hasMany(Case);
        }
    };
    User.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            company: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            address: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            paranoid: true,
            hooks: {
                beforeCreate: (user, options) => {
                    {
                        user.password = user.password && user.password !== "" ? bcrypt.hashSync(user.password, 10) : "";
                    }
                },
            },
        });
    return User;
};