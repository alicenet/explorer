import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {

    return (

        <Container fluid className="sticky top-0 bg-dark opacity-90">

            <Grid>

                <Grid.Row only="mobile">

                    <Grid.Column>

                        <HeaderMobile />

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row only="computer tablet">

                    <Grid.Column>

                        <HeaderDesktop />

                    </Grid.Column>

                </Grid.Row>

            </Grid>

        </Container>

    );

}
