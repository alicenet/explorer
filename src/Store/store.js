import React, { createContext, Component } from 'react';

// prod
const defaultSettings = {"madnetProvider": "https://edge.mnexplore.com/v1/", "theme": "dark" }

// testnet
//const defaultSettings = {"madnetProvider": "https://testnet.edge.mnexplore.com/v1/", "theme": "dark" }
const MadWallet = require("madwalletjs");

export const StoreContext = createContext();

// Class component for storing and updating shared states
export class Store extends Component {
    constructor() {
        super();
        this.state = {
            store: {
                wallet: new MadWallet(),
                madNetAdapter: false,
                settings: defaultSettings,
            },
            actions: {
                addWallet: wallet => this.setState({ store: { ...this.state.store, wallet: wallet } }),
                addWeb3Adapter: web3Adapter => this.setState({ store: { ...this.state.store, web3Adapter: web3Adapter } }),
                addMadNetAdapter: madNetAdapter => this.setState({ store: { ...this.state.store, madNetAdapter: madNetAdapter } }),
                loadSettings: () => {
                    if (!document.cookie || document.cookie.split('=').length < 2) {
                        this.setState({ store: { ...this.state.store, settings: defaultSettings } })
                    }
                    else {
                        this.setState({ store: { ...this.state.store, settings: JSON.parse(document.cookie.split('=')[1]) } })
                    }
                },
                updateSettings: (settings, style) => {
                    settings['theme'] = style;
                    this.setState({ store: { ...this.state.store, settings: settings } })
                    document.cookie = "settings = " + JSON.stringify(settings) + '; expires = Wed, 15 Jan 2100 12:00:00 UTC';
                    },
                resetSettings: () => {
                    this.setState({ store: { ...this.state.store, settings: defaultSettings } })
                }
            }
        };
    }

    render() {
        return (
            <StoreContext.Provider value={this.state}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}