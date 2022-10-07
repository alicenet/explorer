import React from "react";
import { Accordion, TxViewDataStore, TxViewValueStore, } from "components";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewVout({ txInfo }) {

    const dataStores = txInfo.filter(tx => tx.DataStore);
    const valueStores = txInfo.filter(tx => tx.ValueStore);

    return (

        <div className="bg-headerblack p-4 flex flex-col gap-4 rounded-md rounded-t-none">

            {
                dataStores.length > 0 &&
                <Accordion
                    title="DataStores"
                    itemsCount={dataStores.length}
                    icon={<DataStoreIcon />}
                >
                    <div className="bg-tableblack p-4 pt-0 flex flex-col gap-3 rounded-md rounded-t-none">

                        {dataStores.map((dataStore, index) => (
                                <Accordion
                                    darkHeader
                                    key={`collapsable-tx-vout-ds-${index}`}
                                    title={`DataStore 0x${dataStore['DataStore']['DSLinker']['DSPreImage']['Index']}`}
                                >
                                    <TxViewDataStore dataStore={dataStore?.DataStore} />
                                </Accordion>
                            )
                        )}

                    </div>

                </Accordion>
            }

            {
                valueStores.length > 0 &&
                <Accordion
                    title="ValueStores"
                    itemsCount={valueStores.length}
                    icon={<ValueStoreIcon />}
                >
                    <div className="bg-tableblack p-4 pt-0 flex flex-col gap-3 rounded-md rounded-t-none">

                        {valueStores.map((valueStore, index) => (
                                <Accordion
                                    darkHeader
                                    key={`collapsable-tx-vout-vs-${index}`}
                                    title={`ValueStore ${aliceNetAdapter.hexToInt(valueStore['ValueStore']['VSPreImage']['Value'])}`}
                                >
                                    <TxViewValueStore valueStore={valueStore?.ValueStore} />
                                </Accordion>
                            )
                        )}

                    </div>

                </Accordion>
            }

        </div>
    );

}
