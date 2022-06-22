import React from "react";
import { Button, Grid, Icon, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"}>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                    <HelpTooltip content={content.value} />
                    <p>Value</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-5">
                        <p>{aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(valueStore['VSPreImage']['Value'])}
                                />
                            }
                            basic
                            content="Copy Value"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                    <HelpTooltip content={content.owner} />
                    <p>Owner</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-5">
                        <p>{`0x${valueStore['VSPreImage']['Owner']}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(`0x${valueStore['VSPreImage']['Owner']}`)}
                                />
                            }
                            basic
                            content="Copy Address"
                        />
                        <Button
                            className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                            onClick={() => history.push('/data')}
                        >View Owner DataStores
                        </Button>
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <div className="flex items-start gap-5">
                        <p className="break-all">{valueStore['VSPreImage']['TXOutIdx']}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
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
