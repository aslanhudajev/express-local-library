import Author from "../models/author.js";
import asyncHandler from "express-async-handler";

//display all authors
export const authorList = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL.");
});

//display author
export const authorDetails = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPL. AUTHOR:" + req.params.id);
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
