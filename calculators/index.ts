import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
  
    if ( isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).json({ 
          error: 'malformatted parameters'
        });
    }
    
    try {
        res.json({
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        });
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            res.json(errorMessage);
        }
        console.log(errorMessage);
    }
});


app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.target || !req.body.daily_exercises) {
        res.status(400).json({ 
            error: 'parameters missing'
        });
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const target = Number(req.body.target);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        let dailyExercises: any = req.body.daily_exercises;
       
        if (typeof dailyExercises === 'string') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dailyExercises = JSON.parse(dailyExercises);
        }
        
        if (Array.isArray(dailyExercises)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            dailyExercises.forEach((n: any) => { const num: number = n; if (isNaN(num) || num < 0) throw new Error;});
        } else {
            throw new Error;
        }
         
        if ( isNaN(target) || target < 0 || dailyExercises.length < 1) {
            throw new Error;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const validatedDailyExercises: number[] = dailyExercises;

        res.json(calculateExercises(validatedDailyExercises, target));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ 
                error: 'malformatted parameters'
            });
        } else {
            res.json({ error: 'something bad happened'});
        }
    } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});