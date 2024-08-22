import { AdvanceStateType } from "../advance_state/type";
import { EmployeeType } from "../employee/type";

export interface AdvanceType {
    uuid?: string,
    created_date: Date | string,
    approved_date?: Date | string,
    declined_date?: Date | string,
    value: number,
    cost: number,
    employee?: string | EmployeeType | null,
    state?: string | AdvanceStateType,
    use_fintech: number,
}