const mongoose=require('mongoose');
const { schema } = require('./user');

const habitSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    habitname:{
        type:String,
        required:true
    },
    days:[{
        action:{
            type:String,
            default:'pending',
            enum:['pending','completed','notCompleted']
        },
        day:{
            type:String
        },
        date:
        {
            type:String
        }
    }],
    favourite:{
        type:Boolean,
        default:false
    },
    date:
    {
        type:String
    }
},
{
    timestamps:true
})

const Habit= mongoose.model('Habit',habitSchema);

module.exports=Habit;