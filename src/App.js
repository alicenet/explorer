// import MainView from './MainView.js';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { aliceNetAdapter } from "./adapter/alicenetadapter";
import './App.css';
// import ErrorOverlay from "./Components/ErrorOverlay.jsx";
// import DimmerLoader from "./Components/DimmerOverlay.jsx";
import { inspect } from 'util'
import { aliceNetAdapterEqualize, aliceNetWalletEqualize, incrementByAmount } from "./redux/reducers";
import { aliceNetProvider } from "./config/config";

/**
 * Main App
 */
function App() {

    return (
        <Container fluid>
            {/* <ErrorOverlay /> */}
            {/* <DimmerLoader /> */}
            <Router>
                <Switch>
                    <Route path="/" component={Test} />
                    {/* 
                    <Route exact path={["/blocks", "/"]} component={MainView} />
                    <Route exact path="/about" render={(props) => <MainView />} />
                        <Route exact path="/block" render={(props) => <MainView />} />
                        <Route exact path="/tx" render={(props) => <MainView />} />
                        <Route exact path="/data" render={(props) => <MainView />} />
                        <Route exact path="/settings" render={(props) => <MainView />} /> */}
                </Switch>
            </Router>
        </Container>
    );
}

export default App;


function Test() {

    const walletState = useSelector(state => (state.aliceNetWallet));
    const dispatch = useDispatch()

    const addRandomAccount = async () => {
        let pRaw = new Date().valueOf();
        let hash = await aliceNetAdapter.wallet.Utils.hash("0x" + pRaw.toString());
        await aliceNetAdapter.wallet.Account.addAccount(hash);
        dispatch(aliceNetWalletEqualize());
    }

    const countUp = async () => {
        dispatch(incrementByAmount(1));
    }

    return (
        <div style={{ textAlign: "left" }}>

            <h2>Wallet accounts</h2>
            {aliceNetAdapter.wallet.Account.accounts.length}

            <br />
            <button onClick={() => console.log(aliceNetAdapter)}>Print Adapter Instance</button>
            <button onClick={addRandomAccount}>addRandomAccount</button>
            <button onClick={countUp}>Icrement state counter</button>

        </div>
    )

}