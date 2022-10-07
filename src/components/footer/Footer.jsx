import React from "react";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FontAwesomeHoveredIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const MADHIVE_URL = process.env.REACT_APP_MADHIVE_URL;

const MenuDivider = () => <div className="border-r border-gray-700 my-1" />;

export function Footer() {

    const theme = useTheme();

    return (

        <Box className="flex justify-between py-10 mobile:flex-col mobile:text-2xl mobile:gap-5">

            <Box display="flex" gap={2} alignItems="center">
    
                <span>Follow us on:</span>
                <FontAwesomeHoveredIcon icon={faTwitter} size="lg" className="cursor-pointer mobile:w-8" />
                <FontAwesomeHoveredIcon icon={faDiscord} size="lg" className="cursor-pointer mobile:w-8" />

            </Box>

            <div className="flex gap-3 mobile:flex-col mobile:text-left mobile:gap-1">

                <Typography
                    className="cursor-pointer"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    About
                </Typography>

                <MenuDivider />

                <Typography
                    className="cursor-pointer"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    Legal
                </Typography>

                <MenuDivider />

                <Typography
                    className="cursor-pointer"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    Terms of service
                </Typography>

                <MenuDivider />

                <span className="mobile:text-xl opacity-60">AliceNet Inc © {new Date().getFullYear()}</span>

            </div>

        </Box>

    );

}
