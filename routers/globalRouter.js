import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router(); // 라우터 생성

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); // postJoin에서 가입시키고 postLogin에서 로그인시킴

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, logout);

export default globalRouter;
