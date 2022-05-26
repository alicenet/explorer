import React from "react";
import { Button, Grid } from "semantic-ui-react";

export const CallToAction = ({ label, buttonLabel, onClick }) => {

    return (
        <Grid centered className="gap-3 m-0">
            <Grid.Row className="p-0">
                <h3 className="text-3xl">{label}</h3>
            </Grid.Row>
            <Grid.Row className="p-0">
                <Button
                    className="text-black bg-neongreen m-0 w-60 text-xl py-2"
                    onClick={onClick}
                    content={buttonLabel}
                />
            </Grid.Row>
        </Grid>
    );

}
