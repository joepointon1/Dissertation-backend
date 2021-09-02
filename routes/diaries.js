import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import diaries from "../controllers/diaries.js";

const router = express.Router();

router.use("/", [verifyToken]);

router.post("/createDiaryEntry", diaries.createDiaryEntry);
router.put("/updateDiaryEntry/:id", diaries.updateDiaryEntry);
router.delete("/deleteDiaryEntry/:id", diaries.deleteDiaryEntry);
router.post("/getDiaryEntry/", diaries.getDiaryEntry);
router.get("/getAllDiaryEntries", diaries.getAllDiaryEntries);
router.post("/searchDiaryEntries", diaries.searchDiaryEntries);
router.post("/getPatientsEntries", diaries.getPatientsEntries);

export default router;
