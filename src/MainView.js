import React, { useContext, useEffect } from "react";
import { StoreContext } from "./Store/store.js";
import { Dimmer, Loader, Grid } from "semantic-ui-react";
import MainMenu from "./Components/menu.js";
import MainContent from "./Components/mainContent.js";
import Search from "./Components/search";
import Footer from "./Components/footer";

function MainView(props) {
    // Store component to access states
    const { store, actions } = useContext(StoreContext);

    // Set theme
    useEffect(() => {
        props.states.themeToggle(store.settings.theme)
    }, [store.settings])

    // Load settings
    useEffect(() => {
        actions.loadSettings();
    }, [])

    // Loading if app not initialized
    if (!store || !store.wallet || !store.settings) {
        return (
            <>
                <Dimmer page active={Boolean(props.states.isLoading)}>
                    <Loader>{String(props.states.isLoading)}</Loader>
                </Dimmer>
            </>
        )
    } // App display
    else {
        return (
            <>
                <Grid style={{ padding: "10px 20px", marginTop: "45px" }} className="mainView">
                    <Grid.Row>
                        <MainMenu states={props.states}/>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row centered>
                        <Search/>
                        <MainContent states={props.states}/>
                    </Grid.Row>
                </Grid>
                <Footer/>
            </>
        )
    }
}
export default MainView;