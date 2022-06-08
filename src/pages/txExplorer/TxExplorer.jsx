import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { AliceNetSearch, Page, TxViewVin, TxViewVout } from "components";
import { isValidHash } from "utils";

export function TxExplorer() {

    const [txInfo, setTxInfo] = useState();
    const [isLoading, setLoadingStatus] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [txHash, setTxHash] = useState(false);

    const history = useHistory();
    const { hash } = useParams();

    useEffect(() => {
        const getTx = async () => {
            setIsValid(true);

            if (isValidHash(hash)) {
                setTxHash(hash);
                const tx = await aliceNetAdapter.viewTransaction(hash);
                setTxInfo(tx);
            } else {
                setIsValid(false);
            }
            setLoadingStatus(false);
        }

        getTx();
    }, [hash]);

    if (isLoading) {
        return (

            <Grid>
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            </Grid>

        );
    }

    // Conditional render
    if (!isLoading && (!txInfo || txInfo[1].error)) {
        return (

            <Page>
                <div className="mb-8">
                    <AliceNetSearch />
                </div>
                <Grid centered>
                    {isValid ?
                        <Grid.Row stretched centered>
                            <Container>
                                <Segment>
                                    <p>No Tx to display!</p>
                                </Segment>
                            </Container>
                        </Grid.Row> :
                        <Grid.Row stretched centered>
                            <Container>
                                <Segment>
                                    <p>Improper format: Please input a valid
                                        <span className='info'>TX Hash</span>
                                    </p>
                                </Segment>
                            </Container>
                        </Grid.Row>
                    }
                </Grid>
            </Page>

        );
    }

    return (

        <Page>
            <div className="mb-8">
                <AliceNetSearch />
            </div>
            <Grid.Row stretched centered>
                <Container>
                    <div className="py-10 text-left">
                        <div className="mb-2">Tx Hash: {txHash}</div>
                        <div className="flex items-center mb-2">
                            <div className="mr-2">Height: {aliceNetAdapter.transactionHeight}</div>
                            <Button
                                className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                                onClick={() => history.push('/data')}
                                content="View Block"
                            />
                        </div>
                    </div>
                </Container>
            </Grid.Row>
            <TxViewVin txInfo={txInfo[0].Vin} />
            <TxViewVout txInfo={txInfo[0].Vout} />
        </Page>

    );

}
