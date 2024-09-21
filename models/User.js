import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
});

// Hash the password before saving


export default mongoose.models.User || mongoose.model("User", UserSchema);
