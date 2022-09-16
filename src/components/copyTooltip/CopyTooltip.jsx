import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { copyText } from "utils";
import { Tooltip } from "@mui/material";

export function CopyTooltip({ value, content, children }) {

    const [contentMessage, setContentMessage] = useState(content);

    const handleClick = valueToCopy => {
        setContentMessage("Copied!");
        copyText(valueToCopy);
    };

    return (

        <div className="flex items-start gap-3">
            {children}
            <Tooltip placement={"top"} arrow title={contentMessage} onClose={() => setContentMessage(content)}>
                <div>
                    <Icon
                        name="copy outline"
                        className="cursor-pointer hover:opacity-80 mobile:hidden"
                        onClick={() => handleClick(value)}
                    />
                </div>
            </Tooltip>
        </div>

    );

}