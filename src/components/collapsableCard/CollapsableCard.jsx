import React, { useState } from 'react';
import { 
    Container, 
    Segment, 
    Accordion, 
    Icon
} from "semantic-ui-react"
import styles from './CollapsableCard.module.scss';

export function CollapsableCard({ 
    children, 
    title, 
    itemsCount,
    disabled = false, 
    open = false, 
    icon = false, 
    borderless = false, 
    ...props 
}) {
    const [isBlockOpen, toggleBlock] = useState(open);

    return (
        <Container className={styles.collapsableCard}>
            <Segment 
                textAlign="left" 
                className={`${styles.accordionSegment} ${ !isBlockOpen || disabled ? styles.closed : '' } ${disabled ? styles.disabled : ''}  ${ borderless ? styles.borderless : '' }`} 
            >
                <Accordion {...props}>
                    <Accordion.Title
                        className={styles.accordionTitle}
                        active={isBlockOpen && !disabled}
                        onClick={() => toggleBlock(isOpen => !isOpen)}
                    >
                        {icon}
                        <h3>{title}</h3>
                        {itemsCount && (
                            <span className={styles.countLabel}>
                                {itemsCount}
                            </span>
                        )}
                        <Icon name="caret down" style={{ marginLeft: itemsCount ? '5px' : '15px' }} />
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