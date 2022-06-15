import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewDataStore({ dataStore }) {

    const ADDRESS_TYPES = { BN: "BN", SecP: "SecP" };
    const history = useHistory();

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    };

    const isBN = address => address.substring(0, 2) === ADDRESS_TYPES.BN;

    return (

        <Grid padded="vertically">
            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.index} />
                    <p>Index:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>0x{dataStore['DSLinker']['DSPreImage']['Index'] ? dataStore['DSLinker']['DSPreImage']['Index'] : 0}</p>
                    <Icon name="copy outline" className="click"
                          onClick={() => copyText("0x" + dataStore['DSLinker']['DSPreImage']['Index'])} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.rawData} />
                    <p>Raw Data:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    0x{dataStore['DSLinker']['DSPreImage']['RawData']}
                    <Icon name="copy outline" className="click"
                          onClick={() => copyText("0x" + dataStore['DSLinker']['DSPreImage']['RawData'])} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.owner} />
                    <p>Owner:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{dataStore['DSLinker']['DSPreImage']['Owner'].slice(4)}{isBN(dataStore['DSLinker']['DSPreImage']['Owner'])}</p>
                    <Icon name="copy outline" className="click"
                          onClick={() => copyText("0x" + dataStore['DSLinker']['DSPreImage']['Owner'])} />
                    <Button className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                            onClick={() => history.push('/data')}>View Owner DataStores</Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.epoch} />
                    <p>Issued At:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{dataStore['DSLinker']['DSPreImage']['IssuedAt']}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.epoch} />
                    <p>Issued At:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{dataStore['DSLinker']['DSPreImage']['IssuedAt']}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.expires} />
                    <p>Expires:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{getDSExp(dataStore['DSLinker']['DSPreImage']['RawData'], dataStore['DSLinker']['DSPreImage']['Deposit'], dataStore['DSLinker']['DSPreImage']['IssuedAt'])}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.deposit} />
                    <p>Deposit:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{dataStore['DSLinker']['DSPreImage']['TXOutIdx'] ? dataStore['DSLinker']['DSPreImage']['TXOutIdx'] : 0}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.signature} />
                    <p>Signature:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>0x{dataStore['Signature']}</p>
                    <Icon name="copy outline" className="click"
                          onClick={() => copyText("0x" + dataStore['Signature'])} />
                </Grid.Column>
            </Grid.Row>

        </Grid>
    );

}
