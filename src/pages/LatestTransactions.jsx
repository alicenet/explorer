import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTable } from '../components/table';
import { ReactComponent as TxIcon } from '../assets/tx-icon.svg';
import { aliceNetAdapter } from '../adapter/alicenetadapter';

const HEADERS_TX = ["Value", "TX Index", "Owner"]

export function LatestTransactions() {
    useSelector(s => s.aliceNetAdapter); // Listen to aliceNetAdapter State
    //TODO monitor txs
    const rows = aliceNetAdapter.blocks?.slice(0, aliceNetAdapter.blocksMaxLen).map((e, i) => {
        return {
            [HEADERS_TX[0]]: e['BClaims']['Height'],
            [HEADERS_TX[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0,
            [HEADERS_TX[2]]: `0x${e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}`
        }
    })

    return <CustomTable
            Icon={() => <TxIcon />}
            headers={HEADERS_TX}
            rows={rows}
            title={"Latest Transactions"} />
}
