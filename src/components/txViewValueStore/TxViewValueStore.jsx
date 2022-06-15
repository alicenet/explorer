import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { content, HelpTooltip } from "components";
import { copyText } from "utils";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    console.log({valueStore});

    const ADDRESS_TYPES = { BN: "BN", SecP: "SecP" };
    const history = useHistory();

    const isBN = address => address.substring(0, 2) === ADDRESS_TYPES.BN;

    return (

        <Grid padded="vertically">
            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.value} />
                    <p>Value:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{valueStore['VSPreImage']['Value'] ? aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value']) : 0}</p>
                    <Icon
                        name="copy outline"
                        className="click"
                        onClick={() => copyText("0x" + valueStore['TXInLinker']['TXInPreImage']['ConsumedTxHash'])}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.owner} />
                    <p>Owner:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    0x{valueStore['VSPreImage']['Owner'].slice(4)}{isBN(valueStore['VSPreImage']['Owner'])}
                    <Icon name="copy outline" className="click"
                          onClick={() => copyText("0x" + valueStore['VSPreImage']['Owner'])} />
                    <Button className="text-xs px-3 py-1 ml-2 rounded-sm tracking-wide"
                            onClick={() => history.push('/data')}>View Owner DataStores</Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    <HelpTooltip content={content.txIndex} />
                    <p>Transaction Index:</p>
                </Grid.Column>
                <Grid.Column width={11}>
                    <p>{valueStore['VSPreImage']['TXOutIdx'] ? valueStore['VSPreImage']['TXOutIdx'] : 0}</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );

}
