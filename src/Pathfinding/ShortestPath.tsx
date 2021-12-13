import React, { useRef, useState, useEffect } from "react";
import aStart from "./aStarAlgorithm";
import { Button, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import dijkstra from "./DijkstraAlgorithm";
import greedyBestFirstSearch from "./greedyBestFirstSearch";
import Grid from '../Grid'
import { History } from "history";
import Header from "../Header";


export const start = 'orange'
export const end = 'blue'
export const wall = 'black'
export const len = 35

interface Props{
    history: History
}

export default function ShortestPath(props: Props){
    const [grid, setGrid] = useState([<tr key='initial'></tr>])
    const start_pos = useRef('')
    const end_pos = useRef('')
    const wall_construction = useRef(false)
    const [algorithm, setAlgorithm] = useState('a_star')

    const makeRow = (length: number, row_number:number)=>{
        let row = []
        for (let i=0;i<length;i++){
            row.push(<td className='square' key={row_number + ',' + i + ' '} id={row_number + ',' + i + ' '} onMouseEnter={()=>{
                makeWall(row_number + ',' + i + ' ')
            }} onClick={()=>{
                squareClick(row_number + ',' + i + ' ')
            }}></td>)
        }

        return row
    }

    const makeTable = (length: number)=>{
        let table:JSX.Element[] = []
        for (let i=0;i<length;i++){
            table.push(<tr key={'tr ' + i}>{makeRow(length*2, i)}</tr>)
        }
        setGrid(table)
    }

    const makeWall = (id:string)=>{
        if (wall_construction.current){
            if (document.getElementById(id) !== null){
                document.getElementById(id)!.style.backgroundColor = wall
            }
        }
    }

    const squareClick = (id:string)=>{
        const doc = document.getElementById(id)
        if (doc !== null){
            if (start_pos.current === ''){
                doc.style.backgroundColor = start
                start_pos.current = id
            } else if (end_pos.current === '' && start_pos.current !== id){
                doc.style.backgroundColor = end
                end_pos.current = id
            } else {
                if (id === start_pos.current){
                    start_pos.current = ''
                } else if (id === end_pos.current){
                    end_pos.current = ''
                }
                doc.style.backgroundColor = 'white'
            }
        }
    }

    const resetButton = ()=>{
        grid.forEach((row)=>{
            const children:JSX.Element[] = row.props.children
            children.forEach((child)=>{
                document.getElementById(child.props.id)!.style.backgroundColor = 'white'
            })
        })
        start_pos.current = ''
        end_pos.current = ''
        const button = document.getElementById('visualize_button')!
        button.style.backgroundColor = '#1976D2'
        button.textContent = 'Visualize'
    }

    const clearButton = ()=>{
        grid.forEach((row)=>{
            const children:JSX.Element[] = row.props.children
            children.forEach((child)=>{
                const doc = document.getElementById(child.props.id)!
                if (child.props.id === start_pos.current){
                    doc.style.backgroundColor = start
                } else if (child.props.id === end_pos.current){
                    doc.style.backgroundColor = end
                } else if (doc.style.backgroundColor !== wall){
                    doc.style.backgroundColor = 'white'
                }
            })
        })
    }

    const visualizeButton = ()=>{
        if (start_pos.current !== '' && end_pos.current !== ''){
            const button = document.getElementById('visualize_button')!
            if (button.textContent === 'Visualize'){
                if (algorithm === 'a_star'){
                    aStart(start_pos.current, end_pos.current, '')
                } else if (algorithm === 'dijkstra') {
                    dijkstra(start_pos.current, end_pos.current, '')
                } else if (algorithm === 'greedy'){
                    greedyBestFirstSearch(start_pos.current, end_pos.current, '')
                }
                button.style.backgroundColor = '#DC004E'
                button.textContent = 'Clear Visualization'
            } else {
                clearButton()
                button.style.backgroundColor = '#1976D2'
                button.textContent = 'Visualize'
            }
        }
    }

    const compareButton = ()=>{
        props.history.push('/shortest-path/compare')
    }

    const handleAlgorithmChange = (e: SelectChangeEvent<string>)=>{
        if (typeof(e.target.value)==='string'){
            setAlgorithm(e.target.value)
        }
    }

    useEffect(()=>{
        makeTable(len)
        document.getElementById('main_grid')!.addEventListener('mousedown', ()=>{
            wall_construction.current = true
        })
        document.getElementById('main_grid')!.addEventListener('mouseup', ()=>{
            wall_construction.current = false
        })
    },[])

    return (
        <div id='app'>
            <Header nav={props} tab={1}/>
            <div className='algoHeader'>
                <FormControl id="algorithm_form">
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm} style={
                        algorithm === 'greedy' ? {fontSize:'12px'}:{fontSize:'15px'}} onChange={(e)=>{handleAlgorithmChange(e)}}>
                        <MenuItem value="a_star">A star</MenuItem>
                        <MenuItem value="dijkstra">Dijkstra</MenuItem>
                        <MenuItem value="greedy">Greedy Best-First Search</MenuItem>
                    </Select>
                </FormControl>
                <Button id='visualize_button' className="headerButton" variant='contained' onClick={()=>{
                    visualizeButton()
                }}>
                    Visualize
                </Button>
                <Button id='reset_button' className="headerButton" variant='contained' color='secondary' onClick={()=>{resetButton()}}>
                    Reset
                </Button>
                <Button id='compare_button' className="headerButton" variant='contained' onClick={()=>{compareButton()}}>
                    Compare Algorithms
                </Button>
            </div>
            <Grid grid={grid} id='main_grid'/>
        </div>
    )
}