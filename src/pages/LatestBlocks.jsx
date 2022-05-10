import React from 'react';
import { CustomTable } from '../components/table';
import { ReactComponent as BlocksIcon } from '../assets/blocks-icon.svg';
import { useSelector } from 'react-redux';
import { aliceNetAdapter } from '../adapter/alicenetadapter';

const HEADERS_BLOCKS = ["Height", "TX Count", "Group Signature"]

export function LatestBlocks() {
    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State

    // Start monitor when component mounts
    React.useEffect(() => {
        if (aliceNetAdapter && !aliceNetAdapter.blocksStarted) {
            aliceNetAdapter.startMonitoringBlocks();
        }
        //return () => { if (aliceNetAdapter && aliceNetAdapter) { aliceNetAdapter.blocksReset() } }
    }, [aliceNetAdapter]); // eslint-disable-line react-hooks/exhaustive-deps

    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((e, i) => {
        return {
            [HEADERS_BLOCKS[0]]: e['BClaims']['Height'],
            [HEADERS_BLOCKS[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0,
            [HEADERS_BLOCKS[2]]: `0x${e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}`,
            "key" : `0x${e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}`,
        }
    })

    return <CustomTable
            Icon={() => <BlocksIcon />}
            headers={HEADERS_BLOCKS}
            rows={rows}
            title={"Latest Blocks"} />
}