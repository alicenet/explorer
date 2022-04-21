import React, { useContext } from 'react';
import { Button, Icon, Grid } from "semantic-ui-react"
import { StoreContext } from "../../Store/store.js";
import Help from '../help.js';
import './blockDetails.css'
import CollapsableCard from './collapsableCard'; 
import TxHashList from './txHashList'; 
import { ReactComponent as CubeIcon } from '../../Assets/cube-icon.svg';

function BlockDetails({ txDrop, setTxDrop, txList, ...props }) {
    const { store } = useContext(StoreContext);

    return (
        <>
            <CollapsableCard 
                title={`Block #${store.madNetAdapter.blockInfo['BClaims']['Height']}`}
                icon={<CubeIcon width={15} />}
            >
                <Grid padded='vertically'>
                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='height' />Block Height</Grid.Column>
                        <Grid.Column width={12}>
                            {store.madNetAdapter.blockInfo['BClaims']['Height']}
                            <Button icon><Icon name='chevron left' size='small' /></Button>
                            <Button icon><Icon name='chevron right' size='small' /></Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='txCount' />Transaction Count</Grid.Column> 
                        <Grid.Column width={12}>
                            {
                                store.madNetAdapter.blockInfo['BClaims']['TxCount'] 
                                ? store.madNetAdapter.blockInfo['BClaims']['TxCount'] 
                                : 0
                            }
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='previousBlock' />Previous Block</Grid.Column>
                        <Grid.Column width={12}>
                            {`0x${store.madNetAdapter.blockInfo['BClaims']['PrevBlock']}`}
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['PrevBlock'])} 
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='txRoot' />Transaction Root</Grid.Column>
                        <Grid.Column width={12}>
                            {`0x${store.madNetAdapter.blockInfo['BClaims']['TxRoot']}`}
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['TxRoot'])} 
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='stateRoot' />State Root</Grid.Column>
                        <Grid.Column width={12}>
                            {`0x${store.madNetAdapter.blockInfo['BClaims']['StateRoot']}`}
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['StateRoot'])} 
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='headerRoot' />Header Root</Grid.Column>
                        <Grid.Column width={12}>
                            {`0x${store.madNetAdapter.blockInfo['BClaims']['HeaderRoot']}`}
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['BClaims']['HeaderRoot'])} 
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="row">
                        <Grid.Column width={3}><Help type='groupSignature' />Group Signature</Grid.Column>
                        <Grid.Column width={12}>
                            {`0x${store.madNetAdapter.blockInfo['SigGroup']}`}
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => props.states.copyText("0x" + store.madNetAdapter.blockInfo['SigGroup'])} 
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </CollapsableCard>

            <CollapsableCard 
                title="Transaction Hash List"
                // disabled
            >
                <TxHashList {...props} />
            </CollapsableCard>
        </>
    )
}

export default BlockDetails;