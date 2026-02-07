import type { CoursePart } from '../Types'

interface PartProps {
    part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated course part: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps ) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div>{part.description}</div>
          </div>
        )
      case "group":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div>project exercises {part.groupProjectCount}</div>
          </div>
        )
      case "background":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div>{part.description}</div>
            <div>submit to {part.backgroundMaterial}</div>
          </div>
        )
      case "special":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div>{part.description}</div>
            <div>required skills: {part.requirements.join(", ")}
            </div>
          </div>
        )
      default:
        return assertNever(part)
        break
    }
}

export default Part