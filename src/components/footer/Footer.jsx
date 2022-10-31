import React from "react";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MADHIVE_URL = process.env.REACT_APP_MADHIVE_URL;

const FontAwesomeHoveredIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    cursor: "pointer",
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const MenuDivider = () => <div className="border-r border-gray-700 my-1" />;

export function Footer() {

    const theme = useTheme();

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            paddingY={4}
            className="mobile:flex-col mobile:text-2xl mobile:gap-5"
        >

            <Box display="flex" gap={2} alignItems="center">

                <span>Follow us on:</span>
                <FontAwesomeHoveredIcon icon={faTwitter} size="lg" className="mobile:w-8" />
                <FontAwesomeHoveredIcon icon={faDiscord} size="lg" className="mobile:w-8" />

            </Box>

            <Box display="flex" gap={1.5} className="mobile:flex-col mobile:text-left mobile:gap-1">

                <Typography
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    About
                </Typography>

                <MenuDivider />

                <Typography
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    Legal
                </Typography>

                <MenuDivider />

                <Typography
                    className="cursor-pointer"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    Terms of service
                </Typography>

                <MenuDivider />

                <Typography variant={"span"} sx={{ opacity: 0.7 }} className="mobile:text-xl">
                    AliceNet Inc © {new Date().getFullYear()}
                </Typography>

            </Box>

        </Box>

    );

}
