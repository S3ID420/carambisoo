import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Card = mongoose.models.Card || mongoose.model('Card', cardSchema);

export default Card;
