import React, { useState, useEffect } from 'react';
import { Grid, Container, Segment, Loader, Dimmer } from 'semantic-ui-react';
import queryString from 'query-string';
import { aliceNetAdapter } from '../../adapter/alicenetadapter';
import { CollapsableCard } from '../../components/CollapsableCard'; 
import { ReactComponent as FileIcon } from '../../assets/file-icon.svg';
import DataView from './DataView/DataView'; 

function DataExplorer(props) {
    const [dsView, setDsView] = useState();
    const [isLoading, setLoadingStatus] = useState(true);

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);

        const getDataStores = async () => {
            const address = params && params.address;

            if (address) {
                const [dataStores] = await aliceNetAdapter.getDataStoresForAddres(address);
                setDsView(dataStores);
            }

            setLoadingStatus(false);
        }
        
        getDataStores();
    }, [props.location]); 

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    }

    const handleViewOwner = async (txHash) => {
        return aliceNetAdapter.viewTransaction(txHash);
        // TODO handle view owner datastores
    }

    if (!isLoading && (!dsView || !dsView.length)) {
        return (
            <>
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
    )
}
export default DataExplorer;