module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "KapibaraTests",
      [
        {
          name: "ちゃカピ",
          Habitat: "on the bed at Home",
          pictureUrl: "../picture/mitei.jpg",
          feature: "古参。毛並みの悪さは愛の証",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("KapibaraTests", null, {});
  },
};
