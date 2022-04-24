const User=require('../models/user');

//render signin page
module.exports.signin=function(req,res)
{
    res.render('signin',{
        title:'user | signin'
    })
}
//render sign up page
module.exports.signup=function(req,res)
{   
    res.render('signup',
    {
        title:'user|singup'
    })
}  
//create a new user
module.exports.createUser=async function(req,res)
{

    try
    {
        const user=await User.findOne({email:req.body.email});

        if(user)
        {
            req.flash('error','user already present');
            console.log("user already present");
            return res.redirect('/user/signin');
        }
        else
        {
            const newUser=await User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            req.flash('success','successfully signed up!');
            return res.redirect('/user/signin');

        }
    }
    catch(err)
    {
        console.log('error occured in creating a user',err);
        return;
    }
}
//create session for the user
module.exports.createSession=async function(req,res)
{
    //display flash message when the user login
    req.flash('success','logged in successfully');
    res.redirect('/');
  
}
//destroy user session
module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash('success','logged out successfully');
    res.redirect('/user/signin');
}