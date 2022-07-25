import React from "react";
import { Button, Grid, Icon, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.value} />
                    <p>Value</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p>{aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(valueStore['VSPreImage']['Value'])}
                                />
                            }
                            basic
                            content="Copy Value"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.owner} />
                    <p>Owner</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3 mobile:flex-col mobile:gap-5">
                        <div className="flex flex-row items-start gap-3">
                            <p className="break-all">{`0x${valueStore['VSPreImage']['Owner']}`}</p>
                            <Popup
                                trigger={
                                    <Icon
                                        name="copy outline"
                                        className="cursor-pointer hover:opacity-80 mobile:hidden"
                                        onClick={() => copyText(`0x${valueStore['VSPreImage']['Owner']}`)}
                                    />
                                }
                                basic
                                content="Copy Address"
                            />
                        </div>
                        <Button
                            className="text-xs px-3 py-1 ml-2 rounded-sm mobile:w-full mobile:m-0 mobile:text-base"
                            onClick={() =>
                                history.push(`/data/${valueStore['VSPreImage']['Owner'].substr(4)}`)
                            }
                            content="View Owner DataStores"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2 rounded-b-md" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{valueStore['VSPreImage']['TXOutIdx']}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(valueStore['VSPreImage']['TXOutIdx'])}
                                />
                            }
                            basic
                            content="Copy Index"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

        </Grid>

    );

}
