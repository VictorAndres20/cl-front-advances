import { BankType } from "../bank/type";
import { BankAccountType } from "../bank_account_type/type";
import { Fintech } from "../fintech/type";
import { RangeType } from "../range/type";
import { UserType } from "../user/type";

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
    fintech_account_number?: string | null,
    retired_date?: string | null,
    retired_by?: string | UserType | null
}

export interface EmployeeExcelType {
    NOMBRE: string;
    CEDULA: string;
    TELEFONO: string;
    SALARIO_QUNCENAL: Number;
    BANCO: string;
    TIPO_CUENTA_BANCO: string;
    NUMERO_CUENTA_BANCO: string;
    PLATAFORMA_FINANCIERA: string;
    NUMERO_PLATAFORMA_FINANCIERA: string;
}