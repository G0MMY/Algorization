import React, { useEffect, useState, useRef } from "react";
import { History } from "history";
import Header from "../Header";
import Grid from "../Grid";
import {solver, visualization_array } from "./solver";
import { Button } from "@mui/material";
import { setTimeout } from "timers";

const speed = 50;
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
    const [numberGrid, setNumberGrid] = useState(sudoku);
    const time = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    },[]);

    const solutionVisualization = ()=>{
        if (time.current.length === 0){
            solver(numberGrid);
            let i = 0;
            visualization_array.forEach((elem)=>{
                i += 1;
                (function(index:number) {
                    time.current.push(setTimeout(function() { 
                        if (elem.ascend){
                            document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "green";
                            document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = JSON.stringify(elem.value);
                        } else {
                            document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "red";
                            document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = "";
                        } 
                    }, index*speed));
                })(i);
            });
            let doc = document.getElementById('backtracking');
            if (doc !== null){
                doc.textContent = "Pause"
                doc.style.backgroundColor = '#DC004E';
            }
        } else {
            let doc = document.getElementById('backtracking');
            if (doc !== null){
                doc.textContent = "Backtracking Visualization";
                doc.style.backgroundColor = '#1976D2';
            }
            time.current.forEach((id)=>{
                clearTimeout(id);
            })
        }
    }

    const reload = ()=>{
        makeGrid();
    }

    return (
        <div>
            <Header nav={props} tab={3}/>
            <div className="algoHeader">
                <Button id="backtracking" className="headerButton" variant='contained' name="backtracking" onClick={solutionVisualization}>Backtracking Visualization</Button>
                <Button id="reload" className="headerButton" color="secondary" variant='contained' onClick={reload}>Reload</Button>
            </div>
            <Grid id='sudoku' grid={grid}/>
        </div>
    );
}