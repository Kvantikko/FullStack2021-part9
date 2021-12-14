import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

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
    const target = Number(req.body.target);
    let dailyExercises;
    
    try {
        dailyExercises = JSON.parse(req.body.daily_exercises);
    } catch (error) {
        res.status(400).json({ 
            error: 'malformatted parameters'
        });
    }
    
    
    console.log(req.body.daily_exercises);
    console.log(typeof target);
    console.log(typeof dailyExercises);
    

    if ( isNaN(target) || target < 0 || dailyExercises.length < 1) {
        res.status(400).json({ 
          error: 'malformatted parameters'
        });
    }

    for (let i = 0; i < dailyExercises.length; i++) {
        if (isNaN(Number(dailyExercises[i]))) {
            res.status(400).json({ 
                error: 'malformatted parameters'
            });
        } 
    }

    res.json(calculateExercises(dailyExercises, target))
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});