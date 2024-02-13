import { useEffect, useState } from "react"
import { Amount } from "../../_events/amount/type";
import { findAllAmountByEmployeeEvent } from "../../_events/amount/find.event";
import { getUserId } from "../../_utils/storage_handler";
import { message } from "antd";

export interface FindAvalibaleAmountsHook {
    amounts: Amount[]
}

export const useFindAvalibaleAmounts = (): FindAvalibaleAmountsHook => {

    const [ amounts, setAmounts ] = useState<Amount[]>([]);

    useEffect(() => {
        findAllAmountByEmployeeEvent(getUserId() ?? '')
        .then(json => {
            setAmounts(json.list);
        })
        .catch(err =>{
            message.error(err.message);
        });
    }, []);

    return {
        amounts
    }
}