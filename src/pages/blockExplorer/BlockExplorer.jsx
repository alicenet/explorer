import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, Dimmer, Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import { aliceNetAdapter } from 'adapter/alicenetadapter';
import { CollapsableCard, AliceNetSearch } from 'components'; 
import { BlockList } from './blockList'; 
import { TxHashList } from './txHashList'; 
import { ReactComponent as CubeIcon } from 'assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from 'assets/tx-hash-icon.svg';
import { useSelector } from 'react-redux';
import { isValidBlockHeight } from 'utils';

export function BlockExplorer(props) {
    const [blockInfo, setBlockInfo] = useState();
    const [isLoading, setLoadingStatus] = useState(true);

    const [isValid, setIsValid] = useState(true);

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    const isValidHeight = (height) => {
        if(aliceNetAdapter.blocks.length > 0) { //is monitoring blocks
            return isValidBlockHeight(height) && height <= aliceNetAdapter.blocks[0].BClaims.Height;
        }
        return isValidBlockHeight(height);
    }

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);
        
        const getBlock = async () => {
            setIsValid(true);
            const height = params && params.height;
            
            if(isValidHeight(height)) {
                const block = await aliceNetAdapter.getBlock(height);
                setBlockInfo(block);
            } else {
                setIsValid(false);
            }

            setLoadingStatus(false);
        }
        
        getBlock();
    }, [props.location]);

    // TODO remove console log after implementation
    const handleBlockNav = () => {};

    if(isLoading) {
        return (
            <Grid>
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            </Grid>
        )
    }

    // Conditional render
    if ((!isLoading && !blockInfo) || blockInfo.error) {
        return (
            <>
                <div className='mb-8'>
                    <AliceNetSearch/>
                </div>
                <Grid centered>
                    {isValid ? 
                            <Grid.Row stretched centered>
                                <Container>
                                    <Segment>
                                        <p>No Block to display!</p>
                                    </Segment>
                                </Container>
                            </Grid.Row> :
                            <Grid.Row stretched centered>
                                <Container>
                                    <Segment>
                                        <p>Improper format: Please input a valid <span className='info'>Block Height</span></p>
                                    </Segment>
                                </Container>
                            </Grid.Row>
                        }    
                </Grid>
            </>
        )
    }

    return (
        <>
            <div className='mb-8'>
                <AliceNetSearch/>
            </div>
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
