import React, { useState } from "react";
import { ContentCopy } from '@mui/icons-material';
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
                    <ContentCopy
                        className="cursor-pointer hover:opacity-80 mobile:hidden w-4"
                        onClick={() => handleClick(value)}
                    />
                </div>
            </Tooltip>
        </div>

    );

}