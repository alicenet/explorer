import React from "react";
import { CallToAction, LatestBlocks, LatestTransactions, Page, SearchBar } from "components";
import { Box, Grid } from "@mui/material";

export const Home = () => {

    return (

        <Page>
            <Box display="flex" flexDirection="column" gap={4}>
                <SearchBar />
                <Box display="flex" flexDirection="column" gap={4}>
                    <CallToAction />
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6} width="100%">
                            <LatestBlocks />
                        </Grid>
                        <Grid item sm={12} md={6} width="100%">
                            <LatestTransactions />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Page>

    );

}