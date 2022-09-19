import { Container } from "semantic-ui-react";
import { Error } from '@mui/icons-material';
import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

export function SearchNotFound({ term }) {

    const history = useHistory();

    return (

        <Container
            className="border-0 border-t-4 border-neonred rounded-md bg-deeppurple text-white py-10 px-14 text-left flex flex-col gap-7">

            <Container className="flex flex-col font-bold text-left">
                <Container className="flex flex-row items-center gap-3 text-5xl">
                    <Error className="text-5xl" />
                    <h2>OOPS!</h2>
                </Container>
                <h3 className="text-2xl">Invalid Input</h3>
            </Container>

            <Container className="flex flex-col">
                <span>
                    The search data you entered was: <span className="font-bold">{term}</span>
                </span>
                <span>
                    Sorry! This is an invalid search entry.
                </span>
            </Container>


            <Container className="flex flex-col">
                <span>
                    Instead please try:
                </span>
                <span className="text-neongreen">
                    Block | Transaction | DataStores
                </span>
            </Container>


            <Container>

                <Button
                    variant={"contained"}
                    className="px-8"
                    onClick={() => history.push('/')}
                >
                    Back to Monitor
                </Button>

            </Container>

        </Container>

    );

}
