import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }

    const bmi = calculateBmi(height, weight);

    res.json({height, weight, bmi});
});

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {

    const body = req.body as ExerciseRequest;

    const { daily_exercises, target } = body;

    if (!daily_exercises || target === undefined) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (
        !Array.isArray(daily_exercises) ||
        isNaN(Number(target)) ||
        daily_exercises.some(d => isNaN(Number(d)))
    ) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(daily_exercises, target);

    return res.json({ result });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});