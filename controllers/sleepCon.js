const express= require('express')
const router =express.Router()
const Sleep = require('../models/sleep')
const Baby = require('../models/baby')
const User = require('../models/user')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

console.log(Sleep)

// Sleep
router.get('/:id/sleep',authRequired,async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const sleeps = await Sleep.find({baby: req.params.id})
        res.render('sleep/showSleep',{sleeps,findBaby})
})

// new1-2
router.get('/baby/:id/newsleep',(req,res)=>{
    Baby.findById(req.params.id,(err,baby)=>{
        res.render('sleep/newSleep',{baby})
    })
})

// new2-2
router.post('/baby/:id' , (req,res)=>{
    req.body.baby = req.params.id
    Sleep.create(req.body, (err, createSleep)=>{
        res.redirect(`/sleep/${req.params.id}/sleep`)
    })
})

// Delete
router.delete('/:id/:sleepId', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const sleeps = await Sleep.findByIdAndDelete(req.params.sleepId)
        res.redirect(`/sleep/${findBaby._id}/sleep`)
})


// Edit
router.put('/:id/:sleepId', async(req,res)=>{
    const findBaby= await Baby.findById(req.params.id)
    const sleeps = await Sleep.findByIdAndUpdate(req.params.sleepId, req.body,{new:true})
        res.redirect(`/sleep/${findBaby._id}/sleep`)
    
})

router.get('/baby/:id/:sleepId/editSleep', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const sleep = await Sleep.findById(req.params.sleepId)
        res.render('sleep/editSleep',{sleep,findBaby})
    
})





module.exports = router


