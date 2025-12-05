const Blog = require('./blog')
const User = require('./user')
const Readings = require('./readings')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Readings })
User.belongsToMany(Blog, { through: Readings, as:
  'readingList' })

module.exports = {
  Blog, User, Readings
}