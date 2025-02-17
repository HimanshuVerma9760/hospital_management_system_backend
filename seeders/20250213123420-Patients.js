'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});

    await queryInterface.bulkInsert('Patients', [
      {
        name: 'Rahul Sharma',
        disease: 'Diabetes',
        city_id: 1,
        hospital_id: 1,
        doctor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Priya Verma',
        disease: 'Hypertension',
        city_id: 2,
        hospital_id: 2,
        doctor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anil Mehta',
        disease: 'Arthritis',
        city_id: 3,
        hospital_id: 3,
        doctor_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sunita Kapoor',
        disease: 'Asthma',
        city_id: 4,
        hospital_id: 4,
        doctor_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vikram Joshi',
        disease: 'Migraine',
        city_id: 5,
        hospital_id: 5,
        doctor_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});
  },
};
