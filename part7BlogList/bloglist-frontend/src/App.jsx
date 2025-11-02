import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, initializeBlogs } from "./reducers/blogReducer";
import { initializeLogin, login, logout } from "./reducers/loginReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import "./app.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.login);
  const [blogVisible, setBlogVisible] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeLogin());
  }, []);

  const handleAddBlog = (blogObject) => {
    dispatch(addBlog(blogObject, user));
    setBlogVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };

  const order = (a, b) => {
    return b.likes - a.likes;
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
          <BlogForm createBlog={handleAddBlog} />
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

  return (
    <div className="container">
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
          .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
      )}
    </div>
  );
};

export default App;
