import { useState, useEffect } from 'react';
import AddDiary from "./components/AddDiary"
import DiaryEntries from "./components/DiaryEntries"
import type { Diary } from "./types";
import diaryService from './services/diaries'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    fetchDiaryList();
  }, []);

  return (
    <div>
      <AddDiary diaries={diaries} setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </div>
  )
}

export default App
