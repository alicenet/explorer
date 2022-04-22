import React, { useState } from 'react';
import { 
    Container, 
    Segment, 
    Accordion, 
    Icon
} from "semantic-ui-react"
import './collapsableCard.css';

function CollapsableCard({ children, open = false, title, disabled, icon = false, ...props }) {
    const [isBlockOpen, toggleBlock] = useState(open);

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