import React, { useContext, useEffect } from 'react';
import { StoreContext } from "../../Store/store.js";
import { Container, Button, Form, Segment, Grid, Icon } from 'semantic-ui-react';
import Switch from "react-switch";
import CollapsableCard from '../common/collapsableCard/collapsableCard'; 
import { ReactComponent as FileIcon } from '../../Assets/file-icon.svg';
import DataView from './dataView/dataView'; 
import Help from '../help.js';

const queryString = require('query-string');

function DataExplorer(props) {
    // Store states
    const { store } = useContext(StoreContext);

    // Setup query parameters
    useEffect(() => {
        let params = queryString.parse(props.states.location.search);
        if (store.madNetAdapter.dsRedirected) {
            store.madNetAdapter.dsSearchOpts = store.madNetAdapter.dsRedirected;
            store.madNetAdapter.dsRedirected = false;
            handleSubmit();
        } else if (params["address"]) {
            let querySearchOpts = { address: params['address'] }
            querySearchOpts['bnCurve'] = params['bnCurve'] ? true : false
            querySearchOpts['offset'] = params['offset'] ? params['offset'] : ""

            store.madNetAdapter.dsSearchOpts = querySearchOpts;
            handleSubmit();
        }

        if (store.madNetAdapter.dsSearchOpts) {
            let setParams = ""
            if (store.madNetAdapter.dsSearchOpts['address']) {
                setParams += "?address=" + store.madNetAdapter.dsSearchOpts['address']

                if (store.madNetAdapter.dsSearchOpts['bnCurve']) {
                    setParams += "&bnCurve=" + store.madNetAdapter.dsSearchOpts['bnCurve']
                }

                if (store.madNetAdapter.dsSearchOpts['offset']) {
                    setParams += "&offset=" + store.madNetAdapter.dsSearchOpts['offset']
                }
            }
            props.states.history.replace(
                {
                    pathname: 'data',
                    search: setParams
                }
            )
        }
    }, [store.madNetAdapter.dsRedirected]); // eslint-disable-line react-hooks/exhaustive-deps

    // Update search params
    const handleChange = (event, e, v) => {
        let opts = JSON.parse(JSON.stringify(store.madNetAdapter.dsSearchOpts));
        if (e === "bnCurve") {
            opts[e] = event;
            store.madNetAdapter.setDsSearchOpts(opts);
            return;
        }
        opts[e] = event.target.value;
        store.madNetAdapter.setDsSearchOpts(opts);
    }

    // Handle next / previous page clicks
    const handlePage = (e) => {
        let page = store.madNetAdapter.dsActivePage + e

        if (store.madNetAdapter.dsActivePage > page) {
            store.madNetAdapter.setDsView(store.madNetAdapter.dsDataStores.slice(((page - 1) * store.madNetAdapter.DataPerPage), ((((page - 1) * store.madNetAdapter.DataPerPage) + store.madNetAdapter.DataPerPage))))
        }
        /*
        else if (store.madNetAdapter.dsActivePage < page &&
            (

                (store.madNetAdapter.DataPerPage * page) === store.madNetAdapter.dsDataStores.length
            )
        ) {
            store.madNetAdapter.setDsView(store.madNetAdapter.dsDataStores.slice((store.madNetAdapter.dsActivePage * store.madNetAdapter.DataPerPage), (((store.madNetAdapter.dsActivePage * store.madNetAdapter.DataPerPage) + store.madNetAdapter.DataPerPage))))
        }
*/
        else {
            store.madNetAdapter.getData(store.madNetAdapter.dsDataStores[store.madNetAdapter.dsDataStores.length - 1]["DSLinker"]["DSPreImage"]["Index"], page);
        }
        store.madNetAdapter.setDsActivePage(page);
    }

    // Sumbit initial query params
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (store.madNetAdapter.dsSearchOpts["address"] === "") {
            return;
        }
        store.madNetAdapter.setDsActivePage(1)
        store.madNetAdapter.getData(store.madNetAdapter.dsSearchOpts["offset"], 1, true);

        let setParams = ""
        if (store.madNetAdapter.dsSearchOpts['address']) {
            setParams += "?address=" + store.madNetAdapter.dsSearchOpts['address']

            if (store.madNetAdapter.dsSearchOpts['bnCurve']) {
                setParams += "&bnCurve=" + store.madNetAdapter.dsSearchOpts['bnCurve']
            }

            if (store.madNetAdapter.dsSearchOpts['offset']) {
                setParams += "&offset=" + store.madNetAdapter.dsSearchOpts['offset']
            }
        }
        props.states.history.replace(
            {
                pathname: 'data',
                search: setParams
            }
        )
    }

    // Pagination buttons
    const paginate = () => {
        if (store.madNetAdapter.dsDataStores.length < (store.madNetAdapter.DataPerPage + 1)) {
            return (
                <></>
            )
        }
        else {
            return (
                <>
                    <Button onClick={() => handlePage(-1)} disabled={Boolean(store.madNetAdapter.dsActivePage === 1)} color="blue" icon>
                        <Icon name='angle left' />
                    </Button>
                    <Button onClick={() => handlePage(1)} disabled={Boolean((store.madNetAdapter.dsActivePage * store.madNetAdapter.DataPerPage) > store.madNetAdapter.dsDataStores.length || store.madNetAdapter.dsLock)} color="blue" icon>
                        <Icon name='angle right' />
                    </Button>
                </>
            )
        }
    }

    // Render
    return (
        <Grid stretched centered={true}>
            <Container textAlign="center"></Container>
            <Grid.Row stretched centered={true}>
                <Segment raised>
                    <Form fluid="true">
                        <Form.Group>
                            <Form.Input value={store.madNetAdapter.dsSearchOpts["address"]} onChange={(event, data) => { handleChange(event, "address", data) }} label='Address' placeholder='0x...' />
                            <Form.Input value={store.madNetAdapter.dsSearchOpts["offset"]} onChange={(event, data) => { handleChange(event, "offset", data) }} label='Offset' placeholder='0x...' />
                        </Form.Group>
                        <Form.Field>
                            <Form.Group className="switch" inline>
                                <label>BN Address{<Help type='bn' />}</label>
                                <Switch value={Boolean(store.madNetAdapter.dsSearchOpts['bnCurve'])} onColor="#4aec75" height={22} width={46} offColor="#ff6464" offHandleColor="#212121" onHandleColor="#f0ece2" onChange={(event, data) => { handleChange(event, "bnCurve", data) }} checked={Boolean(store.madNetAdapter.dsSearchOpts["bnCurve"])} />
                            </Form.Group>
                        </Form.Field>
                        <Button color="blue" onClick={(event) => handleSubmit(event)}>Browse</Button>
                    </Form>
                </Segment>
            </Grid.Row>

            <Grid.Row>
                <CollapsableCard 
                    title="Indexes from Offset"
                    icon={<FileIcon />}
                    open={true}
                    disabled={false}
                    itemsCount={store.madNetAdapter.dsView.length}    
                >
                    <DataView 
                        store={store} 
                        dsView={store.madNetAdapter.dsView} 
                        dsDataStores={store.madNetAdapter.dsDataStores} 
                        paginate={paginate}
                        viewTransaction={store.madNetAdapter.viewTransaction} 
                        getDSExp={store.madNetAdapter.getDSExp} 
                        {...props} 
                    />
                </CollapsableCard>
            </Grid.Row>
        </Grid>
    )
}
export default DataExplorer;