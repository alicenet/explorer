import React, { useContext } from "react";
import { Dimmer, Loader, Grid } from "semantic-ui-react";
import { AppContext, getContextState } from "./AppContext/AppContext.js";
import MainMenu from "../Components/menu.js";
import MainContent from "../Components/mainContent.js";
import Search from "../Components/search";
import Footer from "../Components/footer";

function MainView(props) {
    // Store component to access states
    const appContext = useContext(AppContext);
    const { settings, wallet } = getContextState(appContext);

    console.log(appContext)
    console.log(settings, wallet)

    //TODO handle both searchs
    const handleSearch = (blockNumber) => {
        store.madNetAdapter.viewBlock(blockNumber)
        props.states.history.replace(
            {
                pathname: 'block',
                search: '?height=' + blockNumber
            }
        );
    }

    // Loading if app not initialized
    if (!wallet || !settings) {
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
                        <Search handleSearch={handleSearch}/>
                        <MainContent states={props.states}/>
                    </Grid.Row>
                </Grid>
                <Footer/>
            </>
        )
    }
}
export default MainView;