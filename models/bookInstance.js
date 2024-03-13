import mongoose, { mongo } from "mongoose";

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

BookInstanceSchema.virtual("url").get(() => {
  const BookInstance = this;
  return `/catalog/bookinstance/${BookInstance._id}`;
});

export default mongoose.model("BookInstanceModel", BookInstanceSchema);
