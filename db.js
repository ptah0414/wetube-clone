import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/we-tube", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
// mongoose와의 연결을 db로 저장

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("errer", handleError);
