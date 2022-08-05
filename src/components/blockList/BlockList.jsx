import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react"
import { content, CopyTooltip, HelpTooltip } from "components";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";

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

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.height} />
                    <p>Block Height</p>
                </Grid.Column>

                <Grid.Column className="flex items-center gap-5 p-0">
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
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.txCount} />
                    <p>Transaction Count</p>
                </Grid.Column>

                <Grid.Column className="flex items-center gap-5 p-0">
                    <p>{txCount ? txCount : 0}</p>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.previousBlock} />
                    <p>Previous Block</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip value={prevBlock} content="Copy Hash">
                        <p className="break-all">{`0x${prevBlock}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.txRoot} />
                    <p>Transaction Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip value={txRoot} content="Copy Hash">
                        <p className="break-all">{`0x${txRoot}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.stateRoot} />
                    <p>State Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip value={stateRoot} content="Copy Hash">
                        <p className="break-all">{`0x${stateRoot}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.headerRoot} />
                    <p>Header Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip value={headerRoot} content="Copy Hash">
                        <p className="break-all">{`0x${headerRoot}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.groupSignature} />
                    <p>Group Signature</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20 mobile:pr-0">
                    <CopyTooltip value={sigGroup} content="Copy Signature">
                        <p className="break-all">{`0x${sigGroup}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

        </Grid>

    );

}