'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Hospitals', 'status', {
      type: Sequelize.BOOLEAN,
      alloNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Hospitals', 'status');
  },
};
