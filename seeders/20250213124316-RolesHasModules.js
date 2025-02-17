'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolesHasModules', null, {});
    await queryInterface.bulkInsert('RolesHasModules', [
      { roleId: 1, moduleId: 1, createdAt: new Date(), updatedAt: new Date() }, // Admin - User Management
      { roleId: 1, moduleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Admin - Patient Records
      { roleId: 1, moduleId: 3, createdAt: new Date(), updatedAt: new Date() }, // Admin - Appointments
      { roleId: 1, moduleId: 4, createdAt: new Date(), updatedAt: new Date() }, // Admin - Billing
      { roleId: 1, moduleId: 5, createdAt: new Date(), updatedAt: new Date() }, // Admin - Inventory

      { roleId: 2, moduleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Doctor - Patient Records
      { roleId: 2, moduleId: 3, createdAt: new Date(), updatedAt: new Date() }, // Doctor - Appointments
      { roleId: 2, moduleId: 4, createdAt: new Date(), updatedAt: new Date() }, // Doctor - Billing

      { roleId: 3, moduleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Nurse - Patient Records
      { roleId: 3, moduleId: 3, createdAt: new Date(), updatedAt: new Date() }, // Nurse - Appointments

      { roleId: 4, moduleId: 3, createdAt: new Date(), updatedAt: new Date() }, // Receptionist - Appointments
      { roleId: 4, moduleId: 5, createdAt: new Date(), updatedAt: new Date() }, // Receptionist - Inventory

      { roleId: 5, moduleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Patient - Patient Records
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolesHasModules', null, {});
  },
};
