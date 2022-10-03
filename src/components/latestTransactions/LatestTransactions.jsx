import React from "react";
import { useSelector } from "react-redux";
import { CopyTooltip, CustomTable } from "components";
import { ReactComponent as TxIcon } from "assets/tx-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";

const headerCells =
    [
        {
            id: "value",
            label: "Value",
            displayCallback: ({ height }) =>
                <span style={{ textUnderlineOffset: "0.3em" }}>
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
                <CopyTooltip value={groupSignature} content="Copy Hash">
                    <p className="break-all">{`0x${groupSignature.slice(0, 8)}...${groupSignature.slice(-8)}`}</p>
                </CopyTooltip>
        }
    ];

export function LatestTransactions() {

    useSelector(s => s.aliceNetAdapter);

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
