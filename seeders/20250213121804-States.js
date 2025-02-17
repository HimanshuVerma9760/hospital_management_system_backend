'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('States', null, {});

    await queryInterface.bulkInsert('States', [
      { name: 'Uttar Pradesh', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maharashtra', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bihar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'West Bengal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Madhya Pradesh', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tamil Nadu', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rajasthan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Karnataka', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gujarat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Andhra Pradesh', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('States', null, {});
  },
};
