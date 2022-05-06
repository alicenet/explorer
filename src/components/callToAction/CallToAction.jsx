import React from "react";
import { Grid, Button } from "semantic-ui-react";
import styles from './CallToAction.module.scss'; 

export function CallToAction(props){
    const { label, buttonLabel, onClick } = props;
    return <Grid centered className={styles.grid}>
                <Grid.Row centered>
                    <h2>{label}</h2>
                </Grid.Row>
                <Grid.Row centered>
                    <Button onClick={onClick} className={styles.button}>{buttonLabel}</Button>
                </Grid.Row>
            </Grid>
}
