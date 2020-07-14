import express from "express";

import Board from "../models/board";

const boardRouter = express.Router();

boardRouter.post("/write", (req, res) => {
    const board = new Board({
        title: req.body.title,
        contents: req.body.contents,
        date: req.body.date
    });

    board.save(err => {
        if(err) {
            console.log(err);
            res.redirect(`/`);
        }
        res.redirect(`/`);
    });
});


boardRouter.get("/:id", (req, res) => {
    Board.findOne({_id: req.params.id}, (err, board) => {
        board.views++;
        board.save();
        res.render("board", { board: board });
    });
});

boardRouter.post("/delete", (req, res) => {
    Board.deleteOne({_id: req.body.id}, (err, board) => {
        if(err) res.redirect("/err");
        res.redirect("/");
    });
});

boardRouter.get("/update/:id", (req, res) => {
    Board.findOne({_id: req.params.id}, (err, board) => {
        res.render("update", { board: board });
    });
});

boardRouter.post("/update", (req, res) => {
    Board.findOneAndUpdate({_id: req.body.id}, {contents: req.body.contents, title: req.body.title}, (err, board) => {
        if(err) res.redirect("/err");
        console.log(board);
        res.redirect(`/board/${req.body.id}`);
    });
});

export default boardRouter;