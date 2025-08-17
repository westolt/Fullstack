const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token;

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await helper.initialUser()
  
  token = await helper.userToken(api, 'root', 'sekret')

  const newBlog = {
    title: 'Hello friend!',
    author: 'Friend',
    url: 'www.friend.com',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogsAtStart.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('Hello friend!'))
})

test('a valid blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'A new blog!',
    author: 'test',
    url: 'test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length,
  blogsAtStart.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('A new blog!'))
})

test('if likes property missing, it will default to the value 0', async () => {
  
  const newBlog = {
    title: 'New test!',
    author: 'Friend',
    url: 'www.friend.com',
  }

  await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(b => b.title === 'New test!')
  assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title is not added', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    author: 'Friend',
    url: 'www.friend.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('blog without url is not added', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'Hello friend!',
    author: 'Friend',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const blogId = blogToView.id

  const resultBlog = await api
    .get(`/api/blogs/${blogId}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const formattedBlogToView = {
    ...blogToView,
    user: blogToView.user.toString()
  }

  assert.deepStrictEqual(resultBlog.body, formattedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 2

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ likes: blogToUpdate.likes })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const updatedBlog = blogsAtEnd.find(b => b.title === 'Hello friend!')
  assert.strictEqual(updatedBlog.likes, 2)
})

after(async () => {
  await mongoose.connection.close()
})