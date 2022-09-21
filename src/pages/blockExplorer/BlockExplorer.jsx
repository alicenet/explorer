import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import {
    BlockList,
    CollapsableCard,
    InvalidInput,
    Page,
    SearchBar,
    SearchNotFound,
    TxHashList
} from "components";
import { ReactComponent as CubeIcon } from "assets/cube-icon.svg";
import { ReactComponent as TxHashIcon } from "assets/tx-hash-icon.svg";
import { isValidBlockHeight, searchTypes } from "utils";

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

            <div className="flex flex-col gap-10">

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
                            <Link
                                className="hover:text-neongreen hover:opacity-80"
                                to={`/block/${aliceNetAdapter.blocks[0]?.BClaims.Height}`}
                            >
                                {`Block Number (${aliceNetAdapter.blocks[0]?.BClaims.Height})`}
                            </Link>
                        }
                    />
                }

                {
                    blockInfo && !blockInfo.error &&
                    <CollapsableCard
                        title={`Block #${blockInfo.BClaims.Height}`}
                        icon={<CubeIcon />}
                    >
                        <BlockList blockInfo={blockInfo} />
                    </CollapsableCard>
                }

                {
                    blockInfo && !blockInfo.error && blockInfo.TxHshLst.length > 0 &&
                    <CollapsableCard
                        title="Transaction Hash List"
                        icon={<TxHashIcon />}
                    >
                        <TxHashList
                            txHshLst={blockInfo.TxHshLst}
                            txViewLink="/"
                        />
                    </CollapsableCard>
                }

            </div>

        </Page>

    );

}
