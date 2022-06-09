import React from "react";
import { Container, Grid, Icon, Popup } from "semantic-ui-react";
import { CollapsableCard, content, HelpTooltip } from "components";
import { copyText } from "utils";

export function TxViewVin({ txInfo }) {

    return (

        <Container className="bg-black p-4 flex flex-col gap-4">

            {txInfo.map((tx, i) =>

                <CollapsableCard title={`Vin ${i}`} open={true} borderless>

                    <Grid padded="vertically" className="mx-0 break-words" columns={"equal"}>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                                <HelpTooltip content={content.consumedTx} />
                                <p>Consumed Transaction</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-5">
                                    <p>{`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(tx['TXInLinker']['TXInPreImage']['ConsumedTxHash'])}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                                <HelpTooltip content={content.consumedTxIndex} />
                                <p>Consumed Transaction Index</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <div className="flex items-start gap-5">
                                    <p>{`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ?? 0}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
                                                onClick={() => copyText(tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ?? 0)}
                                            />
                                        }
                                        basic
                                        content="Copy Hash"
                                    />
                                </div>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row className="px-6 bg-rowblack border-0 border-t border-tableblack" columns={2}>

                            <Grid.Column className="flex items-center gap-5 p-0" width={4}>
                                <HelpTooltip content={content.signature} />
                                <p>Signature</p>
                            </Grid.Column>

                            <Grid.Column className="p-0 pr-20">
                                <div className="flex items-start gap-5">
                                    <p className="break-all">{`0x${tx['Signature']}`}</p>
                                    <Popup
                                        trigger={
                                            <Icon
                                                name="copy outline"
                                                className="cursor-pointer hover:opacity-80"
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

        </Container>

    );

}