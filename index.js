const express=require('express');
const port=9000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const User= require('./models/user');

//for session cookie
const session = require('express-session');

//for passport library
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);


app.use(cookieParser());

app.use(express.urlencoded());


// for static files (css,images,scripts)
app.use(express.static('./assets'));

// for layout
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



// setting the view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'social',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//for setting the routing structure 
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err)
    console.log("there is a error in running the server");
    else{
    console.log("           SERVER IS RUNNING           ");
    console.log("            At port: "+port);
    }
});