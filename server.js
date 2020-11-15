const express = require("express");
//const app = express();
const db = require("./models/index");
//const Sequelize = require("sequelize");
const { check, validationResult } = require("express-validator");
const {
  nameParamValidation,
  nameBodyValidation,
  featureValidation,
  habitatValidation,
  pictureUrlValidation,
  changeBodyValidation,
  changeValication,
} = require("./nameValidation.js");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  //express関数の戻り値をappに入れる
  const app = express();
  app.use("/picture", express.static(`${__dirname}/picture`));
  app.use("/public", express.static(`${__dirname}/public`));
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.post(
    "/test",
    [check("name").isLength({ min: 5 }).withMessage("文字数が足りない")],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.send("Validation OK");
    }
  );

  app.post(
    "/test2",
    [
      nameBodyValidation,
      featureValidation,
      habitatValidation,
      pictureUrlValidation,
      changeBodyValidation,
      changeValication,
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.send("Validation OK");
    }
  );

  app.post(
    "/kapibara",
    [
      nameBodyValidation,
      featureValidation,
      habitatValidation,
      pictureUrlValidation,
    ],
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newKapibara = await db.KapibaraTest.create(req.body);
      res.status(201);
      res.send(newKapibara);
    }
  );

  app.get("/kapibara", async function (req, res) {
    const kapibaraAll = await db.KapibaraTest.findAll({
      order: [["id", "ASC"]],
    });
    res.send(kapibaraAll);
  });

  app.get("/kapibara/:name/", [nameParamValidation], async function (req, res) {
    const kapibaraSelection = await db.KapibaraTest.findAll({
      where: {
        name: req.params.name,
      },
    });
    if (kapibaraSelection.length === 0) {
      res.status(450);
    } else {
      res.status(200);
    }
    res.send(kapibaraSelection);
  });

  app.patch(
    "/kapibara",
    [nameBodyValidation, changeBodyValidation, changeValication],
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const d = await db.KapibaraTest.update(req.body.change, {
        where: { name: req.body.name },
      });
      if (d[0]) {
        const modifyKapibara = await db.KapibaraTest.findOne({
          where: { name: req.body.name },
        });
        res.send(modifyKapibara);
      } else {
        res.sendStatus(500);
      }
    }
  );

  /*XMLHttpRequestでアクセスするためput用に作成したコード(不要)
  app.put("/kapibara", async function (req, res) {
    const d = await db.KapibaraTest.update(req.body.change, {
      where: { name: req.body.name },
    });
    console.log(d);
    if (d[0]) {
      const modifyKapibara = await db.KapibaraTest.findOne({
        where: { name: req.body.name },
      });
      res.send(modifyKapibara);
    } else {
      res.sendStatus(500);
    }
  });
  */

  app.delete("/kapibara", async function (req, res) {
    const deleteKapibaraCount = await db.KapibaraTest.destroy({
      where: { name: req.body.name },
    });
    if (deleteKapibaraCount) {
      res.status(200);
      res.send("ばいばい");
    } else {
      res.sendStatus(500);
    }
  });

  app.get("/top", function (req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
  });

  /*app.useで静的fileを読み込めるようになったため、削除
  app.get('/selectalllist', function(req, res) {
    res.sendFile(__dirname + '/public/selectresultlist.html');
  });

  app.get('/create', function(req, res) {
    res.sendFile(__dirname + '/public/create.html');
  });

  app.get('/update', function(req, res) {
    res.sendFile(__dirname + '/public/update.html');
  });

  app.get('/delete', function(req, res) {
    res.sendFile(__dirname + '/public/delete.html');
  });
  */

  /*
  app.post("/create", function (req, res) {
    db.TestClass.create(req.body).then(() => {
      res.send("Data Created.");
    });
  });

  app.get("/select", function (req, res) {
    db.TestClass.findAll({
      where: {
        attr1: "test1",
      },
    }).then((test) => {
      res.send(test);
    });
  });

  app.patch("/update/:id", async function (req, res) {
    const d = await db.TestClass.update(req.body, {
      where: { id: req.params.id },
    });
    console.log(d);
    if (d[0]) {
      const dat = await db.TestClass.findOne({ where: { id: req.params.id } });
      res.send(dat);
    } else {
      res.sendStatus(500);
    }
  });

  app.delete("/delete/:id", async function (req, res) {
    const d = await db.TestClass.destroy({ where: { id: req.params.id } });
    console.log(d);
    if (d) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
    res.send("delete");
  });
  */

  return app;
};

module.exports = { setupServer };
