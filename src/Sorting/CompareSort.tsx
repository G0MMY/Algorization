import React, { useState, useEffect, useRef } from "react";
import { History as hs } from 'history';
import Header from "../Header";
import { FormControl, MenuItem, Select, Button, InputLabel, SelectChangeEvent, Modal, Slider } from '@mui/material';
import { insertionSort, bubbleSort, selectionSort, quickSort, height } from "./sortUtil";

interface Props{
    history:hs
}

export default function CompareSort(props: Props){
    
    const [length, setLength] = useState(20);
    const [jsxArray1, setJsxArray1] = useState<JSX.Element[]>([]);
    const [jsxArray2, setJsxArray2] = useState<JSX.Element[]>([]);
    const [algorithm1, setAlgorithm1] = useState('insert');
    const [algorithm2, setAlgorithm2] = useState('bubble');
    const numberArray = useRef<number[]>([]);
    const [modal, setModal] = useState(false);
    const [modalPage, setModalPage] = useState(0);
    const [speed, setSpeed] = useState(60);

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
                            insertionSort(jsxArray1, 1, speed);
                            insertionSort(jsxArray2, 2, speed);
                            break;
                        case 'bubble':
                            insertionSort(jsxArray1, 1, speed);
                            bubbleSort(jsxArray2, 2, speed);
                            break;
                        case 'select':
                            insertionSort(jsxArray1, 1, speed);
                            selectionSort(jsxArray2, 2, speed);
                            break;
                        case 'quick':
                            insertionSort(jsxArray1, 1, speed);
                            quickSort(jsxArray2, 2, speed);
                            break;
                    }
                    break;
                case 'bubble':
                    switch(algorithm2){
                        case 'insert':
                            bubbleSort(jsxArray1, 1, speed);
                            insertionSort(jsxArray2, 2, speed);
                            break;
                        case 'bubble':
                            bubbleSort(jsxArray1, 1, speed);
                            bubbleSort(jsxArray2, 2, speed);
                            break;
                        case 'select':
                            bubbleSort(jsxArray1, 1, speed);
                            selectionSort(jsxArray2, 2, speed);
                            break;
                        case 'quick':
                            bubbleSort(jsxArray1, 1, speed);
                            quickSort(jsxArray2, 2, speed);
                            break;
                    }
                    break;
                case 'select':
                    switch(algorithm2){
                        case 'insert':
                            selectionSort(jsxArray1, 1, speed);
                            insertionSort(jsxArray2, 2, speed);
                            break;
                        case 'bubble':
                            selectionSort(jsxArray1, 1, speed);
                            bubbleSort(jsxArray2, 2, speed);
                            break;
                        case 'select':
                            selectionSort(jsxArray1, 1, speed);
                            selectionSort(jsxArray2, 2, speed);
                            break;
                        case 'quick':
                            selectionSort(jsxArray1, 1, speed);
                            quickSort(jsxArray2, 2, speed);
                            break;
                    }
                    break;
                case 'quick':
                    switch(algorithm2){
                        case 'insert':
                            quickSort(jsxArray1, 1, speed);
                            insertionSort(jsxArray2, 2, speed);
                            break;
                        case 'bubble':
                            quickSort(jsxArray1, 1, speed);
                            bubbleSort(jsxArray2, 2, speed);
                            break;
                        case 'select':
                            quickSort(jsxArray1, 1, speed);
                            selectionSort(jsxArray2, 2, speed);
                            break;
                        case 'quick':
                            quickSort(jsxArray1, 1, speed);
                            quickSort(jsxArray2, 2, speed);
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
            let button = document.getElementById('sort')
            if (button !== null && button.textContent === 'Reset'){
                button.style.backgroundColor = '#1976D2';
                button.textContent = 'Sort';
            }
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

    const handleModal = () => {
        if (modal){
            setModalPage(0);
        }
        setModal(!modal);
        changeArrayButton();
        let button = document.getElementById('sort')!
        button.style.backgroundColor = '#1976D2';
        button.textContent = 'Sort';
    }

    const nextClick = () => {
        setModalPage(modalPage + 1);
    }

    const previousClick = () => {
        setModalPage(modalPage -1);
    }

    const modalDisplay = () => {
        if (modalPage === 0){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Welcome to the compare sorting algorithm feature!</b>
                    <p id='sortModalIntro'>This is a little tutorial to help you understand how to use this feature.</p>
                    <p id='sortModalPhrase'>If you don't want to do it, press the "Skip Tutorial" button. Otherwise, press "Next" to continue.</p>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 1){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Piking an algorithm</b>
                    <p id='sortModalIntro'>Choose different algorithms from the algorithm dropdowns.</p>
                    <img id='sortDropoutImg' src='/images/sortDropout.png'/>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 2){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Algorithms overview</b>
                    <p id='sortModalIntro'>All sorting algorithms are different in their own way.</p>
                    <p><b>Insertition Sort:</b> This is a very simple algorithm that builds the final array by inserting the new values, at the right place, one by one.</p>
                    <p><b>Bubble Sort:</b> This algorithm compares each value of the array with its neighbor and switch them if they are not in the right order. </p>
                    <p><b>Selection Sort:</b> This algorithm sorts an array by repeatedly finding the minimum element of the unsorted array and puts it in the sorted array.</p>
                    <p><b>Quick Sort:</b> This algorithm is a Divide and Conquer algorithm. It picks an element as pivot and slices the array in two. It then sorts the two partitions before putting them back together.</p> 
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 3){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Visualize and more</b>
                    <p id='sortModalIntro'>You can know visualize, change the array or stop comparing two algorithms together.</p>
                    <img id='sortHeaderImg' src='/images/sortCompareHeader.png'/>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 4){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Have Fun!</b>
                    <p id='sortModalIntro'>I hope this tutorial helped you understand how this sorting visualization tool works.</p>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={handleModal}>Finish</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        }
        return (
            <></>
        )
    }

    const handleSpeedChange = (e: Event, val: number|number[]) => {
        if (typeof(val) === 'number'){
            let button = document.getElementById('sort')!;
            if (button.textContent !== 'Sort'){
                sortButton();
            }
            setSpeed(val);
        }
    }

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
                <div id='sliderContainer'>
                    Speed
                    <Slider id='headerSlider' value={speed} onChange={(e, val)=>{
                        handleSpeedChange(e, val);
                    }} min={10} max={110} aria-label="Default" valueLabelDisplay="auto" color='secondary'/>
                </div>
                <Button className="headerButton" variant='contained' onClick={compareButton}>
                    Stop Compare
                </Button>
                <Button className="headerButton" variant='contained' color='secondary' onClick={handleModal}>
                    Help
                </Button>
            </div>
            <div id="algorithm_chooser">
                <FormControl>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" value={algorithm1} onChange={(e)=>{handleAlgorithmChange(e, 1)}}>
                        <MenuItem value="insert">Insertion Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="select">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" value={algorithm2} onChange={(e)=>{handleAlgorithmChange(e, 2)}}>
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
            <Modal open={modal} onClose={handleModal}>
                {modalDisplay()}
            </Modal>
            <div id='screen_pointers'/>
        </div>
    )
}