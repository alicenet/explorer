import React from 'react';
import { Dimmer, Loader, } from 'semantic-ui-react';
import { AppContext, getContextState } from '../AppContext/AppContext';

export default function DimmerLoader() {
    const appContext = React.useContext(AppContext);
    const { loading } = getContextState(appContext);
    return (
        <Dimmer page active={loading}>
            <Loader active content="Loading" />
        </Dimmer>
    )
}