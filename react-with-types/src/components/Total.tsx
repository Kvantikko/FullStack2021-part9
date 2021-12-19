import React from 'react';
import { CoursePart } from '../App';

interface TotalProps {
    parts: CoursePart[];
}

const Total = (props: TotalProps) => {
    return(
        <div>
            Number of exercises{" "}
            {props.parts.reduce((sum, part) => sum + part.exerciseCount, 0)}
        </div>
    );
};

export default Total;