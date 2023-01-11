import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About, BlockExplorer, DataExplorer, Home, Test, TxExplorer } from "pages";
import { StatusOverlay } from "components";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./style/theme";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <StatusOverlay />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/block/:height" component={BlockExplorer} />
                    <Route exact path="/data/:address/:offset?" component={DataExplorer} />
                    <Route exact path="/tx/:hash" component={TxExplorer} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
