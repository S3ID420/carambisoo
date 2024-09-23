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
