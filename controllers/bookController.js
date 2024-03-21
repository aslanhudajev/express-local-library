import asyncHandler from "express-async-handler";
import Author from "../models/author.js";
import Book from "../models/book.js";
import BookInstance from "../models/bookInstance.js";
import Genre from "../models/genre.js";
import { body, validationResult } from "express-validator";
import { genreList } from "./genreController.js";
import book from "../models/book.js";

//displays home page
export const index = asyncHandler(async (req, res, next) => {
  const [
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    genreCount,
    authorCount,
  ] = await Promise.all([
    Book.countDocuments().exec(),
    BookInstance.countDocuments().exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Genre.countDocuments().exec(),
    Author.countDocuments().exec(),
  ]);

  res.render("index", {
    title: "Local Library",
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    genreCount,
    authorCount,
  });
});

//displays list of books
export const bookList = asyncHandler(async (req, res, next) => {
  const books = await Book.find({})
    .select({ author: 1, title: 1 })
    .sort({ title: 1 })
    .populate("author")
    .exec();
  res.render("bookList", { title: "Book list", books });
});

//displays book
export const bookDetails = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findOne({ _id: req.params.id }).populate(["author", "genre"]).exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  res.render("bookDetails", { book, bookInstances });
});

//displays book create form on GET
export const bookCreateGet = asyncHandler(async (req, res, next) => {
  const [authors, genres] = await Promise.all([
    Author.find({}).sort({ family_name: 1 }).exec(),
    Genre.find({}).sort({ name: 1 }).exec(),
  ]);

  res.render("bookForm", { title: "Create book", authors, genres });
});

//creates book
export const bookCreatePost = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === undefined ? [] : [req.body.genre];
    }
    next();
  },

  body("title", "Title can not be empty").notEmpty().trim().escape(),
  body("author", "You must choose an author").notEmpty().trim().escape(),
  body("summary", "Summary can not be empty").notEmpty().trim().escape(),
  body("isbn", "ISBN can not be emtpy").notEmpty().trim().escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newBook = new Book({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      const authors = await Author.find({}).sort({ family_name: 1 }).exec();
      const genres = await Genre.find({}).sort({ name: 1 }).exec();

      res.render("bookForm", {
        title: "Create book",
        genres,
        authors,
        errors: errors.array(),
        newBook,
      });

      return;
    }

    await newBook.save();
    res.redirect(newBook.url);
  }),
];

//displays book delete form on GET
export const bookDeleteGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//deletes book
export const bookDeletePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//displays book update form on GET
export const bookUpdateGet = asyncHandler(async (req, res, next) => {
  const [newBook, authors, genres] = await Promise.all([
    Book.findOne({ _id: req.params.id }).exec(),
    Author.find({}).sort({ family_name: 1 }).exec(),
    Genre.find({}).exec(),
  ]);

  for (const genre of genres) {
    for (const newBookGenre of newBook.genre) {
      if (newBookGenre._id.toString() === genre._id.toString()) {
        genre.checked = true;
      }
    }
  }

  console.log(genres);

  res.render("bookUpdateForm", {
    title: "Update book",
    newBook,
    authors,
    genres,
  });
});

//updates book
export const bookUpdatePost = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === undefined ? [] : [req.body.genre];
    }
    next();
  },

  body("title", "Title can not be empty").notEmpty().trim().escape(),
  body("author", "You must choose an author").notEmpty().trim().escape(),
  body("summary", "Summary can not be empty").notEmpty().trim().escape(),
  body("isbn", "ISBN can not be emtpy").notEmpty().trim().escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newBook = new Book({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      const authors = await Author.find({}).sort({ family_name: 1 }).exec();
      const genres = await Genre.find({}).sort({ name: 1 }).exec();

      res.render("bookForm", {
        title: "Update book",
        genres,
        authors,
        errors: errors.array(),
        newBook,
      });

      return;
    }

    await newBook.save();
    res.redirect(newBook.url);
  }),
];
