'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      defendant_id: {
        type: Sequelize.INTEGER
      },
      prosecutor_id: {
        type: Sequelize.INTEGER
      },
      case_no: {
        type: Sequelize.INTEGER
      },
     location: {
        type: Sequelize.STRING
      },
      case_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cases');
  }
};