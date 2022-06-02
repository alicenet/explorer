import { aliceNetAdapter } from "adapter/alicenetadapter";
import React from "react";
import { useSelector } from "react-redux";
import { Dimmer, Loader, } from "semantic-ui-react";

export const DimmerLoader = () => {

    useSelector(s => s);

    const busy = aliceNetAdapter.busy || ""; // Todo: Update to support all required busy states

    return (
        <Dimmer page active={!!busy}>
            <Loader active content={busy} />
        </Dimmer>
    );

}