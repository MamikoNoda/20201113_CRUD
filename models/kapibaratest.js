const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KapibaraTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KapibaraTest.init(
    {
      name: DataTypes.STRING,
      Habitat: DataTypes.STRING,
      pictureUrl: DataTypes.STRING,
      feature: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "KapibaraTest",
    }
  );
  return KapibaraTest;
};
