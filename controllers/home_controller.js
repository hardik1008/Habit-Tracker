const Habit = require('../models/habits');
const User = require('../models/user');
var moment = require('moment'); // require
moment().format();//to formate dates

//to render app view and display all contents
module.exports.app = async function (req, res) {
    try {
        const userId = req.user.id;
        const habits = await Habit.find({ user: userId });
        //check each habit is update or not
        for (habit of habits) {
            if (habit.days[habit.days.length - 1].date == `${moment().format('YYYY-MM-DD')}`) {
                continue;
            }
            else {
                let diffInNoOfDays = moment().diff(moment(habit.days[habit.days.length - 1].date), 'days');
                //just add the remaining days to our Habit array
                while (diffInNoOfDays > 0) {
                    let leftday = {
                        action: 'pending',
                        date: `${moment().subtract(diffInNoOfDays - 1, 'days').format('YYYY-MM-DD')}`,
                        day: `${moment().subtract(diffInNoOfDays - 1, 'days').format('dddd')}`
                    }
                    habit.days.push(leftday);
                    diffInNoOfDays -= 1;
                }
                habit.save();
            }
        }
        //calculate maximum streak for each habit
        //maximum streak is calculated : number of days the user completed that habit since the user created the habit
        for (habit of habits) {
            let count = 0;

            for (let i = 6; i < habit.days.length; i++) {
                if (habit.days[i].action == 'completed') {
                    count += 1;
                }
            }
            habit.maxStreak = count;
            habit.Totaldays = moment().diff(habit.date, 'days') + 1;
        }
        res.render('app', {
            title: 'Habit tracker',
            habits: habits
        })
    }
    catch (err) {
        console.log('Error in fetching homecntroller app ', err);
        return;
    }
}
//function to send data to weekly view
module.exports.weeklyView = async function (req, res) {
    try {
        const userId = req.user.id;
        const habits = await Habit.find({ user: userId });
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        res.render('weekly', {
            title: 'Habit tracker',
            habits: habits,
            months: months
        })
    }
    catch (err) {
        console.log('error in finidng the weeklyView', err);
        return;
    }
}