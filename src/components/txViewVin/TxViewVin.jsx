import React from "react";
import { Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { CollapsableCard, content, CopyTooltip, HelpTooltip } from "components";

export function TxViewVin({ txInfo }) {

    const history = useHistory();

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {txInfo.map((tx, index) =>

                <CollapsableCard title={`Vin ${index + 1}`} open={true} borderless key={`collapsable-tx-vin-${index}`}>

                    <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.consumedTx} />
                                <p>Consumed Transaction</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip
                                    value={tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}
                                    content="Copy Hash"
                                >
                                    <p className="break-all text-neongreen cursor-pointer hover:opacity-80" onClick={() => history.push(`/tx/0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`)}>{`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.consumedTxIndex} />
                                <p>Consumed Transaction Index</p>
                            </Grid.Column>

                            <Grid.Column className="p-0">
                                <CopyTooltip
                                    value={tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}
                                    content="Copy Value"
                                >
                                    <p className="break-all">{tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row
                            className="px-6 bg-rowblack border-0 border-t border-tableblack rounded-b-md mobile:p-2"
                            columns={2}
                        >

                            <Grid.Column className="flex items-center gap-3 p-0" width={4}>
                                <HelpTooltip content={content.signature} />
                                <p>Signature</p>
                            </Grid.Column>

                            <Grid.Column className="p-0 pr-20">
                                <CopyTooltip value={tx['Signature']} content="Copy Hash">
                                    <p className="break-all">{`0x${tx['Signature']}`}</p>
                                </CopyTooltip>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </CollapsableCard>
            )}

        </div>

    );

}