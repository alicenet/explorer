import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import {
    CopyTooltip,
    InvalidInput,
    Page,
    PrimaryAccordion,
    SearchBar,
    SearchNotFound,
    TxViewVin,
    TxViewVout
} from "components";
import { isValidHash, searchTypes } from "utils";

import { ReactComponent as TreeIcon } from "assets/tree-icon.svg";
import { ReactComponent as ChoicesIcon } from "assets/choices-icon.svg";

export function TxExplorer() {

    const [txInfo, setTxInfo] = useState(null);
    const [isLoading, setLoadingStatus] = useState(true);

    const history = useHistory();
    const { hash } = useParams();

    useEffect(() => {
        const getTx = async () => {
            if (isValidHash(hash)) {
                const tx = await aliceNetAdapter.viewTransaction(hash);
                setTxInfo(tx);
            } else {
                setTxInfo({ error: "Invalid hash" });
            }
            setLoadingStatus(false);
        }
        getTx();
    }, [hash]);

    if (isLoading) {
        return null;
    }

    return (

        <Page>

            <Box display="flex" flexDirection="column" gap={4}>

                <SearchBar currentSearch={{ type: searchTypes.TRANSACTIONS }} />

                {
                    !txInfo &&
                    <SearchNotFound />
                }

                {
                    txInfo && txInfo.error &&
                    <InvalidInput
                        term={hash}
                        suggestion={
                            <Typography variant="span" sx={{ ":hover": { opacity: 0.8 } }}>
                                <Link to="/">
                                    Going back to Block Monitor
                                </Link>
                            </Typography>
                        }
                    />
                }
                {
                    txInfo && !txInfo.error && txInfo[0] !== undefined &&
                    <Box display="flex" flexDirection="column" gap={4}>

                        <Box display="flex" flexDirection="column" paddingX={2} gap={2}>

                            <Box display="flex" gap={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                <Typography fontWeight="bold" variant="span">Tx Hash:</Typography>
                                <CopyTooltip value={hash} content="Copy Hash">
                                    <Typography variant="span" sx={{ wordBreak: "break-all" }}>
                                        {`0x${hash}`}
                                    </Typography>
                                </CopyTooltip>
                            </Box>

                            <Box
                                display="flex"
                                sx={{
                                    alignItems: { xs: "flex-start", md: "center" },
                                    flexDirection: { xs: "column", md: "row" },
                                    gap: { xs: 2, md: 1 },
                                }}
                            >

                                <Box display="flex" gap={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                    <Typography fontWeight="bold" variant="span">Height:</Typography>
                                    <Typography variant="span">{aliceNetAdapter.transactionHeight}</Typography>
                                </Box>

                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        paddingX: 2.5,
                                        paddingY: { xs: 0.5, md: 0 },
                                        fontSize: { xs: "medium", md: "small" },
                                        width: { xs: "100%", md: "inherit" }
                                    }}
                                    onClick={() => history.push(`/block/${aliceNetAdapter.transactionHeight}`)}
                                >
                                    View Block
                                </Button>

                            </Box>

                        </Box>

                        <PrimaryAccordion
                            padded
                            title="Vins"
                            icon={<TreeIcon />}
                            itemsCount={txInfo[0].Vin.length}
                        >
                            <TxViewVin txInfo={txInfo[0].Vin} />
                        </PrimaryAccordion>

                        <PrimaryAccordion
                            padded
                            title="Vouts"
                            icon={<ChoicesIcon />}
                            itemsCount={txInfo[0].Vout.length}
                        >
                            <TxViewVout txInfo={txInfo[0].Vout} />
                        </PrimaryAccordion>

                    </Box>
                }

            </Box>

        </Page>

    );

}
