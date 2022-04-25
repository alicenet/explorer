import React, { useState, useEffect, useContext } from 'react';
import { Container, Segment, Accordion, Icon, List, Divider, Grid, Form, Button, Popup } from "semantic-ui-react"
import Help from './help.js';

const queryString = require('query-string');
// BlockModal display
function BlockExplorer(props) {
    const { store } = useContext(StoreContext);
    let [blockNumber, setBlockNumber] = useState(false);
    let [txDrop, setTxDrop] = useState(false);

    // Setup data on mount
    useEffect(() => {
        let params = queryString.parse(props.states.location.search);
        if (params['height']) {
            store.madNetAdapter.viewBlock(params['height']);
        }
        if (store.madNetAdapter.blockInfo) {
            props.states.history.replace(
                {
                    pathname: 'block',
                    search: '?height=' + store.madNetAdapter.blockInfo['BClaims']['Height']
                }
            );
        }
        setTxDrop(false);
    }, []);

    // Lookup specific block number
    const handleChange = (event) => {
        setBlockNumber(event.target.value);
    }

    // Sumbit initial query params
    const handleSubmit = async (event) => {
        event.preventDefault()
        store.madNetAdapter.viewBlock(blockNumber)
        props.states.history.replace(
            {
                pathname: 'block',
                search: '?height=' + blockNumber
            }
        );
    }

    // Display BlockData
    const txList = () => {
        if (!store.madNetAdapter.blockInfo['TxHshLst']) {
            return (<p></p>)
        }
        return store.madNetAdapter.blockInfo['TxHshLst'].map((e, i) => {
            return (
                <List.Item key={i}>
                    <Grid.Row>
                        0x{e}
                        <Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e)} />
                        <Popup
                            trigger={<Icon className="click" name="external" onClick={() => store.madNetAdapter.viewTransaction(e, true)} />}
                            content={'View Transaction'}
                            position='top left'
                            hideOnScroll
                            style={{ zIndex: 9999999 }}
                        />
                    </Grid.Row>
                </List.Item>
            )
        })
    }

    // Search for a block
    const search = () => {
        return (
            <Segment raised>
                <Form fluid="true">
                    <Form.Group>
                        <Form.Input onChange={(event) => { handleChange(event) }} label="Block Number" placeholder={store.madNetAdapter.currentBlock ? store.madNetAdapter.currentBlock : 1} />
                    </Form.Group>
                    <Button color="blue" onClick={(event) => handleSubmit(event)}>Find</Button>
                </Form>
            </Segment>
        )
    }

    // Conditional render
    if (!store.madNetAdapter.blockInfo) {
        return (
            <>
                <Grid centered>
                    <Grid.Row centered>
                        {search()}
                    </Grid.Row>
                    <Grid.Row stretched centered>
                        <Container>
                            <Segment>
                                <p>No Block to display!</p>
                            </Segment>
                        </Container>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
    else {
        return (
            <>
                <Grid centered>
                    <Grid.Row centered>
                        {search()}
                    </Grid.Row>
                    <Grid.Row stretched centered>
                        <Container>
                            <Segment.Group compact={true} >
                                <Segment className="notifySegments" textAlign="left">{<Help type='height' />}Height: {store.madNetAdapter.blockInfo['BClaims']['Height']}</Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='txCount' />}Transaction Count: {store.madNetAdapter.blockInfo['BClaims']['TxCount'] ? store.madNetAdapter.blockInfo['BClaims']['TxCount'] : 0}</Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='previousBlock' />}Previous Block: 0x{store.madNetAdapter.blockInfo['BClaims']['PrevBlock']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['PrevBlock'])} /></Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='txRoot' />}Transaction Root: 0x{store.madNetAdapter.blockInfo['BClaims']['TxRoot']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['TxRoot'])} /></Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='stateRoot' />}State Root: 0x{store.madNetAdapter.blockInfo['BClaims']['StateRoot']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['StateRoot'])} /></Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='headerRoot' />}Header Root: 0x{store.madNetAdapter.blockInfo['BClaims']['HeaderRoot']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['HeaderRoot'])} /></Segment>
                                <Segment className="notifySegments" textAlign="left">{<Help type='groupSignature' />}Group Signature: 0x{store.madNetAdapter.blockInfo['SigGroup']}<Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['SigGroup'])} /></Segment>
                                <Segment className="notifySegments" textAlign="left">
                                    <Accordion fluid styled>
                                        <Accordion.Title
                                            className={store.madNetAdapter.blockInfo['TxHshLst'] && store.madNetAdapter.blockInfo['TxHshLst'].length > 0 ? "" : "disableDrop"}
                                            active={txDrop}
                                            onClick={() => { if (store.madNetAdapter.blockInfo['TxHshLst'] && store.madNetAdapter.blockInfo['TxHshLst'].length > 0) { setTxDrop(!txDrop) } }}
                                        >
                                            <Icon name='dropdown' />
                                        Transaction Hash List
                                    </Accordion.Title>
                                        <Accordion.Content active={txDrop}>
                                            <List bulleted>
                                                <Divider />
                                                {txList()}
                                            </List>
                                        </Accordion.Content>
                                    </Accordion>

                                </Segment>
                            </Segment.Group>
                        </Container>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}
export default BlockExplorer;