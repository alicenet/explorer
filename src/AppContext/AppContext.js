import React from 'react';
import MadWallet from 'madwalletjs';

//////////////////////////
// State Env Defaults  //
////////////////////////
const envType = process.env.REACT_APP_DEPLOYMENT_TYPE;
if (envType) { throw new Error("Validate .env has DEPLOYMENT_TYPE set") }
const aliceNetProvider = process.env["REACT_APP_ALICENET_RPC_ENDPOINT_" + envType];

////////////////////
// Default State // -- Default state of AppContext
//////////////////
const defaultContextState = {
    wallet: new MadWallet(),
    aliceNetAdapter: false,
    web3Adapter: false,
    loading: false,
    error: false,
    activePanel: false,
    settings: {
        aliceNetProvider: aliceNetProvider,
        theme: "dark",
    }
}

//////////////////////
// Context Exports //
////////////////////
export const AppContext = React.createContext(defaultContextState);
export const AppProvider = ({children}) => {
    let [state, setState] = React.useState(defaultContextState)
    return (
        <AppContext.Provider value={{ state: state, setState: setState }}>
            {children}
        </AppContext.Provider>
    )
}

//////////////
// Actions // -- Expect appContext from useContext(AppContext) passed in
////////////
const updateStateKey = (appCtx, key, value) => appCtx.setState(s => ({ ...s, [key]: value }));
export const getContextState = (appCtx) => (appCtx.state);

export const actions = {
    loadSettingsFromCookie: (appCtx) => {
        !document.cookie || document.cookie.split('=').length < 2 ?
            updateStateKey(appCtx, "settings", defaultContextState.settings)
            : updateStateKey(appCtx, "settings", JSON.parse(document.cookie.split('=')[1]))
    },
    resetSettings: (appCtx) => { updateStateKey(appCtx, "settings", defaultContextState.settings) },
    setAliceNetAdapter: (appCtx, aliceNetAdapter) => { updateStateKey(appCtx, "aliceNetAdapter", aliceNetAdapter) },
    setAliceNetProvider: (appCtx, aliceNetProvider) => { updateStateKey(appCtx, "settings", { ...appCtx.state.settings, aliceNetProvider: aliceNetProvider }) },
    setError: (appCtx, errorMsg) => { updateStateKey(appCtx, "error", errorMsg) },
    setLoading: (appCtx, loadingBool) => { updateStateKey(appCtx, "loading", loadingBool) },
    setActivePanel: (appCtx, activePanel) => { updateStateKey(appCtx, "activePanel", activePanel) },
    setTheme: (appCtx, style) => { updateStateKey(appCtx, "settings", { ...appCtx.state.settings, theme: style }) },
    setWallet: (appCtx, wallet) => { updateStateKey(appCtx, "wallet", wallet) },
    setWeb3Adapter: (appCtx, web3Adapter) => { updateStateKey(appCtx, "web3Adapter", web3Adapter) },
    toggleTheme: (appCtx) => {
        updateStateKey(appCtx, "settings",
            { ...appCtx.state.settings, theme: appCtx.state.settings.theme === "dark" ? "light" : "dark" }
        );
        appCtx.settings.theme === "dark" ? window.setDark() : window.setLight();
    }
}