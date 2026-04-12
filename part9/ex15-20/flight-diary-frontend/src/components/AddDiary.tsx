import { useState } from 'react';
import axios from 'axios';
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            if (axios.isAxiosError(error)) {
                const message = error.response?.data;
                setErrorMessage(message);

                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);

            } else {
                setErrorMessage("Unexpected error");

                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);
            }
        }
    }

    return(
        <div>
            <h2>Add new entry</h2>
            <div className="error">
                {errorMessage}
            </div>
            <form onSubmit={diaryCreation} className='input-column'>
                <div className='input-row'>
                    <label>date</label>
                    <input
                    type='date'
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div className='input-row'>
                    <label>visibility</label>
                    <div>
                        <input type='radio' name='visibility' value='great' checked={visibility === 'great'} onChange={(event) => setVisibility(event.target.value)} />
                        <label>great</label>
                    </div>
                    <div>
                        <input type='radio' name='visibility' value='good' checked={visibility === 'good'} onChange={(event) => setVisibility(event.target.value)} />
                        <label>good</label>
                    </div>
                    <div>
                        <input type='radio' name='visibility' value='ok' checked={visibility === 'ok'} onChange={(event) => setVisibility(event.target.value)} />
                        <label>ok</label>
                    </div>
                    <div>
                        <input type='radio' name='visibility' value='poor' checked={visibility === 'poor'} onChange={(event) => setVisibility(event.target.value)} />
                        <label>poor</label>
                    </div>
                </div>
                <div className='input-row'>
                    <label>weather</label>
                    <div>
                        <input type='radio' name='weather' value='sunny' checked={weather === 'sunny'} onChange={(event) => setWeather(event.target.value)} />
                        <label>sunny</label>
                    </div>
                    <div>
                        <input type='radio' name='weather' value='rainy' checked={weather === 'rainy'} onChange={(event) => setWeather(event.target.value)} />
                        <label>rainy</label>
                    </div>
                    <div>
                        <input type='radio' name='weather' value='cloudy' checked={weather === 'cloudy'} onChange={(event) => setWeather(event.target.value)} />
                        <label>cloudy</label>
                    </div>
                    <div>
                        <input type='radio' name='weather' value='stormy' checked={weather === 'stormy'} onChange={(event) => setWeather(event.target.value)} />
                        <label>stormy</label>
                    </div>
                    <div>
                        <input type='radio' name='weather' value='windy' checked={weather === 'windy'} onChange={(event) => setWeather(event.target.value)} />
                        <label>windy</label>
                    </div>
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