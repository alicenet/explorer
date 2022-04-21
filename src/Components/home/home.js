import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CallToAction from '../callToAction';
import LatestBlocks from './latestBlocks';
import LatestTransactions from './latestBlocks';

function Home() {
    
    return (
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
    )
}
export default Home;