import {
    createEmployee,
    editEmployee,
    editPasswordEmployee,
    activateEmployee,
    blockEmployee,
} from '../../_services/employee.service';
import { validateEmployee } from './model';
import { EmployeeType } from './type';

export const createEmployeeEvent = async (body: EmployeeType) => {
    validateEmployee(body);
    return await createEmployee(body);
}

export const editEmployeeEvent = async (id: string, body: EmployeeType) => {
    validateEmployee(body);
    return await editEmployee(id, body);
}

export const editPasswordEmployeeEvent = async (id: string, body: EmployeeType) => {
    return await editPasswordEmployee(id, body);
}

export const activateEmployeeEvent = async (id: string) => {
    return await activateEmployee(id);
}

export const blockEmployeeEvent = async (id: string) => {
    return await blockEmployee(id);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */