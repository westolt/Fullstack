const router = require('express').Router()

const ActiveSession = require('../models/active_session')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const token = req.token

  const session = await ActiveSession.findOne({
    where: { token }
  })

  if (!session) {
    return res.status(401).json({ error: 'session not found or already logged out' })
  }

  await ActiveSession.destroy({
    where: { id: session.id }
  })

  res.status(204).end()
})

module.exports = router