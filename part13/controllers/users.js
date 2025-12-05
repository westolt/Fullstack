const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  let readingFilter = {}

  if (req.query.read === 'true') {
    readingFilter.read = true
  } else if (req.query.read === 'false') {
    readingFilter.read = false
  }

  const user = await User.findByPk((req.params.id), {
    attributes: ['name', 'username'],
    include: [
    {
      model: Blog,
      as: 'readingList',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
      through: {
        attributes: ['id', 'read'],
        where: readingFilter
      }
    }
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router