import Part from './Part'
import type { CoursePart } from '../Types';

interface ContentProps {
    parts: CoursePart[];
}

const Content = ({ parts }: ContentProps ) => {
  
    return(
        <div>
            {parts.map(p => (
                <Part key={p.name} part={p} />
            ))}
        </div>
    )
}

export default Content