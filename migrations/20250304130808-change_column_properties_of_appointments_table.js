'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Appointments', 'status', {
      type: Sequelize.ENUM(
        'Scheduled',
        'Completed',
        'Cancelled',
        'Rescheduled',
        'Pending',
      ),
      allowNull: false,
      defaultValue: 'Pending',
    });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.changeColumn("Appointments", "status", {
    type: Sequelize.ENUM(
      'Scheduled',
      'Completed',
      'Cancelled',
      'Rescheduled',
    ),
    allowNull: false,
    defaultValue: 'Scheduled',
   })
  },
};
