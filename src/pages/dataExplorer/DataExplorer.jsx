import React, { useState, useEffect } from 'react';
import { Grid, Container, Segment, Loader, Dimmer } from 'semantic-ui-react';
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from 'adapter/alicenetadapter';
import { CollapsableCard,  DataStoreSearch } from 'components'; 
import { ReactComponent as FileIcon } from 'assets/file-icon.svg';
import { DataView } from './dataView'; 

export function DataExplorer(props) {
    const [dsView, setDsView] = useState();
    const [isLoading, setLoadingStatus] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);

        const getDataStores = async () => {
            const { address, offset, curve } = params;
            if (address) {
                try {
                    const [dataStores] = await aliceNetAdapter.getDataStoresForAddres(address, curve, offset);
                    setDsView(dataStores);
                } catch(error) {
                    console.log(error)
                }
                
            }

            setLoadingStatus(false);
        }
        
        getDataStores();
    }, [props.location]); 

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    }

    const handleViewOwner = async (txHash) => {
        history.push(`/tx?hash=${txHash}`);
    }

    if ((dsView?.error) || (!isLoading && (!dsView || !dsView.length))) {
        return (
            <>
                <div className='mb-8'>
                    <DataStoreSearch/>
                </div>
                <Grid centered>
                    <Grid.Row stretched centered>
                        <Container>
                            <Segment>
                                <p>No DataStores to display!</p>
                            </Segment>
                        </Container>
                    </Grid.Row>
                </Grid>
            </>
        );
    }

    if(isLoading) {
        return (
            <Grid>
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            </Grid>
        )
    }

    return (
        <>
            <div className='mb-8'>
                <DataStoreSearch/>
            </div>
            <Grid stretched centered={true}>
                <Grid.Row>
                    <CollapsableCard 
                        title="Indexes from Offset"
                        icon={<FileIcon />}
                        open={true}
                        disabled={false}
                        itemsCount={dsView && dsView.length}    
                    >
                        <DataView 
                            dsView={dsView} 
                            paginate={null}
                            handleViewOwner={handleViewOwner} 
                            getDSExp={getDSExp} 
                        />
                    </CollapsableCard>
                </Grid.Row>
            </Grid>
        </>
    )
}