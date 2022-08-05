import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { classNames } from "utils";
import { CopyTooltip } from "components";

export function TxHashList({ txHshLst }) {

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"} stackable>

            {txHshLst && txHshLst.map((hash, index) =>

                <Grid.Row
                    key={`row-hash-${index}`}
                    columns={2}
                    className={classNames(
                        "px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2",
                        { 'rounded-b-md': index + 1 === txHshLst.length }
                    )}
                >

                    <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                        Tx Hash
                    </Grid.Column>

                    <Grid.Column className="p-0">
                        <CopyTooltip value={hash} content="Copy Hash">
                            <Link className="text-neongreen break-all hover:text-neongreen hover:opacity-80"
                                  to={`/tx/${hash}`}>
                                {`0x${hash}`}
                            </Link>
                        </CopyTooltip>
                    </Grid.Column>

                </Grid.Row>
            )}

        </Grid>

    );

}
