require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', ()=>console.log('Connection to DB established'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false}))
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()})
app.use(express.static('uploads'))
app.set('view engine', 'ejs')

//route prefix
app.use("", require("./routes/routes"))

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started successfully on port ${port}`);
})