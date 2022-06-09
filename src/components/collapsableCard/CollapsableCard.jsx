import React, { useState } from "react";
import { Accordion, Container, Icon } from "semantic-ui-react";
import { classNames } from "utils";

export function CollapsableCard({
    children,
    title,
    itemsCount,
    icon = false,
    borderless = false,
    ...props
}) {
    const [isBlockOpen, toggleBlock] = useState(true);

    return (

        <Container
            className={
                classNames(
                    "border-0 rounded-md bg-tableblack text-white",
                    { "border-t-2 border-neongreen": !borderless }
                )
            }
        >

            <Accordion className="m-0 text-left" {...props}>

                <Accordion.Title
                    active={isBlockOpen}
                    className="flex flex-row items-center text-white cursor-pointer gap-3 p-6"
                    onClick={() => toggleBlock(isOpen => !isOpen)}
                >
                    {icon}
                    <h3>{title}</h3>
                    {itemsCount && (
                        <span className="bg-black rounded-md px-2">
                            {itemsCount}
                        </span>
                    )}
                    <Icon className="m-0 h-auto" name={`caret ${isBlockOpen ? 'down' : 'up'}`} />
                </Accordion.Title>

                <Accordion.Content className="p-0" active={isBlockOpen}>
                    {children}
                </Accordion.Content>

            </Accordion>

        </Container>

    );
}