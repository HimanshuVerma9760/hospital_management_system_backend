'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (const user of users) {
      await queryInterface.sequelize.query(
        `UPDATE Users SET userId = :uuid WHERE id = :id;`,
        { replacements: { uuid: uuidv4(), id: user.id } },
      );
    }

    await queryInterface.changeColumn('Users', 'userId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'userId');
  },
};
