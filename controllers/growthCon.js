const express= require('express')
const res = require('express/lib/response')
const { render } = require('express/lib/response')
const router =express.Router()
const Growth = require('../models/growth')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session/login')
    }
}

console.log(Growth)

// Growth
router.get('/',authRequired,(req,res)=>{
    Growth.find({},(req,growths)=>{
        res.render('growth/showGrowth',{growths})
    })
})

// new 2-1
router.get('/newgrowth', (req,res)=>{
    res.render('growth/newGrowth')
})

// new 2-2
router.post('/',(req,res)=>{
    Growth.create(req.body,(err,createGrowth)=>{
        res.redirect('/growth')
    })
})

// Delete
router.delete('/:id',(req,res)=>{
    Growth.findByIdAndRemove(req.params.id , (err,deleteGrowth)=>{
        res.redirect('/growth')
    })
})

// Edit
router.put('/:id' , (req,res)=>{
    Growth.findByIdAndUpdate(req.params.id, req.body,{new:true},(err,updateGrowth)=>{
        res.redirect('/growth')
    })
})

router.get('/:id/editGrowth',(req,res)=>{
    Growth.findById(req.params.id,(err,growth)=>{
        res.render('growth/editGrowth',{growth})
    })
})

module.exports = router