import React from "react";
import { Grid } from "semantic-ui-react";
import { CollapsableCard, content, CopyTooltip, HelpTooltip } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";

export function DatastoreView({ datastoreInfo }) {

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {datastoreInfo.map((dataStore, index) => (

                <CollapsableCard
                    title={`Index: ${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    key={`collapsable-datastore-${index}`}
                    borderless
                >

                    <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.index} />
                                <p>Index</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Index">
                                    <p className="break-all">{dataStore['DSLinker']['DSPreImage']['Index']}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.rawData} />
                                <p>Data</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip
                                    value={dataStore['DSLinker']['DSPreImage']['RawData']}
                                    content="Copy Value"
                                >
                                    <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.expires} />
                                <p>Expires</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip
                                    value={aliceNetAdapter.getDSExp(
                                        dataStore['DSLinker']['DSPreImage']['RawData'],
                                        dataStore['DSLinker']['DSPreImage']['Deposit'],
                                        dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                    )}
                                    content="Copy Value"
                                >
                                    <p>{aliceNetAdapter.getDSExp(
                                        dataStore['DSLinker']['DSPreImage']['RawData'],
                                        dataStore['DSLinker']['DSPreImage']['Deposit'],
                                        dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                    )}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            key={`row-hash-${index}`}
                            className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.txHash} />
                                <p>Transaction Hash</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip value={dataStore['DSLinker']['TxHash']} content="Copy Hash">
                                    <Link
                                        className="text-neongreen hover:text-neongreen hover:opacity-80 break-all"
                                        to={`/tx/${dataStore['DSLinker']['TxHash']}`}
                                    >
                                        {`0x${dataStore['DSLinker']['TxHash']}`}
                                    </Link>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </CollapsableCard>
            ))}

        </div>

    );

}
