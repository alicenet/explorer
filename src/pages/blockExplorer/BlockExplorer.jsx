import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { BlockList, InvalidInput, Page, PrimaryAccordion, SearchBar, SearchNotFound, TxHashList } from "components";
import { ReactComponent as CubeIcon } from "assets/cube-icon.svg";
import { ReactComponent as TxHashIcon } from "assets/tx-hash-icon.svg";
import { isValidBlockHeight, searchTypes } from "utils";
import { Box, Typography } from "@mui/material";

export function BlockExplorer() {

    const [blockInfo, setBlockInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        }
        getBlock();
    }, [height]);

    if (isLoading) {
        return null;
    }

    return (

        <Page>

            <Box display="flex" flexDirection="column" gap={4}>

                <SearchBar currentSearch={{ type: searchTypes.BLOCKS }} />

                {
                    !blockInfo &&
                    <SearchNotFound />
                }

                {
                    blockInfo && blockInfo.error &&
                    <InvalidInput
                        term={height}
                        suggestion={
                            aliceNetAdapter.blocks[0]?.BClaims.Height &&
                            <Typography variant={"span"} sx={{ ":hover": { opacity: 0.8 } }}>
                                <Link to={`/block/${aliceNetAdapter.blocks[0]?.BClaims.Height}`}>
                                    {`Block Number (${aliceNetAdapter.blocks[0]?.BClaims.Height})`}
                                </Link>
                            </Typography>
                        }
                    />
                }

                {
                    blockInfo && !blockInfo.error &&
                    <PrimaryAccordion title={`Block #${blockInfo.BClaims.Height}`} icon={<CubeIcon />}>
                        <BlockList blockInfo={blockInfo} />
                    </PrimaryAccordion>
                }

                {
                    blockInfo && !blockInfo.error && blockInfo.TxHshLst.length > 0 &&
                    <PrimaryAccordion title="Transaction Hash List" icon={<TxHashIcon />}>
                        <TxHashList txHshLst={blockInfo.TxHshLst} txViewLink="/" />
                    </PrimaryAccordion>
                }

            </Box>

        </Page>

    );

}
