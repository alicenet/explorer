import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Container, Segment } from 'semantic-ui-react';
import queryString from 'query-string';
import { aliceNetAdapter } from '../../adapter/alicenetadapter';
import { CollapsableCard } from '../../components/CollapsableCard'; 
import { ReactComponent as FileIcon } from '../../assets/file-icon.svg';
import DataView from './DataView/DataView'; 

function DataExplorer(props) {
    useSelector(s => s.aliceNetAdapter);

    const [dsView, setDsView] = useState();

    useEffect(() => {
        const params = props.location && queryString.parse(props.location.search);

        const getDataStores = async () => {
            const address = params && params.address;

            if (address) {
                const [dataStores] = await aliceNetAdapter.getDataStoresForAddres(address);
                setDsView(dataStores);
            }
        }
        
        getDataStores();

        // let params = queryString.parse(props.states.location.search);
        // if (madNetAdapter.dsRedirected) {
        //     madNetAdapter.dsSearchOpts = madNetAdapter.dsRedirected;
        //     madNetAdapter.dsRedirected = false;
        //     handleSubmit();
        // } else if (params["address"]) {
        //     let querySearchOpts = { address: params['address'] }
        //     querySearchOpts['bnCurve'] = params['bnCurve'] ? true : false
        //     querySearchOpts['offset'] = params['offset'] ? params['offset'] : ""

        //     madNetAdapter.dsSearchOpts = querySearchOpts;
        //     handleSubmit();
        // }

        // if (madNetAdapter.dsSearchOpts) {
        //     let setParams = ""
        //     if (madNetAdapter.dsSearchOpts['address']) {
        //         setParams += "?address=" + madNetAdapter.dsSearchOpts['address']

        //         if (madNetAdapter.dsSearchOpts['bnCurve']) {
        //             setParams += "&bnCurve=" + madNetAdapter.dsSearchOpts['bnCurve']
        //         }

        //         if (madNetAdapter.dsSearchOpts['offset']) {
        //             setParams += "&offset=" + madNetAdapter.dsSearchOpts['offset']
        //         }
        //     }
        //     props.states.history.replace(
        //         {
        //             pathname: 'data',
        //             search: setParams
        //         }
        //     )
        // }
    }, []); 

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    }

    if (!dsView) {
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
                        viewTransaction="/" 
                        getDSExp={getDSExp} 
                    />
                </CollapsableCard>
            </Grid.Row>
        </Grid>
    )
}
export default DataExplorer;