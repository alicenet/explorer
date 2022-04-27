import React from 'react';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import CollapsableCard from '../../common/collapsableCard/collapsableCard';
import { copyText } from '../../../Utils/copyText';
import Help from '../../help.js';
import './dataView.css';

function DataView({ dsView, dsDataStores, paginate, viewTransaction, getDSExp }) {
    if (dsDataStores.length === 0) {
        return (
            <Grid padded>
                <Grid.Row>
                    <p>No DataStores to display!</p>
                </Grid.Row>
            </Grid>
        );
    }

    if (dsView.length <= 0) {
        return (<></>);
    }
        
    return (
        <Grid className="dataView" >
            <Grid.Column className="outerColumn">
                <Segment className="segmentContainer">
                    {dsView.map((e, i) => (
                        <CollapsableCard 
                            title={`Index: 0x${e["DSLinker"]["DSPreImage"]["Index"]}`}
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
                                                getDSExp(e['DSLinker']['DSPreImage']['RawData'], 
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

                                        <Button 
                                            className="viewOwner"
                                            onClick={() => viewTransaction(e["DSLinker"]["TxHash"], true)}
                                        >
                                            View Owner Datastores
                                        </Button>
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