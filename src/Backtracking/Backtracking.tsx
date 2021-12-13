import React, { useEffect, useState } from "react";
import { History } from "history";
import Header from "../Header";
import Grid from "../Grid";
import {solver, visualization_array } from "./solver";

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
    const [numberGrid, setNumberGrid] = useState(sudoku)

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
        solver(numberGrid)
        let i = 0
        visualization_array.forEach((elem)=>{
            i += 1;
            (function(index:number) {
                setTimeout(function() { 
                    if (elem.ascend){
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "green"
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = JSON.stringify(elem.value)
                    } else {
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.style.outlineColor = "red"
                        document.getElementById(elem.row+","+elem.col + " sudoku")!.textContent = ""
                    } 
                }, index*speed);
            })(i);
        })
    }

    const reload = ()=>{
        makeGrid();
    }

    return (
        <div>
            <Header nav={props} tab={3}/>
            <button id="backtracking" name="backtracking" onClick={solutionVisualization}>Backtracking Visualization</button>
            <button id="reload" onClick={reload}>Reload</button>
            <Grid id='sudoku' grid={grid}/>
        </div>
    );
}