import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // destination

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  // user가 존재하지 않는다면 null을 줌
  // console.log(req.user) 하면
  // { _id:  , name:  , email:  , _v:  } 출력
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// single: 오직 하나의 파일만 업로드 가능
// videoFile: upload.pug의 videoFile에 들어올 파일의 이름
