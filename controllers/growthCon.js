const express= require('express')
const res = require('express/lib/response')
const { render } = require('express/lib/response')
const router =express.Router()
const Growth = require('../models/growth')
const Baby = require('../models/baby')
const User = require('../models/user')


const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

console.log(Growth)

// Growth
router.get('/:id/growth',authRequired, async (req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const growths = await Growth.find({baby: req.params.id}) 
        res.render('growth/showGrowth',{growths,findBaby})
    
})

// new 1-2
router.get('/baby/:id/newgrowth', (req,res)=>{
    Baby.findById(req.params.id,(err,baby)=>{
        res.render('growth/newGrowth',{baby})
    })
})

// new 2-2
router.post('/baby/:id',(req,res)=>{
    req.body.baby = req.params.id
    Growth.create(req.body,(err,createGrowth)=>{
        res.redirect(`/growth/${req.params.id}/growth`)
    })
})

// Delete
router.delete('/:id/:growthId', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const growths = await Growth.findByIdAndRemove(req.params.growthId)
        res.redirect(`/growth/${findBaby._id}/growth`)
    
})

// Edit
router.put('/:id/:growthId', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const growths = await Growth.findByIdAndUpdate(req.params.growthId, req.body,{new:true})
        res.redirect(`/growth/${findBaby._id}/growth`)
})

router.get('/baby/:id/:growthId/editGrowth', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const growth = await Growth.findById(req.params.growthId)
        res.render('growth/editGrowth',{growth,findBaby})
    
})

module.exports = router