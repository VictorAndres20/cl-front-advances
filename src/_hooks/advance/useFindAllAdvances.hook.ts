import { useEffect, useState } from "react"
import { findAllAdvanceEvent } from "../../_events/advance/find.event";
import { message } from "antd";
import { AdvanceType } from "../../_events/advance/type";

export const useFindAllAdvances = () => {

    const [ data, setData ] = useState<AdvanceType[]>([]);

    const loadData = () => {
        findAllAdvanceEvent()
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