const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialUser = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    name: "Superuser",
    passwordHash,
  });
  await user.save();
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "xxx",
    url: "xxx",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const userToken = async (api, username, password) => {
  const loginUser = await api.post("/api/login").send({ username, password });

  return loginUser.body.token;
};

module.exports = {
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
  userToken,
};
