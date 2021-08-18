import mongoose from "mongoose";
// import * as uniqueValidator from 'mongoose-unique-validator';
// import * as mongooseTypeEmail from "mongoose-type-email";

const Schema  = mongoose.Schema;

const DiarySchema = new Schema({
    user: {
        type: String,
        require: true
    },
    title : {
        type: String,
        require: true,
        trim: true
    },
    date: {
        type: Date,
        // required: true
    },
    event: {
        type: String,
        trim: true
    },
    thoughts: {
        type: String,
        trim: true
    },
    beliefs: {
        type: String,
        trim: true
    },
    anxiety: {
        type: String,
        trim: true
    },
    cognitiveErrors: {
        type: String,
        trim: true
    },
    altInterpretation: {
        type: String,
        trim: true
    },
    private: {
        type: Boolean
    }
    
},
    {
        timestamps:true
    }
)

DiarySchema.index({
    "title": "text",
    "event": "text",
    "thoughts": "text",
    "beliefs": "text",
    "cognitiveErrors": "text",
    "altInterpretation": "text"});


const Diary = mongoose.model('Diary', DiarySchema);

export default Diary;