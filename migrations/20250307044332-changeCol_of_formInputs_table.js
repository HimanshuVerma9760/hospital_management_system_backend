'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('FormInputs', 'label');
    await queryInterface.removeColumn('FormInputs', 'fieldName');
    await queryInterface.removeColumn('FormInputs', 'fieldId');
    await queryInterface.changeColumn('FormInputs', 'inputType', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('FormInputs', 'label');
    await queryInterface.addColumn('FormInputs', 'fieldName');
    await queryInterface.addColumn('FormInputs', 'fieldId');
    await queryInterface.changeColumn('FormInputs', 'inputType', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
