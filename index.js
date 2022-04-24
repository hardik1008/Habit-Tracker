const express=require('express');
const app=express();
const port=8000;

const dotenv=require('dotenv').config();//to keep keys secure
const db=require('./config/mongoose');//to communicate with mongoDB
const session=require('express-session');//for user sessoion
const mongoStore=require('connect-mongo');//temporarliy stores user session
const passport=require('passport');//for authentication
const passportLocal=require('./config/passport_local_stratagy');//local authentication
const flash=require('connect-flash');//to display flash messages
// const cookieParser=require('cookie-parser');
const customMiddleware=require('./config/middleware');//middle ware for flash messages
const expresslayouts=require('express-ejs-layouts')//to make partials

app.use(express.urlencoded({extended:true}));//to parse request 

app.use(expresslayouts);
app.set('layout extractScripts',true);//extract styles to layouts from partials
app.set('layout extractStyles',true);
app.use(express.static('./Assets'));//to access static files

app.set('view engine','ejs');//e
app.set('views','./views');

app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err);
    })
}))

app.use(passport.initialize());
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
//for routing
app.use('/',require('./routes'));


//fires server
app.listen(port,function(err){
    if(err)
    {
        console.log('error while connecting to server');
        return;
    }
    console.log('server is running on port',port);
})