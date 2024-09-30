import { useCallback, useEffect, useState } from "react"
import { createEmployeeEvent } from "../../_events/employee/create.event";
import { message } from "antd";
import { EmployeeExcelType, EmployeeType } from "../../_events/employee/type";
import { buildEmployeeFromExcel, buildEmptyEmployee } from "../../_events/employee/model";
import { getCompany } from "../../_utils/storage_handler";

export const useCreateEmployee = (reload: Function = () => {}, employeeExcel?: EmployeeExcelType) => {

    const [ entity, setEntity ] = useState<EmployeeType>(employeeExcel ? buildEmployeeFromExcel(employeeExcel) : buildEmptyEmployee());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = useCallback(() => {
        setEntity(employeeExcel ? buildEmployeeFromExcel(employeeExcel) : buildEmptyEmployee());
    }, [employeeExcel]);

    useEffect(() => {
        setEntity(employeeExcel ? buildEmployeeFromExcel(employeeExcel) : buildEmptyEmployee());
    }, [employeeExcel]);

    const create = useCallback(() => {
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
    }, [cleanEntity, entity, reload])

    return {
        loading, entity, setEntity, create, cleanEntity
    }
}