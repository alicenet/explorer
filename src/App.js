import DimmerLoader from "components/DimmerOverlay";
import ErrorOverlay from "components/ErrorOverlay";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { aliceNetAdapter } from "./adapter/alicenetadapter";
import { AliceNetMenu, Footer } from "./components";
import { BlockExplorer, DataExplorer, Home, TxExplorer } from "./pages";
import { aliceNetWalletEqualize } from "./redux/reducers";

function App() {
    return (
        <Container fluid className='mb-32'>
            <ErrorOverlay />
            <DimmerLoader />
            <Router>
                <AliceNetMenu />
                <Switch>
                    <Route exact path={["/blocks", "/"]} component={Home} />
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/block" component={BlockExplorer} />
                    <Route exact path="/data" component={DataExplorer} />
                    <Route exact path="/tx" component={TxExplorer} />
                </Switch>
            </Router>
            <Footer />
        </Container>
    );
}

export default App;


function Test() {

    let [block, setBlock] = React.useState({})

    //let walletState = useSelector(state => state.aliceNetWallet);
    // Must be used to propagate UI updates from the class being watched
    // -- State is minified as a string and serialized to represent state changes but will not be accessible as an object tree 
    // Wallet accounts won't work without connecting the serialized state to propagate UI updates

    const adapterState = useSelector(state => state.aliceNetAdapter); // If normal serializable state is to be read directly we can assign to a var
    const dispatch = useDispatch();

    const getBlock = async (blockNum) => {
        let block = await aliceNetAdapter.getBlock(blockNum);
        setBlock(block);
        console.log(block);
    }

    const getCurrentBlock = async () => {
        let block = await aliceNetAdapter.getCurrentBlock();
        setBlock(block);
        console.log(block);
    }

    const addRandomAccount = async () => {
        let pRaw = new Date().valueOf();
        let hash = await aliceNetAdapter.wallet.Utils.hash("0x" + pRaw.toString());
        await aliceNetAdapter.wallet.Account.addAccount(hash);
        dispatch(aliceNetWalletEqualize());
    }

    const attemptConnect = async () => {
        await aliceNetAdapter.init();
    }

    const printDataStoresForAddress = async (address, curve = 1) => {
        let dstores = await aliceNetAdapter.getDataStoresForAddres(address, curve);
        console.log(dstores);
    }

    return (
        <div style={{ textAlign: "left" }}>

            <h2>Wallet accounts</h2>
            {aliceNetAdapter.wallet.Account.accounts.length}

            <br />
            <button onClick={() => console.log(aliceNetAdapter)}>Print Adapter Instance</button>
            <br />
            <button onClick={addRandomAccount}>addRandomAccount</button>

            <h2>Connection State</h2>
            <div>Busy: {adapterState.busy}</div>
            <div>Error: {adapterState.error}</div>
            <div>Connected: {adapterState.connected}</div>

            <button onClick={attemptConnect}>attempt connect</button>

            <h4>Block Monitoring</h4>

            <div>BlockMonitoringEnabled: {String(aliceNetAdapter.blocksMonitoringEnabled)}</div>

            <button onClick={() => aliceNetAdapter.startMonitoringBlocks()}>Start Monitor</button>
            <button onClick={() => aliceNetAdapter.stopMonitoringBlocks()}>Stop Monitor</button>
            <button onClick={() => aliceNetAdapter.resetBlockMonitor()}>Reset Monitor</button>

            {aliceNetAdapter.blocks.map(block =>
                <div key={block["BClaims"].Height}>{block["BClaims"].Height}</div>
            )}

            <h4>Get Current Block</h4>

            <button onClick={() => getCurrentBlock()}>Get Block: Current: {block?.BClaims?.Height}</button>
            <br />
            <button onClick={() => getBlock(178000)}>Get Block: 178000: {block?.BClaims?.Height}</button>

            <h4>DataStores</h4>
            <button onClick={() => printDataStoresForAddress("eeacfc737e72fdf2518fb58c0a620f783eb2515f")}>
                Get Datastores for address (See code)
            </button>
            <br />

        </div>
    )

}