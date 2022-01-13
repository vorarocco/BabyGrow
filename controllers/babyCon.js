const express= require('express')
const router =express.Router()
const Baby = require('../models/baby')
const User = require('../models/user')

console.log(Baby)

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

// Baby
router.get('/',authRequired, async (req,res)=>{
    console.log(req.session.userId)
    const findBaby = await Baby.find({parent: req.session.userId}).populate('parent')
    // Baby.find({parent: req.session.userId},(req,babys)=>{
        console.log(findBaby)
        res.render('babyProfile/showBaby',{findBaby})
    // })
})

// new1-2 Get New Route
router.get('/newprofile',authRequired,(req,res,next) => {
    Baby.findById(req.params.id)
    .populate('user')
    .then(()=> 
    res.render('babyProfile/newBaby'))
    .catch(next)
})

// new2-2 Post Route
router.post('/' , async (req,res,next)=>{
    try{
        const currentUser = await User.findById(req.session.userId)

        const createBaby = ({
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            name: req.body.name,
            parent: currentUser
        })

        if (req.session.loggedIn === true){
            const newBaby = await Baby.create(createBaby)
            console.log(newBaby)
            res.redirect('/babyprofile')
            // res.json({
            //     data: newBaby,
            //     message: `Post has been added`
            // })
        }
        else {
            res.json({
                message: `Please log in first to add post`
            })
        }
    }
    catch(err){
        next(err)
    }
  
    // Baby.create(createBaby, (err, createdBaby)=>{
    //     console.log(createdBaby)
    //     res.redirect('/babyprofile')
    // })
})

// Edit
router.put('/:id', (req,res)=>{
    Baby.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err,updateBaby)=>{
        console.log(updateBaby)
        res.redirect('/babyprofile')
    })
})

router.get('/:id/editBaby',(req,res)=>{
    Baby.findById(req.params.id, (err, baby)=>{
        res.render('babyProfile/editBaby',{baby})
    })
})

// Delete
router.delete('/:id',(req,res)=>{
    Baby.findByIdAndRemove(req.params.id, (err,deleteBaby)=>{
        res.redirect('/babyprofile')
    }) 
})

module.exports = router