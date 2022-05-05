import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { CallToAction, AliceNetSearch } from '../components';
import { LatestBlocks } from './LatestBlocks';
import { LatestTransactions } from './LatestTransactions';

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