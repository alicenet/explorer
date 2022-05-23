import React from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { copyText } from 'utils';
import { content, HelpTooltip } from 'components';
import styles from './BlockList.module.scss';

export function BlockList({ height, txCount, prevBlock, txRoot, stateRoot, headerRoot, sigGroup, handleBlockNavLeft, handleBlockNavRight, maxHeight = Number.MAX_VALUE}) {
    return (
        <Grid className={styles.blockList} padded="vertically">
            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip content={content.height} />
                    <p>Block Height</p>
                </Grid.Column>
                <Grid.Column className={styles.column} width={12}>
                    {height}
                    <>
                        {height > 1 && 
                            <Button
                                className={styles.button} 
                                icon 
                                onClick={handleBlockNavLeft}
                            >
                                <Icon 
                                    className={styles.navIcon} 
                                    name="chevron left" 
                                    size="small" 
                                />
                            </Button>
                        }
                        {(maxHeight > height) && 
                            <Button 
                                className={styles.button}
                                icon 
                                onClick={handleBlockNavRight}
                            >
                                <Icon 
                                    className={styles.navIcon} 
                                    name="chevron right" 
                                    size="small" 
                                />
                            </Button>
                        }
                    </>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip content={content.txCount} />
                    <p>Transaction Count</p>
                </Grid.Column> 
                <Grid.Column className={styles.column} width={12}>
                    <p>{txCount ? txCount : 0}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className={styles.row}>
                <Grid.Column className={styles.column} width={3}>
                    <HelpTooltip content={content.previousBlock} />
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
                    <HelpTooltip content={content.txRoot} />
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
                    <HelpTooltip content={content.stateRoot} />
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
                    <HelpTooltip content={content.headerRoot} />
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
                    <HelpTooltip content={content.groupSignature} />
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