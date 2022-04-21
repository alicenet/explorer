import React, { useContext, useRef, useEffect } from 'react';
import { AppContext, actions, getContextState } from "../AppContext/AppContext";
import { Button } from 'semantic-ui-react';
import DataExplorer from './dataExplorer.js';
import BlockMonitor from './blockMonitor.js';
import BlockExplorer from './blockExplorer.js';
import TxExplorer from './txExplorer.js';
import Settings from './settings.js'
import { useHistory, useLocation } from 'react-router';

function MainContent(props) {

    const location = useLocation();
    const history = useHistory();

    // Store states
    const appContext = useContext(AppContext);
    const { madNetAdapter, settings, wallet } = getContextState(appContext)

    // Check if madnet adapter connected
    const connectAttempt = useRef(false);

    // Callback for the madNetAdapter to update the component
    const adapterCb = (event, data) => {
        switch (event) {
            case 'success':
                if (data) {
                    console.log(data)
                    props.states.setNotify(data) // Not sure yet..
                }
                break;;
            case 'wait':
                actions.setLoading(appContext, data);;
                return;;
            case 'error':
                actions.setError(appContext, data);;
                break;;
            case 'view':
                history.push(data);;
                break;;
            default:
                console.log(event)
        }
    }

    // Updates for when component mounts or updates
    useEffect(() => {
        // Attempt to setup adapter if not previously instanced
        if (!madNetAdapter && !connectAttempt.current) {
            connectAttempt.current = true;
            addAdapter();
        }
        if (madNetAdapter &&
            settings.madnetProvider !== madNetAdapter.provider
        ) {
            addAdapter(true);
        }

    }, [props, actions, madNetAdapter]) // eslint-disable-line react-hooks/exhaustive-deps


    // Add the madNetAdapter and initialize
    const addAdapter = async (forceConnect) => {
        if (!madNetAdapter ||
            forceConnect
        ) {
            let aliceNetAdapter = new MadNetAdapter();
            await aliceNetAdapter.init(appContext, wallet, settings.aliceNetProvider)
            actions.setAliceNetAdapter(appContext, aliceNetAdapter)
        }
    }

    // Render sub menu view
    const view = (activeMadnetPanel) => {
        if (!activeMadnetPanel) {
            // No home currently exists, default to blocks
            activeMadnetPanel = 'blocks'
        }
        switch (activeMadnetPanel) {
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

    return <>{madNetAdapter && madNetAdapter.connected ? view(location.pathname.slice(1)) : location.pathname.slice(1) === 'settings' ? view(location.pathname.slice(1)) : <Button onClick={() => addAdapter(true)}>Reconnect</Button>}</>
}

export default MainContent;