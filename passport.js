import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // 쿠키에 오직 user.id만 담아서 전송
passport.deserializeUser(User.deserializeUser()); // 사용자 식별
