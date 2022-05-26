import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, Dimmer, Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { aliceNetAdapter } from 'adapter/alicenetadapter';
import { CollapsableCard, AliceNetSearch, Page } from 'components'; 
import { BlockList } from './blockList'; 
import { TxHashList } from './txHashList'; 
import { ReactComponent as CubeIcon } from 'assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from 'assets/tx-hash-icon.svg';

export function BlockExplorer(props) {

    const [blockInfo, setBlockInfo] = useState(null);
    const [isLoading, setLoadingStatus] = useState(true);
    const history = useHistory();

    useSelector(s => s.aliceNetAdapter);

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);

        const getBlock = async () => {
            const height = params && params.height;

            if (height) {
                const block = await aliceNetAdapter.getBlock(height);
                setBlockInfo(block);
            }

            setLoadingStatus(false);
        }

        getBlock();
    }, [props.location]);

    const handleBlockNav = (term) => history.push(`/block?height=${term}`);

    if(isLoading) {
        return (
            <Page>
                <Grid>
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </Grid>
            </Page>
        );
    }

    // Conditional render
    if ((!isLoading && !blockInfo) || blockInfo.error) {
        return (
            <Page>
                <div className="mb-8">
                    <AliceNetSearch />
                </div>
                <Grid centered>
                    <Grid.Row stretched centered>
                        <Container>
                            <Segment>
                                <p>No Block to display!</p>
                            </Segment>
                        </Container>
                    </Grid.Row>
                </Grid>
            </Page>
        );
    }

    return (
        <Page>
            <div>
                <AliceNetSearch />
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
                    handleBlockNavLeft={() => handleBlockNav(blockInfo.BClaims.Height-1)}
                    handleBlockNavRight={() => handleBlockNav(blockInfo.BClaims.Height+1)}
                    maxHeight={aliceNetAdapter.blocks[0]?.BClaims.Height}
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
        </Page>
    );

}
