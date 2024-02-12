import { useState } from "react"
import { createEmployeeEvent } from "../../_events/employee/create.event";
import { message } from "antd";
import { EmployeeType } from "../../_events/employee/type";
import { buildEmptyEmployee } from "../../_events/employee/model";
import { getCompany } from "../../_utils/storage_handler";

export const useCreateEmployee = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<EmployeeType>(buildEmptyEmployee());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = () => {
        setEntity(buildEmptyEmployee());
    }

    const create = () => {
        setLoading(true);
        createEmployeeEvent(entity)
        .then(() => {
            message.success("Creado");
            cleanEntity();
            setLoading(false);
            reload(getCompany());
        })
        .catch((err) => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, create, cleanEntity
    }
}