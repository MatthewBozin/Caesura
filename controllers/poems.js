const Poem = require('../models/Poem')

module.exports = {
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
                lines: req.body.lines, authors: req.body.authors, userId: req.user.id, userName: req.user.userName, date: date
            })
            console.log('Poem has been added!')
        }catch(err){
            console.log(err)
        }
    },
    deletePoem: async (req, res)=>{
        try{
            await Poem.findOneAndDelete({_id: req.body._id})
            console.log('Deleted Poem')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    