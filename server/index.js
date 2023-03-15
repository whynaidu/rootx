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
const jwt_decode = require("jwt-decode");

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
          { creatoremail: email,  userStatus: { $gte: 1 }, Link: { $elemMatch: { _id: linkId } } },
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
        { creatoremail: email, userStatus: { $gte: 1 } , Link: { $elemMatch: { _id: linkId } } },
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
      { creatoremail: email, userStatus: { $gte: 1 } , Link: { $elemMatch: { _id: linkId } } },
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
      "secret123"
    );

    return res.status(200).send({user: user, token: token });
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
        "secret123"
      );
      return res.status(200).send({ user: user, token: token });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate email and password inputs
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     const user = await ProfileSchema.findOne({ creatoremail: email });

//     // Check if user with provided email exists
//     if (!user) {
//       return res.status(401).json({ error: "Invalid login" });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid login" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h", // Token expiration time
//       }
//     );

//     // Return success response with token and user data
//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.post("/api/deleteLink/:username/:id", async (req, res) => {
  try {
    const username = req.params.username;
    const linkId = req.params.id;

    // find the link that needs to be deleted
    const profile = await ProfileSchema.findOne({
      creatoremail: username,
      userStatus: { $gte: 1 },
    });
    const link = profile.Link.find((link) => link._id == linkId);

    // delete the associated image file, if it exists
    if (link && link.linkImagName) {
      const filePath = `../app/public/linkImage/${link.linkImagName}`;
      fs.unlinkSync(filePath);
    }

    // remove the link from the Link array
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
    const data = await ProfileSchema.find({ creatoremail: email, userStatus: { $gte: 1 } });

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
       userStatus: { $gte: 1 } ,
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

app.listen(3001, () => {
  console.log(`server is runnig at port no 3001`);
});
