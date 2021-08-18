import mongoose from "mongoose";
import * as uniqueValidator from 'mongoose-unique-validator';
import * as mongooseTypeEmail from "mongoose-type-email";
import bcrypt from "bcrypt";
import textSearch from "mongoose-text-search";
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String, 
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
        trim: true
    },
    username: {
        type:String, 
        required: true,
        trim: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        correctTld: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isTherapist: {
        type: Boolean,
        required: true,
    }    
})

// encrypt user password before saving to database
const saltRounds = 10;
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, saltRounds);
    } 
    next()
})

//to allow $text search

UserSchema.index({
    "entries.title": "text",
    "entries.event": "text",
    "entries.thoughts": "text",
    "entries.beliefs": "text",
    "entries.cognitiveErrors": "text",
    "entries.altInterpretation": "text"});
const User = mongoose.model('User', UserSchema);

export default User;