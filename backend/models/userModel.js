const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      //  [true, "Dont forget to add your name"]
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "plz add your Email"],
      validate: {
        validator: function (email) {
          return email.includes("@");
        },
      },
    },

    password: {
      type: String,
      required: [true, "plz add your paasowrd"],
    },
    confirmPassword: {
      type: String,
      // required: true,
      // required: [true, "plz add your confirm paasowrd"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
