import React, { useContext, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { StoreContext } from "../Store/store.js";
import MadNetAdapter from "../Utils/madNetAdapter.js";
import { Button, Menu, Image, Grid } from 'semantic-ui-react';

import DataExplorer from './dataExplorer.js';
import BlockMonitor from './blockMonitor.js';
import BlockExplorer from './blockExplorer.js';
import TxExplorer from './txExplorer.js';
import Settings from './settings.js'
import Home from './home.js';

function MadNet(props) {
    // Store states
    const { store, actions } = useContext(StoreContext);
    // Check if madnet adapter connected
    const connectAttempt = useRef(false);
    // Update madnet adapter
    const update = useRef(false)

    // Add the madNetAdapter and initialize
    const addAdapter = async (forceConnect) => {
        if (!store.madNetAdapter ||
            forceConnect
        ) {
            let madNetAdapter = new MadNetAdapter(adapterCb, store.wallet, store.settings.madnetProvider);
            await madNetAdapter.init()
            await actions.addMadNetAdapter(madNetAdapter)
            update.current = false;
        }
    }

    // Updates for when component mounts or updates
    useEffect(() => {
        // Attempt to setup adapter if not previously instanced
        if (!store.madNetAdapter && !connectAttempt.current) {
            connectAttempt.current = true;
            addAdapter();
        }
        if (store.madNetAdapter &&
            store.settings.madnetProvider !== store.madNetAdapter.provider &&
            !update.current
        ) {
            update.current = true;
            addAdapter(true);
        }

    }, [props, actions, store.madNetAdapter]) // eslint-disable-line react-hooks/exhaustive-deps


    // Callback for the madNetAdapter to update the component
    const adapterCb = (event, data) => {
        props.states.setUpdateView((updateView) => ++updateView);
        switch (event) {
            case 'success':
                if (data) {
                    props.states.setNotify(data)
                }
                break;;
            case 'wait':
                props.states.setLoading(data);;
                return;;
            case 'error':
                props.states.setError(data);;
                break;;
            case 'view':
                props.states.history.push(data);;
                break;;
            default:
                console.log(event)
        }
        props.states.setLoading(false);
    }

    // Render sub menu view
    const view = (activeMadnetPanel) => {
        if (!activeMadnetPanel) {
            // No home currently exists, default to blocks
            activeMadnetPanel = 'blocks'
        }
        switch (activeMadnetPanel) {
            case 'home':
                return (<Home states={props.states} />);;
            case 'blocks':
                return (<BlockMonitor states={props.states} />);;
            case 'block':
                return (<BlockExplorer states={props.states} />);;
            case 'tx':
                return (<TxExplorer states={props.states} />);;
            case 'data':
                return (<DataExplorer states={props.states} />);;
            case 'settings':
                return (<Settings states={props.states} />);;
            default:
                // Home
                return (<></>);;
        }
    }

    return (
        <>
            <Grid>
                <Grid.Row centered>
                    <Menu pointing secondary compact>
                        <Menu.Item
                            as={Link}
                            to="blocks"
                            name="Monitor"
                            active={props.states.location.pathname.slice(1) === 'blocks' || props.states.location.pathname.slice(1) === ''}
                        />
                        <Menu.Item
                            as={Link}
                            to="block"
                            name="Block"
                            active={props.states.location.pathname.slice(1) === 'block'}
                        />
                        <Menu.Item
                            as={Link}
                            to="tx"
                            name="Tx"
                            active={props.states.location.pathname.slice(1) === 'tx'}
                        />
                        <Menu.Item
                            as={Link}
                            to="data"
                            name="Data"
                            active={props.states.location.pathname.slice(1) === 'data'}
                        />
                        <Menu.Item
                            as={Link}
                            to="settings"
                            name="Settings"
                            active={props.states.location.pathname.slice(1) === 'settings'}
                        />
                    </Menu>
                </Grid.Row>
                <Grid.Row centered>
                    {store.madNetAdapter.connected ? view(props.states.location.pathname.slice(1)) : props.states.location.pathname.slice(1) === 'settings' ? view(props.states.location.pathname.slice(1)) : <Button onClick={() => addAdapter(true)}>Reconnect</Button>}
                </Grid.Row>
            </Grid>
        </>
    )
}

export default MadNet;