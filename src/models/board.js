import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    contents: String,
    author: String,
    comment_date: { type: Date, default: Date.now() }
});

const boardSchema = new Schema ({
    title: String,
    contents: String,
    author: String,
    views: {type: Number, default: 0},
    date: {type: Date, default: Date.now()},
    comments: [commentSchema]
});

const model = mongoose.model("board", boardSchema);
export default model;