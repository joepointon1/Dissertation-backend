import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import diaries from "../controllers/diaries.js";

const router = express.Router();

router.post("/createDiaryEntry", diaries.createDiaryEntry);
router.get("/getDiaryEntry/:diaryId", diaries.getDiaryEntry);
router.put("/updateDiaryEntry/:id", diaries.updateDiaryEntry);
router.delete("/deleteDiaryEntry/:id", diaries.deleteDiaryEntry);
router.get("/getPatientsEntry/:patientId/:diaryId", diaries.getPatientsEntry);
router.get("/getAllDiaryEntries", diaries.getAllDiaryEntries);
router.get("/getAllPatientsEntries/:patientId", diaries.getPatientsEntries);
router.get("/searchDiary/:search", diaries.searchDiary);
router.get("/searchPatientsDiary/:search/:patientId", diaries.searchPatientsDiary);

router.use("/", [verifyToken]);

export default router;