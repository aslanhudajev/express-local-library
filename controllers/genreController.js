import Genre from "../models/genre.js";
import Book from "../models/book.js";
import asyncHandler from "express-async-handler";

//displays list of genres
export const genreList = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find({}).sort({ name: 1 }).exec();
  res.render("genreList", { title: "Genre list", genres });
});

//displays genre
export const genreDetails = asyncHandler(async (req, res, next) => {
  const [genre, books] = await Promise.all([
    Genre.findOne({ _id: req.params.id }).exec(),
    Book.find({ genre: req.params.id }, "title summary")
      .sort({ title: 1 })
      .exec(),
  ]);

  if (genre === null) {
    const error = new Error("Genre not found");
    error.status = 404;
    return next(error);
  }

  res.render("genreDetails", { title: genre.name, books });
});

//displays genre create form on GET
export const genreCreateGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//creates genre
export const genreCreatePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//displays genre delete form on GET
export const genreDeleteGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//deletes genre
export const genreDeletePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//displays genre update form on GET
export const genreUpdateGet = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});

//updates genre
export const genreUpdatePost = asyncHandler((req, res, next) => {
  res.send("NOT IMPL.");
});
