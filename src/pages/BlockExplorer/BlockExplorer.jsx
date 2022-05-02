import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, } from "semantic-ui-react"
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { aliceNetAdapter } from '../../adapter/alicenetadapter';
import { CollapsableCard } from '../../components/CollapsableCard'; 
import { BlockList } from './BlockList'; 
import { TxHashList } from './TxHashList'; 
import { ReactComponent as CubeIcon } from '../../assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from '../../assets/tx-hash-icon.svg';

function BlockExplorer(props) {
    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    const [blockInfo, setBlockInfo] = useState();

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);
        
        const getBlock = async () => {
            const height = params && params.height;
            
            if (height) {
                const block = await aliceNetAdapter.getBlock(height);
                setBlockInfo(block);
            }
        }
        
        getBlock();
    }, [props.location]);

    // TODO remove console log after implementation
    const handleBlockNav = () => {};

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
                open={!blockInfo.TxHshLst.length}
                disabled={!blockInfo.TxHshLst.length}
            >
                <TxHashList 
                    txHshLst={blockInfo.TxHshLst} 
                    txViewLink="/" 
                />
            </CollapsableCard>
        </>
    )
}

export default BlockExplorer;