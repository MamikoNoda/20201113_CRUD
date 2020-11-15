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

  it("should return /kapibara", async () => {
    //exercise
    const res = await request.get("/");
    //assert
    res.should.have.status(200);
    res.text.should.deep.equal("Hello World!");
  });

  it("should return SELECT /kapibara", async () => {
    //exercise
    const res = await request.get(
      "/kapibara/%E3%81%A1%E3%82%83%E3%82%AB%E3%83%94"
    );
    //assert
    console.log(res.text);
    res.should.have.status(200);
    JSON.parse(res.text)[0].name.should.deep.equal("ちゃカピ");
  });

  it("should return CREATE  /kapibara", async () => {
    const exp = {
      name: "テストカピ",
      Habitat: "想像の中",
      pictureUrl: "mitei",
      feature: "架空の存在。テストのためだけに存在する",
    };
    //exercise
    const res = await request.post("/kapibara").send(exp);
    //assert
    res.should.have.status(201);
    JSON.parse(res.text).name.should.deep.equal("テストカピ");
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
    //assert
    const Data = await db.KapibaraTest.findAll({
      where: { name: "テストカピ" },
      raw: true,
    });
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
    //assert
    const Data = await db.KapibaraTest.findAll({
      where: { name: "テストカピ" },
      raw: true,
    });
    Data.length.should.deep.equal(0);
    res.should.have.status(200);
    res.text.should.deep.equal("ばいばい");
  });

  it("should return GET selectall /kapibara", async () => {
    //const Data = await db.KapibaraTest.findAll();
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
});
