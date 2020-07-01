import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); // finds all the videos on db
    res.render("home", { pageTitle: "Home", videos }); // videos: videos와 같음
    // Home 템플릿에 db.js의 videos 전달
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
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

export const postUpload = async (req, res) => {
  const {
    body: { title, description }, // upload.pug의 form에서 전송한 data
    file: { path },
  } = req;
  const newVideo = await Video.create({
    // Video.js 모델에서 작성했던 변수 사용
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id)); // dummy id
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
