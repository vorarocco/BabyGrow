const express= require('express')
const router =express.Router()
const Feed = require('../models/feed')
const Baby = require('../models/baby')
const User = require('../models/user')
const req = require('express/lib/request')


const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

console.log(Feed)

// Feed
router.get('/:id/feed',authRequired, async (req,res)=>{
    const findBaby = await Baby.findById(req.params.id)
    const feeds = await Feed.find({baby: req.params.id})
    res.render('feed/showFeed',{feeds,findBaby})
})

// Nav Bar still not work
// router.get('/', async(req,res)=>{
//     const findBaby = await Baby.find({parent: req.session.userId}).populate('parent')
//     console.log(findBaby)
//     res.render('feed/showFeed',{findBaby,feeds:req.params})
// })

// new1-2
router.get('/baby/:id/newfeed', (req,res)=>{
    Baby.findById(req.params.id,(err,baby)=>{
        res.render('feed/newFeed',{baby})
    })
})

// new2-2
router.post('/baby/:id', (req,res)=>{
    req.body.baby = req.params.id
    Feed.create(req.body, (err, createFeed)=>{
      res.redirect(`/feed/${req.params.id}/feed`)
    })
})

// Delete
router.delete('/:id/:feedId', async(req,res)=>{
    const findBaby= await Baby.findById(req.params.id)
    const feeds = await Feed.findByIdAndDelete(req.params.feedId)
        res.redirect(`/feed/${findBaby._id}/feed`)
})

// Edit
router.put('/:id/:feedId', async(req,res)=>{
    const findBaby= await Baby.findById(req.params.id)
    const feeds = await Feed.findByIdAndUpdate(req.params.feedId, req.body,{new:true})
        res.redirect(`/feed/${findBaby._id}/feed`)
})

router.get('/baby/:id/:feedId/editFeed', async(req,res)=>{
    const findBaby= await Baby.findById(req.params.id)
    const feed = await Feed.findById(req.params.feedId)
        res.render('feed/editFeed',{feed,findBaby})
})

module.exports = router
