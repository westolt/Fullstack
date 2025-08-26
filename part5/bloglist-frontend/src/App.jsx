import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON =
    window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const addBlog = async (blogObject) => {
    try{
      const newBlog = await blogService.create(blogObject)
    if (newBlog) {
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setType('add')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
      setBlogVisible(false)
    }
    } catch (exception) {
      setMessage('error creating blog')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogVisible(true)}>create new blog</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm createBlog={addBlog}/>
              <button onClick={() =>
                setBlogVisible(false)}>cancel</button>
          </div>
        </div>
      )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={type} />
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type} />
      {user && <div>
       <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      </div>
      }
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App