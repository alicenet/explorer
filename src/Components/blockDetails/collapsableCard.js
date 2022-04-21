import React, { useState } from 'react';
import { 
    Container, 
    Segment, 
    Accordion, 
    Icon
} from "semantic-ui-react"
import './collapsableCard.css';

function CollapsableCard({ children, title, disabled, icon = false, ...props }) {
    const [isBlockOpen, toggleBlock] = useState(false);

    return (
        <Container className="collapsableCard">
            <Segment 
                textAlign="left" 
                className={`accordionSegment ${ !isBlockOpen || disabled ? 'closed' : '' }`} 
            >
                <Accordion {...props}>
                    <Accordion.Title
                        className="accordionTitle"
                        active={isBlockOpen && !disabled}
                        onClick={() => toggleBlock(isOpen => !isOpen)}
                    >
                        {icon}
                        {title}
                        <Icon name='dropdown' />
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