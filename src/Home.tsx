import React from "react";
import { History } from "history";
import Header from "./Header";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

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
            <div id="welcome">
                <div id="name">Algorization</div><br/><br/>
                <div id="description">The best visualization tool for pathfinding, sorting or backtracking algorithms.</div>
            </div>
            <div id='infoContainer'>
                <div className="agloInfo" onClick={pathfindingClick}>
                    <b>Pathfinding</b><br/><br/>
                    Pathfinding algorithms are usually designed to solve the shortest path problem in a graph. In graph theory, the shortest path problem is the problem of finding the shortset path between two nodes. This meens that the sum of the weights of each nodes in the path are going to be minimized. Basically, the shortest path problem is the same as finding the fastest route between a place and another one on Google Map, for example.  
                </div>
                <div className="agloInfo" onClick={sortClick}>sorting</div>
                <div className="agloInfo" onClick={backtrackingClick}>backtracking</div>
            </div>
            <div id='color'/>
        </div>
    )
}


// Pathfinding algorithms are usually designed to solve the shortest path problem in a graph. For this visualization, the graph is represented by a grid. All you have to do to see the algorithms in action is choose a starting and a ending point by clicking on a square. Then, you can hold your mouse and draw some walls, which are obstacles for the algorithms. The, press on visualize.