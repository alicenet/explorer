import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, HelpTooltip } from "components";
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
                    <CopyTooltip
                        value={aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                        content="Copy Value"
                    >
                        <p className="break-all">{aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}</p>
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
                        <CopyTooltip value={valueStore['VSPreImage']['Owner']} content="Copy Address">
                            <p className="break-all">{`0x${valueStore['VSPreImage']['Owner']}`}</p>
                        </CopyTooltip>

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
                    <CopyTooltip value={valueStore['VSPreImage']['TXOutIdx']} content="Copy Index">
                        <p className="break-all">{valueStore['VSPreImage']['TXOutIdx']}</p>
                    </CopyTooltip>
                </Grid.Column>

            </Grid.Row>

        </Grid>

    );

}
