import Poem from '../models/Poem'
import Comment from '../models/Comment'

module.exports = {
    createComment: async (req: any, res: any) => {
        try {
            let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            await Comment.create({
                lines: req.body.lines, authors: req.body.authors, userId: req.user.id, userName: req.user.userName, date: date, snaps: [], poem: req.body.poem
            })
            const found = await Poem.find({ _id: req.body.poem })
            let poem = found[0]
            poem.comments += 1
            await poem.save()
            console.log('Comment has been added!')
            res.json('Comment has been added!')
        } catch (err) {
            console.log(err)
        }
    },
    getComments: async (req: any, res: any) => {
        try {
            let comments = await Comment.find({ poem: req.body._id })
            res.json({ comments: comments })
        } catch (err) {
            console.log(err)
        }
    },
    snapComment: async (req: any, res: any) => {
        try {
            const found = await Comment.find({ _id: req.body._id })
            let comment = found[0]
            if (comment.snaps.includes(req.user.id)) {
                comment.snaps = comment.snaps.filter((id: any) => id !== req.user.id)
            } else {
                comment.snaps.push(req.user.id)
            }
            await comment.save()
            res.json({ comment: comment })
        } catch (err) {
            console.log(err)
        }
    },
    deleteComment: async (req: any, res: any) => {
        try {
            const found = await Poem.find({ _id: req.body.poem })
            let poem = found[0]
            poem.comments -= 1
            await poem.save()
            await Comment.findOneAndDelete({ _id: req.body._id })
            console.log('Deleted Comment')
            res.json('Deleted Comment')
        } catch (err) {
            console.log(err)
        }
    },
};