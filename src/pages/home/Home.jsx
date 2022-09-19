import React from "react";
import { CallToAction, LatestBlocks, LatestTransactions, Page, SearchBar } from "components";
import { Grid } from "@mui/material";

export const Home = () => {

    return (

        <Page>
            <div className="flex flex-col gap-10">
                <SearchBar />
                <div className="flex flex-col gap-10">
                    <CallToAction />

                    <Grid container spacing={2}>
                        <Grid item sm={12} md={6} className="w-full">
                            <LatestBlocks />
                        </Grid>
                        <Grid item sm={12} md={6} className="w-full">
                            <LatestTransactions />
                        </Grid>
                    </Grid>

                </div>
            </div>
        </Page>

    );

}