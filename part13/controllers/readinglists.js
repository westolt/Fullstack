const router = require('express').Router()
const Readings = require('../models/readings')
const ActiveSession = require('../models/active_session')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const { user_id, blog_id } = req.body
  const reading = await Readings.create({
      user_id,
      blog_id,
    })
  res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const activeSession = await ActiveSession.findOne({
    where: { token: req.token }
  })

  if (!activeSession) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const userId = req.decodedToken.id
  const reading = await Readings.findByPk(req.params.id)

  if (reading.user_id !== userId) {
    return res.status(403).json({ error: 'wrong user id' })
  }

  reading.read = req.body.read
  await reading.save()
  res.json(reading)
})

module.exports = router