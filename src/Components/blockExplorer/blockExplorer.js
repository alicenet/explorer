import React, { useState, useEffect, useContext } from 'react';
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react"
import { StoreContext } from "../../Store/store.js";
import CollapsableCard from './collapsableCard/collapsableCard'; 
import BlockList from './blockList/blockList'; 
import TxHashList from './txHashList/txHashList'; 
import { ReactComponent as CubeIcon } from '../../Assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from '../../Assets/tx-hash-icon.svg';

// TODO Remove after state implementation
const MOCKED_TX = [
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3'
];

const queryString = require('query-string');

// BlockModal display
function BlockExplorer(props) {
    const { store } = useContext(StoreContext);
    const [blockNumber, setBlockNumber] = useState(false);
    const { blockInfo = {} } = store.madNetAdapter;
    const [txDrop, setTxDrop] = useState(false);

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

    // TODO define transaction handler
    const handleTxView = (e) => store.madNetAdapter.viewTransaction(e, true);

    // TODO remove console log after implementation
    const handleBlockNav = () => console.log('block nav');

    // Search for a block
    const search = () => {
        return (
            <Segment raised>
                <Form fluid="true">
                    <Form.Group>
                        <Form.Input 
                            onChange={(event) => { handleChange(event) }} 
                            label="Block Number" 
                            placeholder={store.madNetAdapter.currentBlock ? store.madNetAdapter.currentBlock : 1} 
                        />
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
                <CollapsableCard 
                    title={`Block #${blockInfo.BClaims.Height}`}
                    icon={<CubeIcon />}
                    open={true}
                    disabled={false}
                >
                    <BlockList 
                        height={blockInfo.BClaims.Height}
                        txCount={blockInfo.BClaims.TxCount}
                        prevBlock={blockInfo.BClaims.PrevBlock}
                        txRoot={blockInfo.BClaims.TxRoot}
                        stateRoot={blockInfo.BClaims.StateRoot}
                        headerRoot={blockInfo.BClaims.HeaderRoot}
                        sigGroup={blockInfo.SigGroup}
                        handleBlockNav={handleBlockNav} 
                    />
                </CollapsableCard>

                <CollapsableCard 
                    title="Transaction Hash List"
                    icon={<TxHashIcon />}
                    open={txDrop}
                    disabled={txDrop}
                >
                    <TxHashList 
                        // txHshLst={blockInfo.TxHshLst} 
                        txHshLst={MOCKED_TX} 
                        handleViewTransaction={handleTxView} 
                    />
                </CollapsableCard>
            </>
        )
    }
}

export default BlockExplorer;