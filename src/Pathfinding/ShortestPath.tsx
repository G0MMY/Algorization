import React, { useRef, useState, useEffect } from "react";
import aStart from "./aStarAlgorithm";
import { Button, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent, Modal, Slider } from '@mui/material';
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
    const [grid, setGrid] = useState([<tr key='initial'></tr>]);
    const start_pos = useRef('');
    const end_pos = useRef('');
    const wall_construction = useRef(false);
    const [algorithm, setAlgorithm] = useState('a_star');
    const [modal, setModal] = useState(false);
    const [modalPage, setModalPage] = useState(0);
    const [speed, setSpeed] = useState(4);

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
            if (start_pos.current === '' && id !== end_pos.current){
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
            const button = document.getElementById('visualize_button')!;
            if (button.textContent === 'Visualize'){
                if (algorithm === 'a_star'){
                    aStart(start_pos.current, end_pos.current, '', speed);
                } else if (algorithm === 'dijkstra') {
                    dijkstra(start_pos.current, end_pos.current, '', speed);
                } else if (algorithm === 'greedy'){
                    greedyBestFirstSearch(start_pos.current, end_pos.current, '', speed);
                }
                button.style.backgroundColor = '#DC004E';
                button.textContent = 'Clear Visualization';
            } else {
                clearButton()
                button.style.backgroundColor = '#1976D2';
                button.textContent = 'Visualize';
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
                    <b id='sortModalTitle'>Welcome to the pathfinding algorithm feature!</b>
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
                    <img id='sortDropoutImg' src='/images/pathDropout.png'/>
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
                    <p><b>A star:</b>  This algorithm uses heuristics to find the shortest path faster then Dijkstra's algorithm. It guarantees the shortest path.</p>
                    <p><b>Dijkstra:</b>  This algorithm looks every possible path until it finds the end node. It guarantees the shortest path.</p>
                    <p><b>Greedy Best-First Search:</b>  This algorithm is a faster and more heuristic heavy algorithm then A star's algorithm. It does not guarantee the shortset path.</p>
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
                    <b id='sortModalTitle'>Place start and end point</b>
                    <p id='sortModalIntro'>You can know choose the start and ending point of the path by clicking on the squares.</p>
                    <p id='sortModalPhrase'>If u want to change the position of on of the nodes, click on it to erase it and click wherever you want the point to be.</p>
                    <img id='pointPathImg' src='/images/pointPath.png'/>
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
                    <b id='sortModalTitle'>Put some walls</b>
                    <p id='sortModalIntro'>To place some walls, hold down the left button and drag the mouse aroud.</p>
                    <p id='sortModalPhrase'>To remove a wall, simply click on it.</p>
                    <img id='pointPathImg' src='/images/pathWalls.png'/>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 5){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Visualize and more</b>
                    <p id='sortModalIntro'>You can know visualize, reset the grid or compare two algorithms together.</p>
                    <img id='sortHeaderImg' src='/images/pathHeader.png'/>
                    <div id='sortModalButtonContainer'>
                        <Button id="sortModalSkip" color='secondary' onClick={handleModal} variant="contained">Skip Tutorial</Button>
                        <Button id='sortModalNext' variant='contained' onClick={nextClick}>Next</Button>
                        <Button id='sortModalPrevious' variant='contained' onClick={previousClick}>Previous</Button>
                    </div>
                </div>
            );
        } else if (modalPage === 6){
            return (
                <div className="modal">
                    <b id='sortModalTitle'>Have Fun!</b>
                    <p id='sortModalIntro'>I hope this tutorial helped you understand how this pathfinding visualization tool works.</p>
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
        <div id='app'>
            <Header nav={props} tab={1}/>
            <div className='algoHeader'>
                <Button id='visualize_button' className="headerButton" variant='contained' onClick={()=>{
                    visualizeButton()
                }}>
                    Visualize
                </Button>
                <Button id='reset_button' className="headerButton" variant='contained' color='secondary' onClick={()=>{resetButton()}}>
                    Reset
                </Button>
                <div id='sliderContainer'>
                    Speed
                    <Slider id='headerSlider' value={speed} onChange={(e, val)=>{
                        handleSpeedChange(e, val);
                    }} min={1} max={7} aria-label="Default" valueLabelDisplay="auto" color='secondary'/>
                </div>
                <Button id='compare_button' className="headerButton" variant='contained' onClick={()=>{compareButton()}}>
                    Compare 
                </Button>
                <Button className="headerButton" variant='contained' color='secondary' onClick={handleModal}>
                    Help
                </Button>
            </div>
            <div id='center'>
                <FormControl>
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm} style={
                        algorithm === 'greedy' ? {fontSize:'12px'}:{fontSize:'15px'}} onChange={(e)=>{handleAlgorithmChange(e)}}>
                        <MenuItem value="a_star">A star</MenuItem>
                        <MenuItem value="dijkstra">Dijkstra</MenuItem>
                        <MenuItem value="greedy">Greedy Best-First Search</MenuItem>
                    </Select>
                </FormControl>
                <Grid grid={grid} id='main_grid'/>
            </div>
            <Modal open={modal} onClose={handleModal}>
                {modalDisplay()}
            </Modal>
        </div>
    )
}