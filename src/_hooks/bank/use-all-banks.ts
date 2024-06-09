import { useEffect, useState } from "react"
import { findAllBankEvent } from "../../_events/bank/find.event";
import { message } from "antd";
import { BankType } from "../../_events/bank/type";

export const useAllBanks = () => {

    const [ data, setData ] = useState<BankType[]>([]);

    const loadData = () => {
        findAllBankEvent()
        .then(json => {
            setData(json.list);
        })
        .catch(err => {
            message.error(err.message);
        })
    }

    useEffect(() => {
        loadData();
    }, []);

    return{
        data, loadData
    }
}