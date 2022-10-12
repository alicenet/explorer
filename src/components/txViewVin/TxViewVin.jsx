import React from "react";
import { content, CopyTooltip, SecondaryAccordion, TwoColumnsRow } from "components";
import { Grid, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export function TxViewVin({ txInfo }) {

    const theme = useTheme();

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-md rounded-t-none">

            {txInfo.map((tx, index) =>

                <SecondaryAccordion title={`Vin ${index + 1}`} key={`collapsable-tx-vin-${index}`}>

                    <Grid container className="break-words">

                        <TwoColumnsRow title="Consumed Transaction" tooltipContent={content.consumedTx}>
                            <CopyTooltip
                                value={tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}
                                content="Copy Hash"
                            >
                                <Typography sx={{ color: theme.palette.primary.main }}>
                                    <Link
                                        className="break-all hover:opacity-80"
                                        to={`/tx/${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}
                                    >
                                        {`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}
                                    </Link>
                                </Typography>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow
                            title="Consumed Transaction Index"
                            tooltipContent={content.consumedTxIndex}

                        >
                            <CopyTooltip
                                value={tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}
                                content="Copy Value"
                            >
                                <p className="break-all">{tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}</p>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow title="Signature" tooltipContent={content.signature} lastRow>
                            <div className="p-0 pr-20 mobile:pr-0">
                                <CopyTooltip value={tx['Signature']} content="Copy Hash">
                                    <p className="break-all">{`0x${tx['Signature']}`}</p>
                                </CopyTooltip>
                            </div>
                        </TwoColumnsRow>

                    </Grid>

                </SecondaryAccordion>
            )}

        </div>

    );

}