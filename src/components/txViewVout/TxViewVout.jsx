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

        <Container className="bg-headerblack p-4 flex flex-col gap-4 rounded-b-md">

            {
                dataStores.length > 0 &&
                <CollapsableCard
                    title="DataStores"
                    borderless
                    itemsCount={dataStores.length}
                    icon={<DataStoreIcon />}
                >
                    <Container className="bg-tableblack p-4 pt-0 flex flex-col gap-3 rounded-b-md">

                        {dataStores.map((dataStore, index) => (
                                <CollapsableCard
                                    classNames="bg-headerblack rounded-md"
                                    borderless
                                    key={`collapsable-tx-vout-ds-${index}`}
                                    title={`DataStore 0x${dataStore['DataStore']['DSLinker']['DSPreImage']['Index']}`}
                                >
                                    <TxViewDataStore dataStore={dataStore?.DataStore} />
                                </CollapsableCard>
                            )
                        )}

                    </Container>

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
                    <Container className="bg-tableblack p-4 pt-0 flex flex-col gap-3 rounded-b-md">

                        {valueStores.map((valueStore, index) => (
                                <CollapsableCard
                                    classNames="bg-headerblack rounded-md"
                                    borderless
                                    key={`collapsable-tx-vout-vs-${index}`}
                                    title={`ValueStore ${aliceNetAdapter.hexToInt(valueStore['ValueStore']['VSPreImage']['Value'])}`}
                                >
                                    <TxViewValueStore valueStore={valueStore?.ValueStore} />
                                </CollapsableCard>
                            )
                        )}

                    </Container>

                </CollapsableCard>
            }

        </Container>
    );

}
