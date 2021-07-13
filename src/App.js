import React, { useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import './App.css';
import copy from 'copy-to-clipboard';
import MainView from './MainView.js';
import Errors from "./Components/errors.js";
import { Store } from './Store/store.js';

/**
 * Main App
 * <Store> used for context, allowing childern in <MainView/> to share Store state 
 */
function App() {
  // Toggle "dark" & "light" themes
  const themeToggle = (theme) => {
    if (theme === "dark") {
      window.setDark()
      setStyle(theme)
      return;
    }
    window.setLight()
    setStyle(theme)
  }

  const copyText = (text) => {
    copy(text, { format: 'text/plain' });
  }

  /**
 * Props for childern components to update main view
 * Refresh, Loading, Errors, Update View
 */
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [updateView, setUpdateView] = useState(0);
  const [activeMadnetPanel, setMadnetPanel] = useState(false);
  const [style, setStyle] = useState("dark");
  const madnetSetup = useRef(false);

  // Object for the props to be used in childern components
  const propStates = {
    isLoading,
    setLoading,
    isError,
    setError,
    updateView,
    setUpdateView,
    themeToggle,
    style,
    setStyle,
    madnetSetup,
    activeMadnetPanel,
    setMadnetPanel,
    copyText
  }

  // If home is needed
  //<Route exact path="/" render={(props) => <MainView states={{ ...propStates, ...props }} />} />
  //<Route exact path="/blocks" render={(props) => <MainView states={{ ...propStates, ...props }} />} />

return (
    <Container fluid>
      <Store>
        <Router>
          <Dimmer page active={Boolean(isLoading)}>
            <Loader>{String(isLoading)}</Loader>
          </Dimmer>
          <Errors states={propStates} />
          <Switch>
            <Route exact path={["/blocks", "/"]} render={(props) => <MainView states={{ ...propStates, ...props }} />} />
            <Route exact path="/block" render={(props) => <MainView states={{ ...propStates, ...props }} />} />
            <Route exact path="/tx" render={(props) => <MainView states={{ ...propStates, ...props }} />} />
            <Route exact path="/data" render={(props) => <MainView states={{ ...propStates, ...props }} />} />
            <Route exact path="/settings" render={(props) => <MainView states={{ ...propStates, ...props }} />} />
          </Switch>
        </Router>
      </Store>
    </Container>
  );
}

export default App;
