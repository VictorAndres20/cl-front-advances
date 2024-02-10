import { useEffect, useState } from "react"
import { findAllEnterpriseEvent } from "../../_events/enterprise/find.event";
import { message } from "antd";

export const useFindAllEnterprises = () => {

    const [ data, setData ] = useState([]);

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