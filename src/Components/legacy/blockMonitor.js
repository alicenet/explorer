import React, { useContext, useEffect } from 'react';
import { Container, Segment, Grid, Dimmer, Loader } from 'semantic-ui-react';

function BlockMonitor(props) {
    // Store states
    const appContext = useContext(AppContext);
    const { madNetAdapter } = getContextState(appContext)

    // Start monitor when component mounts
    useEffect(() => {
        if (madNetAdapter && !madNetAdapter.blocksStarted) {
            madNetAdapter.monitorBlocks();
        }
        return () => { if (madNetAdapter) { madNetAdapter.blocksReset() } }
    }, [madNetAdapter]); // eslint-disable-line react-hooks/exhaustive-deps

    // Load blocks from madnet adapter
    const latestBlocks = () => {
        if (!madNetAdapter || !madNetAdapter.blocks || madNetAdapter.blocks.length <= 0) {
            return (<></>)
        }
        return madNetAdapter.blocks.slice(0, madNetAdapter.blocksMaxLen).map((e, i) => {
            return (
                <React.Fragment key={i}>
                    <Segment.Group raised className="blocks blockPad" onClick={() => madNetAdapter.viewBlock(e['BClaims']['Height'])} compact={true} >
                        <Segment textAlign="left">Height: {e['BClaims']['Height']}</Segment>
                        <Segment className="notifySegments" textAlign="left">Tx Count: {e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0}</Segment>
                        <Segment textAlign="left">Group Signature: 0x{e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}</Segment>
                    </Segment.Group>
                </React.Fragment>
            )
        });
    }

    if (!madNetAdapter.connected) {
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