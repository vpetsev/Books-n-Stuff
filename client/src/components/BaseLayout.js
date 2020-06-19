import React, { useState } from "react";
import { Menu } from "./Menu";

export function BaseLayout(props) {
    return (
        <div>
            <Menu />
            {props.children}
            <p>Copyright Victor Petsev 2020</p>
        </div>
    )
}