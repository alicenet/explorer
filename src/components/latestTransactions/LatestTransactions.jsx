import React from "react";
import { useSelector } from "react-redux";
import { CopyTooltip, CustomTable } from "components";
import { ReactComponent as TxIcon } from "assets/tx-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Typography } from "@mui/material";

const headerCells =
    [
        {
            id: "value",
            label: "Value",
            displayCallback: ({ height }) =>
                <Typography variant="span">
                    {height}
                </Typography>
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
                    <Typography variant="span" sx={{ wordBreak: "break-all" }}>
                        {`0x${groupSignature.slice(0, 8)}...${groupSignature.slice(-8)}`}
                    </Typography>
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
