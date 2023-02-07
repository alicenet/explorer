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

    const { address, index: index } = useParams();

    useEffect(() => {
        const getDataStores = async () => {
            try {
                const [dataStores] = await aliceNetAdapter.getDataStoresForAddress(address, curveTypes.SECP256K1, index || 1);
                if (index && dataStores.length > 1) {
                    setDatastoreInfo(dataStores.slice(0, 1));
                } else {
                    setDatastoreInfo(dataStores);
                }
            } catch (e) {
                setDatastoreInfo({ error: "Invalid address" });
            }
            setIsLoading(false);
        }
        getDataStores();
    }, [address, index]);

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
                        title="Indexes"
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