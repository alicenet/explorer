import MainView from './MainView.js';
import React from "react";
import { AppProvider } from './AppContext/AppContext.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import './App.css';
import ErrorOverlay from "./Components/ErrorOverlay.jsx";
import DimmerLoader from "./Components/DimmerOverlay.jsx";

/**
 * Main App
 * <Store> used for context, allowing children in <MainView/> to share Store state
 */
function App() {

    return (
        <Container fluid>
            <AppProvider>
                <ErrorOverlay />
                <DimmerLoader />
                <Router>
                    <Switch>
                        <Route exact path={["/blocks", "/"]} component={<MainView />} />
                        {/* <Route exact path="/about" render={(props) => <MainView />} />
                        <Route exact path="/block" render={(props) => <MainView />} />
                        <Route exact path="/tx" render={(props) => <MainView />} />
                        <Route exact path="/data" render={(props) => <MainView />} />
                        <Route exact path="/settings" render={(props) => <MainView />} /> */}
                    </Switch>
                </Router>
            </AppProvider>
        </Container>
    );
}

export default App;
