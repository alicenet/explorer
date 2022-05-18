import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Segment, Grid, Dimmer, Loader, Button } from 'semantic-ui-react';
import queryString from 'query-string';
import { aliceNetAdapter } from 'adapter/alicenetadapter';
import { AliceNetSearch } from 'components';
import { TxViewVin, TxViewVout } from './txView'; 

export function TxExplorer(props) {
    const [txInfo, setTxInfo] = useState();
    const [isLoading, setLoadingStatus] = useState(true);
    const [isValid, setIsValid] = useState(true);

    const [txHash, setTxHash] = useState(false);

    const history = useHistory();

    const isValidHash = (hash) => hash && /^(0x)?([A-Fa-f0-9]{64})$/.test(hash);

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);
        
        const getTx = async () => {

            setIsValid(true);
            const hash = params && params.hash;

            if(isValidHash(hash)) {
                setTxHash(hash);
                const tx = await aliceNetAdapter.viewTransaction(hash);
                setTxInfo(tx);
            } else {
                setIsValid(false);
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
    if (!isLoading && (!txInfo || txInfo[1].error) ) {
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
                                    <p>No Tx to display!</p>
                                </Segment>
                            </Container>
                        </Grid.Row> :
                        <Grid.Row stretched centered>
                            <Container>
                                <Segment>
                                    <p>Improper format: Please input a valid <span className='info'>TX Hash</span> or <span className='info'>Blockheight</span></p>
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
            <Grid.Row stretched centered>
                <Container>
                    <div className='py-10 text-left'>
                        <div className='mb-2'>Tx Hash: {txHash}</div>
                        <div className='flex items-center mb-2'>
                            <div className='mr-2'>Height: {aliceNetAdapter.transactionHeight}</div>
                            <Button className='bg-primary rounded text-neutral-800' onClick={() => history.push('/data')}>View Owner DataStores</Button>
                        </div>
                    </div>
                </Container>
            </Grid.Row>
            <TxViewVin txInfo={txInfo[0].Vin}/>
            <TxViewVout txInfo={txInfo[0].Vout}/>
        </>
    )
}
