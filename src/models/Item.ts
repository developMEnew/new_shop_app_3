import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  costPrice: {
    type: Number,
    required: [true, 'Please provide the cost price'],
    min: [0, 'Cost price cannot be negative'],
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Please provide the selling price'],
    min: [0, 'Selling price cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  images: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

// Add indexes
ItemSchema.index({ name: 'text' });
ItemSchema.index({ costPrice: 1, sellingPrice: 1 });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);