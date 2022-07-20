import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import { classNames as csx } from "utils";

export function CollapsableCard({
    children,
    title,
    itemsCount,
    icon = false,
    borderless = false,
    classNames = '',
    ...props
}) {
    const [isBlockOpen, toggleBlock] = useState(true);

    return (

        <div
            className={
                csx(
                    "border-0 rounded-md bg-tableblack text-white",
                    { "border-t-2 border-neongreen": !borderless },
                    classNames
                )
            }
        >

            <Accordion className="m-0 text-left" {...props}>

                <Accordion.Title
                    active={isBlockOpen}
                    className={classNames}
                    onClick={() => toggleBlock(isOpen => !isOpen)}
                >
                    <div className="flex text-white cursor-pointer gap-3 p-6 mobile:justify-between">
                        <div className="flex items-center gap-3">
                            {icon}
                            <h3>{title}</h3>
                            {itemsCount && (
                                <span className="bg-black rounded-md px-2">
                            {itemsCount}
                        </span>
                            )}
                        </div>
                        <Icon className="m-0 h-auto" name={`caret ${isBlockOpen ? 'down' : 'up'}`} />
                    </div>
                </Accordion.Title>

                <Accordion.Content className="p-0" active={isBlockOpen}>
                    {children}
                </Accordion.Content>

            </Accordion>

        </div>

    );
}