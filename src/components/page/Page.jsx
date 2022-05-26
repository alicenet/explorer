import React from 'react';
import { Container } from 'semantic-ui-react';
import { AliceNetMenu, Footer } from "components";

export const Page = ({ children }) => {

    return (
        <Container className="flex flex-col justify-between min-h-screen">

            <Container>

                <AliceNetMenu />

                <Container fluid>

                    {children}

                </Container>

            </Container>

            <Footer />

        </Container>
    );
};