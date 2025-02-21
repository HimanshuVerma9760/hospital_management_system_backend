module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('doctors', 'specialization_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'specializations',
        key: 'id',
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.sequelize.query(`
      UPDATE doctors d
      SET specialization_id = (
        SELECT id FROM specializations s WHERE s.name = d.specialization
      )
    `);

    await queryInterface.changeColumn('doctors', 'specialization_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.removeColumn('doctors', 'specialization');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('doctors', 'specialization', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE doctors d
      SET specialization = (
        SELECT name FROM specializations s WHERE s.id = d.specialization_id
      )
    `);

    await queryInterface.removeColumn('doctors', 'specialization_id');
  },
};
