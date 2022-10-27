import React, { useEffect } from "react";
import { CopyTooltip, CustomTable } from "components";
import { ReactComponent as BlocksIcon } from "assets/blocks-icon.svg";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const headerCells =
    [
        {
            id: "height",
            label: "Height",
            displayCallback: ({ height, theme }) =>
                <Typography sx={{
                    color: theme.palette.primary.main,
                    textUnderlineOffset: "0.3em",
                    fontSize: "1.15rem",
                    cursor: "pointer",
                    ":hover": {
                        textDecoration: "underline",
                        color: theme.palette.primary.dark
                    }
                }}>
                    <Link to={`/block/${height}`}>
                        {height}
                    </Link>
                </Typography>
        },
        {
            id: "txCount",
            label: "TX Count",
        },
        {
            id: "groupSignature",
            label: "Group Signature",
            displayCallback: ({ groupSignature }) =>
                <CopyTooltip value={groupSignature} content="Copy Hash">
                    <Typography sx={{ fontSize: '1.15rem', wordBreak: "break-all" }}>
                        {`0x${groupSignature.slice(0, 8)}...${groupSignature.slice(-8)}`}
                    </Typography>
                </CopyTooltip>
        }
    ]
;

export function LatestBlocks() {

    useSelector(s => s.aliceNetAdapter);

    useEffect(() => {
        if (aliceNetAdapter && !aliceNetAdapter.blocksStarted) {
            aliceNetAdapter.startMonitoringBlocks();
        }
    }, [aliceNetAdapter]);

    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((row) => {
        return {
            height: row['BClaims']['Height'],
            txCount: row['BClaims']['TxCount'] ? row['BClaims']['TxCount'] : 0,
            groupSignature: row['SigGroup']
        }
    });

    return (
        <CustomTable
            icon={<BlocksIcon />}
            headerCells={headerCells}
            rows={rows}
            title="Latest Blocks"
        />
    );

}