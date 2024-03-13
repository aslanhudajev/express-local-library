import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
});

GenreSchema.virtual("url").get(() => {
  const genre = this;
  return `/catalog/genre/${genre._id}`;
});

export default mongoose.model("GenreModel", GenreSchema);
