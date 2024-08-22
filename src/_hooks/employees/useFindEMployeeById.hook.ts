import { useEffect, useState } from "react";
import { findEmployeeByIdEvent } from "../../_events/employee/find.event";
import { message } from "antd";
import { buildEmptyEmployee } from "../../_events/employee/model";
import { EmployeeType } from "../../_events/employee/type";
import { getUserId } from "../../_utils/storage_handler";

export type UseFindEmployeeById = {
    data: EmployeeType,
    loadEmployee: (id: string) => void
}

export const useFindEmployeeById = (): UseFindEmployeeById => {

    const [ data, setData ] = useState<EmployeeType>(buildEmptyEmployee());

    const loadEmployee = (id: string) => {
        findEmployeeByIdEvent(id)
        .then(json => {
            setData(json.data);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    useEffect(() => {
        loadEmployee(getUserId() ?? '');
    }, []);

    return {
        data, loadEmployee
    };
}