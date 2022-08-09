import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, HelpTooltip } from "components";
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
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Value">
                        <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Index']}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.rawData} />
                    <p>Raw Data</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['RawData']} content="Copy Data">
                        <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.owner} />
                    <p>Owner</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <div className="flex items-start gap-3 mobile:flex-col mobile:gap-5">
                        <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Owner']} content="Copy Address">
                            <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Owner']}`}</p>
                        </CopyTooltip>

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
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['IssuedAt']} content="Copy Value">
                        <p className="break-all">{dataStore['DSLinker']['DSPreImage']['IssuedAt']}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.expires} />
                    <p>Expires</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip
                        value={
                            aliceNetAdapter.getDSExp(
                                dataStore['DSLinker']['DSPreImage']['RawData'],
                                dataStore['DSLinker']['DSPreImage']['Deposit'],
                                dataStore['DSLinker']['DSPreImage']['IssuedAt']
                            )
                        }
                        content="Copy Value"
                    >
                        <p className="break-all">
                            {
                                aliceNetAdapter.getDSExp(
                                    dataStore['DSLinker']['DSPreImage']['RawData'],
                                    dataStore['DSLinker']['DSPreImage']['Deposit'],
                                    dataStore['DSLinker']['DSPreImage']['IssuedAt']
                                )
                            }
                        </p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.deposit} />
                    <p>Expires</p>
                </Grid.Column>

                <Grid.Column className="p-0">
                    <CopyTooltip
                        value={aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}
                        content="Copy Value"
                    >
                        <p className="break-all">{aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['TXOutIdx']} content="Copy Index">
                        <p className="break-all">{dataStore['DSLinker']['DSPreImage']['TXOutIdx']}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row
                className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2 rounded-b-md"
                columns={2}
            >

                <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                    <HelpTooltip content={content.signature} />
                    <p>Signature</p>
                </Grid.Column>

                <Grid.Column className="p-0 pr-20">
                    <CopyTooltip value={dataStore['Signature']} content="Copy Signature">
                        <p className="break-all">{`0x${dataStore['Signature']}`}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

        </Grid>
    );

}
