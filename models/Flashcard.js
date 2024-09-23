import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
});

export default mongoose.models.Flashcard ||
  mongoose.model("Flashcard", FlashcardSchema);
