import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon } from "semantic-ui-react";
import { copyText } from "utils";

export function TxHashList({ txHshLst }) {

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"}>

            {txHshLst && txHshLst.map((hash, index) =>

                <Grid.Row key={`row-hash-${index}`} className="px-6 bg-rowblack" columns={2}>

                    <Grid.Column className="flex items-center gap-5 p-0" width={3}>
                        Tx Hash
                    </Grid.Column>

                    <Grid.Column className="p-0">
                        <div className="flex items-start gap-5 cursor-pointer hover:opacity-80">
                            <Link className="text-neongreen hover:text-neongreen hover:opacity-80" to={`/tx/${hash}`}>
                                {`0x${hash}`}
                            </Link>
                            <Icon name="copy outline" onClick={() => copyText(hash)} />
                        </div>
                    </Grid.Column>

                </Grid.Row>

            )}

        </Grid>

    );

}
