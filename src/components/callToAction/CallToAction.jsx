import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export const CallToAction = () => {

    useSelector(s => s.aliceNetAdapter);

    if (aliceNetAdapter.blocks.length === 0) {
        return null;
    }

    return (

        <Grid centered className="gap-3 m-0">

            <Grid.Row className="p-0">

                <Header className="text-2xl text-white">

                    The Current Epoch is&nbsp;

                    <span className="text-neongreen">
                        {Math.floor(aliceNetAdapter.blocks[0].BClaims.Height / 1024)}
                    </span>

                    <Header.Subheader className="text-white text-xl">
                        {`${1024 - Math.floor(aliceNetAdapter.blocks[0].BClaims.Height % 1024)} Blocks Remain`}
                    </Header.Subheader>

                </Header>

            </Grid.Row>

        </Grid>

    );

}