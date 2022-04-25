import React, { useEffect, useContext } from 'react';
import CustomTable from '../table/customTable';
import { StoreContext } from '../../Store/store.js';
import { ReactComponent as BlocksIcon } from '../../Assets/blocks-icon.svg';

const HEADERS_BLOCKS = ["Height", "TX Count", "Group Signature"]

function LatestBlocks(){
    // Store states
    const { store } = useContext(StoreContext);

    // Start monitor when component mounts
    useEffect(() => {
        if (store && store.madNetAdapter && !store.madNetAdapter.blocksStarted) {
            store.madNetAdapter.monitorBlocks();
        }
        return () => { if (store && store.madNetAdapter) { store.madNetAdapter.blocksReset() } }
    }, [store.madNetAdapter]); // eslint-disable-line react-hooks/exhaustive-deps

    const rows = store.madNetAdapter.blocks?.slice(0, store.madNetAdapter.blocksMaxLen).map((e, i) => {
        return { 
            [HEADERS_BLOCKS[0]]: e['BClaims']['Height'], 
            [HEADERS_BLOCKS[1]]: e['BClaims']['TxCount'] ? e['BClaims']['TxCount'] : 0, 
            [HEADERS_BLOCKS[2]]: `0x${e['SigGroup'].slice(0, 20) + "..." + e['SigGroup'].slice(e['SigGroup'].length - 20)}`}
    })

    return <CustomTable 
            Icon={() => <BlocksIcon/>} 
            headers={HEADERS_BLOCKS} 
            rows={rows} 
            title={"Latest Blocks"}/>
}

export default LatestBlocks;
