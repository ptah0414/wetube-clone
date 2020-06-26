import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    // 존재하지 않는 가짜 정보
    isAuthenticated: true,
    id: 1,
  };
  next();
};
