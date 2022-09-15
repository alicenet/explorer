import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { Button } from "@mui/material";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import {
    CollapsableCard,
    CopyTooltip,
    InvalidInput,
    Page,
    SearchBar,
    SearchNotFound,
    TxViewVin,
    TxViewVout
} from "components";
import { isValidHash, searchTypes } from "utils";

import { ReactComponent as TreeIcon } from "assets/tree-icon.svg";
import { ReactComponent as ChoicesIcon } from "assets/choices-icon.svg";

export function TxExplorer() {

    const [txInfo, setTxInfo] = useState(null);
    const [isLoading, setLoadingStatus] = useState(true);

    const history = useHistory();
    const { hash } = useParams();

    useEffect(() => {
        const getTx = async () => {
            if (isValidHash(hash)) {
                const tx = await aliceNetAdapter.viewTransaction(hash);
                setTxInfo(tx);
            } else {
                setTxInfo({ error: "Invalid hash" });
            }
            setLoadingStatus(false);
        }
        getTx();
    }, [hash]);

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

            <div className="flex flex-col gap-10">

                <SearchBar currentSearch={{ type: searchTypes.TRANSACTIONS }} />

                {
                    !txInfo &&
                    <SearchNotFound />
                }

                {
                    txInfo && txInfo.error &&
                    <InvalidInput
                        term={hash}
                        suggestion={
                            <Link className="hover:text-neongreen hover:opacity-80" to="/">
                                Going back to Block Monitor
                            </Link>
                        }
                    />
                }
                {
                    txInfo && !txInfo.error && txInfo[0] !== undefined &&
                    <div className="flex flex-col gap-10">

                        <div className="flex flex-col px-3 gap-3 mobile:text-xl mobile:gap-6">

                            <div className="flex flex-row text-left gap-3 mobile:flex-col">
                                <span className="font-bold">Tx Hash:</span>
                                <CopyTooltip value={hash} content="Copy Hash">
                                    <p className="break-all">{`0x${hash}`}</p>
                                </CopyTooltip>
                            </div>

                            <div className="flex items-start gap-3 mobile:flex-col mobile:gap-6">

                                <div className="flex flex-row text-left gap-3 mobile:flex-col">
                                    <span className="font-bold">Height:</span>
                                    <span className="">{aliceNetAdapter.transactionHeight}</span>
                                </div>

                                <Button
                                    color={"secondary"}
                                    size={"small"}
                                    variant={"contained"}
                                    className="py-0 px-6 text-base mobile:w-full mobile:m-0 mobile:py-2 mobile:text-xl"
                                    onClick={() => history.push(`/block/${aliceNetAdapter.transactionHeight}`)}
                                >
                                    View Block
                                </Button>

                            </div>

                        </div>

                        <CollapsableCard
                            title="Vins"
                            icon={<TreeIcon />}
                            itemsCount={txInfo[0].Vin.length}
                        >
                            <TxViewVin txInfo={txInfo[0].Vin} />
                        </CollapsableCard>

                        <CollapsableCard
                            title="Vouts"
                            icon={<ChoicesIcon />}
                            itemsCount={txInfo[0].Vout.length}
                        >
                            <TxViewVout txInfo={txInfo[0].Vout} />
                        </CollapsableCard>

                    </div>
                }

            </div>

        </Page>

    );

}
