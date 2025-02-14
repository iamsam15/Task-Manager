import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    photo: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },

    bio: {
      type: String,
      default: "I am a new user",
    },
    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: true }
);

// hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // hash the password
  // genrate a salt
  const salt = await bcrypt.genSalt(10);
  //hash the password with the salt
  const hashedPassword = await bcrypt.hash(this.password, salt);
  // set the password to the hashed password
  this.password = hashedPassword;
  // call the next middleware
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
