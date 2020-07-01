import express from "express";
import morgan from "morgan"; // application에서 발생하는 모든 일들을 logging 함
import helmet from "helmet"; // node.js의 보안
import cookieParser from "cookie-parser"; // session을 다루기 위해 쿠키에 유저 정보 저장
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
// express.static(): 주어진 directory에서 file을 보내주는 미들웨어
// /uploads로 접속하면 uploads라는 directory 안으로 들어감
app.use(cookieParser());
app.use(bodyParser.json()); // 서버가 json을 이해할 수 있음
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해할 수 있음
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // use: 누군가 /use에 접속하면 userRouter의 라우터 전체를 사용
app.use(routes.videos, videoRouter);

export default app;
