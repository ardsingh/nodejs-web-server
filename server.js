
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); 

// name of the helper as first argument and function to run as second
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
}); 

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
}); 

// these are handlers for 'get' request
// takes two argument, the root of the app and second argument is afunction
// that determines what to return back
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// port to listen
// go to safari http://localhost:3000
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});