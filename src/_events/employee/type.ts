import { BankType } from "../bank/type";
import { BankAccountType } from "../bank_account_type/type";
import { Fintech } from "../fintech/type";
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
    bank_account_type?: null | string | BankAccountType,
    bank_account_number?: string | null,
    fintech?: null | string | Fintech,
    fintech_account_number?: string | null
}