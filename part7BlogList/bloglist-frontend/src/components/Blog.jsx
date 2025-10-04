import { useState } from "react";
import { useDispatch } from "react-redux";
import "../app.css";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemoval = async () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <button onClick={handleRemoval}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
