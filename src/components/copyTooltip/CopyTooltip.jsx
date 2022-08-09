import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { copyText } from "utils";

export function CopyTooltip({ value, content, children }) {

    const [contentMessage, setContentMessage] = useState(content);

    const handleClick = valueToCopy => {
        setContentMessage("Copied");
        copyText(valueToCopy);
    };

    return (

        <div className="flex items-start gap-3">

            {children}

            <Popup
                basic
                position="top center"
                on={["hover", "focus"]}
                content={contentMessage}
                onClose={() => setContentMessage(content)}
                trigger={
                    <Icon
                        name="copy outline"
                        className="cursor-pointer hover:opacity-80 mobile:hidden"
                        onClick={() => handleClick(value)}
                    />
                }
            />

        </div>

    );

}