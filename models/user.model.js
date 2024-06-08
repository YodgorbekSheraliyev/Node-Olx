const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
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
  },
  posters: [{type: Schema.Types.ObjectId, ref: "Poster"}]
},
 {
    timestamps: true
});

const User = model("User", userSchema);



module.exports = User;

