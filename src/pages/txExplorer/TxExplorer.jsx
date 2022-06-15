import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Container, Dimmer, Grid, Icon, Loader, Popup } from "semantic-ui-react";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { AliceNetSearch, CollapsableCard, InvalidInput, Page, SearchNotFound, TxViewVin, TxViewVout } from "components";
import { copyText, isValidHash, searchTypes } from "utils";

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

            <Container className="flex flex-col gap-10">

                <Container>

                    <AliceNetSearch currentSearch={{ type: searchTypes.TRANSACTIONS }} />

                </Container>

                {
                    (!txInfo || txInfo[0] === undefined) &&
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
                    txInfo && !txInfo.error && !txInfo[0] === undefined &&
                    <Container className="flex flex-col gap-10">

                        <Container className="flex flex-col gap-3">

                            <Container className="flex flex-row text-left gap-3">
                                <span className="font-bold">Tx Hash:</span>
                                <div className="flex items-start gap-3">
                                    <p className="break-all">{`0x${hash}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(hash)}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Container>

                            <Container className="flex flex-row gap-3 items-center justify-start">

                                <div className="flex flex-row text-left gap-3">
                                    <span className="font-bold">Height:</span>
                                    <span className="">{aliceNetAdapter.transactionHeight}</span>
                                </div>

                                <Button
                                    className="rounded-sm py-1 text-sm"
                                    onClick={() => history.push(`/block/${aliceNetAdapter.transactionHeight}`)}
                                    content="View Block"
                                />

                            </Container>

                        </Container>

                        <CollapsableCard
                            title="Vins"
                            icon={<TreeIcon />}
                            itemsCount={txInfo[0].Vin.length}
                        >
                            <TxViewVin txInfo={txInfo[0].Vin} />
                        </CollapsableCard>

                        <TxViewVout txInfo={txInfo[0].Vout} />

                    </Container>
                }

            </Container>

        </Page>

    );

}
