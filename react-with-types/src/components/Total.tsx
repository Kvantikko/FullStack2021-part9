import React from 'react';

interface CourseParts {
    name: string;
    exerciseCount: number;
}

interface TotalProps {
    parts: CourseParts[];
}

const Total = (props: TotalProps) => {
    return(
        <div>
            Number of exercises{" "}
            {props.parts.reduce((sum, part) => sum + part.exerciseCount, 0)}
        </div>
    )
};

export default Total;