import express from "express";
import morgan from "morgan"; // application에서 발생하는 모든 일들을 logging 함
import helmet from "helmet"; // node.js의 보안
import cookieParser from "cookie-parser"; // session을 다루기 위해 쿠키에 유저 정보 저장
import bodyParser from "body-parser";
import { userRouter } from "./router"; // 라우터 받음
const app = express();

const handleHome = (req, res) => res.send("Hello from my home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // 서버가 json을 이해할 수 있음
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해할 수 있음
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter); // use: 누군가 /use에 접속하면 userRouter의 라우터 전체를 사용

export default app;