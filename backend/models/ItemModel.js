// models/item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
