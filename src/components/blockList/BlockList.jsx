import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react"
import { content, CopyTooltip } from "components";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { TwoColumnsRow } from "./TwoColumnsRow";

export function BlockList({ blockInfo }) {

    const { BClaims, SigGroup: sigGroup } = blockInfo;
    const {
        Height: height,
        TxCount: txCount,
        PrevBlock: prevBlock,
        TxRoot: txRoot,
        StateRoot: stateRoot,
        HeaderRoot: headerRoot
    } = BClaims;

    const history = useHistory();
    const handleBlockNav = (term) => history.push(`/block/${term}`);

    const maxHeight = aliceNetAdapter.blocks[0]?.BClaims.Height;

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

            <TwoColumnsRow title="Block Height" tooltipContent={content.height}>
                {height}
                <div className="flex gap-2 mobile:hidden">
                    {height > 1 &&
                    <Button
                        icon
                        className="flex items-center bg-buttonblack text-white px-1 py-2 m-0 hover:opacity-80"
                        onClick={() => handleBlockNav(height - 1)}
                    >
                        <Icon
                            className="m-0 p-0"
                            name="chevron left"
                            size="small"
                        />
                    </Button>
                    }
                    {(maxHeight > height) &&
                    <Button
                        icon
                        className="flex items-center bg-buttonblack text-white px-1 py-2 m-0 hover:opacity-80"
                        onClick={() => handleBlockNav(height + 1)}
                    >
                        <Icon
                            className="m-0 p-0"
                            name="chevron right"
                            size="small"
                        />
                    </Button>
                    }
                </div>

            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Count" tooltipContent={content.txCount}>
                <p>{txCount ? txCount : 0}</p>
            </TwoColumnsRow>


            <TwoColumnsRow title="Previous Block" tooltipContent={content.previousBlock}>
                <CopyTooltip value={prevBlock} content="Copy Hash">
                    <p className="break-all">{`0x${prevBlock}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Root" tooltipContent={content.txRoot}>
                <CopyTooltip value={txRoot} content="Copy Hash">
                    <p className="break-all">{`0x${txRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>


            <TwoColumnsRow title="State Root" tooltipContent={content.stateRoot}>
                <CopyTooltip value={stateRoot} content="Copy Hash">
                    <p className="break-all">{`0x${stateRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Header Root" tooltipContent={content.headerRoot}>
                <CopyTooltip value={headerRoot} content="Copy Hash">
                    <p className="break-all">{`0x${headerRoot}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Group Signature" tooltipContent={content.groupSignature}>
                <div className="p-0 pr-20 mobile:pr-0">
                    <CopyTooltip value={sigGroup} content="Copy Signature">
                        <p className="break-all">{`0x${sigGroup}`}</p>
                    </CopyTooltip>
                </div>
            </TwoColumnsRow>

        </Grid>

    );

}