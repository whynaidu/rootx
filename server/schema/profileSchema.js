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
