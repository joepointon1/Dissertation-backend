import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import checkIns from "../controllers/checkIns.js";

const router = express.Router();

router.use("/", [verifyToken]);

router.post("/createCheckIn", checkIns.createCheckIn);
router.put("/updateCheckIn/:id", checkIns.updateCheckIn);
router.delete("/deleteCheckIn/:id", checkIns.deleteCheckIn);
router.get("/getCheckIn/:id", checkIns.getCheckIn);
router.get("/getPatientsCheckIn/:patientId", checkIns.getPatientsCheckIn)
router.get("/getAllCheckIns", checkIns.getAllCheckIns);
router.get("/getAllPatientsCheckIns/:patientId", checkIns.getAllPatientsCheckIns)
export default router;
