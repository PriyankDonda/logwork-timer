const router = require('express').Router();
const Time = require('../models/time');

router.post('/today', async (req, res) => {
    const today = await Time.findOne({date: req.body.date})
    // console.log(today)
    if(!today){
        const timer = new Time(req.body);
        try {
            await timer.save();
            res.status(201).send(timer);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else{
        res.send(today)
    }
})

// router.get('/today', async (req,res) => {
//     const tdate = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
//     const todaydata = Time.findOne({date: tdate})
//     // console.log(todaydata)
//     if(!todaydata){
//        res.send({message:'no today data!'})
//     }
//     else{
//         res.status(204).send()
//     }
// })

router.patch('/today', async (req, res) => {
    // console.log(req.body)
    const today = await Time.findOne({ date: req.body.date })
    // console.log(today)

    if (!today) {
        // console.log('creating')
        const timer = new Time(req.body);
        try {
            await timer.save();
            res.status(201).send(timer);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        // console.log('updating')
        try {
            today.total = req.body.total
            today.works = [...today.works, req.body.works]
            
            await today.save()

            // if (!today) {
            //     return res.status(404).send()
            // }
            res.send(today)
        } catch (e) {
            res.status(400).send(e)
        }
    }

})

router.patch('/today/:index', async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['work','time','total','date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const today = await Time.findOne({date: req.body.date})
        if(!today){
            return res.status(404).send()
        }
        
        today.works.forEach((work) => {
            if(work.index==req.params.index){
                // console.log('check')
                work.work = req.body.work
                work.time = req.body.time
            }
        })
        today.total = req.body.total

        await today.save()
        res.send(today)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/dashBoard', async (req, res) => {
    const data = await Time.find({})
    res.send(data)
})

module.exports = router