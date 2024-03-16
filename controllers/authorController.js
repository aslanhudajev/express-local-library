import Author from "../models/author.js";
import Book from "../models/book.js";
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
export const authorCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
//creates author
export const authorCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});
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
