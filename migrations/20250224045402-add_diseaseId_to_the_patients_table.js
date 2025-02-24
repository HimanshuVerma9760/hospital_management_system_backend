'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Patients', 'disease_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Diseases',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.sequelize.query(`
      UPDATE Patients p
      SET disease_id = (
        SELECT id FROM Diseases d WHERE d.name = p.disease
      )
      WHERE EXISTS (
        SELECT 1 FROM Diseases d WHERE d.name = p.disease
      );
    `);

    await queryInterface.removeColumn('Patients', 'disease');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Patients', 'disease', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE Patients p
      SET disease = (
        SELECT name FROM Diseases d WHERE d.id = p.disease_id
      )
      WHERE EXISTS (
        SELECT 1 FROM Diseases d WHERE d.id = p.disease_id
      );
    `);

    await queryInterface.removeColumn('Patients', 'disease_id');
  },
};