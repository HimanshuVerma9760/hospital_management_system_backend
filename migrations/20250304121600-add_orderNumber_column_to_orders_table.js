'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'orderNumber', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    const orders = await queryInterface.sequelize.query(
      `SELECT id FROM Orders;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (const order of orders) {
      await queryInterface.sequelize.query(
        `UPDATE Orders SET orderNumber = :uuid WHERE id = :id;`,
        { replacements: { uuid: uuidv4(), id: order.id } },
      );
    }

    await queryInterface.changeColumn('Orders', 'orderNumber', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'orderNumber');
  },
};
