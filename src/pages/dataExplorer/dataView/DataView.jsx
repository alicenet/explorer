import React from 'react';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { CollapsableCard, HelpTooltip } from 'components';
import { copyText } from 'utils';
import styles from './DataView.module.scss';

export function DataView({ dsView, handleViewOwner, getDSExp }) {
    return (
        <div className={styles.dataView} >
            <Grid.Column className={styles.outerColumn}>
                <Segment className={styles.segmentContainer}>
                    {dsView.map((dataStore, i) => (
                        <CollapsableCard 
                            title={`Index: 0x${dataStore.DSLinker.DSPreImage.Index}`}
                            open={true}
                            disabled={false}
                            key={i}
                            borderless
                        >
                            <Grid padded="vertically">
                                <Grid.Row className={styles.row}>
                                    <Grid.Column className={styles.column} width={3}>
                                        <HelpTooltip type="index" />
                                        <p>Index:</p>
                                    </Grid.Column>
                                    <Grid.Column className={styles.column} width={12}>
                                        <p>0x{dataStore.DSLinker.DSPreImage.Index}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + dataStore.DSLinker.DSPreImage.Index)} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className={styles.row}>
                                    <Grid.Column className={styles.column} width={3}>
                                        <HelpTooltip type="rawData" />
                                        <p>Data:</p>
                                    </Grid.Column>
                                    <Grid.Column className={styles.column} width={12}>
                                        <p>0x{dataStore.DSLinker.DSPreImage.RawData}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + dataStore.DSLinker.DSPreImage.RawData)} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className={styles.row}>
                                    <Grid.Column className={styles.column} width={3}>
                                        <HelpTooltip type="expires" />
                                        <p>Expires:</p>
                                    </Grid.Column>
                                    <Grid.Column className={styles.column} width={12}>
                                        <p>{getDSExp(dataStore.DSLinker.DSPreImage.RawData, dataStore.DSLinker.DSPreImage.Deposit, dataStore.DSLinker.DSPreImage.IssuedAt)}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + dataStore.DSLinker.DSPreImage.RawData)} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className={styles.row}>
                                    <Grid.Column className={styles.column} width={3}>
                                        <HelpTooltip type="txHash" />
                                        <p>Transaction Hash:</p>
                                    </Grid.Column>
                                    <Grid.Column className={styles.column} width={12}>
                                        <p>0x{dataStore.DSLinker.TxHash}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + dataStore.DSLinker.TxHash)} 
                                        />

                                        <Button 
                                            className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                                            onClick={() => handleViewOwner(dataStore.DSLinker.TxHash)}
                                        >
                                            View Owner Datastores
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </CollapsableCard>
                    ))}
                </Segment>
            </Grid.Column>
        </div>
    )
}
