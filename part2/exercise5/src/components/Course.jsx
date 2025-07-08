const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ parts }) => (
    <div>
      {parts.map(part =>
        <Part
        key={part.id}
        name={part.name}
        exercises={part.exercises}
        />
      )}
    </div>
  )

const Part = ({ name, exercises}) => (
    <p>{name} {exercises}</p>
)

const Total = ({ parts }) => (
    <div>
        <p><strong>total of {parts.reduce((sum, part) =>
        sum + part.exercises, 0
        )} exercises</strong></p>
    </div>
)

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course