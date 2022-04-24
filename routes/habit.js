const express=require('express');
const router=express.Router();

const habitController=require('../controllers/habit_controller');

//to create a new habit
router.post('/createHabit',habitController.createHabit);
//to toggle habits
router.get('/fav/:id',habitController.toggleFavourite);
//to toggle actions in weekly view
router.get('/toggleAction/',habitController.toggleAction);
//to delete a habit
router.get('/delete/:id',habitController.deleteHabit);
module.exports=router;