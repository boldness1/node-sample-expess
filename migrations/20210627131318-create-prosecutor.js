'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Prosecutors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      advocate: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      case_id: {
        type: Sequelize.NUMBER
      },
      hukum: {
        type: Sequelize.STRING
      },
      icra: {
        type: Sequelize.STRING
      },
      hapislik: {
        type: Sequelize.STRING
      },
      taksit_orani: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Prosecutors');
  }
};