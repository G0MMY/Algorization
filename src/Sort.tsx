import React, { useEffect, useState } from "react";
import { History } from "history";
import Header from "./Header";

interface Props{
    history: History
}


export default function Sort(props: Props){

    const [length, setLength] = useState(40);
    const [array, setArray] = useState(Array.from({length: 40}, () => Math.floor(Math.random() * 40)))

    const text = () => {
        let textArray: JSX.Element[] = [];
        let height = 930 / Math.max(...array) - 2;

        for (let i=0;i<length;i++){
            textArray.push(<div className="sort_column" style={{height:array[i] * height + 1}}></div>)
        }

        return textArray;
    }

    return (
        <div>
            <Header nav={props} tab={2}/>
            <div id='sort_container'>
                {text()}
            </div>
        </div>
    )
}