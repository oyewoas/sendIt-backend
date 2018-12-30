'use strict';

const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.dbURI);

//Log an error if the connection fails between mongoose and mongoDB
mongoose.connection.on('error', error => {
    console.log("mongoDB Error: ", error);
});

//Create a Schema that defines the structure for storing user data
const Schema = mongoose.Schema;
const chatUser = new Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

//Turn the schema into a usable model
let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
    mongoose,
    userModel
} 