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

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad, all, average }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average / all} />
      <StatisticLine text="positive" value ={(good / all) * 100 + ' %'} />
    </div>
  )
}


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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
    </div>
  )
}

export default App