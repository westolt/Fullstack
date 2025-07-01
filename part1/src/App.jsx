const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.name} {props.count}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part name={props.part1} count={props.exercises1}/>
      <Part name={props.part2} count={props.exercises2}/>
      <Part name={props.part3} count={props.exercises3}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.count}</p>
    </div>
  )
}

const App = () => {
  console.log('App component is running')
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={parts[0].name} exercises1={parts[0].exercises}
        part2={parts[1].name} exercises2={parts[1].exercises}
        part3={parts[2].name} exercises3={parts[2].exercises}
      />
      <Total count={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App