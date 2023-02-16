const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      requried: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds =10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

//compare the incoming password with the hashed password

UserSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = model("User", UserSchema);

module.exports = User;