import React, { useContext } from 'react';
import { StoreContext } from "../../Store/store.js";
import CollapsableCard from './collapsableCard'; 
import BlockList from './blockList'; 
import TxHashList from './txHashList'; 
import { ReactComponent as CubeIcon } from '../../Assets/cube-icon.svg';
import { ReactComponent as TxHashIcon } from '../../Assets/tx-hash-icon.svg';

function BlockDetails({ txDrop, setTxDrop, txList, ...props }) {
    const { store } = useContext(StoreContext);

    return (
        <>
            <CollapsableCard 
                title={`Block #${store.madNetAdapter.blockInfo['BClaims']['Height']}`}
                icon={<CubeIcon />}
                open={true}
            >
                <BlockList {...props} />
            </CollapsableCard>

            <CollapsableCard 
                title="Transaction Hash List"
                icon={<TxHashIcon />}
                // disabled
            >
                <TxHashList {...props} />
            </CollapsableCard>
        </>
    )
}

export default BlockDetails;