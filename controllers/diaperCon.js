const express= require('express')
const router =express.Router()
const Diaper = require('../models/diaper')
// const feedSeeds = require('../db/seeds.json')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session/login')
    }
}

console.log(Diaper)

// Diaper
router.get('/',authRequired,(req,res)=>{
    Diaper.find({},(req,diapers)=>{
        res.render('diaper/showDiaper',{diapers})
    })
})

// new1-2
router.get('/newdiaper',(req,res)=>{
    res.render('diaper/newDiaper')
})

// new2-2
router.post('/' , (req,res)=>{
    Diaper.create(req.body, (err, createDiaper)=>{
        res.redirect('/diaper')
    })
})

// Edit
router.put('/:id', (req,res)=>{
    Diaper.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err,updateDiaper)=>{
        console.log(updateDiaper)
        res.redirect('/diaper')
    })
})

router.get('/:id/editDiaper',(req,res)=>{
    Diaper.findById(req.params.id, (err, diaper)=>{
        res.render('diaper/editDiaper',{diaper})
    })
})

// Delete
router.delete('/:id',(req,res)=>{
    Diaper.findByIdAndRemove(req.params.id, (err,deleteFeed)=>{
        res.redirect('/diaper')
    }) 
})

module.exports = router

