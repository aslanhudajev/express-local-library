import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "AuthorModel", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "GenreModel" }],
});

BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

export default mongoose.model("BookModel", BookSchema);
