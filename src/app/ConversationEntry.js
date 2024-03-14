// ConversationEntry.js
// Component for displaying messages passed in as props
// Styles the messages depending on the type also passed in

import React from "react";
import { StyledMessage } from "./styles/StyledComps";

const ConversationEntry = ({ message, type }) => {
    return (
        <>
            <StyledMessage type={type}>
                {message}
            </StyledMessage>
        </>
    )
}

export default ConversationEntry;
