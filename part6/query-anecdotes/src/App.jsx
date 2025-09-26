import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
    const updatedAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: () => {
        console.log('Anecdote updated successfully')
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      }
    })
  
    const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    })
    console.log(JSON.parse(JSON.stringify(result)))
  
    if ( result.isLoading ) {
      return <div>loading data...</div>
    }
    
    if ( result.isError ) {
      return <span>{'anecdote service is not available due to problems in server'}</span>
    }
  
    const anecdotes = result.data
  
    const handleVote = (anecdote) => {
      updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      

    </div>
  )
}

export default App
