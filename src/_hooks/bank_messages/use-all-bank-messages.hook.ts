import { useEffect, useState } from "react"
import { BankMessages } from "../../_events/bank_messages/type";
import { findAllBankMessagesEvent } from "../../_events/bank_messages/find.event";
import { message } from "antd";

export const useAllBankMessages = () => {

    const [ data, setData ] = useState<BankMessages[]>([]);

    useEffect(() => {
        findAllBankMessagesEvent()
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