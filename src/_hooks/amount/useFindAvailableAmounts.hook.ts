import { useEffect, useState } from "react"
import { Amount } from "../../_events/amount/type";

export interface FindAvalibaleAmountsHook {
    amounts: Amount[]
}

const mock: Amount[] = [
    { uuid: '2', value: 100000, cost: 4200 },
    { uuid: '1', value: 200000, cost: 4800 },
    { uuid: '3', value: 250000, cost: 5200 }
]

export const useFindAvalibaleAmounts = (): FindAvalibaleAmountsHook => {

    const [ amounts, setAmounts ] = useState<Amount[]>([]);

    useEffect(() => {
        //TODO event
        setAmounts(mock);
    }, []);

    return {
        amounts
    }
}