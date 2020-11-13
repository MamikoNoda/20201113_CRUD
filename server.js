const express = require("express");
const app = express();
const db=require("./models/index");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
  
  app.post("/create", function (req, res) {
      console.log(req.body);
      db.TestClass.create(
          req.body
          ).then(() => {
              res.send("Data Created.");
            });
          });
  
  app.get("/select",function(req,res){
      db.TestClass.findAll({
          where: {
            attr1 : "test1" 
          }
        }).then((test)=>{
          console.log(test);
          res.send(test);
        });
  });
  
  app.get("/update/:id",async function(req,res){
      const d=await db.TestClass.update({
          attr1: 'test',
        },{
            where:{id:req.params.id}
        });
        console.log(d);
        if(d[0]){
            dat=await db.TestClass.findOne({where:{id:req.params.id}});
            res.send(dat);
        }else{
            res.sendStatus(500);
        }
  });
  
  app.delete("/delete/:id",async function(req,res){
      const d=await db.TestClass.destroy({where:{id:req.params.id}});
      console.log(d);
      if(d){
          res.sendStatus(200);
      }else{
          res.sendStatus(500);
      }
      res.send("delete");
  })

  return app;
};

module.exports = { setupServer };
