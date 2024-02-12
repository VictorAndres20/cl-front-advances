import { message } from "antd";
import { useState } from "react";
import { Amount } from "../../_events/amount/type";
import { AdvanceType } from "../../_events/advance/type";
import { buildAdvanceValueCostEmployee, buildEmptyAdvance } from "../../_events/advance/model";

export interface GenerateAdvacneHook {
    amount?: Amount | null, 
    advance: AdvanceType,
    updateAmountToAdvance: ((amount: Amount | null) => void), 
    generate: (() => void), 
    loading: Boolean
}

export const useGenerateAdvacne = (): GenerateAdvacneHook => {

    const [ amount, setAmount ] = useState<Amount | null>(null);
    const [ advance, setAdvance ] = useState<AdvanceType>(buildEmptyAdvance());
    const [ loading, setLoading ] = useState(false);

    const updateAmountToAdvance = (amount: Amount | null) => {
        setAmount(amount);
        if(amount) setAdvance(buildAdvanceValueCostEmployee(amount.value, amount.cost));
        else setAdvance(buildEmptyAdvance());
    }

    const generate = () => {
        //TODO event
        setLoading(true);
        message.success('Coming soon...');
    }

    return {
        amount, advance, updateAmountToAdvance, generate, loading
    }
}