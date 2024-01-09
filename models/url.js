import mongoose, { Schema } from "mongoose";
const urlSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    visited: [{ type: Date }],
  },
  { timestamps: true }
);

const URL = mongoose.model('url',urlSchema);

export default URL;