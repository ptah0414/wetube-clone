import express from "express";
import morgan from "morgan"; // application에서 발생하는 모든 일들을 logging 함
import helmet from "helmet"; // node.js의 보안
import cookieParser from "cookie-parser"; // session을 다루기 위해 쿠키에 유저 정보 저장
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
// express.static(): 주어진 directory에서 file을 보내주는 미들웨어
// /uploads로 접속하면 uploads라는 directory 안으로 들어감
app.use(cookieParser());
app.use(bodyParser.json()); // 서버가 json을 이해할 수 있음
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해할 수 있음
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize()); // passport 초기화
app.use(passport.session()); // session 저장. session이 가진 쿠키 이용

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // use: 누군가 /use에 접속하면 userRouter의 라우터 전체를 사용
app.use(routes.videos, videoRouter);

export default app;
