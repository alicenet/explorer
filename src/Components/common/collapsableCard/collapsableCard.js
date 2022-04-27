import React, { useState } from 'react';
import { 
    Container, 
    Segment, 
    Accordion, 
    Icon
} from "semantic-ui-react"
import './collapsableCard.css';

function CollapsableCard({ 
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
        <Container className="collapsableCard">
            <Segment 
                textAlign="left" 
                className={`accordionSegment ${ !isBlockOpen || disabled ? 'closed' : '' } ${ borderless ? 'borderless' : '' }`} 
            >
                <Accordion {...props}>
                    <Accordion.Title
                        className="accordionTitle"
                        active={isBlockOpen && !disabled}
                        onClick={() => toggleBlock(isOpen => !isOpen)}
                    >
                        {icon}
                        <h3>{title}</h3>
                        {itemsCount && (
                            <span className="countLabel">
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

export default CollapsableCard;