import { configureStore } from '@reduxjs/toolkit';
import { appSliceReducer, aliceNetAdapterReducer, aliceNetWalletReducer } from './reducers';

const store = configureStore({
    reducer: {
        app: appSliceReducer,
        aliceNetAdapter: aliceNetAdapterReducer,
        aliceNetWallet: aliceNetWalletReducer
    },
})

export default store;