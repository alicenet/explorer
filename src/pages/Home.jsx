import React from "react";
import { Grid } from "semantic-ui-react";
import { AliceNetSearch, CallToAction, LatestBlocks, LatestTransactions, Page } from "components";

const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

export function Home() {

    return (

        <Page>
            <div className="flex flex-col gap-10">
                <AliceNetSearch />
                <div className="flex flex-col gap-10">
                    <CallToAction
                        label="Real Blockchain Business Solutions"
                        buttonLabel="Learn More"
                        onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                    />
                    <Grid stackable columns={2} className="m-0">
                        <Grid.Row className="py-0">
                            <Grid.Column className="pl-0">
                                <LatestBlocks />
                            </Grid.Column>
                            <Grid.Column className="pr-0">
                                <LatestTransactions />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </Page>

    );

}