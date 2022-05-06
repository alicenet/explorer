import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid } from 'semantic-ui-react';
import { CallToAction, AliceNetSearch } from '../components';
import { LatestBlocks } from './LatestBlocks';
import { LatestTransactions } from './LatestTransactions';

export function Home() {
    const history = useHistory();
    return (
        <>
            <AliceNetSearch/>
            <Container>
                <CallToAction 
                    label="View our DataStore and experience history in the making" 
                    buttonLabel="View first datastore" 
                    onClick={() => history.push('/data')}/>
                <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column >
                        <LatestBlocks/>
                    </Grid.Column>
                    <Grid.Column >
                        <LatestTransactions/>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    )
}