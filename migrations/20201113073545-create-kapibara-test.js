module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("KapibaraTests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      Habitat: {
        type: Sequelize.STRING,
      },
      pictureUrl: {
        type: Sequelize.STRING,
      },
      feature: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("KapibaraTests");
  },
};
