'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});

    await queryInterface.bulkInsert('Modules', [
      {
        name: 'User Management',
        description: 'Handles user registration, login, and roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patient Records',
        description: 'Stores and manages patient health records',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Appointments',
        description: 'Manages doctor-patient appointments and schedules',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Billing',
        description: 'Handles medical billing and payments',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Inventory',
        description: 'Manages hospital equipment and medicine stock',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
