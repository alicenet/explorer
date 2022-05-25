import React, { useEffect } from "react";
import { CustomTable } from "components";
import { ReactComponent as BlocksIcon } from "assets/blocks-icon.svg";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";

const tableHeader = ["Height", "TX Count", "Group Signature"];

export function LatestBlocks() {

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    useEffect(() => {
        if (aliceNetAdapter && !aliceNetAdapter.blocksStarted) {
            aliceNetAdapter.startMonitoringBlocks();
        }
    }, [aliceNetAdapter]);

    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((e, i) => {
        return {
            [tableHeader[0]]: e['BClaims']['Height'],
            [tableHeader[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0,
            [tableHeader[2]]: `0x${e['SigGroup'].slice(0, 15)}...`,
        }
    });

    return (
        <CustomTable
            Icon={() => <BlocksIcon />}
            headers={tableHeader}
            rows={rows}
            title={"Latest Blocks"}
        />
    );

}