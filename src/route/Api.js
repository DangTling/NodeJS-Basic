import express from "express";
import ApiController from "../controller/ApiController";

const router = express.Router();

const InitApiRoute = (app) => {
  router.get("/user", ApiController.getAllUser);
  router.post("/create-user", ApiController.createNewUser);
  router.put("/update-user", ApiController.updateUser);
  router.delete("/delete-user", ApiController.deleteUser);
  return app.use("/api/v1", router);
};
export default InitApiRoute;
