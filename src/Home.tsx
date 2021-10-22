import React from "react";
import { History } from "history";
import Header from "./Header";

interface Props{
    history: History
}

export default function Home(props: Props){

    return (
        <div id="home">
            <Header nav={props} tab={0}/>
            <div id="welcome">
                <div id="name">Algorization</div><br/><br/>
                <div id="description">The best visualization tool for sorting, pathfinding or backtracking algorithms.</div>
            </div>
        </div>
    )
}
