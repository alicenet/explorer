import React from "react";
import { Container } from "semantic-ui-react";
import { CollapsableCard, TxViewDataStore, TxViewValueStore, } from "components";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewVout({ txInfo }) {

    const dataStores = txInfo.filter(tx => tx.DataStore);
    const valueStores = txInfo.filter(tx => tx.ValueStore);

    return (

        <Container className="bg-black p-4 flex flex-col gap-4">

            {
                dataStores.length > 0 &&
                <CollapsableCard
                    title="DataStores"
                    borderless
                    itemsCount={dataStores.length}
                    icon={<DataStoreIcon />}
                >
                    {dataStores.map((dataStore, index) => (
                            <CollapsableCard
                                classNames="bg-black"
                                borderless
                                key={`collapsable-tx-vout-ds-${index}`}
                                title={`DataStore 0x${dataStore['DataStore']['DSLinker']['DSPreImage']['Index']}`}
                            >
                                <TxViewDataStore dataStore={dataStore?.DataStore} />
                            </CollapsableCard>
                        )
                    )}
                </CollapsableCard>
            }

            {
                valueStores.length > 0 &&
                <CollapsableCard
                    title="ValueStores"
                    borderless
                    itemsCount={valueStores.length}
                    icon={<ValueStoreIcon />}
                >
                    {valueStores.map((valueStore, index) => (
                            <CollapsableCard
                                classNames="bg-black"
                                borderless
                                key={`collapsable-tx-vout-vs-${index}`}
                                title={`ValueStore ${aliceNetAdapter.hexToInt(valueStore['ValueStore']['VSPreImage']['Value'])}`}
                            >
                                <TxViewValueStore valueStore={valueStore?.ValueStore} />
                            </CollapsableCard>
                        )
                    )}
                </CollapsableCard>
            }

        </Container>
    );

}
