import React from "react";
import { Accordion, content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";
import { Grid, Typography, useTheme } from "@mui/material";

export function DatastoreView({ datastoreInfo }) {

    const theme = useTheme();

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {datastoreInfo.map((dataStore, index) => (

                <Accordion
                    title={`Index: ${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    key={`collapsable-datastore-${index}`}
                >

                    <Grid className="break-words">

                        <TwoColumnsRow title="Index" tooltipContent={content.index}>
                            <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Index">
                                <p className="break-all">{dataStore['DSLinker']['DSPreImage']['Index']}</p>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow title="Data" tooltipContent={content.rawData}>
                            <CopyTooltip
                                value={dataStore['DSLinker']['DSPreImage']['RawData']}
                                content="Copy Value"
                            >
                                <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                            </CopyTooltip>
                        </TwoColumnsRow>

                        <TwoColumnsRow title="Expires" tooltipContent={content.expires}>
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
                        </TwoColumnsRow>

                        <TwoColumnsRow title="Transaction Hash" tooltipContent={content.txHash} lastRow>
                            <CopyTooltip value={dataStore['DSLinker']['TxHash']} content="Copy Hash">
                                <Typography sx={{ color: theme.palette.primary.main }}>
                                    <Link
                                        className="hover:opacity-80 break-all"
                                        to={`/tx/${dataStore['DSLinker']['TxHash']}`}
                                    >
                                        {`0x${dataStore['DSLinker']['TxHash']}`}
                                    </Link>
                                </Typography>
                            </CopyTooltip>
                        </TwoColumnsRow>

                    </Grid>

                </Accordion>

            ))}

        </div>

    );

}
