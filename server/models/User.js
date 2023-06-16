import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project",
  }],
});

const User = mongoose.model("User", userSchema);

export default User;
