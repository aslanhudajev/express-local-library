import mongoose from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual("full_name").get(function () {
  if (this.first_name && this.family_name) {
    return `${this.family_name}, ${this.first_name}`;
  } else {
    return this.first_name
      ? this.first_name
      : this.family_name
        ? this.family_name
        : "";
  }
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("dob_pretty").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATE_MED,
  );
});

AuthorSchema.virtual("dod_pretty").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toLocaleString(
    DateTime.DATE_MED,
  );
});

export default mongoose.model("AuthorModel", AuthorSchema);
