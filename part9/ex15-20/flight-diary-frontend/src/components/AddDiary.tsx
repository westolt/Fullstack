import { useState } from 'react';
import type { Diary } from '../types'
import diaryService from '../services/diaries'
import './AddDiary.css'

interface Props {
    diaries: Diary[]
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const AddDiary = ({ diaries, setDiaries } : Props ) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const diaryToAdd = {
            date,
            visibility,
            weather,
            comment
        }
        try {
            const returnedDiary = await diaryService.create(diaryToAdd);
            setDiaries(diaries.concat(returnedDiary));

            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
        } catch (error) {
            console.error("Failed to create diary", error);
        }
    }

    return(
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={diaryCreation} className='input-column'>
                <div className='input-row'>
                    <label>date</label>
                    <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div className='input-row'>
                    <label>visibility</label>
                    <input
                    value={visibility}
                    onChange={(event) => setVisibility(event.target.value)}
                    />
                </div>
                <div className='input-row'>
                    <label>weather</label>
                    <input
                    value={weather}
                    onChange={(event) => setWeather(event.target.value)}
                    />
                </div>
                <div className='input-row'>
                    <label>comment</label>
                    <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AddDiary