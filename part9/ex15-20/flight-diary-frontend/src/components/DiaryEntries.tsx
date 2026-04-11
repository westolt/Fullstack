import type { Diary } from "../types"
import './DiaryEntries.css'

interface Props {
    diaries: Diary[]
}

const DiaryEntries = ({ diaries }: Props) => {
    return(
        <div>
            <h2>Diary entries</h2>
            <div className="diary-set">
                {diaries.map((diary: Diary) => (
                    <div className="diary-column" key={diary.date}>
                        <strong>{diary.date}</strong>
                        <div className="info">
                            <a>visibility: {diary.visibility}</a>
                            <a>weather: {diary.weather}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DiaryEntries