import React, { useState } from 'react';
import { 
    Container, 
    Segment, 
    Accordion, 
    Icon
} from "semantic-ui-react"
import styles from './CollapsableCard.module.scss';

function CollapsableCard({ children, open = false, title, disabled = false, icon = false, ...props }) {
    const [isBlockOpen, toggleBlock] = useState(open);

    return (
        <Container className={styles.collapsableCard}>
            <Segment 
                textAlign="left" 
                className={`${styles.accordionSegment} ${ !isBlockOpen || disabled ? styles.closed : '' } ${disabled ? styles.disabled : ''}`} 
            >
                <Accordion {...props}>
                    <Accordion.Title
                        className={styles.accordionTitle}
                        active={isBlockOpen && !disabled}
                        onClick={() => toggleBlock(isOpen => !isOpen)}
                    >
                        {icon}
                        <h3>{title}</h3>
                        <Icon name="caret down" />
                    </Accordion.Title>

                    <Accordion.Content 
                        active={isBlockOpen && !disabled} 
                        style={{ paddingTop: 0 }}
                    >
                        {children}
                    </Accordion.Content>
                </Accordion>
            </Segment>
        </Container>
    )
}

export default CollapsableCard;