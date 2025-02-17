'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', null, {});

    await queryInterface.bulkInsert('Hospitals', [
      {
        name: 'AIIMS Delhi',
        location: 'Delhi',
        city_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fortis Hospital',
        location: 'Mumbai',
        city_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medanta Hospital',
        location: 'Gurgaon',
        city_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Apollo Hospital',
        location: 'Chennai',
        city_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CMC Vellore',
        location: 'Vellore',
        city_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', null, {});
  },
};
