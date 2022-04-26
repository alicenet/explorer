import React from 'react';
import { Button, Segment, Icon, Grid, Popup } from 'semantic-ui-react';
import CollapsableCard from '../../common/collapsableCard/collapsableCard';
import { copyText } from '../../../Utils/copyText';
import Help from '../../help.js';
import './dataView.css';

function DataView({ store, paginate,  ...props }) {
    if (store.madNetAdapter.dsDataStores.length === 0) {
        return (<p>No DataStores to display!</p>);
    }

    if (store.madNetAdapter.dsView.length <= 0) {
        return (<></>);
    }
        
    return (
        <Grid className="dataView" >
            <Grid.Column>
                <Segment className="segmentContainer">
                    {store.madNetAdapter.dsView.map((e, i) => (
                        <CollapsableCard 
                            title={`Index: 0x${e["DSLinker"]["DSPreImage"]["Index"]}`}
                            // icon={<CubeIcon />}
                            open={true}
                            disabled={false}
                            key={i}
                            borderless
                        >
                            <Grid padded="vertically">
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Help type="index" />
                                        <p>Index:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <p>0x{e["DSLinker"]["DSPreImage"]["Index"]}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + e["DSLinker"]["DSPreImage"]["Index"])} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Help type="rawData" />
                                        <p>Data:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <p>0x{e["DSLinker"]["DSPreImage"]["RawData"]}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + e["DSLinker"]["DSPreImage"]["RawData"])} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Help type="expires" />
                                        <p>Expires:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <p>
                                            {
                                                store.madNetAdapter.getDSExp(e['DSLinker']['DSPreImage']['RawData'], 
                                                e['DSLinker']['DSPreImage']['Deposit'], 
                                                e['DSLinker']['DSPreImage']['IssuedAt'])
                                            }    
                                        </p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + e["DSLinker"]["DSPreImage"]["RawData"])} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Help type="txHash" />
                                        <p>Transaction Hash:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <p>0x{e["DSLinker"]["TxHash"]}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + e["DSLinker"]["TxHash"])} 
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Help type="txHash" />
                                        <p>Transaction Hash:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <p>0x{e["DSLinker"]["TxHash"]}</p>
                                        <Icon 
                                            name="copy outline" 
                                            className="click" 
                                            onClick={() => copyText("0x" + e["DSLinker"]["TxHash"])} 
                                        />
                                        <Popup
                                            trigger={
                                                <Icon 
                                                    className="click" 
                                                    name="external" 
                                                    onClick={() => store.madNetAdapter.viewTransaction(e["DSLinker"]["TxHash"], true)} 
                                                />
                                            }
                                            content={'View Transaction'}
                                            position='top left'
                                            hideOnScroll
                                            style={{ zIndex: 9999999 }}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </CollapsableCard>
                    ))}
                </Segment>
                {paginate()}
            </Grid.Column>
        </Grid>
    )
}

export default DataView;