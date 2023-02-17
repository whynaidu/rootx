const mongoose = require("mongoose");
mongoose
  .connect(
      "mongodb+srv://whynaidu:vedant@rootx.4makdgi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(err));
