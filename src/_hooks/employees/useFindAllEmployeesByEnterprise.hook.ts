import { useEffect, useState } from "react"
import { findAllEmployeeByEnterpriseEvent } from "../../_events/employee/find.event";
import { message } from "antd";
import { EmployeeType } from "../../_events/employee/type";

export const useFindAllEmployeesByEnterprise = (enterprise: number) => {

    const [ data, setData ] = useState<EmployeeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        findAllEmployeeByEnterpriseEvent(enterpriseParam)
        .then(json => {
            setData(json.list);
        })
        .catch(err => {
            message.error(err.message);
        })
    }

    useEffect(() => {
        loadData(enterprise);
    }, [enterprise]);

    return{
        data, loadData
    }
}