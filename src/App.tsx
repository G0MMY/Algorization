import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Backtracking from './Backtracking';
import CompareShortestPath from './CompareShortestPath';
import Home from './Home';
import ShortestPath from './ShortestPath';
import Sort from './Sort';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/sort" component={Sort}/>
        <Route path="/backtracking" component={Backtracking}/>
        <Route exact path="/shortest-path" component={ShortestPath}/>
        <Route path="/shortest-path/compare" component={CompareShortestPath}/>
      </Switch>
    </Router>
  );
}

export default App;
