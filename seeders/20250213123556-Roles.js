'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Super-Admin',
        details: 'Has full access to the system',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin',
        details: 'Has full access to the system as decided by the super admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doctor',
        details: 'Can manage patient records and appointments',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nurse',
        details: 'Can assist doctors and manage patient care',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Receptionist',
        details: 'Manages hospital front desk operations',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patient',
        details: 'Has access to their own medical records',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
