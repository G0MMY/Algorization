import React, { useEffect, useState, useRef, useCallback } from "react";
import { History } from "history";
import Header from "../Header";
import { bubbleSort, insertionSort, quickSort, selectionSort, height } from './sortUtil';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from "@mui/material";

interface Props{
    history: History
}

export default function Sort(props: Props){

    const [length, setLength] = useState(40);
    const [jsxArray, setJsxArray] = useState([<></>]);
    const [algorithm, setAlgorithm] = useState('insert');
    const numberArray = useRef<number[]>([]);

    const text = (arr: number[]) => {
        let textArray: JSX.Element[] = [];

        for (let i=0;i<length;i++){
            textArray.push(<div className="sortColumn" id={i + " col"} style={{height:height(arr[i], arr)}}>{arr[i]}</div>);
        }
        setJsxArray(textArray);
    }

    const changeArrayButton = () => {
        const temp = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
        text(temp);
        numberArray.current = temp;
    }

    const sortButton = () => {
        let button = document.getElementById('sort')!;
        if (button.textContent !== 'Sort'){
            modifyHeight(numberArray.current);
            text(numberArray.current);
            button.style.backgroundColor = '#1976D2';
            button.textContent = 'Sort';
        } else {
            button.style.backgroundColor = '#DC004E';
            button.textContent = 'Reset';
            switch(algorithm){
                case 'insert':
                    insertionSort(jsxArray);
                    break;
                case 'bubble':
                    bubbleSort(jsxArray);
                    break;
                case 'select':
                    selectionSort(jsxArray);
                    break;
                case 'quick':
                    quickSort(jsxArray);
                    break;
            }
        }
        
    }

    const compareButton = () => {
        props.history.push('/sort/compare');
    }

    const modifyHeight = (arr: number[]) => {
        for (let i=0;i<arr.length;i++){
            let doc = document.getElementById(i + " col");
            if (doc !== null){
                doc.style.height = JSON.stringify(height(arr[i], arr)) + 'px';
            }
        }
    }

    const handleAlgorithmChange = (e: SelectChangeEvent<string>)=>{
        if (typeof(e.target.value) === 'string'){
            setAlgorithm(e.target.value);
            text(numberArray.current);
            modifyHeight(numberArray.current);
        }
    }

    useEffect(()=>{
        const temp = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
        text(temp);
        numberArray.current = temp;
    },[]);

    return (
        <div id="app">
            <Header nav={props} tab={2}/>
            <div className="algoHeader">
                <FormControl id="algorithm_form">
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm} onChange={(e)=>{handleAlgorithmChange(e)}}>
                        <MenuItem value="insert">Insertion Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="select">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                    </Select>
                </FormControl>
                <Button className="headerButton" id="sort" variant='contained' onClick={sortButton}>
                    Sort
                </Button>
                <Button className="headerButton" variant='contained' color='secondary' onClick={changeArrayButton}>
                    Change Array
                </Button>
                <Button className="headerButton" variant='contained' onClick={compareButton}>
                    Compare
                </Button>
            </div>
            <div id='sort_container'>
                {jsxArray}
            </div>
        </div>
    );
}