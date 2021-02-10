var express = require('express')
var Restaurant = require('../models/restaurants')

var router = express.Router()

router.get('/', async (req, res) => {
    let Restaurants = await Restaurant.find({}) 
    console.log("/",req.params.id)
    res.json(Restaurants)
})


router.get('/:id', async (req, res) => {
    let restaurant = await Restaurant.findOne({_id: req.params.id})
    console.log(req.params.id)
    res.json(restaurant)
})

router.post('/',  async (req, res) => {
    let restaurant = new Restaurant({
        name: req.body.name,
        location: {
            type : "Point",
            coordinates : 
            [ 
                req.body.x, 
                req.body.y
            ],
        }
    });
    res.send(restaurant) 
    restaurant.save()
})

router.put('/:id',async(req, res) => {
    let restaurant = await Restaurant.findOneAndUpdate({_id: req.params.id}, {$set:{name:req.body.name,location:{type : "Point",coordinates : [ req.body.x, req.body.y],}}},{new: true, useFindAndModify: false})
    restaurant.save();
    res.json(restaurant)
})


router.delete('/:id', async (req, res) => {
    let restaurant = await Restaurant.findOneAndDelete({_id: req.params.id})
    console.log("test")
    res.json(restaurant)
})

module.exports = router