import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CallToAction from '../components/callToAction';
import LatestBlocks from '../components/latestBlocks';
import LatestTransactions from '../components/latestTransactions';
import AliceNetSearch from "../components/search";

export function Home() {
    
    return (
        <>
            <AliceNetSearch />
            <Container>
                <CallToAction 
                    label="View our DataStore and experience history in the making" 
                    buttonLabel="View first datastore" 
                    onClick={() => {/*TODO handle button click */}}/>
                <Grid centered columns='equal'>
                    <Grid.Column >
                        <LatestBlocks/>
                    </Grid.Column>
                    <Grid.Column >
                        <LatestTransactions/>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}