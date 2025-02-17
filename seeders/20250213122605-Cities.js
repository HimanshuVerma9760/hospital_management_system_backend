'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});

    await queryInterface.bulkInsert('Cities', [
      {
        name: 'Lucknow',
        state_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mumbai',
        state_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patna',
        state_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kolkata',
        state_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bhopal',
        state_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chennai',
        state_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jaipur',
        state_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bengaluru',
        state_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ahmedabad',
        state_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hyderabad',
        state_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  },
};
