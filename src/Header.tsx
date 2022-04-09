import React from "react";
import { History } from "history";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface Props{
    history: History
}

export default function Header(props: {nav: Props, tab: number}){
    return (
        <Box id="header" sx={{ width: '100%' }}>
            <div id="title">Algorization</div>
            <Tabs id="headerTabs" value={props.tab} textColor='inherit' indicatorColor='secondary'>
                <LinkTab nav={props.nav} label="Home" href="/" />
                <LinkTab nav={props.nav} label="Pathfinding" href="/shortest-path" />
                <LinkTab nav={props.nav} label="Sorting" href="/sort" />
                <LinkTab nav={props.nav} label="Backtracking" href="/backtracking" />
            </Tabs>
        </Box>
    );
}

function LinkTab(props: {label: string, href: string, nav: Props}) {
    return (
      <Tab
        component="a"
        onClick={() => {
          props.nav.history.push(props.href);
        }}
        {...props}
      />
    );
  }
