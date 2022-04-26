import React, { useContext, useEffect } from 'react';
import { Container, Button, Form, Segment, Card, Grid, Icon, Popup } from 'semantic-ui-react';
import Switch from "react-switch";
import Help from './help.js';

const queryString = require('query-string');

function DataExplorer(props) {
    // Store states
    const appContext = useContext(AppContext);
    const { madNetAdapter } = getContextState(appContext);

    // Setup query parameters
    useEffect(() => {
        let params = queryString.parse(props.states.location.search);
        if (madNetAdapter.dsRedirected) {
            madNetAdapter.dsSearchOpts = madNetAdapter.dsRedirected;
            madNetAdapter.dsRedirected = false;
            handleSubmit();
        } else if (params["address"]) {
            let querySearchOpts = { address: params['address'] }
            querySearchOpts['bnCurve'] = params['bnCurve'] ? true : false
            querySearchOpts['offset'] = params['offset'] ? params['offset'] : ""

            madNetAdapter.dsSearchOpts = querySearchOpts;
            handleSubmit();
        }

        if (madNetAdapter.dsSearchOpts) {
            let setParams = ""
            if (madNetAdapter.dsSearchOpts['address']) {
                setParams += "?address=" + madNetAdapter.dsSearchOpts['address']

                if (madNetAdapter.dsSearchOpts['bnCurve']) {
                    setParams += "&bnCurve=" + madNetAdapter.dsSearchOpts['bnCurve']
                }

                if (madNetAdapter.dsSearchOpts['offset']) {
                    setParams += "&offset=" + madNetAdapter.dsSearchOpts['offset']
                }
            }
            props.states.history.replace(
                {
                    pathname: 'data',
                    search: setParams
                }
            )
        }
    }, [madNetAdapter.dsRedirected]); // eslint-disable-line react-hooks/exhaustive-deps

    // Update search params
    const handleChange = (event, e, v) => {
        let opts = JSON.parse(JSON.stringify(madNetAdapter.dsSearchOpts));
        if (e === "bnCurve") {
            opts[e] = event;
            madNetAdapter.setDsSearchOpts(opts);
            return;
        }
        opts[e] = event.target.value;
        madNetAdapter.setDsSearchOpts(opts);
    }

    // Handle next / previous page clicks
    const handlePage = (e) => {
        let page = madNetAdapter.dsActivePage + e

        if (madNetAdapter.dsActivePage > page) {
            madNetAdapter.setDsView(madNetAdapter.dsDataStores.slice(((page - 1) * madNetAdapter.DataPerPage), ((((page - 1) * madNetAdapter.DataPerPage) + madNetAdapter.DataPerPage))))
        }
        /*
        else if (madNetAdapter.dsActivePage < page &&
            (

                (madNetAdapter.DataPerPage * page) === madNetAdapter.dsDataStores.length
            )
        ) {
            madNetAdapter.setDsView(madNetAdapter.dsDataStores.slice((madNetAdapter.dsActivePage * madNetAdapter.DataPerPage), (((madNetAdapter.dsActivePage * madNetAdapter.DataPerPage) + madNetAdapter.DataPerPage))))
        }
*/
        else {
            madNetAdapter.getData(madNetAdapter.dsDataStores[madNetAdapter.dsDataStores.length - 1]["DSLinker"]["DSPreImage"]["Index"], page);
        }
        madNetAdapter.setDsActivePage(page);
    }

    // Sumbit initial query params
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (madNetAdapter.dsSearchOpts["address"] === "") {
            return;
        }
        madNetAdapter.setDsActivePage(1)
        madNetAdapter.getData(madNetAdapter.dsSearchOpts["offset"], 1, true);

        let setParams = ""
        if (madNetAdapter.dsSearchOpts['address']) {
            setParams += "?address=" + madNetAdapter.dsSearchOpts['address']

            if (madNetAdapter.dsSearchOpts['bnCurve']) {
                setParams += "&bnCurve=" + madNetAdapter.dsSearchOpts['bnCurve']
            }

            if (madNetAdapter.dsSearchOpts['offset']) {
                setParams += "&offset=" + madNetAdapter.dsSearchOpts['offset']
            }
        }
        props.states.history.replace(
            {
                pathname: 'data',
                search: setParams
            }
        )
    }



    // View search results
    const dataView = () => {
        if (madNetAdapter.dsView.length > 0) {
            return madNetAdapter.dsView.map(function (e, i) {
                return (
                    <Segment.Group style={{ maxWidth: "708.02px", minWidth: "708.02px" }} compact={true} key={i}>
                        <Segment className="notifySegments" textAlign="left">{<Help type='index' />}Index: 0x{e["DSLinker"]["DSPreImage"]["Index"]} <Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e["DSLinker"]["DSPreImage"]["Index"])} /> </Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='rawData' />}Data: 0x{e["DSLinker"]["DSPreImage"]["RawData"]} <Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e["DSLinker"]["DSPreImage"]["RawData"])} /> </Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='expires' />}Expires: {madNetAdapter.getDSExp(e['DSLinker']['DSPreImage']['RawData'], e['DSLinker']['DSPreImage']['Deposit'], e['DSLinker']['DSPreImage']['IssuedAt'])}</Segment>
                        <Segment className="notifySegments" textAlign="left">{<Help type='txHash' />}Transaction Hash: 0x{e["DSLinker"]["TxHash"]} <Icon name="copy outline" className="click" onClick={() => props.states.copyText("0x" + e["DSLinker"]["TxHash"])} />                     <Popup
                            trigger={<Icon className="click" name="external" onClick={() => madNetAdapter.viewTransaction(e["DSLinker"]["TxHash"], true)} />}
                            content={'View Transaction'}
                            position='top left'
                            hideOnScroll
                            style={{ zIndex: 9999999 }}
                        /></Segment>
                    </Segment.Group>
                )
            });
        }
        else {
            return (<></>)
        }
    }

    // Pagination buttons
    const paginate = () => {
        if (madNetAdapter.dsDataStores.length < (madNetAdapter.DataPerPage + 1)) {
            return (
                <></>
            )
        }
        else {
            return (
                <>
                    <Button onClick={() => handlePage(-1)} disabled={Boolean(madNetAdapter.dsActivePage === 1)} color="blue" icon>
                        <Icon name='angle left' />
                    </Button>
                    <Button onClick={() => handlePage(1)} disabled={Boolean((madNetAdapter.dsActivePage * madNetAdapter.DataPerPage) > madNetAdapter.dsDataStores.length || madNetAdapter.dsLock)} color="blue" icon>
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
                            <Form.Input value={madNetAdapter.dsSearchOpts["address"]} onChange={(event, data) => { handleChange(event, "address", data) }} label='Address' placeholder='0x...' />
                            <Form.Input value={madNetAdapter.dsSearchOpts["offset"]} onChange={(event, data) => { handleChange(event, "offset", data) }} label='Offset' placeholder='0x...' />
                        </Form.Group>
                        <Form.Field>
                            <Form.Group className="switch" inline>
                                <label>BN Address{<Help type='bn' />}</label>
                                <Switch value={Boolean(madNetAdapter.dsSearchOpts['bnCurve'])} onColor="#4aec75" height={22} width={46} offColor="#ff6464" offHandleColor="#212121" onHandleColor="#f0ece2" onChange={(event, data) => { handleChange(event, "bnCurve", data) }} checked={Boolean(madNetAdapter.dsSearchOpts["bnCurve"])} />
                            </Form.Group>
                        </Form.Field>
                        <Button color="blue" onClick={(event) => handleSubmit(event)}>Browse</Button>
                    </Form>
                </Segment>
            </Grid.Row>
            <Grid.Row>
                <Container>
                    <Segment raised>
                        {madNetAdapter.dsDataStores.length === 0
                            ?
                            <p>No DataStores to display!</p>
                            :
                            <Card.Group centered={true}>
                                {dataView()}
                            </Card.Group>
                        }
                    </Segment>
                    {paginate()}
                </Container>
            </Grid.Row>
        </Grid>
    )
}
export default DataExplorer;