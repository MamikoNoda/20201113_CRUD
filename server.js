const express = require("express");
//const app = express();
const db = require("./models/index");
//const Sequelize = require("sequelize");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  //express関数の戻り値をappに入れる
  const app = express();
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.post("/kapibara", async function (req, res) {
    console.log(req.body);
    const newKapibara = await db.KapibaraTest.create(req.body);
    res.status(201);
    res.send(newKapibara);
  });

  app.get("/kapibara", async function (req, res) {
    const kapibaraAll = await db.KapibaraTest.findAll();
    console.log(kapibaraAll);
    res.send(kapibaraAll);
  });

  app.get("/kapibara/:name", async function (req, res) {
    console.log(req.params.name);
    const kapibaraSelection = await db.KapibaraTest.findAll({
      where: {
        name: req.params.name,
      },
    });
    res.send(kapibaraSelection);
  });

  app.patch("/kapibara", async function (req, res) {
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

  app.delete("/kapibara", async function (req, res) {
    console.log(req.body.name);
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

  return app;
};

module.exports = { setupServer };
