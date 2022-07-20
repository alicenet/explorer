import React from "react";
import { Button, Grid, Icon, Popup } from "semantic-ui-react"
import { content, HelpTooltip } from "components";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { copyText } from "utils";

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
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${prevBlock}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(prevBlock)}
                                />
                            }
                            basic
                            content="Copy Hash"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.txRoot} />
                    <p>Transaction Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${txRoot}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(txRoot)}
                                />
                            }
                            basic
                            content="Copy Hash"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.stateRoot} />
                    <p>State Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${stateRoot}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(stateRoot)}
                                />
                            }
                            basic
                            content="Copy Hash"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.headerRoot} />
                    <p>Header Root</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${headerRoot}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(headerRoot)}
                                />
                            }
                            basic
                            content="Copy Hash"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                    <HelpTooltip content={content.groupSignature} />
                    <p>Group Signature</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20 mobile:pr-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${sigGroup}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(sigGroup)}
                                />
                            }
                            basic
                            content="Copy Signature"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

        </Grid>

    );

}