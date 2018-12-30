'use strict';

const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const facebookStrategy = require('passport-facebook');
facebookStrategy.Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        //Creating a session and storing an id
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        //Find the user using the _id
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => console.log('Error when deserializing the user'));

    })
    let authProcessor = (accessToken, refreshToken, profile, done) => {
        //Find a user in the local db using profile.id
        //If the user is found, return the user data using the done()
        //If the user is not found, create one in the local db and return
        h.findOne(profile.id)
            .then(result => {
                if(result) {
                    done(null, result);  
                } else {
                    //Create a new user and return the user
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error =>  console.log('Error Creating New User'));
                }
            });
    };

    passport.use(new facebookStrategy(config.fb, authProcessor));
}