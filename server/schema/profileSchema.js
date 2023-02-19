const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  creatorname: {
    type: String,
  },
  logo: {
    type: String,
  },
  username: {
    type: String,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
  },
  creatoremail: {
    type: String,
  },
  Pageviews: {
    viewsAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

const CreatorProfile = mongoose.model("creator", ProfileSchema);

module.exports = CreatorProfile;
