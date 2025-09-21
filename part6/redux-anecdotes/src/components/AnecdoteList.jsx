import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if ( filter === 'ALL' ) {
        return anecdotes
      }
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
    }
    const sorted_anecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    return(
        sorted_anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )
    )
}

export default AnecdoteList