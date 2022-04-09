import React, { useEffect, useState, useRef } from "react";
import { History } from "history";
import Header from "../Header";
import { bubbleSort, insertionSort, quickSort, selectionSort, height } from './sortUtil';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Modal, Slider } from "@mui/material";

interface Props{
    history: History
}


export default function Sort(props: Props){

    const [length] = useState(40);
    const [jsxArray, setJsxArray] = useState([<></>]);
    const [algorithm, setAlgorithm] = useState('insert');
    const numberArray = useRef<number[]>([]);
    const [modal, setModal] = useState(false);
    const [modalPage, setModalPage] = useState(0);
    const [speed, setSpeed] = useState(60);

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
                    insertionSort(jsxArray, 0, speed);
                    break;
                case 'bubble':
                    bubbleSort(jsxArray, 0, speed);
                    break;
                case 'select':
                    selectionSort(jsxArray, 0, speed);
                    break;
                case 'quick':
                    quickSort(jsxArray, 0, speed);
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
            let button = document.getElementById('sort')!;
            button.style.backgroundColor = '#1976D2';
            button.textContent = 'Sort';
        }
    }

    useEffect(()=>{
        const temp = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
        text(temp);
        numberArray.current = temp;

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <b id='sortModalTitle'>Welcome to the sorting algorithm feature!</b>
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
                    <p id='sortModalIntro'>Choose an algorithm from the algorithm dropdown.</p>
                    <img id='sortDropoutImg' alt="" src='/images/sortDropout.png'/>
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
                    <p id='sortModalIntro'>You can know visualize, change the array, change the visualization speed or compare two algorithms together.</p>
                    <img id='sortHeaderImg' alt="" src='/images/sortHeader.png'/>
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
        <div id="app">
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
                    Compare
                </Button>
                <Button className="headerButton" variant='contained' color='secondary' onClick={handleModal}>
                    Help
                </Button>
            </div>
            <div id='center'>
                <FormControl id='sortForm'>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" value={algorithm} onChange={(e)=>{handleAlgorithmChange(e)}}>
                        <MenuItem value="insert">Insertion Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="select">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                    </Select>
                </FormControl>
                <div id='sort_container'>
                    {jsxArray}
                </div>
            </div>
            <Modal open={modal} onClose={handleModal}>
                {modalDisplay()}
            </Modal>
        </div>
    );
}