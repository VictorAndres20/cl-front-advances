import { useEffect, useState } from "react"
import { findAllFintechEvent } from "../../_events/fintech/find.event";
import { message } from "antd";
import { Fintech } from "../../_events/fintech/type";

export const useAllFintech = () => {

    const [ data, setData ] = useState<Fintech[]>([]);

    const loadData = () => {
        findAllFintechEvent()
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