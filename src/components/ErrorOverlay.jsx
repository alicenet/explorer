import { aliceNetAdapter } from "adapter/alicenetadapter";
import React from "react";
import { useSelector } from "react-redux";
import { Modal, Container, Divider } from "semantic-ui-react";

export default function ErrorOverlay() {
    useSelector(s => s);

    const error = aliceNetAdapter.error || ""; // Todo: Update to support all required errors

    return (
        <Modal size="tiny" open={!!error} centered onClose={() => aliceNetAdapter.clearError()}>
            <Modal.Content scrolling>
                <Container textAlign="center" fluid>
                    <h2 className="b">Error!</h2>
                    <Divider />
                    {error}
                </Container>
            </Modal.Content>
        </Modal>
    )
}