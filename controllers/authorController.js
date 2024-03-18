import Author from "../models/author.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

//display all authors
export const authorList = asyncHandler(async (req, res, next) => {
  const authors = await Author.find({}).sort({ family_name: 1 }).exec();
  res.render("authorList", { title: "Author list", authors });
});

//display author
export const authorDetails = asyncHandler(async (req, res, next) => {
  const [author, books] = await Promise.all([
    Author.findOne({ _id: req.params.id }),
    Book.find({ author: req.params.id }).sort({ title: 1 }),
  ]);

  if (author === null) {
    const error = new Error("Author not found");
    error.status = 404;
    return next(error);
  }

  res.render("authorDetails", { author, books });
});

//displays auhtor create form on GET
export const authorCreateGet = (req, res, next) => {
  res.render("authorForm", { title: "Create author" });
};

//creates author
export const authorCreatePost = [
  body("first_name")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("First name can not be empty")
    .isAlphanumeric()
    .withMessage("First name can not have non-alphanumeric characters"),

  body("family_name")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Last name can not be emtpy")
    .isAlphanumeric()
    .withMessage("First name can not have non-alphanumeric characters"),

  body("date_of_birth", "Date of birth is invalid")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  body("date_of_death", "Date of death is invalid")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newAuthor = new Author({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      res.render("authorForm", {
        title: "Create author",
        errors: errors.array(),
        newAuthor,
      });
      return;
    } else {
      await newAuthor.save();
      res.redirect(newAuthor.url);
    }
  }),
];

//displays auhtor delete form on GET
export const authorDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
//deletes author
export const authorDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
//displays auhtor update form on GET
export const authorUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
//updates author
export const authorUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
