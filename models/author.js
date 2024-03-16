import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_or_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual("full_name").get(function () {
  if (this.first_name && this.last_name) {
    return `${this.first_name}, ${this.last_name}`;
  } else {
    return this.first_name
      ? this.first_name
      : this.last_name
        ? this.last_name
        : "";
  }
});

AuthorSchema.virtual("url").get(() => {
  const author = this;
  return `/catalog/author/${author._id}`;
});

export default mongoose.model("AuthorModel", AuthorSchema);
