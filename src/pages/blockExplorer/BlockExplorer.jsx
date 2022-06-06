import React, { useEffect, useState } from "react";
import { Container, Dimmer, Grid, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { AliceNetSearch, BlockList, CollapsableCard, Page, TxHashList } from "components";
import { ReactComponent as CubeIcon } from "assets/cube-icon.svg";
import { ReactComponent as TxHashIcon } from "assets/tx-hash-icon.svg";
import { isValidBlockHeight, searchTypes } from "utils";

export function BlockExplorer() {

    const [blockInfo, setBlockInfo] = useState(null);
    const [isLoading, setLoadingStatus] = useState(true);

    const { height } = useParams();

    useSelector(s => s.aliceNetAdapter);

    const isValidHeight = (height) => {
        if (aliceNetAdapter.blocks.length > 0) { //is monitoring blocks
            return isValidBlockHeight(height) && height <= aliceNetAdapter.blocks[0].BClaims.Height;
        } else {
            aliceNetAdapter.startMonitoringBlocks();
        }
        return isValidBlockHeight(height);
    };

    useEffect(() => {
        const getBlock = async () => {
            if (isValidHeight(height)) {
                const block = await aliceNetAdapter.getBlock(height);
                setBlockInfo(block);
            } else {
                setBlockInfo({ error: "Invalid height" });
            }
            setLoadingStatus(false);
        }
        getBlock();
    }, [height]);


    if (isLoading) {
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

    return (

        <Page>

            <Container className="flex flex-col gap-10">

                <Container>

                    <AliceNetSearch currentSearch={{ type: searchTypes.BLOCKS }} />

                </Container>

                {
                    !blockInfo &&
                    <Container>
                        <Grid centered>
                            <Grid.Row stretched centered>
                                <Container>
                                    <p>No Block to display!</p>
                                </Container>
                            </Grid.Row>
                        </Grid>
                    </Container>
                }

                {
                    blockInfo && blockInfo.error &&
                    <Container>
                        <Grid centered>
                            <Grid.Row stretched centered>
                                <Container>
                                    <p>Improper Format!</p>
                                </Container>
                            </Grid.Row>
                        </Grid>
                    </Container>
                }

                {
                    blockInfo && !blockInfo.error &&
                    <CollapsableCard
                        title={`Block #${blockInfo.BClaims.Height}`}
                        icon={<CubeIcon />}
                        open={true}
                        disabled={false}
                    >
                        <BlockList blockInfo={blockInfo} />
                    </CollapsableCard>
                }

                {
                    blockInfo && !blockInfo.error &&
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
                }

            </Container>

        </Page>

    );

}
