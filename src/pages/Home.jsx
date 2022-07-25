import React from "react";
import { Grid } from "semantic-ui-react";
import { CallToAction, LatestBlocks, LatestTransactions, Page, SearchBar } from "components";

export const Home = () => {

    return (

        <Page>
            <div className="flex flex-col gap-10">
                <SearchBar />
                <div className="flex flex-col gap-10">
                    <CallToAction />
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