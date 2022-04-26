import React from 'react';
import { Modal, Container, Divider } from 'semantic-ui-react';
import { AppContext, getContextState, actions } from '../AppContext/AppContext';

export default function ErrorOverlay() {
    const appContext = React.useContext(AppContext);
    const { error } = getContextState(appContext);
    return (
        <Modal size="tiny" open={!!error} centered onClose={() => actions.setError(false)}>
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