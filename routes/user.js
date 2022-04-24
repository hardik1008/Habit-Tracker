const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');

//to sign in a user
router.get('/signin',userController.signin);
//to sign up a user
router.get('/signup',userController.signup);
//to sign out a user
router.get('/signout',userController.destroySession);
// router.get('/app',passport.checkAuthentication,userController.app);
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/user/signin'}) ,userController.createSession);
//to create a new user
router.post('/createUser',userController.createUser);



module.exports=router;