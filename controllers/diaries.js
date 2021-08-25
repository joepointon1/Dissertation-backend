import User from "../models/user.js";
import indexOfAttr from "../helpers/indexOfAttr.js";
import Diary from "../models/diary.js"

const createDiaryEntry = (req, res) =>{
    const userId = req.userId;
    
    if (!req.body.title){
        res.status(400).send({message: "Title must not be blank"});
        return;
    }
    const diary = new Diary({user:userId,...req.body})
    diary.save((err, entry) =>{
        if(err) return res.status(500).send({message: err.message})
        res.send({message:"Diary logged"});
    })

};

const updateDiaryEntry = (req, res) => {
    if (!req.body){
        return res.status(400).send({message: "body cannot be empty"})
    }
    const userId = req.userId;
    const diaryId = req.params.id;
    console.log(req.body.distortions)
    Diary.updateOne(
        {"user":userId, "_id": diaryId },
        {$set: {"title": req.body.title, 
                "event": req.body.event, 
                "thoughts": req.body.thoughts, 
                "beliefs":req.body.beliefs, 
                "anxiety": req.body.anxiety, 
                "distortions": req.body.distortions, 
                "altInterpretation": req.body.altInterpretation, 
                "private":req.body.private}}
    ).then(data =>{
        return res.send(data)
    }).catch(err =>{
        return res.status(404).send({message:err});
    })
    
}

const deleteDiaryEntry = (req, res) => {
    const diaryId = req.params.id;
    const userId = req.userId;
    
    //find user, find diary entey, delete it
    Diary.deleteOne({user:userId, _id: diaryId})
        .then(data =>{
            return res.send(data)
        }).catch(err =>{
            return res.status(404).send({message:err.message});
        })
   
}

const getDiaryEntry = (req, res) => {
    const userId = req.userId;
    const diaryId = req.params.id;

    Diary.find({user:userId,_id:diaryId})
        .then(data => {
            if(data.length == 0) return res.status(404).send({message:`No entries found with id ${diaryId}`})
            return res.send(data);
        })
        .catch(err =>{
            res.status(500).send({message:`Error while trying to retrieve diary entry with id ${diaryId}`})
        })
    
}

const getAllDiaryEntries = (req, res) => {
    const userId = req.userId;
    
    Diary.find({user:userId}, {title:1, event:1, date:1, updatedAt:1})
        .then(data => {
            if(data.length == 0) return res.status(404).send({message:`No entries found for user id ${userId}`})
            return res.send(data);
        })
        .catch(err =>{
            res.status(500).send({message:`Error while trying to retrieve diary entries for user id ${userId}`})
        })
    
}

const searchDiaryEntries = async (req, res) => {
    const userId = req.userId;
    const searchString = req.body.search;

    Diary.find({user:userId}).find({$text: {$search: searchString}})
        .then(data =>{
            if (data.length == 0) return res.status(404).send({message:"No results found for that search term"})
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
   
}

export default {
    createDiaryEntry,
    updateDiaryEntry,
    deleteDiaryEntry,
    getDiaryEntry,
    getAllDiaryEntries,
    searchDiaryEntries
}