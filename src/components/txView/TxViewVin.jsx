import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { CollapsableCard, content, HelpTooltip } from "components";
import { copyText } from "utils";
import styles from "./TxViewVin.module.scss";
import { ReactComponent as TreeIcon } from "assets/tree-icon.svg";

export function TxViewVin({ txInfo }) {

    return (

        <Grid className={styles.txView}>
            <Grid.Column className={styles.outerColumn}>
                <Segment className={styles.segmentContainer}>
                    <CollapsableCard
                        title={'Vin'}
                        open={true}
                        disabled={false}
                        icon={<TreeIcon />}
                    >
                        {txInfo.map((tx, i) =>
                            <CollapsableCard
                                title={`Vin ${i}`}
                                open={true}
                                disabled={false}
                                borderless
                                key={i}
                            >
                                <Grid padded="vertically">

                                    <Grid.Row className={styles.row}>
                                        <Grid.Column className={styles.column} width={4}>
                                            <HelpTooltip content={content.index} />
                                            <p>Consumed Transaction:</p>
                                        </Grid.Column>
                                        <Grid.Column className={styles.column} width={11}>
                                            <p>0x{tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}</p>
                                            <Icon
                                                name="copy outline"
                                                className="click"
                                                onClick={() => copyText("0x" + tx['TXInLinker']['TXInPreImage']['ConsumedTxHash'])}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row className={styles.row}>
                                        <Grid.Column className={styles.column} width={4}>
                                            <HelpTooltip content={content.rawData} />
                                            <p>Consumed Transaction Index:</p>
                                        </Grid.Column>
                                        <Grid.Column className={styles.column} width={11}>
                                            <p>0x{tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] ? tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx'] : 0}</p>
                                            <Icon
                                                name="copy outline"
                                                className="click"
                                                onClick={() => copyText("0x" + tx.DSLinker.DSPreImage.RawData)}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row className={styles.row}>
                                        <Grid.Column className={styles.column} width={4}>
                                            <HelpTooltip content={content.expires} />
                                            <p>Signature:</p>
                                        </Grid.Column>
                                        <Grid.Column className={styles.column} width={11}>
                                            <p>0x{tx['Signature']}</p>
                                            <Icon
                                                name="copy outline"
                                                className="click"
                                                onClick={() => copyText("0x" + tx['Signature'])}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid>
                            </CollapsableCard>)}
                    </CollapsableCard>
                </Segment>
            </Grid.Column>
        </Grid>

    );

}