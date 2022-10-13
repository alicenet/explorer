import React from "react";
import { SecondaryAccordion, TertiaryAccordion, TxViewDataStore, TxViewValueStore, } from "components";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Box, useTheme } from "@mui/material";

export function TxViewVout({ txInfo }) {

    const dataStores = txInfo.filter(tx => tx.DataStore);
    const valueStores = txInfo.filter(tx => tx.ValueStore);
    const theme = useTheme();

    return (

        <>

            {
                dataStores.length > 0 &&
                <SecondaryAccordion
                    title="DataStores"
                    itemsCount={dataStores.length}
                    icon={<DataStoreIcon />}
                >
                    <Box
                        sx={{ background: theme.palette.tableBlack.main }}
                        className="p-4 pt-0 flex flex-col gap-3 rounded-md rounded-t-none"
                    >
                        {dataStores.map((dataStore, index) => (
                                <TertiaryAccordion
                                    key={`collapsable-tx-vout-ds-${index}`}
                                    title={`DataStore 0x${dataStore['DataStore']['DSLinker']['DSPreImage']['Index']}`}
                                >
                                    <TxViewDataStore dataStore={dataStore?.DataStore} />
                                </TertiaryAccordion>
                            )
                        )}
                    </Box>
                </SecondaryAccordion>
            }

            {
                valueStores.length > 0 &&
                <SecondaryAccordion
                    title="ValueStores"
                    itemsCount={valueStores.length}
                    icon={<ValueStoreIcon />}
                >
                    <Box
                        sx={{ background: theme.palette.tableBlack.main }}
                        className="p-4 pt-0 flex flex-col gap-3 rounded-md rounded-t-none"
                    >
                        {valueStores.map((valueStore, index) => (
                                <TertiaryAccordion
                                    key={`collapsable-tx-vout-vs-${index}`}
                                    title={`ValueStore ${aliceNetAdapter.hexToInt(valueStore['ValueStore']['VSPreImage']['Value'])}`}
                                >
                                    <TxViewValueStore valueStore={valueStore?.ValueStore} />
                                </TertiaryAccordion>
                            )
                        )}
                    </Box>
                </SecondaryAccordion>
            }

        </>
    );

}
