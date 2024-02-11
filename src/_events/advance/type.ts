import { AdvanceStateType } from "../advance_state/type";
import { EmployeeType } from "../employee/type";

export interface AdvanceType {
    uuid: string,
    created_date: Date,
    approved_date?: Date,
    declined_date?: Date,
    value: number,
    cost: number,
    employee?: string | EmployeeType,
    state?: string | AdvanceStateType,
}