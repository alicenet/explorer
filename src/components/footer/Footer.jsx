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

const MenuDivider = () => {
    const theme = useTheme();
    return (
        <Box
            marginY={0.5}
            border={1}
            borderColor={theme.palette.tableBlack.main}
            sx={{ borderStyle: ["none", "none", "solid"] }}
        />
    );
}

export function Footer() {

    const theme = useTheme();

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            paddingY={4}
            gap={3}
            sx={{
                flexDirection: ["column", "column", "row"],
                fontSize: ["large", "large", "inherit"],
            }}
        >

            <Box display="flex" gap={2} alignItems="center">

                <span>Follow us on:</span>
                <FontAwesomeHoveredIcon icon={faTwitter} size="lg" />
                <FontAwesomeHoveredIcon icon={faDiscord} size="lg" />

            </Box>

            <Box display="flex" sx={{ flexDirection: ["column", "column", "row"], gap: [0, 0, 1.5] }}>

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
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant={"span"}
                >
                    Terms of service
                </Typography>

                <MenuDivider />

                <Typography variant={"span"} sx={{ opacity: 0.7 }}>
                    AliceNet Inc © {new Date().getFullYear()}
                </Typography>

            </Box>

        </Box>

    );

}
