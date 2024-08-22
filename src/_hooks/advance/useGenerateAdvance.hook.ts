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
    confirm: boolean,
    panel: number,
    advance: AdvanceType,
    updateAmountToAdvance: ((amount: Amount | null) => void), 
    generate: (() => void),
    loading: Boolean,
    setConfirm: ((confirm: boolean) => void),
    setPanel: ((panel: number) => void),
    updateUseFintech: ((useFintech: number) => void),
}

export const useGenerateAdvacne = (): GenerateAdvacneHook => {

    const navigate = useNavigate();

    const [ panel, setPanel ] = useState<number>(1);
    const [ amount, setAmount ] = useState<Amount | null>(null);
    const [ confirm, setConfirm ] = useState<boolean>(false);
    const [ advance, setAdvance ] = useState<AdvanceType>(buildEmptyAdvance());
    const [ loading, setLoading ] = useState(false);

    const updateAmountToAdvance = (amount: Amount | null) => {
        setAmount(amount);
        if(amount) setAdvance(buildAdvanceValueCostEmployee(amount.value, amount.cost));
        else setAdvance(buildEmptyAdvance());
    }

    const updateUseFintech = (use_fintech: number) => {
        setAdvance({
            ...advance,
            use_fintech
        });
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
        amount, advance, confirm, panel, updateAmountToAdvance, generate, loading, setConfirm, setPanel, updateUseFintech
    }
}