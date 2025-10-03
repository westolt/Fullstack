import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import "./app.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogVisible, setBlogVisible] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotification(`wrong username or password`, 5))
    }
    console.log("logging in with", username, password);
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      if (newBlog) {
        dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5));
        setBlogs(blogs.concat({ ...newBlog, user }));
        setBlogVisible(false);
      }
    } catch (exception) {
      dispatch(showNotification("error creating blog"));
    }
  };

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? "none" : "" };
    const showWhenVisible = { display: blogVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  const handleBlogUpdate = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const handleBlogRemoval = (removedBlogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== removedBlogId));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const order = (a, b) => {
    return b.likes - a.likes;
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user && (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      {blogForm()}
      {blogs.length === 0 ? (
        <p>no blogs</p>
      ) : (
        [...blogs]
          .sort(order)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={handleBlogUpdate}
              removeBlog={handleBlogRemoval}
            />
          ))
      )}
    </div>
  );
};

export default App;
