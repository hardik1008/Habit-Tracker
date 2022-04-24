const User =require('../models/user');

//TO use passport
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

//authentication using passport
//To show flash messages we need to add req here
passport.use(new LocalStrategy({usernameField:'email',
                                passReqToCallback:true},
             function(req,email,password,done){
                 //find a user and establish identity
                 User.findOne({email:email},function(err,user)
                 {

                    if(err)
                    {
                        req.flash('error',err);
                        //passes error to passport
                        return done(err);
                    }
                    if(!user||user.password!=password)
                    {
                        req.flash('error','Invalid Username/password');
                        return done(null,false);
                    }
                    return done(null,user);
        });
 
     }
))

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){

    done(null,user.id);

})

//deserilaze the user from the key in the cookies

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in deserializing',err);
            return;
        }
        return done(null,user);
    })
})
//sending the data of current sign in user to view
//check if the user is authenticated

passport.checkAuthentication=function(req,res,next)
{
    //if the user is signed in then pass on the requets to the next function(controller)

    // console.log(req.user);
    console.log('is Authenticated',req.isAuthenticated);
    if(req.isAuthenticated())
    {
      
        return next();
    }
    else
    {
        res.redirect('/user/signin');
    }
}

passport.setAuthenticatedUser=function(req,res,next)
{
   
    if(req.isAuthenticated())
    {
        //req.user contains current signed user from the session cookie and we are just 
        //sending them to locals for the views
        res.locals.user=req.user;

    }
    next();
}



module.exports=passport;