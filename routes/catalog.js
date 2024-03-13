import express from "express";

import * as AuthorController from "../controllers/authorController.js";
import * as BookInstanceController from "../controllers/bookInstanceController.js";
import * as BookController from "../controllers/bookController.js";
import * as GenreController from "../controllers/genreController.js";

const router = express.Router();

router.get("/", BookController.index);

//books
//C
router.get("/book/create", BookController.bookCreateGet);
router.post("/book/create", BookController.bookCreatePost);
//R
router.get("/book/:id/", BookController.bookDetails);
router.get("/books", BookController.bookList);
//U
router.get("/book/:id/update", BookController.bookUpdateGet);
router.post("/book/:id/update", BookController.bookUpdatePost);
//D
router.get("/book/:id/delete", BookController.bookDeleteGet);
router.post("/book/:id/delete", BookController.bookDeletePost);

//authors
//C
router.get("/author/create", AuthorController.authorCreateGet);
router.post("/author/create", AuthorController.authorCreatePost);
//R
router.get("/author/:id/", AuthorController.authorDetails);
router.get("/authors", AuthorController.authorList);
//U
router.get("/author/:id/update", AuthorController.authorUpdateGet);
router.post("/author/:id/update", AuthorController.authorUpdatePost);
//D
router.get("/author/:id/delete", AuthorController.authorDeleteGet);
router.post("/author/:id/delete", AuthorController.authorDeletePost);

//genres
//C
router.get("/genre/create", GenreController.genreCreateGet);
router.post("/genre/create", GenreController.genreCreatePost);
//R
router.get("/genre/:id/", GenreController.genreDetails);
router.get("/genres", GenreController.genreList);
//U
router.get("/genre/:id/update", GenreController.genreUpdateGet);
router.post("/genre/:id/update", GenreController.genreUpdatePost);
//D
router.get("/genre/:id/delete", GenreController.genreDeleteGet);
router.post("/genre/:id/delete", GenreController.genreDeletePost);

//bookInstances
//C
router.get("/bookInstance/create", BookInstanceController.bookInstanceCreateGet);
router.post("/bookInstance/create", BookInstanceController.bookInstanceCreatePost);
//R
router.get("/bookInstance/:id/", BookInstanceController.bookInstanceDetails);
router.get("/bookInstances", BookInstanceController.bookInstanceList);
//U
router.get("/bookInstance/:id/update", BookInstanceController.bookInstanceUpdateGet);
router.post("/bookInstance/:id/update", BookInstanceController.bookInstanceUpdatePost);
//D
router.get("/bookInstance/:id/delete", BookInstanceController.bookInstanceDeleteGet);
router.post("/bookInstance/:id/delete", BookInstanceController.bookInstanceDeletePost);

export default router;