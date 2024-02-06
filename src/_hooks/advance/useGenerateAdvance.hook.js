import { message } from "antd";
import { useState } from "react"

export const useGenerateAdvacne = () => {

    const [ amount, setAmount ] = useState(null);
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