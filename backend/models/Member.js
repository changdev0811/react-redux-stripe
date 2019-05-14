const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  phone: {
    type: String
  },
  adli_number: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  card_number: {
    type: String
    // required : true
  },
  img: String,
  document_count: {
    type: Number,
    max: 10,
    default: 0
  },
  subscription: {
    offer1: {
      type: Number,
      default: 1
    },
    offer2: {
      type: Number,
      default: 0
    },
    offer3: {
      type: Number,
      default: 0
    },
    offer4: {
      type: Number,
      default: 0
    },
    offer5: {
      type: Number,
      default: 0
    },
    offer6: {
      type: Number,
      default: 0
    }
  },
  admin: {
    type: Number,
    min: 0,
    max: 2,
    required: true,
    default: 2
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date
  }
});

const Member = mongoose.model("members", MemberSchema);
module.exports = Member;
