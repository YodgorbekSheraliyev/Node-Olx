const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 50,
  },
  phone: {
    type: String,
    required: true,
  }
}, {
    timestamps: true
});

const User = model("User", userSchema);

module.exports = User;

