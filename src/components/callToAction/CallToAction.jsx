import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";

// const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

export const CallToAction = () => {

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    return (

        <Grid centered className="gap-3 m-0 mobile:hidden">
            <Grid.Row className="p-0">
                <Header className="text-2xl text-white">
                    The Current Epoch is <span className="text-neongreen"> { aliceNetAdapter.blocks.length > 0 ? Math.floor(aliceNetAdapter.blocks[0].BClaims.Height / 1024) : "..."}</span>
                    <Header.Subheader className="text-white text-xl">
                        {aliceNetAdapter.blocks.length > 0 ? 1024 - Math.floor(aliceNetAdapter.blocks[0].BClaims.Height % 1024) : "?" } Blocks Remain
                    </Header.Subheader>
                </Header>

            </Grid.Row>
        </Grid>

    );

}