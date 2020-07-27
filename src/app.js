import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";

import pageRouter from "./routes/page";
import boardRouter from "./routes/board";
import commentRouter from "./routes/comment";
import authRouter from "./routes/auth";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", () => {
    console.log("Connected to mongod server");
});

// const MONGODB_URL = "mongodb+srv://root:by606700@cluster0.5dipt.mongodb.net/mydb?retryWrites=true&w=majority";
const MONGODB_URL = "mongodb://localhost:27017/mydb";
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
//
dotenv.config();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname+"/public"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser("key"));
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//
app.use(helmet());
//
app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/comment", commentRouter);
app.use("/", pageRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("server is Running on port " + port);
});