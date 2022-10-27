const express = require('express')
const router = express.Router()
const poemsController = require('../controllers/poems') 
const { ensureAuth } = require('../middleware/auth')

//ensureAuth is the login check step
router.get('/', ensureAuth, poemsController.getPoems)

router.get('/getPoem', poemsController.getPoem)

router.get('/getFeed', poemsController.getFeed)

router.post('/createPoem', poemsController.createPoem)

router.post('/deletePoem', poemsController.deletePoem)

router.get('/poemData/', poemsController.getPoemData)

router.put('/snap', poemsController.snap)

module.exports = router