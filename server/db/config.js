require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(err));
