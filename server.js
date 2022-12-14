require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
var corsOptions = {
  origin: "http://localhost:5000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/paymentRouter"));

//connect to mongodb

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to mongoDB");
});


//vercel config
/* app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
}); */

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
