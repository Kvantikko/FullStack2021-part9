interface Values {
    height: number;
    weight: number;
}

const parseArgumentsBmi = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (height: number, weight: number): string => {
    if (height === 0 || weight === 0) throw new Error('Height and weight cannot be value 0');
    
    const bmi = (weight / height ** 2) * 10000;
    
    if (bmi < 16) {
        return 'Underweight (severe thinness)';
    } else if (bmi >= 16 && bmi < 17) {
        return 'Underweight (moderate thinness)';
    } else if (bmi >= 17 && bmi < 18.5) {
        return 'Underweight (mild thinness)';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight (pre-obese)';
    } else if (bmi >= 30 && bmi < 35) {
        return 'Obese (class I)';
    } else if (bmi >= 35 && bmi < 40) {
        return 'Obese (class II)';
    } else if (bmi >= 40) {
        return 'Obese (class III)';
    } else {
        throw new Error();
    }
};
/*
*   if block for preventing error message, when the script 'npm run dev' or 'npm start' is executed
*   i.e. only execute the try-catch block if the file is executed directly from commandline
*   otherwise 'not enough arguments' errormessage is always shown when the scripts are ran
*/
if (require.main === module) {
    try {
        const { height, weight } = parseArgumentsBmi(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateBmi;