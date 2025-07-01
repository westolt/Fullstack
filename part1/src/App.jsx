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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 =  {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}
      />
      <Total count={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App