import React from "react";
import { Button, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewDataStore({ dataStore }) {

    const history = useHistory();

    return (

        <Grid className="break-words">

            <TwoColumnsRow title="Index" tooltipContent={content.index}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Value">
                    <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Index']}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Raw Data" tooltipContent={content.rawData}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['RawData']} content="Copy Data">
                    <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Owner" tooltipContent={content.owner}>
                <div className="flex items-start gap-3 mobile:flex-col mobile:gap-5 mobile:w-full">
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Owner']} content="Copy Address">
                        <p className="break-all">{`0x${dataStore['DSLinker']['DSPreImage']['Owner']}`}</p>
                    </CopyTooltip>

                    <Button
                        size={"small"}
                        variant={"contained"}
                        className="px-3 py-0 ml-2 mobile:py-1 mobile:w-full mobile:m-0 mobile:text-base rounded-sm"
                        onClick={() =>
                            history.push(`/data/${dataStore['DSLinker']['DSPreImage']['Owner'].substr(4)}`)
                        }
                    >
                        View Owner DataStores
                    </Button>
                </div>
            </TwoColumnsRow>

            <TwoColumnsRow title="Issued At" tooltipContent={content.epoch}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['IssuedAt']} content="Copy Value">
                    <p className="break-all">{dataStore['DSLinker']['DSPreImage']['IssuedAt']}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Expires" tooltipContent={content.expires}>
                <CopyTooltip
                    value={
                        aliceNetAdapter.getDSExp(
                            dataStore['DSLinker']['DSPreImage']['RawData'],
                            dataStore['DSLinker']['DSPreImage']['Deposit'],
                            dataStore['DSLinker']['DSPreImage']['IssuedAt']
                        )
                    }
                    content="Copy Value"
                >
                    <p className="break-all">
                        {
                            aliceNetAdapter.getDSExp(
                                dataStore['DSLinker']['DSPreImage']['RawData'],
                                dataStore['DSLinker']['DSPreImage']['Deposit'],
                                dataStore['DSLinker']['DSPreImage']['IssuedAt']
                            )
                        }
                    </p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Deposit" tooltipContent={content.deposit}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}
                    content="Copy Value"
                >
                    <p className="break-all">{aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['TXOutIdx']} content="Copy Index">
                    <p className="break-all">{dataStore['DSLinker']['DSPreImage']['TXOutIdx']}</p>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Signature" tooltipContent={content.signature} lastRow>
                <div className="p-0 pr-20 mobile:pr-0">
                    <CopyTooltip value={dataStore['Signature']} content="Copy Signature">
                        <p className="break-all">{`0x${dataStore['Signature']}`}</p>
                    </CopyTooltip>
                </div>
            </TwoColumnsRow>

        </Grid>
    );

}
