import { message } from "antd";
import { useState } from "react";
import { Amount } from "../../_events/amount/type";

export interface GenerateAdvacneHook {
    amount?: Amount | null, 
    setAmount: Function, 
    generate: Function, 
    loading: Boolean
}

export const useGenerateAdvacne = (): GenerateAdvacneHook => {

    const [ amount, setAmount ] = useState<Amount | null>(null);
    const [ loading, setLoading ] = useState(false);

    const generate = () => {
        //TODO event
        setLoading(true);
        message.success('Coming soon...');
    }

    return {
        amount, setAmount, generate, loading
    }
}