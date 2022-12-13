import React from "react";
import { Accordion } from "./Accordion";
import { Box, useTheme } from "@mui/material";

export function SecondaryAccordion(props) {

    const { padded, children, ...rest } = props;
    const theme = useTheme();

    return (

        <Accordion sx={{ background: theme.palette.tableBlack.main }} {...rest}>

            {padded ?
                <Box
                    padding={2}
                    gap={2}
                    display="flex"
                    flexDirection="column"
                    paddingTop={0}
                    borderTop={0}
                    borderRadius={1}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    }}
                >
                    {children}
                </Box>
                : children
            }

        </Accordion>

    );

}