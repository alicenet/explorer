import React from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { copyText } from '../../../Utils/copyText';
import Help from '../../help.js';
import './blockList.css'

function BlockDetails({ blockInfo, handleBlockNav }) {
    return (
        <Grid className="blockList" padded='vertically'>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="height" />
                    <p>Block Height</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    {blockInfo.BClaims.Height}
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
                    <p>{blockInfo.BClaims.TxCount ? blockInfo.BClaims.TxCount : 0}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="previousBlock" />
                    <p>Previous Block</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${blockInfo.BClaims.PrevBlock}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + blockInfo.BClaims.PrevBlock)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="txRoot" />
                    <p>Transaction Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${blockInfo.BClaims.TxRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + blockInfo.BClaims.TxRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="stateRoot" />
                        <p>State Root</p>
                    </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${blockInfo.BClaims.StateRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + blockInfo.BClaims.StateRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="headerRoot" />
                    <p>Header Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${blockInfo.BClaims.HeaderRoot}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + blockInfo.BClaims.HeaderRoot)} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type="groupSignature" />
                    <p>Group Signature</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${blockInfo.SigGroup}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => copyText("0x" + blockInfo.SigGroup)} 
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default BlockDetails;