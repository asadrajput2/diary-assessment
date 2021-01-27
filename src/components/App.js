import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Diary from './diary';
import ExpandedTilesList from './expandedView/expandedTileList';

export default function App() {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path={"/tile"} component={ExpandedTilesList} />
                <Route exact path={""} component={Diary} />
            </Switch>

        </BrowserRouter>
    )
}   