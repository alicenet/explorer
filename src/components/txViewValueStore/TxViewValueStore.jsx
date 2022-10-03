import React from "react";
import { Button, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <Grid>

            <TwoColumnsRow title="Value" tooltipContent={content.value}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    content="Copy Value"
                >
                    <p className="break-all">{aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Owner" tooltipContent={content.owner}>
                <div className="flex items-start gap-3 mobile:flex-col mobile:gap-5 mobile:w-full">
                    <CopyTooltip value={valueStore['VSPreImage']['Owner']} content="Copy Address">
                        <p className="break-all">{`0x${valueStore['VSPreImage']['Owner']}`}</p>
                    </CopyTooltip>

                    <Button
                        size={"small"}
                        variant={"contained"}
                        className="px-3 py-0 ml-2 mobile:py-1 mobile:w-full mobile:m-0 mobile:text-base rounded-sm"
                        onClick={() =>
                            history.push(`/data/${valueStore['VSPreImage']['Owner'].substr(4)}`)
                        }
                    >
                        View Owner DataStores
                    </Button>
                </div>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex} lastRow>
                <CopyTooltip value={valueStore['VSPreImage']['TXOutIdx']} content="Copy Index">
                    <p className="break-all">{valueStore['VSPreImage']['TXOutIdx']}</p>
                </CopyTooltip>
            </TwoColumnsRow>

        </Grid>

    );

}
