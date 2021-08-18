import User from "../models/user.js";
import CheckIn from "../models/checkIn.js"

const createCheckIn = (req, res) => {
    // const username = req.params.username;
    const userId = req.userId;
    const checkIn = new CheckIn({user:userId, ...req.body});
    checkIn.save((err, entry) => {
        if (err) return res.status(500).send({message:err.message});
        return res.send({message:"Check in logged"})
    })
}

const updateCheckIn = (req, res) => {
    if (!req.body){
        return res.status(400).send({message: "body cannot be empty"})
    }
    const checkInId = req.params.id;
    const userId = req.userId;

    CheckIn.updateOne(
        {user:userId,"_id":checkInId},
        {$set: {
            emotions : req.body.emotions,
            intensity: req.body.intensity,
            activities: req.body.activities,
            note: req.body.note
        }}
    ).then(data =>{
        return res.send(data)
    }).catch(err =>{
        return res.status(404).send({message:err.message});
    })
}

const deleteCheckIn = (req, res) => {
    const checkInId = req.params.id;
    const userId = req.userId;

    CheckIn.deleteOne({user:userId, _id: checkInId})
        .then(data =>{
            return res.send(data)
        }).catch(err =>{
            return res.status(404).send({message:err.message});
        })
}

const getCheckIn = (req, res) => {
    const checkInId = req.params.id;
    const userId = req.userId;

    CheckIn.find({user:userId, _id: checkInId})
        .then(data => {
            if(data.length == 0) return res.status(404).send({message:`No entries found with id ${checkInId}`})
            return res.send(data);
        })
        .catch(err =>{
            res.status(500).send({message:`Error while trying to retrieve check in with id ${checkInId}`})
        })
   
}

const getAllCheckIns= (req, res) => {
    const userId = req.userId;

    CheckIn.find({user:userId})
        .then(data => {
            if (!data) {
                res.status(404).send({message:`No check ins for userId ${userId} found`})
            } else{
                res.send(data);
            }
        })
        .catch( err => {
            res.status(500).send({message:err.message || `Error occured while trying to get checkins for user ${userId}`})
        })
}

export default {
    createCheckIn,
    updateCheckIn,
    deleteCheckIn,
    getCheckIn,
    getAllCheckIns
}