import express from "express";
import passport from "passport";
import {
    getJoin,
    getLogin,
    logout,
    postJoin,
    postLogin
} from "../static/userControll";

const authRouter = express.Router();

// authRouter.get("/join/test", (req, res) => {
//     req.session.message="testSession";
//     req.flash("message", "flashMessage");
//     res.redirect("/auth/join/test/result");
// });

// authRouter.get("/join/test/result" ,(req, res) => {
//     res.send(`${req.session.message} ${req.flash("message")}`);
// });
authRouter.get("/join", getJoin);
authRouter.post("/join", postJoin)

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.get("/logout", logout);

export default authRouter