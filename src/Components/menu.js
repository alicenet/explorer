import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import Logo from "../Assets/MadNetwork Logo Horizontal GRAYSCALE.png";

//TODO define where to get this
const GITHUB_URL = 'https://github.com/madhive';
const WHITEPAPER_URL = 'https://www.madnetwork.com/madnetwork-download-whitepaper';
const COMMUNITY_URL = 'https://www.madnetwork.com/';
//TODO define where to get this
const WALLETS_PLACEHOLDER =[ 'wallet0', 'wallet1'] 

function MadNet(props) {
    return (
        <Menu pointing secondary fixed={'top'} style={{padding: '20px 15px', marginBottom: '5px'}}>
            <Menu.Menu position='left'>
                <Image className="logo click" src={Logo} style={{ height: '25px', width: '205px' }} as={Link} to="" onClick={() => props.states.history.push('/')} />
            </Menu.Menu>
            <Menu.Menu position='right'>
                <Menu.Item
                    as={Link}
                    to="blocks"
                    name="Monitor"
                    active={props.states.location.pathname.slice(1) === 'blocks'}
                />
                <Menu.Item
                    as={Link}
                    to="about"
                    name="About"
                    active={props.states.location.pathname.slice(1) === 'about'}
                />
                <Dropdown item text='Wallet Download'>
                    <Dropdown.Menu>
                        {WALLETS_PLACEHOLDER.map(wallet => 
                            <Dropdown.Item key={wallet}>{wallet}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                    name="Github"
                />
                <Menu.Item
                    onClick={() => window.open(WHITEPAPER_URL, '_blank').focus()}
                    name="Whitepaper"
                />
                <Menu.Item
                    onClick={() => window.open(COMMUNITY_URL, '_blank').focus()}
                    name="Community"
                />
            </Menu.Menu>
        </Menu>
    )
}

export default MadNet;