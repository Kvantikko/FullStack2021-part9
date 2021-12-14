import React from 'react';

interface CourseParts {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    parts: CourseParts[];
}

const Content = (props: ContentProps) => {
    return(
        <div>
            {props.parts.map(part => 
                <p key={part.name}> {part.name} {part.exerciseCount}</p> 
            )}
        </div>
    );
};

export default Content;