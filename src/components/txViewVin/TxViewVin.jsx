import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";
import { CollapsableCard, content, HelpTooltip } from "components";
import { copyText } from "utils";

export function TxViewVin({ txInfo }) {

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {txInfo.map((tx, index) =>

                <CollapsableCard title={`Vin ${index + 1}`} open={true} borderless key={`collapsable-tx-vin-${index}`}>

                    <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.consumedTx} />
                                <p>Consumed Transaction</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-3">
                                    <p className="break-all">{`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80 mobile:hidden"
                                                onClick={() => copyText(tx['TXInLinker']['TXInPreImage']['ConsumedTxHash'])}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.consumedTxIndex} />
                                <p>Consumed Transaction Index</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-3">
                                    <p className="break-all">{`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ?? 0}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80 mobile:hidden"
                                                onClick={() => copyText(tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ?? 0)}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md mobile:p-2" columns={2}>

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.signature} />
                                <p>Signature</p>
                            </Grid.Column>

                            <Grid.Column className="p-0 pr-20">
                                <div className="flex items-start gap-3">
                                    <p className="break-all">{`0x${tx['Signature']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80 mobile:hidden"
                                                onClick={() => copyText(tx['Signature'])}
                                            />
                                        }
                                        basic
                                        content="Copy Signature"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </CollapsableCard>
            )}

        </div>

    );

}