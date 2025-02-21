'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diseases', null, {});

    await queryInterface.bulkInsert('Diseases', [
      {
        name: 'Covid-19',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diabetes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hypertension',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Malaria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Typhoid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cholera',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yellow Fever',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Measles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tuberculosis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pneumonia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HIV/AIDS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cancer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heart Disease',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stroke',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chronic Kidney Disease',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chronic Obstructive Pulmonary Disease',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asthma',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alzheimer's Disease",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dengue Fever',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Arthritis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Migraine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diseases', null, {});
  },
};
