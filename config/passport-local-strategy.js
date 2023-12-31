const passport = require('passport');

const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');



//Authuntication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},

    function(req,email,password,done){
         //find the user and estabilishes the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }

            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });

    }
));


//Serializing user to design which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})



//Deserilizing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
})

//check if user is Authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in the pass of the request to the next fuction(controll's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed-in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie and we are just sending these the local for the views

        res.locals.user = req.user;
    }
    next();
}

module.exports = passport; 