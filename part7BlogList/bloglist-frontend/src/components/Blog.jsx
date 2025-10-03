import { useState } from "react";
import blogService from "../services/blogs";
import "../app.css";

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      updateBlog({ ...returnedBlog, user: blog.user });
    } catch (error) {
      console.error("error liking blog", error);
    }
  };

  const handleRemoval = async () => {
    const query = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!query) {
      return;
    }
    try {
      await blogService.remove(blog.id);
      removeBlog(blog.id);
    } catch (error) {
      console.error("error removing blog", error);
    }
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
