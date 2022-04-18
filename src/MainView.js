import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext/AppContext.js";
import { Dimmer, Loader, Grid, Menu } from "semantic-ui-react";
import MainMenu from "./Components/menu.js";
import MainContent from "./Components/mainContent.js";

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
                <Grid style={{ padding: "10px 20px" }} className="mainView">
                    <Grid.Row>
                        <MainMenu
                            states={props.states}
                        />
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row centered>
                        <MainContent states={props.states}/>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row>
                        <Menu className="bottomMenu" size="small">
                            <Menu.Item
                                className="blue"
                                onClick={() => window.location = "https://madnetwork.com"}
                            >
                                About
                            </Menu.Item>
                            <Menu.Item
                                className="blue"
                                onClick={() => window.location = "https://github.com/MadBase/"}
                            >
                                Github
                            </Menu.Item>
                            <Menu.Item
                                className="blue"
                                onClick={() => window.location = "https://github.com/MadBase/MadNet-Whitepaper/blob/main/madnet.pdf"}
                            >
                                White Paper
                            </Menu.Item>

                        </Menu>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}
export default MainView;