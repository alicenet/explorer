import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Grid } from "semantic-ui-react";
import './txHashList.css';

function TxHashList({ txHshLst, handleTxPopupClick, ...props }) {
    if (!txHshLst) {
        return (<p></p>);
    }

    return <Grid padded='vertically'>
        {txHshLst && txHshLst.map((hash, index) => {
            return (
                <Grid.Row key={index}>
                    <Grid.Column width={1}>Tx Hash</Grid.Column>
                    <Grid.Column width={13}>
                        <Link to="/">0x{hash}</Link>
                        <Icon 
                            name="copy outline" 
                            className="click" 
                            onClick={() => props.states.copyText("0x" + hash)} 
                        />
                    </Grid.Column>
                </Grid.Row>
            )
        })}
    </Grid>
}

export default TxHashList;