import React, { useEffect, useState, useRef } from "react";
import { History } from "history";
import Header from "../Header";
import Grid from "../Grid";
import {solver, visualization_array } from "./solver";
import { Button, Modal, Slider } from "@mui/material";
import { clearTimeout, setTimeout } from "timers";

const length = 9;
const sudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

interface Props{
    history: History
}

export default function Backtracking(props: Props){

    const [grid, setGrid] = useState([<></>]);
    const [numberGrid] = useState([
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]);
    const time = useRef<NodeJS.Timeout[]>([]);
    const [modal, setModal] = useState(false);
    const [modalPage, setModalPage] = useState(0);
    const [speed, setSpeed] = useState(60);

    const makeRow = (length: number, row_number:number)=>{
        let row = [];
        for (let i=0;i<length;i++){
            row.push(<td className='square_sudoku' key={row_number + ',' + i + ' sudoku'} id={row_number + ',' + i + ' sudoku'}>{
                    sudoku[row_number][i] === 0? '' : sudoku[row_number][i]
                }</td>);
        }

        return row;
    }

    const makeGrid = () => {
        let table:JSX.Element[] = [];
        for (let i=0;i<length;i++){
            table.push(<tr key={'tr ' + i}>{makeRow(length, i)}</tr>);
        }
        setGrid(table);
    }

    useEffect(()=>{
        makeGrid();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const solutionVisualization = ()=>{
        let doc = document.getElementById('backtracking')!;
        if (doc.textContent === 'Visualize'){
            solver(numberGrid);
            let i = 0;
            visualization_array.forEach((elem)=>{
                i += 1;
                time.current.push(setTimeout(() => { 
                    if (elem.ascend){
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "green";
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = JSON.stringify(elem.value);
                    } else {
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "red";
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = "";
                    } 
                }, i * (120- speed)));
            });
            doc.textContent = "Stop"
            doc.style.backgroundColor = '#DC004E';
            
        } else {
            doc.textContent = "Visualize";
            doc.style.backgroundColor = '#1976D2';
            time.current.forEach((elem)=>{
                clearTimeout(elem);
            });
            reload();
        }
    }

    const reload = ()=>{
        makeGrid();
        for (let i=0;i<length;i++){
            for (let j=0;j<length;j++){
                let doc = document.getElementById(i + ',' + j + ' sudoku')!;
                if (sudoku[i][j] === 0){
                    doc.textContent = '';
                } else {
                    doc.textContent = JSON.stringify(sudoku[i][j]);
                }
                doc.style.outlineColor = 'black';
            }
        }
    }

    const handleModal = () => {
        if (modal){
            setModalPage(0);
        }
        setModal(!modal);
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
                    <b id='sortModalTitle'>Welcome to the backtracking algorithm feature!</b>
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
                    <b id='sortModalTitle'>Algorithm overview</b>
                    <p id='sortModalIntro'>Backtracking algorithms try all solutions until they find the one.</p>
                    <p>This algorithm tries all combinations possible for each cell. If there are no number from 0-9 that works, it goes back and tries other number combinations until it works.</p>
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
                    <b id='sortModalTitle'>Visualize and more</b>
                    <p id='sortModalIntro'>You can know visualize or change the speed of the visualization.</p>
                    <img id='sortHeaderImg' alt="" src='/images/backHeader.png'/>
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
                    <b id='sortModalTitle'>Have Fun!</b>
                    <p id='sortModalIntro'>I hope this tutorial helped you understand how this backtracking visualization tool works.</p>
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
            setSpeed(val);
        }
    }

    return (
        <div>
            <Header nav={props} tab={3}/>
            <div className="algoHeader">
                <Button id="backtracking" className="headerButton" variant='contained' name="backtracking" onClick={solutionVisualization}>Visualize</Button>
                <div id='sliderContainer'>
                    Speed
                    <Slider id='headerSlider' value={speed} onChange={(e, val)=>{
                        handleSpeedChange(e, val);
                    }} min={10} max={110} aria-label="Default" valueLabelDisplay="auto" color='secondary'/>
                </div>
                <Button className="headerButton" variant='contained' color='secondary' onClick={handleModal}>
                    Help
                </Button>
            </div>
            <Grid id='sudoku' grid={grid}/>
            <Modal open={modal} onClose={handleModal}>
                {modalDisplay()}
            </Modal>
        </div>
    );
}