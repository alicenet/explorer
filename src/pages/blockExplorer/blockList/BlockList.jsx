import React from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { copyText } from 'utils';
import { HelpTooltip } from 'components';
import styles from './BlockList.module.scss';

export function BlockList({ height, txCount, prevBlock, txRoot, stateRoot, headerRoot, sigGroup, handleBlockNav }) {
    return (
        <Grid className={styles.blockList} padded="vertically">
            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="height" />
                    <p>Block Height</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    {height}
                    <>
                        {/* TODO Add on click action */}
                        <Button
                            className={styles.button} 
                            icon 
                            onClick={handleBlockNav}
                        >
                            <Icon 
                                className={styles.navIcon} 
                                name="chevron left" 
                                size="small" 
                            />
                        </Button>
                        
                        <Button 
                            className={styles.button}
                            icon 
                            onClick={handleBlockNav}
                        >
                            <Icon 
                                className={styles.navIcon} 
                                name="chevron right" 
                                size="small" 
                            />
                        </Button>
                    </>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="txCount" />
                    <p>Transaction Count</p>
                </Grid.Column> 
                <Grid.Column className={styles.column} width={12}>
                    <p>{txCount ? txCount : 0}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="previousBlock" />
                    <p>Previous Block</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    <p>{`0x${prevBlock}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + prevBlock)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="txRoot" />
                    <p>Transaction Root</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    <p>{`0x${txRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + txRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="stateRoot" />
                        <p>State Root</p>
                    </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    <p>{`0x${stateRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + stateRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="headerRoot" />
                    <p>Header Root</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    <p>{`0x${headerRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + headerRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip type="groupSignature" />
                    <p>Group Signature</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    <p>{`0x${sigGroup}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + sigGroup)} 
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}