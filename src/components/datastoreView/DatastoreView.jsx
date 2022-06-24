import React from "react";
import { Container, Grid, Icon, Popup } from "semantic-ui-react";
import { CollapsableCard, content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";

export function DatastoreView({ datastoreInfo }) {

    return (

        <Container className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {datastoreInfo.map((dataStore, index) => (

                <CollapsableCard
                    title={`Index: ${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    key={`collapsable-datastore-${index}`}
                    borderless
                >

                    <Grid padded="vertically" className="mx-0 break-words" columns={"equal"}>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.index} />
                                <p>Index</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-3">
                                    <p>{`0x${dataStore['DSLinker']['DSPreImage']['Index']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(dataStore['DSLinker']['DSPreImage']['Index'])}
                                            />
                                        }
                                        basic
                                        content="Copy Index"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.rawData} />
                                <p>Data</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-3">
                                    <p>{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(dataStore['DSLinker']['DSPreImage']['RawData'])}
                                            />
                                        }
                                        basic
                                        content="Copy Value"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.expires} />
                                <p>Expires</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-3">
                                    <p>{aliceNetAdapter.getDSExp(
                                        dataStore['DSLinker']['DSPreImage']['RawData'],
                                        dataStore['DSLinker']['DSPreImage']['Deposit'],
                                        dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                    )}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(dataStore['DSLinker']['DSPreImage']['RawData'])}
                                            />
                                        }
                                        basic
                                        content="Copy Value"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            key={`row-hash-${index}`}
                            className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.txHash} />
                                <p>Transaction Hash</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-5 cursor-pointer hover:opacity-80">
                                    <Link className="text-neongreen hover:text-neongreen hover:opacity-80"
                                          to={`/tx/${dataStore['DSLinker']['TxHash']}`}>
                                        {`0x${dataStore['DSLinker']['TxHash']}`}
                                    </Link>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(dataStore['DSLinker']['TxHash'])}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </CollapsableCard>
            ))}

        </Container>

    );

}
