import React, { useEffect, useState } from "react";
import { Container, Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { AliceNetSearch, CollapsableCard, Page } from "components";
import { ReactComponent as FileIcon } from "assets/file-icon.svg";
import { DataView } from "./dataView";

export function DataExplorer({ location }) {
    const [dsView, setDsView] = useState();
    const [showMore, setShowMore] = useState(true);
    const [isLoading, setLoadingStatus] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const params = location && queryString.parse(location.search);
        const getDataStores = async () => {
            const { address, offset, curve, showMore } = params;

            setShowMore(JSON.parse(showMore));

            if (address) {
                try {
                    const [dataStores] = await aliceNetAdapter.getDataStoresForAddres(address, curve, offset);
                    setDsView(dataStores);
                } catch (error) {
                    console.log(error);
                }

            }

            setLoadingStatus(false);
        }

        getDataStores();
    }, [location]);

    const getDSExp = (rawData, deposit, issuedAt) => {
        return aliceNetAdapter.getDSExp(rawData, deposit, issuedAt);
    };

    const handleViewTransaction = async (txHash) => {
        history.push(`/tx?hash=${txHash}`);
    };

    if ((dsView?.error) || (!isLoading && (!dsView || !dsView.length))) {
        return (

            <Page>
                <div className="mb-8">
                    <AliceNetSearch />
                </div>
                <Grid centered>
                    <Grid.Row stretched centered>
                        <Container>
                            <Segment>
                                <p>No DataStores to display!</p>
                            </Segment>
                        </Container>
                    </Grid.Row>
                </Grid>
            </Page>
        );

    }

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

    const filteredData = showMore ? dsView : dsView?.slice(0, 1);

    return (

        <Page>
            <div className="mb-8">
                <AliceNetSearch />
            </div>
            <Grid stretched centered={true}>
                <Grid.Row>
                    <CollapsableCard
                        title="Indexes from Offset"
                        icon={<FileIcon />}
                        open={true}
                        disabled={false}
                        itemsCount={filteredData.length}
                    >
                        <DataView
                            dsView={filteredData}
                            paginate={null}
                            handleViewTransaction={handleViewTransaction}
                            getDSExp={getDSExp}
                        />
                    </CollapsableCard>
                </Grid.Row>
            </Grid>
        </Page>

    );

}