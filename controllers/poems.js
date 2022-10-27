const Poem = require('../models/Poem')
const PoemData = require('../models/PoemData')

module.exports = {
    getPoem: async (req,res)=>{
        try{
            let poem = await Poem.findById(req.body.id)
            res.json({poem: poem})
        }catch(err){
            console.log(err)
        }
    },
    getPoems: async (req,res)=>{
        try{
            let poems = await Poem.find({userId:req.user.id}).sort({ _id: "descending" })
            res.json({poems: poems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async (req,res)=>{
        try{
            let poems = await Poem.find().sort({ _id: "descending" })
            res.json({poems: poems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPoem: async (req, res)=>{
        try{
            let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            await Poem.create({
                lines: req.body.lines, authors: req.body.authors, title: req.body.title, userId: req.user.id, userName: req.user.userName, date: date, snaps: [], comments: 0
            })
            console.log('Poem has been added!')
            res.json('Poem has been added!')
        }catch(err){
            console.log(err)
        }
    },
    deletePoem: async (req, res)=>{
        try{
            await Poem.findOneAndDelete({_id: req.body._id})
            console.log('Deleted Poem')
            res.json('Deleted Poem')
        }catch(err){
            console.log(err)
        }
    },
    getPoemData: async (req,res)=>{
        try{
            let poemData = await PoemData.find()
            res.json({poemData: poemData})
        }catch(err){
            console.log(err)
        }
    },
    snap: async (req,res)=>{
        try{
            const found = await Poem.find({_id: req.body._id})
            let poem = found[0]
            if (poem.snaps.includes(req.user.id)) {
                poem.snaps = poem.snaps.filter(id => id !== req.user.id)
            } else {
                poem.snaps.push(req.user.id)
            }
            await poem.save()
            res.json({poem: poem})
        }catch(err){
            console.log(err)
        }
    },
}    