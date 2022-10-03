import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "utils";
import { CopyTooltip } from "components";
import { Grid } from "@mui/material";

export function TxHashList({ txHshLst }) {

    return (

        <Grid className="break-words">

            {txHshLst && txHshLst.map((hash, index) =>

                <Grid
                    container
                    key={`row-hash-${index}`}
                    columns={2}
                    className={classNames(
                        "px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2",
                        { 'rounded-b-md': index + 1 === txHshLst.length }
                    )}
                >

                    <Grid item sm={12} md={2} className="flex items-center gap-3 py-4 mobile:p-2">
                        Tx Hash
                    </Grid>

                    <Grid item sm={12} md={10} className="w-full flex items-center gap-5 py-4 mobile:p-2">
                        <CopyTooltip value={hash} content="Copy Hash">
                            <Link
                                className="text-neongreen break-all hover:text-neongreen hover:opacity-80"
                                to={`/tx/${hash}`}
                            >
                                {`0x${hash}`}
                            </Link>
                        </CopyTooltip>
                    </Grid>

                </Grid>
            )}

        </Grid>

    );

}
