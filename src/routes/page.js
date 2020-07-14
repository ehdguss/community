import express from "express";

import Board from "../models/board";

const pageRouter = express.Router();

pageRouter.get("/", (req, res) => {
    Board.find({}, (err, board) => {
        res.render("index", { board: board });
    });
});

pageRouter.get("/write", (req, res) => {
    res.render("write", { title: "글쓰기" });
});

export default pageRouter;