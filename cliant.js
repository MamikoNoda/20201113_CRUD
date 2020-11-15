const express = require("express");

const setupCliant = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  //express関数の戻り値をappに入れる
  const app = express();
  app.use(express.json());

  app.get("/top", function (req, res) {
    const top = "<h1>WELCOME</h1>";
    const body = "<p>this is test page</p>";
    const contentselect = "<a href=/kapibara>リスト取得</a>";
    res.send(top + body + contentselect);
  });

  return app;
};

module.exports = { setupCliant };
