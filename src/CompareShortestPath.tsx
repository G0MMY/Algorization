import React from "react";
import { History } from "history";

interface Props{
    history: History
}

export default function CompareShortestPath(props: Props){

    const homeButton = () => {
        props.history.push("/");
    }

    return (
        <div>
            CompareShortestPath<br/>
            <text onClick={homeButton}>Home</text>
        </div>
    )
}