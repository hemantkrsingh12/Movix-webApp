import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./CircleRating.scss";

const CircleRating = (props) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={props.rating}   
                maxValue={10}
                text={props.rating}
                styles={buildStyles({
                    pathColor:
                       props.rating < 5 ? "red" : props.rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;