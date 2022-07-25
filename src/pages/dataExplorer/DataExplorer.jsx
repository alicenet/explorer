import React, { useEffect, useState } from "react";
import { Container, Dimmer, Grid, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { SearchBar, CollapsableCard, DatastoreView, InvalidInput, Page, SearchNotFound } from "components";
import { ReactComponent as FileIcon } from "assets/file-icon.svg";
import { searchTypes } from "utils";

export function DataExplorer() {

    const [datastoreInfo, setDatastoreInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { address, offset } = useParams();

    useEffect(() => {
        const getDataStores = async () => {
            if (address) {
                const [dataStores] = await aliceNetAdapter.getDataStoresForAddres(address);
                setDatastoreInfo(dataStores);
            } else {
                setDatastoreInfo({ error: "Invalid address" });
            }
            setIsLoading(false);
        }
        getDataStores();
    }, [address, offset]);


    if (isLoading) {
        return (
            <Page>
                <Grid>
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </Grid>
            </Page>
        );
    }

    return (

        <Page>

            <Container className="flex flex-col gap-10">

                <Container>

                    <SearchBar currentSearch={{ type: searchTypes.DATASTORES }} />

                </Container>

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
                    <CollapsableCard
                        title="Indexes from Offset"
                        icon={<FileIcon />}
                        itemsCount={datastoreInfo.length}
                    >
                        <DatastoreView datastoreInfo={datastoreInfo} />
                    </CollapsableCard>
                }

            </Container>

        </Page>

    );

}