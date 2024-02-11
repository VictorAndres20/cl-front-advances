import { useEffect, useState } from "react"
import { findAllEnterpriseEvent } from "../../_events/enterprise/find.event";
import { message } from "antd";
import { EnterpriseType } from "../../_events/enterprise/type";

export const useFindAllEnterprises = () => {

    const [ data, setData ] = useState<EnterpriseType[]>([]);

    const loadData = () => {
        findAllEnterpriseEvent()
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