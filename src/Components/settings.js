import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../AppContext/AppContext";
import { Container, Form, Button, Segment } from "semantic-ui-react"
import Switch from "react-switch";

function Settings(props) {
    // Store states and actions to update state
    const { store, actions } = useContext(StoreContext);
    // Object containing saved settings state
    const [settings, updateSettings] = useState(store.settings);

    // Updates for when component mounts or updates
    useEffect(() => {
        // Reset this component to orginal state
        if (props.states.refresh) {
            actions.resetSettings();
            updateSettings(store.settings)
            props.states.setRefresh(false);
        }
        return () => {
            updateSettings(store.settings);
        }
    }, [props, actions, store.settings])

    // Update settings state from user input
    const handleChange = (opt, event) => {
        if (opt === "theme") {
            updateSettings({
                ...settings,
                [opt]: settings.theme === "dark" ? "light" : "dark"
            })
            props.states.themeToggle(props.states.style === "dark" ? "light" : "dark")
            return;
        }
        updateSettings({
            ...settings,
            [opt]: event.target.value
        })
    }

    const downloadWallet = (dl) => {
        window.location.href = dl
        return;
    }

    // Update Store settings
    const handleSubmit = (e) => {
        e.preventDefault();
        actions.updateSettings(settings, props.states.style);
    }

    // Reset input fields to previous saved state
    const reset = (e) => {
        e.preventDefault();
        let lastSaved = store.settings;
        updateSettings(
            lastSaved
        )
    }
    return (
        <Container>
            <Segment raised>
                <Form>
                    <Form.Input onChange={(e) => handleChange("madnetProvider", e)} value={settings.madnetProvider || ""} fluid label="MadNet Provider" />
                    <Form.Field>
                        <p>Dark Mode</p>
                        <Switch onColor="#4aec75" offColor="#ff6464" offHandleColor="#212121" onHandleColor="#f0ece2" onChange={(e) => handleChange("theme", e)} checked={props.states.style === "dark"} />
                    </Form.Field>
                    <Button onClick={(e) => handleSubmit(e)} color="green">Save</Button>
                    <Button onClick={(e) => reset(e)} color="red">Cancel</Button>
                    <Button onClick={(e) => actions.resetSettings()} color="grey">Default</Button>
                </Form>
            </Segment>
            <Segment>
            <Form.Field>
                <h5>Wallet Downloads</h5>
                        <Button onClick={() => downloadWallet('https://storage.googleapis.com/madnet-wallet/Windows/MadWallet.exe')} color="blue">Windows</Button>
                        <Button onClick={() => downloadWallet('https://storage.googleapis.com/madnet-wallet/MacOS/MadWallet.app.zip')}color="blue">MacOS</Button>
                        <Button onClick={() => downloadWallet('https://storage.googleapis.com/madnet-wallet/Linux/MadWallet.zip')}color="blue">Linux</Button>
                    </Form.Field>
            </Segment>
        </Container>
    )

}
export default Settings;