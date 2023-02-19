const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Linkschema = new mongoose.Schema({
  linkName: {
    type: String,
  },
  linkUrl: {
    type: String,
  },
  linkImagName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  visible: {
    type: Boolean,
  },
  views: {
    viewsAt: {
      type: Date,
      default: Date.now(),
    },
  },
  creatorUsername: {
    type: String,
    required: true,
  },
});

const CreatorLinks = mongoose.model("link", Linkschema);

module.exports = CreatorLinks;
