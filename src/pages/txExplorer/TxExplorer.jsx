import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, Dimmer, Loader, Button } from "semantic-ui-react"
import queryString from 'query-string';
import { aliceNetAdapter } from '../../adapter/alicenetadapter';
import { AliceNetSearch } from '../../components';
import { TxViewVin, TxViewVout } from './txView'; 

export function TxExplorer(props) {
    const [txInfo, setTxInfo] = useState();
    const [isLoading, setLoadingStatus] = useState(true);

    const [txHash, setTxHash] = useState(false);

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);
        
        const getTx = async () => {
            const hash = params && params.hash;
            if (hash) {
                setTxHash(hash);
                const tx = await aliceNetAdapter.viewTransaction(hash);
                setTxInfo(tx);
            }

            setLoadingStatus(false);
        }
        
        getTx();
    }, [props.location]);


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
    if (!isLoading && !txInfo) {
        return (
            <Grid centered>
                <Grid.Row stretched centered>
                    <Container>
                        <Segment>
                            <p>No Tx to display!</p>
                        </Segment>
                    </Container>
                </Grid.Row>
            </Grid>
        )
    }

    return (
        <>
            <div className='mb-8'>
                <AliceNetSearch/>
            </div>
            <div className='p-10 text-left'>
                    <div className='mb-2'>Tx Hash: {txHash}</div>
                    <div className='flex items-center mb-2'>
                        <div className='mr-2'>Height: {aliceNetAdapter.transactionHeight}</div>
                        <Button className='bg-primary rounded text-neutral-800' onClick={() => {/*TODO go to datastores */}}>View Owner DataStores</Button>
                    </div>
                </div>
                <TxViewVin txInfo={txInfo[0].Vin}/>
                <TxViewVout txInfo={txInfo[0].Vout}/>
        </>
    )
}
