import React from "react";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const NavigationChevron = ({ height, direction }) => {
    const history = useHistory();

    const handleBlockNav = (term) => history.push(`/block/${term}`);
    return (
        <IconButton
            size="small"
            className="bg-buttonblack rounded-md text-white hover:opacity-80 w-6 p-0"
            onClick={() => handleBlockNav(height)}
        >
            {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
    );
}

export function BlockList({ blockInfo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { BClaims, SigGroup: sigGroup } = blockInfo;
    const {
        Height: height,
        TxCount: txCount,
        PrevBlock: prevBlock,
        TxRoot: txRoot,
        StateRoot: stateRoot,
        HeaderRoot: headerRoot
    } = BClaims;

    const maxHeight = aliceNetAdapter.blocks[0]?.BClaims.Height;

    return (

        <Grid className="break-words">

            <TwoColumnsRow title="Block Height" tooltipContent={content.height} size={2}>
                {height}
                {
                    matches &&
                    <div className="flex gap-2">
                        {height > 1 && <NavigationChevron height={height - 1} direction="left" />}
                        {(maxHeight > height) && <NavigationChevron height={height + 1} direction="right" />}
                    </div>
                }

            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Count" tooltipContent={content.txCount} size={2}>
                <p>{txCount ? txCount : 0}</p>
            </TwoColumnsRow>

            <TwoColumnsRow title="Previous Block" tooltipContent={content.previousBlock} size={2}>
                <CopyTooltip value={prevBlock} content="Copy Hash">
                    <p className="break-all">{`0x${prevBlock}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Root" tooltipContent={content.txRoot} size={2}>
                <CopyTooltip value={txRoot} content="Copy Hash">
                    <p className="break-all">{`0x${txRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="State Root" tooltipContent={content.stateRoot} size={2}>
                <CopyTooltip value={stateRoot} content="Copy Hash">
                    <p className="break-all">{`0x${stateRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Header Root" tooltipContent={content.headerRoot} size={2}>
                <CopyTooltip value={headerRoot} content="Copy Hash">
                    <p className="break-all">{`0x${headerRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Group Signature" tooltipContent={content.groupSignature} size={2} lastRow>
                <div className="p-0 pr-20 mobile:pr-0">
                    <CopyTooltip value={sigGroup} content="Copy Signature">
                        <p className="break-all">{`0x${sigGroup}`}</p>
                    </CopyTooltip>
                </div>
            </TwoColumnsRow>

        </Grid>

    );

}