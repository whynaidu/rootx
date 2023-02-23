const express = require("express");
// const CreatorLinks = require("./schema/linksSchema");
const ProfileSchema = require("./schema/profileSchema");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
require("./db/config");

// app.use("/",(req, res, next) => {
//     res.send("This is the express server")
// })

app.post("/api/addlink", async (req, res) => {
  const { linkname, linkurl, linkimagename, Visible } = req.body;
  const addlink = await ProfileSchema.findOneAndUpdate(
    { creatorUsername: "whynaidu" },

    {
      $push: {
        Link: {
          linkName: linkname,
          linkUrl: linkurl,
          linkImagName: linkimagename,
          visible: Visible,
        },
      },
    },
    { new: true },
   
  );
  return res.status(200).json(addlink);
});

app.post("/api/adduser", async (req, res) => {
  const { username, password, creatoremail } = req.body;
  const getusername = await ProfileSchema.find({ creatorUsername: username });
  const getemail = await ProfileSchema.find({ creatoremail: creatoremail });

  const duplicateemail = getemail.length;
  const duplicate = getusername.length;

  if (duplicate != 0) {
    res.send("Username Already Exist");
  } else if (duplicateemail != 0) {
    res.send("email Already Exist");
  } else {
    try {
      const newPassword = await bcrypt.hash(password, 10);
      const addCreator = await new ProfileSchema({
        creatorUsername: username,
        password: newPassword,
        creatoremail: creatoremail,
      }).save();
      res.status(200).json(addCreator);
    } catch (error) {
      res.json({ status: "error", error: "Register Error" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const user = await ProfileSchema.findOne({ creatoremail: req.body.email });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.creatorname,
        email: user.creatoremail,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/updateLink/:username/:id", async (req, res) => {
  const linkId = req.params.id;
    const username = req.params.username;

  console.log(linkId);
  const { linkname, linkurl, linkimagename, Visible } = req.body;

  const data = await ProfileSchema.findOneAndUpdate(
    { creatorUsername: username, Link: { $elemMatch: { _id: linkId } } },
    {
      $set: {
        "Link.$.linkName": linkname,
        "Link.$.linkUrl": linkurl,
        "Link.$.linkImagName": linkimagename,
        "Link.$.visible": Visible,
      },
    },
    {
      new: true,
    }
  );
  return res.status(200).json(data);
});

app.post("/api/profile/:email", async (req, res) => {
  // const linkId = req.params.id;
  const email = req.params.email;

  console.log(email);
  const { name, username, bio } = req.body;

  const data = await ProfileSchema.findOneAndUpdate(
    { creatoremail: email },
    {
      creatorname: name,
      creatorUsername: username,
      bio,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(data);
});



app.post("/api/login", async (req, res) => {
  const user = await ProfileSchema.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/deleteLink/:username/:id", async (req, res) => {
   const username = req.params.username;
  const linkId = req.params.id;
  const deleteLink = await ProfileSchema.findOneAndUpdate(
    { creatorUsername: username },
    { $pull: { Link: { _id: linkId } } }
  );
  res.send(deleteLink);
});

app.get("/:username", async (req, res) => {
  const username = req.params.username;
  const data = await ProfileSchema.find({ creatorUsername: username });
  res.send(data);
  console.log(data);
});

app.post("/deleteall", async (req, res) => {
  const data = await ProfileSchema.deleteMany();
  console.log(data);
  res.send(data);
});

app.listen(3001, () => {
  console.log(`server is runnig at port no 3001`);
});
