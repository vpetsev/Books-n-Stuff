import React from "react";
import { Menu } from "../Menu/Menu";

export function BaseLayout(props) {
    return (
        <div>
            <Menu />
            {props.children}
            <p>Copyright Victor Petsev 2020</p>
        </div>
    )
}