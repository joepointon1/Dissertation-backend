import User from "../models/user.js";
import Patient from "../models/patient.js";

const addPatient = (req, res) => {
	if (!req.body.email) {
		return res.status(400).send({ message: "Email must not be blank" });
	}
	const userId = req.userId;
	//check that the user to be added exists
	User.findOne({ email: req.body.email }).exec((err, patient) => {
		if (err) return res.status(500).send({ message: err.message });

		if (!patient)
			return res.status(404).send({
				message: `Error: no user with email address ${req.body.email}`,
			});
			
		Patient.findOne({ email: req.body.email }).exec((err, patient) => {
			if (patient.therapistID == userId) {
				return res
					.status(409)
					.send({ message: "Error: User already in your list" });
			} else {
				const newPatient = new Patient({
					therapistId: userId,
					firstName: patient.firstName,
					lastName: patient.lastName,
					patientId: patient._id,
					...req.body,
				});

				newPatient.save((err, patient) => {
					if (err)
						return res.status(500).send({ message: err.message });
					return res.send({
						message: "Success: patient added to list",
					});
				});
			}
		});
	});
};

const removePatient = (req, res) => {
	const userId = req.userId;
	Patient.deleteOne({ therapistId: userId, email: req.params.email })
		.then((data) => {
			return res.send(data);
		})
		.catch((err) => {
			return res.status(404).send({ message: err.message });
		});
};

const getAllPatients = (req, res) => {
	const userId = req.userId;
	Patient.find({ therapistId: userId })
		.then((data) => {
			if (data.length == 0)
				return res.status(404).send({ message: "No patients found" });
			return res.send(data);
		})
		.catch((err) => {
			return res.status(404).send({ message: err.message });
		});
};

const searchPatients = (req, res) => {
	const userId = req.userId;
	const searchString = req.body.search;
	Patient.find({ therapistId: userId })
		.find({ $text: { $search: `"${searchString}"` } })
		.then((data) => {
			if (data.length == 0)
				return res
					.status(404)
					.send({ message: "No results found for that search term" });
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send(err.message);
		});
};

export default {
	addPatient,
	removePatient,
	getAllPatients,
	searchPatients,
};
