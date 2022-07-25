import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Menu } from "semantic-ui-react";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";

export function AliceNetMenuMobile() {

    return (

        <Menu pointing secondary className="py-5">

            <Menu.Menu position="left" className="self-center">
                <Image
                    src={Logo}
                    width="175px"
                    style={{ filter: "invert(100%)" }}
                    as={Link}
                    to="/"
                />
            </Menu.Menu>

            <Menu.Menu position="right">

                <Icon
                    name="bars"
                    size="large"
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => console.log("I'm a menu")}
                />

            </Menu.Menu>

        </Menu>

    );

}
