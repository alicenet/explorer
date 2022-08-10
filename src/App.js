import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BlockExplorer, DataExplorer, Home, Test, TxExplorer } from "pages";
import { DimmerLoader, ErrorOverlay } from "components";

function App() {
    return (
        <>
            <ErrorOverlay />
            <DimmerLoader />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/block/:height" component={BlockExplorer} />
                    <Route exact path="/data/:address/:offset?" component={DataExplorer} />
                    <Route exact path="/tx/:hash" component={TxExplorer} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
