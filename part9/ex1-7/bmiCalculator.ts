interface UserInput {
    heightValue: number;
    weightValue: number;
}

const validateInputs = (args: string[]): UserInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
        heightValue: Number(args[2]),
        weightValue: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
    }

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = (weight/(height)**2) * 10000
    if (bmi < 16) {
        return 'Severe Thinness'
    } else if (bmi >= 16 && bmi < 17) {
        return 'Moderate Thinness'
    } else if (bmi >= 17 && bmi < 18.5) {
        return 'Mild Thinness'
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal'
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight'
    } else if (bmi >= 30 && bmi < 35) {
        return 'Obese Class I'
    } else if (bmi >= 35 && bmi < 40) {
        return 'Obese Class II'
    } else if (bmi >= 40) {
        return 'Obese Class III'
    } else {
        throw new Error('Something is no working');
    }
}

try {
    const { weightValue, heightValue } = validateInputs(process.argv)
    const result = calculateBmi(heightValue, weightValue)
    console.log(result)
} catch (error:unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}