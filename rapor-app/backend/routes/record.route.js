import express from "express";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecord,
  updateRecord,
} from "../controllers/record.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import employeeRoute from "../middleware/employeeRoute.js";

const router = express.Router();

router.get("/", getAllRecords);
router.get("/:id", getRecord);
router.post("/create", protectRoute, employeeRoute, createRecord);
router.patch("/update/:id", protectRoute, employeeRoute, updateRecord);
router.delete("/delete/:id", protectRoute, employeeRoute, deleteRecord);

export default router;
