import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_or_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual("full_name").get(() => {
  const author = this;

  if (author.first && author.last) {
    return `${author.first}, ${author.last}`;
  } else {
    return author.first ? author.first : author.last ? author.last : "";
  }
});

AuthorSchema.virtual("url").get(() => {
  const author = this;
  return `/catalog/author/${author._id}`;
});

export default mongoose.model("AuthorModel", AuthorSchema);
