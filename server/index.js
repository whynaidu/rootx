const express = require("express");
// const CreatorLinks = require("./schema/linksSchema");
const ProfileSchema = require("./schema/profileSchema");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
require("./db/config");

// app.use("/",(req, res, next) => {
//     res.send("This is the express server")
// })

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
      { creatoremail: email },

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

app.post(
  "/api/updateLink/:email/:id",
  upload.single("linkImage"),
  async (req, res) => {
    try {
      const linkId = req.params.id;
      const email = req.params.email;

      const { linkname, linkurl, Visible } = req.body;

      // update object with non-image-related fields
      const updateObj = {
        "Link.$.linkName": linkname,
        "Link.$.linkUrl": linkurl,
        "Link.$.visible": Visible,
      };

      // check if an image was uploaded and update image-related fields if so
      if (req.file) {
        // delete old image if it exists
        const oldLink = await ProfileSchema.findOne(
          { creatoremail: email, Link: { $elemMatch: { _id: linkId } } },
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
        { creatoremail: email, Link: { $elemMatch: { _id: linkId } } },
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
      { creatoremail: email, Link: { $elemMatch: { _id: linkId } } },
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

    const data = await ProfileSchema.find({ creatoremail: email });
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
      { creatorUsername: username },
      { $push: { Pageviews: Date.now() } },
      { new: true }
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// app.get("/api/pageviews/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 6); // set to 6 days ago to include today

//     const data = await ProfileSchema.aggregate([
//       { $match: { creatoremail: email, Pageviews: { $gte: oneWeekAgo } } },
//       { $unwind: "$Pageviews" },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: { $toDate: "$Pageviews.date" }, // update to reference the date field within Pageviews
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     return res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// });

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
        bio,
      };

      if (req.file) {
        const profile = await ProfileSchema.findOne({ creatoremail: email });
        if (profile && profile.logo) {
          const filePath = `../app/public/profileImage/${profile.logo}`;
          fs.unlinkSync(filePath);
        }

        update.logo = req.file.filename;
      }

      const data = await ProfileSchema.findOneAndUpdate(
        { creatoremail: email },
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

    return res.json({ status: "ok", user: user, token: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/deleteLink/:username/:id", async (req, res) => {
  try {
    const username = req.params.username;
    const linkId = req.params.id;

    // find the link that needs to be deleted
    const profile = await ProfileSchema.findOne({ creatoremail: username });
    const link = profile.Link.find((link) => link._id == linkId);

    // delete the associated image file, if it exists
    if (link && link.linkImagName) {
      const filePath = `../app/public/linkImage/${link.linkImagName}`;
      fs.unlinkSync(filePath);
    }

    // remove the link from the Link array
    const deleteLink = await ProfileSchema.findOneAndUpdate(
      { creatoremail: username },
      { $pull: { Link: { _id: linkId } } },
      { new: true }
    );

    res.send(deleteLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/deleteLink/:email/", async (req, res) => {
  const email = req.params.email;
  const deleteLink = await ProfileSchema.findOneAndUpdate(
    { creatoremail: email },
    { $set: { Link: [] } }
  );
  res.send(deleteLink);
});

app.get("/creator/:email", async (req, res) => {
  const mail = req.params.email;
  const data = await ProfileSchema.find({ creatoremail: mail });
  res.send(data);
});

app.get("/:username", async (req, res) => {
  const username = req.params.username;
  const data = await ProfileSchema.find({ creatorUsername: username });
  res.send(data);
});

app.get("/api/getUserLinks/:email/:linkid", async (req, res) => {
  const email = req.params.email;
  const linkId = req.params.linkid;
  const data = await ProfileSchema.find(
    {
      creatoremail: email,
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
  });
  res.send(data);
});

app.post("/deleteall", async (req, res) => {
  const data = await ProfileSchema.deleteMany();
  console.log(data);
  res.send(data);
});

app.listen(3001, () => {
  console.log(`server is runnig at port no 3001`);
});
