'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});

    await queryInterface.bulkInsert('Permissions', [
      {
        name: 'View Users',
        details: 'Allows viewing of users',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edit Users',
        details: 'Allows editing of users',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete Users',
        details: 'Allows deletion of users',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'View Roles',
        details: 'Allows viewing of roles',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edit Roles',
        details: 'Allows editing of roles',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete Roles',
        details: 'Allows deletion of roles',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'View Modules',
        details: 'Allows viewing of modules',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edit Modules',
        details: 'Allows editing of modules',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete Modules',
        details: 'Allows deletion of modules',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
