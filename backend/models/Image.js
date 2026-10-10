import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, trim: true, default: "" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    recommendations: [
      {
        title: String,
        reason: String,
        searchQuery: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);