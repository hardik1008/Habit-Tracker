const express=require('express');
const router=express.Router();
const passport=require('passport');

const homeController=require('../controllers/home_controller');

//to get app
router.get('/',passport.checkAuthentication,homeController.app);
//to get weekly view
router.get('/weekly',passport.checkAuthentication,homeController.weeklyView);
//to router to user
router.use('/user',require('./user'));
router.use('/habit',require('./habit'));

module.exports=router;