import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Popup } from "semantic-ui-react";
import { classNames, copyText } from "utils";

export function TxHashList({ txHshLst }) {

    return (

        <Grid padded="vertically" className="mx-0 break-words" columns={"equal"}>

            {txHshLst && txHshLst.map((hash, index) =>

                <Grid.Row
                    key={`row-hash-${index}`}
                    className={classNames(
                        "px-6 bg-rowblack border-0 border-t border-tableblack",
                        { 'rounded-b-md': index + 1 === txHshLst.length }
                    )}
                    columns={2}
                >

                    <Grid.Column className="flex items-center gap-5 p-0" width={3}>
                        Tx Hash
                    </Grid.Column>

                    <Grid.Column className="p-0">
                        <div className="flex items-start gap-5 cursor-pointer hover:opacity-80">
                            <Link className="text-neongreen hover:text-neongreen hover:opacity-80" to={`/tx/${hash}`}>
                                {`0x${hash}`}
                            </Link>
                            <Popup
                            trigger={
                                <Icon
                                    name="copy outline"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => copyText(hash)}
                                />
                            }
                            basic
                            content="Copy Hash"
                        />
                        </div>
                    </Grid.Column>

                </Grid.Row>

            )}

        </Grid>

    );

}
