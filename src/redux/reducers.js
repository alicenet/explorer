import { createSlice } from '@reduxjs/toolkit'
import { classInstanceReducer } from 'redux-class-watcher';
import { aliceNetAdapter } from '../adapter/alicenetadapter';
import { aliceNetProvider } from '../config/config';

// Generic App Reducer State
const appSlice = createSlice({
    name: "app",
    initialState: {
        activePanel: false,
        settings: {
            aliceNetProvider: aliceNetProvider,
            theme: "dark",
        },
        counter: 0, // For testing redux state TODO: Remove
    },
    reducers: {
        incrementByAmount: (state, action) => { // For testing redux state TODO: Remove
            state.counter += action.payload
        },
    },
})

// Export Generic App Actions
export const { incrementByAmount } = appSlice.actions
// Export generic reducer for use in store.js
export const appSliceReducer = appSlice.reducer;

// Class instance reducers for adapter and wallet -- 
export const [aliceNetAdapterReducer, aliceNetAdapterEqualize] = classInstanceReducer(aliceNetAdapter, "aliceNetAdapter");
export const [aliceNetWalletReducer, aliceNetWalletEqualize] = classInstanceReducer(aliceNetAdapter.wallet, "aliceNetWallet");