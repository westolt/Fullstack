import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick=
  {onClick}>{text}</button>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(good + 1 + neutral + bad)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(good + neutral + 1 + bad)
    setAverage(average + 0)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(good + neutral + bad + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <Header text='Give feedback'/>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header text='Statistics'/>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average / all}</p>
      <p>Positive: {(good / all) * 100} %</p>
    </div>
  )
}

export default App