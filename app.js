import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import createError from "http-errors";
import mongoose, { mongo } from "mongoose";
import logger from "morgan";

import catalogRouter from "./routes/catalog.js";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

await mongoose
  .connect(process.env.MDB_CONNECTION_STRING)
  .catch((error) => console.log(error.message));
mongoose.set("strictQuery", false);

// view engine setup
app.set("views", "./views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
