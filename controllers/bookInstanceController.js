import BookInstance from "../models/bookInstance.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

//displays list of book instances
export const bookInstanceList = asyncHandler(async (req, res, next) => {
  const bookInstances = await BookInstance.find({})
    .populate("book", "title")
    .exec();
  console.log(bookInstances);
  res.render("bookInstanceList", {
    title: "Book instance list",
    bookInstances,
  });
});

//displays book instance
export const bookInstanceDetails = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findOne({
    _id: req.params.id,
  }).populate("book", "title");

  if (bookInstance === null) {
    const error = new Error("Book instance not found");
    error.status = 404;
    return next(error);
  }

  res.render("bookInstanceDetails", { bookInstance });
});

//displays book instance create form on GET
export const bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}).sort({ title: 1 }).exec();
  res.render("bookInstanceForm", { title: "Create book instance", books });
});

//creates book instance
export const bookInstanceCreatePost = [
  body("book", "Book can not be empty").notEmpty().trim().escape(),
  body("imprint", "Imprint can not be empty").notEmpty().trim().escape(),
  body("due_back", "Invalid due back date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("status", "Status can not be empty").notEmpty().trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newBookInstance = new BookInstance({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      const books = await Book.find({}).sort({ title: 1 }).exec();
      res.render("bookInstanceForm", {
        title: "Create book instance",
        errors: errors.array(),
        books,
        newBookInstance,
      });

      return;
    } else {
      await newBookInstance.save();
      res.redirect(newBookInstance.url);
    }
  }),
];

//displays book instance delete form on GET
export const bookInstanceDeleteGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//deletes book instance
export const bookInstanceDeletePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//displays book instance update form on GET
export const bookInstanceUpdateGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//updates book instance
export const bookInstanceUpdatePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});
