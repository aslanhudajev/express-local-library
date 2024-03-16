import mongoose, { mongo } from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "BookModel", required: true }, //ref to book doc
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

BookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_pretty").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_SHORT);
});

export default mongoose.model("BookInstanceModel", BookInstanceSchema);
