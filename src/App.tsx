import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Backtracking from './Backtracking/Backtracking';
import CompareShortestPath from './Pathfinding/CompareShortestPath';
import Home from './Home';
import ShortestPath from './Pathfinding/ShortestPath';
import Sort from './Sorting/Sort';
import CompareSort from './Sorting/CompareSort';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/sort" component={Sort}/>
        <Route path='/sort/compare' component={CompareSort}/>
        <Route path="/backtracking" component={Backtracking}/>
        <Route exact path="/shortest-path" component={ShortestPath}/>
        <Route path="/shortest-path/compare" component={CompareShortestPath}/>
      </Switch>
    </Router>
  );
}

export default App;
