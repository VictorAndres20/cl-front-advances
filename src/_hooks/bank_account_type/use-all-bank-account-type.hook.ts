import { useEffect, useState } from "react"
import { findAllBankAccountTypeEvent } from "../../_events/bank_account_type/find.event";
import { message } from "antd";
import { BankAccountType } from "../../_events/bank_account_type/type";

export const useAllBankAccountType = () => {

    const [ data, setData ] = useState<BankAccountType[]>([]);

    const loadData = () => {
        findAllBankAccountTypeEvent()
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