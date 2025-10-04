import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((blog) => (blog.id === updated.id ? updated : blog));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blogObject, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      if (newBlog) {
        dispatch(
          showNotification(
            `a new blog ${newBlog.title} by ${newBlog.author} added`,
            5,
          ),
        );
        dispatch(appendBlog({ ...newBlog, user }));
      }
    } catch (exception) {
      dispatch(showNotification("Error creating blog"));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      dispatch(updateBlog({ ...returnedBlog, user: blog.user }));
    } catch (error) {
      dispatch(showNotification("Error liking blog", 5));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const query = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!query) {
      return;
    }
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(showNotification(`Removed blog ${blog.title}`, 5));
    } catch (error) {
      dispatch(showNotification(`Error removing blog`, 5));
    }
  };
};

export default blogSlice.reducer;
