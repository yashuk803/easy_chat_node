
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
//set the template engine ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

app.engine('ejs', require('ejs-locals')); // layout partial block
app.set('views', __dirname + '/template');

/*app.set('view engine', 'ejs');*/


//routes
app.get('/chat', (req, res) => {
    res.render('chat')
});
app.get('/', (req, res) => {
    res.render('index')
});

//Listen on port 3000
server = app.listen(3000);

require('./socket/index')(server);

