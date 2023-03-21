const express = require("express");
require("dotenv").config();
const ProfileSchema = require("./schema/profileSchema");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const jwt_decode = require("jwt-decode");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
require("./db/config");

const app_url = process.env.APP_URL;
const app_port = process.env.APP_PORT;

const Storage = multer.diskStorage({
  destination: "../app/public/linkImage",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const profileImage = multer.diskStorage({
  destination: "../app/public/profileImage",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: Storage,
});

const profileupload = multer({
  storage: profileImage,
});

app.post(
  "/api/:email/addlink",
  upload.single("linkImage"),
  async (req, res) => {
    const email = req.params.email;
    const { linkname, linkurl } = req.body;
    let Add = {
      linkName: linkname,
      linkUrl: linkurl,
    };

    if (req.file) {
      Add.linkImagName = req.file.filename;
    }

    const addlink = await ProfileSchema.findOneAndUpdate(
      { creatoremail: email, userStatus: { $gte: 1 } },

      {
        $push: {
          Link: Add,
        },
      },
      { new: true }
    );
    return res.status(200).json(addlink);
  }
);

app.post("/api/googlesignup", async (req, res) => {
  const { token } = req.body;
  let Payload = await jwt_decode(token);
  let { name, email, picture } = Payload;

  const getemail = await ProfileSchema.find({
    creatoremail: email,
    userStatus: { $gte: 1 },
    glogin: { $gte: true },
  });

  const uname = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const duplicateemail = getemail.length;

  if (duplicateemail != 0) {
    res.status(403).send("User Already registered. Please login in!");
  } else {
    try {
      const addCreator = await new ProfileSchema({
        creatoremail: email,
        creatorname: name,
        creatorUsername: uname,
        // logo: picture,
        glogin: true,
      }).save();
      res.status(200).send({ data: addCreator, message: "SignUp Sussesfull" });
    } catch (error) {
      res.status(403).send(error);
    }
  }
});

app.post("/api/adduser", async (req, res) => {
  const { username, password, creatoremail } = req.body;
  const getusername = await ProfileSchema.find({
    creatorUsername: username,
    userStatus: { $gte: 1 },
  });
  const getemail = await ProfileSchema.find({
    creatoremail: creatoremail,
    userStatus: { $gte: 1 },
  });

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

app.post(
  "/api/updateLink/:email/:id",
  upload.single("linkImage"),
  async (req, res) => {
    try {
      const linkId = req.params.id;
      const email = req.params.email;
      const { linkname, linkurl, Visible, featured, live, expiry } = req.body;

      // update object with non-image-related fields
      const updateObj = {
        "Link.$.linkName": linkname,
        "Link.$.linkUrl": linkurl,
        "Link.$.visible": Visible,
        "Link.$.featured": featured,
        "Link.$.live": live,
        "Link.$.expiration": expiry,
        // "Link.$.expiration": expiry !== "" ? expiry : null, // set expiry to null if it's an empty string
      };

      // check if an image was uploaded and update image-related fields if so

      if (req.file) {
        // delete old image if it exists
        const oldLink = await ProfileSchema.findOne(
          {
            creatoremail: email,
            userStatus: { $gte: 1 },
            Link: { $elemMatch: { _id: linkId } },
          },
          { "Link.$": 1 }
        );
        const oldImagePath = path.join(
          __dirname,
          `../app/public/linkImage/${oldLink.Link[0].linkImagName}`
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }

        // add new image to update object
        updateObj["Link.$.linkImagName"] = req.file.filename;
      }

      const data = await ProfileSchema.findOneAndUpdate(
        {
          creatoremail: email,
          userStatus: { $gte: 1 },
          Link: { $elemMatch: { _id: linkId } },
        },
        { $set: updateObj },
        { new: true }
      );

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

app.post("/api/linkClicked/:email/:id", async (req, res) => {
  try {
    const linkId = req.params.id;
    const email = req.params.email;

    const data = await ProfileSchema.findOneAndUpdate(
      {
        creatoremail: email,
        userStatus: { $gte: 1 },
        Link: { $elemMatch: { _id: linkId } },
      },
      { $push: { "Link.$.views": Date.now() } },
      { new: true }
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/topLinks/:email/", async (req, res) => {
  try {
    const email = req.params.email;

    const data = await ProfileSchema.find({
      creatoremail: email,
      userStatus: { $gte: 1 },
    });
    const pageView = data[0].Pageviews;
    const PageviesCount = pageView.length;

    const linkViews = data[0].Link.map((link) => {
      const viewsCount = link.views.length;
      return {
        linkName: link.linkName,
        viewsCount,
      };
    });

    linkViews.sort((a, b) => b.viewsCount - a.viewsCount);
    const totalCount = linkViews.reduce((acc, cur) => acc + cur.viewsCount, 0);

    return res.status(200).json({ linkViews, PageviesCount, totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/creatorVisited/:username/", async (req, res) => {
  try {
    const username = req.params.username;

    const data = await ProfileSchema.findOneAndUpdate(
      { creatorUsername: username, userStatus: { $gte: 1 } },
      { $push: { Pageviews: Date.now() } },
      { new: true }
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post(
  "/api/profile/:email",
  profileupload.single("profileImage"),
  async (req, res) => {
    try {
      const email = req.params.email;
      const { name, username, bio } = req.body;

      let update = {
        creatorname: name,
        creatorUsername: username,
        bio: bio === "null" ? null : bio,
      };

      if (req.file) {
        const profile = await ProfileSchema.findOne({
          creatoremail: email,
          userStatus: { $gte: 1 },
        });
        if (profile && profile.logo) {
          const filePath = `../app/public/profileImage/${profile.logo}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          } else {
            console.log("File not found in directory");
            // do something else here
          }
        }

        update.logo = req.file.filename;
      }

      const data = await ProfileSchema.findOneAndUpdate(
        { creatoremail: email, userStatus: { $gte: 1 } },
        update,
        {
          new: true,
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

app.post("/api/changePassword/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const { currentPassword, confirmPassword } = req.body;

    const user = await ProfileSchema.findOne({
      creatoremail: email,
      userStatus: { $gte: 1 },
      glogin: { $gte: null },
    });
    // console.log(user.password)

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (isPasswordValid) {
      // console.log(currentPassword);
      const hashnewPassword = await bcrypt.hash(confirmPassword, 10);
      let update = {
        password: hashnewPassword,
      };

      const data = await ProfileSchema.findOneAndUpdate(
        { creatoremail: email, userStatus: { $gte: 1 } },
        update,
        {
          new: true,
        }
      );
      return res.status(200).send("Password Change Succesfull");
    } else {
      res.status(406).send("Invalid");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/updateTheme/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { color } = req.body;

    let update = {
      colorTheme: color,
    };

    const data = await ProfileSchema.findOneAndUpdate(
      { creatoremail: email, userStatus: { $gte: 1 } },
      update,
      {
        new: true,
      }
    );
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await ProfileSchema.findOne({
    creatoremail: req.body.email,
    userStatus: { $gte: 1 },
  });
  //  console.log(user)

  if (!user) {
    return res.status(404).send("Invalid login");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.creatorname,
        email: user.creatoremail,
      },
      process.env.SECRET
    );

    return res.status(200).send({ user: user, token: token });
  } else {
    return res.status(401).send("Invalid User Credentials");
  }
});

app.post("/api/googlelogin", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.send("Please provide a valid token");

    let Payload = await jwt_decode(token);
    const user = await ProfileSchema.findOne({
      creatoremail: Payload.email,
      userStatus: { $gte: 1 },
      glogin: { $gte: true },
    });

    if (!user) {
      return res
        .status(401)
        .send("User not registered. Please sign-up with Google first");
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.creatorname,
          email: user.creatoremail,
        },
        process.env.SECRET
      );
      return res.status(200).send({ user: user, token: token });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.post("/api/deleteLink/:username/:id", async (req, res) => {
  try {
    const username = req.params.username;
    const linkId = req.params.id;

    const profile = await ProfileSchema.findOne({
      creatoremail: username,
      userStatus: { $gte: 1 },
    });
    const link = profile.Link.find((link) => link._id == linkId);

    if (link && link.linkImagName) {
      const filePath = `../app/public/linkImage/${link.linkImagName}`;
      fs.unlinkSync(filePath);
    }

    const deleteLink = await ProfileSchema.findOneAndUpdate(
      { creatoremail: username, userStatus: { $gte: 1 } },
      { $pull: { Link: { _id: linkId } } },
      { new: true }
    );

    res.send(deleteLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/deleteAllLink/:email/", async (req, res) => {
  const email = req.params.email;
  const deleteLink = await ProfileSchema.findOneAndUpdate(
    { creatoremail: email, userStatus: { $gte: 1 } },
    { $set: { Link: [] } }
  );
  res.send(deleteLink);
});

app.get("/creator/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await ProfileSchema.find({
      creatoremail: email,
      userStatus: { $gte: 1 },
    });

    if (data.length === 0) {
      return res.status(404).send(`No user found with email: ${email}`);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Failed to retrieve data for email: ${email}`);
  }
});

app.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await ProfileSchema.find({
      creatorUsername: username,
      userStatus: { $gte: 1 },
    });

    if (data.length === 0) {
      return res.status(404).send("User Not Found");
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send("User Not Found");
  }
});

app.get("/api/getUserLinks/:email/:linkid", async (req, res) => {
  const email = req.params.email;
  const linkId = req.params.linkid;
  const data = await ProfileSchema.find(
    {
      creatoremail: email,
      userStatus: { $gte: 1 },
      Link: {
        $elemMatch: { _id: linkId },
      },
    },
    { "Link.$": 1 }
  );
  res.send(data);
});

app.get("/api/getUserSocialLinks/:email/", async (req, res) => {
  const email = req.params.email;
  const linkId = req.params.linkid;
  const data = await ProfileSchema.find({
    creatoremail: email,
    userStatus: { $gte: 1 },
  });
  res.send(data);
});

app.post("/api/deleteuser/:emailid", async (req, res) => {
  const user = req.params.emailid;
  let update = {
    userStatus: 0,
  };
  const data = await ProfileSchema.findOneAndUpdate(
    { creatoremail: user, userStatus: { $gte: 1 } },
    update,
    { new: true }
  );

  res.send(data);
});

app.post("/deleteall", async (req, res) => {
  const data = await ProfileSchema.deleteMany();

  res.send(data);
});

app.post("/api/forgot", async (req, res) => {
  try {
    let email = req.body.email;
    loweremail = email.toLowerCase();

    const userData = await ProfileSchema.findOne({
      creatoremail: loweremail,
      glogin: null,
      userStatus: { $gte: 1 },
    });

    if (userData) {
      const token = crypto.randomBytes(20).toString("hex");

      const expiration = Date.now() + 120000;

      // Save token and expiration time to the user's profile
      userData.resetPasswordToken = token;
      userData.resetPasswordExpires = expiration;

      await userData.save();

      const mailOptions = {
        to: userData.creatoremail,
        from: process.env.SENDGRID_SENDER_MAIL,
        subject: "Rootx Password Reset",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
    /* Base ------------------------------ */
    
    @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      -webkit-text-size-adjust: none;
    }
    
    a {
      color: #3869D4;
    }
    
    a img {
      border: none;
    }
    
    td {
      word-break: break-word;
    }
    
    .preheader {
      display: none !important;
      visibility: hidden;
      mso-hide: all;
      font-size: 1px;
      line-height: 1px;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
    }
    /* Type ------------------------------ */
    
    body,
    td,
    th {
      font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    }
    
    h1 {
      margin-top: 0;
      color: #333333;
      font-size: 22px;
      font-weight: bold;
      text-align: left;
    }
    
    h2 {
      margin-top: 0;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    
    h3 {
      margin-top: 0;
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    
    td,
    th {
      font-size: 16px;
    }
    
    p,
    ul,
    ol,
    blockquote {
      margin: .4em 0 1.1875em;
      font-size: 16px;
      line-height: 1.625;
    }
    
    p.sub {
      font-size: 13px;
    }
    /* Utilities ------------------------------ */
    
    .align-right {
      text-align: right;
    }
    
    .align-left {
      text-align: left;
    }
    
    .align-center {
      text-align: center;
    }
    
    .u-margin-bottom-none {
      margin-bottom: 0;
    }
    /* Buttons ------------------------------ */
    
    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
    }
    
    .button--green {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
    }
    
    .button--red {
      background-color: #FF6136;
      border-top: 10px solid #FF6136;
      border-right: 18px solid #FF6136;
      border-bottom: 10px solid #FF6136;
      border-left: 18px solid #FF6136;
    }
    
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
        text-align: center !important;
      }
    }
    /* Attribute list ------------------------------ */
    
    .attributes {
      margin: 0 0 21px;
    }
    
    .attributes_content {
      background-color: #F4F4F7;
      padding: 16px;
    }
    
    .attributes_item {
      padding: 0;
    }
    /* Related Items ------------------------------ */
    
    .related {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .related_item {
      padding: 10px 0;
      color: #CBCCCF;
      font-size: 15px;
      line-height: 18px;
    }
    
    .related_item-title {
      display: block;
      margin: .5em 0 0;
    }
    
    .related_item-thumb {
      display: block;
      padding-bottom: 10px;
    }
    
    .related_heading {
      border-top: 1px solid #CBCCCF;
      text-align: center;
      padding: 25px 0 10px;
    }
    /* Discount Code ------------------------------ */
    
    .discount {
      width: 100%;
      margin: 0;
      padding: 24px;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F4F4F7;
      border: 2px dashed #CBCCCF;
    }
    
    .discount_heading {
      text-align: center;
    }
    
    .discount_body {
      text-align: center;
      font-size: 15px;
    }
    /* Social Icons ------------------------------ */
    
    .social {
      width: auto;
    }
    
    .social td {
      padding: 0;
      width: auto;
    }
    
    .social_icon {
      height: 20px;
      margin: 0 8px 10px 8px;
      padding: 0;
    }
    /* Data table ------------------------------ */
    
    .purchase {
      width: 100%;
      margin: 0;
      padding: 35px 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_content {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_item {
      padding: 10px 0;
      color: #51545E;
      font-size: 15px;
      line-height: 18px;
    }
    
    .purchase_heading {
      padding-bottom: 8px;
      border-bottom: 1px solid #EAEAEC;
    }
    
    .purchase_heading p {
      margin: 0;
      color: #85878E;
      font-size: 12px;
    }
    
    .purchase_footer {
      padding-top: 15px;
      border-top: 1px solid #EAEAEC;
    }
    
    .purchase_total {
      margin: 0;
      text-align: right;
      font-weight: bold;
      color: #333333;
    }
    
    .purchase_total--label {
      padding: 0 15px 0 0;
    }
    
    body {
      background-color: #F2F4F6;
      color: #51545E;
    }
    
    p {
      color: #51545E;
    }
    
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F2F4F6;
    }
    
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    /* Masthead ----------------------- */
    
    .email-masthead {
      padding: 25px 0;
      text-align: center;
    }
    
    .email-masthead_logo {
      width: 94px;
    }
    
    .email-masthead_name {
      font-size: 16px;
      font-weight: bold;
      color: #A8AAAF;
      text-decoration: none;
      text-shadow: 0 1px 0 white;
    }
    /* Body ------------------------------ */
    
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #FFFFFF;
    }
    
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .email-footer p {
      color: #A8AAAF;
    }
    
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #EAEAEC;
    }
    
    .content-cell {
      padding: 45px;
    }
    /*Media Queries ------------------------------ */
    
    @media only screen and (max-width: 600px) {
      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      body,
      .email-body,
      .email-body_inner,
      .email-content,
      .email-wrapper,
      .email-masthead,
      .email-footer {
        background-color: #333333 !important;
        color: #FFF !important;
      }
      p,
      ul,
      ol,
      blockquote,
      h1,
      h2,
      h3,
      span,
      .purchase_item {
        color: #FFF !important;
      }
      .attributes_content,
      .discount {
        background-color: #222 !important;
      }
      .email-masthead_name {
        text-shadow: none !important;
      }
    }
    
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .f-fallback  {
        font-family: Arial, sans-serif;
      }
    </style>
  <![endif]-->
  </head>
  <body>
    <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <a href="https://example.com" class="f-fallback email-masthead_name">
                RootX
              </a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Hi ${userData.creatorname},</h1>
                        <p>You recently requested to reset your password for your Rootx account. Use the button below to reset it. <strong>This password reset is only valid for the next 10 Minutes.</strong></p>
                        <!-- Action -->
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <!-- Border based button
           https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${app_url}:${app_port}/resetpassword/${token}" class="f-fallback button button--green" target="_blank">Reset your password</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>If you did not request a password reset, please ignore this email or <a href="${app_url}">contact support</a> if you have questions.</p>
                        <p>Thanks,
                          <br>The Rootx team</p>
                        <!-- Sub copy -->
                        <table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
                              <p class="f-fallback sub">${app_url}:${app_port}/resetpassword/${token}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        [Company Name, LLC]
                        <br>1234 Street Rd.
                        <br>Suite 1234
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
      };

      sgMail
        .send(mailOptions)
        .catch((error) =>
          console.log("Failed to send email", error.response.body)
        );

      res.status(200).send("Email sent");
    } else {
      res.status(501).send("User Not found");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/verifyToken/:token", async (req, res) => {
  const gettoken = req.params.token;

  const verify = await ProfileSchema.findOne({
    resetPasswordToken: req.params.token,
  });

  if (verify) {
    const expirationTime = verify.resetPasswordExpires;
    if (expirationTime > Date.now()) {
      // verify.resetPasswordToken = undefined;
      // verify.resetPasswordExpires = undefined;
      // await verify.save();

      res.status(200).send(verify);
    } else {
      return res.send({
        error: "Password reset token has expired.",
      });
    }
  } else {
    return res.send({
      error: "Password reset token is invalid or has expired.",
    });
  }
});

app.post("/api/resetPassword/:token", async (req, res) => {
  const gettoken = req.params.token;
  const { confirmPassword } = req.body;

  const verify = await ProfileSchema.findOne({
    resetPasswordToken: req.params.token,
  });
  if (verify) {
    verify.resetPasswordToken = undefined;
    verify.resetPasswordExpires = undefined;
    const hashnewPassword = await bcrypt.hash(confirmPassword, 10);
    verify.password = hashnewPassword;

    await verify.save();

    return res.status(200).send("Password Change Succesfull");
  } else {
    res.status(406).send("Invalid");
  }
});
app.listen(3001, () => {
  console.log(`server is runnig at port no 3001`);
});
