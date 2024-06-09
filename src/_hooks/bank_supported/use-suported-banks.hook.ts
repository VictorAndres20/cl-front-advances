import { useEffect, useState } from "react";
import { BankSupportedType } from "../../_events/bank_supported/type";
import { findAllBankSupportedEvent } from "../../_events/bank_supported/find.event";
import { message } from "antd";

export const useSupportedBanks = () => {

    const [data, setData] = useState<BankSupportedType[]>([]);

    const loadData = () => {
        findAllBankSupportedEvent()
        .then((json) => {
            setData(json.list);
        })
        .catch((err) => {
            message.error(err.message);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return{
        data, loadData,
    };
}