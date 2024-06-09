import { BankType } from "../bank/type";

export interface BankSupportedType {
    cod?: string,
    bank?: string | BankType,
}