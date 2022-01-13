require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const app = express()
// const PORT = 8000

// app.use(cors())


const { PORT, SESSION_SECRET } = process.env
const mongoose = require('mongoose')

const methodOverride = require('method-override')
const expressEjsLayout = require ('express-ejs-layouts')

const session = require('express-session')

const sessionsController = require('./controllers/sessions')
const eventsController = require('./controllers/events')
const feedCon = require('./controllers/feedCon')
const sleepCon = require('./controllers/sleepCon')
const diaperCon = require('./controllers/diaperCon')
const growthCon = require('./controllers/growthCon')
const babyCon = require('./controllers/babyCon')
// const userCon = require('./controllers/userCon')

app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(expressEjsLayout)
app.set('view engine','ejs')

// session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
}))

app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    res.locals.userId =req.session.userId
    next()
})



const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session/login')
    }
}

app.use('/babyprofile',babyCon)
app.use('/baby',eventsController)
app.use('/feed',feedCon)
app.use('/sleep',sleepCon)
app.use('/diaper',diaperCon)
app.use('/growth',growthCon)
app.use('/session', sessionsController)
// app.use('/user',userCon)


// Cookie
app.get('/setCookie/:data', (req, res) => {
    req.session.data = req.params.data
    res.send('session data set')
})

app.get('/getSessionInfo', (req, res) => {
    res.send(req.session.data)
})

app.get('/home', (req, res)=>{
    res.render('home')
})

app.listen (PORT,(req,res)=>{
    console.log(`Go to port ${PORT}`);
})