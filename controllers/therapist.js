import User from "../models/user.js";
import Patient from "../models/patient.js";

const addPatient = async (req, res) => {
	if (!req.body.email) {
		return res.status(400).send({ message: "Email must not be blank" });
	}
	const userId = req.userId;
	
	try{
		//check that the user to be added exists
		const patient = await User.findOne({ email: req.body.email })
		console.log("Patient", patient)
		if (patient==null){
			return res.status(404).send({
				message: `Error: No user with email address ${req.body.email}`,
			});
		}
		//check that user is not already in the therapists list
		const checkPatient = await Patient.findOne({ email: req.body.email });
		if(checkPatient){	
			if (checkPatient.therapistId == userId) {
				return res
					.status(409)
					.send({ message: "Error: User already in your list" });
			} else{
				console.log("fail")
			}
		}
		
		//create new patient obejct
		const newPatient = new Patient({
			therapistId: userId,
			firstName: patient.firstName,
			lastName: patient.lastName,
			patientId: patient._id,
			...req.body,
		});

		//save to database
		newPatient.save((err, patient) => {
			if (err)
				return res.status(500).send({ message: err.message });
			return res.send({
				message: "Success: Patient added to list",
			});
		});
	}catch(err){
		console.log(err)
		return res.status(500).send({ message: err.message });
	}
};

const removePatient = async (req, res) => {
	const userId = req.userId;
	//first check that patient is not in the list of the therapist, then delete patient
	try {
		const patient = await Patient.findOne({
			therapistId: userId,
			email: req.params.email,
		});
		if (patient == null)
			return res
				.status(404)
				.send({ message: "Error: Patient not in your list, check email is correct" });
		
		response = await Patient.deleteOne({ therapistId: userId, email: req.params.email })
		return res.status(200).send()
	} catch (err) {
		console.log(err.message);
	}
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
