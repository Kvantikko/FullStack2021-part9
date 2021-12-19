import React from 'react';
import { CoursePart } from '../App';

interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch(props.part.type) {
        case "normal":
            return(
                <div>
                    <b>{props.part.name} {props.part.exerciseCount}</b>
                    <br></br>
                    <i>{props.part.description}</i>
                    <p></p>
                </div>
            );
        case "groupProject":
            return(
                <div>
                    <b>{props.part.name} {props.part.exerciseCount}</b>
                    <br></br>
                    <div>project exercises {props.part.groupProjectCount} </div>
                    <p></p>
                </div>
            );
        case "submission":
            return(
                <div>
                    <b>{props.part.name} {props.part.exerciseCount}</b>
                    <br></br>
                    <i>{props.part.description}</i>
                    <div>submit to {props.part.exerciseSubmissionLink}</div>
                    <p></p>
                </div>
            );
        case "special":
            return(
                <div>
                    <b>{props.part.name} {props.part.exerciseCount}</b>
                    <br></br>
                    <i>{props.part.description}</i>
                    <div>required skills:  {props.part.requirements.map(r => r + ', ')}</div>
                    <p></p>
                </div>
            );
        default:
            return assertNever(props.part);
    }
};

export default Part;
