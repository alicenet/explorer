import React from "react";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { CollapsableCard, content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import styles from "./TxViewVout.module.scss";
import { ReactComponent as ChoicesIcon } from "assets/choices-icon.svg";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";

export function TxViewVout({ txInfo }) {

    const ADDRESS_TYPES = { BN: "BN", SecP: "SecP" };
    const history = useHistory();

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    };

    const isBN = address => address.substring(0, 2) === ADDRESS_TYPES.BN;

    // Format Vout objects based on tx type
    const VoutFormatter = ({ type, object }) => {
        switch (type) {

            case 'ValueStore':

                return (

                    <React.Fragment key={object['VSPreImage']['TXOutIdx']}>
                        <Grid padded="vertically">
                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.value} />
                                    <p>Value:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['VSPreImage']['Value'] ? aliceNetAdapter.hexToInt(object['VSPreImage']['Value']) : 0}</p>
                                    <Icon
                                        name="copy outline"
                                        className="click"
                                        onClick={() => copyText("0x" + txInfo['TXInLinker']['TXInPreImage']['ConsumedTxHash'])}
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.owner} />
                                    <p>Owner:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    0x{object['VSPreImage']['Owner'].slice(4)}{isBN(object['VSPreImage']['Owner'])}
                                    <Icon name="copy outline" className="click"
                                          onClick={() => copyText("0x" + object['VSPreImage']['Owner'])} />
                                    <Button className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                                            onClick={() => history.push('/data')}>View Owner DataStores</Button>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.txIndex} />
                                    <p>Transaction Index:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['VSPreImage']['TXOutIdx'] ? object['VSPreImage']['TXOutIdx'] : 0}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </React.Fragment>

                );

            case 'DataStore':

                return (

                    <React.Fragment key={object['DSLinker']['DSPreImage']['TXOutIdx']}>
                        <Grid padded="vertically">
                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.index} />
                                    <p>Index:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>0x{object['DSLinker']['DSPreImage']['Index'] ? object['DSLinker']['DSPreImage']['Index'] : 0}</p>
                                    <Icon name="copy outline" className="click"
                                          onClick={() => copyText("0x" + object['DSLinker']['DSPreImage']['Index'])} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.rawData} />
                                    <p>Raw Data:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    0x{object['DSLinker']['DSPreImage']['RawData']}
                                    <Icon name="copy outline" className="click"
                                          onClick={() => copyText("0x" + object['DSLinker']['DSPreImage']['RawData'])} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.owner} />
                                    <p>Owner:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['DSLinker']['DSPreImage']['Owner'].slice(4)}{isBN(object['DSLinker']['DSPreImage']['Owner'])}</p>
                                    <Icon name="copy outline" className="click"
                                          onClick={() => copyText("0x" + object['DSLinker']['DSPreImage']['Owner'])} />
                                    <Button className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                                            onClick={() => history.push('/data')}>View Owner DataStores</Button>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.epoch} />
                                    <p>Issued At:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['DSLinker']['DSPreImage']['IssuedAt']}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.epoch} />
                                    <p>Issued At:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['DSLinker']['DSPreImage']['IssuedAt']}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.expires} />
                                    <p>Expires:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{getDSExp(object['DSLinker']['DSPreImage']['RawData'], object['DSLinker']['DSPreImage']['Deposit'], object['DSLinker']['DSPreImage']['IssuedAt'])}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.deposit} />
                                    <p>Deposit:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{aliceNetAdapter.hexToInt(object['DSLinker']['DSPreImage']['Deposit'])}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.txIndex} />
                                    <p>Transaction Index:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>{object['DSLinker']['DSPreImage']['TXOutIdx'] ? object['DSLinker']['DSPreImage']['TXOutIdx'] : 0}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={styles.row}>
                                <Grid.Column className={styles.column} width={4}>
                                    <HelpTooltip content={content.signature} />
                                    <p>Signature:</p>
                                </Grid.Column>
                                <Grid.Column className={styles.column} width={11}>
                                    <p>0x{object['Signature']}</p>
                                    <Icon name="copy outline" className="click"
                                          onClick={() => copyText("0x" + object['Signature'])} />
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </React.Fragment>

                );

            default:

                return null;
        }
    }

    const valueStores = txInfo.filter(tx => tx.ValueStore);
    const dataStores = txInfo.filter(tx => tx.DataStore);

    return (

        <Grid className={styles.txView}>
            <Grid.Column className={styles.outerColumn}>
                <Segment className={styles.segmentContainer}>
                    <CollapsableCard
                        title={'Vout'}
                        open={true}
                        disabled={false}
                        icon={<ChoicesIcon />}
                    >
                        {
                            dataStores.length > 0 &&
                            <CollapsableCard
                                title={'DataStores'}
                                open={true}
                                disabled={false}
                                borderless
                                icon={<DataStoreIcon />}
                            >
                                {dataStores.map((e, i) => (
                                        <CollapsableCard
                                            title={`DataStores ${i}`}
                                            open={true}
                                            disabled={false}
                                            borderless
                                            key={i}
                                        >
                                            <VoutFormatter type={Object.keys(e)[0]} object={e[Object.keys(e)[0]]} />
                                        </CollapsableCard>
                                    )
                                )}
                            </CollapsableCard>
                        }

                        {
                            valueStores &&
                            <CollapsableCard
                                title={'ValueStore'}
                                open={true}
                                disabled={false}
                                borderless
                                icon={<ValueStoreIcon />}
                            >
                                {valueStores.map((e, i) => (
                                        <CollapsableCard
                                            title={`ValueStore ${i}`}
                                            open={true}
                                            disabled={false}
                                            borderless
                                            key={i}
                                        >
                                            <VoutFormatter type={Object.keys(e)[0]} object={e[Object.keys(e)[0]]} />
                                        </CollapsableCard>
                                    )
                                )}
                            </CollapsableCard>
                        }
                    </CollapsableCard>
                </Segment>
            </Grid.Column>
        </Grid>

    );

}