import React from "react";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Container, Typography, useTheme } from "@mui/material";

export const CallToAction = () => {

    const theme = useTheme();
    useSelector(s => s.aliceNetAdapter);

    if (aliceNetAdapter.blocks.length === 0) {
        return null;
    }

    return (

        <Container className="text-white">

            <Typography className="text-2xl font-bold">

                The Current Epoch is&nbsp;

                <Typography sx={{ color: theme.palette.primary.main }} variant={"span"}>
                    {Math.floor(aliceNetAdapter.blocks[0].BClaims.Height / 1024)}
                </Typography>

            </Typography>

            <Typography className="text-xl">
                {`${1024 - Math.floor(aliceNetAdapter.blocks[0].BClaims.Height % 1024)} Blocks Remain`}
            </Typography>

        </Container>

    );

}