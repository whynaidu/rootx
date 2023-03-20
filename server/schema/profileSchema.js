const express = require("express");
const app = express();
var moment = require("moment");

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  creatorname: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  creatorUsername: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  glogin: {
    type: Boolean,
    default: null,
  },
  userStatus: {
    type: String,
    default: "1",
  },
  creatoremail: {
    type: String,
    required: true,
  },
  registeredat: {
    type: String,
    default: moment().format("MMM Do YYYY"),
  },
  colorTheme: {
    type: String,
    default: "#c04aff",
  },
  Pageviews: [],
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpires: { type: String, default: undefined },

  Link: [
    {
      linkName: {
        type: String,
        default: null,
      },
      linkUrl: {
        type: String,
        default: null,
      },
      linkImagName: {
        type: String,
        default: null,
      },
      createdAt: {
        type: String,
        default: moment().format("MMM Do YYYY"),
      },
      visible: {
        type: Boolean,
        default: true,
      },
      featured: {
        type: Boolean,
        default: false,
      },
      live: {
        type: String,
        default: moment().format(),
      },
      expiration: {
        type: String,
        // validate: {
        //   validator: function (value) {
        //     return value === null || !isNaN(Date.parse(value));
        //   },
        //   message: "Expiration must be null or a valid date string",
        // },
        default: "null",
      },
      views: [],
    },
  ],
  SocialLinks: {
    facebook: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    telegram: {
      type: String,
      default: null,
    },
    tiktok: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    dribble: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    snapchat: {
      type: String,
      default: null,
    },
    whatsapp: {
      type: String,
      default: null,
    },
    pinterest: {
      type: String,
      default: null,
    },
    spotify: {
      type: String,
      default: null,
    },
    twitch: {
      type: String,
      default: null,
    },
  },
});

const CreatorProfile = mongoose.model("creator", ProfileSchema);

module.exports = CreatorProfile;
