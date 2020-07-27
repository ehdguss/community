import passport from 'passport'
import User from '../models/User'
import flash from 'express-flash';

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;

    if(password !== password2) {
        req.flash("error", "패스워드가 일치하지 않습니다.");
        res.status(400);
        res.render("join", { pageTitle: "Join" , error: req.flash("error")});
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            req.flash("successJoin", "회원가입 성공");
            res.redirect("/")
            next();
        } catch(error) {
            console.log(error);
            req.flash("error", "이미 존재하는 ID입니다.")
            res.render("join", { pageTitle: "Join" , error: req.flash("error") });
        }
    }
};

export const getLogin = (req, res) => 
    res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email end/or passowrd"
});

export const logout = (req, res) => {
    req.flash("info", "Logged out, see you later");
    req.logout();
    res.redirect("/");
};