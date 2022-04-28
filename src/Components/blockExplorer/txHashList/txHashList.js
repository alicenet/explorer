import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Grid } from "semantic-ui-react";
import { copyText } from '../../../utils/copyText';
import './txHashList.css';

function TxHashList({ txHshLst, handleViewTransaction }) {
    if (!txHshLst) {
        return (<p></p>);
    }

    return (
        <Grid className="txHashList" padded='vertically'>
            {txHshLst && txHshLst.map((hash, index) => {
                return (
                    <Grid.Row key={index}>
                        <Grid.Column width={1}>Tx Hash</Grid.Column>
                        <Grid.Column width={13}>
                            {/* TODO add link url  */}
                            <Link to="/">0x{hash}</Link>
                            <Icon 
                                name="copy outline" 
                                className="click" 
                                onClick={() => copyText("0x" + hash)} 
                            />
                        </Grid.Column>
                    </Grid.Row>
                )
            })}
        </Grid>
    )
}

export default TxHashList;