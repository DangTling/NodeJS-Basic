import express from "express";
import multer from "multer";
import path from "path";

import HomeController from "../controller/HomeController";

let router = express.Router();
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 3);

const InitWebRoute = (app) => {
  router.get("/", HomeController.getHomePage);
  router.get("/detail/user/:id", HomeController.getDetailPage);
  router.post("/create-new-user", HomeController.createNewUser);
  router.get("/delete-user/:id", HomeController.deleteUser);
  router.get("/update-user/:id", HomeController.getUpdateUser);
  router.post("/process-update-user", HomeController.updateUser);
  router.get("/upload", HomeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    HomeController.handleUploadFile
  );
  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      uploadMultipleFiles(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code == "LIMIT_FIELD_COUNT"
        ) {
          res.send(`LIMIT_FIELD_COUNT`);
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    HomeController.handleUploadMultipleFiles
  );
  router.get("/about", (req, res) => {
    res.send("this is page About");
  });
  return app.use("/", router);
};
export default InitWebRoute;
