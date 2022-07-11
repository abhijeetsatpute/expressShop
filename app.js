const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/add',(req,res,next) => {
    res.send(
        `<form action="/product" method="post">
            <input type='text' name="title"></input>
            <button type="submit">add</button>
        </form>`
    );
})

app.post('/product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req,res,next) => {
    res.send('<h1>Home middleware</h1>')
})

app.listen(3000)