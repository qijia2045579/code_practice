// Exciting, Now I am using Mac's VS studio to edit the NodeJS codes in my Ubuntu Server!
// Cool!

/////////////This is an example for how to use app and router
// app.js

// var express = require('express'),
//     dogs    = require('./routes/dogs'),
//     cats    = require('./routes/cats'),
//     birds   = require('./routes/birds');

// var app = express();

// app.use('/dogs',  dogs);
// app.use('/cats',  cats);
// app.use('/birds', birds);

// app.listen(3000);
// dogs.js

// var express = require('express');

// var router = express.Router();

// router.get('/', function(req, res) {
//     res.send('GET handler for /dogs route.');
// });

// router.post('/', function(req, res) {
//     res.send('POST handler for /dogs route.');
// });

// module.exports = router;
////////////////END

// OK, I need to make the first project to be alive! I will devote these days into it. No interruption.

const express = require('express')
const app = express();
var markdown_route = require('./routes/markdown')


// This will add the public resources into the static resources for the whole project
// app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('public'))

// We set the middleware pug to simplify the creating of views for html
app.set('view engine', 'pug')
app.set('views', './views2');



const bodyParser = require('body-parser');

// const cookieParser = require('cookie-parser');

// const session = require('session');

// app.use(
//   session({
//     secret: 'arbitary-string',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );

// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
app.use(bodyParser.json());

// To use cookieParser
// app.use(cookieParser());


// serve static files from the `public` folder
// app.use(express.static(__dirname + '/public'));



// Simple request time logger
app.use((req, res, next) => {
  var dt = new Date(Date.now())
  // console.log("A new request received at " + dt.toString());
  // console.log(req.method);

  // This function call tells that more processing is
  // required for the current request and is in the next middleware
  // function/route handler.
  next();  
});


app.get('/', (req, res) => {
    res.sendFile('/home/qisvr1/nodejs_markdown/htmls/main.html')
    // res.send('views/index')
  });

app.get('/index', (req, res) => {
  res.render('index', {
    title: 'Homepage--Index'
  })
});

app.use('/markdown',  markdown_route);

// app.get('/markdown', (req, res) => {
//   res.render('markdown')
// });
// app.get('/home', (req, res) => {
//   res.send('Home Page');
// });
app.get('/about', (req, res) => {
  res.send('About');
});

app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

const port = 3000

app.listen(port, () => {
console.log(`main app listening on port ${port}`)
})
  