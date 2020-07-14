import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    contents: String,
    author: { type: String, default: "user" },
    comment_date: { type: Date, default: Date.now() }
});

const model = mongoose.model("comment", commentSchema);
export default model;