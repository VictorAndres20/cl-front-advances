import { useEffect, useState } from "react"
import { findAllRangeEvent } from "../../_events/range/find.event";
import { message } from "antd";
import { RangeType } from "../../_events/range/type";

export const useFindAllRange = () => {

    const [ data, setData ] = useState<RangeType[]>([]);

    const loadData = () => {
        findAllRangeEvent()
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