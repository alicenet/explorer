import React from "react";
import { CollapsableCard, content, CopyTooltip, TwoColumnsRow } from "components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export function TxViewVin({ txInfo }) {

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {txInfo.map((tx, index) =>

                <CollapsableCard title={`Vin ${index + 1}`} open={true} borderless key={`collapsable-tx-vin-${index}`}>

                    <Grid container className="break-words">

                        <TwoColumnsRow title="Consumed Transaction" tooltipContent={content.consumedTx} width={4}>
                            <CopyTooltip
                                value={tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}
                                content="Copy Hash"
                            >
                                <Link
                                    className="text-neongreen hover:text-neongreen hover:opacity-80 break-all"
                                    to={`/tx/${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}
                                >
                                    {`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}
                                </Link>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow
                            title="Consumed Transaction Index"
                            tooltipContent={content.consumedTxIndex}
                            width={4}
                        >
                            <CopyTooltip
                                value={tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}
                                content="Copy Value"
                            >
                                <p className="break-all">{tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}</p>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow title="Signature" tooltipContent={content.signature} width={4} lastRow>
                            <div className="p-0 pr-20 mobile:pr-0">
                                <CopyTooltip value={tx['Signature']} content="Copy Hash">
                                    <p className="break-all">{`0x${tx['Signature']}`}</p>
                                </CopyTooltip>
                            </div>
                        </TwoColumnsRow>

                    </Grid>

                </CollapsableCard>
            )}

        </div>

    );

}