import mongoose, { Schema, Document } from 'mongoose';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Category extends Document {
  name: string;
  questions: Question[];
}

const questionSchema = new Schema<Question>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  questions: [questionSchema],
});

export default mongoose.model<Category>('Category', categorySchema);
