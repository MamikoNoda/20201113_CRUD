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
          pictureUrl: "../picture/tyakapi.jpg",
          feature: "古参。毛並みの悪さは愛の証",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        },
        {
          name: "でカピ",
          Habitat: "on the bed at Home",
          pictureUrl: "../picture/dekapi.jpg",
          feature:
            "サークルの追い出しでもらった思い出深いカピバラ。大きい。5000円強の重みを感じる。。",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        },
        {
          name: "ちっ茶カピ",
          Habitat: "on the bed at Home",
          pictureUrl: "../picture/kokapi.jpg",
          feature: "小さいが非常に毛並みのいい、池袋生まれ池袋育ちのカピバラ。",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        },
        {
          name: "串カツカピ",
          Habitat: "on the bed at Home",
          pictureUrl: "../picture/kushi.jpg",
          feature:
            "串カツのソースツボにはまっているカピバラ。口にソースのついた行儀の悪い子。",
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
