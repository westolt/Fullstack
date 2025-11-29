const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  for (let i = 0; i < blogs.length; i++) {
    sum += blogs[i].likes
  }
  return sum
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let best = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > best) {
      best = blogs[i].likes
    }
  }
  return best
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}