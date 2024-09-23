import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
