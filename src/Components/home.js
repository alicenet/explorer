import React, { useContext } from 'react';
import { Container } from "semantic-ui-react"
import { AppContext } from "../AppContext/AppContext";

function Home(props) {
    const { store } = useContext(StoreContext);

    return (
        <Container>
            <p>home</p>
        </Container>
    )
}
export default Home;