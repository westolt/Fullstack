import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick=
  {onClick}>{text}</button>

const Anecdote = ({votes, text}) => {
  return(
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log(votes)

  const mostVotes = votes.indexOf(Math.max(...votes))

  const handleAnecdote = () => {
    const randomIndex = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVotes = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <Anecdote votes={votes[selected]} text={anecdotes[selected]} />
      <Button onClick={handleVotes} text='vote' />
      <Button onClick={handleAnecdote} text='Next anecdote'/>
      <Header text={'Anecdote with most votes'} />
      <Anecdote votes={votes[mostVotes]} text={anecdotes[mostVotes]} />
    </div>
  )
}

export default App