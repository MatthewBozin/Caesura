import Poem from '../models/Poem'
import PoemData from '../models/PoemData'

module.exports = {
    getPoem: async (req: any, res: any) => {
        try {
            let poem = await Poem.findById(req.body.id)
            res.json({ poem: poem })
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req: any, res: any) => {
        try {
            let poems = await Poem.find().sort({ _id: "descending" })
            res.json({ poems: poems, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    createPoem: async (req: any, res: any) => {
        try {
            let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            await Poem.create({
                lines: req.body.lines, authors: req.body.authors, title: req.body.title, userId: req.user.id, userName: req.user.userName, date: date, snaps: [], comments: 0
            })
            console.log('Poem has been added!')
            res.json('Poem has been added!')
        } catch (err) {
            console.log(err)
        }
    },
    deletePoem: async (req: any, res: any) => {
        try {
            await Poem.findOneAndDelete({ _id: req.body._id })
            console.log('Deleted Poem')
            res.json('Deleted Poem')
        } catch (err) {
            console.log(err)
        }
    },
    getPoemData: async (req: any, res: any) => {
        try {
            let poemData = await PoemData.find()
            res.json({ poemData: poemData })
        } catch (err) {
            console.log(err)
        }
    },
    snap: async (req: any, res: any) => {
        try {
            const found = await Poem.find({ _id: req.body._id })
            let poem = found[0]
            if (poem.snaps.includes(req.user.id)) {
                poem.snaps = poem.snaps.filter((id: string) => id !== req.user.id)
            } else {
                poem.snaps.push(req.user.id)
            }
            await poem.save()
            res.json({ poem: poem })
        } catch (err) {
            console.log(err)
        }
    },
}    