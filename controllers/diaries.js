import User from "../models/user.js";
import indexOfAttr from "../helpers/indexOfAttr.js";
import Diary from "../models/diary.js";
import Patient from "../models/patient.js";
const createDiaryEntry = (req, res) => {
	const userId = req.userId;

	if (!req.body.title) {
		res.status(400).send({ message: "Title must not be blank" });
		return;
	}
	const diary = new Diary({ user: userId, ...req.body });
	diary.save((err, entry) => {
		if (err) return res.status(500).send({ message: err.message });
		res.send({ message: "Diary logged" });
	});
};

const updateDiaryEntry = (req, res) => {
	if (!req.body) {
		return res.status(400).send({ message: "body cannot be empty" });
	}
	const userId = req.userId;
	const diaryId = req.params.id;
	console.log(req.body.distortions);
	Diary.updateOne(
		{ user: userId, _id: diaryId },
		{
			title: req.body.title,
			event: req.body.event,
			thoughts: req.body.thoughts,
			beliefs: req.body.beliefs,
			anxiety: req.body.anxiety,
			distortions: req.body.distortions,
			altInterpretation: req.body.altInterpretation,
			private: req.body.private,
		}
	)
		.then((data) => {
			return res.send(data);
		})
		.catch((err) => {
			return res.status(404).send({ message: err });
		});
};

const deleteDiaryEntry = (req, res) => {
	const diaryId = req.params.id;
	const userId = req.userId;

	//find user, find diary entey, delete it
	Diary.deleteOne({ user: userId, _id: diaryId })
		.then((data) => {
			return res.send(data);
		})
		.catch((err) => {
			return res.status(404).send({ message: err.message });
		});
};

const getDiaryEntry = (req, res) => {
	const diaryId = req.params.diaryId;

	const userId = assignId(req.userId, req.params.patientId);
	if (userId == null) return res.status(403).send({
		message: `patient ${patientId} not in therapists list`,
	}); 
	
	Diary.find({ user: userId, _id: diaryId })
		.then((data) => {
			if (data.length == 0) {
				return res
					.status(404)
					.send({ message: `No entries found with id ${diaryId}` });
			} else {
				return res.send(data);
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error while trying to retrieve diary entry with id ${diaryId}`,
			});
		});
};

const getAllDiaryEntries = (req, res) => {
	const userId = assignId(req.userId, req.patientId)
	if (userId == null) return res.status(403).send({
		message: `patient ${patientId} not in therapists list`,
	}); 

	Diary.find(
		{ user: userId },
		{ title: 1, event: 1, date: 1, updatedAt: 1, _id: 1 }
	)
		.then((data) => {
			if (data.length == 0)
				return res.status(404).send({
					message: `No entries found for user id ${userId}`,
				});
			return res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error while trying to retrieve diary entries for user id ${userId}`,
			});
		});
};

// const getPatientsEntries = (req, res) => {
// 	if (isPatientInTherapistList(req.userId, req.body.patientId)) {
// 		getEntries(req.body.patientId, res);
// 	} else {
// 		return res.status(404).send({ messsage: "User not in therapist list" });
// 	}
// };

const searchDiaryEntries = async (req, res) => {
	
	const searchString = req.body.search;
	const userId = assignId(req.userId, req.body.patientId)
	if (userId == null) return res.status(403).send({
		message: `patient ${patientId} not in therapists list`,
	}); 

	Diary.find({ user: userId })
		.find({
			$text: {
				$search: searchString,
				$caseSensitive: false,
				$language: "en",
			},
		})
		.then((data) => {
			if (data.length == 0)
				return res
					.status(204)
					.send({ message: "No results found for that search term" });
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};



export default {
	createDiaryEntry,
	updateDiaryEntry,
	deleteDiaryEntry,
	getDiaryEntry,
	getAllDiaryEntries,
	searchDiaryEntries,
};


function assignId(currentUserId, patientId){
	if(patientId != null){
		if (!isPatientInTherapistList(currentUserId, patientId)) {
			return null;
		}
	 return patientId
	}else{
		return currentUserId
	}
}

async function isPatientInTherapistList(id, patientId) {
	try {
		const data = await Patient.find({ therapistId: id });
		if (data.length == 0) result = false;
		const patient = data.find((p) => p.patientId == patientId);
		if (patient) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		//maybe should return something else here
		return false;
	}
}

// function getEntries(userId, res) {
// 	Diary.find(
// 		{ user: userId },
// 		{ title: 1, event: 1, date: 1, updatedAt: 1, _id: 1 }
// 	)
// 		.then((data) => {
// 			if (data.length == 0)
// 				return res.status(404).send({
// 					message: `No entries found for user id ${userId}`,
// 				});
// 			return res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: `Error while trying to retrieve diary entries for user id ${userId}`,
// 			});
// 		});
// }
