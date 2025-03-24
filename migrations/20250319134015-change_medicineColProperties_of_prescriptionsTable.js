'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Prescriptions', 'medicines', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'text',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Prescriptions', 'medicines', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'text',
    });
  },
};
