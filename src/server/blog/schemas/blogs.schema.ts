import mongoose from 'mongoose';
export const BlogSchema = new mongoose.Schema({
  name: String,
  date: Date,
  text: String,
  id: Number,
});
