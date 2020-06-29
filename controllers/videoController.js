import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos }); // videos: videos와 같음
  // Home 템플릿에 db.js의 videos 전달
};

export const search = (req, res) => {
  // const searchingBy = req.query.term; <- es6 이전의 방식
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // searchingBy: searchingBy와 같음
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description }, // upload.pug의 form에서 전송한 data
  } = req;
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(324393)); // dummy id
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
