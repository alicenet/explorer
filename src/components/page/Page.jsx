import React from "react";
import { Container } from "semantic-ui-react";
import { AliceNetMenu, Footer } from "components";

export const Page = ({ children }) => {

    return (
        <div className="flex flex-col justify-between min-h-screen max-w-screen-lg mx-auto">

            <Container fluid>

                <AliceNetMenu />

                <Container fluid>

                    {children}

                </Container>

            </Container>

            <Footer />

        </div>
    );
};