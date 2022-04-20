import React from 'react';
import { Container, Grid } from "semantic-ui-react"
import CallToAction from "./callToAction";
import CustomTable from "./table/customTable"
import { ReactComponent as BlocksIcon } from '../Assets/blocks-icon.svg';
import { ReactComponent as TxIcon } from '../Assets/tx-icon.svg';

//TODO get actual data
const PLACEHOLDERS = [{label: 'xxxx0', index: 'x0', address: '000x000abcdefghijklmnopqrst'}, {label: 'xxxx1', index: 'x1', address: '000x000abcdefghijklmnopqrst'}, {label: 'xxxx2', index: 'x2', address: '000x000abcdefghijklmnopqrst'}]
const HEADERS_BLOCKS = ["Height", "TX Count", "Group Signature"]
const HEADERS_TX = ["Value", "TX Index", "Owner"]

const LatestBlocks = () => <CustomTable Icon={() => <BlocksIcon/>} headers={HEADERS_BLOCKS} rows={PLACEHOLDERS} title={"Latest Blocks"}/>

const LatestTransactions = () => <CustomTable Icon={() => <TxIcon/>} headers={HEADERS_TX} rows={PLACEHOLDERS} title={"Latest Transactions"}/>

function Home() {
    return (
        <Container>
            <CallToAction 
                label="View our DataStore and experience history in the making" 
                buttonLabel="View first datastore" 
                onClick={() => {}}/>
            <Grid centered columns='equal'>
                <Grid.Column >
                    <LatestBlocks/>
                </Grid.Column>
                <Grid.Column >
                    <LatestTransactions/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
export default Home;