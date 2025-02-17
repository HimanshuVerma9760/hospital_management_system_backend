'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});

    await queryInterface.bulkInsert('Doctors', [
      {
        name: 'Dr. A. Kumar',
        specialization: 'Cardiologist',
        city_id: 1,
        hospital_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. S. Verma',
        specialization: 'Neurologist',
        city_id: 2,
        hospital_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. Jane Smith',
        specialization: 'Neurologist',
        city_id: 2,
        hospital_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. P. Sharma',
        specialization: 'Orthopedic',
        city_id: 3,
        hospital_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. R. Iyer',
        specialization: 'Dermatologist',
        city_id: 4,
        hospital_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. T. Gupta',
        specialization: 'Pediatrician',
        city_id: 5,
        hospital_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  },
};
