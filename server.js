const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const config = require('./config')
const jwt = require('jsonwebtoken');
const Controller = require('./controllers/controller')
var cookieParser = require('cookie-parser');

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());


var checkAuth = (req, res, next) => {
    console.log("Authenticating");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);

app.use('/', Controller)

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('*', (req, res) => {
    res.status(404).send("This Page Doesn't Exist")
})

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})