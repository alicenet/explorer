import React from 'react';
import { Container } from 'semantic-ui-react';
import { AliceNetMenu, Footer } from "components";

export const Page = ({ children }) => {

    return (
        <Container fluid>

            <AliceNetMenu />

            <Container>

                {children}

            </Container>

            <Footer />

        </Container>
    );
};