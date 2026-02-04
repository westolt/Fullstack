interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InputValues {
    targetValue: number;
    dailyValue: number[];
}

const validateArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetValue = Number(args[2]);
  const dailyValue = args.slice(3).map(arg => {
    const num = Number(arg);
    if (isNaN(num)) throw new Error('All daily values must be numbers!');
    return num;
  });

  if (isNaN(targetValue)) throw new Error('Target value must be a number!');

  return {
    targetValue: targetValue,
    dailyValue: dailyValue
  };
};

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
    const periodLength: number = dailyExerciseHours.length;
    const trainingDays: number = dailyExerciseHours.filter(d => d !== 0).length;
    const average: number = (dailyExerciseHours.reduce((a,b) => a + b)) / periodLength;
    const success: boolean = average >= target;
    const divided = average / target;
    let rating: number;
    let ratingDescription: string;

    if (divided >= 1) {
        rating = 3;
        ratingDescription = 'Good job!';
    } else if (divided >= 0.5) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'You need to try harder!';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
  const { targetValue, dailyValue } = validateArguments(process.argv);
  const result = calculateExercises(dailyValue, targetValue);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}