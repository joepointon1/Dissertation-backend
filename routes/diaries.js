import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import diaries from "../controllers/diaries.js";

const router = express.Router();

router.use("/", [verifyToken]);

router.post("/createDiaryEntry", diaries.createDiaryEntry);
router.put("/updateDiaryEntry/:id", diaries.updateDiaryEntry);
router.delete("/deleteDiaryEntry/:id", diaries.deleteDiaryEntry);
router.get("/getDiaryEntry/:diaryId", diaries.getDiaryEntry);
router.get("/getPatientsEntry/:patientId/:diaryId", diaries.getPatientsEntry);
router.get("/getAllDiaryEntries", diaries.getAllDiaryEntries);
router.get("/getAllPatientsEntries/:patientId", diaries.getPatientsEntries);
router.get("/searchDiary/:search", diaries.searchDiary);
router.get("/searchPatientsDiary/:search/:patientId", diaries.searchPatientsDiary);


export default router;