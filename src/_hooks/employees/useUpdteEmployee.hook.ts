import { useState } from "react"
import { editEmployeeEvent, editPasswordEmployeeEvent } from "../../_events/employee/create.event";
import { message } from "antd";
import { findEmployeeByIdEvent } from "../../_events/employee/find.event";
import { EmployeeType } from "../../_events/employee/type";
import { buildEmptyEmployee, transformEntityEmployee } from "../../_events/employee/model";
import { getCompany } from "../../_utils/storage_handler";

export interface UpdateEmployeeHook {
    loading: boolean, 
    entity: EmployeeType,
    setEntity: ((data: EmployeeType) => void), 
    update: ((id: any) => void),
    loadEntity: ((id: string) => void), 
    updatePassword: ((id: string) => void)
}

export const useUpdateEmployee = (reload: Function = () => {}): UpdateEmployeeHook => {

    const [ entity, setEntity ] = useState<EmployeeType>(buildEmptyEmployee());
    const [ loading, setLoading ] = useState<boolean>(false);

    const update = (id: string) => {
        setLoading(true);
        editEmployeeEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
            reload(getCompany());
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const updatePassword = (id: string) => {
        setLoading(true);
        editPasswordEmployeeEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const loadEntity = (id: string) => {
        setLoading(true);
        findEmployeeByIdEvent(id)
        .then(json => {
            setEntity(transformEntityEmployee(json.data));
            setLoading(false);
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, update, loadEntity, updatePassword
    }
}