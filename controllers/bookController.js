import asyncHandler from "express-async-handler";
import Author from "../models/author.js";
import Book from "../models/book.js";
import BookInstance from "../models/bookInstance.js";
import Genre from "../models/genre.js";

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
        BookInstance.countDocuments({"Available": true}).exec(),
        Genre.countDocuments().exec(),
        Author.countDocuments().exec(),
    ]);

    res.render(index, { bookCount, bookInstanceCount, bookInstanceAvailableCount, genreCount, authorCount });
});

//displays list of books
export const bookList = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//displays book
export const bookDetails = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//displays book create form on GET
export const bookCreateGet = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//creates book
export const bookCreatePost = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//displays book delete form on GET
export const bookDeleteGet = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//deletes book
export const bookDeletePost = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//displays book update form on GET
export const bookUpdateGet = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});

//updates book
export const bookUpdatePost = asyncHandler((req, res, next) => {
    res.send("NOT IMPL.");
});