import React, { useState, useEffect, useContext } from 'react';
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react"
import { StoreContext } from "../Store/store.js";
import BlockDetails from "./blockDetails/blockDetails";

const queryString = require('query-string');
// TODO Remove after integration
const MOCKED_TX = [
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3'
];

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

    const handleTxPopupClick = (e) => store.madNetAdapter.viewTransaction(e, true);

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
            <BlockDetails 
                txDrop={txDrop} 
                setTxDrop={setTxDrop}
                handleTxPopupClick={handleTxPopupClick} 
                // txHshLst={store.madNetAdapter.blockInfo['TxHshLst']}
                txHshLst={MOCKED_TX}
            />
        )
    }
}

export default BlockExplorer;