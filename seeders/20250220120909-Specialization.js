'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specializations', null, {});

    await queryInterface.bulkInsert('Specializations', [
      {
        name: 'Cardiologist',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dermatologist',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Neurologist',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gastroenterology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Orthopedic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pediatrician',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nephrology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Psychologist',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pulmonology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rheumatology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Urology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specializations', null, {});
  },
};
