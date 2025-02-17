'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

    const hashedPassword = await bcrypt.hash('something', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        city_id: 1,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. Jane Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword,
        city_id: 2,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Himanshu verma',
        email: 'humnavaverma@gmail.com',
        password: hashedPassword,
        city_id: 3,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
