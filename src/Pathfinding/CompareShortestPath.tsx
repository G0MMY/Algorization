import React, { useState, useEffect, useRef } from 'react'
import { len, start, end, wall } from './ShortestPath'
import { Button, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import Grid from '../Grid'
import { History as hs } from 'history'
import dijkstra from "./DijkstraAlgorithm";
import greedyBestFirstSearch from "./greedyBestFirstSearch";
import aStar from "./aStarAlgorithm";
import Header from '../Header'

interface Props{
    history:hs
}

export default function GridComparator(props:Props){
    const [grid_1, setGrid1] = useState([<tr key='initial'></tr>])
    const [grid_2, setGrid2] = useState([<tr key='initial'></tr>])
    const start_pos = useRef('')
    const end_pos = useRef('')
    const wall_construction = useRef(false)
    const [algorithm_1, setAlgorithm1] = useState('a_star')
    const [algorithm_2, setAlgorithm2] = useState('dijkstra')

    const makeRow = (length: number, row_number:number, grid_number:string)=>{
        let row = []
        for (let i=0;i<length;i++){
            const identification = row_number + ',' + i + ' ' + grid_number
            row.push(<td className='square' key={identification} id={identification} onMouseEnter={()=>{
                if (grid_number === '1'){
                    makeWall(identification)
                }
            }} onClick={()=>{
                if (grid_number === '1'){
                    squareClick(identification)
                }
            }}></td>)
        }

        return row
    }

    const makeTable = (length: number)=>{
        let table_1:JSX.Element[] = []
        let table_2:JSX.Element[] = []
        for (let i=0;i<length;i++){
            table_1.push(<tr key={'tr ' + i}>{makeRow(length, i, '1')}</tr>)
            table_2.push(<tr key={'tr ' + i}>{makeRow(length, i, '2')}</tr>)
        }
        setGrid1(table_1)
        setGrid2(table_2)
    }

    const makeWall = (id:string)=>{
        if (wall_construction.current){
            if (document.getElementById(id) !== null){
                document.getElementById(id)!.style.backgroundColor = wall
                document.getElementById(id.split(' ')[0] + ' 2')!.style.backgroundColor = wall
            }
        }
    }

    const squareClick = (id:string)=>{
        const doc_1 = document.getElementById(id)
        const doc_2 = document.getElementById(id.split(' ')[0] + ' 2')!
        if (doc_1 !== null){
            if (start_pos.current === ''){
                doc_1.style.backgroundColor = start
                doc_2.style.backgroundColor = start
                start_pos.current = id
            } else if (end_pos.current === '' && start_pos.current !== id){
                doc_1.style.backgroundColor = end
                doc_2.style.backgroundColor = end
                end_pos.current = id
            } else {
                if (id === start_pos.current){
                    start_pos.current = ''
                } else if (id === end_pos.current){
                    end_pos.current = ''
                }
                doc_1.style.backgroundColor = 'white'
                doc_2.style.backgroundColor = 'white'
            }
        }
    }

    const resetButton = ()=>{
        grid_1.forEach((row)=>{
            const children:JSX.Element[] = row.props.children
            children.forEach((child)=>{
                document.getElementById(child.props.id)!.style.backgroundColor = 'white'
            })
        })
        grid_2.forEach((row)=>{
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
        grid_1.forEach((row)=>{
            const children:JSX.Element[] = row.props.children
            children.forEach((child)=>{
                const doc = document.getElementById(child.props.id)!
                const doc_2 = document.getElementById(child.props.id.split(' ')[0] + ' 2')!
                if (child.props.id === start_pos.current){
                    doc.style.backgroundColor = start
                    doc_2.style.backgroundColor = start
                } else if (child.props.id === end_pos.current){
                    doc.style.backgroundColor = end
                    doc_2.style.backgroundColor = end
                } else if (doc.style.backgroundColor !== wall){
                    doc.style.backgroundColor = 'white'
                    doc_2.style.backgroundColor = 'white'
                }
            })
        })
    }

    const algorithmPlayer = ()=>{
        switch(algorithm_1){
            case('a_star'):
                switch(algorithm_2){
                    case('a_star'):
                        aStar(start_pos.current, end_pos.current, '1')
                        aStar(start_pos.current, end_pos.current, '2')
                        break;
                    case('greedy'):
                        aStar(start_pos.current, end_pos.current, '1')
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '2')
                        break;
                    case('dijkstra'):
                        aStar(start_pos.current, end_pos.current, '1')
                        dijkstra(start_pos.current, end_pos.current, '2')
                        break;
                }
                break;
            case('greedy'):
                switch(algorithm_2){
                    case('a_star'):
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '1')
                        aStar(start_pos.current, end_pos.current, '2')
                        break;
                    case('greedy'):
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '1')
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '2')
                        break;
                    case('dijkstra'):
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '1')
                        dijkstra(start_pos.current, end_pos.current, '2')
                        break;
                }
                break;
            case('dijkstra'):
                switch(algorithm_2){
                    case('a_star'):
                        dijkstra(start_pos.current, end_pos.current, '1')
                        aStar(start_pos.current, end_pos.current, '2')
                        break;
                    case('greedy'):
                        dijkstra(start_pos.current, end_pos.current, '1')
                        greedyBestFirstSearch(start_pos.current, end_pos.current, '2')
                        break;
                    case('dijkstra'):
                        dijkstra(start_pos.current, end_pos.current, '1')
                        dijkstra(start_pos.current, end_pos.current, '2')
                        break;
                }
                break;
        }
    }

    const visualizeButton = ()=>{
        if (start_pos.current !== '' && end_pos.current !== ''){
            const button = document.getElementById('visualize_button')!
            if (button.textContent === 'Visualize'){
                algorithmPlayer()        
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
        props.history.push('/shortest-path')
    }

    const handleAlgorithmChange = (e: SelectChangeEvent<string>, grid_number:string)=>{
        if (typeof(e.target.value)==='string'){
            if (grid_number === '1'){
                setAlgorithm1(e.target.value)
            } else {
                setAlgorithm2(e.target.value)
            }
        }
    }

    useEffect(()=>{
        makeTable(len)
        document.getElementById('grid_1')!.addEventListener('mousedown', ()=>{
            wall_construction.current = true
        })
        document.getElementById('grid_1')!.addEventListener('mouseup', ()=>{
            wall_construction.current = false
        })
    },[])

    return (
        <div id='app'>
            <Header nav={props} tab={1}/>
            <div className='algoHeader'>
                <Button id='visualize_button' className="headerButton" variant='contained' onClick={()=>{visualizeButton()}}>
                    Visualize
                </Button>
                <Button id='reset_button' className="headerButton" variant='contained' color='secondary' onClick={()=>{resetButton()}}>
                    Reset
                </Button>
                <Button id='compare_button' className="headerButton" variant='contained' onClick={()=>{compareButton()}}>
                    Stop Compare
                </Button>
            </div>
            <FormControl id="algorithm_form_1">
                <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                <Select labelId="algorithm_selecter" id="label" value={algorithm_1} style={
                    algorithm_1 === 'greedy' ? {fontSize:'12px'}:{fontSize:'15px'}} onChange={(e)=>{handleAlgorithmChange(e, '1')}}>
                    <MenuItem value="a_star">A star</MenuItem>
                    <MenuItem value="dijkstra">Dijkstra</MenuItem>
                    <MenuItem value="greedy">Greedy Best-First Search</MenuItem>
                </Select>
            </FormControl>
            <FormControl id="algorithm_form_2">
                <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                <Select labelId="algorithm_selecter" id="label" value={algorithm_2} style={
                    algorithm_2 === 'greedy' ? {fontSize:'12px'}:{fontSize:'15px'}} onChange={(e)=>{handleAlgorithmChange(e, '2')}}>
                    <MenuItem value="a_star">A star</MenuItem>
                    <MenuItem value="dijkstra">Dijkstra</MenuItem>
                    <MenuItem value="greedy">Greedy Best-First Search</MenuItem>
                </Select>
            </FormControl>
            <div id='comparator_grid_container'>
                <Grid grid={grid_1} id='grid_1'/>
                <Grid grid={grid_2} id='grid_2'/>
            </div>
            <div id='screen_pointers'/>
        </div>
    )
}