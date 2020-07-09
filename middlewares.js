import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // destination

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    // 존재하지 않는 가짜 정보
    isAuthenticated: false,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// single: 오직 하나의 파일만 업로드 가능
// videoFile: upload.pug의 videoFile에 들어올 파일의 이름
