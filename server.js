
let session = require('express-session');
let express = require('express');
let app = express();
let bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret: 'tata',
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    if ("count" in req.session) {
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    return  res.render("index", { session: req.session })
})

app.get("/two", (req, res)=>{
    if ('two' in req.session) {
        req.session.count += 1;
        return res.redirect("/");
    }

});
app.get('/reset', (req, res) => {
    req.session.count = 0;
    return res.redirect('/');
});

app.listen(8000, () => {
    console.log("Running on port 8000 .....");
});