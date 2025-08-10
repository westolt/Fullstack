const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is a test',
    author: 'Test guy',
    url: 'www.test.com',
    likes: 3,
  },
  {
    title: 'Another test',
    author: 'Test girl',
    url: 'www.testest.com',
    likes: 10,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    author: 'xxx',
    url: 'xxx',
    likes: 0
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}