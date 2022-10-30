const express = require('express')
const router = express.Router()
const poemsController = require('../controllers/poems') 

router.get('/getPoem', poemsController.getPoem)

router.get('/getFeed', poemsController.getFeed)

router.post('/createPoem', poemsController.createPoem)

router.post('/deletePoem', poemsController.deletePoem)

router.get('/poemData/', poemsController.getPoemData)

router.put('/snap', poemsController.snap)

module.exports = router