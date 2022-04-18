import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../AppContext/AppContext";
import { Container, Button, Form, Segment, Grid, Icon, Dimmer, Loader, Popup } from 'semantic-ui-react';
import Switch from "react-switch";
import Help from './help.js';

const queryString = require('query-string');

function TransactionExplorer(props) {
    // Store states
    const { store } = useContext(StoreContext);
    // Search hash
    const [txHash, setTxHash] = useState(false);
    const [rawVin, setRawVin] = useState(false);
    const [rawVout, setRawVout] = useState(false);

    // Setup query parameters
    useEffect(() => {
        let params = queryString.parse(props.states.location.search);
        if (params['txHash']) {
            store.madNetAdapter.viewTransaction(params['txHash']);
        }

        if (store.madNetAdapter.transactionHash) {
            props.states.history.replace({ pathname: 'tx', search: "?txHash=" + store.madNetAdapter.transactionHash })
        }
    }, []);

    // Update Vin/Vout
    const handleChange = (event, e) => {
        if (e === "rawVin") {
            setRawVin(event);
            return;
        }
        else if (e === "rawVout") {
            setRawVout(event);
            return;
        }
        setTxHash(event.target.value)
    }

    // Sumbit initial query params
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        props.states.history.replace({ pathname: 'tx', search: "?txHash=" + txHash })
        store.madNetAdapter.viewTransaction(txHash);
    }

    // Vin objects
    const vin = (data) => {
        if (rawVin) {
            return data.map((e, i) => {
                return (
                    <React.Fragment key={i}>
                        <Segment.Group raised className="txView" key={i}>
                            <Segment textAlign="left">
                                <pre>{JSON.stringify(e, null, 2)}</pre>
                                <Icon name="copy outline" className="click" onClick={() => props.states.copyText(JSON.stringify(e, null, 2))} />
                            </Segment>
                        </Segment.Group>
                        <br></br>
                    </React.Fragment>
                )
            });
        }
        else {
            return data.map((e, i) => {
                return (
                    <React.Fragment key={i}>
                        <Segment.Group raised className="txView" key={i}>
                            <Segment raised className="notifySegments" textAlign="left">{<Help type='consumedTx' />}Consumed Transaction: 0x{e['TXInLinker']['TXInPreImage']['ConsumedTxHash']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e['TXInLinker']['TXInPreImage']['ConsumedTxHash'])} /></Segment>
                            <Segment raised className="notifySegments" textAlign="left">{<Help type='consumedTxIndex' />}Consumed Transaction Index: {e['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ? e['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] : 0}</Segment>
                            <Segment raised className="notifySegments" textAlign="left">{<Help type='signature' />}Signature: 0x{e['Signature']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e['Signature'])} /></Segment>
                        </Segment.Group>
                        <br></br>
                    </React.Fragment>
                )
            });
        }
    }

    // Vout objects
    const vout = (data) => {
        if (rawVout) {
            return data.map((e, i) => {
                return (
                    <React.Fragment key={i}>
                        <Segment.Group raised className="txView" key={i} >
                            <Segment raised textAlign="left">
                                <pre>{JSON.stringify(e, null, 2)}</pre>
                                <Icon name="copy outline" className="click" onClick={() => props.states.copyText(JSON.stringify(e, null, 2))} />
                            </Segment>
                        </Segment.Group>
                        <br></br>
                    </React.Fragment>
                )
            });
        }
        else {
            return data.map((e, i) => {
                return (
                    <React.Fragment key={i}>
                        <Segment.Group raised className="txView" key={i}>
                            <Segment raised className="notifySegments" textAlign="left">{<Help type={Object.keys(e)[0]} />}{Object.keys(e)[0]}</Segment>
                            {voutFormatter(Object.keys(e)[0], e[Object.keys(e)[0]])}
                        </Segment.Group>
                        <br></br>
                    </React.Fragment>
                )
            });
        }
    }

    // Format Vout objects based on tx type
    const voutFormatter = (type, object) => {
        switch (type) {
            case "ValueStore":
                return (
                    <React.Fragment key={object['VSPreImage']['TXOutIdx']}>
                        <Segment className="notifySegments" textAlign="left">{<Help type='value' />}Value: {object['VSPreImage']['Value'] ? store.madNetAdapter.hexToInt(object['VSPreImage']['Value']) : 0}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='owner' />}Owner: 0x{object['VSPreImage']['Owner'].slice(4)}{isBN(object['VSPreImage']['Owner'])}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + object['VSPreImage']['Owner'])} /></Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='txIndex' />}Transaction Index: {object['VSPreImage']['TXOutIdx'] ? object['VSPreImage']['TXOutIdx'] : 0}</Segment>
                    </React.Fragment>
                );;
            case 'DataStore':
                return (
                    <React.Fragment key={object['DSLinker']['DSPreImage']['TXOutIdx']}>
                        <Segment className="notifySegments" textAlign="left">{<Help type='index' />}Index: 0x{object['DSLinker']['DSPreImage']['Index'] ? object['DSLinker']['DSPreImage']['Index'] : 0}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + object['DSLinker']['DSPreImage']['Index'])} /></Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='rawData' />}Raw Data: 0x{object['DSLinker']['DSPreImage']['RawData']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + object['DSLinker']['DSPreImage']['RawData'])} /></Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='owner' />}Owner: 0x{object['DSLinker']['DSPreImage']['Owner'].slice(4)}{isBN(object['DSLinker']['DSPreImage']['Owner'])}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + object['DSLinker']['DSPreImage']['Owner'])} /><Popup
                            trigger={<Icon className="click" name="external" onClick={() => { store.madNetAdapter.dsRedirected = { "address": object['DSLinker']['DSPreImage']['Owner'].slice(4), "offset": "", "bnCurve": object['DSLinker']['DSPreImage']['Owner'].slice(3, 4) === "1" ? false : true }; props.states.history.push('data') }} />}
                            content={'View Owner Datastores'}
                            position='top left'
                            hideOnScroll
                            style={{ zIndex: 9999999 }}
                        /></Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='epoch' />}Issued At: {object['DSLinker']['DSPreImage']['IssuedAt']}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='expires' />}Expires: {store.madNetAdapter.getDSExp(object['DSLinker']['DSPreImage']['RawData'], object['DSLinker']['DSPreImage']['Deposit'], object['DSLinker']['DSPreImage']['IssuedAt'])}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='deposit' />}Deposit: {store.madNetAdapter.hexToInt(object['DSLinker']['DSPreImage']['Deposit'])}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='txIndex' />}Transaction Index: {object['DSLinker']['DSPreImage']['TXOutIdx'] ? object['DSLinker']['DSPreImage']['TXOutIdx'] : 0}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='signature' />}Signature: 0x{object['Signature']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + object['Signature'])} /></Segment>
                    </React.Fragment>
                );;
            default:
                return (
                    <></>
                );;;
        }

    }

    // Identify if the owner is a bn address
    const isBN = (owner) => {
        let bn = owner.slice(3, 4);
        if (bn === "1") {
            return (
                <></>
            )
        }
        else {
            return (
                <><Icon fitted className="green" name="check circle"></Icon><Icon fitted>BN</Icon></>
            )
        }
    }

    // Get txData from madnet adapter
    const getData = () => {
        if (!store.madNetAdapter.transaction) {
            return (
                <Segment>
                    <p>No Transaction to display!</p>
                </Segment>
            )
        }
        else {
            return (
                <>
                    <Grid.Row textAlign="right">
                        <Form.Group className="txSwitch switch" inline>
                            <label className="b">JSON</label>
                            <Switch onColor="#4aec75" height={22} width={46} offColor="#ff6464" offHandleColor="#212121" onHandleColor="#f0ece2" onChange={(event) => { handleChange(event, "rawVin") }} checked={Boolean(rawVin)} />
                        </Form.Group>
                    </Grid.Row>
                    <h4>Vin</h4>
                    {vin(store.madNetAdapter.transaction["Vin"])}

                    <Grid.Row textAlign="right">
                        <Form.Group className="txSwitch switch" inline>
                            <label className="b">JSON</label>
                            <Switch onColor="#4aec75" height={22} width={46} offColor="#ff6464" offHandleColor="#212121" onHandleColor="#f0ece2" onChange={(event) => { handleChange(event, "rawVout") }} checked={Boolean(rawVout)} />
                        </Form.Group>
                    </Grid.Row>
                    <h4>Vout</h4>
                    {vout(store.madNetAdapter.transaction["Vout"])}
                </>
            )
        }
    }

    if (!store.madNetAdapter.connected) {
        return (
            <Dimmer page active={true}>
                <Loader>Loading Blocks</Loader>
            </Dimmer>
        )
    }
    else {
        // Render
        return (
            <Grid stretched centered>
                <Container textAlign="center"></Container>
                <Grid.Row stretched centered>
                    <Segment raised>
                        <Form fluid="true">
                            <Form.Group>
                                <Form.Input onChange={(event) => { handleChange(event) }} label='Tx Hash' placeholder='0x...' />
                            </Form.Group>
                            <Button color="blue" onClick={(event) => handleSubmit(event)}>Search</Button>
                        </Form>
                    </Segment>
                </Grid.Row>
                <Grid.Row centered>
                    <Container centered="true">
                        <h3>{store.madNetAdapter.transactionHash ? "Tx Hash: 0x" + store.madNetAdapter.transactionHash : ""} {store.madNetAdapter.transactionHash ? (<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.transactionHash)} />) : (<></>)}</h3>
                        <h4>{store.madNetAdapter.transactionHeight ? "Height: " + store.madNetAdapter.transactionHeight : ""} {store.madNetAdapter.transactionHeight ? (<Popup
                            trigger={<Icon className="click" name="external" onClick={() => store.madNetAdapter.viewBlock(store.madNetAdapter.transactionHeight)} />}
                            content={'View Block'}
                            position='top left'
                            hideOnScroll
                            style={{ zIndex: 9999999 }}
                        />) : (<></>)} </h4>
                        {getData()}
                    </Container>
                </Grid.Row>
            </Grid>
        )
    }
}
export default TransactionExplorer;