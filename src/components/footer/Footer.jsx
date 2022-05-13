import { ReactComponent as DiscordIcon } from 'assets/discord-icon.svg';
import { ReactComponent as TwitterIcon } from 'assets/twitter-icon.svg';
import styles from './Footer.module.scss'; 

export function Footer(){
    return <div className={styles.container}>
                <div className={styles.section}>
                    Follow us on: 
                    <TwitterIcon width={15} className={styles.svg}/> 
                    <DiscordIcon width={15} className={styles.svg}/> 
                </div>
                <div className={styles.section}>
                    <span className={styles.action} onClick={() => window.location = "https://madnetwork.com"}>About</span>
                    <span className={styles.action} onClick={() => window.location = "https://madnetwork.com"}>Legal</span>
                    <span className={styles.action} onClick={() => window.location = "https://madnetwork.com"}>Terms of service</span>
                    <span className={styles.copyright}>Madnet Inc © 2022</span>
                </div>
            </div>
}
