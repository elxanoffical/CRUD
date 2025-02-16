import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  subtitle: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
