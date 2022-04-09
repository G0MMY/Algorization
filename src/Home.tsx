import React from "react";
import { History } from "history";
import Header from "./Header";

interface Props{
    history: History
}

export default function Home(props: Props){

    const pathfindingClick = () => {
        props.history.push('/shortest-path');
    }

    const sortClick = () => {
        props.history.push('/sort');
    }

    const backtrackingClick = () => {
        props.history.push('/backtracking');
    }

    return (
        <div id="home">
            <Header nav={props} tab={0}/>
            <div id="homeContainer">
                <div id="welcome">
                    <div id="name">Algorization</div><br/><br/>
                    <div id="description">The best visualization tool for pathfinding, sorting or backtracking algorithms.</div>
                </div>
                <div id='infoContainer'>
                    <div className="agloInfo" onClick={pathfindingClick}>
                        <b>Pathfinding</b><br/>
                        This feature is to help you understand how pathfinding algoritms work. You can see the A Star algorithm, the Dijkstra's algorithm or the Greedy Best-First Search algorithm in action. You can also compare two algorithms together to see which one is better.  
                    </div>
                    <div className="agloInfo" onClick={sortClick}>
                        <b>Sorting</b><br/>
                        This feature is to help you understand how sorting algorithms work. You can see the insertion, the bubble, the selection or the quick sort algorithm in action. You can also compare two algorithms together to see which one is better.  
                    </div>
                    <div className="agloInfo" onClick={backtrackingClick}>
                        <b>Backtracking</b><br/>
                        This feature is to help you understand how backtracking algorithms work. You can see how a backtracking algorithm does to resolve a sudoku.
                    </div>
                </div>
                <div id='color'/>
            </div>
        </div>
    )
}
