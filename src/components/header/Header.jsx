import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {

    return (

        <Container fluid className="sticky top-0 bg-dark opacity-90" style={{ margin: "0px !important" }}>

            <Grid className="my-0">

                <Grid.Row only="mobile" className="py-0">

                    <Grid.Column className="px-0">

                        <HeaderMobile />

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row only="computer tablet" className="py-0">

                    <Grid.Column>

                        <HeaderDesktop />

                    </Grid.Column>

                </Grid.Row>

            </Grid>

        </Container>

    );

}
