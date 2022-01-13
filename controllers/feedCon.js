const express= require('express')
const router =express.Router()
const Feed = require('../models/feed')

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session/login')
    }
}

console.log(Feed)

// Feed
router.get('/',authRequired, (req,res)=>{
    Feed.find({},(req,feeds)=>{
        res.render('feed/showFeed',{feeds})
    })
})

// new1-2
router.get('/newfeed', (req,res)=>{
    res.render('feed/newFeed')
})

// new2-2
router.post('/', (req,res)=>{
    Feed.create(req.body, (err, createFeed)=>{
      res.redirect('/feed')
    })
})

// Edit
router.put('/:id', (req,res)=>{
    Feed.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err,updateFeed)=>{
        console.log(updateFeed)
        res.redirect('/feed')
    })
})

router.get('/:id/editFeed',(req,res)=>{
    Feed.findById(req.params.id, (err, feed)=>{
        res.render('feed/editFeed',{feed})
    })
})

// Delete
router.delete('/:id',(req,res)=>{
    Feed.findByIdAndRemove(req.params.id, (err,deleteFeed)=>{
        res.redirect('/feed')
    }) 
})



module.exports = router