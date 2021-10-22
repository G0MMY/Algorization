import React, { useEffect, useState, useRef } from "react";
import { History } from "history";
import Header from "./Header";
import Grid from "./Grid";

const length = 35;
const start = 'blue';
const end = 'purple';

interface Props{
    history: History
}


export default function ShortestPath(props: Props){

    const [grid, setGrid] = useState([<></>]);
    const wall_construction = useRef(false);
    const start_pos= useRef('');
    const end_pos = useRef('');

    const makeRow = (length: number, row_number:number)=>{
        let row = [];
        for (let i=0;i<length;i++){
            row.push(<td className='square' key={row_number + ',' + i + ' mainGrid'} id={row_number + ',' + i + ' mainGrid'} onMouseEnter={()=>{
                makeWall(row_number + ',' + i + ' mainGrid');
            }} onClick={()=>{
                squareClick(row_number + ',' + i + ' mainGrid');
            }}/>);
        }

        return row;
    }

    const makeWall = (id:string)=>{
        if (wall_construction.current){
            if (document.getElementById(id) !== null){
                document.getElementById(id)!.style.backgroundColor = 'black';
            }
        }
    }

    const squareClick = (id:string)=>{
        const doc = document.getElementById(id);
        if (doc !== null){
            if (start_pos.current === '' && end_pos.current !== id){
                doc.style.backgroundColor = start;
                start_pos.current = id;
            } else if (end_pos.current === '' && start_pos.current !== id){
                doc.style.backgroundColor = end;
                end_pos.current = id;
            } else {
                if (id === start_pos.current){
                    start_pos.current = '';
                } else if (id === end_pos.current){
                    end_pos.current = '';
                }
                doc.style.backgroundColor = 'white';
            }
        }
    }

    const makeTable = (length: number)=>{
        let table:JSX.Element[] = [];
        for (let i=0;i<length;i++){
            table.push(<tr key={'tr ' + i}>{makeRow(length*2, i)}</tr>);
        }
        setGrid(table);
    }

    useEffect(()=>{
        makeTable(length);
        document.getElementById('main_grid')!.addEventListener('mousedown', ()=>{
            wall_construction.current = true;
        });
        document.getElementById('main_grid')!.addEventListener('mouseup', ()=>{
            wall_construction.current = false;
        });
    }, []);

    return (
        <div>
            <Header nav={props} tab={1}/>
            <Grid id='main_grid' grid={grid}/>
        </div>
    );
}