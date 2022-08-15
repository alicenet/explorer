import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

            <TwoColumnsRow title="Value" tooltipContent={content.value} width={4}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    content="Copy Value"
                >
                    <p className="break-all">{aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Owner" tooltipContent={content.owner} width={4}>
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
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex} width={4} lastRow>
                <CopyTooltip value={valueStore['VSPreImage']['TXOutIdx']} content="Copy Index">
                    <p className="break-all">{valueStore['VSPreImage']['TXOutIdx']}</p>
                </CopyTooltip>
            </TwoColumnsRow>

        </Grid>

    );

}
