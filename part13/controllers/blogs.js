const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const ActiveSession = require('../models/active_session')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where: {
      [Op.or]: [
        {
          title: { [Op.iLike]: `%${req.query.search ? req.query.search : ''}%` }
        },
        {
          author : { [Op.iLike]: `%${req.query.search ? req.query.search : ''}%` }
        }
      ]
    },
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const activeSession = await ActiveSession.findOne({
    where: { token: req.token }
  })

  if (!activeSession) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findByPk(req.decodedToken.id)
  const year = req.body.year
  if (year < 1991 || year > new Date().getFullYear()) {
    return res.status(400).json({
      error: 'The year must be between 1991 and current year'
    })
  }
  const blog = await Blog.create({ ...req.body,
    userId: user.id,
    date: new Date()
  })
  res.json(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

blogsRouter.get('/:id', blogFinder, async (req, res) => {
  const blog = await Blog.findByPk((req.blog.id), {
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const activeSession = await ActiveSession.findOne({
    where: { token: req.token }
  })

  if (!activeSession) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findByPk(req.decodedToken.id)
  const blogUserId = req.blog.userId
  if (user.id !== blogUserId) {
    return res.status(403).json({ error: 'only the creator can delete this blog' })
  }
  await req.blog.destroy()
  res.status(204).end()
})

blogsRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter