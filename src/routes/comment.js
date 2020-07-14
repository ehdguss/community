import express from "express";
import Board from "../models/board";
import Comment from "../models/comment";

const commentRouter = express.Router();

commentRouter.post("/write", (req, res) => {
    const comment = new Comment({
        contents: req.body.contents,
        author: req.body.author
    });

    Board.updateOne({_id : req.body.id}, { $push: { comments : comment }}, (err, board) => {
        if(err){
            console.log(err);
            res.redirect('/err');
        }
        res.redirect(`/board/${req.body.id}`);
    });
});

commentRouter.post("/delete", (req, res) => {
    Board.updateOne({_id: req.body.board_id}, {$pull: {comments:{_id: req.body.comment_id}}}, (err, board) => {
        if(err) console.log(err);
        res.redirect(`/board/${req.body.board_id}`)
        console.log(board);
    });
});

export default commentRouter;