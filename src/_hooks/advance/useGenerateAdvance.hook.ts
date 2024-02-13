import { message } from "antd";
import { useState } from "react";
import { Amount } from "../../_events/amount/type";
import { AdvanceType } from "../../_events/advance/type";
import { buildAdvanceValueCostEmployee, buildEmptyAdvance } from "../../_events/advance/model";
import { createAdvanceEvent } from "../../_events/advance/create.event";
import { useNavigate } from "react-router-dom";
import { history_path } from "../../pages/path_pages";

export interface GenerateAdvacneHook {
    amount?: Amount | null, 
    advance: AdvanceType,
    updateAmountToAdvance: ((amount: Amount | null) => void), 
    generate: (() => void), 
    loading: Boolean
}

export const useGenerateAdvacne = (): GenerateAdvacneHook => {

    const navigate = useNavigate();

    const [ amount, setAmount ] = useState<Amount | null>(null);
    const [ advance, setAdvance ] = useState<AdvanceType>(buildEmptyAdvance());
    const [ loading, setLoading ] = useState(false);

    const updateAmountToAdvance = (amount: Amount | null) => {
        setAmount(amount);
        if(amount) setAdvance(buildAdvanceValueCostEmployee(amount.value, amount.cost));
        else setAdvance(buildEmptyAdvance());
    }

    const generate = () => {
        setLoading(true);
        createAdvanceEvent(advance)
        .then(json => {
            setLoading(false);
            updateAmountToAdvance(null);
            message.success('Anticipo generado');
            navigate(history_path.full_path);
        })
        .catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    return {
        amount, advance, updateAmountToAdvance, generate, loading
    }
}