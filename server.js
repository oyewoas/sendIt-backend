

const express = require('express');
const app = express();
const chatCat = require('./app'); 
const passport = require('passport');


app.set('port', process.env.PORT || 3000);
// Serve static assets
app.use(express.static('public'));
//custom property for view engine
app.set('view engine', 'ejs');

//must appear before router
app.use(chatCat.session);

//passport middle ware
app.use(passport.initialize());
//Initialize passport with express session  
app.use(passport.session());

// Mount Middle ware
app.use('/', chatCat.router);

// api endpoints

chatCat.ioServer(app).listen(app.get('port'), () => {
    console.log(`App is running at port ${app.get('port')}`);
});


