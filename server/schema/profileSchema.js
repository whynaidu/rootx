const express = require("express");
const app = express();
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
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  creatoremail: {
    type: String,
    required: true,
  },
  Pageviews: {
    viewsAt: {
      type: Date,
      default: Date.now(),
    },
  },
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
        type: Date,
        default: Date.now(),
      },
      visible: {
        type: Boolean,
        default:true,
      },
      views: {
        viewsAt: {
          type: Date,
          default: Date.now(),
        },
      },
    },
  ],
  SocialLinks: {
    facebook: {
      url: {
        type: String,
        default: null,
      },
    },
    instagram: {
      url: {
        type: String,
        default: null,
      },
    },
    telegram: {
      url: {
        type: String,
        default: null,
      },
    },
    tiktok: {
      url: {
        type: String,
        default: "",
      },
    },
    twitter: {
      url: {
        type: String,
        default: null,
      },
    },
    youtube: {
      url: {
        type: String,
        default: null,
      },
    },
    dribble: {
      url: {
        type: String,
        default: null,
      },
    },
    linkedin: {
      url: {
        type: String,
        default: null,
      },
    },
    snapchat: {
      url: {
        type: String,
        default: null,
      },
    },
    whatsapp: {
      url: {
        type: String,
        default: null,
      },
    },
    pinterest: {
      url: {
        type: String,
        default: null,
      },
    },
    spotify: {
      url: {
        type: String,
        default: null,
      },
    },
    twitch: {
      url: {
        type: String,
        default: null,
      },
    },
  },
});

const CreatorProfile = mongoose.model("creator", ProfileSchema);

module.exports = CreatorProfile;
