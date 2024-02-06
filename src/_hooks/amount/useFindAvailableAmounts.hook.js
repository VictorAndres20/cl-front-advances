import { useEffect, useState } from "react"

const mock = [
    { id: 2, value: 100000, cost: 4200 },
    { id: 1, value: 200000, cost: 4800 },
    { id: 3, value: 250000, cost: 5200 }
]

export const useFindAvalibaleAmounts = () => {

    const [ amounts, setAmounts ] = useState([]);

    useEffect(() => {
        //TODO event
        setAmounts(mock);
    }, []);

    return {
        amounts
    }
}