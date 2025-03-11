'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Forms', 'forms_ibfk_1');
    await queryInterface.changeColumn('Forms', 'createdBy', {
      type: Sequelize.STRING,
    });
    await queryInterface.addConstraint('Forms', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'forms_createdBy_fkey',
      references: {
        table: 'Users',
        field: 'userId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Forms', 'createdBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
