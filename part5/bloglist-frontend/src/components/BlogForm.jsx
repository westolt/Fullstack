import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
    return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div className="title">
            title: <input
            value={newTitle}
            onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="author">
            author: <input
            value={newAuthor}
            onChange={event => setAuthor(event.target.value)}
            />
          </div>
          <div className="url">
            url: <input
            value={newUrl}
            onChange={event => setUrl(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
    )
}

export default BlogForm