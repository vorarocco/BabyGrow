const express= require('express')
const router =express.Router()
const Sleep = require('../models/sleep')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session/login')
    }
}

console.log(Sleep)

// Sleep
router.get('/',authRequired,(req,res)=>{
    Sleep.find({},(req,sleeps)=>{
        res.render('sleep/showSleep',{sleeps})
    })
})

// new1-2
router.get('/newsleep',(req,res)=>{
    res.render('sleep/newSleep')
})

// new2-2
router.post('/' , (req,res)=>{
    console.log(req.body)
    Sleep.create(req.body, (err, createSleep)=>{
        res.redirect('/sleep')
    })
})

// Edit
router.put('/:id', (req,res)=>{
    Sleep.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err,updateSleep)=>{
        console.log(updateSleep)
        res.redirect('/sleep')
    })
})

router.get('/:id/editSleep',(req,res)=>{
    Sleep.findById(req.params.id, (err, sleep)=>{
        res.render('sleep/editSleep',{sleep})
    })
})


// Delete
router.delete('/:id',(req,res)=>{
    Sleep.findByIdAndRemove(req.params.id, (err,deleteSleep)=>{
        res.redirect('/sleep')
    }) 
})


module.exports = router


