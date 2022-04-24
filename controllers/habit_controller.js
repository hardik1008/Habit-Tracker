var moment = require('moment'); // require
moment().format(); 
const Habit=require('../models/habits');
const User=require('../models/user');

//create a new habit 
module.exports.createHabit=async function(req,res)
{
    try
    {
        const findHabit=await Habit.findOne({habitname:req.body.habitname});
        const user=await User.findById(req.user.id);
        //check same habit is already present or not
        if(findHabit)
        {
            req.flash('error','Habit already present');
            res.redirect('back');
            
        }
        else
        {
            // const todayDate=moment().format('YYYY-MM-DD');
            const lastdayinWeeklyView=moment().subtract(6, 'days').format('YYYY-MM-DD');
            let weekArray=[];
            //push last 6 days data to newly created habit
            for(let i=6;i>=0;i--)
            {
                let curday={
                    action:'pending',
                    date:`${moment().subtract(i, 'days').format('YYYY-MM-DD')}`,
                    day:`${moment().subtract(i, 'days').format('dddd')}`
                }
                weekArray.push(curday);

            }
           const newHabit=await  Habit.create({
                user:req.user.id,
                habitname:req.body.habitname,
                days:weekArray,
                date:`${moment().format('YYYY-MM-DD')}`
            });

            user.habits.push(newHabit);
            user.save();
            console.log('Habit is created');
            req.flash('success','habit created');
            res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('error occured in creating a user',err);
        return; 
    }
}
//mark a habit as favourite
module.exports.toggleFavourite=async function(req,res)
{
    console.log(req.params.id);

    const habit=await Habit.findById(req.params.id);

    //check if the habit is fav or not
    //if it is fav mark it as non-fav else mark it as fav

    if(habit.favourite===false)
    {
        habit.favourite=true;
    }
    else
    {
        habit.favourite=false;
    }
    console.log('habit updated ');
    habit.save();
    return res.redirect('back');
    // const habitId=await Habit.findById({id:req.params.id})
}
//Toggle actoin from pending to not done or done
module.exports.toggleAction=async function(req,res)
{
    // console.log(req.query);

    try
    {
        const actionId=req.query.actionId;
        const habit = await Habit.findById(req.query.habitId);

        //if action is pending onclick mark it as complete
        if(habit.days[actionId].action ==='pending')
        {
            habit.days[actionId].action='completed';
        }
        else if(habit.days[actionId].action ==='completed')
        {
            habit.days[actionId].action='notCompleted';
        }
        else
        {
            habit.days[actionId].action ='pending';
        }

        habit.save();
        res.redirect('back');

    }
    catch(err)
    {
        console.log('error in toggling the action',err);
        return;
    }

}
//delete a habit from habit list
module.exports.deleteHabit=async function(req,res)
{
    try
    {
        await Habit.remove({_id:req.params.id});
        req.flash('success','Habit deleted');
        res.redirect('back');
    }
    catch(err)
    {
        console.log('error in deleting the habit',err);
        return;
    }
    
}
