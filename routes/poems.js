const express = require('express')
const router = express.Router()
const poemsController = require('../controllers/poems') 
const { ensureAuth } = require('../middleware/auth')

//ensureAuth is the login check step
router.get('/', ensureAuth, poemsController.getPoems)

router.post('/createPoem', poemsController.createPoem)

router.put('/markComplete', poemsController.markComplete)

router.put('/markIncomplete', poemsController.markIncomplete)

router.delete('/deletePoem', poemsController.deletePoem)

module.exports = router