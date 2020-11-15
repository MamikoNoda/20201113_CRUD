const { setupServer } = require("./server");
//const {setupCliant}=require("./cliant");

const PORT = process.env.PORT || 3000;
const app = setupServer();
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

/*
const PORTC=process.env.PORT ||3001;
const appCliant = setupCliant();
appCliant.listen(PORTC, () => {
  console.log("Cliant running on port", PORTC);
});
*/
