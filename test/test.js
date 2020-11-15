const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../server");
chai.should();
const db = require("../models/index");
//const expect = chai.expect;

const server = setupServer();
describe("Kapipara API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  it("est.jsとserver.jsの疎通を確認する", async () => {
    //exercise
    const res = await request.get("/");
    //assert
    res.should.have.status(200);
    res.text.should.deep.equal("Hello World!");
  });

  it("Express-Validationが機能していることを確認する(error)", async () => {
    //exercise
    const exp = {
      name: "テ",
    };
    //exercise
    const res = await request.post("/test").send(exp);
    //assert
    res.should.have.status(400);
    JSON.parse(res.text).errors[0].msg.should.deep.equal("文字数が足りない");
  });

  it("Express-Validationが機能していることを確認する(ok)", async () => {
    //exercise
    const exp = {
      name: "テストカピバラ",
    };
    //exercise
    const res = await request.post("/test").send(exp);
    //assert
    res.should.have.status(200);
    res.text.should.deep.equal("Validation OK");
  });

  it("should return GET /kapibara/:name", async () => {
    //exercise
    const res = await request.get(
      "/kapibara/%E3%81%A1%E3%82%83%E3%82%AB%E3%83%94"
    );
    //assert
    console.log(res.text);
    res.should.have.status(200);
    JSON.parse(res.text)[0].name.should.deep.equal("ちゃカピ");
  });

  it("should return POST /kapibara", async () => {
    const exp = {
      name: "テストカピ",
      Habitat: "想像の中",
      pictureUrl: "mitei",
      feature: "架空の存在。テストのためだけに存在する",
    };
    //exercise
    const beforeData = await db.KapibaraTest.findAll({ raw: true });
    const res = await request.post("/kapibara").send(exp);
    const afterData = await db.KapibaraTest.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });

    //assert(返り値の確認。実際のデータ登録を確認。)
    res.should.have.status(201);
    afterData.length.should.deep.equal(beforeData.length + 1);
    afterData[afterData.length - 1].name.should.deep.equal("テストカピ");
    JSON.parse(res.text).name.should.deep.equal("テストカピ");
  });

  it("should return GET selectall /kapibara", async () => {
    const Data = await db.KapibaraTest.findAll({ raw: true });
    //const Datamap = Data.map((kapibara) => {
    //  kapibara.updatedAt = kapibara.updatedAt.toJSON();
    //  kapibara.createdAt = kapibara.createdAt.toJSON();
    //});
    //exercise
    const res = await request.get("/kapibara");
    //assert
    res.should.have.status(200);
    JSON.parse(res.text).length.should.deep.equal(Data.length);
  });

  it("should return GET selectall /kapibara（idの順番確認）", async () => {
    //exercise
    const res = await request.get("/kapibara");
    //assert
    res.should.have.status(200);
    const Jsonres = JSON.parse(res.text);
    let flg = 1;
    for (const i in Jsonres) {
      if (Jsonres[i] > Jsonres[Jsonres.length - 1]) {
        flg = 0;
      }
    }
    flg.should.deep.equal(1);
  });

  it("should  return PATCH /kapibara", async () => {
    const exp = {
      name: "テストカピ",
      change: {
        feature: "架空の存在。修正された。後は消されるだけ。",
      },
    };
    //exercise
    const res = await request.patch("/kapibara").send(exp);
    const Data = await db.KapibaraTest.findAll({
      where: { name: "テストカピ" },
      raw: true,
    });

    //assert（返り値の確認。修正結果を実際のTBLから確認）
    res.should.have.status(200);
    Data[0].feature.should.deep.equal(
      "架空の存在。修正された。後は消されるだけ。"
    );
    JSON.parse(res.text).feature.should.deep.equal(
      "架空の存在。修正された。後は消されるだけ。"
    );
  });

  it("should return DELETE /kapibara", async () => {
    //exercise
    const res = await request.delete("/kapibara").send({ name: "テストカピ" });
    //assert（返り値の確認。削除されていることをデータから確認。）
    const Data = await db.KapibaraTest.findAll({
      where: { name: "テストカピ" },
      raw: true,
    });
    Data.length.should.deep.equal(0);
    res.should.have.status(200);
    res.text.should.deep.equal("ばいばい");
  });
});
