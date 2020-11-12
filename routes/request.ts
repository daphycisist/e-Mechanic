import express from "express";
import requestController from "../controller/requestController";

const router = express.Router();

router.get("/", requestController.getAllRequests);
router.get("/:id", requestController.getRequest);
router.post("/create", requestController.createRequest);
router.put("/update/:id", requestController.updateRequest)
router.delete("/delete/:id", requestController.deleteRequest);


export default router;