import React from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "components";
import { ReactComponent as TxIcon } from "assets/tx-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";

const tableHeader = ["Value", "TX Index", "Owner"];

export function LatestTransactions() {

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((e, i) => {
        return {
            [tableHeader[0]]: e['BClaims']['Height'],
            [tableHeader[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0,
            [tableHeader[2]]: `0x${e['SigGroup'].slice(0, 15) + "..."}`
        }
    });

    return (
        <CustomTable
            Icon={() => <TxIcon />}
            headers={tableHeader}
            rows={rows}
            title={"Latest Transactions"}
        />
    );

}
