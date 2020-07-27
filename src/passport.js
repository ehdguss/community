import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());