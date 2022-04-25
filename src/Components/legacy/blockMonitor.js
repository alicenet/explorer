import React, { useContext, useEffect } from 'react';
import { Container, Segment, Grid, Dimmer, Loader } from 'semantic-ui-react';

function BlockMonitor(props) {
    // Store states
    const { store } = useContext(StoreContext);

    // Start monitor when component mounts
    useEffect(() => {
        if (store && store.madNetAdapter && !store.madNetAdapter.blocksStarted) {
            store.madNetAdapter.monitorBlocks();
        }
        return () => { if (store && store.madNetAdapter) { store.madNetAdapter.blocksReset() } }
    }, [store.madNetAdapter]); // eslint-disable-line react-hooks/exhaustive-deps

    // Load blocks from madnet adapter
    const latestBlocks = () => {
        if (!store.madNetAdapter || !store.madNetAdapter.blocks || store.madNetAdapter.blocks.length <= 0) {
            return (<></>)
        }
        return store.madNetAdapter.blocks.slice(0, store.madNetAdapter.blocksMaxLen).map((e, i) => {
            return (
                <React.Fragment key={i}>
                    <Segment.Group raised className="blocks blockPad" onClick={() => store.madNetAdapter.viewBlock(e['BClaims']['Height'])} compact={true} >
                        <Segment textAlign="left">Height: {e['BClaims']['Height']}</Segment>
                        <Segment className="notifySegments" textAlign="left">Tx Count: {e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0}</Segment>
                        <Segment textAlign="left">Group Signature: 0x{e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}</Segment>
                    </Segment.Group>
                </React.Fragment>
            )
        });
    }

    if (!store.madNetAdapter.connected) {
        return (
            <Dimmer page active={true}>
                <Loader>Loading Blocks</Loader>
            </Dimmer>
        )
    }
    else {
        // Render
        return (
            <>
                <Grid stretched centered >
                    <Container textAlign="center"></Container>
                    <Grid.Row centered>
                        <Container key={props.states.updateView}>
                            {latestBlocks()}
                        </Container>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}

export default BlockMonitor; 