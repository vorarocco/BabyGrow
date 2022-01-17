const express= require('express')
const router =express.Router()
const Baby = require('../models/baby')
const Diaper = require('../models/diaper')
const User = require('../models/user')

router.get('/:id', async(req,res)=>{
    const baby = await Baby.findById(req.params.id).populate('parent')
    // console.log(baby)
    res.render('index',{findBaby:req.params.id})
})



module.exports = router