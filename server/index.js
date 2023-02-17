const express = require("express");
const app = express();
require("./db/config");


app.listen(3001, () => {
  console.log(`server is runnig at port no 3000`);
});