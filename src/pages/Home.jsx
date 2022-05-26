import React from 'react';
import { Container, Grid } from "semantic-ui-react";
import { AliceNetSearch, CallToAction, Page } from "components";
import { LatestBlocks } from "./LatestBlocks";
import { LatestTransactions } from "./LatestTransactions";

export function Home() {

    return (
        <Page>
            <Container fluid className="flex flex-col gap-10">
                <AliceNetSearch />
                <Container fluid className="flex flex-col gap-10">
                    <CallToAction
                        label="Real Blockchain Business Solutions"
                        buttonLabel="Learn More"
                        onClick={() => window.open('https://www.madnetwork.com/madnetwork-download-whitepaper')}
                    />
                    <Grid columns={2} className="m-0">
                        <Grid.Row className="py-0">
                            <Grid.Column className="pl-0">
                                <LatestBlocks />
                            </Grid.Column>
                            <Grid.Column className="pr-0">
                                <LatestTransactions />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Container>
        </Page>
    );

}