import React from "react";
import { Button, Grid, Icon, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewDataStore({ dataStore }) {

    const history = useHistory();

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.index} />
                    <p>Index</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Index']}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(`0x${dataStore['DSLinker']['DSPreImage']['Index']}`)}
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
                    <HelpTooltip content={content.rawData} />
                    <p>Raw Data</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`)}
                                />
                            }
                            basic
                            content="Copy Data"
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
                            <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Owner']}`}</p>
                            <Popup
                                trigger={
                                    <Icon
                                        name="copy outline"
                                        className="cursor-pointer hover:opacity-80 mobile:hidden"
                                        onClick={() => copyText(`0x${dataStore['DSLinker']['DSPreImage']['Owner']}`)}
                                    />
                                }
                                basic
                                content="Copy Address"
                            />
                        </div>
                        <Button
                            className="text-xs px-3 py-1 ml-2 rounded-sm mobile:w-full mobile:m-0 mobile:text-base"
                            onClick={() =>
                                history.push(`/data/${dataStore['DSLinker']['DSPreImage']['Owner'].substr(4)}`)
                            }
                            content="View Owner DataStores"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.epoch} />
                    <p>Issued At</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p>{dataStore['DSLinker']['DSPreImage']['IssuedAt']}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(dataStore['DSLinker']['DSPreImage']['IssuedAt'])}
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
                    <HelpTooltip content={content.expires} />
                    <p>Expires</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p>
                            {
                                aliceNetAdapter.getDSExp(
                                    dataStore['DSLinker']['DSPreImage']['RawData'],
                                    dataStore['DSLinker']['DSPreImage']['Deposit'],
                                    dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                )
                            }
                        </p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(
                                        aliceNetAdapter.getDSExp(
                                            dataStore['DSLinker']['DSPreImage']['RawData'],
                                            dataStore['DSLinker']['DSPreImage']['Deposit'],
                                            dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                        )
                                    )}
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
                    <HelpTooltip content={content.deposit} />
                    <p>Expires</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3">
                        <p>{aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit']))}
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
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{dataStore['DSLinker']['DSPreImage']['TXOutIdx']}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(dataStore['DSLinker']['DSPreImage']['TXOutIdx'])}
                                />
                            }
                            basic
                            content="Copy Index"
                        />
                    </div>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2 rounded-b-md" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.signature} />
                    <p>Signature</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <div className="flex items-start gap-3">
                        <p className="break-all">{`0x${dataStore['Signature']}`}</p>
                        <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80 mobile:hidden"
                                    onClick={() => copyText(dataStore['Signature'])}
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
