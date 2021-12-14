interface trainingData {
    trainingDays: Array<number>;
    target: number;
  }

const parseArgumentsV2 = (args: Array<string>): trainingData => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (isNaN(Number(args[2]))) throw new Error('Provided values were not numbers!');

    const trainingDays: Array<number> = [];
    for (let i = 0; i < args.length - 3; i++) {
        if (!isNaN(Number(args[3 + i]))) {
            trainingDays[i] = Number(args[3 + i]);
        } else {
            throw new Error('Provided values were not numbers!');
      }
    }

    return {
        target: Number(args[2]),
        trainingDays: trainingDays
    };
};

interface calculationResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const rate = (target: number, average: number): number  => {
    if (target / average < 1) {
        return 3;
    } else if (target / average > 1 && target / average <= 2) {
        return 2;
    } else {
        return 1;
    }
};

const giveRatingDescription = (rating: number): string => {
    if (rating === 3) {
        return 'you are godly';
    } else if (rating === 2) {
        return 'not too bad but could be better';
    } else {
        return 'you suck, better luck next time';
    }
};

export const calculateExercises = (hours: Array<number>, target: number): calculationResult => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((sum: number, hours: number) => sum + hours, 0) / periodLength;
    const dailyTarget = target;
    const success = average >= target ? true : false;
    const rating = rate(target, average);
    const ratingDescription = giveRatingDescription(rating);

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: dailyTarget,
        average: average
    };
};

try {
    const { trainingDays, target } = parseArgumentsV2(process.argv);
    console.log(calculateExercises(trainingDays, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}