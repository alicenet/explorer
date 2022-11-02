import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <>

            <TwoColumnsRow title="Value" tooltipContent={content.value}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    content="Copy Value"
                >
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Owner" tooltipContent={content.owner}>
                <Box
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                    className="mobile:flex-col mobile:gap-5 mobile:w-full"
                >
                    <CopyTooltip value={valueStore['VSPreImage']['Owner']} content="Copy Address">
                        <Typography sx={{ wordBreak: "break-all" }}>
                            {`0x${valueStore['VSPreImage']['Owner']}`}
                        </Typography>
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
                </Box>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex} lastRow>
                <CopyTooltip value={valueStore['VSPreImage']['TXOutIdx']} content="Copy Index">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {valueStore['VSPreImage']['TXOutIdx']}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

        </>

    );

}
