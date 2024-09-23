// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
// Hash the password before saving


export default mongoose.models.User || mongoose.model("User", UserSchema);
