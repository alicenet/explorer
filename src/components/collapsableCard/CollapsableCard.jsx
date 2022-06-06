import React, { useState } from "react";
import { Accordion, Container, Icon } from "semantic-ui-react";

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

        <Container className="border-0 border-t-4 border-neongreen rounded-md bg-tableblack text-white">

            <Accordion className="text-left" {...props}>

                <Accordion.Title
                    className="flex flex-row items-center text-white cursor-pointer gap-3 p-6"
                    active={isBlockOpen && !disabled}
                    onClick={() => toggleBlock(isOpen => !isOpen)}
                >
                    {icon}
                    <h3>{title}</h3>
                    {itemsCount && (
                        <span>
                            {itemsCount}
                        </span>
                    )}
                    <Icon className="m-0 h-auto px-3" name={`caret ${isBlockOpen ? 'down' : 'up'}`} />
                </Accordion.Title>

                <Accordion.Content className="p-0" active={isBlockOpen && !disabled}>
                    {children}
                </Accordion.Content>

            </Accordion>

        </Container>

    );
}