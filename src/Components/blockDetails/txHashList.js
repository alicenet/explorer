import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Grid } from "semantic-ui-react";
import './txHashList.css';

function TxHashList({ txHshLst, handleTxPopupClick, ...props }) {
    if (!txHshLst) {
        return (<p></p>);
    }

    return txHshLst && txHshLst.map((e, i) => {
        return (
            <Grid padded='vertically'>
                <Grid.Row className="row">
                    <Grid.Column width={1}>Tx Hash</Grid.Column>
                    <Grid.Column width={13}>
                        <Link to="/">0x{e}</Link>
                        <Icon 
                            name="copy outline" 
                            className="click" 
                            onClick={() => props.states.copyText("0x" + e)} 
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    })
}

export default TxHashList;