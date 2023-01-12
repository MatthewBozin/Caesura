import { Router } from 'express'
import poemsController from '../controllers/poems'
const router = Router()

router.get('/getPoem', poemsController.getPoem)

router.get('/getFeed', poemsController.getFeed)

router.post('/createPoem', poemsController.createPoem)

router.post('/deletePoem', poemsController.deletePoem)

router.get('/poemData/', poemsController.getPoemData)

router.put('/snap', poemsController.snap)

export default router