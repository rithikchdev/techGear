import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['laptops', 'phones', 'connecting-stuff', 'other-accessories'], // restricts values
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);
//returns Item
export default mongoose.model('Item', itemSchema);