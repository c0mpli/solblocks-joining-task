const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  addresses: {
    type: Array,
    required: false,
  },
  settings: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
