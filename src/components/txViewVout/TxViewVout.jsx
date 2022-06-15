import React from "react";
import { Container } from "semantic-ui-react";
import { CollapsableCard, TxViewDataStore, TxViewValueStore, } from "components";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";

export function TxViewVout({ txInfo }) {

    const valueStores = txInfo.filter(tx => tx.ValueStore);
    const dataStores = txInfo.filter(tx => tx.DataStore);

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
                                title={`DataStore ${index + 1}`}
                                borderless
                            >
                                <TxViewDataStore dataStore={dataStore} />
                            </CollapsableCard>
                        )
                    )}
                </CollapsableCard>
            }
            {console.log({ valueStores })}
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
                                title={`ValueStore ${index + 1}`}
                                borderless
                            >
                                <TxViewValueStore valueStore={valueStore} />
                            </CollapsableCard>
                        )
                    )}
                </CollapsableCard>
            }

        </Container>
    );

}
