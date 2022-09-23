import React from "react";
import { ReactComponent as DiscordIcon } from "assets/discord-icon.svg";
import { ReactComponent as TwitterIcon } from "assets/twitter-icon.svg";
import { Box } from "@mui/material";

const MADHIVE_URL = process.env.REACT_APP_MADHIVE_URL;

const MenuDivider = () => <div className="border-r border-gray-700 my-1" />;

export function Footer() {

    return (

        <Box className="flex justify-between py-10 mobile:flex-col mobile:text-2xl mobile:gap-5">

            <div className="flex gap-5">

                <span>Follow us on:</span>
                <TwitterIcon className="w-5 cursor-pointer hover:text-neongreen fill-current text-white mobile:w-8" />
                <DiscordIcon className="w-5 cursor-pointer hover:text-neongreen fill-current text-white mobile:w-8" />

            </div>

            <div className="flex gap-3 mobile:flex-col mobile:text-left mobile:gap-1">

                <span
                    className="cursor-pointer hover:text-neongreen"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                >
                    About
                </span>

                <MenuDivider />

                <span
                    className="cursor-pointer hover:text-neongreen"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                >
                    Legal
                </span>

                <MenuDivider />

                <span
                    className="cursor-pointer hover:text-neongreen"
                    onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                >
                    Terms of service
                </span>

                <MenuDivider />

                <span className="text-lightgray mobile:text-xl">AliceNet Inc © {new Date().getFullYear()}</span>

            </div>

        </Box>

    );

}
