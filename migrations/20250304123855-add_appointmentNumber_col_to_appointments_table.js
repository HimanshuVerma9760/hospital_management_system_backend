'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Appointments', 'appointmentNumber', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    const appointments = await queryInterface.sequelize.query(
      `SELECT id FROM appointments;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (const appointment of appointments) {
      await queryInterface.sequelize.query(
        `UPDATE Appointments SET appointmentNumber = :uuid WHERE id = :id;`,
        { replacements: { uuid: uuidv4(), id: appointment.id } },
      );
    }

    await queryInterface.changeColumn('Appointments', 'appointmentNumber', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Appointments', 'appointmentNumber');
  },
};
