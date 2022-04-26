import { ReactComponent as DiscordIcon } from '../assets/discord-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';

const StyleFooterContainer = {
    width: '100%',
    background: '#2D2D2D',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: '0',
    position: 'fixed'
}

const StyleFooterSection = {
    display: 'flex', 
    alignItems: 'center', 
    margin: '0 15px'
}

const StyleFooterSectionAction = {
    ...StyleFooterSection,
    cursor: 'pointer'
}

const StyleFooterSectionCopyright = {
    ...StyleFooterSection,
    color: '#797777'
}

const StyleFooterSVG = {
    fill:'white', 
    margin: '0 5px',
    cursor: 'pointer'
}

function Footer(){
    return <div style={StyleFooterContainer}>
                <div style={StyleFooterSection}>
                    Follow us on: 
                    <TwitterIcon width={15} style={StyleFooterSVG}/> 
                    <DiscordIcon width={15} style={StyleFooterSVG}/> 
                </div>
                <div style={StyleFooterSection}>
                    <span style={StyleFooterSectionAction} onClick={() => window.location = "https://madnetwork.com"}>About</span>
                    <span style={StyleFooterSectionAction} onClick={() => window.location = "https://madnetwork.com"}>Legal</span>
                    <span style={StyleFooterSectionAction} onClick={() => window.location = "https://madnetwork.com"}>Terms of service</span>
                    <span style={StyleFooterSectionCopyright}>Madnet Inc © 2022</span>
                </div>
            </div>
}

export default Footer;