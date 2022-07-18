import React from "react";
import { Button, Grid } from "semantic-ui-react";

const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

export const CallToAction = () => {

    return (

        <Grid centered className="gap-3 m-0 mobile:hidden">
            <Grid.Row className="p-0">
                <h3 className="text-3xl">Real Blockchain Business Solutions</h3>
            </Grid.Row>
            <Grid.Row className="p-0">
                <Button
                    className="text-black bg-neongreen m-0 w-60 text-xl py-2"
                    onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                    content="Learn More"
                />
            </Grid.Row>
        </Grid>

    );

}
