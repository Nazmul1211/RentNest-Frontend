import React from "react";
import { GetAllContactMessages } from "../_action/AdminAction";
import ContactMessageList from "./ContactMessageList";

const GetAllContactMessagesWrapper = async () => {
    const messages = await GetAllContactMessages();

    return <ContactMessageList messages={messages || []} />;
};

export default GetAllContactMessagesWrapper;