import { useState } from "react";
import { Messages } from "../../_events/messages/type";
import { findMessagesByIdEvent } from "../../_events/messages/find.event";
import { message } from "antd";
import { buildEmptyMessages } from "../../_events/messages/model";

export const useMessageById = () => {

    const [ data, setData ] = useState<Messages>(buildEmptyMessages());

    const loadMessages = (id: string) => {
        findMessagesByIdEvent(id)
        .then(json => {
            setData(json.data);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        data, loadMessages
    };
}