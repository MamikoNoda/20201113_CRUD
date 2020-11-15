const { body, param } = require("express-validator");

const nameParamValidation = param("name")
  .isEmpty()
  .withMessage("検索する名前を入力してください");

const changeBodyValidation = body("change")
  .not()
  .isEmpty()
  .withMessage("必須項目です");

const changeValication = body("change").custom((change) => {
  const { feature } = change;
  if (feature === "") {
    throw new Error("修正内容は必須項目です。");
  }
  return true;
});

const nameBodyValidation = body("name")
  .isString()
  .withMessage("文字を入力してください")
  .not()
  .isEmpty()
  .withMessage("必須項目です");
const featureValidation = body("feature")
  .isString()
  .withMessage("文字を入力してください")
  .not()
  .isEmpty()
  .withMessage("必須項目です");
const habitatValidation = body("Habitat")
  .isString()
  .withMessage("文字を入力してください")
  .not()
  .isEmpty()
  .withMessage("必須項目です");
const pictureUrlValidation = body("pictureUrl")
  .isString()
  .withMessage("文字を入力してください")
  .not()
  .isEmpty()
  .withMessage("必須項目です");

module.exports = {
  nameParamValidation,
  nameBodyValidation,
  featureValidation,
  habitatValidation,
  pictureUrlValidation,
  changeBodyValidation,
  changeValication,
};
