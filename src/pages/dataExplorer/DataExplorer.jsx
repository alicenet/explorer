import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { DatastoreView, InvalidInput, Page, PrimaryAccordion, SearchBar, SearchNotFound } from "components";
import { ReactComponent as FileIcon } from "assets/file-icon.svg";
import { curveTypes, searchTypes } from "utils";
import { Box } from "@mui/material";

export function DataExplorer() {

    const [datastoreInfo, setDatastoreInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { address, offset } = useParams();

    useEffect(() => {
        const getDataStores = async () => {
            if (address) {
                const [dataStores] = await aliceNetAdapter.getDataStoresForAddress(address, curveTypes.SECP256K1, offset);
                setDatastoreInfo(dataStores);
            } else {
                setDatastoreInfo({ error: "Invalid address" });
            }
            setIsLoading(false);
        }
        getDataStores();
    }, [address, offset]);

    if (isLoading) {
        return null;
    }

    return (

        <Page>

            <Box display="flex" flexDirection="column" gap={4}>

                <SearchBar currentSearch={{ type: searchTypes.DATASTORES }} />

                {
                    datastoreInfo.length === 0 &&
                    <SearchNotFound term={address} />
                }

                {
                    (!datastoreInfo || datastoreInfo.error) &&
                    <InvalidInput term={address} />
                }

                {
                    datastoreInfo && !datastoreInfo.error && datastoreInfo.length > 0 &&
                    <PrimaryAccordion
                        padded
                        title="Indexes from Offset"
                        icon={<FileIcon />}
                        itemsCount={datastoreInfo.length}
                    >
                        <DatastoreView datastoreInfo={datastoreInfo} />
                    </PrimaryAccordion>
                }

            </Box>

        </Page>

    );

}