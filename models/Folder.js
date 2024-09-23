import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Folder = mongoose.models.Folder || mongoose.model('Folder', folderSchema);

export default Folder;
