'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PrescriptionMedicines', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      prescriptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Prescriptions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medicineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicines',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PrescriptionMedicines');
  },
};
