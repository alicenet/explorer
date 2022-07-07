import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { AliceNetMenuMobile } from "./AliceNetMenuMobile";
import { AliceNetMenuDesktop } from "./AliceNetMenuDesktop";

export function AliceNetMenu() {

    return (

        <Container fluid className="sticky top-0 bg-dark opacity-90">

            <Grid>

                <Grid.Row only="mobile">

                    <Grid.Column>

                        <AliceNetMenuMobile />

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row only="computer tablet">

                    <Grid.Column>

                        <AliceNetMenuDesktop />

                    </Grid.Column>

                </Grid.Row>

            </Grid>

        </Container>

    );

}
