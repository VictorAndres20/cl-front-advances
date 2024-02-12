import { useEffect, useState } from "react"
import { findAllEmployeeEvent } from "../../_events/employee/find.event";
import { message } from "antd";
import { EmployeeType } from "../../_events/employee/type";

export const useFindAllEmployees = () => {

    const [ data, setData ] = useState<EmployeeType[]>([]);

    const loadData = () => {
        findAllEmployeeEvent()
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