import React, { useEffect } from "react";
import { CustomTable } from "components";
import { ReactComponent as BlocksIcon } from "assets/blocks-icon.svg";
import { useSelector } from "react-redux";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Icon } from "semantic-ui-react";
import { copyText } from "utils";

const headerCells = [
    {
        id: "height",
        label: "Height",
        displayCallback: ({ height }) => <span className="text-neongreen">{height}</span>,
    },
    {
        id: "txCount",
        label: "TX Count",
    },
    {
        id: "groupSignature",
        label: "Group Signature",
        displayCallback: ({ groupSignature }) =>
            <div
                className="flex cursor-pointer hover:opacity-80"
                onClick={() => copyText(groupSignature)}>
                {`0x${groupSignature.slice(0, 15)}...`}
                <Icon name="copy outline" />
            </div>,
    }
];

export function LatestBlocks() {

    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

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