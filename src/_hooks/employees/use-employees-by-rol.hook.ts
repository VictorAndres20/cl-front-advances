import { useEffect, useState } from "react"
import { findAllEmployeeByEnterpriseEvent, findAllEmployeeEvent } from "../../_events/employee/find.event";
import { message } from "antd";
import { EmployeeType } from "../../_events/employee/type";
import { roles } from "../../_config/roles";

export const useEmployeesByRol = (rol: string, enterprise: number) => {

    const [ data, setData ] = useState<EmployeeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        if(rol === roles.root){
            findAllEmployeeEvent()
            .then(json => {
                setData(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        } else{
            findAllEmployeeByEnterpriseEvent(enterpriseParam)
            .then(json => {
                setData(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        }
    }

    useEffect(() => {
        loadData(enterprise);
    }, [enterprise]);

    return{
        data, loadData
    }
}