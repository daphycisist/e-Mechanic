import express from "express";
import mechanicController from "../controller/mechanicController";

const router = express.Router();

router.get("/", mechanicController.getAllMechanics);
router.get("/:id", mechanicController.getMechanic);
router.post("/create", mechanicController.createMechanic);
router.put("/update/:id", mechanicController.updateMechanic)
router.delete("/delete/:id", mechanicController.deleteMechanic);


export default router;