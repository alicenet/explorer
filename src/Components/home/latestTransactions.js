import React, { useEffect, useContext } from 'react';
import CustomTable from '../table/customTable';
import { StoreContext } from '../../Store/store.js';
import { ReactComponent as TxIcon } from '../../Assets/tx-icon.svg';

const HEADERS_TX = ["Value", "TX Index", "Owner"]

function LatestTx(){
    // Store states
    const { store } = useContext(StoreContext);

    // Start monitor when component mounts
    useEffect(() => {
        if (store && store.madNetAdapter && !store.madNetAdapter.blocksStarted) {
            store.madNetAdapter.monitorBlocks();  //TODO monitor txs
        }
        return () => { if (store && store.madNetAdapter) { store.madNetAdapter.blocksReset() } }
    }, [store.madNetAdapter]); // eslint-disable-line react-hooks/exhaustive-deps

    //TODO monitor txs
    const rows = store.madNetAdapter.blocks?.slice(0, store.madNetAdapter.blocksMaxLen).map((e, i) => {
        //TODO monitor txs
        return { 
            [HEADERS_TX[0]]: e['BClaims']['Height'], 
            [HEADERS_TX[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0, 
            [HEADERS_TX[2]]: `0x${e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}`}
    })

    return <CustomTable 
            Icon={() => <TxIcon/>} 
            headers={HEADERS_TX} 
            rows={rows} 
            title={"Latest Transactions"}/>
}

export default LatestTx;
