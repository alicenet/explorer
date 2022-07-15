import React from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "components";
import { ReactComponent as TxIcon } from "assets/tx-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { copyText } from "utils";
import { Icon } from "semantic-ui-react";

const headerCells = [
    {
        id: "value",
        label: "Value",
        displayCallback: ({ height }) =>
            <span
                style={{ textUnderlineOffset: "0.3em" }}
                className="text-neongreen cursor-pointer hover:underline"
            >
                {height}
            </span>
    },
    {
        id: "txIndex",
        label: "TX Index",
    },
    {
        id: "owner",
        label: "Owner",
        displayCallback: ({ groupSignature }) =>
            <div
                className="flex cursor-pointer hover:opacity-80"
                onClick={() => copyText(groupSignature)}>
                {`0x${groupSignature.slice(0, 15)}...`}
                <Icon name="copy outline" />
            </div>,
    }
];

export function LatestTransactions() {

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((row) => {
        return {
            height: row['BClaims']['Height'],
            txIndex: row['BClaims']['TxCount'] ? row['BClaims']['TxCount'] : 0,
            groupSignature: row['SigGroup']
        }
    });

    return (
        <CustomTable
            icon={<TxIcon />}
            headerCells={headerCells}
            rows={rows}
            title="Latest Transactions"
        />
    );

}
