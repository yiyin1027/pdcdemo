const mongoose = require("mongoose");
const User = require("../models/UserModel");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./Keys");


// pass user.id to encrypt
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// get user.id from cookie and decrypt
passport.deserializeUser((id, done) => {

  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "http://localhost:8080/auth/login/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const {sub: googleId, name, email} = profile._json;
    const newUser = new User({
      googleId: googleId,
      name: name,
      email: email
    });

    // Check if database has already had this user
    User.findOne({googleId: googleId})
      .then((currentUser) => {
        // if it has, don't save
        if (currentUser) {
          // console.log("The user is: " + currentUser);
          done(null, currentUser);
        } else {
          // if it does not, save the new user
          newUser.save()
            .then((newUser) => {
              // console.log("Created a new user:" + newUser);
              done(null, newUser);
            })
        }
      });
  }
));


