import React, { useContext } from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { StoreContext } from "../../Store/store.js";
import Help from '../help.js';
import './blockDetails.css'

function BlockDetails({ ...props }) {
    const { store } = useContext(StoreContext);

    return (
        <Grid padded='vertically'>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='height' />
                    <p>Block Height</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    {store.madNetAdapter.blockInfo['BClaims']['Height']}
                    <>
                        <Button icon><Icon name='chevron left' size='small' /></Button>
                        <Button icon><Icon name='chevron right' size='small' /></Button>
                    </>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='txCount' />
                    <p>Transaction Count</p>
                </Grid.Column> 
                <Grid.Column width={12}>
                    <p>
                        {
                            store.madNetAdapter.blockInfo['BClaims']['TxCount'] 
                            ? store.madNetAdapter.blockInfo['BClaims']['TxCount'] 
                            : 0
                        }
                    </p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='previousBlock' />
                    <p>Previous Block</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${store.madNetAdapter.blockInfo['BClaims']['PrevBlock']}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['PrevBlock'])} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='txRoot' />
                    <p>Transaction Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${store.madNetAdapter.blockInfo['BClaims']['TxRoot']}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['TxRoot'])} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='stateRoot' />
                        <p>State Root</p>
                    </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${store.madNetAdapter.blockInfo['BClaims']['StateRoot']}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['StateRoot'])} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='headerRoot' />
                    <p>Header Root</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${store.madNetAdapter.blockInfo['BClaims']['HeaderRoot']}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['HeaderRoot'])} 
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Help type='groupSignature' />
                    <p>Group Signature</p>
                </Grid.Column>
                <Grid.Column width={12}>
                    <p>{`0x${store.madNetAdapter.blockInfo['SigGroup']}`}</p>
                    <Icon 
                        name="copy outline" 
                        className="click" 
                        onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['SigGroup'])} 
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default BlockDetails;