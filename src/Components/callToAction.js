import React from "react";
import { Grid, Button } from "semantic-ui-react";

function CallToAction(props){
    const { label, buttonLabel, onClick} = props;
    return <Grid centered className='mx-5'>
                <Grid.Row centered>
                    <h2>{label}</h2>
                </Grid.Row>
                <Grid.Row centered>
                    <Button onClick={onClick} className='bg-primary rounded text-neutral-800'>{buttonLabel}</Button>
                </Grid.Row>
            </Grid>
}

export default CallToAction;