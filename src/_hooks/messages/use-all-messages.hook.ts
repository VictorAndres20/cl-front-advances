import { useEffect, useState } from "react"
import { Messages } from "../../_events/messages/type";
import { findAllMessagesEvent } from "../../_events/messages/find.event";
import { message } from "antd";

export const useAllMessages = () => {

    const [ data, setData ] = useState<Messages[]>([]);

    useEffect(() => {
        findAllMessagesEvent()
        .then(json => {
            setData(json.list);
        })
        .catch((err: Error) => {
            message.error(err.message);
        });
    }, []);

    return {
        data
    }
}