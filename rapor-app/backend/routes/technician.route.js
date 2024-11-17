import express from "express";
import {
  createTechnician,
  deleteTechnician,
  getAllTechnicians,
  getTechnician,
  updateTechnician,
} from "../controllers/technician.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import adminRoute from "../middleware/adminRoute.js";
import employeeRoute from "../middleware/employeeRoute.js";

const router = express.Router();

router.post("/create", protectRoute, adminRoute, createTechnician);
router.patch("/update/:id", protectRoute, employeeRoute, updateTechnician);
router.get("/", protectRoute, adminRoute, getAllTechnicians);
router.get("/:id", getTechnician);
router.delete("/delete/:id", protectRoute, adminRoute, deleteTechnician);

export default router;
