import { BankType } from "../bank/type";
import { RangeType } from "../range/type";

export interface EmployeeType {
    uuid: string,
    name: string,
    id: string,
    phone: string,
    salary: number,
    password?: string,
    state: number,
    range?: string | RangeType,
    bank?: string | BankType,
}