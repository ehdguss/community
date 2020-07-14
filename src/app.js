import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import pageRouter from "./routes/page";
import boardRouter from "./routes/board";
import commentRouter from "./routes/comment";
import helmet from "helmet";

const app = express();

const db = mongoose.connection;
const MONGODB_URL = `mongodb+srv://root:by606700@cluster0.5dipt.mongodb.net/mydb?retryWrites=true&w=majority`;

db.on("error", console.error);
db.once("open", () => {
    console.log("Connected to mongod server");
});

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
//
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname+"/public"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//
app.use(helmet());
//
app.use("/board", boardRouter);
app.use("/comment", commentRouter);
app.use("/", pageRouter);

const port = 3000;
app.listen(port, () => {
    console.log("server is Running on http://localhost:" + port);
});