import React, { useState, useEffect, useRef } from "react";
import { History as hs } from 'history';
import Header from "../Header";
import { FormControl, MenuItem, Select, Button, InputLabel, SelectChangeEvent } from '@mui/material';
import { insertionSort, bubbleSort, selectionSort, quickSort, height } from "./sortUtil";

interface Props{
    history:hs
}

export default function CompareSort(props: Props){
    
    const [length, setLength] = useState(20);
    const [jsxArray1, setJsxArray1] = useState<JSX.Element[]>([]);
    const [jsxArray2, setJsxArray2] = useState<JSX.Element[]>([]);
    const [algorithm1, setAlgorithm1] = useState('insert');
    const [algorithm2, setAlgorithm2] = useState('insert');
    const numberArray = useRef<number[]>([]);

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
            switch(algorithm1){
                case 'insert':
                    switch(algorithm2){
                        case 'insert':
                            insertionSort(jsxArray1);
                            insertionSort(jsxArray2);
                            break;
                        case 'bubble':
                            insertionSort(jsxArray1);
                            bubbleSort(jsxArray2);
                            break;
                        case 'select':
                            insertionSort(jsxArray1);
                            selectionSort(jsxArray2);
                            break;
                        case 'quick':
                            insertionSort(jsxArray1);
                            quickSort(jsxArray2);
                            break;
                    }
                    break;
                case 'bubble':
                    switch(algorithm2){
                        case 'insert':
                            bubbleSort(jsxArray1);
                            insertionSort(jsxArray2);
                            break;
                        case 'bubble':
                            bubbleSort(jsxArray1);
                            bubbleSort(jsxArray2);
                            break;
                        case 'select':
                            bubbleSort(jsxArray1);
                            selectionSort(jsxArray2);
                            break;
                        case 'quick':
                            bubbleSort(jsxArray1);
                            quickSort(jsxArray2);
                            break;
                    }
                    break;
                case 'select':
                    switch(algorithm2){
                        case 'insert':
                            selectionSort(jsxArray1);
                            insertionSort(jsxArray2);
                            break;
                        case 'bubble':
                            selectionSort(jsxArray1);
                            bubbleSort(jsxArray2);
                            break;
                        case 'select':
                            selectionSort(jsxArray1);
                            selectionSort(jsxArray2);
                            break;
                        case 'quick':
                            selectionSort(jsxArray1);
                            quickSort(jsxArray2);
                            break;
                    }
                    break;
                case 'quick':
                    switch(algorithm2){
                        case 'insert':
                            quickSort(jsxArray1);
                            insertionSort(jsxArray2);
                            break;
                        case 'bubble':
                            quickSort(jsxArray1);
                            bubbleSort(jsxArray2);
                            break;
                        case 'select':
                            quickSort(jsxArray1);
                            selectionSort(jsxArray2);
                            break;
                        case 'quick':
                            quickSort(jsxArray1);
                            quickSort(jsxArray2);
                            break;
                    }
                    break;
            }
        }
    }

    const compareButton = () => {
        props.history.push('/sort');
    }

    const handleAlgorithmChange = (e: SelectChangeEvent<string>, arrayNumber:number)=>{
        if (typeof(e.target.value)==='string'){
            if (arrayNumber === 1){
                setAlgorithm1(e.target.value)
            } else {
                setAlgorithm2(e.target.value)
            }
            text(numberArray.current);
            modifyHeight(numberArray.current);
        }
    }

    const modifyHeight = (arr: number[]) => {
        for (let i=0;i<arr.length;i++){
            let doc = document.getElementById(i + " col1");
            if (doc !== null){
                doc.style.height = JSON.stringify(height(arr[i], arr)) + 'px';
            }
            doc = document.getElementById(i + " col2");
            if (doc !== null){
                doc.style.height = JSON.stringify(height(arr[i], arr)) + 'px';
            }
        }
    }

    const changeArrayButton = () => {
        const temp = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
        text(temp);
        numberArray.current = temp;
    }

    const text = (arr: number[]) => {
        let textArray: JSX.Element[] = [];

        for (let i=0;i<length;i++){
            textArray.push(<div className="sortColumn" id={i + " col1"} style={{height:height(arr[i], arr)}}>{arr[i]}</div>);
        }
        setJsxArray1(textArray);

        textArray = [];
        for (let i=0;i<length;i++){
            textArray.push(<div className="sortColumn" id={i + " col2"} style={{height:height(arr[i], arr)}}>{arr[i]}</div>);
        }
        setJsxArray2(textArray);
    }

    useEffect(()=>{
        const temp = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
        text(temp);
        numberArray.current = temp;
    },[]);

    return (
        <div id='app'>
            <Header nav={props} tab={2}/>
            <div className="algoHeader">
                <Button className="headerButton" id="sort" variant='contained' onClick={sortButton}>
                    Sort
                </Button>
                <Button className="headerButton" variant='contained' color='secondary' onClick={changeArrayButton}>
                    Change Array
                </Button>
                <Button className="headerButton" variant='contained' onClick={compareButton}>
                    Stop Compare
                </Button>
            </div>
            <div id="algorithm_chooser">
                <FormControl>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm1} onChange={(e)=>{handleAlgorithmChange(e, 1)}}>
                        <MenuItem value="insert">Insertion Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="select">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm2} onChange={(e)=>{handleAlgorithmChange(e, 2)}}>
                        <MenuItem value="insert">Insertion Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="select">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div id="comparator_container">
                <div className="sort_container_compare">
                    {jsxArray1}
                </div>
                <div className="sort_container_compare">
                    {jsxArray2}
                </div>
            </div>
            <div id='screen_pointers'/>
        </div>
    )
}