import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "utils";
import { CopyTooltip } from "components";
import { Grid, Typography, useTheme } from "@mui/material";

export function TxHashList({ txHshLst }) {

    const theme = useTheme();

    return (

        <Grid className="break-words">

            {txHshLst && txHshLst.map((hash, index) =>

                <Grid
                    container
                    paddingX={3}
                    key={`row-hash-${index}`}
                    columns={2}
                    sx={{ backgroundColor: theme.palette.rowBlack.main }}
                    className={classNames(
                        "border-0 border-t border-tableblack mobile:p-2",
                        { "rounded-b-md": index + 1 === txHshLst.length }
                    )}
                >

                    <Grid item sm={12} md={2} className="flex items-center gap-3 py-4 mobile:p-2">
                        Tx Hash
                    </Grid>

                    <Grid item sm={12} md={10} className="w-full flex items-center gap-5 py-4 mobile:p-2">
                        <CopyTooltip value={hash} content="Copy Hash">
                            <Typography sx={{ color: theme.palette.primary.main }}>
                                <Link className="break-all hover:opacity-80" to={`/tx/${hash}`}>
                                    {`0x${hash}`}
                                </Link>
                            </Typography>
                        </CopyTooltip>
                    </Grid>

                </Grid>
            )}

        </Grid>

    );

}
