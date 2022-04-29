import React, { useState, useEffect, useContext } from 'react';
import { Container, Segment, Grid, } from "semantic-ui-react"
import queryString from 'query-string';
import { CollapsableCard } from '../../components/CollapsableCard'; 
import BlockList from './BlockList/BlockList'; 
import TxHashList from './TxHashList/TxHashList'; 
import { ReactComponent as CubeIcon } from '../../assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from '../../assets/tx-hash-icon.svg';

// TODO Remove after state implementation
const MOCKED_TX = [
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3',
    '0xd1b7b6968afede3ce9465658611ac367bcd1d9384736d0da11b32770c69680e3'
];

const BLOCK_INFO = {
    BClaims: {
        Height: 26471913,
        TxCount: 0,
        PrevBlock: '0x47c6da7a16299709352ada5fe01a7af2200488c586b236d617cd49059206db91',
        TxRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        StateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        HeaderRoot: '0x0000000000000000000000000000000000000000000000000000000000000000'
    },
    SigGroup: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    TxHshLst: MOCKED_TX
};

// BlockModal display
function BlockExplorer(props) {
    const [blockNumber, setBlockNumber] = useState(false);
    const blockInfo = BLOCK_INFO;
    const [txDrop, setTxDrop] = useState(false);

    // Setup data on mount
    useEffect(() => {
        let params = props.states && queryString.parse(props.states.location.search);
        // if (params['height']) {
        //     store.madNetAdapter.viewBlock(params['height']);
        // }

        // if (store.madNetAdapter.blockInfo) {
        //     props.states.history.replace(
        //         {
        //             pathname: 'block',
        //             search: '?height=' + store.madNetAdapter.blockInfo['BClaims']['Height']
        //         }
        //     );
        // }

        // setTxDrop(false);
    }, []);

    // Lookup specific block number
    const handleChange = (event) => setBlockNumber(event.target.value);

    // Sumbit initial query params
    const handleSubmit = async (event) => {
        // event.preventDefault()
        // store.madNetAdapter.viewBlock(blockNumber)
        // props.states.history.replace(
        //     {
        //         pathname: 'block',
        //         search: '?height=' + blockNumber
        //     }
        // );
    }

    // TODO define transaction handler
    const handleTxView = (e) => {};

    // TODO remove console log after implementation
    const handleBlockNav = () => console.log('block nav');

    // Conditional render
    if (!blockInfo) {
        return (
            <>
                <Grid centered>
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
                    txHshLst={blockInfo.TxHshLst} 
                    handleViewTransaction={handleTxView} 
                />
            </CollapsableCard>
        </>
    )
}

export default BlockExplorer;