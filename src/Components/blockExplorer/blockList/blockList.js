import React from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { copyText } from '../../../utils/copyText';
import Help from '../../help.js';
import './blockList.css';

function BlockDetails({ height, txCount, prevBlock, txRoot, stateRoot, headerRoot, sigGroup, handleBlockNav }) {
    return (
        <Grid className="blockList" padded='vertically'>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="height" />
                    <p>Block Height</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    {height}
                    <>
                        {/* TODO Add on click action */}
                        <Button icon onClick={handleBlockNav}><Icon name="chevron left" size="small" /></Button>
                        <Button icon onClick={handleBlockNav}><Icon name="chevron right" size="small" /></Button>
                    </>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="txCount" />
                    <p>Transaction Count</p>
                </Grid.Column> 
                <Grid.Column width={12}>
                    <p>{txCount ? txCount : 0}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="previousBlock" />
                    <p>Previous Block</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${prevBlock}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + prevBlock)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="txRoot" />
                    <p>Transaction Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${txRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + txRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="stateRoot" />
                        <p>State Root</p>
                    </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${stateRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + stateRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="headerRoot" />
                    <p>Header Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${headerRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + headerRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="groupSignature" />
                    <p>Group Signature</p>
                </Grid.Column>
                <Grid.Column width={12}>
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

export default BlockDetails;