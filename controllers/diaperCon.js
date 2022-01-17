const express= require('express')
const router =express.Router()
const Diaper = require('../models/diaper')
const Baby = require('../models/baby')
// const feedSeeds = require('../db/seeds.json')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

console.log(Diaper)

// Diaper
router.get('/:id/diaper',authRequired, async (req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const diapers = await Diaper.find({baby: req.params.id})
    res.render('diaper/showDiaper',{diapers,findBaby})
})

// new1-2
router.get('/baby/:id/newdiaper',(req,res)=>{
    Baby.findById(req.params.id,(err,baby)=>{
        res.render('diaper/newDiaper',{baby})
    })
})

// new2-2
router.post('/baby/:id', (req,res)=>{
    req.body.baby = req.params.id
    Diaper.create(req.body, (err, createDiaper)=>{
        res.redirect(`/diaper/${req.params.id}/diaper`)
    })
})

// Delete
router.delete('/:id/:diaperId', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const diapers = await Diaper.findByIdAndRemove(req.params.diaperId)
        res.redirect(`/diaper/${findBaby._id}/diaper`)
})

// Edit
router.put('/:id/:diaperId', async(req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const diapers = await Diaper.findByIdAndUpdate(req.params.diaperId, req.body,{new:true})
        res.redirect(`/diaper/${findBaby._id}/diaper`)
})

router.get('/baby/:id/:diaperId/editDiaper', async(req,res)=>{
    const findBaby= await Baby.findById(req.params.id)
    const diaper = await Diaper.findById(req.params.diaperId)
        res.render('diaper/editDiaper',{diaper,findBaby})
    
})



module.exports = router

