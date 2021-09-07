import Patient from '../models/patient.js'

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

export default isPatientInTherapistList