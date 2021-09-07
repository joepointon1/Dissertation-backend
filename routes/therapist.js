import express from "express";
import verifyTherapist from "../middleware/verifyTherapist.js";

import therapist from "../controllers/therapist.js";

const router = express.Router();

router.use("/", [verifyTherapist]);

router.post("/addPatient", therapist.addPatient);
router.delete("/removePatient/:email", therapist.removePatient);
router.get("/getAllPatients", therapist.getAllPatients);
router.post("/searchPatients", therapist.searchPatients);
export default router;
