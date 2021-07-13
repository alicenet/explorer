import React, { useContext } from 'react';
import { Container } from "semantic-ui-react"
import { StoreContext } from "../Store/store.js";

function Home(props) {
    const { store } = useContext(StoreContext);

    return (
        <Container>
            <p>home</p>
        </Container>
    )
}
export default Home;