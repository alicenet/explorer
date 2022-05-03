import React from "react";
import { Grid, Button } from "semantic-ui-react";

const StylesButton = {
    background: '#00FFD1',
    borderRadius: '4px',
    color: '#0A0B09'
}

function CallToAction(props){
    const { label, buttonLabel, onClick} = props;
    return <Grid centered style={{ margin: '40px 0'}}>
                <Grid.Row centered>
                    <h2>{label}</h2>
                </Grid.Row>
                <Grid.Row centered>
                    <Button onClick={onClick} style={StylesButton}>{buttonLabel}</Button>
                </Grid.Row>
            </Grid>
}

export default CallToAction;