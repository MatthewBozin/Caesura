const Poem = require('../models/Poem')

module.exports = {
    getPoems: async (req,res)=>{
        try{
            let poems = await Poem.find({userId:req.user.id})
            res.json({poems: poems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async (req,res)=>{
        try{
            let poems = await Poem.find()
            res.json({poems: poems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPoem: async (req, res)=>{
        try{
            let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            await Poem.create({poem: req.body.poem, userId: req.user.id, date: date})
            console.log('Poem has been added!')
        }catch(err){
            console.log(err)
        }
    },
    deletePoem: async (req, res)=>{
        console.log(req.body.poemIdFromJSFile)
        try{
            await Poem.findOneAndDelete({_id:req.body.poemIdFromJSFile})
            console.log('Deleted Poem')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    