import React from "react";
import { Grid } from "semantic-ui-react"
import { HelpTooltip } from "components";
import { classNames } from "utils";

export function TwoColumnsRow({ title, tooltipContent, children, lastRow = false }) {

    return (

        <Grid.Row
            className={
                classNames("px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2",
                    { 'rounded-b-md': lastRow }
                )
            }
            columns={2}
        >

            <Grid.Column className="flex items-center gap-5 p-0" mobile={1} computer={3}>
                <HelpTooltip content={tooltipContent} />
                <p>{title}</p>
            </Grid.Column>

            <Grid.Column className="flex items-center gap-5 p-0">
                {children}
            </Grid.Column>

        </Grid.Row>

    );

}