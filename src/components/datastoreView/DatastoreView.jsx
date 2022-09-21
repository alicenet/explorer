import React from "react";
import { Grid } from "semantic-ui-react";
import { CollapsableCard, content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";

export function DatastoreView({ datastoreInfo }) {

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {datastoreInfo.map((dataStore, index) => (

                <CollapsableCard
                    title={`Index: ${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    key={`collapsable-datastore-${index}`}
                    borderless
                >

                    <Grid padded="vertically" className="mx-0 break-words">

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
                                <Link
                                    className="text-neongreen hover:text-neongreen hover:opacity-80 break-all"
                                    to={`/tx/${dataStore['DSLinker']['TxHash']}`}
                                >
                                    {`0x${dataStore['DSLinker']['TxHash']}`}
                                </Link>
                            </CopyTooltip>
                        </TwoColumnsRow>

                    </Grid>

                </CollapsableCard>

            ))}

        </div>

    );

}
